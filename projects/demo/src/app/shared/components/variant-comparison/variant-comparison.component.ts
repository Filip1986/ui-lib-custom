import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-variant-comparison',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="variant-comparison">
      <div class="variant-comparison__header">
        <h3>Variant Comparison</h3>
        <div class="variant-comparison__controls">
          <label>
            <input
              type="checkbox"
              [ngModel]="showMaterial()"
              (ngModelChange)="showMaterial.set($event)"
            />
            Material
          </label>
          <label>
            <input
              type="checkbox"
              [ngModel]="showBootstrap()"
              (ngModelChange)="showBootstrap.set($event)"
            />
            Bootstrap
          </label>
          <label>
            <input
              type="checkbox"
              [ngModel]="showMinimal()"
              (ngModelChange)="showMinimal.set($event)"
            />
            Minimal
          </label>
        </div>
      </div>

      <div class="variant-comparison__grid" [style.gridTemplateColumns]="gridColumns()">
        @if (showMaterial()) {
          <div class="variant-column">
            <div class="variant-label">Material</div>
            <div class="variant-content" data-variant="material">
              <ng-content select="[material]"></ng-content>
            </div>
          </div>
        }

        @if (showBootstrap()) {
          <div class="variant-column">
            <div class="variant-label">Bootstrap</div>
            <div class="variant-content" data-variant="bootstrap">
              <ng-content select="[bootstrap]"></ng-content>
            </div>
          </div>
        }

        @if (showMinimal()) {
          <div class="variant-column">
            <div class="variant-label">Minimal</div>
            <div class="variant-content" data-variant="minimal">
              <ng-content select="[minimal]"></ng-content>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './variant-comparison.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantComparisonComponent {
  showMaterial = signal(true);
  showBootstrap = signal(true);
  showMinimal = signal(true);

  gridColumns = computed(() => {
    const count = [this.showMaterial(), this.showBootstrap(), this.showMinimal()].filter(
      Boolean
    ).length;
    return `repeat(${Math.max(count, 1)}, 1fr)`;
  });
}
