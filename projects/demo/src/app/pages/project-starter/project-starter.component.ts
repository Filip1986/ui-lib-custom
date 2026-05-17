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
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

type TabKey = 'playground' | 'api-reference' | 'usage' | 'local-install';

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
    CodeSnippet,
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
    { id: 'local-install', label: 'Local Install' },
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

  public readonly snippets: {
    readonly usage: string;
    readonly buildLib: string;
    readonly npmLink1: string;
    readonly npmLink2: string;
    readonly npmLinkImport: string;
    readonly filePath: string;
    readonly publishPackageJson: string;
    readonly publishSteps: string;
    readonly globalStyles: string;
    readonly tooltipStyles: string;
  } = {
    usage: `import { ThemeConfigService } from 'ui-lib-custom/theme';

constructor(private theme: ThemeConfigService) {}

saveTheme(name: string) {
  this.theme.saveToLocalStorage(name);
}

loadTheme(name: string) {
  this.theme.loadFromLocalStorage(name);
}`,
    buildLib: `# Inside the ui-lib-custom workspace
npm run build`,
    npmLink1: `# ⚠️  Run npm link from INSIDE dist/ui-lib-custom, not from the repo root.
# The symlink must resolve to the dist directory so Angular's compiler
# finds the package.json exports map. Linking from the repo root gives
# a bare package.json with no exports and breaks template type-checking.

cd dist/ui-lib-custom
npm link`,
    npmLink2: `# Inside your other Angular project
npm link ui-lib-custom`,
    npmLinkImport: `// your-component.ts
import { Component } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Tooltip } from 'ui-lib-custom/tooltip';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Tooltip],
  template: \`
    <ui-lib-button
      uiLibTooltip="Saves your work"
      tooltipPosition="bottom">
      Save
    </ui-lib-button>
  \`
})
export class ExampleComponent {}`,
    filePath: `// package.json in your other project
{
  "dependencies": {
    "ui-lib-custom": "file:../ui-lib-custom/dist/ui-lib-custom"
  }
}

// Then run:
// npm install`,
    publishPackageJson: `// projects/ui-lib-custom/package.json
{
  "name": "@your-org/ui-lib-custom",
  "version": "1.0.0"
}`,
    publishSteps: `# Build for production
npm run build

# Publish from the dist output
cd dist/ui-lib-custom
npm login
npm publish --access public

# Install in any project
npm install @your-org/ui-lib-custom`,
    globalStyles: `/* src/styles.scss — theme tokens (required) */
@import 'ui-lib-custom/themes/themes.css';`,
    tooltipStyles: `/* src/styles.scss — body-level directive styles (add once per directive used)
 *
 * Tooltip (and similar directives) append their element to document.body,
 * so their styles must be global — they cannot live inside a component's
 * encapsulated stylesheet.
 *
 * Until these SCSS files land in the published dist/styles/ folder,
 * reference them via a relative path from your global stylesheet
 * to the library source directory:
 */
@use '../../ui-lib-custom/projects/ui-lib-custom/src/lib/tooltip/tooltip.scss';`,
  } as const;
}
