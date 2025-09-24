import StyledDateTimePicker from "@/components/custom/StyledDateTimePicker";
import StyledImagePicker from "@/components/custom/StyledImagePicker";
import StyledInput from "@/components/custom/StyledInput";
import StyledSelect from "@/components/custom/StyledSelect";
import StyledTextArea from "@/components/custom/StyledTextArea";
import { useAuth } from "@/contexts/authContext";
import { usePostContext } from "@/contexts/postContext";
import dist from "@/data/districts.json";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { District, DistrictData, Division, postInterface } from "@/types";
import { PostID } from "@/utils/functions/generation";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function ScheduleScreen() {
  const { theme } = useThemeColor();
  const DIVISIONData: DistrictData = dist;
  const { user } = useAuth();
  const { AddPost, loadingPosts, postError } = usePostContext();

  const pid = PostID();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [division, setDivision] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [thana, setThana] = useState<string>("");
  const [crimeTime, setCrimeTime] = useState<Date>(new Date());
  const [crimeType, setCrimeType] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setVideo(null);
    setDivision("");
    setDistrict("");
    setThana("");
    setCrimeTime(new Date());
    setCrimeType("");
    setIsAnonymous(false);
  };

  const setSchedule = () => {
    if (!user?.id)
      Alert.alert("User not found", "Please signin again and try.");
    if (!pid) Alert.alert("Something went wrong.", "Please try again.");

    if (
      !thana ||
      !district ||
      !division ||
      !crimeTime ||
      !title ||
      !description ||
      !image
    ) {
      Alert.alert(
        "Required fields missing",
        "Please fill all the required fields."
      );
    } else {
      const postObject: postInterface = {
        id: pid,
        author_uid: user?.id as string,
        title,
        description,
        image,
        district,
        division,
        thana,
        crime_time: crimeTime?.toISOString(),
        post_time: new Date().toISOString(),
        crime_type: crimeType,
        is_anonymous: isAnonymous,
        video,
      };
      AddPost(postObject);
      if (postError) Alert.alert(postError?.name, postError?.message);
      else {
        Alert.alert(
          "Reported Successfully",
          "You have successfully reported " + title + "crime."
        );
        resetFields();
        router.push("/");
      }
    }
  };

  useEffect(() => {
    setDistrict("");
    setThana("");
  }, [division]);

  useEffect(() => {
    setThana("");
  }, [district]);

  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <View style={styles.headerCenterContainer}>
          <Text style={[styles?.pageTitle, { color: theme.primary }]}>
            Report a Crime
          </Text>
          <Text style={[styles?.pageSubtitle, { color: theme.text }]}>
            Please put the information as accurate as possible.
          </Text>
        </View>
      </View>
      <View style={[styles?.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scrollViewContainer]}
        >
          <StyledInput
            value={title}
            onChange={setTitle}
            label="Title"
            labelBackgroundColor={theme.background}
            placeholder="Crime alert in XYZ area"
          />
          <StyledTextArea
            value={description}
            onChange={setDescription}
            label="Description"
            labelBackgroundColor={theme.background}
            placeholder="Describe the incident"
            numberOfLines={4}
          />
          <StyledSelect
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
          />
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
          <StyledImagePicker
            value={image}
            onChange={setImage}
            label="Photo Proof"
            labelBackgroundColor={theme.background}
            placeholder="Select a file"
          />
          <StyledDateTimePicker
            value={crimeTime}
            onChange={setCrimeTime}
            label="Approximate Time"
            labelBackgroundColor={theme.background}
          />
          <StyledInput
            value={crimeType}
            onChange={setCrimeType}
            label="Crime Type (Optional)"
            labelBackgroundColor={theme.background}
            placeholder="e.g., robbery, assault"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: theme.text }}>Post Anonymously</Text>
            <Switch
              trackColor={{ false: "#767577", true: theme.primary }}
              thumbColor={isAnonymous ? theme.background : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsAnonymous}
              value={isAnonymous}
            />
          </View>
          <Pressable
            onPress={() => setSchedule()}
            disabled={loadingPosts}
            style={[styles.sent_button, { backgroundColor: theme.primary }]}
          >
            <View>
              <Text style={[styles?.button_text, { color: theme.background }]}>
                {loadingPosts ? "Loading..." : "Post Now"}
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerCenterContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pageSubtitle: {
    fontSize: 14,
    fontWeight: "400",
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
  twoColumnContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    position: "relative",
  },
  dayContainer: {
    marginVertical: 8,
  },
  days: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
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
