import { TTradeFeed } from "../../services/feedService";

import "./index.css";

const TradePreview: React.FC<TTradeFeed> = ({
  sender,
  receiver,
  cards,
  status,
  updatedAt,
}) => {
  return (
    <div>
      <div>
        {sender.username} sent a trade to {receiver.username} at{" "}
        {new Date(updatedAt).toDateString()}
      </div>
      <div className="TradePreview__cards">
        <div className="TradePreview__sender_cards">
          {cards
            .filter(({ card }) => card.ownerId === sender.id)
            .map(({ card }) => (
              <div key={card.id} className="TradePreview__card">
                <img src={card.gif} />
              </div>
            ))}
        </div>
        <div className="TradePreview__receiver_cards">
          {cards
            .filter(({ card }) => card.ownerId === receiver.id)
            .map(({ card }) => (
              <div key={card.id} className="TradePreview__card">
                <img src={card.gif} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TradePreview;
