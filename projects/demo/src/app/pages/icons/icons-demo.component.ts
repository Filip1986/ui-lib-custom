import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  Icon,
  IconButton,
  Alert,
  Button,
  IconSize,
  SemanticIcon,
  SEMANTIC_ICONS,
  Tabs,
  Tab,
  TabsValue,
  Card,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
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

  public readonly activeTab = signal<TabKey>('playground');

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

  public readonly loading = signal(false);
  public readonly searchQuery = signal('');

  private readonly allIcons = SEMANTIC_ICONS;

  public readonly filteredIcons = computed<SemanticIcon[]>(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allIcons;
    return this.allIcons.filter((icon) => icon.toLowerCase().includes(query));
  });

  public readonly snippets = {
    usage: `<ui-lib-icon name="search" size="lg" variant="material" />`,
  } as const;

  public readonly iconExample = `<ui-lib-icon name="search" size="lg" variant="material" />`;

  public onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  public copyIconName(icon: string): void {
    try {
      void navigator.clipboard
        .writeText(`<ui-lib-icon name=\"${icon}\" />`)
        .catch((err: unknown) => {
          console.error(err);
        });
    } catch {
      // Ignore clipboard failures in non-secure contexts.
    }
  }
}
