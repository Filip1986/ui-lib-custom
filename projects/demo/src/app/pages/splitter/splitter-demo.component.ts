import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';

/**
 * Placeholder demo page for the upcoming Splitter component.
 */
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
/**
 *
 */
@Component({
  selector: 'app-splitter-demo',
  standalone: true,
  imports: [
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
  ],
  templateUrl: './splitter-demo.component.html',
  styleUrl: './splitter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterDemoComponent {
  public readonly importCode: string = "import { Splitter } from 'ui-lib-custom/splitter'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: '(coming soon)',
      type: '—',
      description: 'This component is under development. API will be documented on release.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Resize handle (gutter)',
      attribute: 'role="separator"',
      value: '—',
      notes:
        'The draggable gutter between panels is a <code>separator</code> so assistive technologies announce it as a resizable divider.',
    },
    {
      element: 'Resize handle',
      attribute: 'aria-valuenow',
      value: '0–100',
      notes: 'Current size of the first panel as a percentage.',
    },
    {
      element: 'Resize handle',
      attribute: 'aria-valuemin / aria-valuemax',
      value: '0 / 100',
      notes: 'Defines the allowed resize range.',
    },
    {
      element: 'Resize handle',
      attribute: 'tabindex="0"',
      value: '—',
      notes: 'The gutter is focusable so keyboard users can resize the panels.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the resize handle (gutter).' },
    { key: 'Arrow Left / Arrow Up', action: "Decreases the first panel's size by one step." },
    { key: 'Arrow Right / Arrow Down', action: "Increases the first panel's size by one step." },
    { key: 'Home', action: 'Collapses the first panel to its minimum size.' },
    { key: 'End', action: 'Expands the first panel to its maximum size.' },
  ];
}
