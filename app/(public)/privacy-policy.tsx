import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PrivacyPolicyScreens() {
  const theme = useThemeColor();
  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.push("/settings")}>
          <Ionicons name="chevron-back-sharp" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Privacy Policy
        </Text>
        <Ionicons
          name="chevron-back-sharp"
          size={24}
          color={theme.text}
          style={{ opacity: 0 }}
        />
      </View>
      <View style={[styles.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scrollViewContainer]}
        >
          <Text style={[styles.title, { color: theme.secondary }]}>
            Privacy Policy
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use the
            JUSTICELENS mobile application. By using our app, you agree to the
            terms of this policy.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Information We Collect
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We may collect the following types of information:
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            1. Personal Information: When you create an account, we collect your
            name, university student email address, gender, address, and other
            contact details.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            2. Schedule Information: We collect information about your class
            schedule to help match you with other students who have similar
            schedules.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            3. Usage Data: We may collect information about how you use the app,
            including your interactions with other users and your travel
            preferences.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            How We Use Your Information
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We use the information we collect for the following purposes:
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            1. To provide and improve our services, including matching you with
            other students for carpooling.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            2. To communicate with you about your account and provide customer
            support.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            3. To send you promotional materials and updates about our services,
            if you opt-in to receive such communications.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Data Security
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet or
            method of electronic storage is 100% secure, so we cannot guarantee
            absolute security.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Sharing Your Information
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted third-party
            service providers who assist us in operating our app and providing
            our services, as long as they agree to keep your information
            confidential.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Your Choices
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            You can update or delete your personal information by accessing your
            account settings within the app. You can also opt-out of receiving
            promotional communications from us by following the unsubscribe
            instructions in those communications.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Changes to This Privacy Policy
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page. You are
            advised to review this policy periodically for any changes.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Contact Us
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <Text
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              JUSTICELENS@akhlak.dev
            </Text>
            .
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Last updated: August 2026
          </Text>
        </ScrollView>
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollViewContainer: {
    flex: 1,
    paddingBottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 4,
  },
  body: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: "justify",
  },
});
