"use client";
import { useApp } from "@/store";
import React, { useEffect, useState } from "react";
import CreatePost from "../posts/CreatePost";
import { supabase } from "@/utils/supabase";
import PostView from "../posts/PostView";
import { PostInterface } from "@/interfaces";

export default function Feed() {
  const { profileData, loggedInStatus } = useApp();
  const [Data, setData] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setData(data || []);
      setError(undefined);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    // Refresh posts after creating a new one
    fetchPosts();
  };

  const handlePostDeleted = () => {
    // Refresh posts after deleting one
    fetchPosts();
  };

  const handlePostEdited = () => {
    // Refresh posts after editing one
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      {loggedInStatus && (
        <CreatePost onPostCreated={handlePostCreated} />
      )}
      <PostView 
        Data={Data} 
        onPostDeleted={handlePostDeleted}
        onPostEdited={handlePostEdited}
      />
    </>
  );
}
