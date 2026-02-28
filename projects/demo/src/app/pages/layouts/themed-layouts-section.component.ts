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
import { DocSection } from '../../shared/doc-page/doc-section.model';

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
  public readonly sections: DocSection[] = [{ id: 'themed-layouts', label: 'Themed Layouts' }];
  public readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  public readonly containerSize = signal<ContainerSize>('md');
  public readonly containerInset = signal<Exclude<InsetToken, 'xs'>>('md');
  public readonly stackSpacing = signal<StackToken>('md');
  public readonly inlineSpacing = signal<InlineToken>('sm');
  public readonly gridSpacing = signal<StackToken>('sm');
  public readonly columns = signal<GridColumns>(3);
  public readonly leftTheme = signal<'light' | 'dark'>('light');
  public readonly rightTheme = signal<'light' | 'dark'>('dark');

  public readonly sizeOptions = Object.keys(CONTAINER_MAX_WIDTHS).map((key) => ({
    label: `${key} (${CONTAINER_MAX_WIDTHS[key as ContainerSize]})`,
    value: key as ContainerSize,
  }));
  public readonly insetOptions = Object.entries(INSET_TOKENS)
    .filter(([key]) => key !== 'xs')
    .map(([key, value]) => ({
      label: `${key} (${value})`,
      value: key as Exclude<InsetToken, 'xs'>,
    }));
  public readonly spacingOptions = this.buildOptions(STACK_TOKENS);
  public readonly inlineSpacingOptions = this.buildOptions(INLINE_TOKENS);
  public readonly columnOptions = [2, 3, 4].map((c) => ({
    label: `${c} cols`,
    value: c as GridColumns,
  }));
  public readonly themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];

  public readonly sizeLabel = computed(() =>
    this.displayLabel(this.containerSize(), this.sizeOptions)
  );
  public readonly insetLabel = computed(() =>
    this.displayLabel(this.containerInset(), this.insetOptions)
  );
  public readonly stackLabel = computed(() =>
    this.displayLabel(this.stackSpacing(), this.spacingOptions)
  );
  public readonly inlineLabel = computed(() =>
    this.displayLabel(this.inlineSpacing(), this.inlineSpacingOptions)
  );
  public readonly gridSpacingLabel = computed(() =>
    this.displayLabel(this.gridSpacing(), this.spacingOptions)
  );
  public readonly columnsLabel = computed(() => `${this.columns()} cols`);
  public readonly themePairLabel = computed(() => `${this.leftTheme()} / ${this.rightTheme()}`);

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

  public setInlineSpacing(value: InlineToken): void {
    this.inlineSpacing.set(value);
  }

  public setGridSpacing(value: StackToken): void {
    this.gridSpacing.set(value);
  }

  public setColumns(value: GridColumns): void {
    this.columns.set(value);
  }

  public setLeftTheme(value: 'light' | 'dark'): void {
    this.leftTheme.set(value);
  }

  public setRightTheme(value: 'light' | 'dark'): void {
    this.rightTheme.set(value);
  }

  public resetControls(): void {
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
