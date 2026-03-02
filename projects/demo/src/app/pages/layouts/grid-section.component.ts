import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  Button,
  Card,
  Grid,
  GridAlign,
  GridColumns,
  GridJustify,
  STACK_TOKENS,
  StackToken,
  GRID_COLUMNS,
  Stack,
  Tabs,
  Tab,
  TabsValue,
  UiLibSelect,
} from 'ui-lib-custom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
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

  public readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  public readonly spacing = signal<StackToken>('md');
  public readonly columns = signal<GridColumns>(4);
  public readonly minWidth = signal<string>('');
  public readonly align = signal<GridAlign>('stretch');
  public readonly justify = signal<GridJustify>('stretch');
  public readonly cardCount = signal<number>(2);

  public readonly spacingOptions = this.buildOptions(STACK_TOKENS);
  public readonly columnOptions = Object.keys(GRID_COLUMNS).map(
    (key: string): { label: string; value: GridColumns } => ({
      label: `${key} cols`,
      value: Number(key) as GridColumns,
    })
  );
  public readonly minWidthOptions = [
    { label: 'None (fixed)', value: '' },
    { label: '160px', value: '160px' },
    { label: '200px', value: '200px' },
    { label: '240px', value: '240px' },
  ];
  public readonly alignOptions: { label: string; value: GridAlign }[] = [
    { label: 'Stretch', value: 'stretch' },
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ];
  public readonly justifyOptions: { label: string; value: GridJustify }[] = [
    { label: 'Stretch', value: 'stretch' },
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ];
  public readonly cardOptions: { label: string; value: number }[] = Array.from(
    { length: 12 },
    (_: unknown, index: number): { label: string; value: number } => {
      const count = index + 1;
      return { label: `${count} cards`, value: count };
    }
  );

  public readonly spacingLabel = computed<string>((): string =>
    this.displayLabel(this.spacing(), this.spacingOptions)
  );
  public readonly columnLabel = computed<string>((): string => `${this.columns()} cols`);
  public readonly minWidthLabel = computed<string>((): string =>
    this.minWidth() ? this.minWidth() : 'Fixed columns'
  );
  public readonly alignLabel = computed<string>((): string =>
    this.displayLabel(this.align(), this.alignOptions)
  );
  public readonly justifyLabel = computed<string>((): string =>
    this.displayLabel(this.justify(), this.justifyOptions)
  );
  public readonly cardLabel = computed<string>((): string => `${this.cardCount()} cards`);
  public readonly cardRange = computed<number[]>((): number[] =>
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
    const match = options.find(
      (option: { label: string; value: T }): boolean => option.value === value
    );
    return match ? match.label : String(value);
  }

  private toPx(value: string): string {
    if (value.endsWith('rem')) {
      const numeric = Number.parseFloat(value.replace('rem', ''));
      const pixels = Number.isFinite(numeric) ? Math.round(numeric * 16) : 0;
      return `${pixels}px`;
    }
    return value;
  }
}
