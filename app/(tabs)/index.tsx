import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user_name').then((name) => {
      if (name) setUserName(name);
    });
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-50 p-6">
      <View className="mb-8">
        <Text className="text-gray-500 text-lg">Hello,</Text>
        <Text className="text-3xl font-bold text-gray-900">{userName}</Text>
      </View>

      <View className="bg-primary rounded-2xl p-6 mb-6">
        <Text className="text-white text-xl font-bold mb-2">How are you feeling today?</Text>
        <Text className="text-white/80">Take a quick checkup to monitor your health.</Text>
      </View>

      <Text className="text-xl font-bold mb-4">Quick Actions</Text>
      <View className="flex-row flex-wrap justify-between">
        <Link href="/(tabs)/anemia" asChild>
            <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-100">
                <View className="bg-red-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Text className="text-2xl">🩸</Text>
                </View>
                <Text className="font-bold text-lg mb-1">Check Anemia</Text>
                <Text className="text-gray-500 text-xs">Eye & Nail Analysis</Text>
            </TouchableOpacity>
        </Link>
        
        <Link href="/(tabs)/skin" asChild>
            <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-100">
                <View className="bg-orange-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Text className="text-2xl">✋</Text>
                </View>
                <Text className="font-bold text-lg mb-1">Check Skin</Text>
                <Text className="text-gray-500 text-xs">Infection Scanner</Text>
            </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/respiratory" asChild>
            <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-100">
                <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Text className="text-2xl">🫁</Text>
                </View>
                <Text className="font-bold text-lg mb-1">Respiratory</Text>
                <Text className="text-gray-500 text-xs">Breathing Sound</Text>
            </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/dehydration" asChild>
            <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-100">
                <View className="bg-yellow-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Text className="text-2xl">🥤</Text>
                </View>
                <Text className="font-bold text-lg mb-1">Dehydration</Text>
                <Text className="text-gray-500 text-xs">Face Analysis</Text>
            </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}
