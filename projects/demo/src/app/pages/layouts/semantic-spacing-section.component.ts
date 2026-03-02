import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  Button,
  Card,
  Container,
  Grid,
  Inline,
  Stack,
  Tab,
  Tabs,
  TabsValue,
  UiLibSelect,
} from 'ui-lib-custom';
import {
  INSET_TOKENS,
  INLINE_TOKENS,
  STACK_TOKENS,
  InsetToken,
  InlineToken,
  StackToken,
} from 'ui-lib-custom';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

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
export class LayoutSemanticSpacingSectionComponent {
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

  public readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  public readonly stackSpacing = signal<StackToken>('sm');
  public readonly inlineSpacing = signal<InlineToken>('sm');
  public readonly gridSpacing = signal<StackToken>('md');
  public readonly inset = signal<Exclude<InsetToken, 'xs'>>('lg');

  public readonly stackOptions = this.buildOptions<StackToken>(STACK_TOKENS);
  public readonly inlineOptions = this.buildOptions<InlineToken>(INLINE_TOKENS);
  public readonly insetOptions = this.buildOptions<Exclude<InsetToken, 'xs'>>(
    INSET_TOKENS as Record<InsetToken, string>,
    (key: string): boolean => key !== 'xs'
  );

  public readonly stackSpacingLabel = computed<string>((): string =>
    this.displayLabel(this.stackSpacing(), this.stackOptions)
  );
  public readonly inlineSpacingLabel = computed<string>((): string =>
    this.displayLabel(this.inlineSpacing(), this.inlineOptions)
  );
  public readonly gridSpacingLabel = computed<string>((): string =>
    this.displayLabel(this.gridSpacing(), this.stackOptions)
  );
  public readonly insetLabel = computed<string>((): string =>
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
    const match = options.find(
      (option: { label: string; value: T }): boolean => option.value === value
    );
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
