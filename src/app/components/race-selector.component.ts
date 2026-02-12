import { Component, inject } from '@angular/core';
import { PlannerService } from '../services/planner.service';
import { FormsModule } from '@angular/forms';
import { RACES } from '../constants/race';

@Component({
  selector: 'race-selector',
  imports: [FormsModule],
  styles: `
    label {
      display: block;
    }
  `,
  template: `
    <label for="race-selector">Choisir une race</label>
    <select
      name="race-selector"
      [ngModel]="plannerService.race().id"
      (ngModelChange)="plannerService.setRace($event)"
      placeholder="Sélectionnez une race"
    >
      @for (race of RACES; track race.id) {
        <option [ngValue]="race.id">{{ race.name }}</option>
      }
    </select>
  `,
})
export class RaceSelectorComponent {
  public readonly plannerService = inject(PlannerService);
  public readonly RACES = RACES;
}
