import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, View } from "react-native";

export default function LogoHeader() {
  const { theme } = useThemeColor();

  return (
    <View style={[styles?.container]}>
      <Text style={[styles?.logo, { color: theme?.primary }]}>JUSTICELENS</Text>
    </View>
  );
}

const global_height = 16;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  bar: {
    height: global_height + 4,
    width: 2,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
