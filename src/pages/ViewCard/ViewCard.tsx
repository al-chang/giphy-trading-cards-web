import { useEffect, useState } from "react";
import { TCard } from "../BrowseCards/BrowseCards";
import { useNavigate, useParams } from "react-router-dom";
import { getCard } from "../../services/cardService";
import { TPack } from "../BrowsePacks/BrowsePacks";

import "./index.css";

export type TSingleCard = TCard & {
  pack: TPack;
  owner: { id: true; username: string };
};

const ViewCard = () => {
  const [card, setCard] = useState<TSingleCard | null>(null);

  const navigate = useNavigate();
  let { id } = useParams();

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
        <h2>Card Name</h2>
        <ul>
          <li>
            <strong>ID:</strong> {card?.id}
          </li>
          <li>
            <strong>Owner:</strong> {card?.owner?.username}
          </li>
          <li>
            <strong>Packed:</strong> {card?.createdAt}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewCard;
