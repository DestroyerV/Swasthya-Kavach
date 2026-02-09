import { analyzeBreathing, RespiratoryResult } from "@/lib/ai/respiratory";
import { Audio } from "expo-av";
import { Mic, Square } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RespiratoryCheckScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<RespiratoryResult | null>(null);

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        const { status } = await requestPermission();
        if (status !== "granted") return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      setResult(null);
    } catch (err) {
      Alert.alert("Failed to start recording", JSON.stringify(err));
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
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Respiratory Checkup</Text>
      <Text style={styles.subtitle}>
        Place the phone microphone near your chest or back. Take deep breaths
        defined by the timer.
      </Text>

      <View style={styles.circleContainer}>
        {analyzing ? (
          <ActivityIndicator size="large" color="#00b894" />
        ) : recording ? (
          <View style={styles.recordingContainer}>
            <Text style={styles.recordingText}>Recording...</Text>
            <TouchableOpacity onPress={stopRecording} style={styles.stopButton}>
              <Square size={32} color="white" fill="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={startRecording}
            style={styles.recordButton}
          >
            <Mic size={40} color="white" />
          </TouchableOpacity>
        )}

        {!recording && !analyzing && (
          <Text style={styles.hintText}>Tap to Record</Text>
        )}
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Analysis: {result.condition}</Text>
            <Text
              style={[
                styles.riskText,
                result.risk === "Low" ? styles.textGreen : styles.textOrange,
              ]}
            >
              {result.risk} Risk
            </Text>
          </View>
          <Text style={styles.adviceText}>{result.advice}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 32,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#f9fafb",
    borderRadius: 160,
    height: 320,
    width: 320,
    alignSelf: "center",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  recordingContainer: {
    alignItems: "center",
  },
  recordingText: {
    color: "#ef4444",
    fontWeight: "bold",
    marginBottom: 16,
    fontSize: 20,
  },
  stopButton: {
    height: 80,
    width: 80,
    backgroundColor: "#ef4444",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordButton: {
    height: 96,
    width: 96,
    backgroundColor: "#00b894",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#bbf7d0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  hintText: {
    marginTop: 24,
    color: "#9ca3af",
    fontWeight: "500",
  },
  resultContainer: {
    backgroundColor: "#eff6ff",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  riskText: {
    fontWeight: "bold",
  },
  textGreen: {
    color: "#16a34a",
  },
  textOrange: {
    color: "#ea580c",
  },
  adviceText: {
    color: "#374151",
  },
});
