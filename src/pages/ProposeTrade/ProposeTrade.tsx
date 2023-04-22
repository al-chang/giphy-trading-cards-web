import { useUserContext } from "../../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { sendTrade } from "../../services/tradeService";
import { TCard } from "../BrowseCards/BrowseCards";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { getCards } from "../../services/cardService";
import "./index.css";
import { getUserProfile } from "../../services/userService";
import { TProfile } from "../Profile/Profile";

type TradableCard = {
  card: TCard;
  selected: Boolean;
};

const ProposeTrade = () => {
  const { otherId } = useParams();
  const { user } = useUserContext();
  const [userCards, setUserCards] = useState<TradableCard[] | null>(null);
  const [otherCards, setOtherCards] = useState<TradableCard[] | null>(null);
  const [errorText, setErrorText] = useState<string>("");
  const [showOwnCards, setShowOwnCards] = useState<boolean>(true);
  const [numOwnSelected, setNumOwnSelected] = useState<number>(0);
  const [numOtherSelected, setNumOtherSelected] = useState<number>(0);
  const [otherUser, setOtherUser] = useState<TProfile | null>(null);
  const navigate = useNavigate();

  const getUserCardData = async () => {
    const data = await getCards({ ownerId: user?.id });
    const userCards: TradableCard[] = [];
    data.data.forEach((c) => userCards.push({ card: c, selected: false }));
    setUserCards(userCards);
  };

  const getOtherCardData = async () => {
    const data = await getCards({ ownerId: otherId });
    const otherCards: TradableCard[] = [];
    data.data.forEach((c) => otherCards.push({ card: c, selected: false }));
    setOtherCards(otherCards);

    if (otherId) {
      const userData = await getUserProfile(otherId);
      setOtherUser(userData);
    }
  };

  const toggleSelectedUser = (cardId: string) => {
    const cards: TradableCard[] = [];
    userCards?.forEach((c) => {
      cards.push(c.card.id === cardId ? { ...c, selected: !c.selected } : c);
    });

    userCards?.find((c) => c.card.id === cardId)?.selected
      ? setNumOwnSelected(numOwnSelected + 1)
      : setNumOwnSelected(numOwnSelected - 1);
    setUserCards(cards);
  };

  const toggleSelectedOther = (cardId: string) => {
    const cards: TradableCard[] = [];
    otherCards?.forEach((c) => {
      cards.push(c.card.id === cardId ? { ...c, selected: !c.selected } : c);
    });
    otherCards?.find((c) => c.card.id === cardId)?.selected
      ? setNumOtherSelected(numOtherSelected + 1)
      : setNumOtherSelected(numOtherSelected - 1);
    setOtherCards(cards);
  };

  const submitTradeProposal = async () => {
    const sending = userCards?.filter((c) => c.selected).map((c) => c.card);
    const receiving = otherCards?.filter((c) => c.selected).map((c) => c.card);

    if (
      !user ||
      !otherId ||
      !sending ||
      !receiving ||
      sending?.length === 0 ||
      receiving?.length === 0
    ) {
      setErrorText("Please choose at least one card to send and receive!");
      return;
    }
    try {
      setErrorText("");
      const cardIds = sending?.concat(receiving).map((c) => c.id);
      const tradeId = await sendTrade(otherId, cardIds);
      navigate(`/trade/${tradeId}`);
    } catch (error) {
      setErrorText("Error proposing trade");
    }
  };

  useEffect(() => {
    getUserCardData();
  }, [user]);

  useEffect(() => {
    getOtherCardData();
  }, [otherId]);

  const displayCards = (tradeCard: TradableCard) => {
    return (
      <div key={tradeCard.card.id} className="ProposeTrade__cardbutton">
        <Card {...tradeCard.card} />
        <button
          className={`ProposeTrade__button ${
            tradeCard.selected
              ? "ProposeTrade__removebutton"
              : "ProposeTrade__selectbutton"
          }`}
          onClick={() =>
            tradeCard.card.ownerId === user?.id
              ? toggleSelectedUser(tradeCard.card.id)
              : toggleSelectedOther(tradeCard.card.id)
          }
        >
          {tradeCard.selected ? "Remove" : "Select"}
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="ProposeTrade__nav">
        <span
          className={`ProposeTrade__tab ${
            showOwnCards ? "ProposeTrade__tab-selected" : ""
          }`}
          onClick={() => setShowOwnCards(true)}
        >
          Your Cards
        </span>
        <span
          className={`ProposeTrade__tab ${
            showOwnCards ? "" : "ProposeTrade__tab-selected"
          }`}
          onClick={() => setShowOwnCards(false)}
        >
          {`${otherUser?.username}'s Cards`}
        </span>
        {user && (
          <button
            className={"App__Button ProposeTrade__propose"}
            onClick={() => submitTradeProposal()}
            disabled={numOwnSelected == 0 || numOtherSelected == 0}
          >
            Propose
          </button>
        )}
      </div>
      <div className="ProposeTrade__cardscontainer">
        {errorText !== "" ? (
          <p className="ProposeTrade_error">{errorText}</p>
        ) : (
          <></>
        )}

        <div id="ProposeTrade__container">
          {showOwnCards
            ? userCards?.map((tradeCard) => displayCards(tradeCard))
            : otherCards?.map((tradeCard) => displayCards(tradeCard))}
        </div>
      </div>
    </div>
  );
};

export default ProposeTrade;
