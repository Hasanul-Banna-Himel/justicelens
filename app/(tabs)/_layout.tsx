import { router, Tabs, useRootNavigationState } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/ui/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/authContext";
import { PostProvider } from "@/contexts/postContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import VerifyEmailScreen from "@/views/VerifyEmailScreen";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";

// The inner layout component that contains the tabs and notification listeners
function InnerLayout() {
  const colorScheme = useColorScheme();
  const { initialLoading, user } = useAuth();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (initialLoading || !navigationState?.key) return;
    if (user === null) router.replace("/get-started-1");
  }, [initialLoading, user, navigationState?.key]);

  if (user && !user?.last_sign_in_at) {
    return <VerifyEmailScreen />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: { paddingTop: 2 },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="home" size={28} color={color} />
            ) : (
              <Ionicons name="home-outline" size={28} color={color} />
            ),
        }}
      />
      {/* <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="contacts" size={28} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name="squared-plus" size={30} color={color} />
            ) : (
              <Feather name="plus-square" size={30} color={color} />
            ),
        }}
      />
      {/* <Tabs.Screen
        name="notification"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialIcons name="notifications" size={28} color={color} />
            ) : (
              <MaterialIcons
                name="notifications-none"
                size={28}
                color={color}
              />
            ),
        }}
      /> */}
      <Tabs.Screen
        name="profiles"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="person" size={28} color={color} />
            ) : (
              <Ionicons name="person-outline" size={28} color={color} />
            ),
        }}
      />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="delete-account" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

// The final export that wraps the app in all necessary providers
export default function TabLayout() {
  return (
    <PostProvider>
      <InnerLayout />
    </PostProvider>
  );
}
