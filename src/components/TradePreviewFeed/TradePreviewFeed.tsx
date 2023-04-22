import { useEffect } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import { TTradeFeed } from "../../services/feedService";

import "./index.css";

const TradePreview: React.FC<TTradeFeed> = ({
  id,
  sender,
  receiver,
  cards,
  status,
  updatedAt,
}) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {}, [user]);
  return (
    <div className="TradePreview__background">
      <div className="TradePreview__info">
        <div>
          {sender.id === user?.id ? "You" : sender.username} sent a trade to{" "}
          {receiver.username} on {new Date(updatedAt).toDateString()}
          <div>
            Status:{" "}
            <span className={`TradePreview__${status}`}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </div>
        </div>
        {status === "PENDING" && (
          <Link className="TradePreview__view" to={`/trade/${id}`}>
            <div className="TradePreview__view_link">Review Trade</div>
          </Link>
        )}
      </div>

      <div className="TradePreview__cards">
        <div className="TradePreview__user_cards">
          <p>{`${sender.username} sends:`}</p>
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
        </div>

        <div className="TradePreview__receiver_cards">
          <div className="TradePreview__user_cards">
            <p>{`${receiver.username} sends:`}</p>
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
    </div>
  );
};

export default TradePreview;
