import { CommonModule } from '@angular/common';
import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from 'ui-lib-custom/button';
import type { InlineAlign, InlineJustify } from 'ui-lib-custom/layout';
import { Grid, Inline, Stack } from 'ui-lib-custom/layout';
import { Panel } from 'ui-lib-custom/panel';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Tab, Tabs } from 'ui-lib-custom/tabs';
import type { InlineToken } from 'ui-lib-custom/tokens';
import { INLINE_TOKENS } from 'ui-lib-custom/tokens';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
/**
 * Demo section for inline layout usage.
 */
@Component({
  selector: 'app-layout-inline-section',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    Button,
    Grid,
    Inline,
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
  templateUrl: './inline-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'inline', label: 'Inline' }];

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'spacing', type: 'SpacingToken', description: 'Semantic gap between children.' },
    {
      name: 'justify',
      type: "'start' | 'center' | 'end' | 'space-between'",
      description: 'Main-axis distribution.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | 'stretch'",
      description: 'Cross-axis alignment for wrapped rows.',
    },
    {
      name: 'wrap',
      type: 'boolean',
      description: 'Allow items to wrap to the next line.',
    },
  ];

  public readonly usageSnippet: string = `
<ui-lib-inline spacing="sm" justify="center">
  <span class="chip">Tag 1</span>
  <span class="chip">Tag 2</span>
  <span class="chip">Tag 3</span>
</ui-lib-inline>
`;

  public readonly usageSnippetTs: string = `import { Component } from '@angular/core';
import { Inline } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [Inline],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;

  public readonly activeTab: WritableSignal<'demo' | 'usage' | 'api'> = signal<
    'demo' | 'usage' | 'api'
  >('demo');

  public readonly spacing: WritableSignal<InlineToken> = signal<InlineToken>('sm');
  public readonly justify: WritableSignal<InlineJustify> = signal<InlineJustify>('start');
  public readonly align: WritableSignal<InlineAlign> = signal<InlineAlign>('center');

  public readonly spacingOptions: Array<{ label: string; value: InlineToken }> =
    this.buildOptions(INLINE_TOKENS);
  public readonly justifyOptions: Array<{ label: string; value: InlineJustify }> = [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
    { label: 'Space Between', value: 'space-between' },
    { label: 'Space Around', value: 'space-around' },
  ];
  public readonly alignOptions: Array<{ label: string; value: InlineAlign }> = [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
    { label: 'Baseline', value: 'baseline' },
    { label: 'Stretch', value: 'stretch' },
  ];

  public readonly spacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.spacing(), this.spacingOptions),
  );
  public readonly justifyLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.justify(), this.justifyOptions),
  );
  public readonly alignLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.align(), this.alignOptions),
  );

  public setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }

  public setSpacing(value: InlineToken): void {
    this.spacing.set(value);
  }

  public setJustify(value: InlineJustify): void {
    this.justify.set(value);
  }

  public setAlign(value: InlineAlign): void {
    this.align.set(value);
  }

  public resetControls(): void {
    this.spacing.set('sm');
    this.justify.set('start');
    this.align.set('center');
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
