import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Chip } from 'ui-lib-custom/chip';
import type { ChipSize, ChipVariant } from 'ui-lib-custom/chip';

/**
 * Demo page for the Chip component.
 */
@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [Chip],
  templateUrl: './chip-demo.component.html',
  styleUrl: './chip-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipDemoComponent {
  public readonly sizes: ChipSize[] = ['sm', 'md', 'lg'];
  public readonly variants: ChipVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly playgroundLabel: WritableSignal<string> = signal<string>('Angular');
  public readonly playgroundSize: WritableSignal<ChipSize> = signal<ChipSize>('md');
  public readonly playgroundVariant: WritableSignal<ChipVariant> = signal<ChipVariant>('material');
  public readonly playgroundRemovable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundIcon: WritableSignal<string | null> = signal<string | null>(null);

  public readonly activeChips: WritableSignal<string[]> = signal<string[]>([
    'Angular',
    'React',
    'Vue',
    'Svelte',
  ]);
  public readonly removedChips: WritableSignal<string[]> = signal<string[]>([]);

  public setSize(size: ChipSize): void {
    this.playgroundSize.set(size);
  }

  public setVariant(variant: ChipVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleRemovable(): void {
    this.playgroundRemovable.set(!this.playgroundRemovable());
  }

  public toggleIcon(): void {
    this.playgroundIcon.set(this.playgroundIcon() ? null : 'pi pi-tag');
  }

  public removeChip(label: string): void {
    this.activeChips.update((chips: string[]): string[] =>
      chips.filter((chip: string): boolean => chip !== label)
    );
    this.removedChips.update((removed: string[]): string[] => [...removed, label]);
  }

  public resetChips(): void {
    this.activeChips.set(['Angular', 'React', 'Vue', 'Svelte']);
    this.removedChips.set([]);
  }
}
