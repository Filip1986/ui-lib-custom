import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Icon, SEMANTIC_ICONS } from 'ui-lib-custom/icon';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import type { IconSize } from 'ui-lib-custom/core';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { IconButton, Alert } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { IconBasicExampleComponent } from '@demo/examples/icon-basic-example.component';
import { FormsModule } from '@angular/forms';

type TabKey = 'playground' | 'api-reference' | 'usage' | 'accessibility';

/**
 * Demo page for icon libraries and semantic icons.
 */
@Component({
  selector: 'app-icons-demo',
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    Icon,
    CodeSnippet,
    IconButton,
    Alert,
    Button,
    Card,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    IconBasicExampleComponent,
    FormsModule,
  ],
  templateUrl: './icons-demo.component.html',
  styleUrl: './icons-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsDemoComponent {
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

  public readonly snippets: { readonly usage: string } = {
    usage: `<ui-lib-icon name="search" size="lg" variant="material" />`,
  } as const;

  public readonly iconExample: string = `<ui-lib-icon name="search" size="lg" variant="material" />`;

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
