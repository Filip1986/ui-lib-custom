import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';
import type { TagSeverity, TagSize, TagVariant } from 'ui-lib-custom/tag';
import { Button } from 'ui-lib-custom/button';
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

interface TagInputRow {
  readonly name: string;
  readonly type: string;
  readonly default: string;
  readonly description: string;
}

interface TagOutputRow {
  readonly name: string;
  readonly type: string;
  readonly description: string;
}

interface AriaRow {
  readonly attribute: string;
  readonly element: string;
  readonly value: string;
  readonly notes: string;
}

interface KeyboardRow {
  readonly key: string;
  readonly target: string;
  readonly action: string;
}

/**
 * Demo page for the Tag component.
 */
@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Tag,
    Button,
    TableComponent,
    TableColumnComponent,
    TableColumnBodyDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './tag-demo.component.html',
  styleUrl: './tag-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDemoComponent {
  public readonly importCode: string = "import { Tag } from 'ui-lib-custom/tag'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'severity', label: 'Severity' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'icons', label: 'With Icons' },
    { id: 'dismissible', label: 'Dismissible' },
    { id: 'variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
      ],
    },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  // ---- API table data -------------------------------------------------------

  public readonly inputRows: TagInputRow[] = [
    {
      name: 'value',
      type: 'string | null',
      default: 'null',
      description: 'Text label rendered inside the tag.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'PrimeIcons CSS class for a leading decorative icon.',
    },
    {
      name: 'severity',
      type: "'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'",
      default: "'primary'",
      description: 'Colour palette for the tag.',
    },
    {
      name: 'rounded',
      type: 'boolean',
      default: 'false',
      description: 'Applies fully rounded (pill) corners.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the tag.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description:
        'Design variant; inherits from <code>ThemeConfigService</code> when <code>null</code>.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes added to the host element.',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: 'Renders an inline dismiss button.',
    },
    {
      name: 'removeIcon',
      type: 'string',
      default: "'pi pi-times'",
      description: 'CSS class for the dismiss button icon.',
    },
  ];

  public readonly outputRows: TagOutputRow[] = [
    {
      name: 'removed',
      type: 'OutputEmitterRef&lt;MouseEvent&gt;',
      description:
        'Emitted when the dismiss button is clicked. The tag is not auto-removed — control visibility from the parent.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-tag-bg-primary',
      default: 'var(--uilib-color-primary, #6366f1)',
      description: 'Background for <code>primary</code> severity.',
    },
    {
      variable: '--uilib-tag-color-primary',
      default: '#ffffff',
      description: 'Text colour for <code>primary</code> severity.',
    },
    {
      variable: '--uilib-tag-bg-success',
      default: 'var(--uilib-color-success, #22c55e)',
      description: 'Background for <code>success</code> severity.',
    },
    {
      variable: '--uilib-tag-color-success',
      default: '#ffffff',
      description: 'Text colour for <code>success</code> severity.',
    },
    {
      variable: '--uilib-tag-bg-danger',
      default: 'var(--uilib-color-danger, #ef4444)',
      description: 'Background for <code>danger</code> severity.',
    },
    {
      variable: '--uilib-tag-color-danger',
      default: '#ffffff',
      description: 'Text colour for <code>danger</code> severity.',
    },
    {
      variable: '--uilib-tag-border-radius',
      default: 'var(--uilib-radius-sm, 0.375rem)',
      description:
        'Border radius. Overridden to <code>9999px</code> when <code>[rounded]="true"</code>.',
    },
    {
      variable: '--uilib-tag-padding-y',
      default: '0.25rem',
      description: 'Vertical padding (md size).',
    },
    {
      variable: '--uilib-tag-padding-x',
      default: '0.5rem',
      description: 'Horizontal padding (md size).',
    },
    { variable: '--uilib-tag-font-size', default: '0.75rem', description: 'Font size (md size).' },
    { variable: '--uilib-tag-font-weight', default: '700', description: 'Font weight.' },
    {
      variable: '--uilib-tag-remove-button-size',
      default: '1.25em',
      description: 'Size of the dismiss button.',
    },
    {
      variable: '--uilib-tag-remove-button-bg-hover',
      default: 'rgba(255, 255, 255, 0.2)',
      description: 'Hover background for the dismiss button.',
    },
    {
      variable: '--uilib-tag-remove-button-transition',
      default: 'background-color 0.15s ease',
      description: 'Transition applied to the dismiss button.',
    },
  ];

  public readonly ariaRows: AriaRow[] = [
    {
      attribute: 'id',
      element: 'Host',
      value: 'ui-lib-tag-{n}',
      notes: 'Auto-generated, unique per instance.',
    },
    {
      attribute: 'role',
      element: 'Host',
      value: 'status or group',
      notes:
        '<code>status</code> by default; switches to <code>group</code> when <code>dismissible</code> is true so AT announces both the label and the button.',
    },
    {
      attribute: 'aria-label',
      element: 'Host',
      value: '{value}',
      notes: "Set to the tag's text value. Omitted when <code>value</code> is null.",
    },
    {
      attribute: 'aria-hidden',
      element: 'Leading icon',
      value: 'true',
      notes: 'Decorative icon is always hidden from assistive technology.',
    },
    {
      attribute: 'aria-label',
      element: 'Dismiss button',
      value: 'Remove {value} tag',
      notes: 'Auto-generated from <code>value</code>. Falls back to <code>Remove tag</code>.',
    },
    {
      attribute: 'aria-hidden',
      element: 'Dismiss button icon',
      value: 'true',
      notes: 'Decorative button icon is hidden from assistive technology.',
    },
  ];

  public readonly keyboardRows: KeyboardRow[] = [
    {
      key: 'Tab',
      target: 'Dismiss button',
      action: 'Moves focus to the button when <code>dismissible</code> is true.',
    },
    {
      key: 'Enter / Space',
      target: 'Dismiss button',
      action: 'Activates the native button and emits the <code>removed</code> event.',
    },
  ];

  // ---- Severity / size / variant lists ------------------------------------

  public readonly severities: TagSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warn',
    'danger',
    'contrast',
  ];

  public readonly severityLabels: Record<TagSeverity, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    success: 'Success',
    info: 'Info',
    warn: 'Warning',
    danger: 'Danger',
    contrast: 'Contrast',
  };

  public readonly sizes: TagSize[] = ['sm', 'md', 'lg'];
  public readonly variants: TagVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly snippets: {
    readonly import: string;
    readonly severity: string;
    readonly sizes: string;
    readonly rounded: string;
    readonly icons: string;
    readonly dismissible: string;
    readonly variants: string;
  } = {
    import: `import { Tag } from 'ui-lib-custom/tag';`,
    severity: `<ui-lib-tag value="Primary"   severity="primary" />
<ui-lib-tag value="Secondary" severity="secondary" />
<ui-lib-tag value="Success"   severity="success" />
<ui-lib-tag value="Info"      severity="info" />
<ui-lib-tag value="Warning"   severity="warn" />
<ui-lib-tag value="Danger"    severity="danger" />
<ui-lib-tag value="Contrast"  severity="contrast" />`,
    sizes: `<ui-lib-tag value="Small"  size="sm" severity="primary" />
<ui-lib-tag value="Medium" size="md" severity="primary" />
<ui-lib-tag value="Large"  size="lg" severity="primary" />`,
    rounded: `<ui-lib-tag value="Primary" severity="primary" [rounded]="true" />
<ui-lib-tag value="Success" severity="success" [rounded]="true" />`,
    icons: `<ui-lib-tag value="Primary" icon="pi pi-tag"                  severity="primary" />
<ui-lib-tag value="Success" icon="pi pi-check-circle"          severity="success" />
<ui-lib-tag value="Warning" icon="pi pi-exclamation-triangle"  severity="warn" />`,
    dismissible: `<ui-lib-tag
  value="Python"
  severity="info"
  [dismissible]="true"
  (removed)="removeTag()"
/>`,
    variants: `<ui-lib-tag value="Tag" severity="primary" variant="material" />
<ui-lib-tag value="Tag" severity="primary" variant="bootstrap" />
<ui-lib-tag value="Tag" severity="primary" variant="minimal" />`,
  } as const;

  // ---- Playground ---------------------------------------------------------

  public readonly playgroundValue: WritableSignal<string> = signal<string>('Tag');
  public readonly playgroundSeverity: WritableSignal<TagSeverity> = signal<TagSeverity>('primary');
  public readonly playgroundSize: WritableSignal<TagSize> = signal<TagSize>('md');
  public readonly playgroundVariant: WritableSignal<TagVariant> = signal<TagVariant>('material');
  public readonly playgroundRounded: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundIcon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly playgroundDismissible: WritableSignal<boolean> = signal<boolean>(false);

  public setSeverity(severity: TagSeverity): void {
    this.playgroundSeverity.set(severity);
  }

  public setSize(size: TagSize): void {
    this.playgroundSize.set(size);
  }

  public setVariant(variant: TagVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleRounded(): void {
    this.playgroundRounded.set(!this.playgroundRounded());
  }

  public toggleIcon(): void {
    this.playgroundIcon.set(this.playgroundIcon() ? null : 'pi pi-tag');
  }

  public toggleDismissible(): void {
    this.playgroundDismissible.set(!this.playgroundDismissible());
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
