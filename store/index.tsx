"use client";

import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState, ContextState } from "./reducer";
import { processProfileData } from "./helper/processProfileData";

import { ProfileData } from "@/interfaces";

type ContextActions = {
  userLogin: (uState: boolean, uData: ProfileData) => void;
  userLogout: () => void;
  updateUser: (data: ProfileData | null) => void;
  updateUserSingle: (field: string, value: string) => void;
  LastUpdated: (data: Date) => void;
};

type ContextValue = ContextState & ContextActions;

const Context = createContext<ContextValue | undefined>(undefined);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const userLogin = (uState: boolean, uData: ProfileData | null) => {
    dispatch({ type: "login", payload: uState });
    dispatch({ type: "profileData", payload: processProfileData(uData) });
    sessionStorage.loggedIn = uState ? "yes" : "no";
    sessionStorage.user = JSON.stringify(processProfileData(uData));
  };

  const userLogout = () => {
    dispatch({ type: "login", payload: false });
    dispatch({ type: "profileData", payload: null });
    sessionStorage.loggedIn = "no";
    sessionStorage.removeItem("user");
  };

  const updateUser = (data: object | null) => {
    dispatch({ type: "profileData", payload: processProfileData(data) });
    sessionStorage.user = JSON.stringify(processProfileData(data));
  };

  const updateUserSingle = (field: string, value: string) => {
    const data = { ...state.profileData };
    data[field] = value;
    dispatch({ type: "profileData", payload: processProfileData(data) });
    sessionStorage.user = JSON.stringify(processProfileData(data));
  };

  const LastUpdated = (data: Date) => {
    dispatch({ type: "lastUpdated", payload: data });
  };

  const value: ContextValue = {
    ...state,
    userLogin,
    userLogout,
    updateUser,
    updateUserSingle,
    LastUpdated,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useApp = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useApp must be used within a Provider");
  }
  return context;
};
