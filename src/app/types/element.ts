export enum ElementType {
  DARK = 1,
  EARTH = 2,
  FIRE = 3,
  ICE = 4,
  LIGHT = 5,
  THUNDER = 6,
  WATER = 7,
  WIND = 8,
}

export type ElementalResistance = {
  element: ElementType;
  percentage: number;
}
