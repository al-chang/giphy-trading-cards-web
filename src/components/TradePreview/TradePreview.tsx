import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import { Trade } from "../../pages/Trades/Trades";

import "./index.css";

const TradePreview = (trade: Trade) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const navigateReviewTrade = () => {
    navigate(`/trade/${trade.id}`);
  };

  return (
    <div className="TradePreview__container">
      <div className="TradePreview__info">{`${
        user?.id === trade.sender.id ? "To" : "From"
      }: ${
        user?.id === trade.sender.id ? trade.receiver.email : trade.sender.email
      }`}</div>
      <button className="App__Button" onClick={navigateReviewTrade}>
        View
      </button>
    </div>
  );
};

export default TradePreview;
