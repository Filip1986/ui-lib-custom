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
  type ComponentVariant,
  type IconLibrary,
  type IconSize,
} from './icon.types';
import { SEMANTIC_ICONS, type SemanticIcon } from './icon.semantics';

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

const ICON_NAME_ALIASES: Record<string, SemanticIcon> = {
  add: 'add',
  plus: 'add',
  remove: 'remove',
  minus: 'remove',
  edit: 'edit',
  pencil: 'edit',
  delete: 'delete',
  trash: 'delete',
  close: 'close',
  times: 'close',
  x: 'x',
  share: 'share',
  'share-nodes': 'share',
  more: 'more',
  'more-horizontal': 'more',
  'ellipsis-h': 'more',
} as const;

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
    '[style.--uilib-icon-color]': 'color()',
    '[attr.role]': 'ariaRole()',
    '[attr.tabindex]': '-1',
    '[attr.aria-label]': 'ariaLabelResolved()',
    '[attr.aria-hidden]': 'ariaHidden()',
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
    const raw: string | SemanticIcon = this.resolveAliasedName(this.name());
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
    (): string | null => {
      const ariaLabel: string | null = this.ariaLabel();
      if (!ariaLabel) {
        return null;
      }

      const trimmedAriaLabel: string = ariaLabel.trim();
      return trimmedAriaLabel.length > 0 ? trimmedAriaLabel : null;
    }
  );
  public readonly ariaRole: Signal<string | null> = computed<string | null>((): string | null =>
    this.ariaLabelResolved() ? 'img' : null
  );
  public readonly ariaHidden: Signal<string | null> = computed<string | null>((): string | null =>
    this.ariaLabelResolved() ? null : 'true'
  );

  private isSemanticIcon(value: string | SemanticIcon): value is SemanticIcon {
    return SEMANTIC_ICONS.includes(value as SemanticIcon);
  }

  private resolveAliasedName(value: string | SemanticIcon): string | SemanticIcon {
    const normalized: string = value.toLowerCase();
    return ICON_NAME_ALIASES[normalized] ?? value;
  }
}
