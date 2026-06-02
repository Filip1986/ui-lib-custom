import type { Signal, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Button } from 'ui-lib-custom/button';
import { Panel } from 'ui-lib-custom/panel';
import type { ToggleSwitchSize, ToggleSwitchVariant } from 'ui-lib-custom/toggle-switch';
import { ToggleSwitch } from 'ui-lib-custom/toggle-switch';

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
 * Demo page for the ToggleSwitch component.
 */
@Component({
  selector: 'app-toggle-switch-demo',
  standalone: true,
  imports: [
    Panel,
    ToggleSwitch,
    FormsModule,
    ReactiveFormsModule,
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
  templateUrl: './toggle-switch-demo.component.html',
  styleUrl: './toggle-switch-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToggleSwitchDemoComponent {
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
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { ToggleSwitch } from 'ui-lib-custom/toggle-switch'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'disabled-readonly', label: 'Disabled & Readonly' },
    { id: 'ngmodel', label: 'ngModel' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
    { id: 'playground', label: 'Playground' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'label',
      type: 'string | null',
      default: 'null',
      description: 'Text label rendered beside the switch.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Switch size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the switch read-only.',
    },
    {
      name: 'autofocus',
      type: 'boolean',
      default: 'false',
      description: 'Auto-focuses on render.',
    },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order.' },
    {
      name: 'inputId',
      type: 'string | null',
      default: 'null',
      description: 'Id for the inner input element.',
    },
    {
      name: 'name',
      type: 'string | null',
      default: 'null',
      description: 'Name attribute for form submission.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class.',
    },
  ];

  public readonly variants: ToggleSwitchVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ToggleSwitchSize[] = ['sm', 'md', 'lg'];

  /** Playground controls */
  public readonly playgroundVariant: WritableSignal<ToggleSwitchVariant> =
    signal<ToggleSwitchVariant>('material');
  public readonly playgroundSize: WritableSignal<ToggleSwitchSize> = signal<ToggleSwitchSize>('md');
  public readonly playgroundDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundReadonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundLabel: WritableSignal<string> = signal<string>('Enable notifications');
  public playgroundChecked: boolean = false;

  /** Basic examples */
  public basicChecked: boolean = false;
  public preChecked: boolean = true;

  /** ngModel binding */
  public ngModelValue: boolean = false;

  /** Reactive form */
  public readonly notificationsControl: FormControl<boolean> = new FormControl<boolean>(false, {
    nonNullable: true,
  });
  public readonly disabledControl: FormControl<boolean> = new FormControl<boolean>(
    { value: true, disabled: true },
    { nonNullable: true },
  );

  public setPlaygroundVariant(variant: ToggleSwitchVariant): void {
    this.playgroundVariant.set(variant);
  }

  public setPlaygroundSize(size: ToggleSwitchSize): void {
    this.playgroundSize.set(size);
  }

  public reactiveFormText(): string {
    return this.notificationsControl.value ? 'Enabled' : 'Disabled';
  }

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Switch',
      attribute: 'role',
      value: '"switch"',
      notes: 'The toggle control uses the switch role to represent a binary on/off state.',
    },
    {
      element: 'Switch',
      attribute: 'aria-checked',
      value: '"true" | "false"',
      notes: 'Reflects the current checked (on) or unchecked (off) state.',
    },
    {
      element: 'Switch',
      attribute: 'aria-label',
      value: 'string',
      notes: 'Provide via <code>[ariaLabel]</code> when there is no adjacent visible label.',
    },
    {
      element: 'Switch (disabled)',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Marks the switch as non-interactive.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Space',
      action: 'Toggles the switch between on and off.',
    },
    {
      key: 'Tab / Shift+Tab',
      action: 'Moves focus to or from the toggle switch in the standard tab order.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-toggle-switch-track-width', description: 'Track width.' },
    { variable: '--uilib-toggle-switch-track-height', description: 'Track height.' },
    { variable: '--uilib-toggle-switch-thumb-size', description: 'Thumb size.' },
    { variable: '--uilib-toggle-switch-thumb-offset', description: 'Thumb offset.' },
    { variable: '--uilib-toggle-switch-track-bg', description: 'Track background colour.' },
    {
      variable: '--uilib-toggle-switch-track-bg-checked',
      description: 'Track background colour (checked).',
    },
    {
      variable: '--uilib-toggle-switch-track-bg-hover',
      description: 'Track background colour (hover).',
    },
    {
      variable: '--uilib-toggle-switch-track-bg-checked-hover',
      description: 'Track Bg Checked (hover).',
    },
    {
      variable: '--uilib-toggle-switch-track-border-color',
      description: 'Track Border text colour.',
    },
    { variable: '--uilib-toggle-switch-track-border-radius', description: 'Track border radius.' },
    { variable: '--uilib-toggle-switch-thumb-bg', description: 'Thumb background colour.' },
    {
      variable: '--uilib-toggle-switch-thumb-bg-checked',
      description: 'Thumb background colour (checked).',
    },
    { variable: '--uilib-toggle-switch-thumb-shadow', description: 'Thumb box shadow.' },
    { variable: '--uilib-toggle-switch-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-toggle-switch-gap', description: 'Gap.' },
    { variable: '--uilib-toggle-switch-font', description: 'Font.' },
    { variable: '--uilib-toggle-switch-transition-duration', description: 'Transition Duration.' },
  ];
}
