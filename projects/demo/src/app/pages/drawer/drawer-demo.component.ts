import { TitleCasePipe } from '@angular/common';
import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';

import { Button } from 'ui-lib-custom/button';
import type { DrawerPosition, DrawerVariant } from 'ui-lib-custom/drawer';
import { Drawer } from 'ui-lib-custom/drawer';

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
 * Demo page for the Drawer component.
 */
@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [
    Drawer,
    TitleCasePipe,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './drawer-demo.component.html',
  styleUrl: './drawer-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDemoComponent {
  public readonly importCode: string = "import { Drawer } from 'ui-lib-custom/drawer'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    apgPattern: {
      name: 'Dialog (Modal)',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    },
    competitiveParity: 'pending',
  };
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'positions', label: 'Positions' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'without-backdrop', label: 'Without Backdrop' },
    { id: 'with-footer', label: 'With Footer' },
    { id: 'full-screen', label: 'Full Screen' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'header', type: 'string', default: "''", description: 'Drawer header text.' },
    {
      name: 'position',
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'left'",
      description: 'Edge the drawer slides in from.',
    },
    { name: 'modal', type: 'boolean', default: 'true', description: 'Shows a backdrop overlay.' },
    { name: 'closable', type: 'boolean', default: 'true', description: 'Shows the close button.' },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Closes the drawer on Escape key.',
    },
    {
      name: 'dismissable',
      type: 'boolean',
      default: 'true',
      description: 'Closes the drawer when clicking the backdrop.',
    },
    {
      name: 'blockScroll',
      type: 'boolean',
      default: 'false',
      description: 'Prevents page scrolling while open.',
    },
    {
      name: 'appendTo',
      type: "'body' | string",
      default: "'body'",
      description: 'Target element for portal rendering.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
    {
      name: 'ariaLabelledBy',
      type: 'string | null',
      default: 'null',
      description: 'Id of an external label element.',
    },
  ];

  public readonly basicOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly positionOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentPosition: WritableSignal<DrawerPosition> = signal<DrawerPosition>('right');
  public readonly variantOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentVariant: WritableSignal<DrawerVariant> = signal<DrawerVariant>('material');
  public readonly noBackdropOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly fullScreenOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly footerOpen: WritableSignal<boolean> = signal<boolean>(false);

  public openPosition(position: DrawerPosition): void {
    this.currentPosition.set(position);
    this.positionOpen.set(true);
  }

  public openVariant(variant: DrawerVariant): void {
    this.currentVariant.set(variant);
    this.variantOpen.set(true);
  }

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Drawer container',
      attribute: 'role',
      value: '"dialog"',
      notes: 'The drawer is announced as a dialog when open.',
    },
    {
      element: 'Drawer container',
      attribute: 'aria-modal',
      value: '"true"',
      notes: 'Marks page content behind the drawer as inert.',
    },
    {
      element: 'Drawer container',
      attribute: 'aria-labelledby',
      value: 'drawer-header-id',
      notes: 'References the header element for an accessible name.',
    },
    {
      element: 'Close button',
      attribute: 'aria-label',
      value: '"Close"',
      notes: 'Text alternative for the icon-only close button.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Escape',
      action: 'Closes the drawer and returns focus to the previously-focused element.',
    },
    {
      key: 'Tab',
      action:
        'Cycles focus forward through all focusable elements inside the drawer panel. Wraps from last to first.',
    },
    {
      key: 'Shift+Tab',
      action: 'Cycles focus backward through all focusable elements. Wraps from first to last.',
    },
  ];

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'visible',
      type: 'boolean',
      default: 'false',
      description: 'Two-way binding to control open/close.',
    },
    { name: 'header', type: 'string', default: "''", description: 'Header title text.' },
    {
      name: 'position',
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'right'",
      description: 'Which edge the drawer slides from.',
    },
    {
      name: 'size',
      type: 'string',
      default: "'300px'",
      description: 'Panel width (left/right) or height (top/bottom).',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      description: 'Show the semi-transparent backdrop.',
    },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Close on backdrop click.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Close on Escape key.',
    },
    {
      name: 'blockScroll',
      type: 'boolean',
      default: 'true',
      description: 'Lock body scroll while open.',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      default: 'true',
      description: 'Show the built-in X close button.',
    },
    {
      name: 'variant',
      type: 'DrawerVariant | null',
      default: 'null',
      description: 'Visual variant (inherits from theme service).',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS classes on the host.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    { name: 'shown', type: 'OutputEmitterRef<void>', description: 'Emits after the drawer opens.' },
    {
      name: 'hidden',
      type: 'OutputEmitterRef<void>',
      description: 'Emits after the drawer closes.',
    },
  ];

  public readonly apiSlotRows: readonly ApiPropRow[] = [
    { name: 'default', type: 'slot', description: 'Scrollable main content.' },
    { name: '[drawerHeader]', type: 'slot', description: 'Replaces the header title area.' },
    {
      name: '[drawerFooter]',
      type: 'slot',
      description: 'Sticky footer at the bottom of the panel.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-drawer-size', description: 'Size.' },
    { variable: '--uilib-drawer-panel-bg', description: 'Panel background colour.' },
    { variable: '--uilib-drawer-panel-shadow', description: 'Panel box shadow.' },
    { variable: '--uilib-drawer-border-radius', description: 'Border radius.' },
    { variable: '--uilib-drawer-backdrop-bg', description: 'Backdrop background colour.' },
    { variable: '--uilib-drawer-z-index', description: 'Z-index.' },
    { variable: '--uilib-drawer-transition-duration', description: 'Transition Duration.' },
    { variable: '--uilib-drawer-transition-easing', description: 'Transition Easing.' },
    { variable: '--uilib-drawer-padding', description: 'Padding.' },
    { variable: '--uilib-drawer-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-drawer-header-border', description: 'Header border shorthand.' },
    { variable: '--uilib-drawer-title-color', description: 'Title text colour.' },
    { variable: '--uilib-drawer-title-font-size', description: 'Title font size.' },
    { variable: '--uilib-drawer-title-font-weight', description: 'Title font weight.' },
    { variable: '--uilib-drawer-close-color', description: 'Close button colour.' },
    { variable: '--uilib-drawer-close-hover-bg', description: 'Close Hover background colour.' },
    { variable: '--uilib-drawer-close-size', description: 'Close button size.' },
  ];
}
