import { Link } from "react-router-dom";
import { TCard } from "../../pages/BrowseCards/BrowseCards";

import "./index.css";

const Card: React.FC<TCard> = ({ id, name, gif }) => {
  return (
    <Link to={`/card/${id}`}>
      <div className="Card__background">
        <div
          className="Card__container"
          style={{ backgroundImage: `url(${gif})` }}
        >
          <div className="Card__overlay">
            <div className="Card__overlay_content">
              <div className="Card__overlay_content_title">{name}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
