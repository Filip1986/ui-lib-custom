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

type TabKey = 'playground' | 'api-reference' | 'usage';

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
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
  ];

  activeTab = signal<TabKey>('playground');

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null) {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  variants = ['material', 'bootstrap', 'minimal'] as const;
  severities = ['success', 'error', 'warning', 'info'] as const;
  semanticIcons: SemanticIcon[] = [
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

  loading = signal(false);
  searchQuery = signal('');

  private allIcons = SEMANTIC_ICONS;

  filteredIcons = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allIcons;
    return this.allIcons.filter((icon) => icon.toLowerCase().includes(query));
  });

  readonly snippets = {
    usage: `<ui-lib-icon name="search" size="lg" variant="material" />`,
  } as const;

  readonly iconExample = `<ui-lib-icon name="search" size="lg" variant="material" />`;

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  copyIconName(icon: string) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(`<ui-lib-icon name="${icon}" />`);
    }
  }
}
