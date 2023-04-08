import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, profile } from "../services/authService";
import { User } from "../types";
import { useUserContext } from "../hooks/useUser";

const LogIn = () => {
  const [loginUser, setLoginUser] = useState<User>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, setUserData } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onFormSubmit = async () => {
    try {
      await login(loginUser);
      const retrievedProfile = await profile();
      setUserData(retrievedProfile);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <input
        onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
      />
      <input
        type="password"
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
      />
      <button onClick={onFormSubmit}>Login</button>
    </div>
  );
};

export default LogIn;
