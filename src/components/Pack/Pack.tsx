import { TPack } from "../../pages/BrowsePacks/BrowsePacks";
import { openPack } from "../../services/cardService";

import "./index.css";

export type IPack = {
  data: TPack;
  onClick: (id: string) => void;
};

const Pack: React.FC<IPack> = ({
  data: { id, name, price, coverGif, tags },
  onClick,
}) => {
  return (
    <div>
      <div
        className="Pack__container"
        style={{ backgroundImage: `url(${coverGif})` }}
      >
        <p>{name}</p>
        <p>{price}</p>
      </div>
      <button onClick={() => onClick(id)}>Open Pack</button>
    </div>
  );
};

export default Pack;
