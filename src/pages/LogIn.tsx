import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFields, login, profile } from "../services/authService";
import { useUserContext } from "../hooks/useUser";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={onFormSubmit}>
        <input
          onChange={(e) =>
            setLoginUser({ ...loginUser, email: e.target.value })
          }
        />
        <input
          type="password"
          onChange={(e) =>
            setLoginUser({ ...loginUser, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
      <p>{errorText}</p>
    </div>
  );
};

export default LogIn;
