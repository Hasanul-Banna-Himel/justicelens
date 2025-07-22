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
    setLoading(false);
  }, [lastUpdated]);

  console.log(loggedInStatus);

  switch (pathname) {
    case "/":
    default:
      return (
        <div className={`flex flex-col`}>
          <Header />
          {children}
        </div>
      );
  }
}
