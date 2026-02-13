export type Status = {
  id: number;
  name: string;
  description: string;
};

export type StatusKey =
  'accuracyPenalty' |
  'armorPenalty' |
  'bewitchment' |
  'bleeding' |
  'burn' |
  'evasionPenalty' |
  'exposed' |
  'fastPoison' |
  'frost' |
  'magicDefensePenalty' |
  'necrosis' |
  'piercing' |
  'poison' |
  'restrained' |
  'stunned' |
  'terror' |
  'aegis' |
  'armorBonus' |
  'damageBonus' |
  'defense' |
  'endurance' |
  'evasionBonus' |
  'exaltation' |
  'flamingArrow' |
  'force' |
  'hability' |
  'immunity' |
  'impact' |
  'inspiration' |
  'magicDefenseBonus' |
  'mysticSubterfuge' |
  'overcharge' |
  'precisionBonus' |
  'regeneration' |
  'resistanceBonus' |
  'stealth' |
  'vivacity' |
  'will' |
  'hitback' |
  'protect' |
  'taunt' |
  'fire';

export type StatusRegistry = Record<StatusKey, Status>;

export type StatusEffect = {
  status: StatusKey;
  stacks: number;
};