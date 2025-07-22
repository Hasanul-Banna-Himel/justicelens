import React from "react";
import { ProfileData } from "@/interfaces";
import { useApp } from "@/store";
import { BsPersonFillExclamation } from "react-icons/bs";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";
import { LogUserOut } from "@/utils/userFunction";

export default function NavBar() {
  const { loggedInStatus, profileData, userLogout }: { loggedInStatus: boolean, profileData: ProfileData | null, userLogout: () => void } = useApp();

  const router = useRouter();

  return (
    <nav className="aj-nav">
      <div className="nav-desktop flex items-center gap-4">
        <ThemeSwitch />
        <div
          className={`icon w-8 aspect-square rounded-[50%] border-2 border-transparent outline outline-1 outline-[var(--aj-${
            loggedInStatus ? "primary" : "background-substitute"
          })] relative flex items-center justify-center cursor-pointer`}
          role="button"
          tabIndex={0}
          onClick={() =>
            loggedInStatus
              ? LogUserOut(userLogout)
              : router.push(loggedInStatus ? "/dashboard" : "/login")
          }
        >
          {loggedInStatus ? (
            <img
              src={
                profileData?.photoURL ??
                "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={profileData?.displayName ?? "User Name"}
              className="w-full h-full object-cover object-center rounded-[50%]"
            />
          ) : (
            <BsPersonFillExclamation className="text-2xl text-[var(--aj-primary)]" />
          )}
        </div>
      </div>
    </nav>
  );
}
