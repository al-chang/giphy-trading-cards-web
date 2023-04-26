import { useEffect, useState } from "react";
import { TCard } from "../BrowseCards/BrowseCards";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCard, updateCard } from "../../services/cardService";
import { TPack } from "../BrowsePacks/BrowsePacks";

import "./index.css";
import { useUserContext } from "../../hooks/useUser";

export type TSingleCard = TCard & {
  pack?: TPack;
  owner: { id: true; username: string };
  source: string;
};

const ViewCard = () => {
  const [card, setCard] = useState<TSingleCard | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const [editing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const getCardData = async () => {
      const data = await getCard(id!);
      setCard(data);
    };
    getCardData();
  }, [id]);

  useEffect(() => {
    setCardName(card?.name || "");
  }, [card]);

  const toggleEditing = () => {
    setEditing(!editing);
    setNewName("");
  };

  const updateCardName = async () => {
    if (card) {
      await updateCard(card.id, newName);
      toggleEditing();
      setCardName(newName);
    }
  };

  return (
    <div id="ViewCard__container">
      <img id="ViewCard__gif" src={card?.gif} alt="selected image" />
      <div id="ViewCard__metadata">
        {editing ? (
          <h2 className="ViewCard__name ViewCard__bordergradientbottom">
            {newName}
          </h2>
        ) : (
          <h2 className="ViewCard__name ViewCard__bordergradientbottom">
            {cardName}
          </h2>
        )}
        {card?.ownerId === user?.id ? (
          editing ? (
            <div>
              <label htmlFor="card_name">Name:</label>
              <br></br>
              <input
                id="card_name"
                type="text"
                className="App__text_input"
                onChange={(e) => setNewName(e.target.value)}
              ></input>
              <button className="App__Button" onClick={updateCardName}>
                Save
              </button>
              <button className="App__Button" onClick={toggleEditing}>
                Discard
              </button>
            </div>
          ) : (
            <span>
              <button
                className="App__Button"
                id="ViewCard__editbutton"
                onClick={() => setEditing(!editing)}
              >
                Edit Name
              </button>
            </span>
          )
        ) : (
          <></>
        )}

        <table id="ViewCard__table">
          <tbody>
            <tr>
              <td>
                <strong>Owner:</strong>{" "}
              </td>
              <td>
                <Link
                  className="ViewCard__link"
                  to={
                    card?.ownerId === user?.id
                      ? `/profile`
                      : `/profile/${card?.ownerId}`
                  }
                >
                  {card?.owner?.username}
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <strong>Pack:</strong>
              </td>
              <td>{card?.pack?.name || "Custom"}</td>
            </tr>
            <tr>
              <td>
                <strong>Packed On:</strong>{" "}
              </td>
              <td>
                {card?.createdAt && new Date(card?.createdAt).toDateString()}
              </td>
            </tr>
          </tbody>
        </table>

        {card?.gif && (
          <div>
            <Link className="ViewCard__link" to={card?.gif}>
              Link to GIF
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCard;
