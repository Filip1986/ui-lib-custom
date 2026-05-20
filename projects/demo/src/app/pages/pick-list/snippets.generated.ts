/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-pick-list
  [(source)]="source"
  [(target)]="target"
  trackBy="name"
  sourceHeader="Available"
  targetHeader="Selected"
/>`;

export const basicTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { PickListComponent } from 'ui-lib-custom/pick-list';

interface Country { code: string; name: string; }

@Component({
  standalone: true,
  imports: [PickListComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly source: WritableSignal<Country[]> = signal([
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ]);
  public readonly target: WritableSignal<Country[]> = signal([
    { code: 'US', name: 'United States' },
  ]);
}`;

export const dragDropHtml = `<ui-lib-pick-list
  [(source)]="source"
  [(target)]="target"
  trackBy="code"
  [dragDrop]="true"
  (movedToTarget)="onMoveToTarget($event)"
  (movedToSource)="onMoveToSource($event)"
/>`;

export const dragDropTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { PickListComponent } from 'ui-lib-custom/pick-list';
import type {
  PickListMoveToTargetEvent,
  PickListMoveToSourceEvent,
} from 'ui-lib-custom/pick-list';

interface Country { code: string; name: string; }

@Component({
  standalone: true,
  imports: [PickListComponent],
  templateUrl: './drag-drop.example.html',
})
export class MyComponent {
  public readonly source: WritableSignal<Country[]> = signal([
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ]);
  public readonly target: WritableSignal<Country[]> = signal([]);

  public onMoveToTarget(event: PickListMoveToTargetEvent): void {
    console.log('Moved to target', event.items);
  }

  public onMoveToSource(event: PickListMoveToSourceEvent): void {
    console.log('Returned to source', event.items);
  }
}`;

export const filterHtml = `<ui-lib-pick-list
  [(source)]="source"
  [(target)]="target"
  trackBy="name"
  filterBy="name"
  sourceFilterPlaceholder="Search available…"
  targetFilterPlaceholder="Search selected…"
/>`;

export const filterTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { PickListComponent } from 'ui-lib-custom/pick-list';

interface Country { code: string; name: string; }

@Component({
  standalone: true,
  imports: [PickListComponent],
  templateUrl: './filter.example.html',
})
export class MyComponent {
  public readonly source: WritableSignal<Country[]> = signal([
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ]);
  public readonly target: WritableSignal<Country[]> = signal([]);
}`;

export const templatesHtml = `<ui-lib-pick-list [(source)]="source" [(target)]="target" trackBy="code">
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
</ui-lib-pick-list>`;

export const templatesTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import {
  PickListComponent,
  PickListItemDirective,
  PickListSourceHeaderDirective,
  PickListTargetHeaderDirective,
  PickListEmptyDirective,
} from 'ui-lib-custom/pick-list';

interface Country { code: string; name: string; region: string; }

@Component({
  standalone: true,
  imports: [
    PickListComponent,
    PickListItemDirective,
    PickListSourceHeaderDirective,
    PickListTargetHeaderDirective,
    PickListEmptyDirective,
  ],
  templateUrl: './templates.example.html',
})
export class MyComponent {
  public readonly source: WritableSignal<Country[]> = signal([
    { code: 'DE', name: 'Germany', region: 'Europe' },
    { code: 'FR', name: 'France', region: 'Europe' },
  ]);
  public readonly target: WritableSignal<Country[]> = signal([
    { code: 'US', name: 'United States', region: 'Americas' },
  ]);
}`;
