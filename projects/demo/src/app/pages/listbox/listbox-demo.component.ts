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

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
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

    DocCssVarsTableComponent,
    DocApiReferenceComponent,
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
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
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
  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'options', type: 'unknown[]', default: '[]', description: 'Array of option objects.' },
    {
      name: 'optionLabel',
      type: 'string',
      default: "'label'",
      description: 'Field name for display label.',
    },
    {
      name: 'optionValue',
      type: 'string',
      default: "'value'",
      description: 'Field name for emitted value.',
    },
    {
      name: 'optionDisabled',
      type: 'string',
      default: "'disabled'",
      description: 'Field name marking an option as disabled.',
    },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Enables multi-select.' },
    { name: 'filter', type: 'boolean', default: 'false', description: 'Shows a filter input.' },
    {
      name: 'filterMatchMode',
      type: "'contains' | 'startsWith' | 'endsWith' | 'equals'",
      default: "'contains'",
      description: 'Filter match strategy.',
    },
    {
      name: 'filterPlaceholder',
      type: 'string',
      default: "'Search...'",
      description: 'Filter input placeholder.',
    },
    {
      name: 'group',
      type: 'boolean',
      default: 'false',
      description: 'Treats options as grouped data.',
    },
    {
      name: 'checkbox',
      type: 'boolean',
      default: 'false',
      description: 'Shows a checkbox marker per row in multi mode.',
    },
    {
      name: 'showToggleAll',
      type: 'boolean',
      default: 'false',
      description: 'Shows a select-all checkbox header in multi mode.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Visual style variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Density preset.' },
    {
      name: 'scrollHeight',
      type: 'string',
      default: "'200px'",
      description: 'Max height of the scroll container.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all interaction.',
    },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevents value changes.' },
    { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row styling.' },
    {
      name: 'emptyMessage',
      type: 'string',
      default: "'No items found.'",
      description: 'Empty-state message.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'selectionChange',
      type: 'ListboxChangeEvent',
      description: 'Emits on select / deselect.',
    },
    {
      name: 'filterChange',
      type: 'ListboxFilterEvent',
      description: 'Emits on filter input change.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-listbox-width', description: 'Width.' },
    { variable: '--uilib-listbox-bg', description: 'Background colour.' },
    { variable: '--uilib-listbox-border', description: 'Border shorthand.' },
    { variable: '--uilib-listbox-border-radius', description: 'Border radius.' },
    { variable: '--uilib-listbox-shadow', description: 'Box shadow.' },
    { variable: '--uilib-listbox-filter-padding', description: 'Filter padding.' },
    { variable: '--uilib-listbox-filter-border-bottom', description: 'Filter Border Bottom.' },
    { variable: '--uilib-listbox-filter-bg', description: 'Filter background colour.' },
    { variable: '--uilib-listbox-filter-icon-color', description: 'Filter Icon text colour.' },
    { variable: '--uilib-listbox-filter-input-color', description: 'Filter Input text colour.' },
    {
      variable: '--uilib-listbox-filter-input-placeholder-color',
      description: 'Filter Input Placeholder text colour.',
    },
    { variable: '--uilib-listbox-filter-focus-ring', description: 'Filter focus ring.' },
    { variable: '--uilib-listbox-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-listbox-header-padding', description: 'Header padding.' },
    { variable: '--uilib-listbox-header-border-bottom', description: 'Header Border Bottom.' },
    { variable: '--uilib-listbox-list-padding', description: 'List padding.' },
    { variable: '--uilib-listbox-item-padding-sm', description: 'Item padding — sm.' },
    { variable: '--uilib-listbox-item-padding-md', description: 'Item padding — md.' },
    { variable: '--uilib-listbox-item-padding-lg', description: 'Item padding — lg.' },
    { variable: '--uilib-listbox-item-padding', description: 'Item padding.' },
    { variable: '--uilib-listbox-item-color', description: 'Item text colour.' },
    { variable: '--uilib-listbox-item-bg', description: 'Item background colour.' },
    { variable: '--uilib-listbox-item-bg-hover', description: 'Item background colour (hover).' },
    {
      variable: '--uilib-listbox-item-bg-selected',
      description: 'Item background colour (selected).',
    },
    {
      variable: '--uilib-listbox-item-color-selected',
      description: 'Item text colour (selected).',
    },
    { variable: '--uilib-listbox-item-bg-focused', description: 'Item Bg Focused.' },
    { variable: '--uilib-listbox-item-font-size-sm', description: 'Item font size — sm.' },
    { variable: '--uilib-listbox-item-font-size-md', description: 'Item font size — md.' },
    { variable: '--uilib-listbox-item-font-size-lg', description: 'Item font size — lg.' },
    { variable: '--uilib-listbox-item-font-size', description: 'Item font size.' },
    { variable: '--uilib-listbox-item-border-radius', description: 'Item Border border radius.' },
    { variable: '--uilib-listbox-item-gap', description: 'Item gap.' },
    { variable: '--uilib-listbox-item-bg-striped', description: 'Item Bg Striped.' },
    {
      variable: '--uilib-listbox-item-color-disabled',
      description: 'Item text colour (disabled).',
    },
    { variable: '--uilib-listbox-item-cursor-disabled', description: 'Item cursor (disabled).' },
    { variable: '--uilib-listbox-group-padding', description: 'Group padding.' },
    { variable: '--uilib-listbox-group-font-size', description: 'Group Font size.' },
    { variable: '--uilib-listbox-group-font-weight', description: 'Group font weight.' },
    { variable: '--uilib-listbox-group-color', description: 'Group text colour.' },
    { variable: '--uilib-listbox-group-text-transform', description: 'Group text transform.' },
    { variable: '--uilib-listbox-group-letter-spacing', description: 'Group letter spacing.' },
    { variable: '--uilib-listbox-checkbox-size', description: 'Checkbox size.' },
    { variable: '--uilib-listbox-checkbox-border', description: 'Checkbox border shorthand.' },
    {
      variable: '--uilib-listbox-checkbox-border-radius',
      description: 'Checkbox Border border radius.',
    },
    {
      variable: '--uilib-listbox-checkbox-bg-checked',
      description: 'Checkbox background colour (checked).',
    },
    {
      variable: '--uilib-listbox-checkbox-border-checked',
      description: 'Checkbox border shorthand (checked).',
    },
    {
      variable: '--uilib-listbox-checkbox-color-checked',
      description: 'Checkbox text colour (checked).',
    },
    { variable: '--uilib-listbox-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-listbox-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-listbox-empty-padding', description: 'Empty padding.' },
    { variable: '--uilib-listbox-empty-color', description: 'Empty text colour.' },
    { variable: '--uilib-listbox-empty-font-size', description: 'Empty Font size.' },
    { variable: '--uilib-listbox-transition', description: 'Transition.' },
  ];
}
