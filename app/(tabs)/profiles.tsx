import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { getAge } from "@/utils/functions/generation";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfilesScreen() {
  const { theme } = useThemeColor();
  const { DBuser, signOut } = useAuth();

  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Profile
        </Text>
      </View>
      <View style={[styles.container]}>
        <View style={[styles.body]}>
          <View style={[styles.imageContainer]}>
            <Image
              source={
                DBuser?.photo_url
                  ? DBuser?.photo_url
                  : DBuser?.gender === "male"
                  ? require("@/assets/images/auth/male.png")
                  : require("@/assets/images/auth/female.png")
              }
              style={styles.image}
              contentFit="cover"
            />
          </View>
          <View style={[styles.basicsCon]}>
            <Text style={[styles.name, { color: theme.primary }]}>
              {`${DBuser?.first_name} ${DBuser?.last_name}`}
            </Text>
            <Text style={[styles.email, { color: theme.secondary }]}>
              {DBuser?.email}
            </Text>
          </View>
          <View style={[styles.detailsCon]}>
            <Text style={[styles.detailsTitle, { color: theme.text }]}>
              Account
            </Text>
            <View style={[styles.detailsOption]}>
              <Text style={[styles.detailsKey, { color: theme.text }]}>
                Age
              </Text>
              <Text style={[styles.detailsValue, { color: theme.text }]}>
                {DBuser?.dob ? getAge(DBuser?.dob) : "--"} years
              </Text>
            </View>
            <View style={[styles.detailsOption]}>
              <Text style={[styles.detailsKey, { color: theme.text }]}>
                Gender
              </Text>
              <Text style={[styles.detailsValue, { color: theme.text }]}>
                {DBuser?.gender ?? "Not Disclosed"}
              </Text>
            </View>
            <View style={[styles.detailsOption]}>
              <Text style={[styles.detailsKey, { color: theme.text }]}>
                Institution
              </Text>
              <Text style={[styles.detailsValue, { color: theme.text }]}>
                {DBuser?.institution ?? "Not Set"}
              </Text>
            </View>
          </View>
          <View style={[styles.detailsCon]}>
            <Text style={[styles.detailsTitle, { color: theme.text }]}>
              Options
            </Text>
            <Pressable
              onPress={() => router.push("/edit-profile")}
              style={[styles.detailsOption]}
            >
              <Text style={[styles.detailsKey, { color: theme.text }]}>
                Edit Profile
              </Text>
              <Ionicons
                name="chevron-forward-sharp"
                size={24}
                color={theme.text}
              />
            </Pressable>
            <Pressable
              onPress={() => router.push("/about")}
              style={[styles.detailsOption]}
            >
              <Text style={[styles.detailsKey, { color: theme.text }]}>
                About
              </Text>
              <Ionicons
                name="chevron-forward-sharp"
                size={24}
                color={theme.text}
              />
            </Pressable>
            <Pressable
              onPress={() => router.push("/settings")}
              style={[styles.detailsOption]}
            >
              <Text style={[styles.detailsKey, { color: theme.text }]}>
                More
              </Text>
              <Ionicons
                name="chevron-forward-sharp"
                size={24}
                color={theme.text}
              />
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => signOut()}
          style={[
            styles.sent_button,
            { backgroundColor: theme.primary, cursor: "pointer" },
          ]}
        >
          <View>
            <Text style={[styles?.button_text, { color: theme.background }]}>
              Log Out
            </Text>
          </View>
        </Pressable>
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
  body: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    objectFit: "cover",
  },
  basicsCon: {
    alignItems: "center",
    paddingTop: 16,
    gap: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  detailsCon: {
    marginTop: 24,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 10,
  },
  detailsOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 10,
  },
  detailsKey: {
    fontSize: 16,
    fontWeight: "300",
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
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
    fontSize: 18,
    fontWeight: "600",
  },
});
