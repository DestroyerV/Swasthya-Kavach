import CameraComponent from '@/components/CameraComponent';
import { Button } from '@/components/ui/Button';
import { analyzeSkin, SkinResult } from '@/lib/ai/skin';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';

export default function SkinCheckScreen() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkinResult | null>(null);

  const handleCapture = async (uri: string) => {
    setIsCameraOpen(false);
    setAnalyzing(true);
    setResult(null);

    try {
        const analysis = await analyzeSkin(uri);
        setResult(analysis);
    } catch (e) {
        Alert.alert("Error", "Skin analysis failed");
    } finally {
        setAnalyzing(false);
    }
  };

  if (isCameraOpen) {
    return <CameraComponent onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} title="Scan Skin Area" />;
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Skin Infection Scanner</Text>
      <Text className="text-gray-500 mb-6">
        Point the camera at the affected skin area (rash, spot, or wound).
        Ensure good lighting.
      </Text>

      {analyzing ? (
        <View className="h-60 justify-center items-center">
            <ActivityIndicator size="large" color="#0984e3" />
            <Text className="mt-4 text-gray-500">Scanning for infections...</Text>
        </View>
      ) : result ? (
        <View className={`p-6 rounded-xl border-2 mb-6 ${result.severity === 'High' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
             <Text className="text-lg font-bold mb-1 text-gray-900">{result.condition}</Text>
             <View className="flex-row items-center mb-4">
                 <Text className="text-gray-600 mr-2">Severity:</Text>
                 <View className={`px-2 py-1 roundedFull ${result.severity === 'High' ? 'bg-red-200' : 'bg-green-200'}`}>
                    <Text className={`text-xs font-bold ${result.severity === 'High' ? 'text-red-800' : 'text-green-800'}`}>
                        {result.severity.toUpperCase()}
                    </Text>
                 </View>
             </View>
             
             <Text className="font-semibold text-gray-800 mb-1">Recommendation:</Text>
             <Text className="text-gray-700 leading-5">{result.advice}</Text>
             
             <Button 
                label="Scan Another Area" 
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
