import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Container, Grid, Inline, Stack, Button, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';

@Component({
  selector: 'app-layout-examples-section',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Container,
    Grid,
    Inline,
    Stack,
    Tabs,
    Tab,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './examples-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutExamplesSectionComponent {
  readonly sections: DocSection[] = [{ id: 'examples', label: 'Examples' }];

  readonly metrics = [72.4, 48.1, 33.7, 68.9];
  readonly pricing = [29, 59, 129];

  private readonly exampleTabs: Record<ExampleId, WritableSignal<ExampleTab>> = {
    hero: signal<ExampleTab>('example'),
    features: signal<ExampleTab>('example'),
    kpis: signal<ExampleTab>('example'),
    sidebar: signal<ExampleTab>('example'),
    pricing: signal<ExampleTab>('example'),
    cta: signal<ExampleTab>('example'),
    timeline: signal<ExampleTab>('example'),
    masonry: signal<ExampleTab>('example'),
  };

  readonly heroSnippet = `<ui-lib-container size="lg" inset="xl">
  <ui-lib-stack spacing="md">
    <ui-lib-inline spacing="sm">
      <span class="demo-tag">New</span>
      <span class="demo-tag">AI Ready</span>
    </ui-lib-inline>
    <h2>Ship UI faster with composable layouts</h2>
    <p>Stacks, grids, and insets keep marketing pages consistent.</p>
    <ui-lib-inline spacing="sm">
      <ui-lib-button appearance="solid">Get started</ui-lib-button>
      <ui-lib-button appearance="ghost">Learn more</ui-lib-button>
    </ui-lib-inline>
  </ui-lib-stack>
</ui-lib-container>`;

  readonly featuresSnippet = `<ui-lib-grid [columns]="3" spacing="md">
  <ui-lib-stack spacing="xs" class="demo-card">
    <h4 class="no-margin">Analytics</h4>
    <p class="no-margin">Brief summary.</p>
  </ui-lib-stack>
  <!-- repeat for Automation, Collaboration -->
</ui-lib-grid>`;

  readonly kpiSnippet = `<ui-lib-grid [columns]="4" spacing="md">
  <ui-lib-stack spacing="xs" class="demo-card">
    <span class="demo-tag">Revenue</span>
    <h3 class="no-margin">72.4%</h3>
    <p class="no-margin">vs last week</p>
  </ui-lib-stack>
  <!-- repeat for Sessions, Conversion, NPS -->
</ui-lib-grid>`;

  readonly sidebarSnippet = `<ui-lib-grid [columns]="3" spacing="md">
  <ui-lib-stack spacing="sm" class="demo-card" style="grid-column: span 1">
    <h4>Navigation</h4>
    <ui-lib-stack spacing="xs">
      <span>Home</span>
      <span>Reports</span>
      <span>Settings</span>
    </ui-lib-stack>
  </ui-lib-stack>
  <ui-lib-stack spacing="md" class="demo-card" style="grid-column: span 2">
    <h4>Content</h4>
    <p>Main area uses Stack with semantic spacing.</p>
    <ui-lib-grid [columns]="2" spacing="sm">
      <div class="demo-grid-cell">Alpha</div>
      <!-- more cells -->
    </ui-lib-grid>
  </ui-lib-stack>
</ui-lib-grid>`;

  readonly pricingSnippet = `<ui-lib-grid [columns]="3" spacing="md">
  <ui-lib-stack spacing="sm" class="demo-card">
    <h3 class="no-margin">Starter</h3>
    <p class="no-margin">$29/mo</p>
    <ui-lib-inline spacing="xs">
      <span class="demo-tag">Feature A</span>
      <span class="demo-tag">Feature B</span>
    </ui-lib-inline>
    <ui-lib-button appearance="solid">Choose</ui-lib-button>
  </ui-lib-stack>
  <!-- Growth, Enterprise -->
</ui-lib-grid>`;

  readonly ctaSnippet = `<ui-lib-grid [columns]="2" spacing="md">
  <ui-lib-stack spacing="sm" class="demo-card">
    <h3>Engaging headline</h3>
    <p>Support text for the primary action.</p>
    <ui-lib-inline spacing="sm">
      <ui-lib-button appearance="solid">Primary</ui-lib-button>
      <ui-lib-button appearance="ghost">Secondary</ui-lib-button>
    </ui-lib-inline>
  </ui-lib-stack>
  <ui-lib-stack spacing="sm" class="demo-card">
    <h3>Checklist</h3>
    <ui-lib-stack spacing="xs">
      <span>• Fast setup</span>
      <span>• Themeable</span>
    </ui-lib-stack>
  </ui-lib-stack>
</ui-lib-grid>`;

  readonly timelineSnippet = `<ui-lib-stack spacing="sm">
  <ui-lib-stack spacing="xs" class="demo-card">
    <strong>Sign up</strong>
    <p class="no-margin">Describe what happens in this phase.</p>
  </ui-lib-stack>
  <!-- Onboard, Configure, Launch -->
</ui-lib-stack>`;

  readonly masonrySnippet = `<ui-lib-grid spacing="md" minColumnWidth="220px">
  <div class="demo-card">
    <h4 class="no-margin">Alpha</h4>
    <p class="no-margin">Responsive auto-fit grid.</p>
  </div>
  <!-- more cards -->
</ui-lib-grid>`;

  tabValue(id: ExampleId): ExampleTab {
    return this.exampleTabs[id]();
  }

  onTabChange(id: ExampleId, value: TabsValue | null): void {
    if (value === null) return;
    this.exampleTabs[id].set(value as ExampleTab);
  }
}

type ExampleTab = 'example' | 'code';
type ExampleId =
  | 'hero'
  | 'features'
  | 'kpis'
  | 'sidebar'
  | 'pricing'
  | 'cta'
  | 'timeline'
  | 'masonry';
