import { computed, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { PlannerState } from "../types/planner";
import { chooseRandomRace, getDefaultStats, getDefaultStatUpgrades } from "../constants/utils";
import { Race } from "../types/race";

@Injectable({
    providedIn: 'root'
})
export class PlannerService {
    private state: WritableSignal<PlannerState> = signal({
        race: chooseRandomRace(),
        stats: getDefaultStats(),
        upgrades: getDefaultStatUpgrades(),
  })
 
  public race: Signal<Race> = computed(() => this.state().race);

  public setRace(race: Race): void {
    this.state.update(state => ({...state, race}))
  }

  public getState(): PlannerState {
    return this.state();
  }
}
