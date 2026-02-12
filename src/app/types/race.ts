import { RangeInterval } from "./utils";

export type Race = {
  id: string;
  name: string;
  racialGifts: RacialGift[];
}

export type RacialGift = {
  id: string;
  name: string;
  description: string;
  unlockCost: number;
  range?: number | RangeInterval;
  actionCost?: number;
  cooldown?: number;
  giftUpgrades?: GiftUpgrade[];
}

export type GiftUpgrade = {
  id: string;
  description: string;
  unlockCost: number;
}