import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ThemeScopeDirective,
  DarkThemeDirective,
  LightThemeDirective,
  Button,
  Card,
  Badge,
  UiLibInput,
  Checkbox,
  ThemeScopeConfig,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-scoped-theming-demo',
  standalone: true,
  imports: [
    CommonModule,
    ThemeScopeDirective,
    DarkThemeDirective,
    LightThemeDirective,
    Button,
    Card,
    Badge,
    UiLibInput,
    Checkbox,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './scoped-theming.component.html',
  styleUrl: './scoped-theming.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScopedThemingComponent {
  readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic Scoped Themes' },
    { id: 'directive', label: 'Directive Usage' },
    { id: 'custom', label: 'Custom Colors' },
    { id: 'nested', label: 'Nested Scopes' },
    { id: 'usage', label: 'Usage' },
  ];

  readonly customBlueTheme: ThemeScopeConfig = {
    colors: {
      primary: '#1565c0',
      secondary: '#7b1fa2',
    },
  };

  readonly customWarmTheme: ThemeScopeConfig = {
    colors: {
      primary: '#e65100',
      secondary: '#bf360c',
    },
    variables: {
      '--uilib-card-bg': '#fff8e1',
      '--uilib-surface': '#fffde7',
    },
  };

  readonly componentThemeCode = `<!-- String shorthand -->
<ui-lib-card theme="dark">
  Dark themed card
</ui-lib-card>

<!-- Full config -->
<ui-lib-card [theme]="{ colorScheme: 'dark' }">
  Dark themed card
</ui-lib-card>`;

  readonly directiveCode = `<!-- Using directive -->
<div [uiLibTheme]="'dark'">
  <ui-lib-button>Dark button</ui-lib-button>
</div>

<!-- Shorthand directives -->
<section uiLibDarkTheme>
  <ui-lib-button>Dark button</ui-lib-button>
</section>`;

  readonly customColorsCode = `// In component
customTheme: ThemeScopeConfig = {
  colors: {
    primary: '#e65100',
    secondary: '#bf360c',
  },
  variables: {
    '--uilib-card-bg': '#fff8e1',
  },
};

// In template
<div [uiLibTheme]="customTheme">
  <ui-lib-button color="primary">Orange Button</ui-lib-button>
</div>`;
}
