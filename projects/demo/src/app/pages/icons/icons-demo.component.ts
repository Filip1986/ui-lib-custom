import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Icon, SEMANTIC_ICONS } from 'ui-lib-custom/icon';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import type { IconSize } from 'ui-lib-custom/core';
import { Button } from 'ui-lib-custom/button';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { IconButton, Alert } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { IconBasicExampleComponent } from '@demo/examples/icon-basic-example.component';
import { FormsModule } from '@angular/forms';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
type TabKey = 'playground' | 'api-reference' | 'usage' | 'accessibility';

/**
 * Demo page for icon libraries and semantic icons.
 */
@Component({
  selector: 'app-icons-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    TitleCasePipe,
    Icon,
    CodeSnippet,
    DocCodeExampleComponent,
    IconButton,
    Alert,
    Button,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    IconBasicExampleComponent,
    FormsModule,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './icons-demo.component.html',
  styleUrl: './icons-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Icon } from 'ui-lib-custom/icon'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  public readonly variants: readonly ['material', 'bootstrap', 'minimal'] = [
    'material',
    'bootstrap',
    'minimal',
  ];
  public readonly severities: readonly ['success', 'error', 'warning', 'info'] = [
    'success',
    'error',
    'warning',
    'info',
  ];
  public readonly semanticIcons: SemanticIcon[] = [
    'close',
    'menu',
    'search',
    'settings',
    'add',
    'edit',
    'delete',
    'home',
    'user',
    'mail',
    'check',
    'x',
    'star',
    'heart',
    'bell',
  ];

  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly searchQuery: WritableSignal<string> = signal<string>('');

  private readonly allIcons: SemanticIcon[] = SEMANTIC_ICONS;

  public readonly filteredIcons: Signal<SemanticIcon[]> = computed<SemanticIcon[]>(
    (): SemanticIcon[] => {
      const query: string = this.searchQuery().toLowerCase();
      if (!query) return this.allIcons;
      return this.allIcons.filter((icon: SemanticIcon): boolean =>
        icon.toLowerCase().includes(query)
      );
    }
  );

  public readonly snippets: { readonly usage: string; readonly usageTs: string } = {
    usage: `<ui-lib-icon name="search" size="lg" variant="material" />`,
    usageTs: `import { Component } from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';

@Component({
  standalone: true,
  imports: [Icon],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
  } as const;

  public readonly iconExample: string = `<ui-lib-icon name="search" size="lg" variant="material" />`;
  public readonly iconExampleTs: string = `import { Component } from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';

@Component({
  standalone: true,
  imports: [Icon],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;

  public onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  public copyIconName(icon: string): void {
    try {
      void navigator.clipboard
        .writeText(`<ui-lib-icon name=\"${icon}\" />`)
        .catch((err: unknown): void => {
          console.error(err);
        });
    } catch {
      // Ignore clipboard failures in non-secure contexts.
    }
  }
}
