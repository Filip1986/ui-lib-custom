import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  type WritableSignal,
} from '@angular/core';
import type { Signal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { Stack } from 'ui-lib-custom/layout';
import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import {
  PickListComponent,
  PickListItemDirective,
  PickListSourceHeaderDirective,
  PickListTargetHeaderDirective,
  PickListEmptyDirective,
  PICK_LIST_DEFAULTS,
} from 'ui-lib-custom/pick-list';
import type {
  PickListMoveToTargetEvent,
  PickListMoveToSourceEvent,
  PickListReorderEvent,
} from 'ui-lib-custom/pick-list';
import {
  basicHtml,
  basicTs,
  filterHtml,
  filterTs,
  templatesHtml,
  templatesTs,
  dragDropHtml,
  dragDropTs,
} from './snippets.generated';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';

// ---------------------------------------------------------------------------
// Demo data model
// ---------------------------------------------------------------------------

interface DemoCountry {
  code: string;
  name: string;
  region: string;
  population: number;
}

const ALL_COUNTRIES: DemoCountry[] = [
  { code: 'DE', name: 'Germany', region: 'Europe', population: 83 },
  { code: 'FR', name: 'France', region: 'Europe', population: 68 },
  { code: 'IT', name: 'Italy', region: 'Europe', population: 60 },
  { code: 'ES', name: 'Spain', region: 'Europe', population: 47 },
  { code: 'PL', name: 'Poland', region: 'Europe', population: 38 },
  { code: 'NL', name: 'Netherlands', region: 'Europe', population: 17 },
  { code: 'SE', name: 'Sweden', region: 'Europe', population: 10 },
  { code: 'NO', name: 'Norway', region: 'Europe', population: 5 },
];

const SELECTED_COUNTRIES: DemoCountry[] = [
  { code: 'US', name: 'United States', region: 'Americas', population: 331 },
  { code: 'BR', name: 'Brazil', region: 'Americas', population: 214 },
  { code: 'CA', name: 'Canada', region: 'Americas', population: 38 },
];

// ---------------------------------------------------------------------------
// Code snippets
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Demo page for the PickList component.
 * Sections: Basic, Filter, Custom Templates, Drag & Drop, Accessibility, API Reference.
 */
@Component({
  selector: 'app-pick-list-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocCodeExampleComponent,
    Stack,
    PickListComponent,
    PickListItemDirective,
    PickListSourceHeaderDirective,
    PickListTargetHeaderDirective,
    PickListEmptyDirective,
    DocTocComponent,
    DocQualityBadgeComponent,

    DocSectionComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './pick-list-demo.component.html',
  styleUrl: './pick-list-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickListDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly filterHtml: string = filterHtml;
  public readonly filterTs: string = filterTs;
  public readonly templatesHtml: string = templatesHtml;
  public readonly templatesTs: string = templatesTs;
  public readonly dragDropHtml: string = dragDropHtml;
  public readonly dragDropTs: string = dragDropTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string =
    "import { PickListComponent } from 'ui-lib-custom/pick-list'";

  // -------------------------------------------------------------------------
  // Sections
  // -------------------------------------------------------------------------

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'filter', label: 'Filter' },
    { id: 'templates', label: 'Custom Templates' },
    { id: 'drag-drop', label: 'Drag & Drop' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  // -------------------------------------------------------------------------
  // Keyboard navigation rows
  // -------------------------------------------------------------------------

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '↓ / ↑', action: 'Navigate items in the focused list.' },
    { key: 'Space / Enter', action: 'Toggle selection of focused item.' },
    { key: 'Ctrl+A', action: 'Select all visible items in the focused list.' },
    { key: 'Escape', action: 'Clear selection in the focused list.' },
    { key: 'Ctrl+→', action: 'Transfer selected source items to target.' },
    { key: 'Ctrl+←', action: 'Return selected target items to source.' },
    { key: 'Ctrl+↑', action: 'Move selected items up within their list.' },
    { key: 'Ctrl+↓', action: 'Move selected items down within their list.' },
    { key: 'Ctrl+Home', action: 'Move selected items to top of list.' },
    { key: 'Ctrl+End', action: 'Move selected items to bottom of list.' },
  ];

  // -------------------------------------------------------------------------
  // Basic section
  // -------------------------------------------------------------------------

  public readonly basicSource: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...ALL_COUNTRIES,
  ]);
  public readonly basicTarget: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...SELECTED_COUNTRIES,
  ]);

  // -------------------------------------------------------------------------
  // Filter section
  // -------------------------------------------------------------------------

  public readonly filterSource: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...ALL_COUNTRIES,
  ]);
  public readonly filterTarget: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...SELECTED_COUNTRIES,
  ]);

  // -------------------------------------------------------------------------
  // Custom templates section
  // -------------------------------------------------------------------------

  public readonly templateSource: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...ALL_COUNTRIES,
  ]);
  public readonly templateTarget: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...SELECTED_COUNTRIES,
  ]);

  // -------------------------------------------------------------------------
  // Drag & drop section
  // -------------------------------------------------------------------------

  public readonly dragSource: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...ALL_COUNTRIES.slice(0, 5),
  ]);
  public readonly dragTarget: WritableSignal<DemoCountry[]> = signal<DemoCountry[]>([
    ...SELECTED_COUNTRIES.slice(0, 2),
  ]);
  public readonly lastEventLog: WritableSignal<string> = signal<string>('—');

  public onMoveToTarget(event: PickListMoveToTargetEvent): void {
    const items: DemoCountry[] = event.items as DemoCountry[];
    this.lastEventLog.set(
      `Moved to target: ${items.map((c: DemoCountry): string => c.name).join(', ')}`
    );
  }

  public onMoveToSource(event: PickListMoveToSourceEvent): void {
    const items: DemoCountry[] = event.items as DemoCountry[];
    this.lastEventLog.set(
      `Returned to source: ${items.map((c: DemoCountry): string => c.name).join(', ')}`
    );
  }

  public onReorder(event: PickListReorderEvent): void {
    this.lastEventLog.set(
      `Reordered in ${event.list}: item ${event.previousIndex + 1} → ${event.currentIndex + 1}`
    );
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  public readonly defaults: typeof PICK_LIST_DEFAULTS = PICK_LIST_DEFAULTS;

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'source',
      type: 'unknown[]',
      default: '[]',
      description: 'Source list items — two-way via [(source)].',
    },
    {
      name: 'target',
      type: 'unknown[]',
      default: '[]',
      description: 'Target list items — two-way via [(target)].',
    },
    {
      name: 'sourceSelection',
      type: 'unknown[]',
      default: '[]',
      description: 'Selected source items — two-way.',
    },
    {
      name: 'targetSelection',
      type: 'unknown[]',
      default: '[]',
      description: 'Selected target items — two-way.',
    },
    {
      name: 'sourceHeader',
      type: 'string | null',
      default: 'null',
      description: 'Static source list header text.',
    },
    {
      name: 'targetHeader',
      type: 'string | null',
      default: 'null',
      description: 'Static target list header text.',
    },
    {
      name: 'filterBy',
      type: 'string | null',
      default: 'null',
      description: 'Dot-notation property for filtering. Shows filter inputs when set.',
    },
    {
      name: 'sourceFilterPlaceholder',
      type: 'string',
      default: "'Filter'",
      description: 'Placeholder for the source filter input.',
    },
    {
      name: 'targetFilterPlaceholder',
      type: 'string',
      default: "'Filter'",
      description: 'Placeholder for the target filter input.',
    },
    {
      name: 'filterMatchMode',
      type: "'contains' | 'startsWith' | 'endsWith' | 'equals'",
      default: "'contains'",
      description: 'Matching strategy.',
    },
    {
      name: 'showSourceControls',
      type: 'boolean',
      default: 'true',
      description: 'Show reorder controls next to source list.',
    },
    {
      name: 'showTargetControls',
      type: 'boolean',
      default: 'true',
      description: 'Show reorder controls next to target list.',
    },
    {
      name: 'dragDrop',
      type: 'boolean',
      default: 'false',
      description: 'Enables drag-and-drop reorder and transfer.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all interaction.',
    },
    {
      name: 'metaKeySelection',
      type: 'boolean',
      default: 'false',
      description: 'Requires Ctrl/Meta held for multi-select.',
    },
    {
      name: 'stripedRows',
      type: 'boolean',
      default: 'false',
      description: 'Alternating row background.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Theme variant override.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size scale.' },
    {
      name: 'trackBy',
      type: 'string | null',
      default: 'null',
      description: 'Property path for item identity.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'movedToTarget',
      type: 'PickListMoveToTargetEvent',
      description: 'After selected source items transferred to target.',
    },
    {
      name: 'movedAllToTarget',
      type: 'PickListMoveAllToTargetEvent',
      description: 'After all source items transferred.',
    },
    {
      name: 'movedToSource',
      type: 'PickListMoveToSourceEvent',
      description: 'After selected target items returned to source.',
    },
    {
      name: 'movedAllToSource',
      type: 'PickListMoveAllToSourceEvent',
      description: 'After all target items returned.',
    },
    {
      name: 'sourceSelectionChanged',
      type: 'PickListSelectionChangeEvent',
      description: 'When source selection changes.',
    },
    {
      name: 'targetSelectionChanged',
      type: 'PickListSelectionChangeEvent',
      description: 'When target selection changes.',
    },
    {
      name: 'reordered',
      type: 'PickListReorderEvent',
      description: 'After a reorder within either list.',
    },
  ];

  public readonly apiSlotRows: readonly ApiPropRow[] = [
    {
      name: 'uiPickListItem',
      type: '$implicit: T',
      description: 'Custom item row for both lists.',
    },
    { name: 'uiPickListSourceHeader', type: '—', description: 'Custom source list header.' },
    { name: 'uiPickListTargetHeader', type: '—', description: 'Custom target list header.' },
    { name: 'uiPickListEmpty', type: '—', description: 'Empty state for either list.' },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-pick-list-gap', description: 'Gap.' },
    { variable: '--uilib-pick-list-min-height', description: 'Minimum height.' },
    { variable: '--uilib-pick-list-max-height', description: 'Maximum height.' },
    { variable: '--uilib-pick-list-bg', description: 'Background colour.' },
    { variable: '--uilib-pick-list-border', description: 'Border shorthand.' },
    { variable: '--uilib-pick-list-radius', description: 'Border radius.' },
    { variable: '--uilib-pick-list-item-padding', description: 'Item padding.' },
    { variable: '--uilib-pick-list-item-bg', description: 'Item background colour.' },
    { variable: '--uilib-pick-list-item-bg-hover', description: 'Item background colour (hover).' },
    {
      variable: '--uilib-pick-list-item-bg-selected',
      description: 'Item background colour (selected).',
    },
    { variable: '--uilib-pick-list-item-color', description: 'Item text colour.' },
    {
      variable: '--uilib-pick-list-item-color-selected',
      description: 'Item text colour (selected).',
    },
    { variable: '--uilib-pick-list-item-border-bottom', description: 'Item Border Bottom.' },
    { variable: '--uilib-pick-list-item-drag-opacity', description: 'Item Drag opacity.' },
    {
      variable: '--uilib-pick-list-drop-indicator-color',
      description: 'Drop Indicator text colour.',
    },
    { variable: '--uilib-pick-list-drop-indicator-height', description: 'Drop Indicator height.' },
    { variable: '--uilib-pick-list-item-bg-striped', description: 'Item Bg Striped.' },
    { variable: '--uilib-pick-list-filter-padding', description: 'Filter padding.' },
    { variable: '--uilib-pick-list-filter-border', description: 'Filter border shorthand.' },
    { variable: '--uilib-pick-list-filter-bg', description: 'Filter background colour.' },
    { variable: '--uilib-pick-list-filter-radius', description: 'Filter border radius.' },
    { variable: '--uilib-pick-list-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-pick-list-header-padding', description: 'Header padding.' },
    { variable: '--uilib-pick-list-header-font-weight', description: 'Header font weight.' },
    { variable: '--uilib-pick-list-header-border', description: 'Header border shorthand.' },
    { variable: '--uilib-pick-list-control-size', description: 'Control size.' },
    { variable: '--uilib-pick-list-control-bg', description: 'Control background colour.' },
    { variable: '--uilib-pick-list-control-color', description: 'Control text colour.' },
    {
      variable: '--uilib-pick-list-control-bg-hover',
      description: 'Control background colour (hover).',
    },
    { variable: '--uilib-pick-list-control-radius', description: 'Control border radius.' },
    { variable: '--uilib-pick-list-control-gap', description: 'Control gap.' },
    { variable: '--uilib-pick-list-control-border', description: 'Control border shorthand.' },
    { variable: '--uilib-pick-list-transfer-size', description: 'Transfer size.' },
    { variable: '--uilib-pick-list-transfer-bg', description: 'Transfer background colour.' },
    { variable: '--uilib-pick-list-transfer-color', description: 'Transfer text colour.' },
    {
      variable: '--uilib-pick-list-transfer-bg-hover',
      description: 'Transfer background colour (hover).',
    },
    { variable: '--uilib-pick-list-transfer-radius', description: 'Transfer border radius.' },
    { variable: '--uilib-pick-list-transfer-gap', description: 'Transfer gap.' },
    { variable: '--uilib-pick-list-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-pick-list-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-pick-list-transition', description: 'Transition.' },
    { variable: '--uilib-pick-list-font-size', description: 'Font size.' },
  ];
}
