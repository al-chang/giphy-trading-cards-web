import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import { useEffect } from "react";

const Profile = () => {
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

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Username:</strong> {user?.username}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
    </div>
  );
};

export default Profile;
