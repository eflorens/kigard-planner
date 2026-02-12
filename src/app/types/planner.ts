import { PrimaryStatUpgrades } from "./stat";

export type SelectedGifts = Record<string, string[]>;

export type PlannerState = {
    raceId: string;
    upgrades: PrimaryStatUpgrades;
    selectedGifts: SelectedGifts;
}
