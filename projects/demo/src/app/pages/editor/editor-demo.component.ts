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
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { EditorComponent, EditorToolbarDirective } from 'ui-lib-custom/editor';
import type { EditorSelectionChangeEvent, EditorTextChangeEvent } from 'ui-lib-custom/editor';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
type EditorDemoSnippetKey =
  | 'basic'
  | 'readonly'
  | 'customToolbar'
  | 'templateDriven'
  | 'reactive'
  | 'variants'
  | 'sizes'
  | 'filled'
  | 'disabled'
  | 'events';

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
    CodeSnippet,
    EditorComponent,
    EditorToolbarDirective,
    DocCodeExampleComponent,
  ],
  templateUrl: './editor-demo.component.html',
  styleUrl: './editor-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDemoComponent {
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

  public readonly snippets: Record<EditorDemoSnippetKey, string> = {
    basic: `<ui-lib-editor [(ngModel)]="basicHtml" placeholder="Write something..."></ui-lib-editor>
<pre>{{ basicHtml }}</pre>`,
    readonly: `<ui-lib-editor [readonly]="true" [ngModel]="readonlyHtml"></ui-lib-editor>`,
    customToolbar: `<ui-lib-editor #editor [(ngModel)]="customToolbarHtml">
  <div editorToolbar>
    <select
      [value]="editor.toolbarState().blockFormat"
      (mousedown)="$event.preventDefault()"
      (change)="onCustomHeadingChange(editor, $event)"
    >
      <option value="p">Normal</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
    </select>

    <button
      type="button"
      [attr.aria-pressed]="editor.toolbarState().bold"
      (mousedown)="$event.preventDefault()"
      (click)="editor.executeCommand('bold')"
    >
      B
    </button>
  </div>
</ui-lib-editor>`,
    templateDriven: `<form #f="ngForm" (ngSubmit)="submitTemplateDriven(f)">
  <ui-lib-editor
    name="templateContent"
    required
    [(ngModel)]="templateDrivenHtml"
  ></ui-lib-editor>
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-editor formControlName="content"></ui-lib-editor>
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
    variants: `<ui-lib-editor variant="material" [(ngModel)]="variantValues.material"></ui-lib-editor>
<ui-lib-editor variant="bootstrap" [(ngModel)]="variantValues.bootstrap"></ui-lib-editor>
<ui-lib-editor variant="minimal" [(ngModel)]="variantValues.minimal"></ui-lib-editor>`,
    sizes: `<ui-lib-editor size="sm" [(ngModel)]="sizeValues.sm"></ui-lib-editor>
<ui-lib-editor size="md" [(ngModel)]="sizeValues.md"></ui-lib-editor>
<ui-lib-editor size="lg" [(ngModel)]="sizeValues.lg"></ui-lib-editor>`,
    filled: `<ui-lib-editor [filled]="true" [(ngModel)]="filledHtml"></ui-lib-editor>`,
    disabled: `<ui-lib-editor [disabled]="true" [ngModel]="disabledHtml"></ui-lib-editor>`,
    events: `<ui-lib-editor
  [(ngModel)]="eventsHtml"
  (textChange)="onTextChange($event)"
  (selectionChange)="onSelectionChange($event)"
></ui-lib-editor>`,
  };

  public basicHtml: string = '<p>Welcome to the <strong>Editor</strong>.</p>';
  public readonly readonlyHtml: string =
    '<h2>Readonly Example</h2><p><strong>Important</strong> details:</p><ul><li>Item one</li><li>Item two</li></ul>';
  public customToolbarHtml: string = '<p>Use the projected toolbar controls.</p>';

  public templateDrivenHtml: string = '';
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

  public filledHtml: string = '<p>Filled mode editor.</p>';
  public readonly disabledHtml: string = '<p>This editor is disabled.</p>';

  public eventsHtml: string = '<p>Select text and type to emit events.</p>';
  public readonly eventLog: string[] = [];

  private readonly snippetsTs: Record<EditorDemoSnippetKey, string> = {
    basic: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public basicHtml: string = '<p>Welcome to the <strong>Editor</strong>.</p>';
}`,
    readonly: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly readonlyHtml: string = '<h2>Readonly</h2><p><strong>Important</strong> details.</p>';
}`,
    customToolbar: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent, EditorToolbarDirective } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent, EditorToolbarDirective],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public customToolbarHtml: string = '<p>Use the projected toolbar controls.</p>';

  public onCustomHeadingChange(editor: EditorComponent, event: Event): void {
    const selectElement = event.target instanceof HTMLSelectElement ? event.target : null;
    if (!selectElement) return;
    editor.executeCommand('formatBlock', selectElement.value);
  }
}`,
    templateDriven: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { NgForm } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent, Button],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public templateDrivenHtml: string = '';

  public submitTemplateDriven(form: NgForm): void {
    form.control.markAllAsTouched();
  }
}`,
    reactive: `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, EditorComponent, Button],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    content: new FormControl<string | null>('', { validators: [Validators.required] }),
  });
}`,
    variants: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly variantValues = {
    material: '<p>Material variant content.</p>',
    bootstrap: '<p>Bootstrap variant content.</p>',
    minimal: '<p>Minimal variant content.</p>',
  };
}`,
    sizes: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly sizeValues = {
    sm: '<p>Small editor.</p>',
    md: '<p>Medium editor.</p>',
    lg: '<p>Large editor.</p>',
  };
}`,
    filled: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public filledHtml: string = '<p>Filled mode editor.</p>';
}`,
    disabled: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly disabledHtml: string = '<p>This editor is disabled.</p>';
}`,
    events: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import type { EditorTextChangeEvent, EditorSelectionChangeEvent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public eventsHtml: string = '<p>Select text and type to emit events.</p>';

  public onTextChange(event: EditorTextChangeEvent): void {
    console.log('textChange', event.htmlValue);
  }

  public onSelectionChange(event: EditorSelectionChangeEvent): void {
    console.log('selectionChange', event.selection?.toString());
  }
}`,
  };

  public snippet(key: EditorDemoSnippetKey): string {
    return this.snippets[key];
  }

  public snippetTs(key: EditorDemoSnippetKey): string {
    return this.snippetsTs[key];
  }

  public submitTemplateDriven(form: NgForm): void {
    form.control.markAllAsTouched();
    if (form.invalid) {
      this.templateDrivenSubmittedHtml = null;
      return;
    }

    this.templateDrivenSubmittedHtml = this.templateDrivenHtml;
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
}
