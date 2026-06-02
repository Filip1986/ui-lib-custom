import type { WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Panel } from 'ui-lib-custom/panel';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Tab, Tabs } from 'ui-lib-custom/tabs';

import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
/**
 * Demo section for design tokens usage.
 */
@Component({
  selector: 'app-layout-design-tokens-section',
  standalone: true,
  imports: [
    Panel,
    Tabs,
    Tab,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './design-tokens-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'design-tokens', label: 'Design Tokens' }];

  public readonly usageSnippet: string = `
:root {
  --uilib-spacing-md: 16px;
  --uilib-inset-lg: 24px;
}
`;

  public readonly usageSnippetTs: string = `import { Component } from '@angular/core';
import { Stack } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [Stack],
  templateUrl: './my.component.html',
  styles: [\`
    :host {
      /* Override spacing tokens per component */
      --uilib-spacing-md: 20px;
    }
  \`],
})
export class MyComponent {}`;

  public readonly activeTab: WritableSignal<'demo' | 'usage' | 'api'> = signal<
    'demo' | 'usage' | 'api'
  >('demo');

  public setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }
}
