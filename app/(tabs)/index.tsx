import SinglePost from "@/components/custom/SinglePost";
import { usePostContext } from "@/contexts/postContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import LogoHeader from "@/layout/LogoHeader";
import { postInterface } from "@/types";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const { theme } = useThemeColor();
  const [POSTS, setPOSTS] = useState<postInterface[]>([]);

  const {
    posts: PostArray,
    loadingPosts,
    fetchPosts,
    refreshPosts,
    hasMorePosts,
  } = usePostContext();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setPOSTS(PostArray);
  }, [PostArray]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshPosts();
    setRefreshing(false);
  }, [refreshPosts]);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20; // Threshold for fetching more posts

    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      !loadingPosts &&
      hasMorePosts
    ) {
      fetchPosts();
    }
  };

  return (
    <ContainerGlobalClean>
      <LogoHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scrollViewContainer]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {POSTS.length > 0 ? (
          POSTS.map((post, index) => <SinglePost key={index} postData={post} />)
        ) : !loadingPosts ? (
          <Text style={[styles?.ln_text, { color: theme?.text }]}>
            No Data Found
          </Text>
        ) : null}
        {loadingPosts && hasMorePosts && (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
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
    marginTop: 8,
    marginBottom: Platform.OS === "ios" ? 56 : 24,
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
