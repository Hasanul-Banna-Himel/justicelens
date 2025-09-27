import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GetStarted1() {
  const { theme } = useThemeColor();
  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: 36, backgroundColor: theme.background }}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={require("@/assets/images/auth/gs-1.png")}
            style={styles.image}
            contentFit="cover"
          />
          <View>
            <Text style={[styles.title, { color: theme.primary }]}>
              Shine a Light on Incidents That Matter
            </Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>
              Report, upvote, and verify incidents in your community. Give voices the reach they deserve.
            </Text>
          </View>
        </View>

        <View style={[{ width: "100%" }]}>
          <View style={styles.dotContainer}>
            <View
              style={[styles.dot, { backgroundColor: theme.tabIconSelected }]}
            ></View>
            <View style={[styles.dot, { backgroundColor: theme.gray }]}></View>
            <View style={[styles.dot, { backgroundColor: theme.gray }]}></View>
          </View>
          <Link
            href={`/signin`}
            asChild
            style={[styles.buttonOutlined, { borderColor: theme.primary }]}
          >
            <TouchableOpacity>
              <Text
                style={[
                  {
                    color: theme.primary,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "500",
                  },
                ]}
              >
                Signin
              </Text>
            </TouchableOpacity>
          </Link>
          <Link
            href={`/get-started-2`}
            asChild
            style={[styles.buttonSolid, { backgroundColor: theme.primary }]}
          >
            <TouchableOpacity>
              <Text
                style={[
                  {
                    color: theme.background,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "500",
                  },
                ]}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    aspectRatio: 390 / 320,
  },
  title: {
    fontSize: 32,
    fontWeight: "semibold",
    textAlign: "center",
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  buttonOutlined: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSolid: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
