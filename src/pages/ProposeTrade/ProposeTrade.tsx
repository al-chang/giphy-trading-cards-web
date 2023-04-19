import { useUserContext } from "../../hooks/useUser";
import { logout } from "../../services/authService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPendingTrades, sendTrade } from "../../services/tradeService";
import { TCard } from "../BrowseCards/BrowseCards";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import { getCards } from "../../services/cardService";
import "./index.css";
import { Button } from "antd";

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
  };

  const toggleSelectedUser = (cardId: string) => {
    const cards: TradableCard[] = [];
    userCards?.forEach((c) => {
      cards.push(c.card.id === cardId ? { ...c, selected: !c.selected } : c);
    });
    setUserCards(cards);
  };

  const toggleSelectedOther = (cardId: string) => {
    const cards: TradableCard[] = [];
    otherCards?.forEach((c) => {
      cards.push(c.card.id === cardId ? { ...c, selected: !c.selected } : c);
    });
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
      alert(`Trade Id: ${tradeId}`);
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

  return (
    <div className="ProposeTrade__cardscontainer">
      {user && (
        <Button
          className={"ProposeTrade__propose"}
          onClick={() => submitTradeProposal()}
        >
          Propose
        </Button>
      )}
      {errorText !== "" ? (
        <p className="ProposeTrade_error">{errorText}</p>
      ) : (
        <></>
      )}
      <div className="ProposeTrade__cards">
        {userCards?.map((tradeCard) => (
          <div className="ProposeTrade_cardbutton">
            <Card key={tradeCard.card.id} {...tradeCard.card} />
            <Button
              className={
                tradeCard.selected
                  ? "ProposeTrade__deselectbutton"
                  : "ProposeTrade__selectbutton"
              }
              onClick={() => toggleSelectedUser(tradeCard.card.id)}
            >
              {tradeCard.selected ? "Deselect" : "Select"}
            </Button>
          </div>
        ))}
      </div>
      <div className="ProposeTrade__cards">
        {otherCards?.map((tradeCard) => (
          <div className="ProposeTrade_cardbutton">
            <Card key={tradeCard.card.id} {...tradeCard.card} />
            <Button
              className={
                tradeCard.selected
                  ? "ProposeTrade__deselectbutton"
                  : "ProposeTrade__selectbutton"
              }
              onClick={() => toggleSelectedOther(tradeCard.card.id)}
            >
              {tradeCard.selected ? "Deselect" : "Select"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposeTrade;
