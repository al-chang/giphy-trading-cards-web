import { Link } from "react-router-dom";
import { TPack } from "../../pages/BrowsePacks/BrowsePacks";

import "./index.css";

export type IPack = {
  data: TPack;
  onClick: (id: string) => void;
  canAfford: boolean;
};

const Pack: React.FC<IPack> = ({
  data: { id, name, price, coverGif },
  onClick,
  canAfford,
}) => {
  return (
    <div>
      <div
        className="Pack__container"
        style={{ backgroundImage: `url(${coverGif})` }}
      >
        <div className="Pack__overlay">
          <h2 className="Pack__name">{name}</h2>
          <p>
            <strong>{price}</strong> coin{price > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="Pack__Footer">
        <button
          className="App__Button"
          disabled={!canAfford}
          onClick={() => onClick(id)}
        >
          {canAfford ? "Open Pack" : "Not enough coins"}
        </button>
        <Link
          to={`/cards?packId=${id}`}
          className="App__Button Pack__view_cards"
        >
          View Cards
        </Link>
      </div>
    </div>
  );
};

export default Pack;
