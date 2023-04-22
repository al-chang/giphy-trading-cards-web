import { TCard } from "../pages/BrowseCards/BrowseCards";
import { TPack } from "../pages/BrowsePacks/BrowsePacks";
import { TSingleCard } from "../pages/ViewCard/ViewCard";
import { Paginated } from "../types";
import api from "./api";

const CARD_URL = "/cards";
const PACK_URL = "/packs";

export const getCards = async (params?: Record<string, any>) => {
  const { data } = await api.get<Paginated<TCard>>(CARD_URL, { params });
  return data;
};

export const getCard = async (cardId: string) => {
  const { data } = await api.get<TSingleCard>(`${CARD_URL}/${cardId}`);
  return data;
};

export const getUserCards = async (userId: string) => {
  const { data } = await api.get(`${CARD_URL}/${userId}`);
  return data;
};

export const openPack = async (packId: string) => {
  const { data } = await api.post<TCard>(`${PACK_URL}/open/${packId}`);
  return data;
};

export const getPacks = async () => {
  const { data } = await api.get<TPack[]>(`${PACK_URL}`);
  return data;
};

export const getPack = async (packId: string) => {
  const { data } = await api.get<TPack>(`${PACK_URL}/${packId}`);
  return data;
};

export const createPack = async ({
  name,
  price,
  tags,
}: {
  name: string;
  price: number;
  tags: string[];
}) => {
  const { data } = await api.post(`${PACK_URL}`, {
    name,
    price,
    tags,
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

export const getCandidateCards = async (term: string) => {
  const { data } = await api.get<{ gif: string; source: string }[]>(
    `/custom${CARD_URL}?term=${term}`
  );
  return data;
};

export const createCardFromCandidate = async ({
  gif,
  source,
}: {
  gif: string;
  source: string;
}) => {
  console.log(gif, source);
  // set body of request to { gif, source }
  const res = await api.post<string>(`/custom${CARD_URL}`, {
    gif,
    source,
  });
  return res.data;
};
