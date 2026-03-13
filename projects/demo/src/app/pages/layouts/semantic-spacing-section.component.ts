import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Container, Grid, Inline, Stack } from 'ui-lib-custom/layout';
import { INSET_TOKENS, INLINE_TOKENS, STACK_TOKENS } from 'ui-lib-custom/tokens';
import type { InsetToken, InlineToken, StackToken } from 'ui-lib-custom/tokens';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { UiLibSelect } from 'ui-lib-custom/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

/**
 * Demo section for semantic spacing tokens.
 */
@Component({
  selector: 'app-layout-semantic-spacing-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Button,
    Card,
    Grid,
    Stack,
    Inline,
    UiLibSelect,
    Container,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './semantic-spacing-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemanticSpacingSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'semantic-spacing', label: 'Semantic Spacing' }];

  public readonly usageSnippet: string = `
<ui-lib-stack spacing="md">
  <ui-lib-inline spacing="sm">
    <span class="chip">Item A</span>
    <span class="chip">Item B</span>
  </ui-lib-inline>
  <ui-lib-container inset="lg" style="background: var(--uilib-surface-alt, #f5f5f5)">
    <p class="no-margin">Semantic padding via inset token.</p>
  </ui-lib-container>
</ui-lib-stack>
`;

  public readonly activeTab: WritableSignal<'demo' | 'usage' | 'api'> = signal<
    'demo' | 'usage' | 'api'
  >('demo');

  public readonly stackSpacing: WritableSignal<StackToken> = signal<StackToken>('sm');
  public readonly inlineSpacing: WritableSignal<InlineToken> = signal<InlineToken>('sm');
  public readonly gridSpacing: WritableSignal<StackToken> = signal<StackToken>('md');
  public readonly inset: WritableSignal<Exclude<InsetToken, 'xs'>> =
    signal<Exclude<InsetToken, 'xs'>>('lg');

  public readonly stackOptions: { label: string; value: StackToken }[] =
    this.buildOptions<StackToken>(STACK_TOKENS);
  public readonly inlineOptions: { label: string; value: InlineToken }[] =
    this.buildOptions<InlineToken>(INLINE_TOKENS);
  public readonly insetOptions: { label: string; value: Exclude<InsetToken, 'xs'> }[] =
    this.buildOptions<Exclude<InsetToken, 'xs'>>(
      INSET_TOKENS as Record<InsetToken, string>,
      (key: string): boolean => key !== 'xs'
    );

  public readonly stackSpacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.stackSpacing(), this.stackOptions)
  );
  public readonly inlineSpacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.inlineSpacing(), this.inlineOptions)
  );
  public readonly gridSpacingLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.gridSpacing(), this.stackOptions)
  );
  public readonly insetLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.inset(), this.insetOptions)
  );

  public setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
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

  public setInset(value: Exclude<InsetToken, 'xs'>): void {
    this.inset.set(value);
  }

  public resetControls(): void {
    this.stackSpacing.set('sm');
    this.inlineSpacing.set('sm');
    this.gridSpacing.set('md');
    this.inset.set('lg');
  }

  private buildOptions<T extends string>(
    tokens: Record<T, string>,
    predicate?: (key: string) => boolean
  ): { label: string; value: T }[] {
    return Object.entries(tokens as Record<string, string>)
      .filter(([key]: [string, string]): boolean => (predicate ? predicate(key) : true))
      .map(([key, value]: [string, string]): { label: string; value: T } => ({
        label: `${key} (${this.toPx(value)})`,
        value: key as T,
      }));
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
