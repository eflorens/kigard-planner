import { Race } from "../types/race";
import { PrimaryStatUpgrades, PrimaryStats } from "../types/stat";
import { RACES } from "./race";

export function chooseRandomRace(): Race {
  return RACES[Math.floor(Math.random() * RACES.length)];
}

export function getDefaultStats(): PrimaryStats {
  return {
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
}

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

