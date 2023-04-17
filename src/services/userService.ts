import { Profile } from "../pages/Profile/Profile";
import api from "./api";

const USER_URL = "/users";
const COINS_URL = "/coins";

export const getUserProfile = async (userId: string) => {
  const res = await api.get<Profile>(`${USER_URL}/${userId}`);
  return res.data;
};

export const followUser = async (userId: string) => {
  await api.post(`${USER_URL}/${userId}/follow`);
};

export const unfollowUser = async (userId: string) => {
  await api.delete(`${USER_URL}/${userId}/follow`);
};

export const getCoins = async () => {
  const res = await api.get<{ coins: number; lastCollected: string }>(
    COINS_URL
  );
  return res.data;
};

export const collectCoins = async () => {
  const coins = await api.post<number>(COINS_URL);
  return coins.data;
};

export const addCoins = async (coins: number, userId: string) => {
  await api.post(COINS_URL, { coins, userId });
};
