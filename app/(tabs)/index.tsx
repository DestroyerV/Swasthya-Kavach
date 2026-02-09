import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
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

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.greetingText}>Hello,</Text>
        <Text style={styles.nameText}>{userName}</Text>
      </View> */}

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>How are you feeling today?</Text>
        <Text style={styles.bannerSubtitle}>
          Take a quick checkup to monitor your health.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        <Link href="/(tabs)/anemia" asChild>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.bgRed100]}>
              <Text style={styles.icon}>🩸</Text>
            </View>
            <Text style={styles.cardTitle}>Check Anemia</Text>
            <Text style={styles.cardSubtitle}>Eye & Nail Analysis</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/skin" asChild>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.bgOrange100]}>
              <Text style={styles.icon}>✋</Text>
            </View>
            <Text style={styles.cardTitle}>Check Skin</Text>
            <Text style={styles.cardSubtitle}>Infection Scanner</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/respiratory" asChild>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.bgBlue100]}>
              <Text style={styles.icon}>🫁</Text>
            </View>
            <Text style={styles.cardTitle}>Respiratory</Text>
            <Text style={styles.cardSubtitle}>Breathing Sound</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/dehydration" asChild>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.bgYellow100]}>
              <Text style={styles.icon}>🥤</Text>
            </View>
            <Text style={styles.cardTitle}>Dehydration</Text>
            <Text style={styles.cardSubtitle}>Face Analysis</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  greetingText: {
    color: "#ef4444",
    fontSize: 18,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
  },
  banner: {
    backgroundColor: "#00b894",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  bgRed100: {
    backgroundColor: "#fee2e2",
  },
  bgOrange100: {
    backgroundColor: "#ffedd5",
  },
  bgBlue100: {
    backgroundColor: "#dbeafe",
  },
  bgYellow100: {
    backgroundColor: "#fef9c3",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#6b7280",
    fontSize: 12,
  },
});
