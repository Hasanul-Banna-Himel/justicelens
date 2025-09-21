import Chip from "@/components/custom/Chip";
import SchedulePost from "@/components/custom/SchedulePost";
import { usePostContext } from "@/contexts/postContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import LogoHeader from "@/layout/LogoHeader";
import { dayType, postInterface } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const theme = useThemeColor();
  const [SearchText, setSearchText] = useState<string>("");
  const [SelectedDay, setSelectedDay] = useState<number>(0);
  const [POSTS, setPOSTS] = useState<postInterface[]>([]);

  const {
    getSearchFilteredPosts,
    posts: PostArray,
    loadingPosts,
  } = usePostContext();

  useEffect(() => {
    const dayToday = new Date().getDay();
    setSelectedDay(dayToday);
  }, []);

  useEffect(() => {
    setPOSTS(PostArray);
  }, [PostArray]);

  useEffect(() => {
    if (SearchText) setPOSTS(getSearchFilteredPosts(SearchText));
    else setPOSTS(PostArray);
  }, [SearchText, getSearchFilteredPosts, PostArray]);

  const DAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return (
    <ContainerGlobalClean>
      <LogoHeader />
      <View
        style={[styles.searchContainer, { backgroundColor: theme.gray_light }]}
      >
        <Ionicons name="search-outline" size={24} color={theme.text} />
        <TextInput
          placeholder="Search By Thana..."
          placeholderTextColor={theme.gray}
          style={[
            styles.inputStyles,
            { color: theme?.primary, borderColor: theme.text },
          ]}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScrollContainer}
      >
        <View style={[styles.chipViewContainer]}>
          {DAYS.map((day, key) => (
            <Pressable key={key} onPress={() => setSelectedDay(key)}>
              <Chip
                text={day}
                styles={{
                  container: {
                    backgroundColor:
                      SelectedDay === key ? theme.primary : "transparent",
                    borderColor:
                      SelectedDay === key ? theme.background : theme.text,
                  },
                  text: {
                    color: SelectedDay === key ? theme.background : theme.text,
                  },
                }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scrollViewContainer]}
      >
        {loadingPosts ? (
          <Text style={[styles?.ln_text, { color: theme?.text }]}>
            Loading...
          </Text>
        ) : POSTS.length > 0 ? (
          POSTS.map((post, index) => (
            <SchedulePost
              key={index}
              postData={post}
              today={DAYS[SelectedDay] as dayType}
            />
          ))
        ) : (
          <Text style={[styles?.ln_text, { color: theme?.text }]}>
            No Data Found
          </Text>
        )}
      </ScrollView>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.OS === "android" ? 0 : 8,
    paddingHorizontal: 12,
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
  },
  chipScrollContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  chipViewContainer: {
    flexDirection: "row",
    gap: 8,
  },
  scrollViewContainer: {
    flex: 1,
    paddingBottom: 0,
    marginBottom: Platform.OS === "ios" ? 52 : 0,
  },
  inputStyles: {
    fontSize: 14,
  },
  ln_text: {
    fontSize: 20,
    padding: 24,
    textAlign: "center",
  },
});
