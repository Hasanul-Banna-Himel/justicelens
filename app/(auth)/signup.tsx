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

export default function SignupPage() {
  const theme = useThemeColor();
  const { loading, error, signUp } = useAuth();

  const [FirstName, setFirstName] = useState<string>("");
  const [LastName, setLastName] = useState<string>("");
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
            Create Account
          </Text>
          <View style={styles.nav_empty}></View>
        </View>

        <View style={[styles.form_container]}>
          <View style={[styles.two_inputs_container]}>
            <View style={[styles.input_container_two]}>
              <Text style={[styles.input_label, { color: theme?.text }]}>
                First Name
              </Text>
              <TextInput
                placeholder="John"
                placeholderTextColor={theme.gray}
                style={[
                  styles.input_box,
                  { color: theme?.primary, borderColor: theme.text },
                ]}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View style={[styles.input_container_two]}>
              <Text style={[styles.input_label, { color: theme?.text }]}>
                LastName
              </Text>
              <TextInput
                placeholder="Dao"
                placeholderTextColor={theme.gray}
                style={[
                  styles.input_box,
                  { color: theme?.primary, borderColor: theme.text },
                ]}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
          </View>
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
            onPress={() => signUp(FirstName, LastName, ID, Password)}
            disabled={loading}
            style={[styles.submit_button, { backgroundColor: theme.primary }]}
          >
            <View>
              <Text style={[{ color: theme.background }]}>
                {loading ? "Loading..." : "Signup"}
              </Text>
            </View>
          </Pressable>
        </View>

        <Link
          href={"/signin"}
          asChild
          style={[styles.change_to_button, { color: theme.primary }]}
        >
          <Text>
            Already Have An Account?{" "}
            <Text style={[{ textDecorationLine: "underline" }]}>Signin</Text>
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
  two_inputs_container: {
    gap: 16,
    flexDirection: "row",
    width: "100%",
  },
  input_container_two: {
    gap: 8,
    width: "47%",
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
