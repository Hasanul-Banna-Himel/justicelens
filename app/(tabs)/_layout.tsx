import * as Notifications from "expo-notifications";
import { router, Tabs, useRootNavigationState } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Platform } from "react-native";

import NudgeModal from "@/components/custom/NudgeModal";
import UpdateSchedule from "@/components/custom/UpdateSchedule";
import { HapticTab } from "@/components/ui/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/authContext";
import {
  NudgeModalProvider,
  useNudgeModal,
} from "@/contexts/nudgeModalContext"; // Import the context
import { PostProvider } from "@/contexts/postContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import VerifyEmailScreen from "@/views/VerifyEmailScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// The inner layout component that contains the tabs and notification listeners
function InnerLayout() {
  const colorScheme = useColorScheme();
  const { initialLoading, user, DBuser } = useAuth();
  const navigationState = useRootNavigationState();
  const { showNudgeModal } = useNudgeModal(); // Use the context to get the show function

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const { nudger, schedule } = notification.request.content.data;
        if (nudger) {
          showNudgeModal({
            nudger: JSON.parse(nudger as string),
            schedule: schedule ? JSON.parse(schedule as string) : null,
          });
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { nudger, schedule } = response.notification.request.content.data;
        if (nudger) {
          showNudgeModal({
            nudger: JSON.parse(nudger as string),
            schedule: schedule ? JSON.parse(schedule as string) : null,
          });
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [showNudgeModal]);

  useEffect(() => {
    if (initialLoading || !navigationState?.key) return;
    if (user === null) router.replace("/get-started-1");
  }, [initialLoading, user, navigationState?.key]);

  if (DBuser && !DBuser?.emailVerified) {
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
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color={color} />
            ) : (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="contacts" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="calendar-sharp" size={24} color={color} />
            ) : (
              <Ionicons name="calendar-outline" size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialIcons name="notifications" size={24} color={color} />
            ) : (
              <MaterialIcons
                name="notifications-none"
                size={24}
                color={color}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialIcons name="person" size={28} color={color} />
            ) : (
              <MaterialIcons name="person-outline" size={28} color={color} />
            ),
        }}
      />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

// The final export that wraps the app in all necessary providers
export default function TabLayout() {
  return (
    <PostProvider>
      <NudgeModalProvider>
        <InnerLayout />
        <UpdateSchedule />
        <ModalRenderer />
      </NudgeModalProvider>
    </PostProvider>
  );
}

// A small component to render the modal based on context state
function ModalRenderer() {
  const { isModalVisible, modalData, hideNudgeModal } = useNudgeModal();
  return (
    <NudgeModal
      visible={isModalVisible}
      notification={modalData}
      onClose={hideNudgeModal}
    />
  );
}
