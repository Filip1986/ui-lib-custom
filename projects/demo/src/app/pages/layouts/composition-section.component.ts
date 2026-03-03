import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import {
  Button,
  Card,
  Container,
  CONTAINER_MAX_WIDTHS,
  Grid,
  Inline,
  INLINE_TOKENS,
  INSET_TOKENS,
  Stack,
  STACK_TOKENS,
  Tabs,
  Tab,
  UiLibSelect,
  GRID_COLUMNS,
} from 'ui-lib-custom';
import type {
  ContainerSize,
  GridColumns,
  GridAlign,
  GridJustify,
  InlineToken,
  InsetToken,
  StackToken,
  TabsValue,
} from 'ui-lib-custom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
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
  public readonly sections: DocSection[] = [{ id: 'composition', label: 'Composition' }];

  public readonly usageSnippet: string = `
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

  public readonly activeTab: WritableSignal<'demo' | 'usage' | 'api'> = signal<
    'demo' | 'usage' | 'api'
  >('demo');

  public readonly containerSize: WritableSignal<ContainerSize> = signal<ContainerSize>('lg');
  public readonly containerInset: WritableSignal<Exclude<InsetToken, 'xs'>> =
    signal<Exclude<InsetToken, 'xs'>>('lg');
  public readonly stackSpacing: WritableSignal<StackToken> = signal<StackToken>('lg');
  public readonly gridSpacing: WritableSignal<StackToken> = signal<StackToken>('md');
  public readonly gridColumns: WritableSignal<GridColumns> = signal<GridColumns>(3);
  public readonly gridMinWidth: WritableSignal<string> = signal<string>('');
  public readonly gridAlign: WritableSignal<GridAlign> = signal<GridAlign>('stretch');
  public readonly gridJustify: WritableSignal<GridJustify> = signal<GridJustify>('stretch');
  public readonly inlineSpacing: WritableSignal<InlineToken> = signal<InlineToken>('sm');

  public readonly sizeOptions: Array<{ label: string; value: ContainerSize }> = Object.keys(
    CONTAINER_MAX_WIDTHS
  ).map((key: string): { label: string; value: ContainerSize } => ({
    label: `${key} (${CONTAINER_MAX_WIDTHS[key as ContainerSize]})`,
    value: key as ContainerSize,
  }));
  public readonly insetOptions: Array<{ label: string; value: Exclude<InsetToken, 'xs'> }> =
    Object.entries(INSET_TOKENS)
      .filter(([key]: [string, string]): boolean => key !== 'xs')
      .map(
        ([key, value]: [string, string]): {
          label: string;
          value: Exclude<InsetToken, 'xs'>;
        } => ({
          label: `${key} (${value})`,
          value: key as Exclude<InsetToken, 'xs'>,
        })
      );
  public readonly spacingOptions: Array<{ label: string; value: StackToken }> =
    this.buildOptions(STACK_TOKENS);
  public readonly gridColumnOptions: Array<{ label: string; value: GridColumns }> = Object.keys(
    GRID_COLUMNS
  ).map((key: string): { label: string; value: GridColumns } => ({
    label: `${key} cols`,
    value: Number(key) as GridColumns,
  }));
  public readonly minWidthOptions: Array<{ label: string; value: string }> = [
    { label: 'Fixed', value: '' },
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
  public readonly inlineSpacingOptions: Array<{ label: string; value: InlineToken }> =
    this.buildOptions(INLINE_TOKENS);

  public readonly sizeLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.containerSize(), this.sizeOptions)
  );
  public readonly insetLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.containerInset(), this.insetOptions)
  );
  public readonly stackLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.stackSpacing(), this.spacingOptions)
  );
  public readonly gridSpacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.gridSpacing(), this.spacingOptions)
  );
  public readonly gridColumnsLabel: Signal<string> = computed<string>(
    (): string => `${this.gridColumns()} cols`
  );
  public readonly gridMinWidthLabel: Signal<string> = computed<string>((): string =>
    this.gridMinWidth() ? this.gridMinWidth() : 'Fixed'
  );
  public readonly gridAlignLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.gridAlign(), this.alignOptions)
  );
  public readonly gridJustifyLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.gridJustify(), this.justifyOptions)
  );
  public readonly inlineSpacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.inlineSpacing(), this.inlineSpacingOptions)
  );

  public setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }

  public setContainerSize(value: ContainerSize): void {
    this.containerSize.set(value);
  }

  public setContainerInset(value: Exclude<InsetToken, 'xs'>): void {
    this.containerInset.set(value);
  }

  public setStackSpacing(value: StackToken): void {
    this.stackSpacing.set(value);
  }

  public setGridSpacing(value: StackToken): void {
    this.gridSpacing.set(value);
  }

  public setGridColumns(value: GridColumns): void {
    this.gridColumns.set(value);
  }

  public setGridMinWidth(value: string): void {
    this.gridMinWidth.set(value);
  }

  public setGridAlign(value: GridAlign): void {
    this.gridAlign.set(value);
  }

  public setGridJustify(value: GridJustify): void {
    this.gridJustify.set(value);
  }

  public setInlineSpacing(value: InlineToken): void {
    this.inlineSpacing.set(value);
  }

  public resetControls(): void {
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
