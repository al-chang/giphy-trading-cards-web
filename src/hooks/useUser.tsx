import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import { profile } from "../services/authService";

type UserContextType = {
  user: User | null;
  setUserData: (value: React.SetStateAction<User | null>) => void;
};

const UserContext = createContext<UserContextType>(null!);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const retrievedProfile = await profile();
      setUserData(retrievedProfile);
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
