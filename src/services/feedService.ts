import api from "./api";

export type TCardFeed = {
  id: string;
  name: string;
  gif: string;
  createdAt: string;
  updatedAt: string;
  packId: string;
  ownerId: string;
  source: string;
  owner: {
    id: string;
    username: string;
  };
};
export type TTradeFeed = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  senderId: string;
  receiverId: string;
  sender: {
    id: string;
    username: string;
  };
  receiver: {
    id: string;
    username: string;
  };
  cards: {
    card: {
      id: string;
      gif: string;
    };
  }[];
};
export type TFeedItem = TCardFeed | TTradeFeed;

export const isTCardFeed = (item: TFeedItem): item is TCardFeed => {
  return (item as TCardFeed).gif !== undefined;
};

export const getFeed = async () => {
  const res = await api.get<TFeedItem[]>(`/feed`);
  return res.data;
};
