import { Colors } from "@/constants/theme";
import { analyzeBreathing, RespiratoryResult } from "@/lib/ai/respiratory";
import { Audio } from "expo-av";
import { Mic, Square } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Respiratory Checkup</Text>
        <Text style={styles.subtitle}>
          Place the phone microphone near your chest or back. Take deep breaths
          defined by the timer.
        </Text>

        <View style={styles.circleContainer}>
          {analyzing ? (
            <ActivityIndicator size="large" color={Colors.light.primary} />
          ) : recording ? (
            <View style={styles.recordingContainer}>
              <Text style={styles.recordingText}>Recording...</Text>
              <TouchableOpacity
                onPress={stopRecording}
                style={styles.stopButton}
              >
                <Square size={32} color="white" fill="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={startRecording}
              style={styles.recordButton}
              activeOpacity={0.8}
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
              <Text style={styles.resultTitle}>
                Analysis: {result.condition}
              </Text>
              <View
                style={[
                  styles.badge,
                  result.risk === "Low" ? styles.badgeLow : styles.badgeHigh,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    result.risk === "Low" ? styles.textLow : styles.textHigh,
                  ]}
                >
                  {result.risk} Risk
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.adviceTitle}>Recomendation</Text>
            <Text style={styles.adviceText}>{result.advice}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 8,
    marginTop: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.light.textSecondary,
    marginBottom: 40,
    fontSize: 16,
    lineHeight: 24,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: Colors.light.card,
    borderRadius: 160,
    height: 320,
    width: 320,
    alignSelf: "center",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  recordingContainer: {
    alignItems: "center",
  },
  recordingText: {
    color: "#ef4444",
    fontWeight: "700",
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
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  recordButton: {
    height: 96,
    width: 96,
    backgroundColor: Colors.light.primary,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  hintText: {
    marginTop: 24,
    color: Colors.light.textSecondary,
    fontWeight: "500",
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: Colors.light.card,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 32,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeLow: {
    backgroundColor: "#dcfce7",
  },
  badgeHigh: {
    backgroundColor: "#fee2e2",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  textGreen: {
    color: "#16a34a",
  },
  textOrange: {
    color: "#ea580c",
  },
  textLow: {
    color: "#166534",
  },
  textHigh: {
    color: "#991b1b",
  },
  adviceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  adviceText: {
    color: Colors.light.text,
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginBottom: 16,
  },
});
