import CameraComponent from "@/components/CameraComponent";
// import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { analyzeDehydration, DehydrationResult } from "@/lib/ai/dehydration";
import { Ionicons } from "@expo/vector-icons";
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dehydration Check</Text>
        <Text style={styles.subtitle}>
          Take a clear selfie. Ensure your face is well-lit and not covered.
        </Text>

        {analyzing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
            <Text style={styles.loadingText}>Scanning facial features...</Text>
          </View>
        ) : result ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Result: {result.risk} Risk</Text>
            <Text style={styles.resultDetails}>{result.details}</Text>

            <TouchableOpacity
              style={styles.checkAgainButton}
              onPress={() => setResult(null)}
            >
              <Text style={styles.checkAgainText}>Check Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="water-outline"
              size={48}
              color={Colors.light.textSecondary}
            />
            <Text style={styles.placeholderText}>No Image Captured</Text>
          </View>
        )}

        {!analyzing && !result && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setIsCameraOpen(true)}
          >
            <Text style={styles.primaryButtonText}>Take Selfie</Text>
          </TouchableOpacity>
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
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 24,
  },
  loadingContainer: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: Colors.light.card,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 24,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 8,
  },
  resultDetails: {
    color: Colors.light.textSecondary,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
  },
  checkAgainButton: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
  },
  checkAgainText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    marginBottom: 32,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.light.border,
  },
  placeholderText: {
    color: Colors.light.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
