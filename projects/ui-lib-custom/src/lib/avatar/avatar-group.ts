import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  type InputSignal,
} from '@angular/core';
export type AvatarGroupMax = number;
/**
 * AvatarGroup - Container that stacks Avatar components with overlap.
 *
 * @example
 * <ui-lib-avatar-group>
 *   <ui-lib-avatar label="JD" />
 *   <ui-lib-avatar label="AB" />
 * </ui-lib-avatar-group>
 */
@Component({
  selector: 'ui-lib-avatar-group',
  standalone: true,
  templateUrl: './avatar-group.html',
  styleUrl: './avatar-group.scss',
  host: {
    class: 'ui-lib-avatar-group',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.role]': '"group"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AvatarGroup {
  /** Accessible label for the avatar group */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
}
