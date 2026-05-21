import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import type {
  ButtonAppearance,
  ButtonSeverity,
  ButtonSize,
  ButtonVariant,
} from 'ui-lib-custom/button';
import { ButtonGroup } from 'ui-lib-custom';
import { Panel } from 'ui-lib-custom/panel';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
interface ButtonLogEntry {
  timestamp: string;
  message: string;
}

/**
 * Demo page for the Button component.
 * Shows all appearances, severities, sizes, icons, modifiers, and states.
 */
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [
    Button,
    ButtonGroup,
    Panel,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsComponent {
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
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Button } from 'ui-lib-custom/button'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'all-appearances', label: 'All Appearances' },
    { id: 'glass-shadow', label: 'Glass Shadow' },
    { id: 'framed', label: 'Framed' },
    { id: 'appearance-severity', label: 'Appearance × Severity' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'icons', label: 'Icons' },
    { id: 'pill-raised', label: 'Pill & Raised' },
    { id: 'states', label: 'States' },
    { id: 'badges', label: 'Badges' },
    { id: 'tactile', label: 'Tactile' },
    { id: 'expressive', label: 'Expressive Appearances' },
    { id: 'button-groups', label: 'Button Groups' },
    { id: 'full-width', label: 'Full Width' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
    { id: 'event-log', label: 'Event Log' },
  ];

  public readonly activeVariant: WritableSignal<ButtonVariant> = signal<ButtonVariant>('material');
  public readonly eventLog: WritableSignal<ButtonLogEntry[]> = signal<ButtonLogEntry[]>([]);

  public readonly variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly matrixAppearances: ButtonAppearance[] = ['solid', 'outline', 'ghost', 'soft'];

  public readonly appearances: ButtonAppearance[] = [
    'solid',
    'outline',
    'ghost',
    'soft',
    'link',
    'flat',
    'elevated',
    'gradient',
    'glass',
    'glass-shadow',
    'neon',
    'tactile',
    'framed',
  ];

  public readonly severities: ButtonSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'help',
    'danger',
    'contrast',
  ];

  public readonly sizes: ButtonSize[] = ['sm', 'md', 'lg'];

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Falls back to the global theme when null.',
    },
    {
      name: 'appearance',
      type: "'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'flat' | 'elevated' | 'gradient' | 'glass' | 'glass-shadow' | 'neon' | 'tactile' | 'framed'",
      default: "'solid'",
      description:
        'Visual style. All 12 appearances compose with any severity and the pill / raised modifiers.',
    },
    {
      name: 'severity',
      type: "'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'warning' | 'help' | 'danger' | 'contrast' | null",
      default: 'null',
      description: 'Semantic colour role. Defaults to primary when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Button size.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'Native button type attribute.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the button and removes it from the tab order.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows a spinner and blocks interaction while true.',
    },
    {
      name: 'loadingIcon',
      type: 'SemanticIcon | string',
      default: "'spinner'",
      description: 'Icon displayed during the loading state.',
    },
    {
      name: 'icon',
      type: 'SemanticIcon | string | null',
      default: 'null',
      description: 'Icon name to render alongside the label.',
    },
    {
      name: 'iconPosition',
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'left'",
      description: 'Position of the icon relative to the label.',
    },
    {
      name: 'iconOnly',
      type: 'boolean',
      default: 'false',
      description:
        'Hides the projected label and applies icon-only styles. Must be paired with ariaLabel.',
    },
    {
      name: 'raised',
      type: 'boolean',
      default: 'false',
      description: 'Orthogonal modifier — adds a drop shadow beneath the button.',
    },
    {
      name: 'pill',
      type: 'boolean',
      default: 'false',
      description: 'Orthogonal modifier — applies full pill border-radius (999px).',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Stretches the button to fill its container width.',
    },
    {
      name: 'badge',
      type: 'string | number | null',
      default: 'null',
      description: 'Counter value overlaid on the button as a badge.',
    },
    {
      name: 'badgeSeverity',
      type: 'BadgeSeverity',
      default: "'danger'",
      description:
        "Semantic severity for the badge overlay. Accepts all ButtonSeverity values plus 'neutral'.",
    },
    {
      name: 'badgeClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class applied to the badge wrapper element.',
    },
    {
      name: 'shadow',
      type: 'string | null',
      default: 'null',
      description: 'Inline CSS value applied to the --uilib-button-shadow custom property.',
    },
    {
      name: 'role',
      type: 'string | null',
      default: 'null',
      description: 'ARIA role override for specialised contexts (e.g., menuitem).',
    },
    {
      name: 'tabIndex',
      type: 'number | null',
      default: 'null',
      description: 'Controls focus order; use -1 to remove from natural tab sequence.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label. Required when iconOnly is true.',
    },
    {
      name: 'ariaPressed',
      type: 'boolean | null',
      default: 'null',
      description: 'Maps to aria-pressed for toggle-style buttons.',
    },
    {
      name: 'ariaChecked',
      type: 'boolean | null',
      default: 'null',
      description: 'Maps to aria-checked for checkable button roles.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab / Shift+Tab', action: 'Move focus to / from the button.' },
    { key: 'Space / Enter', action: 'Activate the button (native browser behaviour).' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public setVariant(variant: ButtonVariant): void {
    this.activeVariant.set(variant);
  }

  public logEvent(message: string): void {
    const timestamp: string = new Date().toLocaleTimeString();
    this.eventLog.update((entries: ButtonLogEntry[]): ButtonLogEntry[] => [
      { timestamp, message },
      ...entries.slice(0, 9),
    ]);
  }
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-button-radius', description: 'Border radius.' },
    { variable: '--uilib-button-gap', description: 'Gap.' },
    { variable: '--uilib-button-transition', description: 'Transition.' },
    { variable: '--uilib-button-focus-color', description: 'Focus colour.' },
    { variable: '--uilib-button-focus-ring-color', description: 'Focus ring colour.' },
    { variable: '--uilib-button-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-button-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-button-border-width', description: 'Border width.' },
    { variable: '--uilib-button-border-style', description: 'Border style.' },
    { variable: '--uilib-button-shadow', description: 'Box shadow.' },
    { variable: '--uilib-button-shadow-hover', description: 'Box shadow (hover).' },
    { variable: '--uilib-button-text-transform', description: 'Text transform.' },
    { variable: '--uilib-button-letter-spacing', description: 'Letter spacing.' },
    { variable: '--uilib-button-padding-small', description: 'Padding — sm.' },
    { variable: '--uilib-button-padding-medium', description: 'Padding — md.' },
    { variable: '--uilib-button-padding-large', description: 'Padding — lg.' },
    { variable: '--uilib-button-font-size-small', description: 'Font size — sm.' },
    { variable: '--uilib-button-font-size-medium', description: 'Font size — md.' },
    { variable: '--uilib-button-font-size-large', description: 'Font size — lg.' },
    { variable: '--uilib-button-shadow-raised', description: 'Shadow Raised.' },
    { variable: '--uilib-button-shadow-raised-hover', description: 'Shadow Raised (hover).' },
    { variable: '--uilib-button-badge-offset-x', description: 'Badge Offset X.' },
    { variable: '--uilib-button-badge-offset-y', description: 'Badge Offset Y.' },
    { variable: '--uilib-button-badge-radius', description: 'Badge border radius.' },
    { variable: '--uilib-button-badge-shadow', description: 'Badge box shadow.' },
    { variable: '--uilib-button-badge-font-size', description: 'Badge font size.' },
    { variable: '--uilib-button-badge-padding', description: 'Badge padding.' },
    { variable: '--uilib-button-framed-stroke', description: 'Framed Stroke.' },
    { variable: '--uilib-button-framed-bg', description: 'Framed background colour.' },
    { variable: '--uilib-button-framed-fg', description: 'Framed Fg.' },
    { variable: '--uilib-button-framed-border-color', description: 'Framed Border text colour.' },
    { variable: '--uilib-button-framed-border-width', description: 'Framed Border width.' },
    { variable: '--uilib-button-framed-frame-color', description: 'Framed Frame text colour.' },
    {
      variable: '--uilib-button-framed-frame-border-width',
      description: 'Framed Frame Border width.',
    },
    { variable: '--uilib-button-framed-frame-offset-x', description: 'Framed Frame Offset X.' },
    { variable: '--uilib-button-framed-frame-offset-y', description: 'Framed Frame Offset Y.' },
    {
      variable: '--uilib-button-framed-frame-hover-offset-x',
      description: 'Framed Frame Hover Offset X.',
    },
    {
      variable: '--uilib-button-framed-frame-hover-offset-y',
      description: 'Framed Frame Hover Offset Y.',
    },
    {
      variable: '--uilib-button-framed-frame-active-offset-x',
      description: 'Framed Frame Active Offset X.',
    },
    {
      variable: '--uilib-button-framed-frame-active-offset-y',
      description: 'Framed Frame Active Offset Y.',
    },
    {
      variable: '--uilib-button-framed-active-translate-x',
      description: 'Framed Active Translate X.',
    },
    {
      variable: '--uilib-button-framed-active-translate-y',
      description: 'Framed Active Translate Y.',
    },
    { variable: '--uilib-button-framed-font-weight', description: 'Framed font weight.' },
    { variable: '--uilib-button-framed-letter-spacing', description: 'Framed letter spacing.' },
    { variable: '--uilib-button-glass-shadow-from', description: 'Glass Shadow From.' },
    { variable: '--uilib-button-glass-shadow-to', description: 'Glass Shadow To.' },
    { variable: '--uilib-button-glass-shadow-x', description: 'Glass Shadow X.' },
    { variable: '--uilib-button-glass-shadow-y', description: 'Glass Shadow Y.' },
    { variable: '--uilib-button-glass-shadow-hover-x', description: 'Glass Shadow Hover X.' },
    { variable: '--uilib-button-glass-shadow-hover-y', description: 'Glass Shadow Hover Y.' },
    { variable: '--uilib-button-glass-shadow-active-x', description: 'Glass Shadow Active X.' },
    { variable: '--uilib-button-glass-shadow-active-y', description: 'Glass Shadow Active Y.' },
    { variable: '--uilib-button-glass-shadow-glow-blur', description: 'Glass Shadow Glow Blur.' },
    {
      variable: '--uilib-button-glass-shadow-blur-amount',
      description: 'Glass Shadow Blur Amount.',
    },
    { variable: '--uilib-button-glass-shadow-bg', description: 'Glass Shadow background colour.' },
    {
      variable: '--uilib-button-glass-shadow-bg-hover',
      description: 'Glass Shadow background colour (hover).',
    },
    {
      variable: '--uilib-button-glass-shadow-border-color',
      description: 'Glass Shadow Border text colour.',
    },
    {
      variable: '--uilib-button-glass-shadow-border-hover',
      description: 'Glass Shadow border shorthand (hover).',
    },
    { variable: '--uilib-button-glass-shadow-fg', description: 'Glass Shadow Fg.' },
    {
      variable: '--uilib-button-glass-shadow-font-weight',
      description: 'Glass Shadow font weight.',
    },
    {
      variable: '--uilib-button-glass-shadow-letter-spacing',
      description: 'Glass Shadow letter spacing.',
    },
    {
      variable: '--uilib-button-glass-shadow-gradient-angle',
      description: 'Glass Shadow Gradient Angle.',
    },
    { variable: '--uilib-button-glass-shadow-opacity', description: 'Glass Shadow opacity.' },
    { variable: '--uilib-button-tactile-from', description: 'Tactile From.' },
    { variable: '--uilib-button-tactile-to', description: 'Tactile To.' },
    { variable: '--uilib-button-tactile-border', description: 'Tactile border shorthand.' },
    { variable: '--uilib-button-tactile-fg', description: 'Tactile Fg.' },
    { variable: '--uilib-button-tactile-radius', description: 'Tactile border radius.' },
    { variable: '--uilib-button-tactile-border-width', description: 'Tactile Border width.' },
    { variable: '--uilib-button-padding-x-small', description: 'Horizontal padding — sm.' },
    { variable: '--uilib-button-padding-y-small', description: 'Vertical padding — sm.' },
    { variable: '--uilib-button-padding-x-medium', description: 'Horizontal padding — md.' },
    { variable: '--uilib-button-padding-y-medium', description: 'Vertical padding — md.' },
    { variable: '--uilib-button-padding-x-large', description: 'Horizontal padding — lg.' },
    { variable: '--uilib-button-padding-y-large', description: 'Vertical padding — lg.' },
    { variable: '--uilib-button-icon-gap', description: 'Icon gap.' },
    { variable: '--uilib-button-padding', description: 'Padding.' },
    { variable: '--uilib-button-font-size', description: 'Font size.' },
    { variable: '--uilib-button-bg', description: 'Background colour.' },
    { variable: '--uilib-button-fg', description: 'Fg.' },
    { variable: '--uilib-button-bg-hover', description: 'Background colour (hover).' },
    { variable: '--uilib-button-bg-active', description: 'Background colour (active).' },
    { variable: '--uilib-button-border', description: 'Border shorthand.' },
    { variable: '--uilib-button-primary-bg', description: 'Primary background colour.' },
    {
      variable: '--uilib-button-primary-bg-hover',
      description: 'Primary background colour (hover).',
    },
    { variable: '--uilib-button-primary-border', description: 'Primary border shorthand.' },
    { variable: '--uilib-button-primary-fg', description: 'Primary Fg.' },
    { variable: '--uilib-button-secondary-bg', description: 'Secondary background colour.' },
    {
      variable: '--uilib-button-secondary-bg-hover',
      description: 'Secondary background colour (hover).',
    },
    { variable: '--uilib-button-secondary-border', description: 'Secondary border shorthand.' },
    { variable: '--uilib-button-secondary-fg', description: 'Secondary Fg.' },
    { variable: '--uilib-button-success-bg', description: 'Success background colour.' },
    {
      variable: '--uilib-button-success-bg-hover',
      description: 'Success background colour (hover).',
    },
    { variable: '--uilib-button-success-border', description: 'Success border shorthand.' },
    { variable: '--uilib-button-success-fg', description: 'Success Fg.' },
    { variable: '--uilib-button-danger-bg', description: 'Danger background colour.' },
    {
      variable: '--uilib-button-danger-bg-hover',
      description: 'Danger background colour (hover).',
    },
    { variable: '--uilib-button-danger-border', description: 'Danger border shorthand.' },
    { variable: '--uilib-button-danger-fg', description: 'Danger Fg.' },
    { variable: '--uilib-button-warning-bg', description: 'Warning background colour.' },
    {
      variable: '--uilib-button-warning-bg-hover',
      description: 'Warning background colour (hover).',
    },
    { variable: '--uilib-button-warning-border', description: 'Warning border shorthand.' },
    { variable: '--uilib-button-warning-fg', description: 'Warning Fg.' },
    { variable: '--uilib-button-info-bg', description: 'Info background colour.' },
    { variable: '--uilib-button-info-bg-hover', description: 'Info background colour (hover).' },
    { variable: '--uilib-button-info-border', description: 'Info border shorthand.' },
    { variable: '--uilib-button-info-fg', description: 'Info Fg.' },
    { variable: '--uilib-button-contrast-bg', description: 'Contrast background colour.' },
    {
      variable: '--uilib-button-contrast-bg-hover',
      description: 'Contrast background colour (hover).',
    },
    { variable: '--uilib-button-contrast-border', description: 'Contrast border shorthand.' },
    { variable: '--uilib-button-contrast-fg', description: 'Contrast Fg.' },
  ];
}
