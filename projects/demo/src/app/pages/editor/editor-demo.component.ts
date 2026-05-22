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

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

/**
 *
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
    DocCssVarsTableComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './editor-demo.component.html',
  styleUrl: './editor-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-22',
    tier: 1,
    scores: {
      api: 8,
      a11y: 8,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 8,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

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
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
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
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-editor-toolbar-bg', description: 'Toolbar background colour.' },
    { variable: '--uilib-editor-toolbar-border-color', description: 'Toolbar Border text colour.' },
    { variable: '--uilib-editor-toolbar-item-color', description: 'Toolbar Item text colour.' },
    {
      variable: '--uilib-editor-toolbar-item-hover-color',
      description: 'Toolbar Item Hover text colour.',
    },
    {
      variable: '--uilib-editor-toolbar-item-hover-bg',
      description: 'Toolbar Item Hover background colour.',
    },
    {
      variable: '--uilib-editor-toolbar-item-active-color',
      description: 'Toolbar Item Active text colour.',
    },
    {
      variable: '--uilib-editor-toolbar-item-active-bg',
      description: 'Toolbar Item Active background colour.',
    },
    {
      variable: '--uilib-editor-toolbar-separator-color',
      description: 'Toolbar Separator text colour.',
    },
    { variable: '--uilib-editor-content-bg', description: 'Content background colour.' },
    { variable: '--uilib-editor-content-border-color', description: 'Content Border text colour.' },
    { variable: '--uilib-editor-content-color', description: 'Content text colour.' },
    { variable: '--uilib-editor-placeholder-color', description: 'Placeholder text colour.' },
    { variable: '--uilib-editor-focus-ring-color', description: 'Focus ring colour.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Editing area',
      attribute: 'role="textbox"',
      value: '—',
      notes:
        'Quill renders a <code>contenteditable</code> <code>&lt;div&gt;</code> with implicit <code>role="textbox"</code> and <code>aria-multiline="true"</code>.',
    },
    {
      element: 'Editing area',
      attribute: 'aria-label',
      value: '—',
      notes:
        'Set via the <code>[ariaLabel]</code> input. Provide a visible label or this attribute for screen readers.',
    },
    {
      element: 'Editing area (readonly)',
      attribute: 'aria-readonly="true"',
      value: '—',
      notes: 'Applied automatically when <code>[readonly]="true"</code>.',
    },
    {
      element: 'Editing area (disabled)',
      attribute: 'aria-disabled="true"',
      value: '—',
      notes: 'Applied automatically when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Toolbar',
      attribute: 'role="toolbar"',
      value: '—',
      notes:
        'The default toolbar container is marked with <code>role="toolbar"</code> and an <code>aria-label</code> of "Text formatting".',
    },
    {
      element: 'Toolbar buttons',
      attribute: 'aria-label',
      value: '—',
      notes:
        'Each toolbar button exposes its action via <code>aria-label</code> (e.g. "Bold", "Italic").',
    },
    {
      element: 'Toolbar buttons (active)',
      attribute: 'aria-pressed="true"',
      value: '—',
      notes:
        'Toggle-style buttons (Bold, Italic, …) reflect their active state via <code>aria-pressed</code>.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus into the editor area.' },
    { key: 'Ctrl + B', action: 'Toggles <strong>Bold</strong> formatting on the selected text.' },
    { key: 'Ctrl + I', action: 'Toggles <em>Italic</em> formatting on the selected text.' },
    { key: 'Ctrl + U', action: 'Toggles <u>Underline</u> formatting on the selected text.' },
    { key: 'Ctrl + Z', action: 'Undo the last change.' },
    { key: 'Ctrl + Y / Ctrl + Shift + Z', action: 'Redo the last undone change.' },
    { key: 'Ctrl + A', action: 'Select all content in the editor.' },
    { key: 'Enter', action: 'Inserts a new paragraph.' },
    {
      key: 'Shift + Enter',
      action: 'Inserts a line break (<code>&lt;br&gt;</code>) within the same paragraph.',
    },
  ];
}
