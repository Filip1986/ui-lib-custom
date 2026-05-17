import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'ui-lib-custom/card';
import type { CardElevation } from 'ui-lib-custom/card';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { SHADOWS } from 'ui-lib-custom/tokens';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

interface ElevationExample {
  level: number;
  label: string;
  token: ShadowKey;
  elevation: CardElevation;
  description: string;
}

type ShadowKey = keyof typeof SHADOWS;
type TabKey = 'playground' | 'api-reference' | 'usage';

/**
 * Demo page for shadow tokens and examples.
 */
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
    DocTocComponent,
    CodeSnippet,
  ],
  templateUrl: './shadows.component.html',
  styleUrl: './shadows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowsComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly snippets: { readonly usage: string } = {
    usage: `/* Use CSS var with your component */
.my-card {
  box-shadow: var(--uilib-card-shadow-medium);
}

/* Or apply a specific token */
.my-surface {
  box-shadow: var(--uilib-shadow-4);
}`,
  } as const;

  public readonly shadowValues: Record<ShadowKey, string> = SHADOWS as Record<ShadowKey, string>;

  private readonly shadowEntries: Array<[ShadowKey, string]> = Object.entries(
    this.shadowValues
  ) as Array<[ShadowKey, string]>;

  public readonly examples: ElevationExample[] = this.shadowEntries
    .filter(([key]: [ShadowKey, string]): boolean => key.startsWith('shadow-'))
    .map(([key, value]: [ShadowKey, string]): ElevationExample => {
      const level: number = Number(key.split('-')[1]);
      return {
        level,
        label: `Shadow ${level}`,
        token: key,
        elevation: 'none' as CardElevation,
        description: value,
      } satisfies ElevationExample;
    })
    .sort((a: ElevationExample, b: ElevationExample): number => a.level - b.level);
}
