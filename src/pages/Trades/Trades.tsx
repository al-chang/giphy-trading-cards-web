import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUser";
import { getPendingTrades } from "../../services/tradeService";
import { User } from "../../types";
import { TCard } from "../BrowseCards/BrowseCards";
import TradePreview from "../../components/TradePreview/TradePreview";

export type Trade = {
  id: string;
  sender: User;
  receiver: User;
  cards: TCard[] | null;
};

const Trades = () => {
  const { user } = useUserContext();
  const [pendingTrades, setPendingTrades] = useState<Trade[] | null>(null);

  const getTrades = async () => {
    const data = await getPendingTrades();
    setPendingTrades(data);
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
          <TradePreview key={trade.id} {...trade} />
        ))}
      <h2>Sent:</h2>
      {pendingTrades
        ?.filter((t) => t.sender.id === user?.id)
        .map((trade) => (
          <TradePreview key={trade.id} {...trade} />
        ))}
    </>
  );
};

export default Trades;
