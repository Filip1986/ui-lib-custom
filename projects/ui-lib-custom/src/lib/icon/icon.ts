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
import { NgIcon } from '@ng-icons/core';
import { IconService } from './icon.service';
import {
  ICON_LIBRARY_PREFIX,
  type IconLibrary,
  type IconSize,
  type ComponentVariant,
} from './icon.types';
import { SEMANTIC_ICONS, type SemanticIcon } from './icon.semantics';
import { KEYBOARD_KEYS } from '../shared/constants';

const normalizeIconName: (value: string) => string = (value: string): string =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part: string): string => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const hasKnownPrefix: (value: string) => boolean = (value: string): boolean => {
  const prefixes: string[] = Object.values(ICON_LIBRARY_PREFIX)
    .filter(Boolean)
    .map((p: string): string => p.toLowerCase());
  return prefixes.some((p: string): boolean => value.toLowerCase().startsWith(p));
};

/**
 * Icon component that resolves semantic names to the active icon library.
 */
@Component({
  selector: 'ui-lib-icon',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  host: {
    class: 'ui-lib-icon',
    '[class.ui-lib-icon--clickable]': 'clickable()',
    '[style.--icon-color]': 'color()',
    '[attr.role]': 'clickable() ? "button" : null',
    '[attr.tabindex]': 'clickable() ? 0 : null',
    '[attr.aria-label]': 'ariaLabelResolved()',
    '[attr.aria-hidden]': 'ariaHidden()',
    '(keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Icon {
  private readonly iconService: IconService = inject(IconService);

  public readonly name: InputSignal<string | SemanticIcon> = input.required<
    string | SemanticIcon
  >();
  public readonly size: InputSignal<IconSize> = input<IconSize>('md');
  public readonly color: InputSignal<string | null> = input<string | null>(null);
  public readonly clickable: InputSignal<boolean> = input<boolean>(false);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly library: InputSignal<IconLibrary | null> = input<IconLibrary | null>(null);
  public readonly variant: InputSignal<ComponentVariant | null> = input<ComponentVariant | null>(
    null
  );
  public readonly semantic: InputSignal<boolean> = input<boolean>(false);

  public readonly resolvedName: Signal<string> = computed<string>((): string => {
    const library: IconLibrary = this.iconService.resolveLibrary(this.library(), this.variant());
    const raw: string | SemanticIcon = this.name();
    const base: string =
      this.semantic() || this.isSemanticIcon(raw)
        ? this.iconService.resolveIcon(raw as SemanticIcon, library)
        : raw;
    const prefix: string | undefined = ICON_LIBRARY_PREFIX[library];
    // If the base already carries any known library prefix, return it as-is
    if (!prefix || hasKnownPrefix(base)) {
      return base;
    }
    const baseName: string = normalizeIconName(base);
    return `${prefix}${baseName}`;
  });

  public readonly resolvedSize: Signal<string> = computed<string>((): string =>
    this.iconService.getIconSize(this.size())
  );
  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => (this.clickable() ? (this.ariaLabel() ?? 'Icon') : this.ariaLabel())
  );
  public readonly ariaHidden: Signal<string | null> = computed<string | null>((): string | null =>
    this.clickable() || this.ariaLabel() ? null : 'true'
  );

  private isSemanticIcon(value: string | SemanticIcon): value is SemanticIcon {
    return SEMANTIC_ICONS.includes(value as SemanticIcon);
  }

  public onKeydown(event: KeyboardEvent): void {
    if (!this.clickable()) return;
    if (event.key === KEYBOARD_KEYS.Enter || event.key === KEYBOARD_KEYS.Space) {
      event.preventDefault();
      (event.currentTarget as HTMLElement).click();
    }
  }
}
