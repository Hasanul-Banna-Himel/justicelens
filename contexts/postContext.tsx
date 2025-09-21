import { postContextProps, postInterface } from "@/types";
import { db } from "@/utils/firebase";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./authContext";
import { useGlobalDataContext } from "./globalDataContext";

const PostContext = createContext<postContextProps | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [PostArray, setPostArray] = useState<postInterface[]>([]);
  const [userSchedule, setUserSchedule] = useState<postInterface>();
  const [postError, setPostError] = useState<Error>();
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const { DBuser } = useAuth();
  const { loading, semester } = useGlobalDataContext();

  useEffect(() => {
    const getPostData = (): postInterface[] => {
      setLoadingPosts(true);
      try {
        async function dataCallSeries() {
          const data: postInterface[] = [];

          const q = query(collection(db, "posts"));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), pid: doc.id } as postInterface);
          });
          const usersPost = data.find(
            (post) => post.author_uid === DBuser?.uid
          );
          setUserSchedule(usersPost);
          return data.filter(
            (post) =>
              (post.preferredPartnerGender === "any" ||
                post.preferredPartnerGender === usersPost?.gender) &&
              post.author_uid !== DBuser?.uid &&
              post.semester === semester
          );
        }

        if (DBuser?.emailVerified) {
          Promise.resolve(dataCallSeries()).then((value) => {
            setPostArray(value);
            setLoadingPosts(false);
          });
        }
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        setLoadingPosts(false);
      }
      return [];
    };
    if (DBuser?.emailVerified) {
      setPostArray(getPostData());
    }
  }, [DBuser?.emailVerified, DBuser?.uid, loading, semester]);

  const getSearchFilteredPosts = (SearchText: string) => {
    if (SearchText)
      return PostArray.filter((post) =>
        post?.thana?.toLowerCase().includes(SearchText.toLowerCase())
      );
    else return PostArray;
  };

  const setMySchedule = async (schedule: postInterface) => {
    if (!DBuser?.uid) return;

    setLoadingPosts(true);
    try {
      const docRef = doc(db, "posts", DBuser.uid);
      await setDoc(docRef, schedule, { merge: true });
      setUserSchedule(schedule);
      setPostArray((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.author_uid === DBuser.uid) {
            return schedule;
          }
          return post;
        });
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error updating schedule: ", error);
      setPostError(error as Error);
    } finally {
      setLoadingPosts(false);
    }
  };
  const updatePostData = async (post: postInterface) => {
    if (!DBuser?.uid) return;

    setLoadingPosts(true);
    try {
      const docRef = doc(db, "posts", DBuser.uid);
      await setDoc(docRef, post, { merge: true });
      setUserSchedule(post);
      setPostArray((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.author_uid === DBuser.uid) {
            return post;
          }
          return post;
        });
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error updating schedule: ", error);
      setPostError(error as Error);
    } finally {
      setLoadingPosts(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: PostArray,
        userSchedule,
        loadingPosts,
        postError,
        setMySchedule,
        updatePostData,
        getSearchFilteredPosts,
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
