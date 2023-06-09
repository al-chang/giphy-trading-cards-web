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
    { name: "Users", path: "/users" },
    !!user ? { name: "Coins", path: "/coins" } : undefined,
  ];

  if (user) links.push({ name: "Trades", path: "/trades" });

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
        className="App__Button"
        onClick={() => {
          navigate("/log-in");
        }}
      >
        Log In
      </button>
      <button
        className="App__Button"
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
      <img
        id="NavBar__logo"
        src="/giphymon.png"
        alt="GIPHYmon logo"
        onClick={() => navigate("/")}
      />
      <ul id="NavBar__links_container">
        {links.map((link) => {
          if (!link) return null;
          return (
            <li key={link.name} className="NavBar__list_item">
              <Link to={link.path} className="NavBar__link">
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div id="NavigationBar__auth_info">
        {!!user && (
          <span id="NavigationBar__user">
            <Link id="NavigationBar__user_link" to="/profile">
              {user?.username}
            </Link>
          </span>
        )}
        {buttons}
      </div>
    </nav>
  );
};

export default NagivationBar;
