export type PrimaryStats = {
  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
  spirit: number;
  charisma: number;
  precision: number;
  evasion: number;
  magicMastery: number;
  magicDefense: number;
  observation: number;
  stealth: number;
};

export type SecondaryStats = {
  armor: number;
  resistance: number;
  damage: number;
  healthPoints: number;
  healthRegen: number;
  magicRegen: number;
  magicDamage: number;
  magicPoints: number;
  empathy: number;
  memory: number;
  luck: number;
};

export type PrimaryStatKey = keyof PrimaryStats;
export type SecondaryStatKey = keyof SecondaryStats;

export type Stats = PrimaryStats & SecondaryStats;
export type StatKey = keyof Stats;
export type StatBonus = {
  stat: StatKey;
  bonus: number;
};

export type StatDetails = {
  [K in StatKey]: {
    fullName: string;
    shortName?: string;
    showAsPercent?: boolean;
  };
};

export type PrimaryStatUpgrades = {
  [K in PrimaryStatKey]: number;
};

export type StatUpgradeSummary = {
  key: PrimaryStatKey;
  baseValue: number;
  upgradeBonus: number;
  upgradeLevel: number;
  totalValue: number;
  nextUpgradeCost: number;
  totalUpgradeCost: number;
  canUpgrade: boolean;
  canDowngrade: boolean;
}