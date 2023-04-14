import { Profile } from "../pages/Profile/Profile";
import api from "./api";

const USER_URL = "/users";

export const getUserProfile = async (userId: string) => {
  const res = await api.get<Profile>(`${USER_URL}/${userId}`);
  return res.data;
};
