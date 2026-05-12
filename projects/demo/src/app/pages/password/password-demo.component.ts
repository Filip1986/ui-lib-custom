import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordComponent } from 'ui-lib-custom/password';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/** Demo page for the Password component. */
@Component({
  selector: 'app-password-demo',
  standalone: true,
  imports: [
    PasswordComponent,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './password-demo.component.html',
  styleUrl: './password-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDemoComponent {
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
}
