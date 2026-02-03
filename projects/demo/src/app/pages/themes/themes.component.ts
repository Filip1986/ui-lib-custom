import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Badge, Button, Card, Inline, UiLibInput, Tabs, Tab, TabsValue } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { ThemeConfigService } from 'ui-lib-custom';
import { Router } from '@angular/router';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

type TabKey = 'playground' | 'api-reference' | 'usage';

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
  private readonly themeService = inject(ThemeConfigService);
  private readonly router = inject(Router);

  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
  ];

  themeName = signal<string>(this.themeService.preset().name ?? 'theme');
  status = signal('');
  activeTab = signal<TabKey>('playground');

  saveTheme(): void {
    const name = this.themeName().trim();
    if (!name) {
      this.status.set('Enter a name before saving');
      return;
    }
    this.themeService.saveToLocalStorage(name);
    this.status.set(`Saved theme as "${name}"`);
  }

  goToProjectStarter(): void {
    this.router.navigate(['/project-starter']);
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null) {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  readonly snippets = {
    usage: `<!-- Toggle data-theme on html/body or a container -->
<button (click)="isDark = !isDark">Toggle theme</button>
<div [attr.data-theme]="isDark ? 'dark' : 'light'">
  <ui-lib-button color="primary">Themed button</ui-lib-button>
</div>`,
  } as const;
}
