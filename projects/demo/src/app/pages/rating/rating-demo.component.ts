import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Rating } from 'ui-lib-custom/rating';
import type { RatingChangeEvent, RatingRateEvent } from 'ui-lib-custom/rating';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
/**
 * Demo page for the Rating component.
 */
@Component({
  selector: 'app-rating-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Rating,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
    DocAriaTableComponent,
    DocSectionComponent,
  ],
  templateUrl: './rating-demo.component.html',
  styleUrl: './rating-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDemoComponent {
  public readonly importCode: string = "import { Rating } from 'ui-lib-custom/rating'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-rating-star-on-color', description: 'Filled star colour.' },
    { variable: '--uilib-rating-star-off-color', description: 'Empty star colour.' },
    { variable: '--uilib-rating-star-hover-color', description: 'Hovered star colour.' },
    { variable: '--uilib-rating-cancel-color', description: 'Cancel button icon colour.' },
    {
      variable: '--uilib-rating-cancel-hover-color',
      description: 'Cancel button icon hover colour.',
    },
    { variable: '--uilib-rating-gap', description: 'Gap between stars.' },
    {
      variable: '--uilib-rating-star-size-sm',
      description: 'Star size for <code>size="sm"</code>.',
    },
    {
      variable: '--uilib-rating-star-size-md',
      description: 'Star size for <code>size="md"</code> (default).',
    },
    {
      variable: '--uilib-rating-star-size-lg',
      description: 'Star size for <code>size="lg"</code>.',
    },
    {
      variable: '--uilib-rating-focus-shadow',
      description: 'Focus ring box-shadow applied to the active star.',
    },
    {
      variable: '--uilib-rating-transition-duration',
      description:
        'Transition duration. Set to <code>0ms</code> for <code>prefers-reduced-motion: reduce</code>.',
    },
  ];

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'pre-selected', label: 'Pre-selected' },
    { id: 'no-cancel', label: 'No Cancel' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'star-count', label: 'Custom Star Count' },
    { id: 'readonly', label: 'Readonly' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'events', label: 'Events' },
    { id: 'custom-templates', label: 'Custom Templates' },
    { id: 'inline-styles', label: 'Inline Styles' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
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

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly preSelected: string;
    readonly noCancel: string;
    readonly variants: string;
    readonly sizes: string;
    readonly starCount: string;
    readonly readonly: string;
    readonly disabled: string;
    readonly events: string;
    readonly customTemplates: string;
    readonly inlineStyles: string;
    readonly reactiveForms: string;
  } = {
    import: `import { Rating } from 'ui-lib-custom/rating';`,
    basic: `<ui-lib-rating [(ngModel)]="rating" (ratingChange)="onRatingChange($event)" />`,
    preSelected: `<ui-lib-rating [(ngModel)]="rating" />
<!-- initialise rating to 3: public rating: number | null = 3; -->`,
    noCancel: `<ui-lib-rating [(ngModel)]="rating" [cancel]="false" />`,
    variants: `<ui-lib-rating variant="material"  [ngModel]="4" [cancel]="false" [readonly]="true" />
<ui-lib-rating variant="bootstrap" [ngModel]="4" [cancel]="false" [readonly]="true" />
<ui-lib-rating variant="minimal"   [ngModel]="4" [cancel]="false" [readonly]="true" />`,
    sizes: `<ui-lib-rating size="sm" [ngModel]="3" [cancel]="false" [readonly]="true" />
<ui-lib-rating size="md" [ngModel]="3" [cancel]="false" [readonly]="true" />
<ui-lib-rating size="lg" [ngModel]="3" [cancel]="false" [readonly]="true" />`,
    starCount: `<ui-lib-rating [stars]="10" [(ngModel)]="rating" />`,
    readonly: `<ui-lib-rating [readonly]="true" [(ngModel)]="rating" />`,
    disabled: `<ui-lib-rating [disabled]="true" [(ngModel)]="rating" />`,
    events: `<ui-lib-rating
  [(ngModel)]="rating"
  (rate)="onRate($event)"
  (cleared)="onCleared()"
  (ratingFocus)="onFocus()"
  (ratingBlur)="onBlur()"
/>`,
    customTemplates: `<ui-lib-rating [(ngModel)]="rating" [cancel]="false">
  <ng-template #onicon>❤️</ng-template>
  <ng-template #officon>🤍</ng-template>
</ui-lib-rating>`,
    inlineStyles: `<ui-lib-rating
  [(ngModel)]="rating"
  [cancel]="false"
  [iconOnStyle]="{ color: '#e91e63', fontSize: '2rem' }"
  [iconOffStyle]="{ color: '#f8bbd0', fontSize: '2rem' }"
/>`,
    reactiveForms: `<form [formGroup]="reviewForm">
  <ui-lib-rating formControlName="quality" />
  <ui-lib-rating formControlName="support" />
</form>`,
  } as const;

  // ---- Demo state ---------------------------------------------------------

  public basicRating: number | null = null;
  public lastEvent: RatingChangeEvent | null = null;

  public preselectedRating: number | null = 3;
  public noCancelRating: number | null = 2;
  public readonlyRating: number | null = 4;
  public disabledRating: number | null = 2;
  public tenStarRating: number | null = 7;

  public eventsRating: number | null = null;
  public eventLog: string[] = [];

  public customTemplateRating: number | null = 3;
  public styledRating: number | null = 3;

  public readonly iconOnStyle: Record<string, string> = { color: '#e91e63', fontSize: '2rem' };
  public readonly iconOffStyle: Record<string, string> = { color: '#f8bbd0', fontSize: '2rem' };

  public readonly reviewForm: FormGroup = new FormGroup({
    quality: new FormControl<number | null>(null),
    support: new FormControl<number | null>(3),
  });

  // ---- Playground ---------------------------------------------------------

  public playgroundRating: number | null = 2;
  public readonly playgroundStars: WritableSignal<number> = signal<number>(5);
  public readonly playgroundCancel: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundReadonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public togglePlaygroundCancel(): void {
    this.playgroundCancel.set(!this.playgroundCancel());
  }

  public togglePlaygroundReadonly(): void {
    const next: boolean = !this.playgroundReadonly();
    this.playgroundReadonly.set(next);
    if (next) this.playgroundDisabled.set(false);
  }

  public togglePlaygroundDisabled(): void {
    const next: boolean = !this.playgroundDisabled();
    this.playgroundDisabled.set(next);
    if (next) this.playgroundReadonly.set(false);
  }

  public setPlaygroundStars(count: number): void {
    this.playgroundStars.set(count);
  }

  // ---- Event handlers -----------------------------------------------------

  public onRatingChange(event: RatingChangeEvent): void {
    this.lastEvent = event;
  }

  public onRateEvent(event: RatingRateEvent): void {
    this.eventLog = [`rate: value=${event.value}`, ...this.eventLog].slice(0, 5);
  }

  public onCancelEvent(): void {
    this.eventLog = ['cleared: rating cleared', ...this.eventLog].slice(0, 5);
  }

  public onFocusEvent(): void {
    this.eventLog = ['focus: star focused', ...this.eventLog].slice(0, 5);
  }

  public onBlurEvent(): void {
    this.eventLog = ['blur: star blurred', ...this.eventLog].slice(0, 5);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'stars', type: 'number', default: '5', description: 'Total number of stars.' },
    {
      name: 'cancel',
      type: 'boolean',
      default: 'true',
      description: 'Shows a cancel button to clear the rating.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the rating read-only.',
    },
    {
      name: 'onIcon',
      type: 'string',
      default: "'star-fill'",
      description: 'Icon name for a selected star.',
    },
    {
      name: 'offIcon',
      type: 'string',
      default: "'star'",
      description: 'Icon name for an unselected star.',
    },
    {
      name: 'cancelIcon',
      type: 'string',
      default: "'x'",
      description: 'Icon name for the cancel button.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star size.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
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
    apgPattern: { name: 'Slider', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/' },
  };

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '→ / ↑', action: 'Increase rating by one (wraps at <code>stars</code> maximum).' },
    { key: '← / ↓', action: 'Decrease rating by one (minimum is 1).' },
    {
      key: 'Delete / Backspace',
      action: 'Clear the rating — only available when <code>[cancel]="true"</code>.',
    },
    {
      key: '1–9',
      action: 'Jump directly to that star value (if within the <code>stars</code> range).',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'value',
      type: 'number | null',
      default: 'null',
      description:
        'Current rating. Two-way bindable via <code>[(value)]</code> or <code>ngModel</code>.',
    },
    { name: 'stars', type: 'number', default: '5', description: 'Number of star icons to render.' },
    {
      name: 'cancel',
      type: 'boolean',
      default: 'true',
      description: 'Shows a clear button and enables Delete / Backspace keyboard clearing.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the component. Also controlled via CVA <code>setDisabledState</code>.',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Visible but not interactive. Changes host role to <code>"img"</code>.',
    },
    {
      name: 'autofocus',
      type: 'boolean',
      default: 'false',
      description: 'Focuses the first star after first render.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Rating'",
      description:
        'Accessible label for the radiogroup. Overridden with descriptive text in readonly mode.',
    },
    {
      name: 'ariaLabelledby',
      type: 'string | null',
      default: 'null',
      description: 'Overrides <code>ariaLabel</code> when set. Ignored in readonly mode.',
    },
    {
      name: 'iconOnClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on filled star icons.',
    },
    {
      name: 'iconOnStyle',
      type: 'Record<string, string> | null',
      default: 'null',
      description: 'Inline styles on filled star icons.',
    },
    {
      name: 'iconOffClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on empty star icons.',
    },
    {
      name: 'iconOffStyle',
      type: 'Record<string, string> | null',
      default: 'null',
      description: 'Inline styles on empty star icons.',
    },
    {
      name: 'iconCancelClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on the cancel icon.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Inherits from <code>ThemeConfigService</code> when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Component density.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host (interactive)',
      attribute: 'role="radiogroup"',
      value: '—',
      notes: 'Groups stars as a radio group in interactive mode.',
    },
    {
      element: 'Host (interactive)',
      attribute: 'aria-label',
      value: 'Value of ariaLabel input',
      notes:
        'Defaults to <code>"Rating"</code>. Overridden by <code>ariaLabelledby</code> when set.',
    },
    {
      element: 'Host (readonly)',
      attribute: 'role="img"',
      value: '—',
      notes: 'Switches to image role in readonly mode — no interactive semantics.',
    },
    {
      element: 'Host (readonly)',
      attribute: 'aria-label',
      value: '"Rating: 4 out of 5 stars"',
      notes: 'Auto-generated descriptive label for the readonly display.',
    },
    {
      element: 'Star (interactive)',
      attribute: 'role="radio"',
      value: '—',
      notes: 'Each star is a radio option within the radiogroup.',
    },
    {
      element: 'Star (interactive)',
      attribute: 'aria-checked',
      value: '"true" / "false"',
      notes: "Whether this star's value matches the current rating.",
    },
    {
      element: 'Star (interactive)',
      attribute: 'aria-label',
      value: '"1 star", "2 stars", …',
      notes: 'Human-readable label announced by screen readers.',
    },
    {
      element: 'Star (interactive)',
      attribute: 'tabindex',
      value: '"0" / "-1"',
      notes: 'Roving tabindex — active star gets <code>0</code>, all others get <code>-1</code>.',
    },
    {
      element: 'Star (readonly)',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes: 'Decorative stars hidden from screen readers in readonly mode.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    {
      name: 'ratingChange',
      type: 'RatingChangeEvent',
      description:
        'Emitted on every value change, including clears. Value is <code>number | null</code>.',
    },
    {
      name: 'rate',
      type: 'RatingRateEvent',
      description: 'Emitted only when a star is selected (value is always a positive integer).',
    },
    {
      name: 'cleared',
      type: 'Event',
      description:
        'Emitted when the rating is cleared via cancel button, toggle-deselect, or Delete key.',
    },
    {
      name: 'ratingFocus',
      type: 'FocusEvent',
      description: 'Emitted when any star receives focus.',
    },
    { name: 'ratingBlur', type: 'FocusEvent', description: 'Emitted when any star loses focus.' },
  ];
}
