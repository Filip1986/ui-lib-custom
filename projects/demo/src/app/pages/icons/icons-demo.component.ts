import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Icon, IconButton, Alert, Button, SEMANTIC_ICONS, Tabs, Tab, Card } from 'ui-lib-custom';
import type { IconSize, SemanticIcon, TabsValue } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';

type TabKey = 'playground' | 'api-reference' | 'usage' | 'accessibility';

@Component({
  selector: 'app-icons-demo',
  standalone: true,
  imports: [
    CommonModule,
    Tabs,
    Tab,
    Card,
    Icon,
    IconButton,
    Button,
    Alert,
    TitleCasePipe,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
    CodePreviewComponent,
  ],
  templateUrl: './icons-demo.component.html',
  styleUrl: './icons-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

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

  private readonly allIcons: SemanticIcon[] = [...SEMANTIC_ICONS];

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
