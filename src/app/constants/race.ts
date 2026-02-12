import { Race } from '../types/race';
import { ELF_RACIAL_GIFTS } from './racial-gifts/elf-racial-gifts';
import { GNOME_RACIAL_GIFTS } from './racial-gifts/gnome-racial-gifts';
import { HUMAN_RACIAL_GIFTS } from './racial-gifts/human-racial-gifts';
import { ORC_RACIAL_GIFTS } from './racial-gifts/orc-racial-gifts';

export const RACES: Race[] = [
  {
    id: 'human',
    name: 'Humain',
    racialGifts: HUMAN_RACIAL_GIFTS,
  },
  {
    id: 'dwarf',
    name: 'Nain',
    racialGifts: [],
  },
  {
    id: 'orc',
    name: 'Orc',
    racialGifts: ORC_RACIAL_GIFTS,
  },
  {
    id: 'elf',
    name: 'Elfe',
    racialGifts: ELF_RACIAL_GIFTS,
  },
  {
    id: 'gnome',
    name: 'Gnome',
    racialGifts: GNOME_RACIAL_GIFTS,
  },
  {
    id: 'halfling',
    name: 'Halfelin',
    racialGifts: [],
  },
  {
    id: 'saurian',
    name: 'Saurien',
    racialGifts: [],
  },
  {
    id: 'feline',
    name: 'Fauve',
    racialGifts: [],
  },
  {
    id: 'lycan',
    name: 'Lycan',
    racialGifts: [],
  },
];
