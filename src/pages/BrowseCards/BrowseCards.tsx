import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCards } from "../../services/cardService";
import Card from "../../components/Card/Card";

import "./index.css";
import useFilter from "../../hooks/useFilter";

export type TCard = {
  id: string;
  name: string;
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

  const { filterValues, handleFilterChange, paramValues } = useFilter({
    ownerId: "",
    packId: "",
    page: "1",
  });

  const getCardData = async (params: Record<string, any>) => {
    const data = await getCards(params);
    setCards(data.data);
    setNextPage(data.next);
    setPreviousPage(data.prev);
  };

  useEffect(() => {
    getCardData({
      limit: 12,
      page: paramValues.get("page"),
      ownerId: paramValues.get("ownerId"),
      packId: paramValues.get("packId"),
    });
  }, [paramValues]);

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
            onClick={() =>
              handleFilterChange({
                field: "page",
                value: previousPage.toString(),
              })
            }
          >
            Previous
          </button>
        )}
        {nextPage && (
          <button
            className="App__Button"
            onClick={() =>
              handleFilterChange({ field: "page", value: nextPage.toString() })
            }
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BrowseCards;
