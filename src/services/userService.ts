import api from "./api";

const USER_URL = "/users";

export const getUserProfile = async (userId: string) => {
  const res = await api.get(`${USER_URL}/${userId}`);
  return res.data;
};
