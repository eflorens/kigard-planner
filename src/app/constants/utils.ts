import { PrimaryStatUpgrades, PrimaryStats } from "../types/stat";

export const DEFAULT_STATS: PrimaryStats = {
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  constitution: 10,
  spirit: 10,
  charisma: 10,
  precision: 0,
  evasion: 0,
  magicMastery: 0,
  magicDefense: 0,
  observation: 0,
  stealth: 0,
};

export function getDefaultStatUpgrades(): PrimaryStatUpgrades {
  return {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    constitution: 0,
    spirit: 0,
    charisma: 0,
    precision: 0,
    evasion: 0,
    magicMastery: 0,
    magicDefense: 0,
    observation: 0,
    stealth: 0,
  };
}
