import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card, Container, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-container-section',
  standalone: true,
  imports: [
    Card,
    Container,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './container-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutContainerSectionComponent {
  readonly sections: DocSection[] = [{ id: 'container', label: 'Container' }];

  readonly usageSnippet: string = `
<ui-lib-container size="md" inset="lg">
  <h3>Content title</h3>
  <p class="no-margin">Keep content aligned with page max-width.</p>
</ui-lib-container>
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
