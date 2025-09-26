import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function SettingsScreens() {
  const { theme, themeName, toggleThemeColor } = useThemeColor();

  const Options: {
    sectionTitle: string;
    options: {
      title: string;
      onPress?: () => void;
      icons: {
        left: React.ComponentProps<typeof Ionicons>["name"];
        right?: React.ComponentProps<typeof Ionicons>["name"];
      };
      toggle?: boolean;
    }[];
  }[] = [
    {
      sectionTitle: "Appearance",
      options: [
        {
          title: "Dark Mode",
          onPress: () => toggleThemeColor(),
          icons: {
            left: "moon-outline",
          },
          toggle: true,
        },
      ],
    },
    {
      sectionTitle: "Privacy",
      options: [
        {
          title: "Delete Account",
          onPress: () => router.push("/delete-account"),
          icons: {
            left: "trash-outline",
            right: "chevron-forward-sharp",
          },
        },
        {
          title: "Privacy Policy",
          onPress: () => router.push("/privacy-policy"),
          icons: {
            left: "shield-half",
            right: "chevron-forward-sharp",
          },
        },
      ],
    },
  ];
  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.push("/profiles")}>
          <Ionicons name="chevron-back-sharp" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Settings
        </Text>
        <Ionicons
          name="chevron-back-sharp"
          size={24}
          color={theme.text}
          style={{ opacity: 0 }}
        />
      </View>
      <View style={[styles.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scrollViewContainer]}
        >
          {React.Children.toArray(
            Options.map((el, index) => (
              <View style={[styles.detailsCon]} key={index}>
                <Text style={[styles.detailsTitle, { color: theme.text }]}>
                  {el.sectionTitle}
                </Text>
                {React.Children.toArray(
                  el.options.map((option, idx) => (
                    <Pressable
                      onPress={option.onPress}
                      style={[styles.detailsOption]}
                      key={idx}
                    >
                      <View
                        style={[
                          styles.detailsIcon,
                          { backgroundColor: theme.background_substitute },
                        ]}
                      >
                        <Ionicons
                          name={option.icons.left}
                          size={24}
                          color={theme.text}
                        />
                      </View>
                      <Text style={[styles.detailsKey, { color: theme.text }]}>
                        {option.title}
                      </Text>
                      {option.toggle ? (
                        <Switch
                          value={themeName === "dark"}
                          onValueChange={toggleThemeColor}
                          style={{ marginLeft: "auto" }}
                        />
                      ) : (
                        <Ionicons
                          name={option.icons.right}
                          size={24}
                          color={theme.text}
                          style={{ marginLeft: "auto" }}
                        />
                      )}
                    </Pressable>
                  ))
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 16,
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
  scrollViewContainer: {
    flex: 1,
    paddingBottom: 0,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
  },
  detailsIcon: {
    padding: 12,
    borderRadius: 10,
  },
  detailsKey: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
