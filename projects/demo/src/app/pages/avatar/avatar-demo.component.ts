import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Avatar } from 'ui-lib-custom/avatar';
import { AvatarGroup } from 'ui-lib-custom/avatar';
import type { AvatarSize, AvatarShape, AvatarVariant } from 'ui-lib-custom/avatar';
/**
 * Demo page for the Avatar and AvatarGroup components.
 */
@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [Avatar, AvatarGroup],
  templateUrl: './avatar-demo.component.html',
  styleUrl: './avatar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {
  public readonly sizes: AvatarSize[] = ['sm', 'md', 'lg'];
  public readonly shapes: AvatarShape[] = ['circle', 'square'];
  public readonly variants: AvatarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly playgroundSize: WritableSignal<AvatarSize> = signal<AvatarSize>('md');
  public readonly playgroundShape: WritableSignal<AvatarShape> = signal<AvatarShape>('circle');
  public readonly playgroundVariant: WritableSignal<AvatarVariant> =
    signal<AvatarVariant>('material');
  public setSize(size: AvatarSize): void {
    this.playgroundSize.set(size);
  }
  public setShape(shape: AvatarShape): void {
    this.playgroundShape.set(shape);
  }
  public setVariant(variant: AvatarVariant): void {
    this.playgroundVariant.set(variant);
  }
}
