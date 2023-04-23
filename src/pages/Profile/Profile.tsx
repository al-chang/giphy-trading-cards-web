import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import {
  getUserProfile,
  unfollowUser,
  followUser,
  addCoins,
  updateUserRole,
} from "../../services/userService";
import { Role } from "../../types";
import Modal from "../../components/Modal/Modal";
import "./index.css";

export type TProfile = {
  id: string;
  email?: string;
  username: string;
  role: Role;
  coins: number;
  createdAt: string;
  updatedAt: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
};

const Profile = () => {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coinsToAdd, setCoinsToAdd] = useState(0);

  useEffect(() => {}, [profile]);

  const { user, loading } = useUserContext();
  let { id } = useParams();
  const navigate = useNavigate();

  const updateFollow = async () => {
    if (!id || !profile) {
      return;
    }

    if (isFollowing) {
      await unfollowUser(id);
      setProfile({ ...profile, followerCount: profile.followerCount - 1 });
      setIsFollowing(false);
    } else {
      await followUser(id);
      setProfile({ ...profile, followerCount: profile.followerCount + 1 });
      setIsFollowing(true);
    }
  };

  const makeAdmin = async () => {
    if (!profile) return;
    if (user?.role === "ADMIN" || profile?.role !== "ADMIN") {
      updateUserRole(profile.id, Role.ADMIN);
    }
  };

  // If the user is not logged in and trying to view their own profile
  // then redirect to the login page
  useEffect(() => {
    if (!id && !user && !loading) {
      navigate("/log-in");
    }
  }, [id, user, loading, navigate]);

  // Get the correct user data based on URL params
  useEffect(() => {
    const idToSearch = id || user?.id;
    if (!idToSearch) {
      return;
    }
    const getUserData = async () => {
      const profile = await getUserProfile(idToSearch);
      setProfile(profile);
      setIsFollowing(profile.isFollowing);
    };
    getUserData();
  }, [id, user]);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <label htmlFor="coins">Coins</label>
          <input
            id="coins"
            type="number"
            value={coinsToAdd}
            className="App__text_input"
            onChange={(e) => setCoinsToAdd(parseInt(e.target.value))}
          />
          <button
            className="App__Button"
            onClick={async () => {
              await addCoins(coinsToAdd, profile?.id!);
              setProfile({ ...profile!, coins: profile!.coins + coinsToAdd });
            }}
          >
            Add
          </button>
        </div>
      </Modal>
      <h1>Profile</h1>{" "}
      {!id && user && user.id === profile?.id && profile?.role !== "ADMIN" && (
        <Link className="App__Button" to={`/profile/edit`}>
          Edit
        </Link>
      )}
      {id &&
        user &&
        user.role === Role.ADMIN &&
        profile?.role === Role.USER && (
          <button className="App__Button" onClick={makeAdmin}>
            Make Admin
          </button>
        )}
      {(user?.role === Role.ADMIN || !id) && (
        <p>
          <strong>Email:</strong> {profile?.email}
        </p>
      )}
      <p>
        <strong>Username:</strong> {profile?.username}
      </p>
      <p>
        <strong>Role:</strong> {profile?.role}
      </p>
      <p>
        <strong>Coins:</strong> {profile?.coins}{" "}
        {user?.role === Role.ADMIN && (
          <button
            className={"Profile__addbutton"}
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        )}
      </p>
      <p>
        <strong>Joined:</strong>{" "}
        {profile?.createdAt && new Date(profile?.createdAt).toDateString()}
      </p>
      <p>
        <strong>Followers:</strong> {profile?.followerCount}
      </p>
      <p>
        <strong>Following:</strong> {profile?.followingCount}
      </p>
      {user && (
        <div>
          {id && user?.id !== id && (
            <button className="App__Button" onClick={updateFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
          <Link className="App__Button" to={`/cards?ownerId=${profile?.id}`}>
            View {profile?.id === user?.id ? "Your" : profile?.username + "'s"}{" "}
            Cards
          </Link>
          {user?.id !== profile?.id && (
            <Link className="App__Button" to={`/propose/${profile?.id}`}>
              Propose Trade
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
