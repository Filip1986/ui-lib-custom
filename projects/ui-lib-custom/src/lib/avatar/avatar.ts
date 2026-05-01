import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { AvatarSize, AvatarShape, AvatarVariant } from './avatar.types';
export type { AvatarSize, AvatarShape, AvatarVariant } from './avatar.types';
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
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  host: {
    '[class]': 'avatarClasses()',
    '[attr.aria-label]': 'ariaLabelResolved()',
    '[attr.role]': '"img"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Avatar {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  /** URL of the image to display */
  public readonly image: InputSignal<string | null> = input<string | null>(null);
  /** Alternative text for the image */
  public readonly imageAlt: InputSignal<string> = input<string>('Avatar');
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
  private readonly effectiveVariant: Signal<AvatarVariant> = computed<AvatarVariant>(
    (): AvatarVariant => {
      const direct: AvatarVariant | null = this.variant();
      if (direct) return direct;
      const global: 'material' | 'bootstrap' | 'minimal' = this.themeConfig.variant();
      return global;
    }
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
  /** Resolved aria-label: explicit ariaLabel > imageAlt when image > label > null */
  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const override: string | null = this.ariaLabel();
      if (override) return override;
      const img: string | null = this.image();
      if (img) return this.imageAlt();
      return this.label();
    }
  );
  /** Whether to show the image slot */
  public readonly showImage: Signal<boolean> = computed<boolean>(
    (): boolean => this.image() !== null
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
