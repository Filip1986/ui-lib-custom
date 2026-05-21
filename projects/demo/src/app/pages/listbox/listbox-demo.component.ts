import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { ListboxComponent } from 'ui-lib-custom/listbox';
import type { ListboxChangeEvent, ListboxOption } from 'ui-lib-custom/listbox';

import { Panel } from 'ui-lib-custom/panel';
import {
  basicHtml,
  basicTs,
  multipleHtml,
  multipleTs,
  filterHtml,
  filterTs,
  filterMatchModesHtml,
  filterMatchModesTs,
  groupsHtml,
  groupsTs,
  checkboxHtml,
  checkboxTs,
  toggleAllHtml,
  toggleAllTs,
  disabledHtml,
  disabledTs,
  reactiveHtml,
  reactiveTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
/** Demo page for the Listbox component. */
@Component({
  selector: 'app-listbox-demo',
  standalone: true,
  imports: [
    Panel,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocDemoViewportComponent,
    ListboxComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocSectionComponent,
  ],
  templateUrl: './listbox-demo.component.html',
  styleUrl: './listbox-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly multipleHtml: string = multipleHtml;
  public readonly multipleTs: string = multipleTs;
  public readonly filterHtml: string = filterHtml;
  public readonly filterTs: string = filterTs;
  public readonly filterMatchModesHtml: string = filterMatchModesHtml;
  public readonly filterMatchModesTs: string = filterMatchModesTs;
  public readonly groupsHtml: string = groupsHtml;
  public readonly groupsTs: string = groupsTs;
  public readonly checkboxHtml: string = checkboxHtml;
  public readonly checkboxTs: string = checkboxTs;
  public readonly toggleAllHtml: string = toggleAllHtml;
  public readonly toggleAllTs: string = toggleAllTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    apgPattern: { name: 'Listbox', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/' },
    competitiveParity: 'pending',
  };

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string = "import { ListboxComponent } from 'ui-lib-custom/listbox'";

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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
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

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '↓ / ↑', action: 'Move focus to the next or previous option.' },
    { key: 'Home / End', action: 'Move focus to the first or last option.' },
    {
      key: 'Enter / Space',
      action: 'Select the focused option (deselects in multiple mode if already selected).',
    },
    { key: 'Shift+↓ / Shift+↑', action: 'Extend the selection range (multiple mode).' },
    { key: 'Ctrl+A', action: 'Select all options (multiple mode).' },
  ];
}
