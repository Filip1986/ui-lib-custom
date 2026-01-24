import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibSelect, SelectOption, SelectVariant } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, UiLibSelect, Button],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  variant = signal<SelectVariant>('material');
  searchable = signal(true);
  multiple = signal(false);
  disabled = signal(false);
  loading = signal(false);
  placeholder = signal('Choose an option');

  value = signal<unknown | unknown[] | null>(null);

  variants: SelectVariant[] = ['material', 'bootstrap', 'minimal'];

  options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha', group: 'Group A' },
    { label: 'Beta', value: 'beta', group: 'Group A' },
    { label: 'Gamma', value: 'gamma', group: 'Group A' },
    { label: 'Delta', value: 'delta', group: 'Group B' },
    { label: 'Epsilon', value: 'epsilon', group: 'Group B' },
    { label: 'Zeta', value: 'zeta', group: 'Group B', disabled: true },
    { label: 'Unassigned', value: 'ungrouped' },
  ];

  setVariant(v: SelectVariant) {
    this.variant.set(v);
  }

  toggleMultiple(ev: boolean) {
    this.multiple.set(ev);
    this.value.set(ev ? [] : null);
  }

  toggleSearchable(ev: boolean) {
    this.searchable.set(ev);
  }

  toggleDisabled(ev: boolean) {
    this.disabled.set(ev);
  }

  toggleLoading(ev: boolean) {
    this.loading.set(ev);
  }

  onClear() {
    this.value.set(this.multiple() ? [] : null);
  }
}
