import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { Image } from 'ui-lib-custom/image';

import { Panel } from 'ui-lib-custom/panel';
import {
  basicHtml,
  basicTs,
  previewHtml,
  previewTs,
  customIndicatorHtml,
  customIndicatorTs,
  errorFallbackHtml,
  errorFallbackTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
  customErrorHtml,
  customErrorTs,
  dimensionsHtml,
  dimensionsTs,
  twoWayBindingHtml,
  twoWayBindingTs,
} from './snippets.generated';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
/**
 * Demo page for the Image component.
 */
@Component({
  selector: 'app-image-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageLayoutComponent,
    DocTocComponent,
    Image,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocCssVarsTableComponent,

    DocSectionComponent,
    DocApiReferenceComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './image-demo.component.html',
  styleUrl: './image-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly previewHtml: string = previewHtml;
  public readonly previewTs: string = previewTs;
  public readonly customIndicatorHtml: string = customIndicatorHtml;
  public readonly customIndicatorTs: string = customIndicatorTs;
  public readonly errorFallbackHtml: string = errorFallbackHtml;
  public readonly errorFallbackTs: string = errorFallbackTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly customErrorHtml: string = customErrorHtml;
  public readonly customErrorTs: string = customErrorTs;
  public readonly dimensionsHtml: string = dimensionsHtml;
  public readonly dimensionsTs: string = dimensionsTs;
  public readonly twoWayBindingHtml: string = twoWayBindingHtml;
  public readonly twoWayBindingTs: string = twoWayBindingTs;

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

  public readonly importCode: string = "import { Image } from 'ui-lib-custom/image'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'preview', label: 'Preview' },
    { id: 'custom-indicator', label: 'Custom Indicator' },
    { id: 'error-fallback', label: 'Error Fallback' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'custom-error', label: 'Custom Error' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'two-way-binding', label: 'Two-Way Binding' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  // ─── State ────────────────────────────────────────────────────────────────────

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly previewVisible: WritableSignal<boolean> = signal<boolean>(false);

  // ─── Code snippets ────────────────────────────────────────────────────────────
  public readonly apiInputRows: readonly ApiPropRow[] = [
    { name: 'src', type: 'string', default: "''", description: 'URL of the image.' },
    { name: 'alt', type: 'string', default: "''", description: 'Alt text for the image.' },
    {
      name: 'width',
      type: 'string | null',
      default: 'null',
      description: 'HTML width attribute for the img element.',
    },
    {
      name: 'height',
      type: 'string | null',
      default: 'null',
      description: 'HTML height attribute for the img element.',
    },
    {
      name: 'preview',
      type: 'boolean',
      default: 'false',
      description: 'Enables the click-to-preview lightbox.',
    },
    {
      name: 'imageStyle',
      type: 'Record<string, string> | null',
      default: 'null',
      description: 'Inline styles applied to the img element.',
    },
    {
      name: 'imageClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on the img element.',
    },
    {
      name: 'errorSrc',
      type: 'string | null',
      default: 'null',
      description: 'Fallback src when the primary src fails.',
    },
    {
      name: 'variant',
      type: 'ImageVariant | null',
      default: 'null',
      description: 'Design variant; inherits from ThemeConfigService when null.',
    },
    { name: 'size', type: 'ImageSize', default: "'md'", description: 'Component size token.' },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on the host element.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Preview image'",
      description: 'Accessible label for the preview indicator button.',
    },
    {
      name: 'previewVisible (model)',
      type: 'boolean',
      default: 'false',
      description: 'Two-way binding for overlay open state.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'loadEvent',
      type: 'Event',
      description: 'Emitted when the image loads successfully.',
    },
    { name: 'errorEvent', type: 'Event', description: 'Emitted when the image fails to load.' },
  ];

  public readonly apiSlotRows: readonly ApiPropRow[] = [
    {
      name: '#imageIndicator',
      type: 'ng-content',
      description: 'Custom content for the hover preview indicator.',
    },
    {
      name: '#imageError',
      type: 'ng-content',
      description: 'Custom content shown when the image fails to load.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Enter / Space',
      suffix: 'on preview trigger button',
      action: 'Opens the preview overlay.',
    },
    {
      key: 'Escape',
      suffix: 'in preview overlay',
      action: 'Closes the overlay and restores focus to the trigger.',
    },
    {
      key: 'Tab / Shift+Tab',
      suffix: 'in preview overlay',
      action: 'Cycles focus among toolbar buttons (focus is trapped inside the overlay).',
    },
    {
      key: 'Enter / Space',
      suffix: 'on Zoom In/Out buttons',
      action: 'Increases or decreases the zoom scale by one step.',
    },
    {
      key: 'Enter / Space',
      suffix: 'on Rotate buttons',
      action: 'Rotates the image 90° in the corresponding direction.',
    },
    {
      key: 'Enter / Space',
      suffix: 'on Close button',
      action: 'Closes the overlay and restores focus.',
    },
    { key: '+ / =', suffix: 'in preview overlay', action: 'Zooms in without moving focus.' },
    { key: '-', suffix: 'in preview overlay', action: 'Zooms out without moving focus.' },
    { key: '← / →', suffix: 'in preview overlay', action: 'Rotates the image 90° left or right.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Preview trigger button',
      attribute: 'aria-label',
      value: 'ariaLabel input (default: "Preview image")',
      notes: 'Always present when <code>[preview]="true"</code>.',
    },
    {
      element: 'Preview trigger button',
      attribute: 'aria-haspopup',
      value: '"dialog"',
      notes: 'Signals that activating the button opens a dialog.',
    },
    {
      element: 'Preview trigger button',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the overlay is open.',
    },
    {
      element: 'Preview overlay',
      attribute: 'role="dialog"',
      value: '—',
      notes: 'Announces the overlay as a modal dialog.',
    },
    {
      element: 'Preview overlay',
      attribute: 'aria-modal',
      value: '"true"',
      notes: 'Prevents interaction with background content.',
    },
    {
      element: 'Preview overlay',
      attribute: 'aria-label',
      value: 'ariaLabel input',
      notes: 'Provides the accessible name of the dialog.',
    },
    {
      element: 'Toolbar',
      attribute: 'role="toolbar"',
      value: '—',
      notes: 'Groups zoom, rotate, and close controls. Labeled <code>"Image controls"</code>.',
    },
    {
      element: 'Zoom buttons',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when the zoom limit is reached.',
    },
    {
      element: 'Preview status region',
      attribute: 'aria-live="polite"',
      value: '—',
      notes: 'Announces zoom percentage and rotation changes to screen readers.',
    },
    {
      element: 'Error placeholder',
      attribute: 'role="img"',
      value: '—',
      notes:
        'Used when the image fails to load; <code>aria-label</code> equals the <code>alt</code> input.',
    },
    {
      element: 'All SVG icons',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes: 'Decorative icons are hidden from the accessibility tree.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-image-radius', description: 'Border radius.' },
    { variable: '--uilib-image-indicator-bg', description: 'Indicator background colour.' },
    {
      variable: '--uilib-image-indicator-bg-hover',
      description: 'Indicator background colour (hover).',
    },
    { variable: '--uilib-image-indicator-color', description: 'Active indicator colour.' },
    { variable: '--uilib-image-indicator-icon-size-sm', description: 'Indicator Icon size — sm.' },
    { variable: '--uilib-image-indicator-icon-size-md', description: 'Indicator Icon size — md.' },
    { variable: '--uilib-image-indicator-icon-size-lg', description: 'Indicator Icon size — lg.' },
    { variable: '--uilib-image-mask-bg', description: 'Mask background colour.' },
    { variable: '--uilib-image-toolbar-bg', description: 'Toolbar background colour.' },
    { variable: '--uilib-image-toolbar-btn-bg', description: 'Toolbar Btn background colour.' },
    {
      variable: '--uilib-image-toolbar-btn-bg-hover',
      description: 'Toolbar Btn background colour (hover).',
    },
    { variable: '--uilib-image-toolbar-btn-color', description: 'Toolbar Btn text colour.' },
    {
      variable: '--uilib-image-toolbar-btn-color-disabled',
      description: 'Toolbar Btn text colour (disabled).',
    },
    { variable: '--uilib-image-toolbar-btn-size', description: 'Toolbar Btn size.' },
    { variable: '--uilib-image-toolbar-btn-icon-size', description: 'Toolbar Btn Icon size.' },
    { variable: '--uilib-image-toolbar-gap', description: 'Toolbar gap.' },
    { variable: '--uilib-image-toolbar-padding', description: 'Toolbar padding.' },
    { variable: '--uilib-image-error-bg', description: 'Error background colour.' },
    { variable: '--uilib-image-error-color', description: 'Error text colour.' },
    { variable: '--uilib-image-error-icon-size', description: 'Error Icon size.' },
    { variable: '--uilib-image-preview-transition', description: 'Preview transition.' },
  ];
}
