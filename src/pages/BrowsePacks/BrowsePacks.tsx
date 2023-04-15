import { useEffect, useState } from "react";
import { getPacks, openPack } from "../../services/cardService";
import Pack from "../../components/Pack/Pack";

import "./index.css";
import { Link } from "react-router-dom";
import { Role } from "../../types";
import { useUserContext } from "../../hooks/useUser";

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

  const { user } = useUserContext();

  const buyPack = async (id: string) => {
    const data = await openPack(id);
  };

  useEffect(() => {
    const loadData = async () => {
      const _packs = await getPacks();
      setPacks(_packs);
    };

    loadData();
  }, []);

  return (
    <div>
      {user?.role === Role.ADMIN && <Link to="/packs/create">+</Link>}
      <div id="BrowsePacks__container">
        {packs?.map((pack) => (
          <Pack key={pack.id} data={pack} onClick={buyPack} />
        ))}
      </div>
    </div>
  );
};

export default BrowsePacks;
