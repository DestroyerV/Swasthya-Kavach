import CameraComponent from '@/components/CameraComponent';
import { Button } from '@/components/ui/Button';
import { analyzeDehydration, DehydrationResult } from '@/lib/ai/dehydration';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';

export default function DehydrationCheckScreen() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DehydrationResult | null>(null);

  const handleCapture = async (uri: string) => {
    setIsCameraOpen(false);
    setAnalyzing(true);
    setResult(null);

    try {
        const analysis = await analyzeDehydration(uri);
        setResult(analysis);
    } catch (e) {
        Alert.alert("Error", "Analysis failed");
    } finally {
        setAnalyzing(false);
    }
  };

  if (isCameraOpen) {
    return <CameraComponent onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} title="Selfie for Dehydration" />;
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Dehydration Check</Text>
      <Text className="text-gray-500 mb-6">
        Take a clear selfie. Ensure your face is well-lit and not covered.
      </Text>

      {analyzing ? (
        <View className="h-60 justify-center items-center">
            <ActivityIndicator size="large" color="#f1c40f" />
            <Text className="mt-4 text-gray-500">Scanning facial features...</Text>
        </View>
      ) : result ? (
        <View className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 mb-6">
             <Text className="text-lg font-semibold mb-2">Result: {result.risk} Risk</Text>
             <Text className="text-gray-700 mb-4">{result.details}</Text>
             
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
        <Button label="Take Selfie" onPress={() => setIsCameraOpen(true)} size="lg" />
      )}
    </ScrollView>
  );
}
