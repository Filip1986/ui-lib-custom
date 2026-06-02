import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';

import { Button } from 'ui-lib-custom/button';
import type {
  DividerAlign,
  DividerOrientation,
  DividerType,
  DividerVariant,
} from 'ui-lib-custom/divider';
import { Divider } from 'ui-lib-custom/divider';

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
 * Demo page for the Divider component.
 */
@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [
    Divider,
    Button,
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
  templateUrl: './divider-demo.component.html',
  styleUrl: './divider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {
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

  public readonly importCode: string = "import { Divider } from 'ui-lib-custom/divider'";

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Direction of the divider line.',
    },
    {
      name: 'type',
      type: "'solid' | 'dashed' | 'dotted'",
      default: "'solid'",
      description: 'Visual style of the divider line.',
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right' | 'top' | 'bottom' | null",
      default: 'null',
      description:
        'Position of the projected content. Horizontal: left/center/right; Vertical: top/center/bottom.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant; inherits from ThemeConfigService when null.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes added to the host element.',
    },
  ];
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'with-label', label: 'With Label' },
    { id: 'alignment', label: 'Alignment' },
    { id: 'line-types', label: 'Line Types' },
    { id: 'vertical', label: 'Vertical' },
    { id: 'vertical-alignment', label: 'Vertical Alignment' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly types: DividerType[] = ['solid', 'dashed', 'dotted'];
  public readonly variants: DividerVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly horizontalAligns: DividerAlign[] = ['left', 'center', 'right'];
  public readonly verticalAligns: DividerAlign[] = ['top', 'center', 'bottom'];

  public readonly playgroundOrientation: WritableSignal<DividerOrientation> =
    signal<DividerOrientation>('horizontal');
  public readonly playgroundType: WritableSignal<DividerType> = signal<DividerType>('solid');
  public readonly playgroundAlign: WritableSignal<DividerAlign | null> =
    signal<DividerAlign | null>(null);
  public readonly playgroundVariant: WritableSignal<DividerVariant> =
    signal<DividerVariant>('material');
  public readonly playgroundHasContent: WritableSignal<boolean> = signal<boolean>(true);

  public setOrientation(orientation: DividerOrientation): void {
    this.playgroundOrientation.set(orientation);
    this.playgroundAlign.set(null);
  }

  public setType(type: DividerType): void {
    this.playgroundType.set(type);
  }

  public setAlign(align: DividerAlign): void {
    this.playgroundAlign.set(align);
  }

  public setVariant(variant: DividerVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleContent(): void {
    this.playgroundHasContent.set(!this.playgroundHasContent());
  }
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab / Shift+Tab',
      action: 'Component is not interactive and does not appear in the tab order.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host',
      attribute: 'role="separator"',
      value: '—',
      notes: 'Applied on all dividers, decorative or labeled.',
    },
    {
      element: 'Host',
      attribute: 'aria-orientation',
      value: '"horizontal" | "vertical"',
      notes: 'Reflects the <code>orientation</code> input.',
    },
    {
      element: 'Host',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes: 'Applied when <code>[decorative]="true"</code> and no <code>ariaLabel</code> is set.',
    },
    {
      element: 'Host',
      attribute: 'aria-label',
      value: 'ariaLabel input',
      notes: 'Present when the <code>ariaLabel</code> input is a non-empty string.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-divider-color', description: 'Text colour.' },
    { variable: '--uilib-divider-thickness', description: 'Thickness.' },
    { variable: '--uilib-divider-border-style', description: 'Border style.' },
    { variable: '--uilib-divider-margin-h', description: 'Margin H.' },
    { variable: '--uilib-divider-margin-v', description: 'Margin V.' },
    { variable: '--uilib-divider-content-padding', description: 'Content area padding.' },
    { variable: '--uilib-divider-content-font-size', description: 'Content Font size.' },
    { variable: '--uilib-divider-content-font-weight', description: 'Content font weight.' },
    { variable: '--uilib-divider-content-color', description: 'Content text colour.' },
    { variable: '--uilib-divider-content-font-family', description: 'Content font family.' },
    { variable: '--uilib-divider-vertical-min-height', description: 'Vertical Min height.' },
  ];
}
