import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUser";
import { getCards } from "../../services/cardService";
import { TCard } from "../BrowseCards/BrowseCards";
import Card from "../../components/Card/Card";

const Home = () => {
  const { user, loading } = useUserContext();
  const [cards, setCards] = useState<TCard[]>([]);

  const loadData = async () => {
    const data = await getCards(user ? { following: true } : {});
    setCards(data.data);
  };

  useEffect(() => {
    if (loading) return;

    loadData();
  }, [user, loading]);

  return (
    <div>
      {cards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Home;
