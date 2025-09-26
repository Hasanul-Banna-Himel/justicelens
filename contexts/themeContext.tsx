import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeColors {
  background: string;
  background_substitute: string;
  foreground: string;
  primary: string;
  secondary: string;
}

const colors = {
  aj_dark_primary: "#404040",
  aj_dark_secondary: "#303030",

  aj_parrot_primary: "#f4ffac",
  aj_parrot_secondary: "#fcfffa",

  aj_light: "#ffffff",

  aj_green_primary: "#37402b",
  aj_green_secondary: "#e9ece5",

  aj_cream: "#f2f0eb",
};

const lightColors: ThemeColors = {
  background: colors.aj_cream,
  background_substitute: colors.aj_parrot_secondary,
  foreground: colors.aj_dark_primary,
  primary: colors.aj_green_primary,
  secondary: colors.aj_green_secondary,
};

const darkColors: ThemeColors = {
  background: colors.aj_dark_primary,
  background_substitute: colors.aj_dark_secondary,
  foreground: colors.aj_light,
  primary: colors.aj_parrot_primary,
  secondary: colors.aj_green_secondary,
};

interface ThemeContextProps {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await SecureStore.getItemAsync("theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      } else if (typeof window !== "undefined" && window.matchMedia) {
        setTheme(
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
