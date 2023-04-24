import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUser";
import { getPendingTrades, Status } from "../../services/tradeService";
import { User } from "../../types";
import { TCard } from "../BrowseCards/BrowseCards";
import { TTradeFeed } from "../../services/feedService";
import TradePreviewFeed from "../../components/TradePreviewFeed/TradePreviewFeed";

import "./index.css";

export type Trade = {
  id: string;
  sender: User;
  receiver: User;
  cards: TCard[] | null;
  status: Status;
};

const Trades = () => {
  const { user } = useUserContext();
  const [pendingTrades, setPendingTrades] = useState<TTradeFeed[] | null>(null);

  const getTrades = async () => {
    const data = await getPendingTrades();
    setPendingTrades(data);
    pendingTrades && pendingTrades?.length > 0 && console.log(pendingTrades[0]);
  };

  useEffect(() => {
    getTrades();
  }, [user]);

  return (
    <>
      {pendingTrades?.find(
        (t) => t.receiverId === user?.id || t.senderId === user?.id
      ) ? (
        <div>
          <h1>Pending Trades:</h1>
          {pendingTrades?.find((t) => t.receiverId === user?.id) && (
            <h2>Received:</h2>
          )}
          {pendingTrades
            ?.filter((t) => t.receiver.id === user?.id)
            .map((trade) => (
              <div className={"Trades__Preview"}>
                <TradePreviewFeed key={trade.id} {...trade} />
              </div>
            ))}
          {pendingTrades?.find((t) => t.senderId === user?.id) && (
            <h2>Sent:</h2>
          )}
          {pendingTrades
            ?.filter((t) => t.sender.id === user?.id)
            .map((trade) => (
              <div className={"Trades__Preview"}>
                <TradePreviewFeed key={trade.id} {...trade} />
              </div>
            ))}
        </div>
      ) : (
        <h1>You have no pending trades!</h1>
      )}
    </>
  );
};

export default Trades;
