import { RacialGift } from '../../types/race';

export const HUMAN_RACIAL_GIFTS: RacialGift[] = [
  {
    id: 'cooperation',
    name: 'Coopération',
    unlockCost: 1,
    description: '+5 en défense (arme/sort) si adjacent à un héros allié',
    giftUpgrades: [
      {
        id: 'cooperation-bonus',
        unlockCost: 1,
        description: '+5 supplémentaire'
      }
    ]
  },
  {
    id: 'determination',
    name: 'Détermination',
    unlockCost: 1,
    description: 'Echec en attaque (arme/sort): Coûts PA et PM divisés par 2',
    cooldown: 1,
    giftUpgrades: [
      {
        id: 'determination-zero-cost',
        unlockCost: 1,
        description: 'Coûts PA et PM réduits à 0'
      }
    ]
  },
  {
    id: 'paragon',
    name: 'Parangon',
    unlockCost: 1,
    description: "Gagne **+1 :actionCost: PA** lors d'un **soutien** reçu",
    cooldown: 1,
  },
  {
    id: 'adaptation',
    name: 'Adaptation',
    unlockCost: 2,
    description: 'Gagne **+1 :actionCost: PA**',
    range: 0,
    actionCost: 0,
    cooldown: 2,
    giftUpgrades: [
      {
        id: 'adaptation-extra-pa',
        unlockCost: 2,
        description: 'Gagne **+1 :actionCost: PA** supplémentaire'
      },
      {
        id: 'adaptation-combo',
        unlockCost: 1,
        description: 'Gagne **+1 :combo: Combo**'
      }
    ]
  },
  {
    id: 'ambition',
    name: 'Ambition',
    unlockCost: 1,
    description: 'Vole **3 :actionCost: PA** à un héros allié',
    range: { min: 1, max: 2 },
    actionCost: 0,
    cooldown: 5,
  },
  {
    id: 'improvise',
    name: 'Improviser',
    unlockCost: 2,
    description: 'Gagne (au choix) +2 :precision_bonus: +2 :evasion_bonus: +2 :magic_mastery_bonus: +2 :magic_defense_bonus: +2 :observation: ou +2 :stealth:',
    range: 0,
    actionCost: 0,
    cooldown: 5,
    giftUpgrades: [
      {
        id: 'improvise-range',
        unlockCost: 1,
        description: 'Portée [range] 1 à 2, sur un allié'
      },
      {
        id: 'improvise-status',
        unlockCost: 1,
        description: 'Gagne +1 :statusLevel: **niv. statut** supplémentaire'
      }
    ]
  },
  {
    id: 'defy-fate',
    name: 'Défier le destin',
    unlockCost: 2,
    description: 'Relance ses **3D6 :actionCost: PA**',
    range: 0,
    actionCost: 0,
    cooldown: 10,
    giftUpgrades: [
      {
        id: 'defy-fate-best',
        unlockCost: 1,
        description: 'Garde le meilleur total de PA obtenu'
      }
    ]
  },
  {
    id: 'encourage',
    name: 'Encourager',
    unlockCost: 2,
    description: 'Réalisé un **soutien**',
    range: { min: 0, max: 2 },
    actionCost: 1,
    cooldown: 5,
    giftUpgrades: [
      {
        id: 'encourage-extra-pa',
        unlockCost: 1,
        description: 'Donne +1 :actionCost: PA supplémentaire'
      },
      {
        id: 'encourage-free',
        unlockCost: 1,
        description: 'Coût :actionCost: 0'
      }
    ]
  }
];
