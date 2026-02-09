import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card, Container, Grid, Inline, Stack, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-semantic-spacing-section',
  standalone: true,
  imports: [
    Card,
    Grid,
    Stack,
    Inline,
    Container,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './semantic-spacing-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSemanticSpacingSectionComponent {
  readonly sections: DocSection[] = [{ id: 'semantic-spacing', label: 'Semantic Spacing' }];

  readonly usageSnippet: string = `
<ui-lib-stack spacing="md">
  <ui-lib-inline spacing="sm">
    <span class="chip">Item A</span>
    <span class="chip">Item B</span>
  </ui-lib-inline>
  <ui-lib-container inset="lg" style="background: var(--uilib-surface-alt, #f5f5f5)">
    <p class="no-margin">Semantic padding via inset token.</p>
  </ui-lib-container>
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
