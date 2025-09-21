import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SigninPage() {
  const theme = useThemeColor();
  const { loading, error, signIn } = useAuth();

  const [ID, setID] = useState<string>("");
  const [Password, setPassword] = useState<string>("");

  return (
    <ContainerGlobalClean>
      <View style={[styles.container]}>
        <View style={[styles.nav]}>
          <Pressable onPress={() => router.back()} style={[styles.nav_button]}>
            <AntDesign name="left" size={24} color={theme.primary} />
          </Pressable>
          <Text style={[styles.nav_text, { color: theme.primary }]}>
            Signin
          </Text>
          <View style={styles.nav_empty}></View>
        </View>
        <View style={[styles.form_container]}>
          <View style={[styles.input_container]}>
            <Text style={[styles.input_label, { color: theme?.text }]}>
              Student ID:
            </Text>
            <TextInput
              placeholder="0000-0-00-000"
              placeholderTextColor={theme.gray}
              style={[
                styles.input_box,
                { color: theme?.primary, borderColor: theme.text },
              ]}
              onChangeText={(text) => setID(text)}
            />
          </View>
          <View style={[styles.input_container]}>
            <Text style={[styles.input_label, { color: theme?.text }]}>
              Password:
            </Text>
            <TextInput
              placeholder="**********"
              placeholderTextColor={theme.gray}
              style={[
                styles.input_box,
                { color: theme?.primary, borderColor: theme.text },
              ]}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </Text>
          )}

          <Pressable
            onPress={() => signIn(ID, Password)}
            disabled={loading}
            style={[styles.submit_button, { backgroundColor: theme.primary }]}
          >
            <View>
              <Text style={[{ color: theme.background }]}>
                {loading ? "Loading..." : "Signin"}
              </Text>
            </View>
          </Pressable>
        </View>

        <Link
          href={"/signup"}
          asChild
          style={[styles.change_to_button, { color: theme.primary }]}
        >
          <Text>
            Don&apos;t Have An Account?{" "}
            <Text style={[{ textDecorationLine: "underline" }]}>Signup</Text>
          </Text>
        </Link>
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    gap: 24,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nav_button: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },
  nav_text: {
    fontSize: 24,
    fontWeight: "600",
  },
  nav_empty: {
    width: 24,
  },
  form_container: {
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: "100%",
  },
  input_container: {
    gap: 8,
    width: "100%",
  },
  input_label: {
    fontSize: 16,
    fontWeight: "500",
  },
  input_box: {
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 20,
  },
  submit_button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  change_to_button: {
    textAlign: "center",
    marginBottom: Platform.OS === "android" ? 30 : 0,
  },
});
