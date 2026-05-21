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
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import { DocQualityBadgeComponent } from '../../shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '../../shared/doc-page/doc-quality-badge.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';

interface AriaRow {
  readonly attribute: string;
  readonly element: string;
  readonly value: string;
  readonly notes: string;
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
    DocKeyboardNavComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './tag-demo.component.html',
  styleUrl: './tag-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-15',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
    humanPending: [
      'NVDA + Chrome — dismissible tag removal announcement',
      'VoiceOver + Safari — aria-label on dismiss button',
      'Visual contrast — tag color variants against white background',
    ],
  };

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

  public readonly apiInputRows: ApiPropRow[] = [
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

  public readonly apiOutputRows: ApiPropRow[] = [
    {
      name: 'removed',
      type: 'OutputEmitterRef<MouseEvent>',
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

  public readonly keyboardRows: KeyboardNavRow[] = [
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
    readonly severityTs: string;
    readonly sizes: string;
    readonly sizesTs: string;
    readonly rounded: string;
    readonly roundedTs: string;
    readonly icons: string;
    readonly iconsTs: string;
    readonly dismissible: string;
    readonly dismissibleTs: string;
    readonly variants: string;
    readonly variantsTs: string;
  } = {
    import: `import { Tag } from 'ui-lib-custom/tag';`,
    severity: `<ui-lib-tag value="Primary"   severity="primary" />
<ui-lib-tag value="Secondary" severity="secondary" />
<ui-lib-tag value="Success"   severity="success" />
<ui-lib-tag value="Info"      severity="info" />
<ui-lib-tag value="Warning"   severity="warn" />
<ui-lib-tag value="Danger"    severity="danger" />
<ui-lib-tag value="Contrast"  severity="contrast" />`,
    severityTs: `import { Component } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';

@Component({
  standalone: true,
  imports: [Tag],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    sizes: `<ui-lib-tag value="Small"  size="sm" severity="primary" />
<ui-lib-tag value="Medium" size="md" severity="primary" />
<ui-lib-tag value="Large"  size="lg" severity="primary" />`,
    sizesTs: `import { Component } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';

@Component({
  standalone: true,
  imports: [Tag],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    rounded: `<ui-lib-tag value="Primary" severity="primary" [rounded]="true" />
<ui-lib-tag value="Success" severity="success" [rounded]="true" />`,
    roundedTs: `import { Component } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';

@Component({
  standalone: true,
  imports: [Tag],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    icons: `<ui-lib-tag value="Primary" icon="pi pi-tag"                  severity="primary" />
<ui-lib-tag value="Success" icon="pi pi-check-circle"          severity="success" />
<ui-lib-tag value="Warning" icon="pi pi-exclamation-triangle"  severity="warn" />`,
    iconsTs: `import { Component } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';

@Component({
  standalone: true,
  imports: [Tag],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    dismissible: `<ui-lib-tag
  value="Python"
  severity="info"
  [dismissible]="true"
  (removed)="removeTag()"
/>`,
    dismissibleTs: `import { Component } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';

@Component({
  standalone: true,
  imports: [Tag],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public removeTag(): void {
    // hide or remove tag from your data model
  }
}`,
    variants: `<ui-lib-tag value="Tag" severity="primary" variant="material" />
<ui-lib-tag value="Tag" severity="primary" variant="bootstrap" />
<ui-lib-tag value="Tag" severity="primary" variant="minimal" />`,
    variantsTs: `import { Component } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';

@Component({
  standalone: true,
  imports: [Tag],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
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

  public readonly apiRows: ApiPropRow[] = [
    { name: 'value', type: 'string', default: "''", description: 'Tag label text.' },
    {
      name: 'severity',
      type: "'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'contrast' | null",
      default: 'null',
      description: 'Severity level controlling the colour preset.',
    },
    {
      name: 'rounded',
      type: 'boolean',
      default: 'false',
      description: 'Applies a fully rounded pill shape.',
    },
    { name: 'icon', type: 'string | null', default: 'null', description: 'Leading icon name.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tag size.' },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class.',
    },
  ];
}
