import CameraComponent from "@/components/CameraComponent";
// import { Button } from "@/components/ui/Button"; // Custom button often has hardcoded styles, let's use standard Touchable for now or update it later if needed. For this file I'll use TouchableOpacity or keep utilizing Button if it accepts style override, but to be safe and consistent with my refactor, I'll use custom Views.
import { Colors } from "@/constants/theme";
import { analyzeAnemia, AnemiaResult } from "@/lib/ai/anemia";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
} from "react-native"; // Renaming conflict

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Anemia Detection</Text>
        <Text style={styles.subtitle}>
          Take a photo of your fingernails or zoomed-in eye (conjunctiva).
          Ensure good lighting.
        </Text>

        {analyzing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
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
              name="image-outline"
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
            <Text style={styles.primaryButtonText}>Open Camera</Text>
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
  progressBarBackground: {
    height: 12,
    width: "100%",
    borderRadius: 9999,
    backgroundColor: Colors.light.border,
    overflow: "hidden",
    marginBottom: 24,
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
