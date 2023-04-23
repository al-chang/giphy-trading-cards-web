import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUser";
import { getPendingTrades, Status } from "../../services/tradeService";
import { User } from "../../types";
import { TCard } from "../BrowseCards/BrowseCards";
import { TTradeFeed } from "../../services/feedService";
import TradePreviewFeed from "../../components/TradePreviewFeed/TradePreviewFeed";

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
      <h1>Pending Trades:</h1>
      <h2>Received:</h2>
      {pendingTrades
        ?.filter((t) => t.receiver.id === user?.id)
        .map((trade) => (
          <div>
            <h3>From {trade.sender.username}:</h3>
            <TradePreviewFeed key={trade.id} {...trade} />
          </div>
        ))}
      <h2>Sent:</h2>
      {pendingTrades
        ?.filter((t) => t.sender.id === user?.id)
        .map((trade) => (
          <TradePreviewFeed key={trade.id} {...trade} />
        ))}
    </>
  );
};

export default Trades;
