import { StatBonus } from "./statistic";

export type MaterialKey =
  'amber' |
  'amethyst' |
  'blackPowder' |
  'blood' |
  'blueFiber' |
  'copper' |
  'diamond' |
  'ebony' |
  'emerald' |
  'fairyWing' |
  'feather' |
  'goldenDust' |
  'ink' |
  'iron' |
  'ivy' |
  'leaf' |
  'leather' |
  'mithril' |
  'purpleFiber' |
  'rock' |
  'ruby' |
  'sapphire' |
  'scales' |
  'sewingThread' |
  'sinew' |
  'teeth' |
  'topaz' |
  'wood' |
  'yew';

export type Material = {
  id: number;
  name: string;
}

export type MaterialRegistry = Record<MaterialKey, Material>;

export type CraftingRequirement = {
  material: MaterialKey;
  quantity: number;
}

export type Gem = {
  id: number;
  name: string;
  bonus: StatBonus;
}

export type Enchantment = {
  id: number;
  name: string;
  bonus: StatBonus;
}