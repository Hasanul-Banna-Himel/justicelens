import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PrivacyPolicyScreens() {
  const { theme } = useThemeColor();
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
            Your privacy is important to us. This Privacy Policy explains how
            JUSTICELENS collects, uses, and protects your personal information
            when you use our web application. By using our platform, you agree
            to the terms outlined in this policy.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Information We Collect
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We may collect the following types of information:
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            1. **Account Information**: When you sign up, we may collect your
            name, email address, and other necessary details to create and
            manage your account.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            2. **Incident Data**: Content you post, including descriptions,
            photos, and related details, which are stored securely in our
            database.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            3. **AI Processing Data**: Images you upload may be analyzed by our
            AI to generate automated descriptions or help verify authenticity.
            These are processed securely and are not shared without consent.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            4. **Usage Data**: Information about how you use the platform,
            including interactions, log data, and device information.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            How We Use Your Information
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We use the information collected for the following purposes:
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            1. To enable posting, browsing, and verifying incidents.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            2. To improve accuracy of AI-generated descriptions and content
            analysis.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            3. To maintain the safety and reliability of the platform.
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            4. To communicate updates, respond to inquiries, and provide support.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Data Security
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We use industry-standard security measures to protect your
            information against unauthorized access, alteration, disclosure, or
            destruction. While we strive to safeguard your data, no method of
            transmission or storage is 100% secure.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Sharing Your Information
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We do not sell or trade your personal information. Data may only be
            shared with trusted service providers who assist in operating the
            platform, provided they comply with strict confidentiality
            agreements. In cases of legal obligation, we may disclose
            information if required by law enforcement.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Your Choices
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            You can access, update, or delete your personal information at any
            time through your account settings. You may also choose to opt-out
            of non-essential communications.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Changes to This Privacy Policy
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. Updates will be posted on this
            page, and we encourage you to review it regularly.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Contact Us
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us at{" "}
            <Text
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              justicelens.dev@gmail.com
            </Text>
            .
          </Text>

          <Text style={[styles.body, { color: theme.text }]}>
            Last updated: September 2025
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
