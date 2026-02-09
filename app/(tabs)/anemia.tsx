import CameraComponent from "@/components/CameraComponent";
import { Button } from "@/components/ui/Button";
import { analyzeAnemia, AnemiaResult } from "@/lib/ai/anemia";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
    } catch (e) {
      Alert.alert("Error", "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  if (isCameraOpen) {
    return (
      <CameraComponent
        onCapture={handleCapture}
        onClose={() => setIsCameraOpen(false)}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Anemia Detection</Text>
      <Text style={styles.subtitle}>
        Take a photo of your fingernails or zoomed-in eye (conjunctiva). Ensure
        good lighting.
      </Text>

      {analyzing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00b894" />
          <Text style={styles.loadingText}>Analyzing redness levels...</Text>
        </View>
      ) : result ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Result: {result.risk} Risk</Text>
          <Text style={styles.resultDetails}>{result.details}</Text>
          <View style={styles.progressBarBackground}>
            <View
              style={{
                width:
                  result.risk === "High"
                    ? "90%"
                    : result.risk === "Moderate"
                      ? "50%"
                      : "10%",
                backgroundColor:
                  result.risk === "High"
                    ? "#ef4444"
                    : result.risk === "Moderate"
                      ? "#f59e0b"
                      : "#10b981",
                height: "100%",
              }}
            />
          </View>

          <Button
            label="Check Again"
            onPress={() => setResult(null)}
            variant="outline"
            style={styles.checkAgainButton}
          />
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image Captured</Text>
        </View>
      )}

      {!analyzing && !result && (
        <Button
          label="Open Camera"
          onPress={() => setIsCameraOpen(true)}
          size="lg"
        />
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
    marginBottom: 24,
  },
  loadingContainer: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#6b7280",
  },
  resultCard: {
    backgroundColor: "#f9fafb",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  resultDetails: {
    color: "#374151",
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 8,
    width: "100%",
    borderRadius: 9999,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  checkAgainButton: {
    marginTop: 24,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
  },
  placeholderText: {
    color: "#9ca3af",
  },
});
