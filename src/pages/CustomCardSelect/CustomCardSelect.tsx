import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCards, getPack } from "../../services/cardService";
import Card from "../../components/Card/Card";

import "./index.css";
import useFilter from "../../hooks/useFilter";
import { getUserProfile } from "../../services/userService";

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

  const { filterValues, handleFilterChange, paramValues } = useFilter({
    term: "",
  });

  const navigate = useNavigate();

  const getCardData = async (params: Record<string, any>) => {
    const data = await getCards(params);
    setCards(data.data);
  };

  useEffect(() => {
    getCardData({
      limit: 12,
      term: paramValues.get("term"),
    });
  }, [paramValues]);

  return (
    <div>
      <div id="BrowseCards__filters">
        <div className="BrowseCards__filter">
          <label htmlFor="username">Search Term</label>
          <input
            type="text"
            name="name"
            id="name"
            className="App__text_input"
            placeholder="Card name"
            onChange={(e) =>
              handleFilterChange({
                field: "term",
                value: e.target.value,
                debounce: true,
              })
            }
            value={filterValues.term}
          />
        </div>
      </div>
      <div id="BrowseCards__container">
        {cards?.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default BrowseCards;
