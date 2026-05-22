import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { Button } from 'ui-lib-custom/button';
import { ToggleButton } from 'ui-lib-custom/toggle-button';
import type {
  ToggleButtonChangeEvent,
  ToggleButtonIconPos,
  ToggleButtonSize,
  ToggleButtonVariant,
} from 'ui-lib-custom/toggle-button';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  labelsHtml,
  labelsTs,
  iconsHtml,
  iconsTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
  allowEmptyHtml,
  allowEmptyTs,
  disabledHtml,
  disabledTs,
  ngModelHtml,
  ngModelTs,
  reactiveHtml,
  reactiveTs,
} from './snippets.generated';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the ToggleButton component.
 */
@Component({
  selector: 'app-toggle-button-demo',
  standalone: true,
  imports: [
    Panel,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    Button,
    ToggleButton,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './toggle-button-demo.component.html',
  styleUrl: './toggle-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly labelsHtml: string = labelsHtml;
  public readonly labelsTs: string = labelsTs;
  public readonly iconsHtml: string = iconsHtml;
  public readonly iconsTs: string = iconsTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly allowEmptyHtml: string = allowEmptyHtml;
  public readonly allowEmptyTs: string = allowEmptyTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly ngModelHtml: string = ngModelHtml;
  public readonly ngModelTs: string = ngModelTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;

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

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string = "import { ToggleButton } from 'ui-lib-custom/toggle-button'";
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'labels', label: 'Custom Labels' },
    { id: 'icons', label: 'Icons' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'allow-empty', label: 'Allow Empty' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'forms', label: 'Forms' },
    { id: 'events', label: 'Events' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly variantOptions: ToggleButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizeOptions: ToggleButtonSize[] = ['sm', 'md', 'lg'];
  public readonly iconPosOptions: ToggleButtonIconPos[] = ['left', 'right'];

  // Playground state
  public readonly playgroundChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundVariant: WritableSignal<ToggleButtonVariant> =
    signal<ToggleButtonVariant>('material');
  public readonly playgroundSize: WritableSignal<ToggleButtonSize> = signal<ToggleButtonSize>('md');
  public readonly playgroundDisabled: WritableSignal<boolean> = signal<boolean>(false);

  // Section state
  public readonly basicChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly labelsChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly iconLeftChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly iconRightChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly allowEmptyChecked: WritableSignal<boolean> = signal<boolean>(true);

  public readonly sizeSmChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly sizeMdChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly sizeLgChecked: WritableSignal<boolean> = signal<boolean>(false);

  public readonly materialChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly bootstrapChecked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly minimalChecked: WritableSignal<boolean> = signal<boolean>(false);

  // Events log
  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  // Forms integration
  public ngModelValue: boolean = false;
  public readonly reactiveForm: FormGroup = new FormGroup({
    notifications: new FormControl<boolean>(false),
    darkMode: new FormControl<boolean>(true),
  });

  public readonly notificationsValue: Signal<boolean> = signal<boolean>(false);

  public onEventChange(event: ToggleButtonChangeEvent): void {
    const entry: string = `change — checked: ${String(event.checked)}`;
    this.eventLog.update((log: string[]): string[] => [entry, ...log].slice(0, 6));
  }

  public clearEventLog(): void {
    this.eventLog.set([]);
  }

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Toggle button',
      attribute: 'aria-pressed',
      value: '"true" | "false"',
      notes: 'Reflects the current on/off state of the toggle button.',
    },
    {
      element: 'Toggle button',
      attribute: 'aria-label',
      value: 'string',
      notes:
        'Provide a descriptive label via <code>[ariaLabel]</code> when the button uses only an icon.',
    },
    {
      element: 'Toggle button (disabled)',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Marks the button as non-interactive when <code>[disabled]</code> is true.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Space / Enter',
      action: 'Toggles the button between on and off states.',
    },
    {
      key: 'Tab / Shift+Tab',
      action: 'Moves focus to or from the toggle button in the standard tab order.',
    },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'onLabel', type: 'string', default: "'Yes'", description: 'Label shown when pressed.' },
    {
      name: 'offLabel',
      type: 'string',
      default: "'No'",
      description: 'Label shown when not pressed.',
    },
    {
      name: 'onIcon',
      type: 'string | null',
      default: 'null',
      description: 'Icon class when pressed.',
    },
    {
      name: 'offIcon',
      type: 'string | null',
      default: 'null',
      description: 'Icon class when not pressed.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'ARIA label for the button.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-toggle-button-height-sm', description: 'Height — sm.' },
    { variable: '--uilib-toggle-button-height-md', description: 'Height — md.' },
    { variable: '--uilib-toggle-button-height-lg', description: 'Height — lg.' },
    { variable: '--uilib-toggle-button-font-size-sm', description: 'Font size — sm.' },
    { variable: '--uilib-toggle-button-font-size-md', description: 'Font size — md.' },
    { variable: '--uilib-toggle-button-font-size-lg', description: 'Font size — lg.' },
    { variable: '--uilib-toggle-button-padding-x-sm', description: 'Horizontal padding — sm.' },
    { variable: '--uilib-toggle-button-padding-x-md', description: 'Horizontal padding — md.' },
    { variable: '--uilib-toggle-button-padding-x-lg', description: 'Horizontal padding — lg.' },
    { variable: '--uilib-toggle-button-gap', description: 'Gap.' },
    { variable: '--uilib-toggle-button-radius', description: 'Border radius.' },
    { variable: '--uilib-toggle-button-transition', description: 'Transition.' },
    { variable: '--uilib-toggle-button-font', description: 'Font.' },
    { variable: '--uilib-toggle-button-bg', description: 'Background colour.' },
    { variable: '--uilib-toggle-button-border', description: 'Border shorthand.' },
    { variable: '--uilib-toggle-button-color', description: 'Text colour.' },
    { variable: '--uilib-toggle-button-bg-hover', description: 'Background colour (hover).' },
    { variable: '--uilib-toggle-button-border-hover', description: 'Border shorthand (hover).' },
    { variable: '--uilib-toggle-button-bg-active', description: 'Background colour (active).' },
    { variable: '--uilib-toggle-button-checked-bg', description: 'Checked background colour.' },
    { variable: '--uilib-toggle-button-checked-border', description: 'Checked border shorthand.' },
    { variable: '--uilib-toggle-button-checked-color', description: 'Checked text colour.' },
    {
      variable: '--uilib-toggle-button-checked-bg-hover',
      description: 'Checked background colour (hover).',
    },
    {
      variable: '--uilib-toggle-button-checked-bg-active',
      description: 'Checked background colour (active).',
    },
    { variable: '--uilib-toggle-button-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-toggle-button-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-toggle-button-height', description: 'Height.' },
    { variable: '--uilib-toggle-button-font-size', description: 'Font size.' },
  ];
}
