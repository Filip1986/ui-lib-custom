import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordComponent } from 'ui-lib-custom/password';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
/** Demo page for the Password component. */
@Component({
  selector: 'app-password-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    PasswordComponent,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './password-demo.component.html',
  styleUrl: './password-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDemoComponent {
  public readonly importCode: string = "import { PasswordComponent } from 'ui-lib-custom/password'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'toggle-mask', label: 'Toggle Mask' },
    { id: 'clear-button', label: 'Clear Button' },
    { id: 'filled', label: 'Filled Appearance' },
    { id: 'no-feedback', label: 'No Strength Feedback' },
    { id: 'custom-labels', label: 'Custom Labels' },
    { id: 'states', label: 'States' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
    { id: 'fluid', label: 'Fluid' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
      ],
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly variants: string;
    readonly sizes: string;
    readonly toggleMask: string;
    readonly clearButton: string;
    readonly filled: string;
    readonly noFeedback: string;
    readonly customLabels: string;
    readonly states: string;
    readonly reactiveForms: string;
    readonly fluid: string;
  } = {
    import: `import { PasswordComponent } from 'ui-lib-custom/password';`,
    basic: `<!-- selector is uilib-password (no hyphen after "ui") -->
<label [for]="passRef.passwordId">Password</label>
<uilib-password #passRef variant="material" placeholder="Enter password" />`,
    variants: `<uilib-password variant="material"  placeholder="Material" />
<uilib-password variant="bootstrap" placeholder="Bootstrap" />
<uilib-password variant="minimal"   placeholder="Minimal" />`,
    sizes: `<uilib-password size="sm" placeholder="Small" />
<uilib-password size="md" placeholder="Medium (default)" />
<uilib-password size="lg" placeholder="Large" />`,
    toggleMask: `<uilib-password variant="material" [toggleMask]="true" placeholder="Toggle mask" />`,
    clearButton: `<!-- clear only -->
<uilib-password variant="material" [showClear]="true" placeholder="Type to see clear" />

<!-- toggle mask + clear -->
<uilib-password variant="material" [toggleMask]="true" [showClear]="true" placeholder="Both icons" />`,
    filled: `<uilib-password variant="material"  appearance="filled" placeholder="Material filled" />
<uilib-password variant="bootstrap" appearance="filled" placeholder="Bootstrap filled" />`,
    noFeedback: `<uilib-password variant="material" [feedback]="false" [toggleMask]="true" placeholder="No strength meter" />`,
    customLabels: `<uilib-password
  variant="material"
  promptLabel="Start typing…"
  weakLabel="Too simple"
  mediumLabel="Getting better"
  strongLabel="Excellent!"
  placeholder="Custom labels"
/>`,
    states: `<uilib-password variant="material" [disabled]="true" placeholder="Disabled" />
<uilib-password variant="material" [readonly]="true" placeholder="Read-only" />
<uilib-password variant="material" [invalid]="true"  placeholder="Invalid" />`,
    reactiveForms: `<label [for]="passRef.passwordId">Password (min 8 chars)</label>
<uilib-password
  #passRef
  variant="material"
  [toggleMask]="true"
  [showClear]="true"
  [invalid]="control.invalid && control.touched"
  [formControl]="control"
  placeholder="At least 8 characters"
/>`,
    fluid: `<uilib-password variant="material" [fluid]="true" [toggleMask]="true" placeholder="Full width" />`,
  } as const;

  public readonly passwordControl: FormControl<string | null> = new FormControl<string | null>(
    null,
    [Validators.required, Validators.minLength(8)]
  );

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'toggleMask',
      type: 'boolean',
      default: 'false',
      description: 'Shows eye toggle to reveal/mask the password.',
    },
    {
      name: 'feedback',
      type: 'boolean',
      default: 'true',
      description: 'Shows a strength meter overlay on focus.',
    },
    {
      name: 'promptLabel',
      type: 'string',
      default: "'Enter a password'",
      description: 'Strength meter label before any input.',
    },
    {
      name: 'weakLabel',
      type: 'string',
      default: "'Weak'",
      description: 'Strength label for weak passwords.',
    },
    {
      name: 'mediumLabel',
      type: 'string',
      default: "'Medium'",
      description: 'Strength label for medium passwords.',
    },
    {
      name: 'strongLabel',
      type: 'string',
      default: "'Strong'",
      description: 'Strength label for strong passwords.',
    },
    {
      name: 'mediumRegex',
      type: 'RegExp',
      description: 'Regex defining the medium strength threshold.',
    },
    {
      name: 'strongRegex',
      type: 'RegExp',
      description: 'Regex defining the strong strength threshold.',
    },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the input as invalid.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      default: 'false',
      description: 'Expands to fill container width.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
  ];

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
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

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Moves focus to the input, then to the toggle-mask button, then the clear button (when visible).',
    },
    {
      key: 'Enter / Space',
      action: 'Activates the toggle-mask or clear button when one of them has focus.',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description:
        'Design variant. Does <strong>not</strong> inherit from <code>ThemeConfigService</code> — set explicitly.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Component density.',
    },
    {
      name: 'appearance',
      type: "'outlined' | 'filled'",
      default: "'outlined'",
      description: 'Solid-background filled style vs. default outlined style.',
    },
    {
      name: 'feedback',
      type: 'boolean',
      default: 'true',
      description:
        'Shows a strength meter panel on focus. Set to <code>false</code> for a plain field.',
    },
    {
      name: 'toggleMask',
      type: 'boolean',
      default: 'true',
      description: 'Shows a show/hide eye button with <code>aria-pressed</code>.',
    },
    {
      name: 'showClear',
      type: 'boolean',
      default: 'false',
      description: 'Shows an inline clear button when the field has a value.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      default: 'false',
      description: 'Stretches the field to fill its container.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the field. Also driven by <code>FormControl.disable()</code>.',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the input read-only.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Applies invalid/error styles. Does not render an error message.',
    },
    { name: 'placeholder', type: 'string', description: 'Native input placeholder.' },
    {
      name: 'inputId',
      type: 'string',
      description: 'Overrides the auto-generated id on the native <code>&lt;input&gt;</code>.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'Applied to the native input when no visible label is used.',
    },
    {
      name: 'ariaLabelledBy',
      type: 'string',
      description: 'Overrides the auto-linked label id. Prefer a visible label when possible.',
    },
    {
      name: 'promptLabel',
      type: 'string',
      default: "'Enter a password'",
      description: 'Strength panel text before typing begins.',
    },
    {
      name: 'weakLabel',
      type: 'string',
      default: "'Weak'",
      description: 'Strength panel text for a weak password.',
    },
    {
      name: 'mediumLabel',
      type: 'string',
      default: "'Medium'",
      description: 'Strength panel text for a medium-strength password.',
    },
    {
      name: 'strongLabel',
      type: 'string',
      default: "'Strong'",
      description: 'Strength panel text for a strong password.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    { name: 'focused', type: 'Event', description: 'Fires when the input gains focus.' },
    { name: 'blurred', type: 'Event', description: 'Fires when the input loses focus.' },
    { name: 'cleared', type: 'void', description: 'Fires when the clear button is clicked.' },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-password-border-radius', description: 'Border radius.' },
    { variable: '--uilib-password-border-color', description: 'Border colour.' },
    { variable: '--uilib-password-border-color-hover', description: 'Border colour (hover).' },
    { variable: '--uilib-password-border-color-focus', description: 'Border colour (focus).' },
    { variable: '--uilib-password-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-password-panel-border-radius', description: 'Panel border radius.' },
    { variable: '--uilib-password-panel-shadow', description: 'Panel box shadow.' },
    {
      variable: '--uilib-password-meter-transition-duration',
      description: 'Meter Transition Duration.',
    },
    {
      variable: '--uilib-password-meter-color-transition-duration',
      description: 'Meter Color Transition Duration.',
    },
  ];
}
