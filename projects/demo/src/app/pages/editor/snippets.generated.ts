/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-editor placeholder="Write something..." [(ngModel)]="basicHtml" />
<pre>{{ basicHtml }}</pre>`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public basicHtml: string = '<p>Welcome to the <strong>Editor</strong>.</p>';
}`;

export const customToolbarHtml = `<ui-lib-editor #editor [(ngModel)]="customToolbarHtml">
  <div editorToolbar>
    <select
      [value]="editor.toolbarState().blockFormat"
      (change)="onCustomHeadingChange(editor, $event)"
      (mousedown)="$event.preventDefault()"
    >
      <option value="p">Normal</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
    </select>

    <button
      type="button"
      [attr.aria-pressed]="editor.toolbarState().bold"
      (click)="editor.executeCommand('bold')"
      (mousedown)="$event.preventDefault()"
    >
      B
    </button>
  </div>
</ui-lib-editor>`;

export const customToolbarTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent, EditorToolbarDirective } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent, EditorToolbarDirective],
  templateUrl: './custom-toolbar.example.html',
})
export class MyComponent {
  public customToolbarHtml: string = '<p>Use the projected toolbar controls.</p>';

  public onCustomHeadingChange(editor: EditorComponent, event: Event): void {
    const selectElement = event.target instanceof HTMLSelectElement ? event.target : null;
    if (!selectElement) return;
    editor.executeCommand('formatBlock', selectElement.value);
  }
}`;

export const disabledHtml = `<ui-lib-editor [disabled]="true" [ngModel]="disabledHtml" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly disabledHtml: string = '<p>This editor is disabled.</p>';
}`;

export const eventsHtml = `<ui-lib-editor
  [(ngModel)]="eventsHtml"
  (selectionChange)="onSelectionChange($event)"
  (textChange)="onTextChange($event)"
/>`;

export const eventsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import type { EditorTextChangeEvent, EditorSelectionChangeEvent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './events.example.html',
})
export class MyComponent {
  public eventsHtml: string = '<p>Select text and type to emit events.</p>';

  public onTextChange(event: EditorTextChangeEvent): void {
    console.log('textChange', event.htmlValue);
  }

  public onSelectionChange(event: EditorSelectionChangeEvent): void {
    console.log('selectionChange', event.selection?.toString());
  }
}`;

export const filledHtml = `<ui-lib-editor [filled]="true" [(ngModel)]="filledHtml" />`;

export const filledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './filled.example.html',
})
export class MyComponent {
  public filledHtml: string = '<p>Filled mode editor.</p>';
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-editor formControlName="content" />
  <ui-lib-button color="primary" type="submit">Submit</ui-lib-button>
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, EditorComponent, Button],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    content: new FormControl<string | null>('', { validators: [Validators.required] }),
  });
}`;

export const readonlyHtml = `<ui-lib-editor [ngModel]="readonlyHtml" [readonly]="true" />`;

export const readonlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  public readonly readonlyHtml: string = '<h2>Readonly</h2><p><strong>Important</strong> details.</p>';
}`;

export const sizesHtml = `<ui-lib-editor size="sm" [(ngModel)]="sizeValues.sm" />
<ui-lib-editor size="md" [(ngModel)]="sizeValues.md" />
<ui-lib-editor size="lg" [(ngModel)]="sizeValues.lg" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly sizeValues = {
    sm: '<p>Small editor.</p>',
    md: '<p>Medium editor.</p>',
    lg: '<p>Large editor.</p>',
  };
}`;

export const templateDrivenHtml = `<form #f="ngForm" (ngSubmit)="submitTemplateDriven(f)">
  <ui-lib-editor name="templateContent" required [(ngModel)]="templateDrivenHtml" />
  <ui-lib-button color="primary" type="submit">Submit</ui-lib-button>
</form>`;

export const templateDrivenTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { NgForm } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent, Button],
  templateUrl: './template-driven.example.html',
})
export class MyComponent {
  public templateDrivenHtml: string = '';

  public submitTemplateDriven(form: NgForm): void {
    form.control.markAllAsTouched();
  }
}`;

export const variantsHtml = `<ui-lib-editor variant="material" [(ngModel)]="variantValues.material" />
<ui-lib-editor variant="bootstrap" [(ngModel)]="variantValues.bootstrap" />
<ui-lib-editor variant="minimal" [(ngModel)]="variantValues.minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public readonly variantValues = {
    material: '<p>Material variant content.</p>',
    bootstrap: '<p>Bootstrap variant content.</p>',
    minimal: '<p>Minimal variant content.</p>',
  };
}`;
