import { User } from "../types";
import api from "./api";

const BASE_URL = "http://localhost:5001/api";
const SECURITY_API = `${BASE_URL}/auth`;

export const signup = (user: User) =>
  api.post(`${SECURITY_API}/signup`, user).then((response) => response.data);

export const login = (user: User) =>
  api.post(`${SECURITY_API}/login`, user).then((response) => response.data);

export const logout = () =>
  api.post(`${SECURITY_API}/logout`).then((response) => response.data);

export const profile = () =>
  api.get(`${SECURITY_API}/profile`).then((response) => response.data);
