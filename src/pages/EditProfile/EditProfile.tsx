import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import {
  updateUserEmail,
  updateUsername,
  updateUserPassword,
} from "../../services/userService";

import "./index.css";

const EditPofile = () => {
  const { user, loading, setUserData } = useUserContext();
  false;
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");
  // userEmail, setUserEmail] = useState<string>("");

  const navigate = useNavigate();

  const udpateUserName = async () => {
    if (!user) return;
    const response = await updateUsername(user.id, userName);
    response.status === 200 && setUserData({ ...user, username: userName });
  };

  const updateEmail = async () => {
    if (!user) return;
    const response = await updateUserEmail(user.id, userEmail);
    response.status === 200 && setUserData({ ...user, email: userEmail });
  };

  const updatePassword = async () => {
    if (!user) return;
    const response = await updateUserPassword(user.id, userPassword);
  };

  useEffect(() => {
    if (!user) return;
    setUserName(user.username);
    setUserEmail(user.email);
  }, [user]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="EditProfile__formcontainer">
      <div className="EditProfile__form">
        <button
          className="App__Button EditProfile__top_button"
          onClick={() => navigate("/profile")}
        >
          Back
        </button>
        <h1 className="EditProfile__title EditProfile__bordergradientbottom">
          Edit Profile
        </h1>
        <div className="EditProfile__edit_item">
          <label htmlFor="name">Username</label>
          <br></br>
          <span>
            <input
              type="text"
              name="name"
              id="name"
              className="App__text_input"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            />
          </span>
          <button
            className="App__Button EditProfile__Button"
            disabled={userName === user?.username}
            onClick={udpateUserName}
          >
            Save
          </button>
        </div>
        <div className="EditProfile__edit_item">
          <label htmlFor="name">Email</label>
          <br></br>
          <span>
            <input
              type="text"
              name="name"
              id="name"
              className="App__text_input"
              placeholder="Email"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              value={userEmail}
            />
          </span>
          <button
            className="App__Button EditProfile__Button"
            disabled={userEmail === user?.email}
            onClick={updateEmail}
          >
            Save
          </button>
        </div>
        <div className="EditProfile__edit_item">
          <label htmlFor="name">Password</label>
          <br></br>
          <span>
            <div className="EditProfile__edit_item">
              <input
                type="password"
                name="name"
                id="name"
                className="App__text_input"
                placeholder="Password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                value={userPassword}
              />
            </div>
            <label htmlFor="name">Confirm Password</label>
            <br></br>
            <div className="EditProfile__edit_item">
              <input
                type="password"
                name="name"
                id="name"
                className="App__text_input"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setUserConfirmPassword(e.target.value);
                }}
                value={userConfirmPassword}
              />
            </div>
            <button
              className="App__Button EditProfile__Button"
              disabled={
                userPassword == "" || userPassword !== userConfirmPassword
              }
              onClick={updatePassword}
            >
              Save
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditPofile;
