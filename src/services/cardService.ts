import api from "./api";

const CARD_URL = "/cards";
const PACK_URL = "/packs";

export const getCurrentUserCards = async () => {
  const { data } = await api.get(CARD_URL);
  return data;
};

export const getUserCards = async (userId: string) => {
  const { data } = await api.get(`${CARD_URL}/${userId}`);
  return data;
};

export const openPack = async (packId: string) => {
  const { data } = await api.post(`${CARD_URL}/open-pack/${packId}`);
  return data;
};

export const getPacks = async () => {
  const { data } = await api.get(`${PACK_URL}`);
  return data;
};

export const createPack = async ({
  name,
  price,
  tags,
  coverGif,
}: {
  name: string;
  price: number;
  tags: string[];
  coverGif: string;
}) => {
  const { data } = await api.post(`${PACK_URL}`, {
    name,
    price,
    tags,
    coverGif,
  });
  return data;
};

export const updatePack = async ({
  packId,
  name,
  price,
  tags,
  coverGif,
}: {
  packId: string;
  name: string;
  price: number;
  tags: string[];
  coverGif: string;
}) => {
  const { data } = await api.put(`${PACK_URL}/${packId}`, {
    name,
    price,
    tags,
    coverGif,
  });
  return data;
};
