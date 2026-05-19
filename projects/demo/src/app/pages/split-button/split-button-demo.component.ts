import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  type WritableSignal,
} from '@angular/core';
import type { Signal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Icon } from 'ui-lib-custom/icon';
import { SplitButtonComponent, SplitButtonContentDirective } from 'ui-lib-custom/split-button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { Panel } from 'ui-lib-custom/panel';
import type {
  SplitButtonItem,
  SplitButtonItemCommandEvent,
  SplitButtonSeverity,
} from 'ui-lib-custom/split-button';

/**
 * Demo page for SplitButton variants, states, templating, and accessibility guidance.
 */
@Component({
  selector: 'app-split-button-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    Icon,
    CodeSnippet,
    SplitButtonComponent,
    SplitButtonContentDirective,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './split-button-demo.component.html',
  styleUrl: './split-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitButtonDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string =
    "import { SplitButtonComponent } from 'ui-lib-custom/split-button'";

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'icons', label: 'Icons' },
    { id: 'severity', label: 'Severity' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'raised', label: 'Raised' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'text', label: 'Text' },
    { id: 'raised-text', label: 'Raised Text' },
    { id: 'outlined', label: 'Outlined' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'template', label: 'Template' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  public readonly severities: readonly SplitButtonSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'help',
    'danger',
    'contrast',
  ];

  public readonly snippets: Record<string, string> = {
    basic: `<ui-lib-split-button label="Save" [model]="items" (onClick)="onPrimaryAction()" />`,
    icons: `<ui-lib-split-button label="Add" icon="plus" [model]="items" />`,
    severity: `<ui-lib-split-button
  [label]="severity"
  [severity]="severity"
  [model]="items"
/>`,
    disabled: `<ui-lib-split-button label="Disabled" [model]="items" [disabled]="true" />
<ui-lib-split-button label="Main disabled" [model]="items" [buttonDisabled]="true" />
<ui-lib-split-button label="Menu disabled" [model]="items" [menuButtonDisabled]="true" />`,
    raised: `<ui-lib-split-button [label]="severity" [severity]="severity" [raised]="true" [model]="items" />`,
    rounded: `<ui-lib-split-button [label]="severity" [severity]="severity" [rounded]="true" [model]="items" />`,
    text: `<ui-lib-split-button [label]="severity" [severity]="severity" [text]="true" [model]="items" />`,
    raisedText: `<ui-lib-split-button [label]="severity" [severity]="severity" [raised]="true" [text]="true" [model]="items" />`,
    outlined: `<ui-lib-split-button [label]="severity" [severity]="severity" [outlined]="true" [model]="items" />`,
    sizes: `<ui-lib-split-button label="Small" size="sm" [model]="items" />
<ui-lib-split-button label="Medium" size="md" [model]="items" />
<ui-lib-split-button label="Large" size="lg" [model]="items" />`,
    template: `<ui-lib-split-button [model]="items" menuButtonAriaLabel="Template actions">
  <ng-template splitButtonContent>
    <ui-lib-icon name="save" />
    <span>Save Template</span>
  </ng-template>
</ui-lib-split-button>`,
  };

  public readonly lastAction: WritableSignal<string> = signal<string>('No action yet.');

  public readonly items: SplitButtonItem[] = [
    {
      label: 'Update',
      icon: 'pencil',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
    {
      label: 'Delete',
      icon: 'trash',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
    {
      label: 'Copy Link',
      icon: 'link',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
    { separator: true },
    {
      label: 'Help',
      icon: 'help',
      tooltip: 'Open help',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
  ];

  public readonly iconItems: SplitButtonItem[] = [...this.items];

  public readonly snippetsTs: Record<string, string> = {
    basic: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
    { label: 'Delete', icon: 'trash' },
  ];

  public onPrimaryAction(): void {
    console.log('Primary action triggered');
  }
}`,
    icons: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
    { label: 'Delete', icon: 'trash' },
  ];
}`,
    severity: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'success';
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
  ];
}`,
    disabled: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
    raised: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
    rounded: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
    text: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
    raisedText: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
    outlined: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
    sizes: `import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
    template: `import { Component } from '@angular/core';
import { SplitButtonComponent, SplitButtonContentDirective } from 'ui-lib-custom/split-button';
import { Icon } from 'ui-lib-custom/icon';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent, SplitButtonContentDirective, Icon],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}`,
  };

  public snippetTs(key: string): string {
    return this.snippetsTs[key] ?? '';
  }

  public snippet(key: string): string {
    return this.snippets[key] ?? '';
  }

  public onPrimaryAction(): void {
    this.lastAction.set('Primary action: Save');
  }

  public onItemAction(event: SplitButtonItemCommandEvent): void {
    const label: string = event.item.label ?? 'Unknown action';
    this.lastAction.set(`Menu action: ${label}`);
  }
}
