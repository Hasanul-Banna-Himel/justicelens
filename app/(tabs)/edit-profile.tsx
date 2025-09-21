import StyledInput from "@/components/custom/StyledInput";
import StyledSelect from "@/components/custom/StyledSelect";
import { useAuth } from "@/contexts/authContext";
import { usePostContext } from "@/contexts/postContext";
import dist from "@/data/districts.json";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import {
  District,
  DistrictData,
  genderType,
  postTimesInterface,
  prefGenderType,
} from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const DIVISIONData: DistrictData = dist;

  const theme = useThemeColor();
  const { loading, DBuser, updateDBProfile } = useAuth();
  const { userSchedule, loadingPosts, postError, updatePostData } =
    usePostContext();

  const [Gender, setGender] = useState(userSchedule?.gender ?? "");
  const [ComfortableGender, setComfortableGender] = useState(
    userSchedule?.preferredPartnerGender ?? ""
  );
  const [division] = useState(userSchedule?.division ?? "DHAKA");
  const [district, setDistrict] = useState<string>(
    userSchedule?.district ?? ""
  );
  const [thana, setThana] = useState<string>(userSchedule?.thana ?? "");
  const [transportation, setTransportation] = useState<string>(
    userSchedule?.transportation ?? ""
  );
  const [contact, setContact] = useState<string>(DBuser?.contact ?? "");

  const GENDER_OPTIONS = [
    {
      text: "Male",
      value: "male",
    },
    {
      text: "Female",
      value: "female",
    },
    {
      text: "Everyone",
      value: "any",
    },
  ];

  useEffect(() => {
    if (division === userSchedule?.division) return;
    setDistrict("");
    setThana("");
  }, [division, userSchedule?.division]);

  useEffect(() => {
    if (district === userSchedule?.district) return;
    setThana("");
  }, [district, userSchedule?.district]);

  const handleUpdateProfile = () => {
    if (
      userSchedule?.thana === thana &&
      userSchedule?.district === district &&
      userSchedule?.division === division &&
      userSchedule?.gender === Gender &&
      userSchedule?.preferredPartnerGender === ComfortableGender &&
      userSchedule?.transportation === transportation &&
      DBuser?.contact === contact
    ) {
      Alert.alert(
        "No Changes Detected",
        "You have not made any changes to update."
      );
      return;
    } else {
      updatePostData({
        ...userSchedule,
        pid: userSchedule?.pid as string,
        author_uid: userSchedule?.author_uid as string,
        times: userSchedule?.times as postTimesInterface,
        semester: userSchedule?.semester as string,
        division,
        district,
        thana,
        transportation,
        gender: Gender as genderType,
        preferredPartnerGender: ComfortableGender as prefGenderType,
      });
      updateDBProfile({
        ...DBuser,
        uid: DBuser?.uid as string,
        email: DBuser?.email as string,
        displayName: DBuser?.displayName as string,
        photoURL: DBuser?.photoURL as string,
        emailVerified: DBuser?.emailVerified as boolean,
        division,
        district,
        thana,
        gender: Gender as genderType,
        preferredPartnerGender: ComfortableGender as prefGenderType,
        contact,
      });

      if (postError) Alert.alert(postError?.name, postError?.message);
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
          <StyledSelect
            value={Gender}
            onChange={setGender}
            options={GENDER_OPTIONS.slice(0, 2)}
            label="Select Gender"
            labelBackgroundColor={theme.background}
            dropdownIconColor={theme.text}
          />
          <StyledSelect
            value={ComfortableGender}
            onChange={setComfortableGender}
            options={GENDER_OPTIONS}
            label="Comfortable traveling with"
            labelBackgroundColor={theme.background}
            dropdownIconColor={theme.text}
          />
          {/* <StyledSelect
          value={division}
          onChange={setDivision}
          options={
            DIVISIONData.Divisions?.map((d: Division) => ({
              text: d.name,
              value: d.name,
            })) ?? []
          }
          label="Division"
          labelBackgroundColor={theme.background}
          dropdownIconColor={theme.text}
        /> */}
          {division !== "" && (
            <StyledSelect
              value={district}
              onChange={setDistrict}
              options={
                DIVISIONData.Divisions.find(
                  (el) => el.name === division
                )?.districts?.map((d: District) => ({
                  text: d.name,
                  value: d.name,
                })) ?? []
              }
              label="Districts"
              labelBackgroundColor={theme.background}
              dropdownIconColor={theme.text}
            />
          )}
          {district !== "" && (
            <StyledSelect
              value={thana}
              onChange={setThana}
              options={
                DIVISIONData.Divisions.find((el) => el.name === division)
                  ?.districts?.find((el: District) => el.name === district)
                  ?.thana?.map((d: string) => ({
                    text: d,
                    value: d,
                  })) ?? []
              }
              label="Thana"
              labelBackgroundColor={theme.background}
              dropdownIconColor={theme.text}
            />
          )}
          <StyledInput
            value={transportation}
            onChange={setTransportation}
            label="Preferred Transportation"
            labelBackgroundColor={theme.background}
            placeholder="e.g., Car, Bike, Bus, etc."
          />
          <StyledInput
            value={contact}
            onChange={setContact}
            label="Preferred Contact Information"
            labelBackgroundColor={theme.background}
            placeholder="e.g., Phone number, Email, messenger, telegram, etc."
          />
        </ScrollView>
        <Pressable
          onPress={() => handleUpdateProfile()}
          disabled={loadingPosts || loading}
          style={[styles.sent_button, { backgroundColor: theme.primary }]}
        >
          <View>
            <Text style={[styles?.button_text, { color: theme.background }]}>
              {loadingPosts || loading ? "Loading..." : "Update Profile"}
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
