import { useThemeColor } from "@/hooks/useThemeColor";
import { dayType, postInterface } from "@/types";
import { functions } from "@/utils/firebase";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { httpsCallable } from "firebase/functions";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function SchedulePost({
  postData,
  today,
}: {
  postData: postInterface;
  today: dayType;
}) {
  const theme = useThemeColor();

  const onNudge = () => {
    const sendNudgeNotification = httpsCallable(
      functions,
      "sendNudgeNotification"
    );
    sendNudgeNotification({ author_uid: postData.author_uid })
      .then((result) => {
        console.log("Nudge sent successfully:", result);
      })
      .catch((error) => {
        console.error("Error sending nudge:", error);
      });
  };

  return (
    postData?.times?.[today]?.starts && (
      <View style={[l_styles.post_container]}>
        <View>
          <View
            style={[l_styles.post_icon, { backgroundColor: theme.gray_light }]}
          >
            {postData?.gender === "male" ? (
              <Ionicons name="man" size={28} color={theme.primary} />
            ) : (
              <Ionicons name="woman" size={28} color={theme.primary} />
            )}
            <Text
              style={[
                {
                  fontSize: 8,
                  textAlign: "center",
                  textTransform: "capitalize",
                },
                { color: theme?.primary },
              ]}
            >
              {postData?.gender}
            </Text>
          </View>
        </View>
        <View style={[l_styles.post_content]}>
          <View style={[l_styles.post_title]}>
            <Text style={[l_styles.post_title_text, { color: theme?.text }]}>
              EWU
            </Text>
            <FontAwesome6
              name="arrow-right-arrow-left"
              size={16}
              color={theme.text}
            />
            <Text style={[l_styles.post_title_text, { color: theme?.text }]}>
              {postData?.thana}
            </Text>
          </View>
          <View>
            <Text style={[l_styles.post_sub_text, { color: theme?.text }]}>
              Travels With: {postData.transportation}
            </Text>
          </View>

          <View>
            <Text style={[l_styles.post_sub_text, { color: theme?.text }]}>
              Usual Travel Time:
            </Text>
            <Text style={[l_styles.post_sub_text, { color: theme?.text }]}>
              {postData?.times?.[today]?.starts}-
              {postData?.times?.[today]?.ends}
            </Text>
          </View>
        </View>
        <View>
          <Pressable
            style={[
              l_styles.post_button,
              { backgroundColor: theme.gray_light },
            ]}
            onPress={onNudge}
          >
            <Text
              style={[l_styles.post_button_text, { color: theme?.secondary }]}
            >
              Nudge
            </Text>
          </Pressable>
        </View>
      </View>
    )
  );
}

const l_styles = StyleSheet.create({
  post_container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 16,
    marginVertical: 8,
  },
  post_icon: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  post_content: {
    paddingVertical: 4,
    flex: 1,
    maxWidth: 198,
  },
  post_title: {
    flexDirection: "row",
    gap: 4,
  },
  post_title_text: {
    fontSize: 16,
    fontWeight: 500,
  },
  post_sub_text: {
    fontSize: 14,
  },
  post_button: {
    paddingVertical: Platform.OS === "android" ? 6 : 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  post_button_text: {
    fontSize: 14,
    fontWeight: 500,
  },
});
