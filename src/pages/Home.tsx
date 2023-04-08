import { useEffect } from "react";
import { useUserContext } from "../hooks/useUser";
import { getUsers } from "../services/userService";

const Home = () => {
  const { user } = useUserContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      console.log(users);
    };
    fetchUsers();
  }, []);

  return <div>{user ? user.email : "Not logged in"}</div>;
};

export default Home;
