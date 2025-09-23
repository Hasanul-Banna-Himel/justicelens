"use client";
import { useApp } from "@/store";
import { handleProfileImageUploadCloudinary } from "@/utils/upload/cloudinary";
import { updateUserProfileSupabase } from "@/utils/supabase/auth";
import React, { useState } from "react";

interface ProfilePictureUploadProps {
  onUploadComplete?: (url: string) => void;
}

export default function ProfilePictureUpload({ onUploadComplete }: ProfilePictureUploadProps) {
  const { profileData, updateUser } = useApp();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profileData?.uid) return;

    setError(undefined);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const imageUrl = await handleProfileImageUploadCloudinary(
      file,
      profileData.uid,
      () => {}, // setImageUrl - not needed since we're handling it manually
      setUploading,
      setError
    );

    if (imageUrl) {
      // Update user profile in Supabase
      try {
        await updateUserProfileSupabase(
          profileData.uid,
          { photo_url: imageUrl },
          () => {}, // setLoading - not needed
          () => {}, // setError - not needed
          () => {
            // onSuccess - update local state
            updateUser({
              ...profileData,
              photoURL: imageUrl,
            });
            onUploadComplete?.(imageUrl);
          }
        );
      } catch (err: any) {
        setError(err.message || 'Failed to update profile');
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img
          src={previewUrl || profileData?.photoURL || "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <div className="text-white text-sm">Uploading...</div>
          </div>
        )}
      </div>
      
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        id="profile-upload"
      />
      
      <label
        htmlFor="profile-upload"
        className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
          uploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {uploading ? 'Uploading...' : 'Change Profile Picture'}
      </label>
      
      {error && (
        <div className="text-red-500 text-sm text-center max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
}

