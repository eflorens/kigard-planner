import { Component, inject } from '@angular/core';
import { PlannerService } from '../services/planner.service';
import { FormsModule } from '@angular/forms';
import { RACES } from '../constants/race';

@Component({
  selector: 'race-selector',
  imports: [FormsModule],
  template: `
    <select
      [ngModel]="plannerService.race()"
      (ngModelChange)="plannerService.setRace($event)"
      placeholder="Sélectionnez une race"
    >
      @for (race of RACES; track race.name) {
        <option [ngValue]="race">{{ race.name }}</option>
      }
    </select>
  `,
})
export class RaceSelectorComponent {
  public readonly plannerService = inject(PlannerService);
  public readonly RACES = RACES;
}
