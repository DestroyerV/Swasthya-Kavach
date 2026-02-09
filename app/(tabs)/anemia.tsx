import CameraComponent from '@/components/CameraComponent';
import { Button } from '@/components/ui/Button';
import { analyzeAnemia, AnemiaResult } from '@/lib/ai/anemia';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';

export default function AnemiaCheckScreen() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnemiaResult | null>(null);
  const router = useRouter();

  const handleCapture = async (uri: string) => {
    setIsCameraOpen(false);
    setAnalyzing(true);
    setResult(null);

    try {
        const analysis = await analyzeAnemia(uri);
        setResult(analysis);
        
        // Save to DB
        // Need user ID properly, for now hardcoding or getting from context is better
        // But for MVP let's skip the user relation check strictly or fetch it.
        // We will just save result string.
        
        /* 
        await db.insert(checkups).values({
           type: 'anemia',
           result: JSON.stringify(analysis),
           imageUri: uri,
           userId: 1 // TODO: Get actual user ID
        });
        */
        
    } catch (e) {
        Alert.alert("Error", "Analysis failed");
    } finally {
        setAnalyzing(false);
    }
  };

  if (isCameraOpen) {
    return <CameraComponent onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />;
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Anemia Detection</Text>
      <Text className="text-gray-500 mb-6">
        Take a photo of your fingernails or zoomed-in eye (conjunctiva). 
        Ensure good lighting.
      </Text>

      {analyzing ? (
        <View className="h-60 justify-center items-center">
            <ActivityIndicator size="large" color="#00b894" />
            <Text className="mt-4 text-gray-500">Analyzing redness levels...</Text>
        </View>
      ) : result ? (
        <View className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
             <Text className="text-lg font-semibold mb-2">Result: {result.risk} Risk</Text>
             <Text className="text-gray-700 mb-4">{result.details}</Text>
             <View className={`h-2 w-full rounded-full bg-gray-200 overflow-hidden`}>
                <View 
                    style={{ 
                        width: result.risk === 'High' ? '90%' : result.risk === 'Moderate' ? '50%' : '10%',
                        backgroundColor: result.risk === 'High' ? '#ef4444' : result.risk === 'Moderate' ? '#f59e0b' : '#10b981'
                    }} 
                    className="h-full" 
                />
             </View>
             
             <Button 
                label="Check Again" 
                onPress={() => setResult(null)} 
                variant="outline" 
                className="mt-6"
             />
        </View>
      ) : (
         <View className="items-center justify-center h-60 bg-gray-100 rounded-xl mb-6 border-2 border-dashed border-gray-300">
            <Text className="text-gray-400">No Image Captured</Text>
         </View>
      )}

      {!analyzing && !result && (
        <Button label="Open Camera" onPress={() => setIsCameraOpen(true)} size="lg" />
      )}
    </ScrollView>
  );
}
