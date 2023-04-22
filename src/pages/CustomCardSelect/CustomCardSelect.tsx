import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCardFromCandidate,
  getCandidateCards,
} from "../../services/cardService";

import "./index.css";
import "../../components/Card/index.css";

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
  const [cards, setCards] = useState<{ gif: string; source: string }[] | null>(
    null
  );

  const { filterValues, handleFilterChange, paramValues } = useFilter({
    term: "",
  });

  const navigate = useNavigate();

  const getCardData = async (tag: string | null) => {
    if (!tag) return;

    const data = await getCandidateCards(tag);
    setCards(data);
  };

  const purchaseCard = async (gif: string, source: string) => {
    const id = await createCardFromCandidate({ gif, source });

    navigate(`/card/${id}`);
  };

  useEffect(() => {
    getCardData(paramValues.get("term"));
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
          <button
            className="App__Button"
            onClick={() => getCardData(paramValues.get("term"))}
            disabled={!filterValues.term}
          >
            Re-roll
          </button>
        </div>
      </div>
      <div id="BrowseCards__container">
        {cards?.map((card) => (
          <div key={card.gif}>
            <div className="Card__background Card__bordergradient">
              <div
                className="Card__container"
                style={{ backgroundImage: `url(${card.gif})` }}
              ></div>
            </div>
            <button
              className="App__Button"
              style={{ width: "100%" }}
              onClick={() => purchaseCard(card.gif, card.source)}
            >
              Purchase (10,000 coins)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCards;
