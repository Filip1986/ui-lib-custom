import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import {
  Button,
  Card,
  Grid,
  STACK_TOKENS,
  GRID_COLUMNS,
  Stack,
  Tabs,
  Tab,
  UiLibSelect,
} from 'ui-lib-custom';
import type { GridAlign, GridColumns, GridJustify, StackToken, TabsValue } from 'ui-lib-custom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-grid-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Button,
    Card,
    Grid,
    Stack,
    Tabs,
    Tab,
    UiLibSelect,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './grid-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutGridSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'grid', label: 'Grid' }];

  public readonly usageSnippet: string = `
<ui-lib-grid [columns]="12" spacing="sm">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
</ui-lib-grid>
`;

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
  public readonly columnOptions: Array<{ label: string; value: GridColumns }> = Object.keys(
    GRID_COLUMNS
  ).map((key: string): { label: string; value: GridColumns } => ({
    label: `${key} cols`,
    value: Number(key) as GridColumns,
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
    }
  );

  public readonly spacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.spacing(), this.spacingOptions)
  );
  public readonly columnLabel: Signal<string> = computed<string>(
    (): string => `${this.columns()} cols`
  );
  public readonly minWidthLabel: Signal<string> = computed<string>((): string =>
    this.minWidth() ? this.minWidth() : 'Fixed columns'
  );
  public readonly alignLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.align(), this.alignOptions)
  );
  public readonly justifyLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.justify(), this.justifyOptions)
  );
  public readonly cardLabel: Signal<string> = computed<string>(
    (): string => `${this.cardCount()} cards`
  );
  public readonly cardRange: Signal<number[]> = computed<number[]>((): number[] =>
    Array.from({ length: this.cardCount() }, (_: unknown, index: number): number => index + 1)
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
      })
    );
  }

  private displayLabel<T extends string | number>(
    value: T,
    options: { label: string; value: T }[]
  ): string {
    const match: { label: string; value: T } | undefined = options.find(
      (option: { label: string; value: T }): boolean => option.value === value
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
