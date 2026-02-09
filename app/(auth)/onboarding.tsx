import { Button } from "@/components/ui/Button";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export default function OnboardingScreen() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || pin.length !== 4) {
      Alert.alert("Invalid Input", "Please enter a name and a 4-digit PIN.");
      return;
    }

    try {
      // 1. Create User in SQLite
      const result = await db
        .insert(users)
        .values({
          name,
          pin,
          age: 0, // Default, can be updated later
        })
        .returning();

      const user = result[0];

      // 2. Save Session to AsyncStorage
      await AsyncStorage.setItem("user_id", user.id.toString());
      await AsyncStorage.setItem("user_name", user.name);

      // 3. Navigate to Dashboard
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create profile.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kavach</Text>
        <Text style={styles.subtitle}>
          Your Personal Rural Health Companion
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Secret PIN (4 digits)</Text>
          <TextInput
            style={styles.input}
            placeholder="****"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <Button label="Create Profile" onPress={handleRegister} size="lg" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00b894",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#374151",
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});
