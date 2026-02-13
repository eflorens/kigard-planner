import { RacialGift } from '../../types/race';

export const ELF_RACIAL_GIFTS: RacialGift[] = [
  {
    id: 'elf-dexterity',
    name: 'Dextérité des Elfes',
    unlockCost: 1,
    description: 'DEX +1',
    actionCost: 0,
    giftUpgrades: [
      {
        id: 'elf-dexterity-bonus',
        unlockCost: 1,
        description: 'DEX +1 supplémentaire'
      }
    ]
  },
  {
    id: 'elf-precision',
    name: 'Précision des Elfes',
    unlockCost: 1,
    description: 'Pré +5%',
    actionCost: 0,
  },
  {
    id: 'elf-mastery',
    name: 'Maitrise des Elfes',
    unlockCost: 1,
    description: 'MM +5%',
    actionCost: 0,
  },
  {
    id: 'keen-senses',
    name: 'Sens aiguisés',
    unlockCost: 1,
    description: 'Obs +5%',
    actionCost: 0,
  },
  {
    id: 'excellence',
    name: 'Excellence',
    unlockCost: 1,
    description: "+5 au score en cas d'Avantage",
    actionCost: 0,
    giftUpgrades: [
      {
        id: 'excellence-bonus',
        unlockCost: 1,
        description: '+5 supplémentaire'
      }
    ]
  },
  {
    id: 'awaken-minds',
    name: 'Eveiller les consciences',
    unlockCost: 1,
    description: '(Action discrète) Alliés. Gagne +2 :magic_mastery_bonus:',
    range: { min: 0, max: 2 },
    actionCost: 0,
    cooldown: 5,
  },
  {
    id: 'perfect-gesture',
    name: 'Parfaire son geste',
    unlockCost: 2,
    description: 'Gagne +1 :precision_bonus:',
    actionCost: 0,
    cooldown: 5,
  },
  {
    id: 'detect-weakness',
    name: 'Déceler une faiblesse',
    unlockCost: 2,
    description: 'Inflige +2 :statusLevel:',
    range: { min: 1, max: 2 },
    actionCost: 0,
    cooldown: 5,
  },
  {
    id: 'freedom',
    name: 'Liberté',
    unlockCost: 2,
    description: 'Réalise un déplacement. Ignore :rooted:',
    range: 1,
    actionCost: 0,
    cooldown: 5,
    giftUpgrades: [
      {
        id: 'freedom-damage',
        unlockCost: 1,
        description: 'Gagne +2 :damage_bonus:'
      },
      {
        id: 'freedom-magic-defense',
        unlockCost: 1,
        description: 'Gagne +2 :magic_defense_bonus:'
      },
      {
        id: 'freedom-defense',
        unlockCost: 1,
        description: 'Gagne +2 :defense_bonus:'
      }
    ]
  }
];
