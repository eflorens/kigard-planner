import { RacialGift } from '../../types/race';

export const ORC_RACIAL_GIFTS: RacialGift[] = [
  {
    id: 'orc-strength',
    name: 'Force des Orcs',
    unlockCost: 1,
    description: 'FOR +1',
    giftUpgrades: [
      {
        id: 'orc-strength-bonus',
        unlockCost: 1,
        description: 'FOR +1 supplémentaire'
      }
    ]
  },
  {
    id: 'enrage',
    name: 'Enrager',
    unlockCost: 2,
    description: 'Gagne [PV manquants/10] :impact: **Impact**. \n *Avec Mysticisme* : peut choisir :surcharge: **Surcharge**',
    range: 0,
    actionCost: 0,
    cooldown: 2,
  },
  {
    id: 'fury',
    name: 'Fureur',
    unlockCost: 1,
    description: 'Si **Blessé** : Gagne +1 :combo: **Combo**',
    cooldown: 1,
    giftUpgrades: [
      {
        id: 'fury-extra-combo',
        unlockCost: 1,
        description: 'Gagne +1 :combo: **Combo** supplémentaire'
      }
    ]
  },
  {
    id: 'survival',
    name: 'Survie',
    unlockCost: 1,
    description: 'Si **Blessé** : +5 aux défenses (arme/sort)',
    giftUpgrades: [
      {
        id: 'survival-bonus',
        unlockCost: 1,
        description: '+5 supplémentaire'
      }
    ]
  },
  {
    id: 'audacity',
    name: 'Audace',
    unlockCost: 1,
    description: 'Si :exposition: **Exposition** (sur soi) : +5 aux attaques au contact (arme/sort)',
    giftUpgrades: [
      {
        id: 'audacity-bonus',
        unlockCost: 1,
        description: '+5 supplémentaire'
      }
    ]
  },
  {
    id: 'carnage',
    name: 'Carnage',
    unlockCost: 1,
    description: 'Cible réduite à 0PV : Gagne **5% PV**',
  },
  {
    id: 'scarification',
    name: 'Scarification',
    unlockCost: 1,
    description: 'Auto-inflige **10 dégâts** (ne tue pas), gagne +2 :pa: **PA**',
    range: 0,
    actionCost: 0,
    cooldown: 5,
  },
  {
    id: 'unleash-rage',
    name: 'Déchaîner sa colère',
    unlockCost: 2,
    description: 'Gagne +3 :bonusDegats: **Bonus de Dégâts**. \n *Avec Mysticisme* : peut choisir :bonusPuissance: **Bonus de Puissance**',
    range: 0,
    actionCost: 0,
    cooldown: 10,
    giftUpgrades: [
      {
        id: 'unleash-rage-extra',
        unlockCost: 1,
        description: '+1 statut supplémentaire'
      },
      {
        id: 'unleash-rage-both',
        unlockCost: 1,
        description: '*[Mysticisme]* Gagne les deux statuts'
      }
    ]
  },
  {
    id: 'bite',
    name: 'Morsure',
    unlockCost: 1,
    description: 'Attaque naturelle, dégâts basés sur [CON]',
    range: 1,
    actionCost: 3,
    cooldown: 2,
    giftUpgrades: [
      {
        id: 'bite-bleed',
        unlockCost: 1,
        description: 'Inflige +3 :saignement: **Saignement**'
      }
    ]
  }
];
