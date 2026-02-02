import { StatBonus } from "./stat";

export enum ArmorCategory {
    HELMET = 'Casque',
    CHESTPLATE = 'Armure',
    BOOTS = 'Bottes',
    JEWELRY = 'Fétiche',
}

export type Armor = {
    id: number;
    name: string;
    category: ArmorCategory;
    rank: number;
    weight: number;
    bonuses?: StatBonus[];
    extraGem?: boolean;
    // resistances?: ElementalResistance[];
}