import { Tabs } from "expo-router";
import { ClipboardList, Home, Stethoscope, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00b894",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="checkups"
        options={{
          title: "Checkups",
          tabBarIcon: ({ color }) => <Stethoscope size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />

      {/* Hide these from the tab bar */}
      <Tabs.Screen
        name="anemia"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="respiratory"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="skin"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="dehydration"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
