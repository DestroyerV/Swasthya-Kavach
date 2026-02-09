import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (userId) {
        // User exists, go to Dashboard
        router.replace('/(tabs)');
      } else {
        // No user, go to Onboarding
        router.replace('/(auth)/onboarding');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#00b894" />
    </View>
  );
}
