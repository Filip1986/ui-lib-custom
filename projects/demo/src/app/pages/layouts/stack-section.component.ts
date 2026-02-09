import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  Button,
  Card,
  Grid,
  Stack,
  Tabs,
  Tab,
  TabsValue,
  UiLibSelect,
  STACK_TOKENS,
  StackToken,
  StackDirection,
  StackAlign,
  StackJustify,
} from 'ui-lib-custom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-stack-section',
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
  templateUrl: './stack-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutStackSectionComponent {
  readonly sections: DocSection[] = [{ id: 'stack', label: 'Stack' }];

  readonly usageSnippet: string = `
<ui-lib-stack spacing="md" direction="horizontal" justify="space-between">
  <div class="card">Left</div>
  <div class="card">Center</div>
  <div class="card">Right</div>
</ui-lib-stack>
`;

  readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  readonly spacing = signal<StackToken>('md');
  readonly direction = signal<StackDirection>('vertical');
  readonly align = signal<StackAlign>('center');
  readonly justify = signal<StackJustify>('space-between');

  readonly spacingOptions = this.buildOptions(STACK_TOKENS);
  readonly directionOptions: { label: string; value: StackDirection }[] = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];
  readonly alignOptions: { label: string; value: StackAlign }[] = [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
    { label: 'Stretch', value: 'stretch' },
  ];
  readonly justifyOptions: { label: string; value: StackJustify }[] = [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
    { label: 'Space Between', value: 'space-between' },
    { label: 'Space Around', value: 'space-around' },
    { label: 'Space Evenly', value: 'space-evenly' },
  ];

  readonly spacingLabel = computed(() => this.displayLabel(this.spacing(), this.spacingOptions));
  readonly alignLabel = computed(() => this.displayLabel(this.align(), this.alignOptions));
  readonly justifyLabel = computed(() => this.displayLabel(this.justify(), this.justifyOptions));

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

  setDirection(value: StackDirection): void {
    this.direction.set(value);
  }

  setAlign(value: StackAlign): void {
    this.align.set(value);
  }

  setJustify(value: StackJustify): void {
    this.justify.set(value);
  }

  resetControls(): void {
    this.spacing.set('md');
    this.direction.set('vertical');
    this.align.set('center');
    this.justify.set('space-between');
  }

  private buildOptions<T extends string>(tokens: Record<T, string>): { label: string; value: T }[] {
    return Object.entries(tokens as Record<string, string>).map(([key, value]) => ({
      label: `${key} (${this.toPx(value)})`,
      value: key as T,
    }));
  }

  private displayLabel<T extends string>(value: T, options: { label: string; value: T }[]): string {
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
