import { postContextProps, postInterface } from "@/types";
import { supabase } from "@/utils/supabase";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./authContext";

const PostContext = createContext<postContextProps | undefined>(undefined);

const POST_LIMIT = 30;

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [PostArray, setPostArray] = useState<postInterface[]>([]);
  const [userPosts, setUserPosts] = useState<postInterface[]>([]);
  const [postError, setPostError] = useState<Error>();
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { DBuser } = useAuth();

  const fetchPosts = async (currentOffset: number) => {
    setLoadingPosts(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(currentOffset, currentOffset + POST_LIMIT - 1);

      if (error) throw error;

      const fetchedPosts: postInterface[] = data as postInterface[];

      if (fetchedPosts.length < POST_LIMIT) {
        setHasMorePosts(false);
      }

      if (currentOffset === 0) {
        setPostArray(fetchedPosts);
      } else {
        setPostArray((prevPosts) => [...prevPosts, ...fetchedPosts]);
      }
      setOffset(currentOffset + fetchedPosts.length);
    } catch (error) {
      console.error(error);
      setPostError(error as Error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const refreshPosts = async () => {
    setOffset(0);
    setHasMorePosts(true);
    await fetchPosts(0);
  };

  useEffect(() => {
    if (DBuser?.id) {
      refreshPosts();
    }
  }, [DBuser?.id]);

  useEffect(() => {
    const getUserPosts = async () => {
      if (!DBuser?.id) return;
      try {
        const data = PostArray.filter((post) => post.author_uid === DBuser.id);
        setUserPosts(data as postInterface[]);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
    getUserPosts();
  }, [DBuser?.id, PostArray.length]); // Added PostArray to dependencies to re-fetch user posts when all posts are refreshed

  const getSearchFilteredPosts = (SearchText: string) => {
    if (SearchText)
      return PostArray.filter((post) =>
        post?.thana?.toLowerCase().includes(SearchText.toLowerCase())
      );
    else return PostArray;
  };

  const AddPost = async (post: postInterface) => {
    if (!DBuser?.id) return;

    setLoadingPosts(true);
    try {
      const { error } = await supabase.from("posts").upsert(post);
      if (error) throw error;
      setUserPosts([post, ...userPosts]);
      setPostArray([post, ...PostArray]);
    } catch (error) {
      console.error("Error adding post: ", error);
      setPostError(error as Error);
    } finally {
      setLoadingPosts(false);
    }
  };
  const updatePostData = async (post: postInterface) => {
    if (!DBuser?.id) return;

    setLoadingPosts(true);
    try {
      const { error } = await supabase.from("posts").upsert(post);
      if (error) throw error;
      setUserPosts(userPosts.map((p) => (p.id === post.id ? post : p)));
      setPostArray(PostArray.map((p) => (p.id === post.id ? post : p)));
    } catch (error) {
      console.error("Error updating post: ", error);
      setPostError(error as Error);
    } finally {
      setLoadingPosts(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: PostArray,
        userPosts,
        loadingPosts,
        postError,
        AddPost,
        updatePostData,
        getSearchFilteredPosts,
        fetchPosts: () => fetchPosts(offset), // Expose fetchPosts for infinite scrolling
        refreshPosts, // Expose refreshPosts for pull-to-refresh
        hasMorePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within an PostProvider");
  }
  return context;
};
