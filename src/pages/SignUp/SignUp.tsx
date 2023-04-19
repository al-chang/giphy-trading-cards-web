import { useEffect, useState } from "react";
import { signup } from "../../services/authService";
import { useUserContext } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

import "./index.css";

export type SignUpForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [newUser, setNewUser] = useState<SignUpForm>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorText, setErrorText] = useState<string>("");

  const { user, setUserData } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUser.email || !newUser.username || !newUser.password) {
      setErrorText("Please fill out all fields");
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setErrorText("Passwords do not match");
      return;
    }
    try {
      const user = await signup({
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      });
      setUserData(user);
      navigate("/");
    } catch (error: any) {
      setErrorText(error?.response?.statusText || "Failed to signup");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div id="SignUp__container">
      <h1>Signup</h1>
      <form id="SignUp__form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="SignUp__input App__text_input"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="SignUp__input App__text_input"
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="SignUp__input App__text_input"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="SignUp__input App__text_input"
          onChange={(e) =>
            setNewUser({ ...newUser, confirmPassword: e.target.value })
          }
        />
        <button className="App__Button" type="submit">
          Signup
        </button>
        <p id="SignUp__error">{errorText}</p>
      </form>
    </div>
  );
};

export default SignUp;
