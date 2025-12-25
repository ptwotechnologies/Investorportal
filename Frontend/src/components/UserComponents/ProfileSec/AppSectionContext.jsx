import React, { createContext, useContext, useState } from "react";

const AppSectionContext = createContext();

export const AppSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <AppSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </AppSectionContext.Provider>
  );
};

export const useAppSection = () => useContext(AppSectionContext);
