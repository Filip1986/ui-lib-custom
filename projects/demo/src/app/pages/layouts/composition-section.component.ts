import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  Button,
  Card,
  Container,
  ContainerSize,
  CONTAINER_MAX_WIDTHS,
  Grid,
  GridColumns,
  GridAlign,
  GridJustify,
  Inline,
  INLINE_TOKENS,
  InlineToken,
  INSET_TOKENS,
  InsetToken,
  Stack,
  STACK_TOKENS,
  StackToken,
  Tabs,
  Tab,
  TabsValue,
  UiLibSelect,
  GRID_COLUMNS,
} from 'ui-lib-custom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-composition-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Button,
    Card,
    Container,
    Stack,
    Grid,
    Inline,
    Tabs,
    Tab,
    UiLibSelect,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './composition-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCompositionSectionComponent {
  readonly sections: DocSection[] = [{ id: 'composition', label: 'Composition' }];

  readonly usageSnippet: string = `
<ui-lib-container size="lg" inset="lg">
  <ui-lib-stack spacing="lg">
    <ui-lib-grid [columns]="3" spacing="md">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </ui-lib-grid>
  </ui-lib-stack>
</ui-lib-container>
`;

  readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  readonly containerSize = signal<ContainerSize>('lg');
  readonly containerInset = signal<Exclude<InsetToken, 'xs'>>('lg');
  readonly stackSpacing = signal<StackToken>('lg');
  readonly gridSpacing = signal<StackToken>('md');
  readonly gridColumns = signal<GridColumns>(3);
  readonly gridMinWidth = signal<string>('');
  readonly gridAlign = signal<GridAlign>('stretch');
  readonly gridJustify = signal<GridJustify>('stretch');
  readonly inlineSpacing = signal<InlineToken>('sm');

  readonly sizeOptions = Object.keys(CONTAINER_MAX_WIDTHS).map((key) => ({
    label: `${key} (${CONTAINER_MAX_WIDTHS[key as ContainerSize]})`,
    value: key as ContainerSize,
  }));
  readonly insetOptions = Object.entries(INSET_TOKENS)
    .filter(([key]) => key !== 'xs')
    .map(([key, value]) => ({
      label: `${key} (${value})`,
      value: key as Exclude<InsetToken, 'xs'>,
    }));
  readonly spacingOptions = this.buildOptions(STACK_TOKENS);
  readonly gridColumnOptions = Object.keys(GRID_COLUMNS).map((key) => ({
    label: `${key} cols`,
    value: Number(key) as GridColumns,
  }));
  readonly minWidthOptions = [
    { label: 'Fixed', value: '' },
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
  readonly inlineSpacingOptions = this.buildOptions(INLINE_TOKENS);

  readonly sizeLabel = computed(() => this.displayLabel(this.containerSize(), this.sizeOptions));
  readonly insetLabel = computed(() => this.displayLabel(this.containerInset(), this.insetOptions));
  readonly stackLabel = computed(() => this.displayLabel(this.stackSpacing(), this.spacingOptions));
  readonly gridSpacingLabel = computed(() =>
    this.displayLabel(this.gridSpacing(), this.spacingOptions)
  );
  readonly gridColumnsLabel = computed(() => `${this.gridColumns()} cols`);
  readonly gridMinWidthLabel = computed(() =>
    this.gridMinWidth() ? this.gridMinWidth() : 'Fixed'
  );
  readonly gridAlignLabel = computed(() => this.displayLabel(this.gridAlign(), this.alignOptions));
  readonly gridJustifyLabel = computed(() =>
    this.displayLabel(this.gridJustify(), this.justifyOptions)
  );
  readonly inlineSpacingLabel = computed(() =>
    this.displayLabel(this.inlineSpacing(), this.inlineSpacingOptions)
  );

  setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }

  setContainerSize(value: ContainerSize): void {
    this.containerSize.set(value);
  }

  setContainerInset(value: Exclude<InsetToken, 'xs'>): void {
    this.containerInset.set(value);
  }

  setStackSpacing(value: StackToken): void {
    this.stackSpacing.set(value);
  }

  setGridSpacing(value: StackToken): void {
    this.gridSpacing.set(value);
  }

  setGridColumns(value: GridColumns): void {
    this.gridColumns.set(value);
  }

  setGridMinWidth(value: string): void {
    this.gridMinWidth.set(value);
  }

  setGridAlign(value: GridAlign): void {
    this.gridAlign.set(value);
  }

  setGridJustify(value: GridJustify): void {
    this.gridJustify.set(value);
  }

  setInlineSpacing(value: InlineToken): void {
    this.inlineSpacing.set(value);
  }

  resetControls(): void {
    this.containerSize.set('lg');
    this.containerInset.set('lg');
    this.stackSpacing.set('lg');
    this.gridSpacing.set('md');
    this.gridColumns.set(3);
    this.gridMinWidth.set('');
    this.gridAlign.set('stretch');
    this.gridJustify.set('stretch');
    this.inlineSpacing.set('sm');
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
