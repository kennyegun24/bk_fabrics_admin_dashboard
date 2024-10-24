"use client";
import Settings from "@/components/Settings";
import { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [ltr, setLtr] = useState("rtl");
  const [showCaption, setShowCaption] = useState(true);
  const appDirection = (param) => {
    setLtr(param);
  };
  const shouldShowCaption = (param) => {
    setShowCaption(param);
  };
  return (
    <SettingsContext.Provider
      value={{
        setShowSettings,
        shouldShowCaption,
        showSettings,
        appDirection,
        ltr,
        showCaption,
      }}
    >
      {children}
      <Settings />
    </SettingsContext.Provider>
  );
};
