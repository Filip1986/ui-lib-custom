import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
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
  public readonly icon = input.required<SemanticIcon | string>();
  public readonly size = input<'sm' | 'md' | 'lg'>('md');
  public readonly variant = input<'material' | 'bootstrap' | 'minimal'>('material');
  public readonly color = input<'primary' | 'secondary' | 'danger' | 'success' | 'warning' | null>(
    null
  );
  public readonly disabled = input<boolean>(false);
  public readonly ariaLabel = input<string | null>(null);

  public readonly iconSize = computed<IconSize>((): IconSize => {
    const map: Record<'sm' | 'md' | 'lg', IconSize> = { sm: 'sm', md: 'md', lg: 'lg' };
    return map[this.size()];
  });

  public readonly hostClasses = computed<string>((): string =>
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
