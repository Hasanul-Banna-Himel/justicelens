import SchedulePost from "@/components/custom/SchedulePost";
import { usePostContext } from "@/contexts/postContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import LogoHeader from "@/layout/LogoHeader";
import { postInterface } from "@/types";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  const theme = useThemeColor();
  const [POSTS, setPOSTS] = useState<postInterface[]>([]);

  const { posts: PostArray, loadingPosts } = usePostContext();

  useEffect(() => {
    setPOSTS(PostArray);
  }, [PostArray]);

  return (
    <ContainerGlobalClean>
      <LogoHeader />
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
            <SchedulePost key={index} postData={post} />
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
