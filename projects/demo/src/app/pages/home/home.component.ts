import { CommonModule } from '@angular/common';
import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Badge } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Panel } from 'ui-lib-custom/panel';

import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
/**
 * Demo home page entry for the component library.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    RouterModule,
    CodeSnippet,
    Button,
    Badge,
    DocPageLayoutComponent,
    DocTocComponent,
    DocPageHeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly snippetInstall: string = `npm install @filip86/ui-components`;
  public readonly snippetImport: string = `import { Button } from '@filip86/ui-components';\n\n@Component({\n  standalone: true,\n  imports: [Button],\n  // ...\n})`;

  public readonly sections: DocSection[] = [
    { id: 'quick-links', label: 'Quick Links' },
    { id: 'features', label: 'Features' },
    { id: 'pro-teaser', label: 'Pro Edition' },
    { id: 'quick-preview', label: 'Quick Preview' },
    { id: 'theme-preview', label: 'Theme Preview' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'profiling-notes', label: 'Profiling Notes' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
