import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Bind } from 'ui-lib-custom/bind';
/**
 * Demo page for the Bind directive.
 * Demonstrates basic usage, dynamic binding updates, and the full input API.
 */
@Component({
  selector: 'app-bind-demo',
  standalone: true,
  imports: [Bind, JsonPipe],
  templateUrl: './bind-demo.component.html',
  styleUrl: './bind-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BindDemoComponent {
  /** Controls which dynamic id preset is active. */
  public readonly activeIdPreset: WritableSignal<'alpha' | 'beta' | 'gamma'> = signal<
    'alpha' | 'beta' | 'gamma'
  >('alpha');

  /** Available id presets — typed as a readonly tuple so the template infers the union. */
  public readonly idPresets: ReadonlyArray<'alpha' | 'beta' | 'gamma'> = [
    'alpha',
    'beta',
    'gamma',
  ] as const;
  /** Used to toggle the tooltip text on the live example element. */
  public readonly tooltipLabel: WritableSignal<string> = signal<string>('Hover me');
  /** Whether to include tabIndex in the live binding. */
  public readonly includeTabIndex: WritableSignal<boolean> = signal<boolean>(false);
  /** The live binding object used in the interactive playground section. */
  public readonly liveBindings: Signal<Record<string, unknown>> = computed<Record<string, unknown>>(
    (): Record<string, unknown> => {
      const base: Record<string, unknown> = {
        id: `bind-target-${this.activeIdPreset()}`,
        title: this.tooltipLabel(),
        'aria-label': `Demonstration element — ${this.tooltipLabel()}`,
      };
      if (this.includeTabIndex()) {
        base['tabIndex'] = 0;
      }
      return base;
    }
  );
  public setPreset(preset: 'alpha' | 'beta' | 'gamma'): void {
    this.activeIdPreset.set(preset);
  }
  public cycleTooltip(): void {
    const labels: string[] = ['Hover me', 'Dynamic tooltip!', 'Changed again'];
    const current: string = this.tooltipLabel();
    const index: number = labels.indexOf(current);
    const next: string = labels[(index + 1) % labels.length] ?? 'Hover me';
    this.tooltipLabel.set(next);
  }
  public toggleTabIndex(): void {
    this.includeTabIndex.update((value: boolean): boolean => !value);
  }
}
