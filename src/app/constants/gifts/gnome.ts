import { RacialGift } from '../../types/race';

export const GNOME_RACIAL_GIFTS: RacialGift[] = [
  {
    id: 'gnome-intelligence',
    name: 'Intelligence des Gnomes',
    unlockCost: 1,
    description: 'INT +1',
    giftUpgrades: [
      {
        id: 'gnome-intelligence-bonus',
        unlockCost: 1,
        description: 'INT +1 supplémentaire'
      }
    ]
  },
  {
    id: 'gnome-evasion',
    name: 'Esquive des Gnomes',
    unlockCost: 1,
    description: 'Esq +5%',
  },
  {
    id: 'gnome-stealth',
    name: 'Discrétion des Gnomes',
    unlockCost: 1,
    description: 'Dis +5%',
  },
  {
    id: 'fade',
    name: 'Effacement',
    unlockCost: 1,
    description: 'Après une attaque subie, si résultat critique : déclenche une action **Disparaître**',
    cooldown: 5,
    giftUpgrades: [
      {
        id: 'fade-on-dodge',
        unlockCost: 1,
        description: '(1PR) Déclenche aussi sur échec (esquive)'
      }
    ]
  },
  {
    id: 'have-idea',
    name: 'Avoir une idée',
    unlockCost: 2,
    description: 'Gagne **5% PM**',
    range: 0,
    actionCost: 0,
    cooldown: 2,
    giftUpgrades: [
      {
        id: 'have-idea-extra',
        unlockCost: 2,
        description: '(2PR) Gagne **5% PM** supplémentaire'
      }
    ]
  },
  {
    id: 'elaborate-theory',
    name: 'Elaborer une théorie',
    unlockCost: 2,
    description: 'Gagne **20% PM**',
    range: 0,
    actionCost: 0,
    cooldown: 10,
    giftUpgrades: [
      {
        id: 'elaborate-theory-allies',
        unlockCost: 1,
        description: '(1PR) Alliés adjacents : Gagne **10% PM** (du Gnome)'
      }
    ]
  },
  {
    id: 'fascinate',
    name: 'Fasciner',
    unlockCost: 2,
    description: 'Provoque un tirage de (**Pre** + **MM**) contre (**Esq** + **DM**)/2. Réussite : Inflige +1 :distraction: **Distraction**',
    range: { min: 1, max: 3 },
    actionCost: 0,
    cooldown: 5,
    giftUpgrades: [
      {
        id: 'fascinate-self',
        unlockCost: 1,
        description: 'Utilisable sur soi-même : affecte toute cible adjacente'
      },
      {
        id: 'fascinate-evasion',
        unlockCost: 1,
        description: 'Gagne +2 :bonusEsquive: **Bonus d\'Esquive**'
      },
      {
        id: 'fascinate-will',
        unlockCost: 1,
        description: 'Gagne +2 :bonusVolonte: **Bonus de Volonté**'
      },
      {
        id: 'fascinate-stealth',
        unlockCost: 1,
        description: 'Gagne +2 :bonusDiscretion: **Bonus de Discrétion**'
      }
    ]
  },
  {
    id: 'pilfer',
    name: 'Escamoter',
    unlockCost: 1,
    description: 'Ramasse dépouille / trésor, fouille la case',
    range: { min: 1, max: 2 },
    actionCost: 0,
    cooldown: 5,
  },
  {
    id: 'swap',
    name: 'Intervertir',
    unlockCost: 2,
    description: 'Echange sa position avec un allié',
    range: { min: 1, max: 2 },
    actionCost: 0,
    cooldown: 10,
    giftUpgrades: [
      {
        id: 'swap-combo',
        unlockCost: 1,
        description: 'Gagne +2 :combo: **Combo**. Cible : Gagne +2 :combo: **Combo**'
      },
      {
        id: 'swap-stealth',
        unlockCost: 1,
        description: '[*Furtivité*] Déplace ses niv. de :furtivite: **Furtivité** sur la cible. La cible gagne +2 :bonusDiscretion: **Bonus de Discrétion**'
      }
    ]
  },
  {
    id: 'malice',
    name: 'Malice',
    unlockCost: 1,
    description: '+5 aux attaques (arme/sort) sur une cible avec :distraction: **Distraction**',
    giftUpgrades: [
      {
        id: 'malice-bonus',
        unlockCost: 1,
        description: '+5 supplémentaire'
      }
    ]
  }
];
