import { Armor, ArmorCategory } from "../../types/armor";

export const JEWELRY: Armor[] = [
  {
    id: 181,
    name: 'Anneau',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'damage', bonus: 1 }
    ],
    rank: 1,
    weight: 1
  },
  {
    id: 287,
    name: 'Amulette gelée',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'magicDefense', bonus: 5 },
      { stat: 'resistance', bonus: 1 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 182,
    name: 'Anneau ailé',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'evasion', bonus: 5 },
      { stat: 'armor', bonus: 1 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 185,
    name: 'Anneau corail',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'magicMastery', bonus: 5 },
      { stat: 'intelligence', bonus: 1 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 369,
    name: 'Ame légendaire',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'damage', bonus: 1 },
      { stat: 'magicDamage', bonus: 1 },
      { stat: 'armor', bonus: 1 },
      { stat: 'resistance', bonus: 1 }
    ],
    rank: 3,
    weight: 1
  },
  {
    id: 20,
    name: 'Bague rubis',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'intelligence', bonus: 1 },
      { stat: 'precision', bonus: 5 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 216,
    name: 'Boucle en or',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'precision', bonus: 5 },
      { stat: 'magicMastery', bonus: 5 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 75,
    name: 'Bracelet',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'precision', bonus: 5 },
      { stat: 'evasion', bonus: 5 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 447,
    name: 'Bracelet des étoiles',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'magicDamage', bonus: 5 },
      { stat: 'magicDefense', bonus: 5 }
    ],
    rank: 3,
    weight: 1
  },
  {
    id: 118,
    name: 'Médaillon du vétéran',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'armor', bonus: 1 },
      { stat: 'resistance', bonus: 1 },
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 186,
    name: 'Perle',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'spirit', bonus: 2 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 228,
    name: 'Talisman de centaure',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'strength', bonus: 1 },
      { stat: 'precision', bonus: 5 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 115,
    name: 'Talisman de la dryade',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'dexterity', bonus: 1 },
      { stat: 'precision', bonus: 5 }
    ],
    rank: 2,
    weight: 1
  },
  {
    id: 212,
    name: 'Trèfle à quatre feuilles',
    category: ArmorCategory.JEWELRY,
    bonuses: [
      { stat: 'luck', bonus: 50 }
    ],
    rank: 2,
    weight: 1
  }
];