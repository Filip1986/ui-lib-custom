import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { IconService } from './icon.service';
import { ICON_LIBRARY_PREFIX, IconLibrary, IconSize, ComponentVariant } from './icon.types';
import { SEMANTIC_ICONS, SemanticIcon } from './icon.semantics';

const normalizeIconName = (value: string): string =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part): string => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const hasKnownPrefix = (value: string): boolean => {
  const prefixes = Object.values(ICON_LIBRARY_PREFIX)
    .filter(Boolean)
    .map((p): string => p.toLowerCase());
  return prefixes.some((p): boolean => value.toLowerCase().startsWith(p));
};

@Component({
  selector: 'ui-lib-icon',
  standalone: true,
  imports: [NgIcon],
  template: `<ng-icon
    [name]="resolvedName()"
    [size]="resolvedSize()"
    [color]="color() ?? undefined"
  />`,
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
  private readonly iconService = inject(IconService);

  public readonly name = input.required<string | SemanticIcon>();
  public readonly size = input<IconSize>('md');
  public readonly color = input<string | null>(null);
  public readonly clickable = input<boolean>(false);
  public readonly ariaLabel = input<string | null>(null);
  public readonly library = input<IconLibrary | null>(null);
  public readonly variant = input<ComponentVariant | null>(null);
  public readonly semantic = input<boolean>(false);

  private readonly resolvedLibrary = computed<IconLibrary>(
    (): IconLibrary => this.iconService.resolveLibrary(this.library(), this.variant())
  );

  public readonly resolvedName = computed<string>((): string => {
    const library = this.resolvedLibrary();
    const raw = this.name();
    const base =
      this.semantic() || this.isSemanticIcon(raw)
        ? this.iconService.resolveIcon(raw as SemanticIcon, library)
        : raw;
    const prefix = ICON_LIBRARY_PREFIX[library];
    // If the base already carries any known library prefix, return it as-is
    if (!prefix || hasKnownPrefix(base)) {
      return base;
    }
    const baseName = normalizeIconName(base);
    return `${prefix}${baseName}`;
  });

  public readonly resolvedSize = computed<string>((): string =>
    this.iconService.getIconSize(this.size())
  );
  public readonly ariaLabelResolved = computed<string | null>((): string | null =>
    this.clickable() ? (this.ariaLabel() ?? 'Icon') : this.ariaLabel()
  );
  public readonly ariaHidden = computed<string | null>((): string | null =>
    this.clickable() || this.ariaLabel() ? null : 'true'
  );

  private isSemanticIcon(value: string | SemanticIcon): value is SemanticIcon {
    return SEMANTIC_ICONS.includes(value as SemanticIcon);
  }

  public onKeydown(event: KeyboardEvent): void {
    if (!this.clickable()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      (event.currentTarget as HTMLElement).click();
    }
  }
}
