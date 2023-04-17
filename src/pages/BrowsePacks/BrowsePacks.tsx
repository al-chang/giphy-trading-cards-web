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

  const { user } = useUserContext();
  const navigate = useNavigate();

  const buyPack = async (id: string) => {
    const data = await openPack(id);
    navigate(`/card/${data.id}`);
  };

  useEffect(() => {
    const loadData = async () => {
      const _packs = await getPacks();
      const _coins = await getCoins();
      setPacks(_packs);
      setCoins(_coins);
    };

    loadData();
  }, []);

  return (
    <div id="BrowsePacks__container">
      <div id="BrowsePacks__header">
        <h1 id="BrowsePacks__title">Packs</h1>
        <div id="BrowsePacks__coins">
          <img src="/coin.png" alt="coin" id="BrowsePacks__coin_image" />
          {coins}
        </div>
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
