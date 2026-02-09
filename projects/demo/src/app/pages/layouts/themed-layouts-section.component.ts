import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  Button,
  Card,
  Container,
  ContainerSize,
  CONTAINER_MAX_WIDTHS,
  Grid,
  GridColumns,
  Stack,
  INLINE_TOKENS,
  Inline,
  InlineToken,
  STACK_TOKENS,
  StackToken,
  INSET_TOKENS,
  InsetToken,
  Tabs,
  Tab,
  TabsValue,
  UiLibSelect,
} from 'ui-lib-custom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layout-themed-layouts-section',
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
  ],
  templateUrl: './themed-layouts-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutThemedLayoutsSectionComponent {
  readonly sections = [{ id: 'themed-layouts', label: 'Themed Layouts' }];
  readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  readonly containerSize = signal<ContainerSize>('md');
  readonly containerInset = signal<Exclude<InsetToken, 'xs'>>('md');
  readonly stackSpacing = signal<StackToken>('md');
  readonly inlineSpacing = signal<InlineToken>('sm');
  readonly gridSpacing = signal<StackToken>('sm');
  readonly columns = signal<GridColumns>(3);
  readonly leftTheme = signal<'light' | 'dark'>('light');
  readonly rightTheme = signal<'light' | 'dark'>('dark');

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
  readonly inlineSpacingOptions = this.buildOptions(INLINE_TOKENS);
  readonly columnOptions = [2, 3, 4].map((c) => ({ label: `${c} cols`, value: c as GridColumns }));
  readonly themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];

  readonly sizeLabel = computed(() => this.displayLabel(this.containerSize(), this.sizeOptions));
  readonly insetLabel = computed(() => this.displayLabel(this.containerInset(), this.insetOptions));
  readonly stackLabel = computed(() => this.displayLabel(this.stackSpacing(), this.spacingOptions));
  readonly inlineLabel = computed(() =>
    this.displayLabel(this.inlineSpacing(), this.inlineSpacingOptions)
  );
  readonly gridSpacingLabel = computed(() =>
    this.displayLabel(this.gridSpacing(), this.spacingOptions)
  );
  readonly columnsLabel = computed(() => `${this.columns()} cols`);
  readonly themePairLabel = computed(() => `${this.leftTheme()} / ${this.rightTheme()}`);

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

  setInlineSpacing(value: InlineToken): void {
    this.inlineSpacing.set(value);
  }

  setGridSpacing(value: StackToken): void {
    this.gridSpacing.set(value);
  }

  setColumns(value: GridColumns): void {
    this.columns.set(value);
  }

  setLeftTheme(value: 'light' | 'dark'): void {
    this.leftTheme.set(value);
  }

  setRightTheme(value: 'light' | 'dark'): void {
    this.rightTheme.set(value);
  }

  resetControls(): void {
    this.containerSize.set('md');
    this.containerInset.set('md');
    this.stackSpacing.set('md');
    this.inlineSpacing.set('sm');
    this.gridSpacing.set('sm');
    this.columns.set(3);
    this.leftTheme.set('light');
    this.rightTheme.set('dark');
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
