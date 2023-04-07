import { useEffect, useState } from "react";
import { signup } from "../services/authService";
import { getUsers } from "../services/userService";
import { User } from "../types";

const SignUp = () => {
  const [newUser, setNewUser] = useState<User>({ email: "", password: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      console.log(users);
    };
    fetchUsers();
  });

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="email"
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={() => signup(newUser)}>Signup</button>
    </div>
  );
};

export default SignUp;
