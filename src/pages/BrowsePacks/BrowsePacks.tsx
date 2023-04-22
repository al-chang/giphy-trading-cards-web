import { useEffect, useState } from "react";
import { getPacks, openPack } from "../../services/cardService";
import Pack from "../../components/Pack/Pack";

import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { Role } from "../../types";
import { useUserContext } from "../../hooks/useUser";
import { getCoins } from "../../services/userService";

export type TPack = {
  id: string;
  name: string;
  price: number;
  coverGif: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

const BrowsePacks = () => {
  const [packs, setPacks] = useState<TPack[] | null>(null);
  const [coins, setCoins] = useState<number>(0);

  const { user, loading } = useUserContext();
  const navigate = useNavigate();

  const buyPack = async (id: string) => {
    const data = await openPack(id);
    navigate(`/card/${data.id}`);
  };

  useEffect(() => {
    const loadPacks = async () => {
      const _packs = await getPacks();
      setPacks(_packs);
    };
    const loadCoins = async () => {
      const _coins = await getCoins();
      setCoins(_coins.coins);
    };

    loadPacks();
    if (user && !loading) {
      loadCoins();
    }
  }, [user, loading]);

  return (
    <div id="BrowsePacks__container">
      <div id="BrowsePacks__header">
        <h1 id="BrowsePacks__title">Packs</h1>
        {user && (
          <div id="BrowsePacks__coins">
            <img
              src="https://media4.giphy.com/media/TiDqYW1SQiA38RgoyY/giphy.gif?cid=ecf05e479p6ao7qowd9uyo2ezjzk3dif50b9r0myvr80zviz&rid=giphy.gif&ct=g"
              alt="coin"
              id="BrowsePacks__coin_image"
            />
            {coins}
          </div>
        )}
      </div>
      {user?.role === Role.ADMIN && (
        <Link id="BrowsePacks__add_button" to="/packs/create">
          +
        </Link>
      )}
      <div id="BrowsePacks__view_packs">
        {packs?.map((pack) => (
          <Pack
            key={pack.id}
            data={pack}
            onClick={buyPack}
            canAfford={coins >= pack.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowsePacks;
