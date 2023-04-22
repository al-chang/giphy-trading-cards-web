import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFields, login } from "../../services/authService";
import { useUserContext } from "../../hooks/useUser";

import "./index.css";

const LogIn = () => {
  const [loginUser, setLoginUser] = useState<LoginFields>({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState<string>("");

  const navigate = useNavigate();
  const { user, setUserData } = useUserContext();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login(loginUser);
      setUserData(user);
      navigate("/");
    } catch (error) {
      setErrorText("Failed to login");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div id="LogIn__container">
      <h1>Login</h1>
      <form onSubmit={onFormSubmit} id="LogIn__form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="LogIn__input App__text_input"
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setLoginUser({ ...loginUser, email: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="LogIn__input App__text_input"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginUser({ ...loginUser, password: e.target.value })
          }
        />
        <button type="submit" className="App__Button">
          Login
        </button>
      </form>
      <p id="LogIn__error">{errorText}</p>
    </div>
  );
};

export default LogIn;
