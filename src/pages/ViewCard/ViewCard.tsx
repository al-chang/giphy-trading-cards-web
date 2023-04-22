import { useEffect, useState } from "react";
import { TCard } from "../BrowseCards/BrowseCards";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCard } from "../../services/cardService";
import { TPack } from "../BrowsePacks/BrowsePacks";

import "./index.css";
import { useUserContext } from "../../hooks/useUser";

export type TSingleCard = TCard & {
  pack?: TPack;
  owner: { id: true; username: string };
};

const ViewCard = () => {
  const [card, setCard] = useState<TSingleCard | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const getCardData = async () => {
      const data = await getCard(id!);
      setCard(data);
    };
    getCardData();
  }, [id]);

  return (
    <div id="ViewCard__container">
      <img id="ViewCard__gif" src={card?.gif} alt="selected image" />
      <div id="ViewCard__metadata">
        <h2>{card?.name}</h2>
        <ul>
          <li>
            <strong>Owner:</strong>{" "}
            <Link
              to={
                card?.ownerId === user?.id
                  ? `/profile`
                  : `/profile/${card?.ownerId}`
              }
            >
              {card?.owner?.username}
            </Link>
          </li>
          <li>
            <strong>From Pack:</strong> {card?.pack?.name || "Custom"}
          </li>
          <li>
            <strong>Packed:</strong>{" "}
            {card?.createdAt && new Date(card?.createdAt).toDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewCard;
