"use client";
import { useApp } from "@/store";
import React, { useEffect, useState } from "react";
import CreatePost from "../posts/CreatePost";
import { sendVerificationEmail } from "@/utils/userFunction";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import PostView from "../posts/PostView";
import { PostInterface } from "@/interfaces";

export default function Feed() {
  const [Sent, setSent] = useState<boolean>(false);
  const { profileData, loggedInStatus } = useApp();

  const [Data, setData] = useState<PostInterface[]>([]);
  

  useEffect(() => {
    try {
      async function dataCallSeries() {
        const data: PostInterface[] = [];
        const q = query(collection(db, "posts"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          data.push({ ...(doc.data() as PostInterface), pid: doc.id });
        });
        return data;
      }

      Promise.resolve(dataCallSeries()).then((value) => {
        setData(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(Data);

  return (
    <>
      {loggedInStatus && (
        <>
          {profileData?.emailVerified ? (
            <CreatePost />
          ) : (
            <button
              type="button"
              className="w-full bg-[var(--aj-primary)] text-[var(--aj-background)] px-6 py-3 text-xl rounded-xl"
              onClick={(e) => sendVerificationEmail(e, Sent, setSent)}
              disabled={Sent}
            >
              {Sent ? "Verification mail sent" : "Verify Email"}
            </button>
          )}
        </>
      )}
      <PostView Data={Data} />
    </>
  );
}
