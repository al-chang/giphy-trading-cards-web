import { useUserContext } from "../hooks/useUser";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
    </div>
  );
};

export default Profile;
