import { Component, inject } from "@angular/core";
import { PlannerService } from "../services/planner.service";

@Component({
    selector: 'gift-selector',
    template: `
        <p>{{ plannerService.spentGiftPoints() }} / {{ plannerService.racialGiftsPoints() }} points de dons</p>

        @for (gift of plannerService.race().racialGifts; track gift.id) {
            @let isSelected = plannerService.validatedGifts()[gift.id] !== undefined;

            <details>
                <summary>
                    {{ gift.name }} ({{ gift.unlockCost }})
                    @if (isSelected) {
                        <button (click)="plannerService.toggleGift(gift.id); $event.preventDefault()">Retirer</button>
                    } @else {
                        <button [disabled]="plannerService.availableGiftPoints() < gift.unlockCost" (click)="plannerService.toggleGift(gift.id); $event.preventDefault()">Débloquer</button>
                    }
                </summary>

                <p>{{ gift.description }}</p>

                @if (isSelected && gift.giftUpgrades?.length) {
                    <ul>
                        @for (upgrade of gift.giftUpgrades; track upgrade.id) {
                            @let isUnlocked = plannerService.validatedGifts()[gift.id]?.includes(upgrade.id);
                            <li>
                                {{ upgrade.description }}
                                @if (isUnlocked) {
                                    <button (click)="plannerService.toggleUpgrade(gift.id, upgrade.id)">-{{ upgrade.unlockCost }}</button>
                                } @else {
                                    <button [disabled]="plannerService.availableGiftPoints() < upgrade.unlockCost" (click)="plannerService.toggleUpgrade(gift.id, upgrade.id)">+{{ upgrade.unlockCost }}</button>
                                }
                            </li>
                        }
                    </ul>
                }
            </details>
        } @empty {
            <p>Cette race n'a pas de dons raciaux.</p>
        }
    `
})
export class GiftSelectorComponent {
    public plannerService = inject(PlannerService);
}
