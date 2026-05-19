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
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Stack } from 'ui-lib-custom/layout';
import { Panel } from 'ui-lib-custom/panel';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
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

const SNIPPETS: Record<string, string> = {
  basic: `<ui-lib-pick-list
  [(source)]="source"
  [(target)]="target"
  trackBy="name"
  sourceHeader="Available"
  targetHeader="Selected"
/>`,

  filter: `<ui-lib-pick-list
  [(source)]="source"
  [(target)]="target"
  trackBy="name"
  filterBy="name"
  sourceFilterPlaceholder="Search available…"
  targetFilterPlaceholder="Search selected…"
/>`,

  templates: `<ui-lib-pick-list [(source)]="source" [(target)]="target" trackBy="code">
  <ng-template uiPickListSourceHeader>
    <span>Available countries</span>
  </ng-template>
  <ng-template uiPickListTargetHeader>
    <span>Selected countries</span>
  </ng-template>
  <ng-template uiPickListItem let-country>
    <div class="demo-pl-row">
      <span class="demo-pl-code">{{ country.code }}</span>
      <span class="demo-pl-name">{{ country.name }}</span>
      <span class="demo-pl-region">{{ country.region }}</span>
    </div>
  </ng-template>
  <ng-template uiPickListEmpty>
    <span>No items here.</span>
  </ng-template>
</ui-lib-pick-list>`,

  dragDrop: `<ui-lib-pick-list
  [(source)]="source"
  [(target)]="target"
  trackBy="code"
  [dragDrop]="true"
  (movedToTarget)="onMoveToTarget($event)"
  (movedToSource)="onMoveToSource($event)"
/>`,
};

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
    CodeSnippet,
    Stack,
    PickListComponent,
    PickListItemDirective,
    PickListSourceHeaderDirective,
    PickListTargetHeaderDirective,
    PickListEmptyDirective,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './pick-list-demo.component.html',
  styleUrl: './pick-list-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickListDemoComponent {
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

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'source',
      type: 'unknown[]',
      default: '[]',
      description: 'Source list items (two-way via [(source)]).',
    },
    {
      name: 'target',
      type: 'unknown[]',
      default: '[]',
      description: 'Target list items (two-way via [(target)]).',
    },
    {
      name: 'sourceHeader',
      type: 'string',
      default: "'Source'",
      description: 'Header text for the source list.',
    },
    {
      name: 'targetHeader',
      type: 'string',
      default: "'Target'",
      description: 'Header text for the target list.',
    },
    {
      name: 'filter',
      type: 'boolean',
      default: 'false',
      description: 'Shows filter inputs above both lists.',
    },
    { name: 'filterBy', type: 'string', default: "'label'", description: 'Property to filter on.' },
    {
      name: 'sourceFilterPlaceholder',
      type: 'string',
      default: "'Search'",
      description: 'Source filter placeholder.',
    },
    {
      name: 'targetFilterPlaceholder',
      type: 'string',
      default: "'Search'",
      description: 'Target filter placeholder.',
    },
    {
      name: 'dataKey',
      type: 'string | null',
      default: 'null',
      description: 'Property for unique item identity.',
    },
    {
      name: 'metaKeySelection',
      type: 'boolean',
      default: 'false',
      description: 'Requires Meta/Ctrl for multi-selection.',
    },
    {
      name: 'dragdrop',
      type: 'boolean',
      default: 'false',
      description: 'Enables drag-and-drop between lists.',
    },
    {
      name: 'breakpoint',
      type: 'string',
      default: "'960px'",
      description: 'Breakpoint at which the layout switches to vertical stacking.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Pick list'",
      description: 'Accessible label for the pick list.',
    },
  ];

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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
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

  public snippet(key: string): string {
    return SNIPPETS[key] ?? '';
  }

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
}
