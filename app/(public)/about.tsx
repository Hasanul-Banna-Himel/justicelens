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
            JUSTICELENS is a mobile application designed to facilitate safe and
            convenient transportation for university students. The app connects
            students who share similar schedules and routes, allowing them to
            coordinate rides to and from campus. By promoting carpooling among
            students, JUSTICELENS aims to reduce transportation costs, minimize
            environmental impact, and enhance the overall commuting experience.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            About The Developer
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            JUSTICELENS is developed by{" "}
            <Link
              href={"https://akhlak.dev"}
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              Akhlak Hossain Jim
            </Link>
            , a passionate developer dedicated to creating solutions that make a
            difference. With a strong background in software development and a
            keen interest in addressing real-world challenges, Akhlak has poured
            his expertise and creativity into building JUSTICELENS. His
            commitment to enhancing student life through technology is evident
            in every aspect of the app. To support his cause, and for more
            information about Akhlak and his work, visit{" "}
            <Link
              href={"https://akhlak.dev"}
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              akhlak.dev
            </Link>
            .
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Our Mission
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Our mission is to create a safer, more efficient, and
            environmentally friendly transportation option for university
            students. We believe that by fostering a community of shared rides,
            we can contribute to reducing traffic congestion and lowering carbon
            emissions, while also providing students with a reliable and
            cost-effective way to get to campus.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Safety Measures
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Safety is our top priority at JUSTICELENS. We have implemented
            several measures to ensure that all users feel secure while using
            the app. These include user verification processes, in-app
            communication features, etc.
            {/* and the ability to share ride details with trusted contacts. */}
            We encourage all users to follow best practices for personal safety
            and to report any concerns or issues through the app.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Contact Us
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We value your feedback and are here to assist you with any questions
            or concerns. If you need support or have suggestions for improving
            JUSTICELENS, please reach out to us at{" "}
            <Link
              href={"mailto:JUSTICELENS@akhlak.dev"}
              style={[
                { color: theme.primary, textDecorationLine: "underline" },
              ]}
            >
              JUSTICELENS@akhlak.dev
            </Link>
            . Your input helps us enhance the app and better serve the student
            community.
          </Text>
          <Text style={[styles.title, { color: theme.secondary }]}>
            Acknowledgments
          </Text>
          <Text style={[styles.body, { color: theme.text }]}>
            We would like to extend our gratitude to all the students and
            university staff who provided valuable feedback during the
            development of JUSTICELENS. Your insights and suggestions have been
            instrumental in shaping the app to better meet the needs of the
            student community.
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
