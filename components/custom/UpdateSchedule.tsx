import { useGlobalDataContext } from "@/contexts/globalDataContext";
import { usePostContext } from "@/contexts/postContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, usePathname } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function UpdateSchedule() {
  const theme = useThemeColor();
  const { semester } = useGlobalDataContext();
  const { userSchedule } = usePostContext();

  const path = usePathname();

  return (
    userSchedule?.semester &&
    userSchedule.semester !== semester &&
    path !== "/schedule" && (
      <View
        style={[
          styles?.container,
          { backgroundColor: theme.background_substitute },
        ]}
      >
        <Text style={[[styles.title, { color: theme?.primary }]]}>
          Update Schedule
        </Text>
        <Text style={[{ color: theme?.text }]}>
          Your Schedule Is not updated for this current semester, please update
          to show your details.
        </Text>
        <Pressable
          onPress={() => router.push("/schedule")}
          style={[styles.sent_button, { backgroundColor: theme.primary }]}
        >
          <View>
            <Text style={[styles?.button_text, { color: theme.background }]}>
              Update Schedule
            </Text>
          </View>
        </Pressable>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 88 : 72,
    marginHorizontal: 12,
    width: "93%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  sent_button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
    marginBottom: Platform.OS === "ios" ? 48 : 0,
  },
  button_text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
