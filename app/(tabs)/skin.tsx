import CameraComponent from "@/components/CameraComponent";
// import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { analyzeSkin, SkinResult } from "@/lib/ai/skin";
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
    return (
      <CameraComponent
        onCapture={handleCapture}
        onClose={() => setIsCameraOpen(false)}
        title="Scan Skin Area"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Skin Infection Scanner</Text>
        <Text style={styles.subtitle}>
          Point the camera at the affected skin area (rash, spot, or wound).
          Ensure good lighting.
        </Text>

        {analyzing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
            <Text style={styles.loadingText}>Scanning for infections...</Text>
          </View>
        ) : result ? (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>{result.condition}</Text>
              <View
                style={[
                  styles.badge,
                  result.severity === "High"
                    ? styles.badgeHigh
                    : styles.badgeLow,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    result.severity === "High"
                      ? styles.textHigh
                      : styles.textLow,
                  ]}
                >
                  {result.severity.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>Recommendation</Text>
            <Text style={styles.recommendationText}>{result.advice}</Text>

            <TouchableOpacity
              style={styles.checkAgainButton}
              onPress={() => setResult(null)}
            >
              <Text style={styles.checkAgainText}>Scan Another Area</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="body-outline"
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 24,
    marginBottom: 24,
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
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  badgeHigh: {
    backgroundColor: "#fecaca",
  },
  badgeLow: {
    backgroundColor: "#bbf7d0",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  textHigh: {
    color: "#991b1b",
  },
  textLow: {
    color: "#166534",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  recommendationText: {
    color: Colors.light.text,
    lineHeight: 24,
    fontSize: 16,
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
