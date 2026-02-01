import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { IconService } from './icon.service';
import { ICON_LIBRARY_PREFIX, IconLibrary, IconSize, ComponentVariant } from './icon.types';
import { SEMANTIC_ICONS, SemanticIcon } from './icon.semantics';

const normalizeIconName = (value: string): string =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const hasKnownPrefix = (value: string): boolean => {
  const prefixes = Object.values(ICON_LIBRARY_PREFIX).filter(Boolean).map((p) => p.toLowerCase());
  return prefixes.some((p) => value.toLowerCase().startsWith(p));
};

@Component({
  selector: 'ui-lib-icon',
  standalone: true,
  imports: [NgIcon],
  template: `<ng-icon [name]="resolvedName()" [size]="resolvedSize()" [color]="color()" />`,
  styleUrl: './icon.scss',
  host: {
    class: 'ui-lib-icon',
    '[class.ui-lib-icon--clickable]': 'clickable()',
    '[style.--icon-color]': 'color()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  private readonly iconService = inject(IconService);

  name = input.required<string | SemanticIcon>();
  size = input<IconSize>('md');
  color = input<string>();
  clickable = input<boolean>(false);
  library = input<IconLibrary>();
  variant = input<ComponentVariant | null>(null);
  semantic = input<boolean>(false);

  private readonly resolvedLibrary = computed<IconLibrary>(() =>
    this.iconService.resolveLibrary(this.library(), this.variant()),
  );

  resolvedName = computed(() => {
    const library = this.resolvedLibrary();
    const raw = this.name();
    const base = this.semantic() || this.isSemanticIcon(raw)
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

  resolvedSize = computed(() => this.iconService.getIconSize(this.size()));

  private isSemanticIcon(value: string | SemanticIcon): value is SemanticIcon {
    return SEMANTIC_ICONS.includes(value as SemanticIcon);
  }
}
