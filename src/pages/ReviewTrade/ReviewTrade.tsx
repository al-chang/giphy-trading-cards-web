import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  acceptTrade,
  getPendingTrade,
  TPendingTrade,
} from "../../services/tradeService";
import { Trade } from "../Trades/Trades";
import { getUserProfile } from "../../services/userService";
import { Profile } from "../Profile/Profile";
import { User } from "../../types";
import { getCard } from "../../services/cardService";
import { useUserContext } from "../../hooks/useUser";
import { TCard } from "../BrowseCards/BrowseCards";
import { TSingleCard } from "../ViewCard/ViewCard";
import { Button } from "antd";

import "./index.css";

const ReviewTrade = () => {
  const [trade, setTrade] = useState<TPendingTrade | null>(null);
  const [sender, setSender] = useState<User | null>(null);
  const [receiver, setReceiver] = useState<User | null>(null);
  const { id } = useParams();
  const { user } = useUserContext();
  const [responseMessage, setResponseMessage] = useState<String | null>();
  const navigate = useNavigate();

  const onAcceptTrade = async () => {
    if (!id || !trade) {
      // TODO: some error message
      return;
    }

    const response = await acceptTrade(id);
    setResponseMessage(response.message);
  };

  const onRejectTrade = async () => {
    if (!id || !trade) {
      // TODO: some error message
      return;
    }
    const response = await acceptTrade(id);
    setResponseMessage(response.message);
  };

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const getTradeData = async () => {
      const tradeData = await getPendingTrade(id);
      setTrade(tradeData);
    };

    const getUserData = async (
      id: string | undefined,
      sender: boolean
    ): Promise<User | undefined> => {
      if (!id) return undefined;
      const profile = await getUserProfile(id);
      const userObj = {
        id: profile.id,
        email: profile.email || "",
        username: profile.username,
        role: profile.role,
      };
      sender ? setSender(userObj) : setReceiver(userObj);
    };

    getTradeData();
    getUserData(trade?.sender.id, true);
    getUserData(trade?.receiver.id, false);
    console.log(sender?.username);
  }, [id, user]);

  return (
    <div className={"ReviewTrade__background"}>
      <h2>{`${sender?.username} Receives:`}</h2>
      <div className={"ReviewTrade__container"}>
        {trade?.cards
          ?.filter((c) => c.card.ownerId === trade.receiver.id)
          .map((c) => {
            const props = {
              id: c.card.id,
              name: c.card.name,
              gif: c.card.gif,
            };
            return <Card key={c.card.id} {...c.card} />;
          })}
      </div>
      <h2>{`${receiver?.username} Receives:`}</h2>
      <div className={"ReviewTrade__container"}>
        {trade?.cards
          ?.filter((c) => c.card.ownerId === trade.sender.id)
          .map((c) => {
            const props = {
              id: c.card.id,
              name: c.card.name,
              gif: c.card.gif,
            };
            return <Card key={c.card.id} {...c.card} />;
          })}
      </div>
      <div className="ReviewTrade__buttons">
        <Button onClick={onAcceptTrade}>Accept</Button>
        <Button onClick={onRejectTrade}>Reject</Button>
        {responseMessage && responseMessage !== "" && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default ReviewTrade;
