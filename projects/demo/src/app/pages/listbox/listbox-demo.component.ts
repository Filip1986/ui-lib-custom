import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { Card } from 'ui-lib-custom/card';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxChangeEvent, ListboxOption } from 'ui-lib-custom/listbox';

type ListboxDemoSnippetKey =
  | 'basic'
  | 'multiple'
  | 'filter'
  | 'filter-match-modes'
  | 'groups'
  | 'checkbox'
  | 'toggle-all'
  | 'disabled'
  | 'reactive';

/** Demo page for the Listbox component. */
@Component({
  selector: 'app-listbox-demo',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    ListboxComponent,
  ],
  templateUrl: './listbox-demo.component.html',
  styleUrl: './listbox-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'multiple', label: 'Multiple' },
    { id: 'filter', label: 'Filter' },
    { id: 'filter-match-modes', label: 'Filter Match Modes' },
    { id: 'groups', label: 'Option Groups' },
    { id: 'checkbox', label: 'Checkbox Mode' },
    { id: 'toggle-all', label: 'Toggle All' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'reactive', label: 'Reactive Forms' },
  ];

  // ── Options ────────────────────────────────────────────────────────────────

  public readonly cities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Dublin', value: 'dublin' },
    { label: 'Edinburgh', value: 'edinburgh' },
    { label: 'Frankfurt', value: 'frankfurt' },
    { label: 'Geneva', value: 'geneva' },
  ];

  public readonly groupedCities: Array<{ label: string; items: ListboxOption[] }> = [
    {
      label: 'Germany',
      items: [
        { label: 'Berlin', value: 'berlin' },
        { label: 'Frankfurt', value: 'frankfurt' },
        { label: 'Munich', value: 'munich' },
      ],
    },
    {
      label: 'United Kingdom',
      items: [
        { label: 'Edinburgh', value: 'edinburgh' },
        { label: 'London', value: 'london' },
        { label: 'Manchester', value: 'manchester' },
      ],
    },
    {
      label: 'Switzerland',
      items: [
        { label: 'Geneva', value: 'geneva' },
        { label: 'Zurich', value: 'zurich', disabled: true },
      ],
    },
  ];

  public readonly disabledCities: ListboxOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin', disabled: true },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Dublin', value: 'dublin', disabled: true },
    { label: 'Edinburgh', value: 'edinburgh' },
  ];

  // ── Model values ───────────────────────────────────────────────────────────

  public basicValue: unknown = null;
  public multipleValue: unknown[] = [];
  public filterValue: unknown = null;
  public filterMatchModeValue: unknown = null;
  public groupValue: unknown = null;
  public checkboxValue: unknown[] = [];
  public toggleAllValue: unknown[] = [];
  public disabledValue: unknown = 'amsterdam';
  public readonly lastEvent: { value: unknown } = { value: null };

  // ── Reactive form ──────────────────────────────────────────────────────────

  public readonly form: FormGroup = new FormGroup({
    city: new FormControl<unknown>(null),
    cities: new FormControl<unknown[]>([]),
  });

  public get cityControl(): FormControl<unknown> {
    return this.form.get('city') as FormControl<unknown>;
  }

  public get citiesControl(): FormControl<unknown[]> {
    return this.form.get('cities') as FormControl<unknown[]>;
  }

  // ── Event helpers ──────────────────────────────────────────────────────────

  public onSelectionChange(event: ListboxChangeEvent): void {
    this.lastEvent.value = event.value;
  }

  // ── Snippets ───────────────────────────────────────────────────────────────

  private readonly snippets: Record<ListboxDemoSnippetKey, string> = {
    basic: '<ui-lib-listbox [options]="cities" [(ngModel)]="selectedCity" />',

    multiple:
      '<ui-lib-listbox [options]="cities" [multiple]="true" [(ngModel)]="selectedCities" />',

    filter: '<ui-lib-listbox [options]="cities" [filter]="true" [(ngModel)]="selectedCity" />',

    'filter-match-modes':
      '<!-- starts with -->\n<ui-lib-listbox [options]="cities" [filter]="true" filterMatchMode="startsWith" [(ngModel)]="value" />\n\n<!-- ends with -->\n<ui-lib-listbox [options]="cities" [filter]="true" filterMatchMode="endsWith" [(ngModel)]="value" />',

    groups:
      '<ui-lib-listbox\n  [options]="groupedCities"\n  [group]="true"\n  optionGroupLabel="label"\n  optionGroupChildren="items"\n  [(ngModel)]="selectedCity"\n/>',

    checkbox:
      '<ui-lib-listbox\n  [options]="cities"\n  [multiple]="true"\n  [checkbox]="true"\n  [(ngModel)]="selectedCities"\n/>',

    'toggle-all':
      '<ui-lib-listbox\n  [options]="cities"\n  [multiple]="true"\n  [checkbox]="true"\n  [showToggleAll]="true"\n  [(ngModel)]="selectedCities"\n/>',

    disabled: '<ui-lib-listbox [options]="cities" [disabled]="true" [(ngModel)]="value" />',

    reactive:
      '<form [formGroup]="form">\n  <ui-lib-listbox [options]="cities" formControlName="city" />\n</form>',
  };

  public snippet(key: ListboxDemoSnippetKey): string {
    return this.snippets[key];
  }
}
