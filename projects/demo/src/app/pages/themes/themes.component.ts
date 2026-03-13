import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Badge } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Inline } from 'ui-lib-custom/layout';
import { UiLibInput } from 'ui-lib-custom/input';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { Router } from '@angular/router';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

type TabKey = 'playground' | 'api-reference' | 'usage';

/**
 * Demo page for theme presets and switching.
 */
@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Tabs,
    Tab,
    Card,
    Button,
    Badge,
    Inline,
    UiLibInput,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemesComponent {
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);
  private readonly router: Router = inject(Router);

  private readonly initialThemeName: string =
    this.themeService.preset().name.length > 0 ? this.themeService.preset().name : 'theme';

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly themeName: WritableSignal<string> = signal<string>(this.initialThemeName);
  public readonly status: WritableSignal<string> = signal<string>('');
  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public saveTheme(): void {
    const name: string = this.themeName().trim();
    if (!name) {
      this.status.set('Enter a name before saving');
      return;
    }
    this.themeService.saveToLocalStorage(name);
    this.status.set(`Saved theme as "${name}"`);
  }

  public goToProjectStarter(): void {
    void this.router.navigate(['/project-starter']).catch((err: unknown): void => {
      console.error(err);
    });
  }

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly snippets: { readonly usage: string } = {
    usage: `<!-- Toggle data-theme on html/body or a container -->
<button (click)="isDark = !isDark">Toggle theme</button>
<div [attr.data-theme]="isDark ? 'dark' : 'light'">
  <ui-lib-button color="primary">Themed button</ui-lib-button>
</div>`,
  } as const;
}
