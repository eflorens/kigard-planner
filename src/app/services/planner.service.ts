import { computed, effect, Injectable, Signal, signal, untracked } from "@angular/core";
import { PlannerState, SelectedGifts } from "../types/planner";
import { DEFAULT_STATS, getDefaultStatUpgrades } from "../constants/utils";
import { Race } from "../types/race";
import { PrimaryStatKey, PrimaryStats, PrimaryStatUpgrades, StatUpgradeSummary } from "../types/stat";
import { STAT_DETAILS } from "../constants/stat";
import { RACES } from "../constants/race";

@Injectable({
    providedIn: 'root'
})
export class PlannerService {
    private state = signal<PlannerState>({
        raceId: RACES[Math.floor(Math.random() * RACES.length)].id,
        upgrades: getDefaultStatUpgrades(),
        selectedGifts: {},
    });

    constructor() {
      effect(() => {
        const validated = this.validatedGifts();
        untracked(() => {
          this.state.update(state => ({...state, selectedGifts: validated}));
        });
      });
    }

  public race: Signal<Race> = computed(() => RACES.find(r => r.id === this.state().raceId)!);
  public stats: Signal<PrimaryStats> = computed(() => DEFAULT_STATS);
  public upgrades: Signal<PrimaryStatUpgrades> = computed(() => this.state().upgrades);

  public MAX_EXPERIENCE = 10000;
  public MAX_UPGRADES = 10;
  public RANK_THRESHOLDS = [0, 1000, 3000, 6000, 10000];

  public statUpgradeSummary: Signal<StatUpgradeSummary[]> = computed(() => {
    const stats = this.stats();
    const upgrades = this.upgrades();
    const primaryStatKeys = Object.keys(upgrades) as PrimaryStatKey[];

    return primaryStatKeys.map((statKey: PrimaryStatKey) => {
      const upgradeLevel = upgrades[statKey];
      const showAsPercent = STAT_DETAILS[statKey]?.showAsPercent ?? false;
      const upgradeIncrement = showAsPercent ? 5 : 1;

      return {
        key: statKey,
        baseValue: stats[statKey],
        upgradeBonus: upgradeIncrement * upgradeLevel,
        upgradeLevel: upgradeLevel,
        totalValue: (upgradeIncrement * upgradeLevel) + stats[statKey],
        nextUpgradeCost: 50 + (upgradeLevel * 50),
        totalUpgradeCost: totalUpgradeCost(upgradeLevel),
        canUpgrade: upgradeLevel < this.MAX_UPGRADES
          && (this.experience() + 50 + (upgradeLevel * 50)) <= this.MAX_EXPERIENCE,
        canDowngrade: upgradeLevel > 0
      };
    });
  });

  public experience: Signal<number> = computed(() => {
    const upgrades = this.upgrades();

    let total = 0;
    for (const statKey in upgrades) {
      total += totalUpgradeCost(upgrades[statKey as PrimaryStatKey]);
    }

    return total;
  });

  public rank: Signal<number> = computed(() => {
    const experience = this.experience();
    return this.RANK_THRESHOLDS.findLastIndex((threshold: number) => experience >= threshold) + 1;
  });

  public racialGiftsPoints: Signal<number> = computed(() => {
    return this.rank() + 2;
  });

  public validatedGifts: Signal<SelectedGifts> = computed(() => {
    const selected = this.state().selectedGifts;
    const gifts = this.race().racialGifts;
    const budget = this.racialGiftsPoints();

    const validated: SelectedGifts = {};
    let spent = 0;

    for (const giftId in selected) {
      const gift = gifts.find(g => g.id === giftId);
      if (!gift) continue;
      if (spent + gift.unlockCost > budget) continue;

      spent += gift.unlockCost;
      const validatedUpgrades: string[] = [];

      for (const upgradeId of selected[giftId]) {
        const upgrade = gift.giftUpgrades?.find(u => u.id === upgradeId);
        if (!upgrade) continue;
        if (spent + upgrade.unlockCost > budget) continue;
        spent += upgrade.unlockCost;
        validatedUpgrades.push(upgradeId);
      }

      validated[giftId] = validatedUpgrades;
    }

    return validated;
  });

  public spentGiftPoints: Signal<number> = computed(() => {
    const selected = this.validatedGifts();
    const gifts = this.race().racialGifts;

    let spent = 0;
    for (const giftId in selected) {
      const gift = gifts.find(g => g.id === giftId);
      if (!gift) continue;
      spent += gift.unlockCost;
      for (const upgradeId of selected[giftId]) {
        const upgrade = gift.giftUpgrades?.find(u => u.id === upgradeId);
        if (upgrade) spent += upgrade.unlockCost;
      }
    }
    return spent;
  });

  public availableGiftPoints: Signal<number> = computed(() => {
    return this.racialGiftsPoints() - this.spentGiftPoints();
  });

  public setRace(raceId: string): void {
    this.state.update(state => ({...state, raceId, selectedGifts: {}}));
  }

  public getStateForDebug(): PlannerState {
    return this.state();
  }

  public increaseStat(statKey: PrimaryStatKey): void {
    const numberOfUpgrades = this.upgrades()[statKey];
    const nextUpgradeCost = 50 + (numberOfUpgrades * 50);

    const canUpgrade = numberOfUpgrades < this.MAX_UPGRADES;
    const canLevel = (this.experience() + nextUpgradeCost) <= this.MAX_EXPERIENCE;

    if (!canUpgrade || !canLevel) {
      return;
    }

    this.state.update(state => ({
      ...state,
      upgrades: {
        ...state.upgrades,
        [statKey]: numberOfUpgrades + 1
      }
    }));
  }

  public decreaseStat(statKey: PrimaryStatKey): void {
    const numberOfUpgrades = this.upgrades()[statKey];

    if (numberOfUpgrades <= 0) {
      return;
    }

    this.state.update(state => ({
      ...state,
      upgrades: {
        ...state.upgrades,
        [statKey]: numberOfUpgrades - 1
      }
    }));
  }

  public toggleGift(giftId: string): void {
    const validated = this.validatedGifts();

    if (giftId in validated) {
      const { [giftId]: _, ...rest } = this.state().selectedGifts;
      this.state.update(state => ({...state, selectedGifts: rest}));
      return;
    }

    const gift = this.race().racialGifts.find(g => g.id === giftId);
    if (!gift || this.availableGiftPoints() < gift.unlockCost) return;

    this.state.update(state => ({
      ...state,
      selectedGifts: {...state.selectedGifts, [giftId]: []}
    }));
  }

  public toggleUpgrade(giftId: string, upgradeId: string): void {
    const validated = this.validatedGifts();
    if (!(giftId in validated)) return;

    const upgradeIds = validated[giftId];

    if (upgradeIds.includes(upgradeId)) {
      this.state.update(state => ({
        ...state,
        selectedGifts: {
          ...state.selectedGifts,
          [giftId]: state.selectedGifts[giftId].filter(id => id !== upgradeId)
        }
      }));
      return;
    }

    const gift = this.race().racialGifts.find(g => g.id === giftId);
    const upgrade = gift?.giftUpgrades?.find(u => u.id === upgradeId);
    if (!upgrade || this.availableGiftPoints() < upgrade.unlockCost) return;

    this.state.update(state => ({
      ...state,
      selectedGifts: {
        ...state.selectedGifts,
        [giftId]: [...state.selectedGifts[giftId], upgradeId]
      }
    }));
  }
}

function totalUpgradeCost(level: number): number {
  return level * (level + 1) / 2 * 50;
}
