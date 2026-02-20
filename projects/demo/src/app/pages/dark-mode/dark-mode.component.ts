import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Accordion,
  AccordionPanel,
  Badge,
  Button,
  Card,
  Checkbox,
  Tabs,
  Tab,
  ThemeConfigService,
  ThemeMode,
  UiLibInput,
  UiLibSelect,
  SelectOption,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-dark-mode-demo',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Card,
    Badge,
    Accordion,
    AccordionPanel,
    Tabs,
    Tab,
    UiLibSelect,
    UiLibInput,
    Checkbox,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeComponent {
  private readonly themeService = inject(ThemeConfigService);

  readonly mode = computed<ThemeMode>(() => this.themeService.mode());
  readonly effectiveTheme = computed<'light' | 'dark'>(() => this.themeService.effectiveTheme());
  readonly systemPreference = signal<'light' | 'dark'>('light');

  readonly sections: DocSection[] = [
    { id: 'mode', label: 'Theme Mode' },
    { id: 'showcase', label: 'Component Showcase' },
    { id: 'implementation', label: 'Implementation' },
  ];

  readonly selectOptions: SelectOption[] = [
    { label: 'Option One', value: 'one' },
    { label: 'Option Two', value: 'two' },
    { label: 'Option Three', value: 'three' },
  ];

  readonly usageCode: string = `import { ThemeConfigService, ThemeMode } from 'ui-lib-custom';

@Component({
  // ...
})
export class Example {
  constructor(private readonly themeService: ThemeConfigService) {}

  setMode(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }
}`;

  readonly cssCode: string = `[data-theme="dark"] {
  --uilib-surface: #1e1e1e;
  --uilib-page-bg: #121212;
  --uilib-page-fg: rgba(255, 255, 255, 0.87);
}`;

  constructor() {
    if (typeof window !== 'undefined') {
      this.systemPreference.set(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      );
    }
  }

  setMode(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
