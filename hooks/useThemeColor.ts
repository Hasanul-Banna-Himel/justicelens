/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Appearance } from "react-native";

export function useThemeColor() {
  const theme = useColorScheme() ?? "light";

  const toggleThemeColor = () =>
    Appearance.setColorScheme(theme === "dark" ? "light" : "dark");

  return { theme: Colors[theme], toggleThemeColor, themeName: theme };
}
