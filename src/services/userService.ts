import api from "./api";

const BASE_URL = "http://localhost:5001/api";
const USER_API = `${BASE_URL}/users`;

export const getUsers = async () => {
  const res = await api.get(`${USER_API}`);
  const data = await res.data;
  return data;
};
