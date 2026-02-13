import { Component, computed, inject, signal } from '@angular/core';
import { PlannerService } from '../services/planner.service';
import { Armor, ArmorCategory, ArmorSlotKey } from '../types/armor';
import { ElementType } from '../types/element';
import { HELMETS } from '../constants/armors/helmet';
import { CHESTPLATES } from '../constants/armors/chestplate';
import { BOOTS } from '../constants/armors/boot';
import { JEWELRY } from '../constants/armors/jewelry';
import { STAT_DETAILS } from '../constants/stat';
import { ELEMENT_NAMES } from '../constants/element';

const ARMOR_BY_SLOT: Record<ArmorSlotKey, Armor[]> = {
  HELMET: HELMETS,
  CHESTPLATE: CHESTPLATES,
  BOOTS: BOOTS,
  JEWELRY: JEWELRY,
};

const SLOT_KEYS = Object.keys(ArmorCategory) as ArmorSlotKey[];

@Component({
  selector: 'armor-selector',
  styles: `
    .armor-slots {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .armor-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      background: #fafafa;
      overflow: hidden;
    }

    .slot-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      cursor: pointer;
      user-select: none;
      background: #f0f0f0;
      border-bottom: 1px solid #ddd;
    }

    .slot-header:hover {
      background: #e8e8e8;
    }

    .slot-header h4 {
      margin: 0;
    }

    .slot-chevron {
      font-size: 0.8em;
      color: #666;
    }

    .slot-summary {
      padding: 8px 12px;
      cursor: pointer;
    }

    .slot-summary:hover {
      background: #f5f5f5;
    }

    .summary-equipped {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .summary-equipped img {
      width: 48px;
      height: 48px;
      object-fit: contain;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      flex-shrink: 0;
    }

    .summary-info {
      min-width: 0;
    }

    .summary-name {
      font-weight: bold;
      color: #111;
      font-size: 0.9em;
    }

    .summary-stats {
      font-size: 0.8em;
      color: #555;
    }

    .summary-stats span {
      margin-right: 6px;
    }

    .summary-none {
      color: #999;
      font-style: italic;
      font-size: 0.9em;
    }

    .armor-actions {
      /* Placeholder for future enchantments/gems actions */
    }

    .slot-panel {
      padding: 8px 12px 12px;
    }

    .armor-list {
      max-height: 300px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .armor-item {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      padding: 6px;
      border: 2px solid transparent;
      border-radius: 6px;
      cursor: pointer;
      background: #fff;
    }

    .armor-item:hover {
      background: #eef2ff;
    }

    .armor-item.selected {
      border-color: #4f46e5;
      background: #eef2ff;
    }

    .armor-item img {
      width: 48px;
      height: 48px;
      object-fit: contain;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      flex-shrink: 0;
    }

    .armor-item-info {
      font-size: 0.85em;
      color: #555;
      min-width: 0;
    }

    .armor-item-name {
      font-weight: bold;
      color: #111;
    }

    .armor-bonuses span,
    .armor-resistances span {
      margin-right: 6px;
    }

    .armor-extra-gem {
      color: #b8860b;
      font-weight: bold;
    }

    .armor-unequip {
      padding: 4px 8px;
      margin-bottom: 4px;
      cursor: pointer;
      border: 2px solid transparent;
      border-radius: 6px;
      background: #fff;
      width: 100%;
      text-align: left;
    }

    .armor-unequip:hover {
      background: #fee2e2;
    }

    .armor-unequip.selected {
      border-color: #4f46e5;
      background: #eef2ff;
    }
  `,
  template: `
    <h3>Équipement</h3>
    <div class="armor-slots">
      @for (slot of SLOT_KEYS; track slot) {
        <div class="armor-card">
          <div class="slot-header" (click)="toggleSlot(slot)">
            <h4>{{ slotLabel(slot) }}</h4>
            <span class="slot-chevron">{{ openSlot() === slot ? '▼' : '▶' }}</span>
          </div>

          @if (openSlot() !== slot) {
            <div class="slot-summary" (click)="toggleSlot(slot)">
              @if (equipped()[slot]; as item) {
                <div class="summary-equipped">
                  <img [src]="imageUrl(item.id)" [alt]="item.name">
                  <div class="summary-info">
                    <div class="summary-name">{{ item.name }}</div>
                    <div class="summary-stats">
                      @if (item.bonuses?.length) {
                        @for (b of item.bonuses; track b.stat) {
                          <span>{{ statShortName(b.stat) }} {{ b.bonus > 0 ? '+' : '' }}{{ b.bonus }}</span>
                        }
                      }
                      @if (item.resistances?.length) {
                        @for (r of item.resistances; track r.element) {
                          <span>{{ elementName(r.element) }} {{ r.percentage > 0 ? '+' : '' }}{{ r.percentage }}%</span>
                        }
                      }
                    </div>
                  </div>
                </div>
                <div class="armor-actions"></div>
              } @else {
                <div class="summary-none">Aucun</div>
              }
            </div>
          }

          @if (openSlot() === slot) {
            <div class="slot-panel">
              <div class="armor-list">
                <button
                  class="armor-unequip"
                  [class.selected]="!equipped()[slot]"
                  (click)="onUnequip(slot)"
                >Aucun</button>
                @for (armor of armorsBySlot[slot]; track armor.id) {
                  <div
                    class="armor-item"
                    [class.selected]="equipped()[slot]?.id === armor.id"
                    (click)="onEquip(slot, armor)"
                  >
                    <img [src]="imageUrl(armor.id)" [alt]="armor.name">
                    <div class="armor-item-info">
                      <div class="armor-item-name">{{ armor.name }} (rang {{ armor.rank }})</div>
                      @if (armor.bonuses?.length) {
                        <div class="armor-bonuses">
                          @for (b of armor.bonuses; track b.stat) {
                            <span>{{ statShortName(b.stat) }} {{ b.bonus > 0 ? '+' : '' }}{{ b.bonus }}</span>
                          }
                        </div>
                      }
                      @if (armor.resistances?.length) {
                        <div class="armor-resistances">
                          @for (r of armor.resistances; track r.element) {
                            <span>{{ elementName(r.element) }} {{ r.percentage > 0 ? '+' : '' }}{{ r.percentage }}%</span>
                          }
                        </div>
                      }
                      <div>Poids: {{ armor.weight }}</div>
                      @if (armor.extraGem) {
                        <div class="armor-extra-gem">Gemme bonus</div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class ArmorSelectorComponent {
  private readonly plannerService = inject(PlannerService);

  public readonly SLOT_KEYS = SLOT_KEYS;
  public readonly armorsBySlot = ARMOR_BY_SLOT;
  public readonly equipped = this.plannerService.equipment;
  public readonly openSlot = signal<ArmorSlotKey | null>(null);

  toggleSlot(slot: ArmorSlotKey): void {
    this.openSlot.set(this.openSlot() === slot ? null : slot);
  }

  slotLabel(slot: ArmorSlotKey): string {
    return ArmorCategory[slot];
  }

  statShortName(stat: string): string {
    return STAT_DETAILS[stat as keyof typeof STAT_DETAILS]?.shortName ?? stat;
  }

  imageUrl(id: number): string {
    return `https://www.kigard.fr/images/items/${id}.gif?v=2.15.04`;
  }

  elementName(element: ElementType): string {
    return ELEMENT_NAMES[element];
  }

  onEquip(slot: ArmorSlotKey, armor: Armor): void {
    this.plannerService.equipArmor(slot, armor.id);
    this.openSlot.set(null);
  }

  onUnequip(slot: ArmorSlotKey): void {
    this.plannerService.unequipArmor(slot);
    this.openSlot.set(null);
  }
}
