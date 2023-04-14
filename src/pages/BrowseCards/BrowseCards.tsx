import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCards } from "../../services/cardService";
import Card from "../../components/Card/Card";

import "./index.css";

export type TCard = {
  id: string;
  gif: string;
  createdAt: string;
  updatedAt: string;
  packId: string;
  ownerId: string;
};

const BrowseCards = () => {
  const [cards, setCards] = useState<TCard[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      const _cards = await getCards();
      setCards(_cards.data);
    };
    loadData();
  }, []);

  return (
    <div id="BrowseCards__container">
      {cards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default BrowseCards;
