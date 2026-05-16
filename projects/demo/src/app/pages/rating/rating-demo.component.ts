import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Rating } from 'ui-lib-custom/rating';
import type { RatingChangeEvent, RatingRateEvent } from 'ui-lib-custom/rating';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

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
    DocPageLayoutComponent,
    DocTocComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './rating-demo.component.html',
  styleUrl: './rating-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDemoComponent {
  public readonly importCode: string = "import { Rating } from 'ui-lib-custom/rating'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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
    basic: `<ui-lib-rating [(ngModel)]="rating" (change)="onRatingChange($event)" />`,
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
  (focus)="onFocus()"
  (blur)="onBlur()"
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
}
