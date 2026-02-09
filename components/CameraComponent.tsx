import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CameraComponentProps {
  onCapture: (uri: string) => void;
  onClose: () => void;
  title?: string;
}

export default function CameraComponent({ onCapture, onClose, title = "Take Photo" }: CameraComponentProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: false,
                skipProcessing: true // Faster capture
            });
            if (photo) {
                setCapturedImage(photo.uri);
            }
        } catch(e) {
            console.error(e);
        }
    }
  };

  const confirmPicture = () => {
    if (capturedImage) {
        onCapture(capturedImage);
        setCapturedImage(null);
    }
  }

  const retakePicture = () => {
    setCapturedImage(null);
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if (capturedImage) {
      return (
          <View style={styles.container}>
              <Image source={{ uri: capturedImage }} style={styles.preview} contentFit="contain" />
              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={retakePicture}>
                      <Text style={styles.text}>Retake</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#00b894'}]} onPress={confirmPicture}>
                      <Text style={styles.text}>Analyze</Text>
                  </TouchableOpacity>
              </View>
          </View>
      )
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.captureButton]} onPress={takePicture}>
             <View style={styles.captureInner} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white'
  },
  camera: {
    flex: 1,
  },
  preview: {
      flex: 1,
      width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 40,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
  },
  captureInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: 'black'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
