import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';
import { Badge } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeMode } from 'ui-lib-custom/theme';
import { UiLibInput } from 'ui-lib-custom/input';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { SelectOption } from 'ui-lib-custom/select';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

/**
 * Demo page for dark mode theming.
 */
@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [
    CommonModule,
    Accordion,
    AccordionPanel,
    Badge,
    Button,
    Card,
    Checkbox,
    Tabs,
    Tab,
    UiLibInput,
    UiLibSelect,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeComponent {
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly mode: Signal<ThemeMode> = computed<ThemeMode>(
    (): ThemeMode => this.themeService.mode()
  );
  public readonly effectiveTheme: Signal<'light' | 'dark'> = computed<'light' | 'dark'>(
    (): 'light' | 'dark' => this.themeService.effectiveTheme()
  );
  public readonly systemPreference: WritableSignal<'light' | 'dark'> = signal<'light' | 'dark'>(
    'light'
  );

  public readonly sections: DocSection[] = [
    { id: 'mode', label: 'Theme Mode' },
    { id: 'showcase', label: 'Component Showcase' },
    { id: 'implementation', label: 'Implementation' },
  ];

  public readonly selectOptions: SelectOption[] = [
    { label: 'Option One', value: 'one' },
    { label: 'Option Two', value: 'two' },
    { label: 'Option Three', value: 'three' },
  ];

  public readonly usageCode: string = `import { ThemeConfigService, ThemeMode } from 'ui-lib-custom';

@Component({
  // ...
})
export class Example {
  constructor(private readonly themeService: ThemeConfigService) {}

  setMode(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }
}`;

  public readonly cssCode: string = `[data-theme="dark"] {
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

  public setMode(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }

  public toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
