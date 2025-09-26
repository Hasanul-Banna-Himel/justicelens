"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { redirect, usePathname } from "next/navigation";
import { useApp } from "@/store";

export default function LayoutHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedInStatus, userLogin, lastUpdated } = useApp();
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  const [Loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();
  // useEffect(() => {

  // }, [pathname]);

  useEffect(() => {
    setLoading(true);
    if (sessionStorage.loggedIn === "yes") {
      if (
        sessionStorage.user &&
        sessionStorage.user !== null &&
        sessionStorage.user !== undefined &&
        sessionStorage.user !== ""
      ) {
        const data = JSON.parse(sessionStorage.user);
        if (typeof data === "object") {
          userLogin(true, data);
        }
      }
    }
    switch (pathname) {
      case "/login":
      case "/register":
        if (sessionStorage.loggedIn === "yes") redirect("/dashboard");
        break;
      case "/dashboard":
        if (sessionStorage.loggedIn !== "yes") redirect("/login");
        break;
      default:
        break;
    }
    try {
      if (sessionStorage.getItem('pendingProfileSetup') === 'yes' && sessionStorage.loggedIn === 'yes') {
        setShowProfilePrompt(true);
        sessionStorage.removeItem('pendingProfileSetup');
      }
    } catch {}
    setLoading(false);
  }, [lastUpdated]);

  console.log(loggedInStatus);

  switch (pathname) {
    case "/":
    default:
      return (
        <div className={`flex flex-col`}>
          <Header />
          {showProfilePrompt ? (
            <div className="w-[min(500px,100%)] mx-auto mt-4 bg-[var(--aj-background-substitute)] text-[var(--aj-foreground)] p-4 rounded-2xl">
              <div className="text-sm mb-2">Complete your profile by adding a picture:</div>
              {/* Lightweight inline uploader using the existing component would require routing; keep it simple with link */}
              <a href="#profile-upload" className="underline">Open profile picture uploader in your profile section</a>
            </div>
          ) : null}
          {children}
        </div>
      );
  }
}
