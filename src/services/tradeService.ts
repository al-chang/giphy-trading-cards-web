import { TCard } from "../pages/BrowseCards/BrowseCards";
import api from "./api";

const TRADE_URL = "/trade";

export enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type TPendingTradeCard = TCard & { pack: { name: string } } & {
  owner: { username: string; id: string };
};

export type TPendingTrade = {
  cards: { card: TCard }[];
  status: Status;
  sender: { id: string };
  receiver: { id: string };
};

export const getPendingTrades = async () => {
  const response = await api.get(TRADE_URL);
  return response.data;
};

export const getPendingTrade = async (tradeId: string) => {
  const response = await api.get<TPendingTrade>(`${TRADE_URL}/${tradeId}`);
  return response.data;
};

export const sendTrade = async (userId: string, cards: string[]) => {
  const response = await api.post(TRADE_URL, { userId, cards });
  return response.data;
};

export const acceptTrade = async (tradeId: string) => {
  const response = await api.put(`${TRADE_URL}/accept/${tradeId}`);
  return response.data;
};

export const rejectTrade = async (tradeId: string) => {
  const response = await api.put(`${TRADE_URL}/reject/${tradeId}`);
  return response.data;
};
