import { DBUserInterface } from "@/types";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface NudgeModalContextProps {
  isModalVisible: boolean;
  modalData: any | null;
  showNudgeModal: (data: any) => void;
  hideNudgeModal: () => void;
}

const NudgeModalContext = createContext<NudgeModalContextProps | undefined>(
  undefined
);

export const NudgeModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);

  const showNudgeModal = (data: any) => {
    setModalData(data);
    setModalVisible(true);
  };

  const hideNudgeModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  return (
    <NudgeModalContext.Provider
      value={{ isModalVisible, modalData, showNudgeModal, hideNudgeModal }}
    >
      {children}
    </NudgeModalContext.Provider>
  );
};

export const useNudgeModal = () => {
  const context = useContext(NudgeModalContext);
  if (context === undefined) {
    throw new Error("useNudgeModal must be used within a NudgeModalProvider");
  }
  return context;
};
