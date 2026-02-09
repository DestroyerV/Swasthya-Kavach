import CameraComponent from "@/components/CameraComponent";
import { Button } from "@/components/ui/Button";
import { analyzeSkin, SkinResult } from "@/lib/ai/skin";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Skin Infection Scanner</Text>
      <Text style={styles.subtitle}>
        Point the camera at the affected skin area (rash, spot, or wound).
        Ensure good lighting.
      </Text>

      {analyzing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0984e3" />
          <Text style={styles.loadingText}>Scanning for infections...</Text>
        </View>
      ) : result ? (
        <View
          style={[
            styles.resultCard,
            result.severity === "High" ? styles.cardHigh : styles.cardLow,
          ]}
        >
          <Text style={styles.resultTitle}>{result.condition}</Text>
          <View style={styles.severityContainer}>
            <Text style={styles.severityLabel}>Severity:</Text>
            <View
              style={[
                styles.badge,
                result.severity === "High" ? styles.badgeHigh : styles.badgeLow,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  result.severity === "High" ? styles.textHigh : styles.textLow,
                ]}
              >
                {result.severity.toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.recommendationTitle}>Recommendation:</Text>
          <Text style={styles.recommendationText}>{result.advice}</Text>

          <Button
            label="Scan Another Area"
            onPress={() => setResult(null)}
            variant="outline"
            style={styles.scanAgainButton}
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
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 24,
  },
  cardHigh: {
    backgroundColor: "#fef2f2",
    borderColor: "#fee2e2",
  },
  cardLow: {
    backgroundColor: "#f0fdf4",
    borderColor: "#dcfce7",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },
  severityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  severityLabel: {
    color: "#4b5563",
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  badgeHigh: {
    backgroundColor: "#fecaca",
  },
  badgeLow: {
    backgroundColor: "#bbf7d0",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textHigh: {
    color: "#991b1b",
  },
  textLow: {
    color: "#166534",
  },
  recommendationTitle: {
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  recommendationText: {
    color: "#374151",
    lineHeight: 20,
  },
  scanAgainButton: {
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
