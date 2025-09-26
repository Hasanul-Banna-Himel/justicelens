import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const { theme } = useThemeColor();
  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.push("/profiles")}>
          <Ionicons name="chevron-back-sharp" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Information & Tributes
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
            About &lsquo;JUSTICELENS&rsquo;
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            JUSTICELENS is a mobile application designed to let users post
            incidents and verify their authenticity. The app leverages
            AI-powered tools to analyze images and generate automated
            descriptions, making it easier to evaluate and cross-check reported
            events. By combining community reporting with intelligent
            verification, JUSTICELENS aims to bring transparency,
            accountability, and awareness to critical issues.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            About The Developer
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            JUSTICELENS is developed by{" "}
            <Link
              href={"https://github.com/Hasanul-Banna-Himel"}
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              Hasanul Banna Himel
            </Link>{" "}
            &{" "}
            <Link
              href={"https://akhlak.dev"}
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              Akhlak
            </Link>
            , passionate developers who focuses on building impactful technology
            solutions. With a strong interest in justice, AI, and real-world
            problem solving, he has crafted JUSTICELENS as a tool to empower
            people with information and clarity.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Our Mission
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Our mission is to ensure that reported incidents are more
            trustworthy, verifiable, and accessible. By enabling users to post,
            check, and validate incidents, while enhancing content with AI
            descriptions, JUSTICELENS strives to fight misinformation and
            provide a reliable platform for truth.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Safety & Trust
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Trust is the foundation of JUSTICELENS. We are continuously working
            on integrating verification mechanisms, community feedback, and AI
            assistance to ensure that all shared incidents are authentic and
            safe to consume. Users are encouraged to engage responsibly and
            report misleading content.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Contact Us
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Have feedback, questions, or ideas to improve JUSTICELENS? Reach out
            to us at{" "}
            <Link
              href={"mailto:justicelens.dev@gmail.com"}
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              justicelens.dev@gmail.com
            </Link>
            . Your input is invaluable in shaping the future of this platform.
          </Text>

          <Text style={[styles.title, { color: theme.secondary }]}>
            Acknowledgments
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We thank everyone who has contributed feedback, testing, and ideas
            during the development of JUSTICELENS. Your support and vision are
            what drive this project forward.
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
