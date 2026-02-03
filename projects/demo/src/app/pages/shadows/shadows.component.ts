import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardElevation, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { SHADOWS } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

interface ElevationExample {
  level: number;
  label: string;
  token: ShadowKey;
  elevation: CardElevation;
  description: string;
}

type ShadowKey = keyof typeof SHADOWS;
type TabKey = 'playground' | 'api-reference' | 'usage';

@Component({
  selector: 'app-shadows',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './shadows.component.html',
  styleUrl: './shadows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowsComponent {
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

  readonly snippets = {
    usage: `/* Use CSS var with your component */
.my-card {
  box-shadow: var(--uilib-card-shadow-medium);
}

/* Or apply a specific token */
.my-surface {
  box-shadow: var(--uilib-shadow-4);
}`,
  } as const;

  readonly shadowValues: Record<ShadowKey, string> = SHADOWS as Record<ShadowKey, string>;

  readonly examples: ElevationExample[] = Object.entries(this.shadowValues)
    .filter(([key]) => key.startsWith('shadow-'))
    .map(([key, value]) => {
      const level = Number(key.split('-')[1]);
      return {
        level,
        label: `Shadow ${level}`,
        token: key as ShadowKey,
        elevation: 'none' as CardElevation,
        description: value,
      } satisfies ElevationExample;
    })
    .sort((a, b) => a.level - b.level);
}
