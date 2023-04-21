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
        {sender.username} sent a trade to {receiver.username} on{" "}
        {new Date(updatedAt).toDateString()}
      </div>
      <div className="TradePreview__cards">
        <div className="TradePreview__sender_cards">
          {cards
            .filter(({ card }) => card.ownerId === sender.id)
            .map(({ card }) => (
              <img
                key={card.id}
                src={card.gif}
                className="TradePreview__card"
              />
            ))}
        </div>
        <div className="TradePreview__receiver_cards">
          {cards
            .filter(({ card }) => card.ownerId === receiver.id)
            .map(({ card }) => (
              <img
                key={card.id}
                src={card.gif}
                className="TradePreview__card"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TradePreview;
