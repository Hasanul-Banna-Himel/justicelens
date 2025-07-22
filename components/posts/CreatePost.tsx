"use client";
import { useApp } from "@/store";
import { db } from "@/utils/firebase";
import { PostID } from "@/utils/helpers/random";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import dist from "@/data/districts.json";
import { handleImageUpload } from "@/utils/upload";

export default function CreatePost() {
  const { profileData } = useApp();
  const DIVISIONData = dist;
  const [AddPostForm, setAddPostForm] = useState<boolean>(false);

  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [division, setDivision] = useState<string | undefined>();
  const [district, setDistrict] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [crimeTime, setCrimeTime] = useState<string | undefined>();

  const [Loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string | undefined>();
  const [UploadError, setUploadError] = useState<string | undefined>();

  const closeAddPost = () => {
    setTitle(undefined);
    setDescription(undefined);
    setDivision(undefined);
    setDistrict(undefined);
    setImage(undefined);
    setCrimeTime(undefined);
    setError(undefined);
    setAddPostForm(false);
  };
  const pid = PostID();
  const postTime = new Date().toLocaleDateString();
  const obj = {
    author_uid: profileData?.uid,
    title,
    description,
    division,
    district,
    image,
    crimeTime,
    postTime,
  };
  const handlePosting = (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, "posts", pid);
    setDoc(
      docRef,
      JSON.parse(
        JSON.stringify({
          ...obj,
        })
      ),
      { merge: false }
    );
    console.info("User Data Successfully Updated.");
    closeAddPost();
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

            <div className="element flex flex-col gap-2">
              <label htmlFor="image">Photo Proof:</label>
              <input
                type="file"
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                name="image"
                id="image"
                accept=".png,.jpg,.jpeg,.mp4,.webp,.wmv"
                required
                disabled={Loading}
                onChange={(e) =>
                  handleImageUpload(
                    e,
                    pid,
                    "posts",
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
