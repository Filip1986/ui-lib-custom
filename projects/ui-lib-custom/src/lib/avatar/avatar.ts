import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
  type TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { AVATAR_GROUP_CONTEXT } from './avatar-group';
import type { AvatarFallbackContext, AvatarSize, AvatarShape, AvatarVariant } from './avatar.types';
export type { AvatarFallbackContext, AvatarSize, AvatarShape, AvatarVariant } from './avatar.types';
let nextAvatarId: number = 0;
/**
 * Avatar - Represents a person or object with an image, initials, or icon.
 *
 * Supports three display modes (image, label, icon) with three shapes and sizes.
 * Falls back to content projection when no display mode is active.
 *
 * @example
 * <ui-lib-avatar image="/assets/photo.jpg" shape="circle" />
 * <ui-lib-avatar label="JD" size="lg" />
 * <ui-lib-avatar icon="pi pi-user" shape="square" />
 */
@Component({
  selector: 'ui-lib-avatar',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  host: {
    '[class]': 'avatarClasses()',
    '[attr.aria-label]': 'ariaLabelResolved()',
    '[attr.role]': 'hostRole()',
    '[attr.id]': 'instanceId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Avatar {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly isInAvatarGroup: boolean =
    inject(AVATAR_GROUP_CONTEXT, {
      optional: true,
    }) === true;
  public readonly instanceId: string = `ui-lib-avatar-${(nextAvatarId += 1)}`;
  /** URL of the image to display */
  public readonly image: InputSignal<string | null> = input<string | null>(null);
  /** Alternative text for the image */
  public readonly imageAlt: InputSignal<string> = input<string>('');
  /** Full name announced by assistive technologies */
  public readonly name: InputSignal<string | null> = input<string | null>(null);
  /** Text label (typically initials) to display when no image is provided */
  public readonly label: InputSignal<string | null> = input<string | null>(null);
  /** CSS class string for an icon (e.g. "pi pi-user") to display when no image or label */
  public readonly icon: InputSignal<string | null> = input<string | null>(null);
  /** Size of the avatar */
  public readonly size: InputSignal<AvatarSize> = input<AvatarSize>('md');
  /** Shape of the avatar */
  public readonly shape: InputSignal<AvatarShape> = input<AvatarShape>('circle');
  /** Visual variant - inherits from ThemeConfigService when not set */
  public readonly variant: InputSignal<AvatarVariant | null> = input<AvatarVariant | null>(null);
  /** Additional CSS classes to apply */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);
  /** Accessible label override for the avatar */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Content children (typed template slots)
  // ---------------------------------------------------------------------------

  /**
   * Optional custom fallback template shown when no `image`, `label`, or `icon` is set.
   * Context: `{ size, shape, variant }`.
   *
   * @example
   * ```html
   * <ui-lib-avatar>
   *   <ng-template #fallback let-size="size">
   *     <mat-icon>person</mat-icon>
   *   </ng-template>
   * </ui-lib-avatar>
   * ```
   */
  public readonly fallbackTemplate: Signal<TemplateRef<AvatarFallbackContext> | undefined> =
    contentChild<TemplateRef<AvatarFallbackContext>>('fallback');

  public readonly hostRole: Signal<'img' | 'listitem'> = computed<'img' | 'listitem'>(
    (): 'img' | 'listitem' => (this.isInAvatarGroup ? 'listitem' : 'img'),
  );
  private readonly effectiveVariant: Signal<AvatarVariant> = computed<AvatarVariant>(
    (): AvatarVariant => {
      const direct: AvatarVariant | null = this.variant();
      if (direct) return direct;
      const global: 'material' | 'bootstrap' | 'minimal' = this.themeConfig.variant();
      return global;
    },
  );
  /** Computed CSS classes for the host element */
  public readonly avatarClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-avatar',
      `ui-lib-avatar--size-${this.size()}`,
      `ui-lib-avatar--shape-${this.shape()}`,
      `ui-lib-avatar--variant-${this.effectiveVariant()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });
  /** Resolved aria-label: explicit ariaLabel > imageAlt when image > name > label > i18n fallback */
  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const override: string | null = this.ariaLabel();
      if (override) return override;
      const img: string | null = this.image();
      if (img) return this.resolvedImageAlt();
      return this.name() || this.label() || this.i18n.translate('avatar.label');
    },
  );

  public readonly resolvedImageAlt: Signal<string> = computed<string>((): string => {
    const configuredAlt: string = this.imageAlt().trim();
    if (configuredAlt) return configuredAlt;
    return this.name() || this.label() || this.i18n.translate('avatar.label');
  });

  /** Context object passed to the `#fallback` template slot. */
  public readonly fallbackContext: Signal<AvatarFallbackContext> = computed<AvatarFallbackContext>(
    (): AvatarFallbackContext => ({
      size: this.size(),
      shape: this.shape(),
      variant: this.effectiveVariant(),
    }),
  );
  /** Whether to show the image slot */
  public readonly showImage: Signal<boolean> = computed<boolean>(
    (): boolean => this.image() !== null,
  );
  /** Whether to show the label slot */
  public readonly showLabel: Signal<boolean> = computed<boolean>((): boolean => {
    return this.image() === null && this.label() !== null;
  });
  /** Whether to show the icon slot */
  public readonly showIcon: Signal<boolean> = computed<boolean>((): boolean => {
    return this.image() === null && this.label() === null && this.icon() !== null;
  });
}
