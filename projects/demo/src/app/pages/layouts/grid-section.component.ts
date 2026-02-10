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
  readonly sections: DocSection[] = [{ id: 'grid', label: 'Grid' }];

  readonly usageSnippet: string = `
<ui-lib-grid [columns]="12" spacing="sm">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
</ui-lib-grid>
`;

  readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  readonly spacing = signal<StackToken>('md');
  readonly columns = signal<GridColumns>(4);
  readonly minWidth = signal<string>('');
  readonly align = signal<GridAlign>('stretch');
  readonly justify = signal<GridJustify>('stretch');
  readonly cardCount = signal<number>(8);

  readonly spacingOptions = this.buildOptions(STACK_TOKENS);
  readonly columnOptions = Object.keys(GRID_COLUMNS).map((key) => ({
    label: `${key} cols`,
    value: Number(key) as GridColumns,
  }));
  readonly minWidthOptions = [
    { label: 'None (fixed)', value: '' },
    { label: '160px', value: '160px' },
    { label: '200px', value: '200px' },
    { label: '240px', value: '240px' },
  ];
  readonly alignOptions: { label: string; value: GridAlign }[] = [
    { label: 'Stretch', value: 'stretch' },
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ];
  readonly justifyOptions: { label: string; value: GridJustify }[] = [
    { label: 'Stretch', value: 'stretch' },
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ];
  readonly cardOptions: { label: string; value: number }[] = Array.from(
    { length: 12 },
    (_, index) => {
      const count = index + 1;
      return { label: `${count} cards`, value: count };
    }
  );

  readonly spacingLabel = computed(() => this.displayLabel(this.spacing(), this.spacingOptions));
  readonly columnLabel = computed(() => `${this.columns()} cols`);
  readonly minWidthLabel = computed(() => (this.minWidth() ? this.minWidth() : 'Fixed columns'));
  readonly alignLabel = computed(() => this.displayLabel(this.align(), this.alignOptions));
  readonly justifyLabel = computed(() => this.displayLabel(this.justify(), this.justifyOptions));
  readonly cardLabel = computed(() => `${this.cardCount()} cards`);
  readonly cardRange = computed(() =>
    Array.from({ length: this.cardCount() }, (_, index) => index + 1)
  );

  setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }

  setSpacing(value: StackToken): void {
    this.spacing.set(value);
  }

  setColumns(value: GridColumns): void {
    this.columns.set(value);
  }

  setMinWidth(value: string): void {
    this.minWidth.set(value);
  }

  setAlign(value: GridAlign): void {
    this.align.set(value);
  }

  setJustify(value: GridJustify): void {
    this.justify.set(value);
  }

  setCardCount(value: number): void {
    this.cardCount.set(value);
  }

  resetControls(): void {
    this.spacing.set('md');
    this.columns.set(4);
    this.minWidth.set('');
    this.align.set('stretch');
    this.justify.set('stretch');
    this.cardCount.set(8);
  }

  private buildOptions<T extends string>(tokens: Record<T, string>): { label: string; value: T }[] {
    return Object.entries(tokens as Record<string, string>).map(([key, value]) => ({
      label: `${key} (${this.toPx(value)})`,
      value: key as T,
    }));
  }

  private displayLabel<T extends string | number>(
    value: T,
    options: { label: string; value: T }[]
  ): string {
    const match = options.find((option) => option.value === value);
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
