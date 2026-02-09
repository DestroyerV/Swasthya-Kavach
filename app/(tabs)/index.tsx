import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user_name").then((name) => {
      if (name) setUserName(name);
    });
  }, []);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <StatusBar barStyle="dark-content" />

        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingSub}>{getGreeting()},</Text>
            <Text style={styles.greetingTitle}>{userName || "Guest"}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons
              name="person-circle-outline"
              size={32}
              color={Colors.light.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Minimal Sentiment/Status Card instead of heavy banner */}
        <View style={styles.statusCard}>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>How are you feeling?</Text>
            <Text style={styles.statusSubtitle}>
              Track your health metrics today.
            </Text>
          </View>
          <Ionicons
            name="heart-circle-outline"
            size={48}
            color={Colors.light.primary}
            style={{ opacity: 0.8 }}
          />
        </View>

        <Text style={styles.sectionTitle}>Health Checks</Text>

        <View style={styles.grid}>
          <Link href="/(tabs)/anemia" asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons
                  name="water-outline"
                  size={24}
                  color={Colors.light.primary}
                />
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={Colors.light.textSecondary}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Anemia</Text>
                <Text style={styles.cardSubtitle}>Eye & Nail Analysis</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/skin" asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons
                  name="body-outline"
                  size={24}
                  color={Colors.light.primary}
                />
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={Colors.light.textSecondary}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Skin</Text>
                <Text style={styles.cardSubtitle}>Infection Scanner</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/respiratory" asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons
                  name="fitness-outline"
                  size={24}
                  color={Colors.light.primary}
                />
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={Colors.light.textSecondary}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Respiratory</Text>
                <Text style={styles.cardSubtitle}>Breathing Sound</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/dehydration" asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons
                  name="sunny-outline"
                  size={24}
                  color={Colors.light.primary}
                />
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={Colors.light.textSecondary}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Dehydration</Text>
                <Text style={styles.cardSubtitle}>Face Analysis</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    marginTop: 10,
  },
  greetingSub: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: "500",
    marginBottom: 4,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: -0.5,
  },
  profileButton: {
    padding: 4,
  },
  statusCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.light.border,
    // Soft shadow
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  statusTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  statusTitle: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  statusSubtitle: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: Colors.light.card,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    height: 160,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardContent: {
    // mt: 'auto' handled by justify-between on card
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    color: Colors.light.textSecondary,
    fontSize: 13,
  },
});
