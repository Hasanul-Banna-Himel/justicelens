import { useEffect, useState } from "react";
import { Appearance, useColorScheme as useRNColorScheme } from "react-native";

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }
  const toggleThemeColor = () =>
    Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return { theme: "light", toggleThemeColor };
}
