import { useUserContext } from "../hooks/useUser";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const NagivationBar = () => {
  const { user, setUserData } = useUserContext();
  const navigate = useNavigate();

  if (user) {
    return (
      <button
        onClick={async () => {
          await logout();
          setUserData(null);
          navigate("/");
        }}
      >
        Sign out
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          navigate("/log-in");
        }}
      >
        Log In
      </button>
    );
  }
};

export default NagivationBar;
