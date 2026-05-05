import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Divider } from 'ui-lib-custom/divider';
import type {
  DividerAlign,
  DividerOrientation,
  DividerType,
  DividerVariant,
} from 'ui-lib-custom/divider';

/**
 * Demo page for the Divider component.
 */
@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [Divider],
  templateUrl: './divider-demo.component.html',
  styleUrl: './divider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {
  public readonly types: DividerType[] = ['solid', 'dashed', 'dotted'];
  public readonly variants: DividerVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly horizontalAligns: DividerAlign[] = ['left', 'center', 'right'];
  public readonly verticalAligns: DividerAlign[] = ['top', 'center', 'bottom'];

  public readonly playgroundOrientation: WritableSignal<DividerOrientation> =
    signal<DividerOrientation>('horizontal');
  public readonly playgroundType: WritableSignal<DividerType> = signal<DividerType>('solid');
  public readonly playgroundAlign: WritableSignal<DividerAlign | null> =
    signal<DividerAlign | null>(null);
  public readonly playgroundVariant: WritableSignal<DividerVariant> =
    signal<DividerVariant>('material');
  public readonly playgroundHasContent: WritableSignal<boolean> = signal<boolean>(true);

  public setOrientation(orientation: DividerOrientation): void {
    this.playgroundOrientation.set(orientation);
    this.playgroundAlign.set(null);
  }

  public setType(type: DividerType): void {
    this.playgroundType.set(type);
  }

  public setAlign(align: DividerAlign): void {
    this.playgroundAlign.set(align);
  }

  public setVariant(variant: DividerVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleContent(): void {
    this.playgroundHasContent.set(!this.playgroundHasContent());
  }
}
