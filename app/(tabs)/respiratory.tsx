import { analyzeBreathing, RespiratoryResult } from '@/lib/ai/respiratory';
import { Audio } from 'expo-av';
import { Mic, Square } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function RespiratoryCheckScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<RespiratoryResult | null>(null);

  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        const { status } = await requestPermission();
        if (status !== 'granted') return;
      }
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
         Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setResult(null);
    } catch (err) {
      Alert.alert('Failed to start recording', JSON.stringify(err));
    }
  }

  async function stopRecording() {
    if (!recording) return;

    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setAudioUri(uri);
    
    if (uri) {
        analyzeAudio(uri);
    }
  }

  const analyzeAudio = async (uri: string) => {
      setAnalyzing(true);
      try {
          const res = await analyzeBreathing(uri);
          setResult(res);
      } catch (e) {
          Alert.alert("Error", "Analysis Failed");
      } finally {
          setAnalyzing(false);
      }
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Respiratory Checkup</Text>
      <Text className="text-gray-500 mb-8">
        Place the phone microphone near your chest or back. 
        Take deep breaths defined by the timer.
      </Text>

      <View className="items-center justify-center p-10 bg-gray-50 rounded-full h-80 w-80 self-center mb-8 border border-gray-100 shadow-sm">
         {analyzing ? (
             <ActivityIndicator size="large" color="#00b894" />
         ) : recording ? (
             <View className="items-center animate-pulse">
                <Text className="text-red-500 font-bold mb-4 text-xl">Recording...</Text>
                <TouchableOpacity 
                    onPress={stopRecording}
                    className="h-20 w-20 bg-red-500 rounded-full items-center justify-center shadow-lg"
                >
                    <Square size={32} color="white" fill="white" />
                </TouchableOpacity>
             </View>
         ) : (
             <TouchableOpacity 
                onPress={startRecording}
                className="h-24 w-24 bg-primary rounded-full items-center justify-center shadow-lg shadow-green-200"
             >
                <Mic size={40} color="white" />
             </TouchableOpacity>
         )}
         
         {!recording && !analyzing && <Text className="mt-6 text-gray-400 font-medium">Tap to Record</Text>}
      </View>

      {result && (
         <View className="bg-blue-50 p-6 rounded-xl border border-blue-100">
             <View className="flex-row justify-between items-center mb-2">
                 <Text className="text-lg font-bold text-gray-900">Analysis: {result.condition}</Text>
                 <Text className={`font-bold ${result.risk === 'Low' ? 'text-green-600' : 'text-orange-600'}`}>
                    {result.risk} Risk
                 </Text>
             </View>
             <Text className="text-gray-700">{result.advice}</Text>
         </View>
      )}
    </ScrollView>
  );
}
