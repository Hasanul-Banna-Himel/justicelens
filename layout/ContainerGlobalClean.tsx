import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Platform, SafeAreaView } from "react-native";

export default function ContainerGlobalClean({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeColor();
  return (
    <SafeAreaView
      style={{
        flex: 1,

        marginTop: Platform.OS === "android" ? 40 : 36,
        paddingTop: Platform.OS === "android" ? 8 : 0,
        marginBottom: Platform.OS === "android" ? 0 : 0,
        backgroundColor: theme.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
