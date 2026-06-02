import { CommonModule } from '@angular/common';
import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';

import { Badge } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { UiLibInput } from 'ui-lib-custom/input';
import { Panel } from 'ui-lib-custom/panel';
import type { ThemeScopeConfig } from 'ui-lib-custom/theme';
import { DarkThemeDirective, LightThemeDirective, ThemeScopeDirective } from 'ui-lib-custom/theme';

import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import {
  componentThemeCodeHtml,
  componentThemeCodeTs,
  directiveCodeHtml,
  directiveCodeTs,
} from './snippets.generated';
/**
 * Demo page for scoped theming examples.
 */
@Component({
  selector: 'app-scoped-theming-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    ThemeScopeDirective,
    DarkThemeDirective,
    LightThemeDirective,
    Button,
    Badge,
    UiLibInput,
    Checkbox,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    CodeSnippet,
    DocCodeExampleComponent,
  ],
  templateUrl: './scoped-theming.component.html',
  styleUrl: './scoped-theming.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScopedThemingComponent {
  public readonly componentThemeCodeHtml: string = componentThemeCodeHtml;
  public readonly componentThemeCodeTs: string = componentThemeCodeTs;
  public readonly directiveCodeHtml: string = directiveCodeHtml;
  public readonly directiveCodeTs: string = directiveCodeTs;

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic Scoped Themes' },
    { id: 'directive', label: 'Directive Usage' },
    { id: 'custom', label: 'Custom Colors' },
    { id: 'nested', label: 'Nested Scopes' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly customBlueTheme: ThemeScopeConfig = {
    colors: {
      primary: '#1565c0',
      secondary: '#7b1fa2',
    },
  };

  public readonly customWarmTheme: ThemeScopeConfig = {
    colors: {
      primary: '#e65100',
      secondary: '#bf360c',
    },
    variables: {
      '--uilib-card-bg': '#fff8e1',
      '--uilib-surface': '#fffde7',
    },
  };

  public readonly customColorsCode: string = `// In component
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
