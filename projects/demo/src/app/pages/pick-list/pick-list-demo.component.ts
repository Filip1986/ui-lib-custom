import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
import { Stack } from 'ui-lib-custom/layout';
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
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
    Stack,
    PickListComponent,
    PickListItemDirective,
    PickListSourceHeaderDirective,
    PickListTargetHeaderDirective,
    PickListEmptyDirective,
  ],
  templateUrl: './pick-list-demo.component.html',
  styleUrl: './pick-list-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickListDemoComponent {
  // -------------------------------------------------------------------------
  // Sections
  // -------------------------------------------------------------------------

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'filter', label: 'Filter' },
    { id: 'templates', label: 'Custom Templates' },
    { id: 'drag-drop', label: 'Drag & Drop' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'api', label: 'API Reference' },
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
}
