import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { NgForm } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { Button } from 'ui-lib-custom/button';
import { EditorComponent, EditorToolbarDirective } from 'ui-lib-custom/editor';
import type { EditorSelectionChangeEvent, EditorTextChangeEvent } from 'ui-lib-custom/editor';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  readonlyHtml,
  readonlyTs,
  customToolbarHtml,
  customToolbarTs,
  templateDrivenHtml,
  templateDrivenTs,
  reactiveHtml,
  reactiveTs,
  variantsHtml,
  variantsTs,
  sizesHtml,
  sizesTs,
  filledHtml,
  filledTs,
  disabledHtml,
  disabledTs,
  eventsHtml,
  eventsTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
/**
 * Demo page for Editor component usage, forms integration, and event behavior.
 */
@Component({
  selector: 'app-editor-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Button,
    EditorComponent,
    EditorToolbarDirective,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './editor-demo.component.html',
  styleUrl: './editor-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly readonlyHtml: string = readonlyHtml;
  public readonly readonlyTs: string = readonlyTs;
  public readonly customToolbarHtml: string = customToolbarHtml;
  public readonly customToolbarTs: string = customToolbarTs;
  public readonly templateDrivenHtml: string = templateDrivenHtml;
  public readonly templateDrivenTs: string = templateDrivenTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly filledHtml: string = filledHtml;
  public readonly filledTs: string = filledTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly eventsHtml: string = eventsHtml;
  public readonly eventsTs: string = eventsTs;

  public readonly importCode: string = "import { EditorComponent } from 'ui-lib-custom/editor'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'readonly', label: 'Readonly' },
    { id: 'custom-toolbar', label: 'Custom Toolbar' },
    { id: 'template-driven', label: 'Template-Driven Form' },
    { id: 'reactive', label: 'Reactive Form' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'filled', label: 'Filled' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'events', label: 'Events' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public basicContent: string = '<p>Welcome to the <strong>Editor</strong>.</p>';
  public readonly readonlyContent: string =
    '<h2>Readonly Example</h2><p><strong>Important</strong> details:</p><ul><li>Item one</li><li>Item two</li></ul>';
  public customToolbarContent: string = '<p>Use the projected toolbar controls.</p>';

  public templateDrivenContent: string = '';
  public templateDrivenSubmittedHtml: string | null = null;

  public readonly reactiveForm: FormGroup<{ content: FormControl<string | null> }> = new FormGroup<{
    content: FormControl<string | null>;
  }>({
    content: new FormControl<string | null>('', { validators: [Validators.required] }),
  });
  public reactiveSubmittedHtml: string | null = null;

  public readonly variantValues: { material: string; bootstrap: string; minimal: string } = {
    material: '<p>Material variant content.</p>',
    bootstrap: '<p>Bootstrap variant content.</p>',
    minimal: '<p>Minimal variant content.</p>',
  };

  public readonly sizeValues: { sm: string; md: string; lg: string } = {
    sm: '<p>Small editor.</p>',
    md: '<p>Medium editor.</p>',
    lg: '<p>Large editor.</p>',
  };

  public filledContent: string = '<p>Filled mode editor.</p>';
  public readonly disabledContent: string = '<p>This editor is disabled.</p>';

  public eventsContent: string = '<p>Select text and type to emit events.</p>';
  public readonly eventLog: string[] = [];

  public submitTemplateDriven(form: NgForm): void {
    form.control.markAllAsTouched();
    if (form.invalid) {
      this.templateDrivenSubmittedHtml = null;
      return;
    }

    this.templateDrivenSubmittedHtml = this.templateDrivenContent;
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    if (this.reactiveForm.invalid) {
      this.reactiveSubmittedHtml = null;
      return;
    }

    this.reactiveSubmittedHtml = this.reactiveForm.controls.content.value;
  }

  public onCustomHeadingChange(editor: EditorComponent, event: Event): void {
    const selectElement: HTMLSelectElement | null =
      event.target instanceof HTMLSelectElement ? event.target : null;
    if (!selectElement) {
      return;
    }

    editor.executeCommand('formatBlock', selectElement.value);
  }

  public onToolbarMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  public onTextChange(event: EditorTextChangeEvent): void {
    const htmlPreview: string = event.htmlValue.replace(/\s+/g, ' ').trim().slice(0, 120);
    this.appendEventLog(`textChange: ${htmlPreview || '(empty)'}`);
  }

  public onSelectionChange(event: EditorSelectionChangeEvent): void {
    const selectionText: string = event.selection?.toString().trim() ?? '';
    this.appendEventLog(`selectionChange: ${selectionText || '(collapsed or empty)'}`);
  }

  public clearEventLog(): void {
    this.eventLog.length = 0;
  }

  private appendEventLog(message: string): void {
    const timestamp: string = new Date().toLocaleTimeString();
    this.eventLog.unshift(`${timestamp} - ${message}`);
    if (this.eventLog.length > 12) {
      this.eventLog.length = 12;
    }
  }

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Editor size.' },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Placeholder text in the empty editor.',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the editor read-only.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the editor.' },
    {
      name: 'filled',
      type: 'boolean',
      default: 'false',
      description: 'Applies a filled background style.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'ARIA label for the editor region.',
    },
  ];
}
