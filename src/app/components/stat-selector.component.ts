import { Component, inject } from "@angular/core";
import { PlannerService } from "../services/planner.service";
import { STAT_DETAILS } from "../constants/stat";

@Component({
    selector: 'stat-selector',
    template: `
        <p>Experience: {{ plannerService.experience() }} - Rank: {{ plannerService.rank() }}</p>
        <table>
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                    <th>Next Cost</th>
                    <th>Total Cost</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @for (upgrade of plannerService.statUpgradeSummary(); track upgrade.key) {
                    <tr>
                        <td>{{ STAT_DETAILS[upgrade.key].fullName }}</td>
                        <td>{{ upgrade.totalValue }}</td>
                        <td>{{ upgrade.nextUpgradeCost }}</td>
                        <td>{{ upgrade.totalUpgradeCost }}</td>
                        <td>
                            <button [disabled]="!upgrade.canUpgrade" (click)="plannerService.increaseStat(upgrade.key)">+</button>
                            <button [disabled]="!upgrade.canDowngrade" (click)="plannerService.decreaseStat(upgrade.key)">-</button>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    `
})
export class StatSelectorComponent {
    public plannerService = inject(PlannerService);
    public readonly STAT_DETAILS = STAT_DETAILS;
}
