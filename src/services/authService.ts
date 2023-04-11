import { User } from "../types";
import api from "./api";

const AUTH_API = `/auth`;

export type LoginFields = {
  email: string;
  password: string;
};

export const signup = (user: LoginFields) =>
  api.post<User>(`${AUTH_API}/signup`, user).then((response) => response.data);

export const login = (user: LoginFields) =>
  api.post<User>(`${AUTH_API}/login`, user).then((response) => response.data);

export const logout = () =>
  api.post(`${AUTH_API}/logout`).then((response) => response.data);

export const profile = () =>
  api
    .get<User>(`${AUTH_API}/profile`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error);
    });
