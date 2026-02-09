import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card, Grid, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-layout-grid-section',
  standalone: true,
  imports: [
    Card,
    Grid,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './grid-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutGridSectionComponent {
  readonly sections: DocSection[] = [{ id: 'grid', label: 'Grid' }];

  readonly usageSnippet: string = `
<ui-lib-grid [columns]="12" spacing="sm">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
</ui-lib-grid>
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
