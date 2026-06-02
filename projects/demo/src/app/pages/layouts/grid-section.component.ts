import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { UiLibSelect } from 'ui-lib-custom/select';
import { Grid, Stack } from 'ui-lib-custom/layout';
import type { GridAlign, GridJustify } from 'ui-lib-custom/layout';
import { GRID_COLUMNS, STACK_TOKENS } from 'ui-lib-custom/tokens';
import type { GridColumns, StackToken } from 'ui-lib-custom/tokens';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { Panel } from 'ui-lib-custom/panel';
/**
 * Demo section for grid layout usage.
 */
@Component({
  selector: 'app-layout-grid-section',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    Button,
    Grid,
    Stack,
    Tabs,
    Tab,
    UiLibSelect,
    DocDemoViewportComponent,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './grid-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'grid', label: 'Grid' }];

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'columns', type: 'number', description: 'Total columns for fixed grid.' },
    {
      name: 'minColumnWidth',
      type: 'string',
      description: 'Auto-fit minimum width (e.g. 200px).',
    },
    { name: 'spacing', type: 'SpacingToken', description: 'Semantic gap between cells.' },
  ];

  public readonly usageSnippet: string = `
<ui-lib-grid [columns]="12" spacing="sm">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
</ui-lib-grid>
`;

  public readonly usageSnippetTs: string = `import { Component } from '@angular/core';
import { Grid } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [Grid],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;

  public readonly activeTab: WritableSignal<'demo' | 'usage' | 'api'> = signal<
    'demo' | 'usage' | 'api'
  >('demo');

  public readonly spacing: WritableSignal<StackToken> = signal<StackToken>('md');
  public readonly columns: WritableSignal<GridColumns> = signal<GridColumns>(4);
  public readonly minWidth: WritableSignal<string> = signal<string>('');
  public readonly align: WritableSignal<GridAlign> = signal<GridAlign>('stretch');
  public readonly justify: WritableSignal<GridJustify> = signal<GridJustify>('stretch');
  public readonly cardCount: WritableSignal<number> = signal<number>(2);

  public readonly spacingOptions: Array<{ label: string; value: StackToken }> =
    this.buildOptions(STACK_TOKENS);
  private readonly gridColumnsMap: Record<GridColumns, number> = GRID_COLUMNS as Record<
    GridColumns,
    number
  >;
  private readonly gridColumnsList: GridColumns[] = Object.keys(this.gridColumnsMap).map(
    (key: string): GridColumns => Number(key) as GridColumns,
  );

  public readonly columnOptions: Array<{ label: string; value: GridColumns }> =
    this.gridColumnsList.map((value: GridColumns): { label: string; value: GridColumns } => ({
      label: `${value} cols`,
      value,
    }));
  public readonly minWidthOptions: Array<{ label: string; value: string }> = [
    { label: 'None (fixed)', value: '' },
    { label: '160px', value: '160px' },
    { label: '200px', value: '200px' },
    { label: '240px', value: '240px' },
  ];
  public readonly alignOptions: Array<{ label: string; value: GridAlign }> = [
    { label: 'Stretch', value: 'stretch' },
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ];
  public readonly justifyOptions: Array<{ label: string; value: GridJustify }> = [
    { label: 'Stretch', value: 'stretch' },
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ];
  public readonly cardOptions: Array<{ label: string; value: number }> = Array.from(
    { length: 12 },
    (_: unknown, index: number): { label: string; value: number } => {
      const count: number = index + 1;
      return { label: `${count} cards`, value: count };
    },
  );

  public readonly spacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.spacing(), this.spacingOptions),
  );
  public readonly columnLabel: Signal<string> = computed<string>(
    (): string => `${this.columns()} cols`,
  );
  public readonly minWidthLabel: Signal<string> = computed<string>((): string =>
    this.minWidth() ? this.minWidth() : 'Fixed columns',
  );
  public readonly alignLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.align(), this.alignOptions),
  );
  public readonly justifyLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.justify(), this.justifyOptions),
  );
  public readonly cardLabel: Signal<string> = computed<string>(
    (): string => `${this.cardCount()} cards`,
  );
  public readonly cardRange: Signal<number[]> = computed<number[]>((): number[] =>
    Array.from({ length: this.cardCount() }, (_: unknown, index: number): number => index + 1),
  );

  public setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }

  public setSpacing(value: StackToken): void {
    this.spacing.set(value);
  }

  public setColumns(value: GridColumns): void {
    this.columns.set(value);
  }

  public setMinWidth(value: string): void {
    this.minWidth.set(value);
  }

  public setAlign(value: GridAlign): void {
    this.align.set(value);
  }

  public setJustify(value: GridJustify): void {
    this.justify.set(value);
  }

  public setCardCount(value: number): void {
    this.cardCount.set(value);
  }

  public resetControls(): void {
    this.spacing.set('md');
    this.columns.set(4);
    this.minWidth.set('');
    this.align.set('stretch');
    this.justify.set('stretch');
    this.cardCount.set(8);
  }

  private buildOptions<T extends string>(tokens: Record<T, string>): { label: string; value: T }[] {
    return Object.entries(tokens as Record<string, string>).map(
      ([key, value]: [string, string]): { label: string; value: T } => ({
        label: `${key} (${this.toPx(value)})`,
        value: key as T,
      }),
    );
  }

  private displayLabel<T extends string | number>(
    value: T,
    options: { label: string; value: T }[],
  ): string {
    const match: { label: string; value: T } | undefined = options.find(
      (option: { label: string; value: T }): boolean => option.value === value,
    );
    return match ? match.label : String(value);
  }

  private toPx(value: string): string {
    if (value.endsWith('rem')) {
      const numeric: number = Number.parseFloat(value.replace('rem', ''));
      const pixels: number = Number.isFinite(numeric) ? Math.round(numeric * 16) : 0;
      return `${pixels}px`;
    }
    return value;
  }
}
