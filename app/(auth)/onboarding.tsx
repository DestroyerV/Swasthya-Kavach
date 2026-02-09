import { Button } from '@/components/ui/Button';
import { db } from '@/db/client';
import { users } from '@/db/schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

export default function OnboardingScreen() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || pin.length !== 4) {
      Alert.alert("Invalid Input", "Please enter a name and a 4-digit PIN.");
      return;
    }

    try {
      // 1. Create User in SQLite
      const result = await db.insert(users).values({
        name,
        pin,
        age: 0, // Default, can be updated later
      }).returning();

      const user = result[0];

      // 2. Save Session to AsyncStorage
      await AsyncStorage.setItem('user_id', user.id.toString());
      await AsyncStorage.setItem('user_name', user.name);

      // 3. Navigate to Dashboard
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create profile.");
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6 space-y-6">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-primary">Kavach</Text>
        <Text className="text-gray-500 mt-2 text-center">
          Your Personal Rural Health Companion
        </Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 font-medium mb-1">Full Name</Text>
          <TextInput
            className="w-full bg-gray-100 p-4 rounded-lg border border-gray-200"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text className="text-gray-700 font-medium mb-1">Secret PIN (4 digits)</Text>
          <TextInput
            className="w-full bg-gray-100 p-4 rounded-lg border border-gray-200"
            placeholder="****"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>

      <Button label="Create Profile" onPress={handleRegister} size="lg" />
    </View>
  );
}
