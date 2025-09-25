"use client";
import { useApp } from "@/store";
import { supabase } from "@/utils/supabase";
import { PostID } from "@/utils/helpers/random";
import React, { useState } from "react";
import dist from "@/data/districts.json";
import { handlePostImageUploadCloudinary } from "@/utils/upload/cloudinary";

export default function CreatePost({ onPostCreated }: { onPostCreated?: () => void }) {
  const { profileData } = useApp();
  const DIVISIONData = dist;
  const [AddPostForm, setAddPostForm] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [division, setDivision] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [image, setImage] = useState<string | undefined>();
  const [video, setVideo] = useState<string | undefined>();
  const [crimeTime, setCrimeTime] = useState<string>("");
  const [crime_type, setCrimeType] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const [Loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string | undefined>();
  const [UploadError, setUploadError] = useState<string | undefined>();

  const closeAddPost = () => {
    setTitle("");
    setDescription("");
    setDivision("");
    setDistrict("");
    setImage(undefined);
    setCrimeTime("");
    setError(undefined);
    setAddPostForm(false);
  };
  const pid = PostID();
  const postTime = new Date().toLocaleDateString();
  const obj = {
    author_uid: isAnonymous ? null : profileData?.uid,
    title,
    description,
    division,
    district,
    image,
    video,
  crime_type,
    is_anonymous: isAnonymous,
    crimeTime,
    postTime,
  };
  const handlePosting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          id: pid,
          author_uid: isAnonymous ? null : profileData?.uid || null,
          title: title!,
          description: description!,
          division: division!,
          district: district!,
          image: image || null,
          video: video || null,
          crime_type: (crime_type || 'Other'),
          is_anonymous: isAnonymous,
          crime_time: crimeTime!,
          post_time: postTime,
        } as any);

      if (error) {
        throw error;
      }

      console.info("Post successfully created.");
      closeAddPost();
      onPostCreated?.(); // Call the callback to refresh posts
    } catch (err: any) {
      console.error("Error creating post:", err);
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  console.log(obj);

  return (
    <main className="">
      {!AddPostForm ? (
        <button
          type="button"
          className="w-full bg-[var(--aj-primary)] text-[var(--aj-background)] px-6 py-3 text-xl rounded-xl"
          disabled={Loading}
          onClick={() => setAddPostForm((p) => !p)}
        >
          {Loading ? "Loading..." : "Create Post"}
        </button>
      ) : (
        <div className="mt-4 bg-[var(--aj-background-substitute)] text-[var(--aj-foreground)] p-8 rounded-2xl">
          <h1 className="text-center text-4xl font-[var(--font-primary)] text-[var(--aj-primary)]">
            Report a crime
          </h1>
          <p className="text-center font-medium">
            Please put the information as accurate as possible.
          </p>
          <form onSubmit={handlePosting} className="flex flex-col gap-4">
            <div className="element flex flex-col gap-2">
              <label htmlFor="title">Title:</label>
              <input
                type="title"
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                name="title"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A crime near me"
              />
            </div>

            <div className="element flex flex-col gap-2">
              <label htmlFor="Description">Description:</label>
              <textarea
                name="Description"
                id="Description"
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg resize-none"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Elaborate the nature of the crime"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="element flex flex-col gap-2">
                <label htmlFor="division">Division:</label>
                <select
                  className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                  name="division"
                  id="division"
                  value={division}
                  required
                  onChange={(e) => setDivision(e.target.value)}
                >
                  <option value="" defaultValue={""}>
                    --
                  </option>
                  {React.Children.toArray(
                    DIVISIONData.Divisions.map((divis) => (
                      <option key={divis.name} value={divis.name}>
                        {divis.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="element flex flex-col gap-2">
                <label htmlFor="district">district:</label>
                <select
                  className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                  name="district"
                  id="district"
                  value={district}
                  required
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="" defaultValue={""}>
                    --
                  </option>
                  {division &&
                    DIVISIONData.Divisions.find((el) => el.name === division)
                      ?.districts &&
                    React.Children.toArray(
                      DIVISIONData.Divisions.find(
                        (el) => el.name === division
                      )?.districts.map((distr) => (
                        <option key={distr.name} value={distr.name}>
                          {distr.name}
                        </option>
                      ))
                    )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="element flex flex-col gap-2">
                <label htmlFor="crimeType">Category:</label>
                <select
                  className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                  id="crime_type"
                  value={crime_type}
                  required
                  onChange={(e) => setCrimeType(e.target.value)}
                >
                  <option value="">--</option>
                  {React.Children.toArray([
                    'Theft',
                    'Robbery',
                    'Assault',
                    'Harassment',
                    'Domestic Violence',
                    'Cyber Crime',
                    'Corruption',
                    'Drug Related',
                    'Traffic Incident',
                    'Missing Person',
                    'Vandalism',
                    'Fraud',
                    'Other',
                  ].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  )))}
                </select>
              </div>
              <div className="element flex items-center gap-2 mt-8">
                <input
                  id="anonymous"
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonymous">Report anonymously</label>
              </div>
            </div>

            <div className="element flex flex-col gap-2">
              <label htmlFor="image">Photo Proof:</label>
              <input
                type="file"
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                name="image"
                id="image"
                accept=".png,.jpg,.jpeg,.webp"
                required
                disabled={Loading}
                onChange={(e) =>
                  handlePostImageUploadCloudinary(
                    e.target.files![0],
                    pid,
                    setImage,
                    setLoading,
                    setUploadError
                  )
                }
              />
              {UploadError && (
                <div className="error text-sm text-red-500">{UploadError}</div>
              )}
            </div>

            <div className="element flex flex-col gap-2">
              <label htmlFor="video">Optional Video:</label>
              <input
                type="file"
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                name="video"
                id="video"
                accept=".mp4,.webm"
                disabled={Loading}
                onChange={(e) =>
                  e.target.files && e.target.files[0]
                    ? handlePostImageUploadCloudinary(
                        e.target.files[0],
                        `${pid}-video`,
                        setVideo,
                        setLoading,
                        setUploadError
                      )
                    : undefined
                }
              />
            </div>

            <div className="element flex flex-col gap-2">
              <label htmlFor="crimeTime">Approximate time:</label>
              <input
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                type="datetime-local"
                name="crimeTime"
                id="crimeTime"
                value={crimeTime}
                required
                onChange={(e) => setCrimeTime(e.target.value)}
              />
              {Error && (
                <div className="error text-sm text-red-500">{Error}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-[var(--aj-primary)] text-[var(--aj-background)] px-6 py-3 text-xl rounded-xl"
              disabled={Loading}
            >
              {Loading ? "Loading..." : "Create Post"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
