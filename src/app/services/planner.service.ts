import { computed, Injectable, linkedSignal, Signal, signal } from "@angular/core";
import { SelectedGifts } from "../types/planner";
import { DEFAULT_STATS, getDefaultStatUpgrades } from "../constants/utils";
import { Race } from "../types/race";
import { PrimaryStatKey, PrimaryStats, PrimaryStatUpgrades, StatUpgradeSummary } from "../types/statistic";
import { STAT_DETAILS } from "../constants/stat";
import { RACES } from "../constants/race";

@Injectable({
    providedIn: 'root'
})
export class PlannerService {
    private raceId = signal<string>(RACES[Math.floor(Math.random() * RACES.length)].id);
    public upgrades = signal<PrimaryStatUpgrades>(getDefaultStatUpgrades());
    private selectedGifts = linkedSignal<string, SelectedGifts>({
        source: this.raceId,
        computation: () => ({}),
    });

  public race: Signal<Race> = computed(() => RACES.find(r => r.id === this.raceId())!);
  public stats: Signal<PrimaryStats> = computed(() => DEFAULT_STATS);

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
        canUpgrade: upgradeLevel < this.MAX_UPGRADES,
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
    const selected = this.selectedGifts();
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

  public getStateForDebug() {
    return {
      raceId: this.raceId(),
      upgrades: this.upgrades(),
      selectedGifts: this.selectedGifts(),
    };
  }

  public setRace(raceId: string): void {
    this.raceId.set(raceId);
  }

  public increaseStat(statKey: PrimaryStatKey): void {
    const numberOfUpgrades = this.upgrades()[statKey];
    const nextUpgradeCost = 50 + (numberOfUpgrades * 50);

    const canUpgrade = numberOfUpgrades < this.MAX_UPGRADES;
    const canLevel = (this.experience() + nextUpgradeCost) <= this.MAX_EXPERIENCE;

    if (!canUpgrade || !canLevel) {
      return;
    }

    this.upgrades.update(upgrades => ({
      ...upgrades,
      [statKey]: numberOfUpgrades + 1
    }));
  }

  public decreaseStat(statKey: PrimaryStatKey): void {
    const numberOfUpgrades = this.upgrades()[statKey];

    if (numberOfUpgrades <= 0) {
      return;
    }

    this.upgrades.update(upgrades => ({
      ...upgrades,
      [statKey]: numberOfUpgrades - 1
    }));
  }

  public toggleGift(giftId: string): void {
    const validated = this.validatedGifts();

    if (giftId in validated) {
      const { [giftId]: _, ...rest } = this.selectedGifts();
      this.selectedGifts.set(rest);
      return;
    }

    const gift = this.race().racialGifts.find(g => g.id === giftId);
    if (!gift || this.availableGiftPoints() < gift.unlockCost) return;

    this.selectedGifts.update(gifts => ({...gifts, [giftId]: []}));
  }

  public toggleUpgrade(giftId: string, upgradeId: string): void {
    const validated = this.validatedGifts();
    if (!(giftId in validated)) return;

    const upgradeIds = validated[giftId];

    if (upgradeIds.includes(upgradeId)) {
      this.selectedGifts.update(gifts => ({
        ...gifts,
        [giftId]: gifts[giftId].filter(id => id !== upgradeId)
      }));
      return;
    }

    const gift = this.race().racialGifts.find(g => g.id === giftId);
    const upgrade = gift?.giftUpgrades?.find(u => u.id === upgradeId);
    if (!upgrade || this.availableGiftPoints() < upgrade.unlockCost) return;

    this.selectedGifts.update(gifts => ({
      ...gifts,
      [giftId]: [...gifts[giftId], upgradeId]
    }));
  }
}

function totalUpgradeCost(level: number): number {
  return level * (level + 1) / 2 * 50;
}
