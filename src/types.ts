enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  email: string;
  password: string;
  role: Role;
};
