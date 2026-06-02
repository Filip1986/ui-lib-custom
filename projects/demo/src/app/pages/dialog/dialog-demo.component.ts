import { CommonModule } from '@angular/common';
import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';

import { Button } from 'ui-lib-custom/button';
import type { DialogPosition, DialogVariant } from 'ui-lib-custom/dialog';
import { DialogComponent } from 'ui-lib-custom/dialog';
import { Icon } from 'ui-lib-custom/icon';
import { Panel } from 'ui-lib-custom/panel';

import { VariantComparisonComponent } from '@demo/shared/components/variant-comparison/variant-comparison.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
/**
 * Demo page for Dialog component capabilities.
 */
@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    VariantComparisonComponent,
    Button,
    Icon,
    DialogComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './dialog-demo.component.html',
  styleUrl: './dialog-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDemoComponent {
  public readonly importCode: string = "import { DialogComponent } from 'ui-lib-custom/dialog'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'custom-header-footer', label: 'Custom Header & Footer' },
    { id: 'position', label: 'Position' },
    { id: 'maximizable', label: 'Maximizable' },
    { id: 'long-content', label: 'Long Content' },
    { id: 'without-modal', label: 'Without Modal' },
    { id: 'responsive', label: 'Responsive' },
    { id: 'draggable', label: 'Draggable' },
    { id: 'headless', label: 'Headless' },
    { id: 'variant-switcher', label: 'Variant Switcher' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'header', type: 'string', default: "''", description: 'Dialog header text.' },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      description: 'Whether to render a backdrop overlay.',
    },
    { name: 'closable', type: 'boolean', default: 'true', description: 'Shows the close button.' },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Closes the dialog on Escape key.',
    },
    {
      name: 'dismissableMask',
      type: 'boolean',
      default: 'false',
      description: 'Closes the dialog when clicking the backdrop.',
    },
    {
      name: 'draggable',
      type: 'boolean',
      default: 'false',
      description: 'Makes the dialog draggable.',
    },
    {
      name: 'maximizable',
      type: 'boolean',
      default: 'false',
      description: 'Adds a maximize toggle button.',
    },
    {
      name: 'blockScroll',
      type: 'boolean',
      default: 'false',
      description: 'Prevents page scrolling while the dialog is open.',
    },
    {
      name: 'position',
      type: "'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'",
      default: "'center'",
      description: 'Screen position of the dialog.',
    },
    {
      name: 'breakpoints',
      type: 'Record<string, string>',
      default: '{}',
      description: 'Responsive width breakpoints.',
    },
    {
      name: 'variant',
      type: 'DialogVariant | undefined',
      default: 'undefined',
      description: 'Design variant.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class applied to the dialog.',
    },
    {
      name: 'headless',
      type: 'boolean',
      default: 'false',
      description: 'Removes the default header for fully custom content.',
    },
    {
      name: 'ariaLabelledBy',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Id of the element labelling the dialog.',
    },
    {
      name: 'ariaDescribedBy',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Id of the element describing the dialog.',
    },
  ];

  public readonly basicVisible: WritableSignal<boolean> = signal(false);
  public readonly customVisible: WritableSignal<boolean> = signal(false);
  public readonly maximizableVisible: WritableSignal<boolean> = signal(false);
  public readonly longContentVisible: WritableSignal<boolean> = signal(false);
  public readonly nonModalVisible: WritableSignal<boolean> = signal(false);
  public readonly responsiveVisible: WritableSignal<boolean> = signal(false);
  public readonly draggableVisible: WritableSignal<boolean> = signal(false);
  public readonly headlessVisible: WritableSignal<boolean> = signal(false);
  public readonly variantVisible: WritableSignal<boolean> = signal(false);

  public readonly positions: DialogPosition[] = [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  public readonly positionVisible: Record<DialogPosition, boolean> = {
    center: false,
    top: false,
    bottom: false,
    left: false,
    right: false,
    'top-left': false,
    'top-right': false,
    'bottom-left': false,
    'bottom-right': false,
  };

  public selectedVariant: DialogVariant = 'material';

  public readonly variantCompareVisible: Record<DialogVariant, boolean> = {
    material: false,
    bootstrap: false,
    minimal: false,
  };

  public readonly responsiveBreakpoints: Record<string, string> = {
    '1200px': '50vw',
    '960px': '75vw',
    '640px': '92vw',
  };

  public readonly longParagraphs: string[] = [
    'This section demonstrates dialog content scrolling when content exceeds available viewport height.',
    'Dialogs should keep actions visible and readable while allowing users to review longer body content.',
    'The component keeps body overflow inside the content region, not the entire page, when modal mode is active.',
    'Use this pattern for legal text, audit logs, long release notes, and multi-paragraph confirmation content.',
    'For very complex workflows consider routing to a full page instead of overloading a single dialog.',
    'Responsive breakpoints can be combined with long content to maintain readability on smaller screens.',
    'Keyboard users can still use Escape to close when `closeOnEscape` is enabled.',
    'Projected footer actions remain available at the bottom even when body content scrolls.',
  ];

  public openPosition(position: DialogPosition): void {
    this.positionVisible[position] = true;
  }

  public setVariant(variant: DialogVariant): void {
    this.selectedVariant = variant;
  }
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 8,
      polish: 9,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
    apgPattern: {
      name: 'Dialog (Modal)',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    },
  };

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Dialog container',
      attribute: 'role',
      value: '"dialog"',
      notes: 'Identifies the overlay as a dialog to assistive technologies.',
    },
    {
      element: 'Dialog container',
      attribute: 'aria-modal',
      value: '"true"',
      notes: 'Marks content behind the dialog as inert while it is open.',
    },
    {
      element: 'Dialog container',
      attribute: 'aria-labelledby',
      value: 'dialog-header-id',
      notes: 'References the dialog header for an accessible name.',
    },
    {
      element: 'Dialog container',
      attribute: 'aria-describedby',
      value: 'dialog-content-id',
      notes: 'References the content area for an accessible description.',
    },
    {
      element: 'Close button',
      attribute: 'aria-label',
      value: '"Close"',
      notes: 'Provides a text alternative for the icon-only close button.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Escape',
      action:
        'Closes the dialog and returns focus to the previously-focused element (when closable).',
    },
    {
      key: 'Tab',
      action:
        'Cycles focus forward through all focusable elements inside the dialog. Wraps from last to first.',
    },
    {
      key: 'Shift+Tab',
      action: 'Cycles focus backward through all focusable elements. Wraps from first to last.',
    },
    {
      key: 'Enter / Space',
      target: 'Close button',
      action: 'Closes the dialog.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-dialog-bg', description: 'Background colour.' },
    { variable: '--uilib-dialog-border-radius', description: 'Border radius.' },
    { variable: '--uilib-dialog-shadow', description: 'Box shadow.' },
    { variable: '--uilib-dialog-border', description: 'Border shorthand.' },
    { variable: '--uilib-dialog-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-dialog-header-color', description: 'Header text colour.' },
    { variable: '--uilib-dialog-header-font-size', description: 'Header font size.' },
    { variable: '--uilib-dialog-header-font-weight', description: 'Header font weight.' },
    { variable: '--uilib-dialog-header-padding', description: 'Header padding.' },
    { variable: '--uilib-dialog-content-padding', description: 'Content area padding.' },
    { variable: '--uilib-dialog-footer-padding', description: 'Footer padding.' },
    { variable: '--uilib-dialog-footer-border-top', description: 'Footer Border Top.' },
    { variable: '--uilib-dialog-close-btn-size', description: 'Close Btn size.' },
    { variable: '--uilib-dialog-close-btn-color', description: 'Close Btn text colour.' },
    {
      variable: '--uilib-dialog-close-btn-hover-bg',
      description: 'Close Btn Hover background colour.',
    },
    { variable: '--uilib-dialog-z-index', description: 'Z-index.' },
    { variable: '--uilib-dialog-enter-duration', description: 'Enter animation duration.' },
    { variable: '--uilib-dialog-enter-easing', description: 'Enter animation easing.' },
    { variable: '--uilib-dialog-enter-start-scale', description: 'Enter Start Scale.' },
    { variable: '--uilib-dialog-enter-start-translate-y', description: 'Enter Start Translate Y.' },
    {
      variable: '--uilib-dialog-backdrop-enter-duration',
      description: 'Backdrop enter animation duration.',
    },
    {
      variable: '--uilib-dialog-backdrop-enter-easing',
      description: 'Backdrop enter animation easing.',
    },
    {
      variable: '--uilib-dialog-border-bootstrap',
      description: 'Border shorthand — bootstrap variant.',
    },
    {
      variable: '--uilib-dialog-border-minimal',
      description: 'Border shorthand — minimal variant.',
    },
    {
      variable: '--uilib-dialog-action-hover-material',
      description: 'Action Hover — material variant.',
    },
  ];
}
