import { useColorScheme } from "@/hooks/useColorScheme";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function LogoHeader() {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles?.container]}>
      <Image
        source={
          colorScheme === "dark"
            ? require("@/assets/images/brand/logo_light.svg")
            : require("@/assets/images/brand/logo.svg")
        }
        style={styles.logo}
        contentFit="cover"
      />
    </View>
  );
}

const global_height = 24;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 4,
  },
  logo: {
    height: global_height,
    resizeMode: "cover",
    aspectRatio: 492 / 164,
  },
});
