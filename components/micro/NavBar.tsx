import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProfileData } from "@/interfaces";
import { useApp } from "@/store";
import { BsPersonFillExclamation } from "react-icons/bs";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";
import { LogUserOut } from "@/utils/userFunction";

export default function NavBar() {
  const { loggedInStatus, profileData, userLogout }: { loggedInStatus: boolean, profileData: ProfileData | null, userLogout: () => void } = useApp();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <nav className="aj-nav">
      <div className="nav-desktop flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#about" className="hover:opacity-80">About Us</Link>
          <Link href="/#features" className="hover:opacity-80">Features</Link>
          <Link href="/#explore" className="hover:opacity-80">Explore</Link>
        </nav>
        <ThemeSwitch />
        {!loggedInStatus && (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[var(--aj-primary)] hover:opacity-80">Login</Link>
            <Link href="/register" className="px-3 py-1 rounded bg-[var(--aj-primary)] text-[var(--aj-background)] hover:opacity-90">Sign Up</Link>
          </div>
        )}
        <div
          className={`icon w-8 aspect-square rounded-[50%] border-2 border-transparent outline outline-1 outline-[var(--aj-${
            loggedInStatus ? "primary" : "background-substitute"
          })] relative flex items-center justify-center cursor-pointer`}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!loggedInStatus) {
              router.push("/login");
              return;
            }
            setOpen((p) => !p);
          }}
          ref={menuRef}
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
          {loggedInStatus && open && (
            <div className="absolute right-0 top-10 min-w-56 bg-[var(--aj-background-substitute)] text-[var(--aj-foreground)] shadow-lg rounded-lg p-3 z-50">
              <div className="flex items-center gap-3 border-b border-[var(--aj-border)] pb-3 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={
                      profileData?.photoURL ??
                      "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={profileData?.displayName ?? "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{profileData?.displayName ?? "User"}</span>
                  <span className="opacity-70">{profileData?.email ?? ""}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="text-left px-3 py-2 rounded hover:bg-[var(--aj-background)]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(false);
                    router.push("/profile");
                  }}
                >
                  View Profile
                </button>
                <button
                  type="button"
                  className="text-left px-3 py-2 rounded bg-[var(--aj-primary)] text-[var(--aj-background)] hover:opacity-90"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(false);
                    LogUserOut(userLogout);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
