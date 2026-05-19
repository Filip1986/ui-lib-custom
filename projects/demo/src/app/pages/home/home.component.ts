import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Button } from 'ui-lib-custom/button';
import { Badge } from 'ui-lib-custom/badge';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';

import { Panel } from 'ui-lib-custom/panel';
/**
 * Demo home page entry for the component library.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
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
    { id: 'quick-preview', label: 'Quick Preview' },
    { id: 'theme-preview', label: 'Theme Preview' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'profiling-notes', label: 'Profiling Notes' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
