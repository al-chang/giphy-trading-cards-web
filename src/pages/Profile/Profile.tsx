import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/userService";
import { Role } from "../../types";

export type Profile = {
  id: string;
  email?: string;
  username: string;
  role: Role;
  coins: number;
  createdAt: string;
  updatedAt: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const { user, loading } = useUserContext();
  let { id } = useParams();
  const navigate = useNavigate();

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
      <Link to={`/cards?ownerId=${profile?.id}`}>
        View {profile?.username}'s Cards
      </Link>
    </div>
  );
};

export default Profile;
