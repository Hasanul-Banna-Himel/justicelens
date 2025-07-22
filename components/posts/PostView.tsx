import { PostInterface } from "@/interfaces";
import React from "react";
import Post from "./Post";

export default function PostView({ Data }: { Data: PostInterface[] }) {
  return (
    <div className="flex flex-col gap-4">
      {Data &&
        Data.length > 0 &&
        React.Children.toArray(
          Data.map((post: PostInterface) => <Post post={post} />)
        )}
    </div>
  );
}
