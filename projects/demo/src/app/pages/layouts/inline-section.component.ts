import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Grid, Inline, Stack } from 'ui-lib-custom/layout';
import { INLINE_TOKENS } from 'ui-lib-custom/tokens';
import type { InlineToken } from 'ui-lib-custom/tokens';
import type { InlineAlign, InlineJustify } from 'ui-lib-custom/layout';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { UiLibSelect } from 'ui-lib-custom/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

/**
 * Demo section for inline layout usage.
 */
@Component({
  selector: 'app-layout-inline-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Button,
    Card,
    Grid,
    Inline,
    Stack,
    Tabs,
    Tab,
    UiLibSelect,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './inline-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'inline', label: 'Inline' }];

  public readonly usageSnippet: string = `
<ui-lib-inline spacing="sm" justify="center">
  <span class="chip">Tag 1</span>
  <span class="chip">Tag 2</span>
  <span class="chip">Tag 3</span>
</ui-lib-inline>
`;

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
    this.displayLabel(this.spacing(), this.spacingOptions)
  );
  public readonly justifyLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.justify(), this.justifyOptions)
  );
  public readonly alignLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.align(), this.alignOptions)
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
      })
    );
  }

  private displayLabel<T extends string>(value: T, options: { label: string; value: T }[]): string {
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
