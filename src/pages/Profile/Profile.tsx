import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import {
  getUserProfile,
  unfollowUser,
  followUser,
} from "../../services/userService";
import { Role } from "../../types";

export type Profile = {
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

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
      <h1>Profile</h1>
      <p>
        <strong>Email:</strong> {profile?.email}
      </p>
      <p>
        <strong>Username:</strong> {profile?.username}
      </p>
      <p>
        <strong>Role:</strong> {profile?.role}
      </p>
      <p>
        <strong>Coins:</strong> {profile?.coins}
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
      <Link to={`/cards?ownerId=${profile?.id}`}>
        View {profile?.username}'s Cards
      </Link>
      {id && user?.id !== id && (
        <button onClick={updateFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default Profile;
