export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: string;
  email: string;
  username: string;
  role: Role;
};

export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  page: number;
  next: number | null;
  prev: number | null;
};
