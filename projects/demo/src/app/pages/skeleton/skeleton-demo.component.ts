import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Skeleton } from 'ui-lib-custom/skeleton';
import type { SkeletonVariant } from 'ui-lib-custom/skeleton';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
/**
 * Demo page for the Skeleton component.
 */
@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [
    Skeleton,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './skeleton-demo.component.html',
  styleUrl: './skeleton-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Skeleton } from 'ui-lib-custom/skeleton'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'shapes', label: 'Shapes' },
    { id: 'card-placeholder', label: 'Card Placeholder' },
    { id: 'list-placeholder', label: 'List Placeholder' },
    { id: 'variants', label: 'Variants' },
    { id: 'animation', label: 'Animation' },
    { id: 'custom-sizes', label: 'Custom Sizes' },
    { id: 'custom-border-radius', label: 'Custom Border Radius' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'shape',
      type: "'rectangle' | 'circle'",
      default: "'rectangle'",
      description: 'Shape of the placeholder.',
    },
    {
      name: 'width',
      type: 'string',
      default: "'100%'",
      description: 'CSS width value. Overridden by <code>size</code>.',
    },
    {
      name: 'height',
      type: 'string',
      default: "'1rem'",
      description: 'CSS height value. Overridden by <code>size</code>.',
    },
    {
      name: 'size',
      type: 'string | null',
      default: 'null',
      description: 'Sets both width and height. Useful for circles.',
    },
    {
      name: 'borderRadius',
      type: 'string | null',
      default: 'null',
      description: 'Custom border-radius, overrides shape default.',
    },
    {
      name: 'animation',
      type: "'wave' | 'none'",
      default: "'wave'",
      description: 'Shimmer animation type.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Falls back to ThemeConfigService.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes on the host element.',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly variants: SkeletonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly isLoaded: WritableSignal<boolean> = signal<boolean>(false);

  public toggleLoaded(): void {
    this.isLoaded.set(!this.isLoaded());
  }
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      suffix: 'while loading',
      action: 'Skeleton host is not focusable; projected content is inert while loading.',
    },
    {
      key: 'Tab',
      suffix: 'after loading',
      action:
        'Focus moves to the first interactive element inside the projected content, if one exists.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host (loading)',
      attribute: 'role="status"',
      value: '—',
      notes: 'Announces an active loading region.',
    },
    {
      element: 'Host (loading)',
      attribute: 'aria-live="polite"',
      value: '—',
      notes: 'Politely announces loading state to screen readers.',
    },
    {
      element: 'Host (loading)',
      attribute: 'aria-busy="true"',
      value: '—',
      notes: 'Signals to assistive technology that the region is loading.',
    },
    {
      element: 'Host (loading)',
      attribute: 'aria-label',
      value: 'ariaLabel input (default: "Loading content")',
      notes: 'Provides a descriptive loading announcement.',
    },
    {
      element: 'Host (loaded)',
      attribute: 'aria-busy="false"',
      value: '—',
      notes: 'Clears loading semantics once content is ready.',
    },
    {
      element: 'Placeholder block',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes: 'Decorative placeholder is hidden from the accessibility tree.',
    },
    {
      element: 'Shimmer animation',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes: 'Decorative shimmer is hidden from the accessibility tree.',
    },
    {
      element: 'Projected content (loading)',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes:
        'Prevents content from being announced before it is ready. Also set <code>inert</code>.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-skeleton-bg', description: 'Background colour.' },
    { variable: '--uilib-skeleton-shimmer-color', description: 'Shimmer text colour.' },
    { variable: '--uilib-skeleton-border-radius', description: 'Border radius.' },
    { variable: '--uilib-skeleton-animation-duration', description: 'Animation Duration.' },
  ];
}
