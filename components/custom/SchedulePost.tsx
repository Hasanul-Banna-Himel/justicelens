import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { postInterface } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SchedulePost({
  postData,
}: {
  postData: postInterface;
}) {
  const { theme } = useThemeColor();
  const { usersDataGlobal } = useAuth();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background_substitute },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Image
            source={{
              uri:
                usersDataGlobal?.find((el) => el.uid === postData?.author_uid)
                  ?.photoURL ??
                "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.avatar}
          />
          <Text style={[styles.authorName, { color: theme.text }]}>
            {usersDataGlobal?.find((el) => el.uid === postData?.author_uid)
              ?.displayName || "User Name"}
          </Text>
        </View>
        <Text style={[styles.title, { color: theme.text }]}>
          {postData?.title}
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {postData?.description}
        </Text>
      </View>

      {postData?.image && (
        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri:
                postData?.image ??
                "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.postImage}
            contentFit="cover"
          />
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.actionsContainer}>
          <View style={styles.actionItem}>
            <Ionicons name="arrow-up" size={24} color={theme.text} />
          </View>
          <View style={styles.actionItem}>
            <Ionicons name="chatbubble-outline" size={24} color={theme.text} />
          </View>
          <View style={styles.actionItem}>
            <Ionicons name="arrow-down" size={24} color={theme.text} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 12,
    borderRadius: 16,
    gap: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  postImageContainer: {
    aspectRatio: 16 / 9,
    width: "100%",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
