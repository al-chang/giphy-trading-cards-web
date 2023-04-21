import { TUser } from "../pages/BrowseUsers/BrowseUsers";
import { TProfile } from "../pages/Profile/Profile";
import { Paginated } from "../types";
import api from "./api";

const USER_URL = "/users";
const COINS_URL = "/coins";

export const getUserProfile = async (userId: string) => {
  const res = await api.get<TProfile>(`${USER_URL}/${userId}`);
  return res.data;
};

export const getUsersList = async (params: Record<string, any>) => {
  const res = await api.get<Paginated<TUser>>(USER_URL, { params });
  return res.data;
};

export const getUserFeed = async () => {
  const res = await api.get<Record<string, any>[]>(`/feed`);
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
  const coins = await api.post<{ coins: number }>(`${COINS_URL}/daily`);
  return coins.data.coins;
};

export const addCoins = async (coins: number, userId: string) => {
  await api.post(COINS_URL, { coins, userId });
};
