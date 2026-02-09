import CameraComponent from "@/components/CameraComponent";
import { Button } from "@/components/ui/Button";
import { analyzeDehydration, DehydrationResult } from "@/lib/ai/dehydration";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
    return (
      <CameraComponent
        onCapture={handleCapture}
        onClose={() => setIsCameraOpen(false)}
        title="Selfie for Dehydration"
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dehydration Check</Text>
      <Text style={styles.subtitle}>
        Take a clear selfie. Ensure your face is well-lit and not covered.
      </Text>

      {analyzing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f1c40f" />
          <Text style={styles.loadingText}>Scanning facial features...</Text>
        </View>
      ) : result ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Result: {result.risk} Risk</Text>
          <Text style={styles.resultDetails}>{result.details}</Text>

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
          label="Take Selfie"
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
    backgroundColor: "#fefce8",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fef9c3",
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
