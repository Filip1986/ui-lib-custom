import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
import { Icon } from 'ui-lib-custom/icon';
import { SplitButtonComponent, SplitButtonContentDirective } from 'ui-lib-custom/split-button';
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
    CommonModule,
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
    Icon,
    SplitButtonComponent,
    SplitButtonContentDirective,
  ],
  templateUrl: './split-button-demo.component.html',
  styleUrl: './split-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitButtonDemoComponent {
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
