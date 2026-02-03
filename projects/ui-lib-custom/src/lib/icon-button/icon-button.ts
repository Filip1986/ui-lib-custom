import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { IconSize } from '../icon/icon.types';
import { SemanticIcon } from '../icon/icon.semantics';

@Component({
  selector: 'ui-lib-icon-button',
  standalone: true,
  imports: [Icon],
  template: `
    <ui-lib-icon
      [name]="icon()"
      [size]="iconSize()"
      [variant]="variant()"
      class="icon-button__icon"
    />
  `,
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon-button',
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.disabled]': 'disabled() || null',
    role: 'button',
    tabindex: '0',
  },
})
export class IconButton {
  icon = input.required<SemanticIcon | string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'material' | 'bootstrap' | 'minimal'>('material');
  color = input<'primary' | 'secondary' | 'danger' | 'success' | 'warning' | null>(null);
  disabled = input<boolean>(false);
  ariaLabel = input<string | null>(null);

  iconSize = computed<IconSize>(() => {
    const map = { sm: 'sm', md: 'md', lg: 'lg' } as const;
    return map[this.size()];
  });

  hostClasses = computed(() =>
    [
      `icon-button-${this.variant()}`,
      `icon-button-${this.size()}`,
      this.color() ? `icon-button-${this.color()}` : '',
      this.disabled() ? 'icon-button-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  );
}
