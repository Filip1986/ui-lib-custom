import { CommonModule, TitleCasePipe } from '@angular/common';
import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Alert, IconButton } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom/button';
import type { IconSize } from 'ui-lib-custom/core';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import { Icon, SEMANTIC_ICONS } from 'ui-lib-custom/icon';
import { Panel } from 'ui-lib-custom/panel';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Tab, Tabs } from 'ui-lib-custom/tabs';

import { IconBasicExampleComponent } from '@demo/examples/icon-basic-example.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import { iconExampleHtml, iconExampleTs, usageHtml, usageTs } from './snippets.generated';
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

    DocCssVarsTableComponent,

    DocSectionComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './icons-demo.component.html',
  styleUrl: './icons-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsDemoComponent {
  public readonly iconExampleHtml: string = iconExampleHtml;
  public readonly iconExampleTs: string = iconExampleTs;
  public readonly usageHtml: string = usageHtml;
  public readonly usageTs: string = usageTs;

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
        icon.toLowerCase().includes(query),
      );
    },
  );

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
  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'name', type: 'string', description: 'Icon name from the set' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", description: 'Icon size' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      description: 'Icon style variant',
    },
    { name: 'color', type: 'string', description: 'Optional color token' },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-icon-color', description: 'Text colour.' },
  ];
}
