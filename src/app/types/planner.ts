import { Race } from "./race";
import { PrimaryStats, PrimaryStatUpgrades } from "./stat";

export type PlannerState = {
    race: Race;
    stats: PrimaryStats;
    upgrades: PrimaryStatUpgrades;
}