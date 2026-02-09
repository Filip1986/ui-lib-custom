import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card, Stack, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-stack-section',
  standalone: true,
  imports: [
    Card,
    Stack,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './stack-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutStackSectionComponent {
  readonly sections: DocSection[] = [{ id: 'stack', label: 'Stack' }];

  readonly usageSnippet: string = `
<ui-lib-stack spacing="md" direction="horizontal" justify="space-between">
  <div class="card">Left</div>
  <div class="card">Center</div>
  <div class="card">Right</div>
</ui-lib-stack>
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
