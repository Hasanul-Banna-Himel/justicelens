import { PostInterface, UserData } from "@/interfaces";
import { supabase, deletePost } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaComment, FaTrash } from "react-icons/fa";
import { useApp } from "@/store";

export default function Post({ post, onPostDeleted}: { 
  post: PostInterface; 
  onPostDeleted?: () => void;
  
}) {
  const { profileData } = useApp();
  const [UserData, setUserData] = useState<UserData>({} as UserData);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isDeleting, setIsDeleting] = useState(false);
  
  

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

  const handleDelete = async () => {
    if (!profileData?.uid || !post.author_uid || profileData.uid !== post.author_uid) {
      setErrorMessage("You can only delete your own posts");
      return;
    }

    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deletePost(post.id, profileData.uid);
      if (result.success) {
        onPostDeleted?.();
      } else {
        setErrorMessage(result.error || "Failed to delete post");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

 

  const isOwner = profileData?.uid && post.author_uid && profileData.uid === post.author_uid;

  return (
  <div className="mt-4 bg-[var(--aj-background-substitute)] text-[var(--aj-foreground)] rounded-2xl flex flex-col gap-4 items-center justify-center">
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
          <div className="flex gap-2 ml-auto">
            {post?.category && (
              <span className="text-xs bg-[var(--aj-primary)]/10 text-[var(--aj-primary)] px-2 py-1 rounded">
                {post.category}
              </span>
            )}
            {isOwner &&(
              <>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50"
                  title="Delete post"
                >
                  <FaTrash size={14} />
                </button>
              </>
            )}
          </div>
        </div>
        {post.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={post.image}
              alt={post.title || "Post image"}
              className="rounded-lg object-cover max-w-full max-h-[400px]"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
