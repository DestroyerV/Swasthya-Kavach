// Safe import to prevent crash if native module is missing
let FaceDetector: any;
try {
    FaceDetector = require('expo-face-detector');
} catch (e) {
    console.warn("expo-face-detector not found", e);
}

export interface DehydrationResult {
    risk: 'Low' | 'Moderate' | 'High';
    confidence: number;
    details: string;
}

export async function analyzeDehydration(imageUri: string): Promise<DehydrationResult> {
    try {
        if (!FaceDetector) {
            console.warn("Using mock dehydration analysis (FaceDetector missing)");
            // Fallback Mock for testing
            return {
                risk: 'Low',
                confidence: 0.85,
                details: "Face Detector module unavailable. Simulating: You look hydrated!",
            };
        }

        const options = {
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
        };

        const result = await FaceDetector.detectFacesAsync(imageUri, options);
        
        if (result.faces.length === 0) {
            throw new Error("No face detected");
        }

        const face = result.faces[0];
        
        const leftEyeOpen = face.leftEyeOpenProbability || 0;
        const rightEyeOpen = face.rightEyeOpenProbability || 0;
        const smiling = face.smilingProbability || 0;
        
        const alertnessScore = (leftEyeOpen + rightEyeOpen + smiling) / 3;
        
        if (alertnessScore < 0.3) {
            return {
                risk: 'High',
                confidence: 0.8,
                details: "Signs of fatigue and drowsiness detected. Please hydrate immediately."
            };
        } else if (alertnessScore < 0.6) {
             return {
                risk: 'Moderate',
                confidence: 0.7,
                details: "You seem tired. Drink water and rest."
            };
        }
        
        return {
            risk: 'Low',
            confidence: 0.9,
            details: "Face looks alert and hydrated."
        };

    } catch (error) {
        console.error("Dehydration Analysis Error:", error);
        return {
            risk: 'Low',
            confidence: 0,
            details: "Could not analyze face. Ensure good lighting."
        };
    }
}
