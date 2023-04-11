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
  loading: boolean;
};

const UserContext = createContext<UserContextType>(null!);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userProfile = await profile();
      setUserData(userProfile);
      setLoading(false);
    };
    fetchUser().catch((_err) => {
      setUserData(null);
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};
