import { useEffect, useState } from "react";
import { signup } from "../../services/authService";
import { useUserContext } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

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
    } catch (error) {
      setErrorText("Error signing up");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          type="password"
          onChange={(e) =>
            setNewUser({ ...newUser, confirmPassword: e.target.value })
          }
        />
        <button type="submit">Signup</button>
        <p>{errorText}</p>
      </form>
    </div>
  );
};

export default SignUp;
