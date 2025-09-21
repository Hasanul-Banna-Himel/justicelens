import TimePicker from "@/components/custom/StyledTimePicker";
import { useAuth } from "@/contexts/authContext";
import { useGlobalDataContext } from "@/contexts/globalDataContext";
import { usePostContext } from "@/contexts/postContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { dayType, genderType, postInterface, prefGenderType } from "@/types";
import { deepEqual } from "@/utils/functions/deepEqual";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ScheduleScreen() {
  const theme = useThemeColor();
  const { user } = useAuth();
  const { semester } = useGlobalDataContext();
  const {
    setMySchedule: updateSchedule,
    loadingPosts,
    postError,
    userSchedule,
  } = usePostContext();

  const scheduleBoilerplate: postInterface = {
    pid: user?.uid as string,
    author_uid: user?.uid as string,
    district: "DHAKA",
    division: "DHAKA",
    gender: "male" as genderType,
    preferredPartnerGender: "male" as prefGenderType,
    thana: "RAMPURA",
    transportation: "",
    times: {
      friday: {
        starts: "",
        ends: "",
      },
      saturday: {
        starts: "",
        ends: "",
      },
      sunday: {
        starts: "",
        ends: "",
      },
      monday: {
        starts: "",
        ends: "",
      },
      tuesday: {
        starts: "",
        ends: "",
      },
      wednesday: {
        starts: "",
        ends: "",
      },
      thursday: {
        starts: "",
        ends: "",
      },
    },
    semester: semester,
  };

  const [MySchedule, setMySchedule] = useState<postInterface>(
    userSchedule
      ? JSON.parse(JSON.stringify(userSchedule))
      : scheduleBoilerplate
  );

  const DAYS: dayType[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const setSchedule = () => {
    if (deepEqual(MySchedule?.times, userSchedule?.times)) {
      Alert.alert(
        "Skipping Update Action",
        "You have not updated anything hence nothing to update"
      );
    } else {
      updateSchedule({ ...MySchedule, semester });
      if (postError) Alert.alert(postError?.name, postError?.message);
      else
        Alert.alert(
          "Schedule Updated",
          "Your Schedule is successfully updated."
        );
    }
  };

  const handleChange = (day: dayType, type: "start" | "end", value: string) => {
    const newSchedule = JSON.parse(JSON.stringify(MySchedule));
    if (type === "start") {
      newSchedule.times[day].starts = value;
    } else {
      newSchedule.times[day].ends = value;
    }
    setMySchedule(newSchedule);
  };

  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Edit Schedule
        </Text>
      </View>
      <View style={[styles?.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scrollViewContainer]}
        >
          {DAYS.map((day, index) => (
            <View style={[styles.dayContainer]} key={index}>
              <Text style={[styles?.days, { color: theme?.text }]}>{day}</Text>
              <View>
                <TimePicker
                  value={MySchedule?.times?.[day]?.starts}
                  onChange={(val) => handleChange(day, "start", val)}
                  label="Arrival"
                />
                <TimePicker
                  value={MySchedule?.times?.[day]?.ends}
                  onChange={(val) => handleChange(day, "end", val)}
                  label="Departure"
                />
              </View>
            </View>
          ))}
        </ScrollView>
        <Pressable
          onPress={() => setSchedule()}
          disabled={loadingPosts}
          style={[styles.sent_button, { backgroundColor: theme.primary }]}
        >
          <View>
            <Text style={[styles?.button_text, { color: theme.background }]}>
              {loadingPosts ? "Loading..." : "Update Schedule"}
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
    justifyContent: "center",
    gap: 8,
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
