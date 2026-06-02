import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  type Signal,
  signal,
  type WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from 'ui-lib-custom/button';
import type { StackAlign, StackDirection, StackJustify } from 'ui-lib-custom/layout';
import { Grid, Stack } from 'ui-lib-custom/layout';
import { Panel } from 'ui-lib-custom/panel';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Tab, Tabs } from 'ui-lib-custom/tabs';
import type { StackToken } from 'ui-lib-custom/tokens';
import { STACK_TOKENS } from 'ui-lib-custom/tokens';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
/**
 * Demo section for stack layout usage.
 */
@Component({
  selector: 'app-layout-stack-section',
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
  templateUrl: './stack-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'stack', label: 'Stack' }];

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'spacing', type: 'SpacingToken', description: 'Semantic gap between children.' },
    {
      name: 'direction',
      type: "'vertical' | 'horizontal'",
      description: 'Flow direction of children.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | 'stretch'",
      description: 'Cross-axis alignment.',
    },
    {
      name: 'justify',
      type: "'start' | 'center' | 'end' | 'space-between'",
      description: 'Main-axis distribution.',
    },
  ];

  public readonly usageSnippet: string = `
<ui-lib-stack spacing="md" direction="horizontal" justify="space-between">
  <div class="card">Left</div>
  <div class="card">Center</div>
  <div class="card">Right</div>
</ui-lib-stack>
`;

  public readonly usageSnippetTs: string = `import { Component } from '@angular/core';
import { Stack } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [Stack],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;

  public readonly activeTab: WritableSignal<'demo' | 'usage' | 'api'> = signal<
    'demo' | 'usage' | 'api'
  >('demo');

  public readonly spacing: WritableSignal<StackToken> = signal<StackToken>('md');
  public readonly direction: WritableSignal<StackDirection> = signal<StackDirection>('vertical');
  public readonly align: WritableSignal<StackAlign> = signal<StackAlign>('center');
  public readonly justify: WritableSignal<StackJustify> = signal<StackJustify>('space-between');

  public readonly spacingOptions: { label: string; value: StackToken }[] =
    this.buildOptions(STACK_TOKENS);
  public readonly directionOptions: { label: string; value: StackDirection }[] = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];
  public readonly alignOptions: { label: string; value: StackAlign }[] = [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
    { label: 'Stretch', value: 'stretch' },
  ];
  public readonly justifyOptions: { label: string; value: StackJustify }[] = [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
    { label: 'Space Between', value: 'space-between' },
    { label: 'Space Around', value: 'space-around' },
    { label: 'Space Evenly', value: 'space-evenly' },
  ];

  public readonly spacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.spacing(), this.spacingOptions),
  );
  public readonly alignLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.align(), this.alignOptions),
  );
  public readonly justifyLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.justify(), this.justifyOptions),
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

  public setDirection(value: StackDirection): void {
    this.direction.set(value);
  }

  public setAlign(value: StackAlign): void {
    this.align.set(value);
  }

  public setJustify(value: StackJustify): void {
    this.justify.set(value);
  }

  public resetControls(): void {
    this.spacing.set('md');
    this.direction.set('vertical');
    this.align.set('center');
    this.justify.set('space-between');
  }

  private buildOptions<T extends string>(tokens: Record<T, string>): { label: string; value: T }[] {
    return Object.entries(tokens as Record<string, string>).map(
      ([key, value]: [string, string]): { label: string; value: T } => ({
        label: `${key} (${this.toPx(value)})`,
        value: key as T,
      }),
    );
  }

  private displayLabel<T extends string>(value: T, options: { label: string; value: T }[]): string {
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
