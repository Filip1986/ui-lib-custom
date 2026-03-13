import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { UiLibInput } from 'ui-lib-custom/input';
import { UiLibSelect } from 'ui-lib-custom/select';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

type TabKey = 'playground' | 'api-reference' | 'usage';

/**
 * Demo page for project starter guidance.
 */
@Component({
  selector: 'app-project-starter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Tabs,
    Tab,
    Card,
    Button,
    UiLibInput,
    UiLibSelect,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './project-starter.component.html',
  styleUrl: './project-starter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectStarterComponent {
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly themeName: WritableSignal<string> = signal<string>('my-theme');
  public readonly savedThemes: WritableSignal<string[]> = signal<string[]>([]);
  public readonly selectedSaved: WritableSignal<string> = signal<string>('');
  public readonly message: WritableSignal<string> = signal<string>('');

  public readonly sampleOptions: { label: string; value: string }[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ];

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  constructor() {
    this.refreshSaved();
  }

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public saveTheme(): void {
    const name: string = this.themeName().trim();
    if (!name) return;
    this.themeService.saveToLocalStorage(name);
    this.refreshSaved();
    this.message.set(`Saved theme as "${name}"`);
  }

  public loadTheme(name: string): void {
    if (!name) return;
    this.themeService.loadFromLocalStorage(name);
    this.themeName.set(name);
    this.message.set(`Loaded theme "${name}"`);
  }

  public deleteTheme(name: string): void {
    this.themeService.deleteSavedTheme(name);
    if (this.selectedSaved() === name) {
      this.selectedSaved.set('');
    }
    this.refreshSaved();
    this.message.set(`Deleted theme "${name}"`);
  }

  public async importTheme(fileList: FileList | null): Promise<void> {
    const file: File | null = fileList?.item(0) ?? null;
    if (!file) return;
    await this.themeService.importFromJSON(file);
    this.refreshSaved();
    this.message.set(`Imported theme from ${file.name}`);
  }

  public exportStarterPackage(): void {
    const preset: ReturnType<ThemeConfigService['getPreset']> = this.themeService.getPreset();
    const json: string = this.themeService.exportAsJSON(preset);
    const css: string = this.themeService.exportAsCSS(preset);
    const scss: string = this.themeService.exportAsScss(preset);
    const readme: string = this.buildReadme(this.themeName().trim() || preset.name);
    this.saveFile('theme.json', json, 'application/json');
    this.saveFile('theme.css', css, 'text/css');
    this.saveFile('_theme-variables.scss', scss, 'text/x-scss');
    this.saveFile('README.md', readme, 'text/markdown');
    this.message.set('Starter package downloaded');
  }

  private buildReadme(name: string): string {
    const escapedName: string = name || 'theme';
    return (
      `# ${escapedName} Theme Starter\n\n` +
      `Files included:\n- theme.json (UI Lib theme preset)\n- theme.css (CSS variables)\n- _theme-variables.scss (SCSS variables)\n\n` +
      `## Usage\n\n` +
      `1. Copy files into your project (e.g., \`src/styles/themes/${escapedName}\`).\n` +
      `2. Include \`theme.css\` globally or scope via \`[data-theme]\`.\n` +
      `3. If using SCSS, import \`_theme-variables.scss\` to access variables:\n\n` +
      `\`\`\`scss\n@use '_theme-variables' as *;\n:root {\n  --uilib-color-primary-500: $uilib-color-primary-500;\n}\n\`\`\`\n\n` +
      `4. For runtime switching, load \`theme.json\` via \`ThemeConfigService.loadPresetAsync\` or \`loadFromLocalStorage\`.`
    );
  }

  private saveFile(filename: string, content: string, type: string): void {
    const blob: Blob = new Blob([content], { type });
    const url: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private refreshSaved(): void {
    this.savedThemes.set(this.themeService.listSavedThemes());
  }

  public readonly snippets: { readonly usage: string } = {
    usage: `import { ThemeConfigService } from 'ui-lib-custom';

constructor(private theme: ThemeConfigService) {}

saveTheme(name: string) {
  this.theme.saveToLocalStorage(name);
}

loadTheme(name: string) {
  this.theme.loadFromLocalStorage(name);
}`,
  } as const;
}
