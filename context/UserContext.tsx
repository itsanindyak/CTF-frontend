"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  teamName: string;
  setTeamName: (teamName: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [teamName, setTeamName] = useState("");

  return (
    <UserContext.Provider value={{ teamName, setTeamName }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser miust be within Userprovider.");
  }
  return context;
};

export { UserContext, UserProvider, useUser };
