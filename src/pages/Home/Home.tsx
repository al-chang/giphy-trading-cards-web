import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUser";
import { getCards } from "../../services/cardService";
import { TCard } from "../BrowseCards/BrowseCards";
import Card from "../../components/Card/Card";
import { getUserFeed } from "../../services/userService";

import "./index.css";

const Home = () => {
  const { user, loading } = useUserContext();
  const [cards, setCards] = useState<TCard[]>([]);

  const updateCards = async () => {
    const data = await getCards();
    setCards(data.data);
  };
  const updateUserFeed = async () => {
    const data = await getUserFeed();
    setCards(data);
  };

  useEffect(() => {
    if (loading) return;

    user ? updateUserFeed() : updateCards();
  }, [user, loading]);

  return (
    <div>
      {cards?.map((card) => (
        <div className="Home__Card">
          <p>Opened by {card.ownerId}</p>
          <Card key={card.id} {...card} />
        </div>
      ))}
    </div>
  );
};

export default Home;
