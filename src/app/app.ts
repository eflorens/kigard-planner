import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RaceSelectorComponent } from './components/race-selector.component';
import { PlannerService } from './services/planner.service';
import { JsonPipe } from '@angular/common';
import { StatSelectorComponent } from './components/stat-selector.component';
import { GiftSelectorComponent } from './components/gift-selector.component';
import { ArmorSelectorComponent } from './components/armor-selector.component';

@Component({
  selector: 'app-root',
  imports: [RaceSelectorComponent, JsonPipe, StatSelectorComponent, GiftSelectorComponent, ArmorSelectorComponent],
  template: `
    <header class="header">
      <h1>Kigard planner</h1>
      <div class="header__actions"></div>
    </header>
    <main class="planner">
      <div class="planner__main">
        <div class="planner__section">
          <race-selector />
        </div>
        <div class="planner__section">
          <stat-selector />
        </div>
        <div class="planner__section">
          <gift-selector />
        </div>
        <div class="planner__section">
          <armor-selector />
        </div>
      </div>
      <div class="planner__side">
        <pre>
        
          {{ plannerService.getStateForDebug() | json }}
        </pre
        >
      </div>
    </main>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border: 4px solid black;
      }

      .planner {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 12px;
        padding: 8px;
        max-width: 1400px;
        margin: 12px auto;

        & > * {
          border: 4px solid black;
          padding: 8px;
        }

        &__main {
        }

        &__side {
        }

        &__section {
          padding: 8px;

          &:nth-child(odd) {
            background-color: #cccccce0;
          }
        }
      }
    `,
  ],
})
export class App {
  public readonly plannerService = inject(PlannerService);
}
