import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCards, getPack } from "../../services/cardService";
import Card from "../../components/Card/Card";

import "./index.css";
import useFilter from "../../hooks/useFilter";
import { getUserProfile } from "../../services/userService";
import { useUserContext } from "../../hooks/useUser";

export type TCard = {
  id: string;
  name: string;
  gif: string;
  createdAt: string;
  updatedAt: string;
  packId?: string;
  ownerId: string;
};

const BrowseCards = () => {
  const [cards, setCards] = useState<TCard[] | null>(null);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [packName, setPackName] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  const { user } = useUserContext();

  const { filterValues, handleFilterChange, paramValues } = useFilter({
    ownerId: "",
    packId: "",
    page: "1",
    cardName: "",
    following: "",
  });

  const navigate = useNavigate();

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
      cardName: paramValues.get("cardName"),
      following: paramValues.get("following"),
    });
  }, [paramValues]);

  useEffect(() => {
    if (filterValues.ownerId && filterValues.packId) {
      navigate("/");
      return;
    }
    if (filterValues.ownerId) {
      const loadOwner = async () => {
        const profile = await getUserProfile(filterValues.ownerId);
        setOwnerName(profile.username);
      };
      loadOwner();
      return;
    }
    if (filterValues.packId) {
      const loadPack = async () => {
        const pack = await getPack(filterValues.packId);
        setPackName(pack.name);
      };
      loadPack();
      return;
    }
    setOwnerName(null);
    setPackName(null);
  }, [filterValues]);

  useEffect(() => {}, [user]);

  return (
    <div>
      <div id="BrowseCards__filters">
        <div className="BrowseCards__filter">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="App__text_input"
            placeholder="Card name"
            onChange={(e) =>
              handleFilterChange({
                field: "cardName",
                value: e.target.value,
                debounce: true,
              })
            }
            value={filterValues.cardName}
          />
        </div>
        <div className="BrowseCards__filter">
          <label htmlFor="following">Following</label>
          <input
            type="checkbox"
            name="following"
            id="following"
            className="App__text_input"
            onChange={(e) =>
              handleFilterChange({
                field: "following",
                value: e.target.checked ? "true" : "",
              })
            }
            checked={filterValues.following === "true"}
          />
        </div>
      </div>
      {paramValues.get("packId") && (
        <div id="BrowseCards__packName">
          <h2>Found in {packName}</h2>
        </div>
      )}
      {paramValues.get("ownerId") && user?.username !== ownerName && (
        <div id="BrowseCards__ownerName">
          <h2>{ownerName}'s Cards</h2>
          <button
            className="App__Button"
            onClick={() => navigate(`/propose/${paramValues.get("ownerId")}`)}
          >
            Propose Trade
          </button>
        </div>
      )}
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
