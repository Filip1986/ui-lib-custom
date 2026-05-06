import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';
import type { BottomSheetVariant } from 'ui-lib-custom/bottom-sheet';

/**
 * Demo page for the BottomSheet component.
 */
@Component({
  selector: 'app-bottom-sheet-demo',
  standalone: true,
  imports: [BottomSheet],
  templateUrl: './bottom-sheet-demo.component.html',
  styleUrl: './bottom-sheet-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetDemoComponent {
  public readonly variants: BottomSheetVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly basicOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly headerOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly footerOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly noBackdropOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly noEscapeOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly materialOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly bootstrapOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly minimalOpen: WritableSignal<boolean> = signal<boolean>(false);

  public openVariant(variant: BottomSheetVariant): void {
    if (variant === 'material') this.materialOpen.set(true);
    else if (variant === 'bootstrap') this.bootstrapOpen.set(true);
    else this.minimalOpen.set(true);
  }
}
