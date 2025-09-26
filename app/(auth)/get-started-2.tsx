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

export default function GetStarted2() {
  const { theme } = useThemeColor();
  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: 36, backgroundColor: theme.background }}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={require("@/assets/images/auth/gs-2.png")}
            style={styles.image}
            contentFit="cover"
          />
          <View>
            <Text style={[styles.title, { color: theme.primary }]}>
              Travel Safer with Fellow Students
            </Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>
              Connect with fellow students heading in the same direction. Share
              rides, split costs, and enjoy a safer, more social commute.
            </Text>
          </View>
        </View>

        <View style={[{ width: "100%" }]}>
          <View style={styles.dotContainer}>
            <View style={[styles.dot, { backgroundColor: theme.gray }]}></View>
            <View
              style={[styles.dot, { backgroundColor: theme.tabIconSelected }]}
            ></View>
            <View style={[styles.dot, { backgroundColor: theme.gray }]}></View>
          </View>
          <Link
            href={`/get-started-3`}
            asChild
            style={[styles.button, { backgroundColor: theme.primary }]}
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
                Next
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
