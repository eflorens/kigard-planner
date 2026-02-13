import { CraftingRequirement } from "./craft";
import { ElementType } from "./element";
import { StatBonus } from "./statistic";
import { StatusEffect } from "./status";
import { RangeInterval } from "./utils";

export enum OneHandWeaponCategory {
  AXE = 'Une main (Hache)',
  DAGGER = 'Une main (Dague)',
  FIRE_SWORD = 'Une main (Épée de feu)',
  GENERIC = 'Une main (Générique)',
  GLOVE = 'Une main (Gantelet)',
  GUN = 'Une main (Fusil)',
  INSTRUMENT = 'Une main (Instrument)',
  MACE = 'Une main (Masse)',
  MAGIC_SHIELD = 'Une main (Bouclier magique)',
  SHIELD = 'Une main (Bouclier)',
  SPEAR = 'Une main (Lance)',
  SPELL_FOCUS = 'Une main (Focalisateur de sorts)',
  SPELL_RECEPTACLE = 'Une main (Receptacle de sorts)',
  SWORD = 'Une main (Épée)',
  SYMBOL = 'Une main (Symbole)',
  WHIP = 'Une main (Fouet)',
}

export enum TwoHandWeaponCategory {
  AXE = 'Deux mains (Hache)',
  BOW = 'Deux mains (Arc)',
  GUN = 'Deux mains (Fusil)',
  MACE = 'Deux mains (Masse)',
  STAFF = 'Deux mains (Bâton)',
  SWORD = 'Deux mains (Épée)',
}

export type WeaponCategory = OneHandWeaponCategory | TwoHandWeaponCategory;

export type Weapon = {
  id: number;
  name: string;
  category: WeaponCategory;
  rank: number;
  weight: number;
  cost?: number;
  damage?: number;
  range?: RangeInterval;
  scrolls?: number;
  element?: ElementType;
  bonuses?: StatBonus[];
  effects?: StatusEffect[];
  recipe?: CraftingRequirement[];
}

export type WeaponSlot = 'leftHand' | 'rightHand';