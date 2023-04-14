import { TCard } from "../../pages/BrowseCards/BrowseCards";

import "./index.css";

const Card: React.FC<TCard> = ({ gif }) => {
  return (
    <div
      className="Card__container"
      style={{ backgroundImage: `url(${gif})` }}
    ></div>
  );
};

export default Card;
