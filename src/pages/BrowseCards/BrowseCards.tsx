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
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCardData = async (params: Record<string, any>) => {
    const data = await getCards(params);
    setCards(data.data);
    setNextPage(data.next);
    setPreviousPage(data.prev);
  };

  useEffect(() => {
    getCardData({
      limit: 12,
      page: parseInt(searchParams.get("page") || "1"),
      ownerId: searchParams.get("ownerId"),
      packId: searchParams.get("packId"),
    });
  }, [searchParams]);

  return (
    <div>
      <div id="BrowseCards__container">
        {cards?.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <div id="BrowseCards__control">
        {previousPage && (
          <button
            className="App__Button"
            onClick={() => {
              searchParams.set("page", previousPage.toString());
              setSearchParams(searchParams);
            }}
          >
            Previous
          </button>
        )}
        {nextPage && (
          <button
            className="App__Button"
            onClick={() => {
              searchParams.set("page", nextPage.toString());
              setSearchParams(searchParams);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BrowseCards;
