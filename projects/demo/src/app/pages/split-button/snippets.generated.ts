/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-split-button label="Save" [model]="items" (onClick)="onPrimaryAction()" />`;

export const basicTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
    { label: 'Delete', icon: 'trash' },
  ];

  public onPrimaryAction(): void {
    console.log('Primary action triggered');
  }
}`;

export const disabledHtml = `<ui-lib-split-button label="Disabled" [model]="items" [disabled]="true" />
<ui-lib-split-button label="Main disabled" [model]="items" [buttonDisabled]="true" />
<ui-lib-split-button label="Menu disabled" [model]="items" [menuButtonDisabled]="true" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;

export const iconsHtml = `<ui-lib-split-button label="Add" icon="plus" [model]="items" />`;

export const iconsTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './icons.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
    { label: 'Delete', icon: 'trash' },
  ];
}`;

export const outlinedHtml = `<ui-lib-split-button [label]="severity" [severity]="severity" [outlined]="true" [model]="items" />`;

export const outlinedTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './outlined.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;

export const raisedTextHtml = `<ui-lib-split-button [label]="severity" [severity]="severity" [raised]="true" [text]="true" [model]="items" />`;

export const raisedTextTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './raised-text.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;

export const raisedHtml = `<ui-lib-split-button [label]="severity" [severity]="severity" [raised]="true" [model]="items" />`;

export const raisedTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './raised.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;

export const roundedHtml = `<ui-lib-split-button [label]="severity" [severity]="severity" [rounded]="true" [model]="items" />`;

export const roundedTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './rounded.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;

export const severityHtml = `<ui-lib-split-button
  [label]="severity"
  [severity]="severity"
  [model]="items"
/>`;

export const severityTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './severity.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'success';
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
  ];
}`;

export const sizesHtml = `<ui-lib-split-button label="Small" size="sm" [model]="items" />
<ui-lib-split-button label="Medium" size="md" [model]="items" />
<ui-lib-split-button label="Large" size="lg" [model]="items" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;

export const templateHtml = `<ui-lib-split-button [model]="items" menuButtonAriaLabel="Template actions">
  <ng-template splitButtonContent>
    <ui-lib-icon name="save" />
    <span>Save Template</span>
  </ng-template>
</ui-lib-split-button>`;

export const templateTs = `import { Component } from '@angular/core';
import { SplitButtonComponent, SplitButtonContentDirective } from 'ui-lib-custom/split-button';
import { Icon } from 'ui-lib-custom/icon';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent, SplitButtonContentDirective, Icon],
  templateUrl: './template.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;

export const textHtml = `<ui-lib-split-button [label]="severity" [severity]="severity" [text]="true" [model]="items" />`;

export const textTs = `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './text.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`;
