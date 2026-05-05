import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type {
  MeterGroupLabelPosition,
  MeterGroupOrientation,
  MeterGroupSize,
  MeterGroupVariant,
  MeterItem,
} from 'ui-lib-custom/meter-group';

/**
 * Demo page for the MeterGroup component.
 */
@Component({
  selector: 'app-meter-group-demo',
  standalone: true,
  imports: [MeterGroup],
  templateUrl: './meter-group-demo.component.html',
  styleUrl: './meter-group-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterGroupDemoComponent {
  // ---- Basic example ------------------------------------------------
  public readonly basicItems: MeterItem[] = [
    { label: 'Apps', value: 16, color: '#34d399' },
    { label: 'Messages', value: 8, color: '#818cf8' },
    { label: 'Media', value: 24, color: '#fb923c' },
    { label: 'System', value: 10, color: '#f87171' },
  ];

  // ---- Variant examples ---------------------------------------------
  public readonly variantItems: MeterItem[] = [
    { label: 'Used', value: 45, color: '#6366f1' },
    { label: 'Cached', value: 25, color: '#a5b4fc' },
    { label: 'Free', value: 30, color: '#e0e7ff' },
  ];

  // ---- Label position example ---------------------------------------
  public readonly storageItems: MeterItem[] = [
    { label: 'Documents', value: 38, color: '#0ea5e9', icon: 'pi pi-file' },
    { label: 'Videos', value: 21, color: '#d946ef', icon: 'pi pi-video' },
    { label: 'Photos', value: 17, color: '#f59e0b', icon: 'pi pi-image' },
    { label: 'Other', value: 12, color: '#6b7280', icon: 'pi pi-ellipsis-h' },
  ];

  // ---- Interactive example ------------------------------------------
  public readonly interactiveItems: WritableSignal<MeterItem[]> = signal<MeterItem[]>([
    { label: 'Q1', value: 25, color: '#34d399' },
    { label: 'Q2', value: 35, color: '#818cf8' },
    { label: 'Q3', value: 20, color: '#fb923c' },
    { label: 'Q4', value: 15, color: '#f87171' },
  ]);

  public readonly interactiveMax: WritableSignal<number> = signal<number>(100);
  public readonly interactiveOrientation: WritableSignal<MeterGroupOrientation> =
    signal<MeterGroupOrientation>('horizontal');
  public readonly interactiveLabelPosition: WritableSignal<MeterGroupLabelPosition> =
    signal<MeterGroupLabelPosition>('end');
  public readonly interactiveSize: WritableSignal<MeterGroupSize> = signal<MeterGroupSize>('md');
  public readonly interactiveVariant: WritableSignal<MeterGroupVariant> =
    signal<MeterGroupVariant>('material');

  // ---- Vertical example ---------------------------------------------
  public readonly cpuItems: MeterItem[] = [
    { label: 'User', value: 42, color: '#818cf8' },
    { label: 'System', value: 18, color: '#fb923c' },
    { label: 'I/O Wait', value: 8, color: '#f87171' },
  ];

  public setOrientation(orientation: MeterGroupOrientation): void {
    this.interactiveOrientation.set(orientation);
  }

  public setLabelPosition(position: MeterGroupLabelPosition): void {
    this.interactiveLabelPosition.set(position);
  }

  public setSize(size: MeterGroupSize): void {
    this.interactiveSize.set(size);
  }

  public setVariant(variant: MeterGroupVariant): void {
    this.interactiveVariant.set(variant);
  }
}
