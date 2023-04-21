import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUser";
import { getCards } from "../../services/cardService";
import { TCard } from "../BrowseCards/BrowseCards";
import Card from "../../components/Card/Card";
import { TFeedItem, getFeed, isTCardFeed } from "../../services/feedService";
import TradePreview from "../../components/TradePreview/TradePreview";

import "./index.css";

const Home = () => {
  const { user, loading } = useUserContext();
  const [cards, setCards] = useState<TCard[] | null>(null);
  const [feed, setFeed] = useState<TFeedItem[] | null>(null);

  const updateCards = async () => {
    const data = await getCards();
    setCards(data.data);
  };
  const updateUserFeed = async () => {
    const data = await getFeed();
    setFeed(data);
  };

  useEffect(() => {
    if (loading) return;

    user ? updateUserFeed() : updateCards();
  }, [user, loading]);

  return (
    <div>
      {user
        ? feed?.map((item) => {
            if (isTCardFeed(item)) {
              return (
                <div key={item.id} className="Home__Card">
                  <p>
                    Packed by {item.owner.username} on{" "}
                    {new Date(item.createdAt).toDateString()}
                  </p>
                  <Card key={item.id} {...item} />
                </div>
              );
            } else {
              return <TradePreview key={item.id} {...item} />;
            }
          })
        : cards?.map((card) => (
            <div key={card.id} className="Home__Card">
              <Card {...card} />
            </div>
          ))}
    </div>
  );
};

export default Home;
