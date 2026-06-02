import {
  ChangeDetectionStrategy,
  Component,
  computed,
  InjectionToken,
  input,
  type InputSignal,
  type Signal,
  ViewEncapsulation,
} from '@angular/core';
export type AvatarGroupMax = number;
export const AVATAR_GROUP_CONTEXT: InjectionToken<boolean> = new InjectionToken<boolean>(
  'AVATAR_GROUP_CONTEXT',
);
let nextAvatarGroupId: number = 0;
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
  providers: [{ provide: AVATAR_GROUP_CONTEXT, useValue: true }],
  host: {
    class: 'ui-lib-avatar-group',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    '[attr.role]': '"list"',
    '[attr.id]': 'groupId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AvatarGroup {
  public readonly groupId: string = `ui-lib-avatar-group-${(nextAvatarGroupId += 1)}`;
  /** Accessible label for the avatar group */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  /** Number of additional avatars represented by the overflow counter */
  public readonly overflowCount: InputSignal<number> = input<number>(0);
  /** Accessible override text for the overflow counter */
  public readonly overflowAriaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly resolvedAriaLabel: Signal<string> = computed<string>(
    (): string => this.ariaLabel() || 'Avatar group',
  );
  public readonly resolvedOverflowCount: Signal<number> = computed<number>((): number => {
    const overflowCount: number = this.overflowCount();
    return Number.isFinite(overflowCount) && overflowCount > 0 ? Math.floor(overflowCount) : 0;
  });
  public readonly overflowAnnouncement: Signal<string> = computed<string>(
    (): string =>
      this.overflowAriaLabel() || `${this.resolvedOverflowCount()} more avatar(s) not shown`,
  );
}
