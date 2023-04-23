import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";
import { TTradeFeed } from "../../services/feedService";
import { Status } from "../../services/tradeService";

import "./index.css";

const TradePreview: React.FC<TTradeFeed> = ({
  id,
  sender,
  receiver,
  cards,
  status,
  updatedAt,
}) => {
  const [senderDisplay, setSenderDisplay] = useState<string>(sender.username);
  const [receiverDisplay, setReceiverDisplay] = useState<string>(
    receiver.username
  );
  const { user } = useUserContext();

  useEffect(() => {
    user?.id === sender.id && setSenderDisplay("You");
    user?.id === receiver.id && setReceiverDisplay("You");
  }, [user]);

  return (
    <div className="TradePreview__bordergradient TradePreview__background">
      <div className="TradePreview__info">
        <div>
          {sender.id === user?.id ? "You" : senderDisplay} sent a trade to{" "}
          {receiver.id === user?.id ? "You" : receiverDisplay} on{" "}
          {new Date(updatedAt).toDateString()}
          <div>
            {status && (
              <>
                Status:{" "}
                <span className={`TradePreview__${status}`}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </span>
              </>
            )}
          </div>
        </div>
        {status === "PENDING" && receiver.id === user?.id && (
          <Link className="TradePreview__view" to={`/trade/${id}`}>
            <div className="TradePreview__view_link">Review Trade</div>
          </Link>
        )}
      </div>

      <div className="TradePreview__cards">
        <div className="TradePreview__cardsname">
          <p>
            {`${senderDisplay} ${status === "ACCEPTED" ? "received" : "send"}${
              senderDisplay !== "You" && status === Status.PENDING ? "s" : ""
            }:`}
          </p>
          <div className="TradePreview__user_cards">
            {cards
              .filter(({ card }) => card.ownerId === sender.id)
              .map(({ card }) => (
                <Link key={card.id} to={`/card/${card.id}`}>
                  <img src={card.gif} className="TradePreview__card" />
                </Link>
              ))}
          </div>
        </div>

        <div className="TradePreview__cardsname">
          <p>{`${receiverDisplay} ${
            status === Status.ACCEPTED ? "received" : "send"
          }${
            receiverDisplay !== "You" && status === Status.PENDING ? "s" : ""
          }:`}</p>
          <div className="TradePreview__user_cards">
            {cards
              .filter(({ card }) => card.ownerId === receiver.id)
              .map(({ card }) => (
                <Link key={card.id} to={`/card/${card.id}`}>
                  <img src={card.gif} className="TradePreview__card" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePreview;
