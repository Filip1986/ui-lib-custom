import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card, Inline, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-inline-section',
  standalone: true,
  imports: [
    Card,
    Inline,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './inline-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutInlineSectionComponent {
  readonly sections: DocSection[] = [{ id: 'inline', label: 'Inline' }];

  readonly usageSnippet: string = `
<ui-lib-inline spacing="sm" justify="center">
  <span class="chip">Tag 1</span>
  <span class="chip">Tag 2</span>
  <span class="chip">Tag 3</span>
</ui-lib-inline>
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
