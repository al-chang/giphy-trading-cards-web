import { useUserContext } from "../../hooks/useUser";

const Home = () => {
  const { user } = useUserContext();

  return <div>You are on the home page</div>;
};

export default Home;
