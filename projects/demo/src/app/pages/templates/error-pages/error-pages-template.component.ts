import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

/** Free template: Error Pages (404, 500, 403) using ui-lib-custom. */
@Component({
  selector: 'app-error-pages-template',
  standalone: true,
  imports: [
    RouterModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Button,
    CodeSnippet,
  ],
  templateUrl: './error-pages-template.component.html',
  styleUrl: './error-pages-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPagesTemplateComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly activeError: WritableSignal<'404' | '500' | '403'> = signal<
    '404' | '500' | '403'
  >('404');

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'preview', label: 'Live Preview' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly codeSnippet: string = `import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Button],
  template: \`
    <div class="error-page">
      <div class="error-code">404</div>
      <h1 class="error-title">Page not found</h1>
      <p class="error-message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <ui-lib-button variant="material" label="Go home" leftIcon="pi pi-home"
        routerLink="/home" />
    </div>
  \`,
})
export class NotFoundPageComponent {}`;

  public setError(code: '404' | '500' | '403'): void {
    this.activeError.set(code);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
