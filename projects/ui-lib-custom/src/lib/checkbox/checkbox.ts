import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model, inject } from '@angular/core';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

export type CheckboxVariant = 'material' | 'bootstrap' | 'minimal';
export type CheckboxSize = 'sm' | 'md' | 'lg';

let checkboxId = 0;

@Component({
  selector: 'ui-lib-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': "'checkbox'",
    '[attr.tabindex]': 'hostTabIndex()',
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-disabled]': 'disabled() ? true : null',
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'hostClasses()',
    '(click)': 'onToggle($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class Checkbox {
  label = input<string | null>(null);
  description = input<string | null>(null);
  ariaLabel = input<string | null>(null);
  variant = input<CheckboxVariant>('material');
  size = input<CheckboxSize>('md');
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);

  readonly checked = model<boolean>(false);

  private readonly controlId = `ui-lib-checkbox-${++checkboxId}`;
  readonly labelElementId = `${this.controlId}-label`;
  readonly descriptionElementId = `${this.controlId}-description`;

  private readonly liveAnnouncer = inject(LiveAnnouncerService);

  readonly hostClasses = computed(() => {
    const classes = [
      'ui-checkbox',
      `ui-checkbox-variant-${this.variant()}`,
      `ui-checkbox-size-${this.size()}`,
    ];

    if (this.checked()) {
      classes.push('ui-checkbox-checked');
    }

    if (this.indeterminate()) {
      classes.push('ui-checkbox-indeterminate');
    }

    if (this.disabled()) {
      classes.push('ui-checkbox-disabled');
    }

    return classes.join(' ');
  });

  readonly ariaChecked = computed(() =>
    this.indeterminate() ? 'mixed' : this.checked() ? 'true' : 'false'
  );
  readonly hostTabIndex = computed(() => (this.disabled() ? -1 : 0));
  readonly ariaLabelledby = computed(() => (this.ariaLabel() ? null : this.labelElementId));
  readonly ariaDescribedby = computed(() =>
    this.description() ? this.descriptionElementId : null
  );
  readonly showDescription = computed(() => !!this.description());

  onToggle(event: Event): void {
    event.preventDefault();
    if (this.disabled()) {
      return;
    }
    const nextValue: boolean = !this.checked();
    this.checked.set(nextValue);

    const label: string = this.label() ?? this.ariaLabel() ?? 'Checkbox';
    const state: string = nextValue ? 'checked' : 'unchecked';
    this.liveAnnouncer.announce(`${label} ${state}`, 'polite');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onToggle(event);
    }
  }
}
