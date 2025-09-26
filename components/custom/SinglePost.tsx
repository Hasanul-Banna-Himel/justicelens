import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { postInterface } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function SinglePost({ postData }: { postData: postInterface }) {
  const { theme } = useThemeColor();
  const { usersDataGlobal } = useAuth();

  const userProfile = useMemo(() => {
    return usersDataGlobal?.find(
      (el) => `${el.id}` === `${postData?.author_uid}`
    );
  }, [postData?.author_uid, usersDataGlobal]);

  const handleUpvote = () => {
    Alert.alert("Upvote feature coming soon!");
  };
  const handleDownvote = () => {
    Alert.alert("Downvote feature coming soon!");
  };
  const handleComment = () => {
    Alert.alert("Comment feature coming soon!");
  };

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
            source={
              userProfile?.photo_url && !postData?.is_anonymous
                ? userProfile?.photo_url
                : require("@/assets/images/auth/male.png")
            }
            style={styles.avatar}
          />
          <View>
            <Text style={[styles.authorName, { color: theme.text }]}>
              {userProfile?.first_name || userProfile?.last_name
                ? userProfile?.first_name + " " + userProfile?.last_name
                : "Anonymous User"}
            </Text>
            <Text style={[styles.time, { color: theme.text }]}>
              {postData?.post_time}
            </Text>
          </View>
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
              uri: postData?.image ?? "",
            }}
            style={styles.postImage}
            contentFit="cover"
          />
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.actionsContainer}>
          <Pressable onPress={handleUpvote} style={styles.actionItem}>
            <Ionicons name="arrow-up" size={24} color={theme.text} />
          </Pressable>
          <Pressable onPress={handleComment} style={styles.actionItem}>
            <Ionicons name="chatbubble-outline" size={24} color={theme.text} />
          </Pressable>
          <Pressable onPress={handleDownvote} style={styles.actionItem}>
            <Ionicons name="arrow-down" size={24} color={theme.text} />
          </Pressable>
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
  time: {},
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
