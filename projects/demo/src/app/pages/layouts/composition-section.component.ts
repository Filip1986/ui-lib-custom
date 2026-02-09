import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card, Container, Grid, Inline, Stack, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-composition-section',
  standalone: true,
  imports: [
    Card,
    Container,
    Stack,
    Grid,
    Inline,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './composition-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCompositionSectionComponent {
  readonly sections: DocSection[] = [{ id: 'composition', label: 'Composition' }];

  readonly usageSnippet: string = `
<ui-lib-container size="lg" inset="lg">
  <ui-lib-stack spacing="lg">
    <ui-lib-grid [columns]="3" spacing="md">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </ui-lib-grid>
  </ui-lib-stack>
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
