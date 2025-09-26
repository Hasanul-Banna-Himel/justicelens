import StyledDatePicker from "@/components/custom/StyledDatePicker";
import StyledImagePicker from "@/components/custom/StyledImagePicker";
import StyledInput from "@/components/custom/StyledInput";
import StyledSelect from "@/components/custom/StyledSelect";
import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { genderType } from "@/types";
import { deleteImage } from "@/utils/cloudinary";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const { theme } = useThemeColor();
  const { loading, DBuser, updateDBProfile, error } = useAuth();

  const [Gender, setGender] = useState(DBuser?.gender ?? "");
  const [DOB, setDOB] = useState(DBuser?.dob);
  const [Institution, setInstitution] = useState<string | undefined | null>(
    DBuser?.institution
  );
  const [contact, setContact] = useState<string | null | undefined>(
    DBuser?.contact
  );
  const [photoURL, setPhotoURL] = useState<string | null | undefined>(
    DBuser?.photo_url
  );

  const GENDER_OPTIONS = [
    {
      text: "Male",
      value: "male",
    },
    {
      text: "Female",
      value: "female",
    },
  ];

  const handleUpdateProfile = async () => {
    if (
      DBuser?.gender === Gender &&
      DBuser?.dob === DOB &&
      DBuser?.institution === Institution &&
      DBuser?.contact === contact &&
      DBuser?.photo_url === photoURL
    ) {
      Alert.alert(
        "No Changes Detected",
        "You have not made any changes to update."
      );
      return;
    } else {
      if (DBuser?.photo_url && DBuser.photo_url !== photoURL) {
        await deleteImage(DBuser.photo_url);
      }
      updateDBProfile({
        ...DBuser,
        id: DBuser?.id as string,
        email: DBuser?.email as string,
        display_name: DBuser?.display_name as string,
        photo_url: photoURL,
        email_verified: DBuser?.email_verified as boolean,
        dob: DOB,
        institution: Institution,
        gender: Gender as genderType,
        contact: contact,
      });

      if (error) Alert.alert(error?.name, error?.message);
      else
        Alert.alert(
          "Profile Updated",
          "Your Profile is successfully updated.",
          [{ text: "OK", onPress: () => router.push("/profiles") }]
        );
    }
  };

  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.push("/profiles")}>
          <Ionicons name="chevron-back-sharp" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Edit Profile
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
          <StyledImagePicker
            value={photoURL}
            onChange={setPhotoURL}
            style={{
              borderRadius: "50%",
              aspectRatio: 1,
              marginHorizontal: "auto",
              width: 120,
            }}
            placeholder="Select Profile Image"
          />
          <StyledSelect
            value={Gender}
            onChange={setGender}
            options={GENDER_OPTIONS}
            label="Select Gender"
            labelBackgroundColor={theme.background}
            dropdownIconColor={theme.text}
          />
          <StyledDatePicker
            value={DOB}
            onChange={setDOB}
            label="Date Of Birth"
          />
          <StyledInput
            value={Institution as string}
            onChange={setInstitution}
            label="Institution (optional)"
            labelBackgroundColor={theme.background}
            placeholder="e.g., Office, University, College, School, etc."
          />
          <StyledInput
            value={contact as string}
            onChange={setContact}
            label="Contact Information (optional)"
            labelBackgroundColor={theme.background}
            placeholder="e.g., Phone number, messenger, telegram, etc."
          />
        </ScrollView>
        <Pressable
          onPress={() => handleUpdateProfile()}
          disabled={loading}
          style={[styles.sent_button, { backgroundColor: theme.primary }]}
        >
          <View>
            <Text style={[styles?.button_text, { color: theme.background }]}>
              {loading ? "Loading..." : "Update Profile"}
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
  error_text: {
    textAlign: "center",
  },
});
