import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  acceptTrade,
  getPendingTrade,
  TPendingTrade,
} from "../../services/tradeService";
import { getUserProfile } from "../../services/userService";
import { TProfile } from "../Profile/Profile";
import { User } from "../../types";
import { useUserContext } from "../../hooks/useUser";

import "./index.css";

const ReviewTrade = () => {
  const [trade, setTrade] = useState<TPendingTrade | null>(null);
  const [sender, setSender] = useState<TProfile | null>(null);
  const [receiver, setReceiver] = useState<TProfile | null>(null);
  const { id } = useParams();
  const { user } = useUserContext();
  const [responseMessage, setResponseMessage] = useState<String | null>();
  const [authorized, setAuthorized] = useState<Boolean>(false);
  const navigate = useNavigate();

  const onAcceptTrade = async () => {
    if (!id || !trade) {
      // TODO: some error message
      return;
    }

    const response = await acceptTrade(id);
    setResponseMessage(response.message);
    navigate("/trades");
  };

  const onRejectTrade = async () => {
    if (!id || !trade) {
      // TODO: some error message
      return;
    }
    const response = await acceptTrade(id);
    setResponseMessage(response.message);
    navigate("/trades");
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
    getTradeData();
  }, [user]);

  useEffect(() => {
    const getUserData = async (
      id: string | undefined,
      sender: boolean
    ): Promise<User | undefined> => {
      if (!id) {
        return undefined;
      }
      const profile = await getUserProfile(id);
      sender ? setSender(profile) : setReceiver(profile);
    };
    getUserData(trade?.sender.id, true);
    getUserData(trade?.receiver.id, false);
    setAuthorized(
      user?.role === "ADMIN" ||
        trade?.sender.id === user?.id ||
        trade?.receiver.id === user?.id
    );
  }, [trade]);

  return authorized ? (
    <div className={"ReviewTrade__background"}>
      <h2>{`${sender?.username} Receives:`}</h2>
      <div className={"ReviewTrade__container"}>
        {trade?.cards
          ?.filter((c) => c.card.ownerId === trade.receiver.id)
          .map((c) => {
            return <Card key={c.card.id} {...c.card} />;
          })}
      </div>
      <h2>{`${receiver?.username} Receives:`}</h2>
      <div className={"ReviewTrade__container"}>
        {trade?.cards
          ?.filter((c) => c.card.ownerId === trade.sender.id)
          .map((c) => {
            return <Card key={c.card.id} {...c.card} />;
          })}
      </div>
      <div className="ReviewTrade__buttons">
        {user?.id === receiver?.id && (
          <button className="App__Button" onClick={onAcceptTrade}>
            Accept
          </button>
        )}
        <button className="App__Button" onClick={onRejectTrade}>
          Reject
        </button>
        {responseMessage && responseMessage !== "" && <p>{responseMessage}</p>}
      </div>
    </div>
  ) : (
    <h2>You Are Not Authorized to View this Trade!</h2>
  );
};

export default ReviewTrade;
