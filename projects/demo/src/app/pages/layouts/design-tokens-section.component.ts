import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-design-tokens-section',
  standalone: true,
  imports: [Card, Tabs, Tab, DocPageLayoutComponent, DocCodeSnippetComponent],
  templateUrl: './design-tokens-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDesignTokensSectionComponent {
  readonly sections: DocSection[] = [{ id: 'design-tokens', label: 'Design Tokens' }];

  readonly usageSnippet: string = `
:root {
  --uilib-spacing-md: 16px;
  --uilib-inset-lg: 24px;
}
`;

  readonly activeTab = signal<'demo' | 'usage' | 'api'>('demo');

  setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }
}
