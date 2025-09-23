import { PostInterface, UserData } from "@/interfaces";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaComment } from "react-icons/fa";

export default function Post({ post }: { post: PostInterface }) {
  const [UserData, setUserData] = useState<UserData>({} as UserData);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  

  useEffect(() => {
    const dataCall = async () => {
      try {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', post.author_uid as string)
          .single();

        if (error) {
          throw error;
        }

        const u = userData as any
        const uType: UserData = u ? {
          id: u.id,
          displayName: u.display_name,
          photoURL: u.photo_url,
          userType: u.user_type,
          firstName: u.first_name,
          lastName: u.last_name,
          email: u.email,
        } : { 
          id: '', 
          displayName: '', 
          photoURL: '', 
          userType: 'user' 
        };

        setUserData(uType);
        setErrorMessage(undefined);
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setErrorMessage(error.message || "Unknown error");
      }
    };

    if (post?.author_uid && !post?.is_anonymous) {
      dataCall();
    }
  }, [post?.author_uid, post?.is_anonymous]);

  return (
    <div className="mt-4 bg-[var(--aj-background-substitute)] text-[var(--aj-foreground)] rounded-2xl flex flex-col gap-4">
      <div className="p-4 pb-0">
        <div className="flex gap-3 items-center">
          {!post?.is_anonymous && post?.author_uid ? (
            <>
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
            </>
          ) : (
            <div className="text-sm opacity-70">Anonymous</div>
          )}
          {post?.category && (
            <span className="ml-auto text-xs bg-[var(--aj-primary)]/10 text-[var(--aj-primary)] px-2 py-1 rounded">
              {post.category}
            </span>
          )}
        </div>
        <h2 className="text-lg">{post?.title}</h2>
        <p className="text-base">{post?.description}</p>
      </div>
      <div className="relative aspect-[16/9] w-full">
        {post?.video ? (
          <video controls className="w-full h-full object-cover">
            <source src={post.video} />
          </video>
        ) : (
          <img
            src={
              post?.image ??
              "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={post?.title ?? "Title"}
            className="w-full h-full object-cover object-center "
          />
        )}
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
