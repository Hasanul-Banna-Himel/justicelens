import { PostInterface, UserData } from "@/interfaces";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaComment } from "react-icons/fa";

export default function Post({ post }: { post: PostInterface }) {
  const [UserData, setUserData] = useState<UserData>({} as UserData);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  

  useEffect(() => {
    const dataCall = async () => {
      try {
        const docRef = doc(db, "users", post.author_uid);
        const docSnap = await getDoc(docRef);

        const uType: UserData = docSnap.exists() ? (docSnap.data() as UserData) : { displayName: "", photoURL: "", userType: "user" };

        setUserData(uType);
        setErrorMessage(undefined);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage(error instanceof FirebaseError ? error.code : "Unknown error");
      } finally {
        
      }
    };

    if (post?.author_uid) {
      dataCall();
    }
  }, [post?.author_uid, errorMessage]);

  return (
    <div className="mt-4 bg-[var(--aj-background-substitute)] text-[var(--aj-foreground)] rounded-2xl flex flex-col gap-4">
      <div className="p-4 pb-0">
        <div className="flex gap-3">
          <div className="image relative rounded-[50%] aspect-square w-5">
            <img
              src={
                UserData?.photoURL ??
                "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={UserData?.displayName ?? "User Name"}
              className="w-full h-full object-cover object-center rounded-[50%]"
            />
          </div>
          <div className="flex">{UserData?.displayName}</div>
        </div>
        <h2 className="text-lg">{post?.title}</h2>
        <p className="text-base">{post?.description}</p>
      </div>
      <div className="image relative aspect-[16/9] w-full">
        <img
          src={
            post?.image ??
            "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={post?.title ?? "Title"}
          className="w-full h-full object-cover object-center "
        />
      </div>
      <div className="p-4 pt-0">
        <div className="grid grid-cols-3">
          <div className="flex items-center justify-center">
            <BiSolidUpvote />
          </div>
          <div className="flex items-center justify-center">
            <FaComment />
          </div>
          <div className="flex items-center justify-center">
            <BiSolidDownvote />
          </div>
        </div>
      </div>
    </div>
  );
}
