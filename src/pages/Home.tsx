import { useUserContext } from "../hooks/useUser";

const Home = () => {
  const { user } = useUserContext();

  return <div>{user ? user.email : "Not logged in"}</div>;
};

export default Home;
