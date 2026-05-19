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
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { SplitButtonComponent, SplitButtonContentDirective } from 'ui-lib-custom/split-button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
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
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
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

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Label for the primary action button.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'Icon for the primary button.',
    },
    {
      name: 'iconPos',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Primary icon position.',
    },
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      description: 'Array of dropdown menu items.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both buttons.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    {
      name: 'appendTo',
      type: "'body' | string",
      default: "'body'",
      description: 'Portal target element.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class.',
    },
    {
      name: 'tabindex',
      type: 'number',
      default: '0',
      description: 'Tab order of the primary button.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label for the primary button.',
    },
  ];

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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'api', label: 'API Reference' },
  ];

  // -------------------------------------------------------------------------
  // Keyboard navigation rows
  // -------------------------------------------------------------------------

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab / Shift+Tab', action: 'Move focus between the main button and menu trigger.' },
    { key: 'Space / Enter', target: 'Main button', action: 'Execute the primary action.' },
    { key: 'Space / Enter / ↓', target: 'Menu trigger', action: 'Open the dropdown menu.' },
    { key: 'Escape', action: 'Close the open menu and return focus to the menu trigger.' },
    { key: '↓ / ↑', action: 'Navigate between menu items.' },
    { key: 'Home / End', action: 'Jump to first / last menu item.' },
    { key: 'Space / Enter', target: 'Menu item', action: 'Activate the focused menu item.' },
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

  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string', default: "''", description: 'Main button label text.' },
    { name: 'model', type: 'SplitButtonItem[]', default: '[]', description: 'Menu item list.' },
    {
      name: 'severity',
      type: 'SplitButtonSeverity',
      default: "'primary'",
      description: 'Visual severity token.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size scale for button pair.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both buttons.' },
  ];
}
