import { useUserContext } from "../../hooks/useUser";
import { logout } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";

const NagivationBar = () => {
  const { user, setUserData } = useUserContext();
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Cards", path: "/cards" },
    { name: "Packs", path: "/packs" },
  ];

  const buttons = user ? (
    <button
      className="NavBar__button"
      onClick={async () => {
        await logout();
        setUserData(null);
        navigate("/");
      }}
    >
      <i className="fas fa-sign-out-alt fa-2x"></i>
    </button>
  ) : (
    <>
      <button
        onClick={() => {
          navigate("/log-in");
        }}
      >
        Log In
      </button>
      <button
        onClick={() => {
          navigate("/sign-up");
        }}
      >
        Sign Up
      </button>
    </>
  );

  return (
    <nav id="NavBar__container">
      <img id="NavBar__logo" src="/giphymon.png" alt="GIPHYmon logo" />
      <ul id="NavBar__links_container">
        {links.map((link) => (
          <li key={link.name} className="NavBar__list_item">
            <Link to={link.path} className="NavBar__link">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {user?.username}
        {buttons}
      </div>
    </nav>
  );
};

export default NagivationBar;