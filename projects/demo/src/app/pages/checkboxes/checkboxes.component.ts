import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  type NgForm,
} from '@angular/forms';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { CheckboxAppearance, CheckboxSize, CheckboxVariant } from 'ui-lib-custom/checkbox';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { CheckboxBasicExampleComponent } from '@demo/examples/checkbox-basic-example.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import { checkboxExampleHtml, checkboxExampleTs, usageTs } from './snippets.generated';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
type TabKey = 'playground' | 'variants' | 'api-reference' | 'accessibility' | 'usage';
type ViewportPreset = { key: string; label: string; width: number; height: number };
type CheckboxOption = { label: string; value: string; disabled?: boolean };

/**
 * Demo page for checkbox variants and behavior.
 */
@Component({
  selector: 'app-checkboxes',
  standalone: true,
  imports: [
    Panel,
    Checkbox,
    CodeSnippet,
    Tabs,
    Tab,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    FormsModule,
    ReactiveFormsModule,
    CheckboxBasicExampleComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocCssVarsTableComponent,

    DocSectionComponent,
  ],
  templateUrl: './checkboxes.component.html',
  styleUrl: './checkboxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxesComponent {
  public readonly checkboxExampleHtml: string = checkboxExampleHtml;
  public readonly checkboxExampleTs: string = checkboxExampleTs;
  public readonly usageTs: string = usageTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Checkbox } from 'ui-lib-custom/checkbox'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly variants: CheckboxVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: CheckboxSize[] = ['sm', 'md', 'lg'];
  public readonly appearances: CheckboxAppearance[] = ['outlined', 'filled'];

  public readonly variantOptions: CheckboxVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizeOptions: CheckboxSize[] = ['sm', 'md', 'lg'];
  public readonly appearanceOptions: CheckboxAppearance[] = ['outlined', 'filled'];

  public readonly variant: WritableSignal<CheckboxVariant> = signal<CheckboxVariant>('material');
  public readonly size: WritableSignal<CheckboxSize> = signal<CheckboxSize>('md');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonlyState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly indeterminate: WritableSignal<boolean> = signal<boolean>(true);
  public readonly appearance: WritableSignal<CheckboxAppearance> =
    signal<CheckboxAppearance>('outlined');
  public readonly showDescription: WritableSignal<boolean> = signal<boolean>(true);
  public readonly label: WritableSignal<string> = signal<string>('Receive product updates');
  public readonly description: WritableSignal<string> = signal<string>(
    'Weekly highlights, delivered every Monday.'
  );

  public checkedPrimary: boolean = false;
  public checkedSecondary: boolean = true;
  public indeterminateChecked: boolean = false;

  public groupSelection: string[] | null = ['security'];
  public readonly groupOptions: CheckboxOption[] = [
    { label: 'Security updates', value: 'security' },
    { label: 'Product announcements', value: 'announcements' },
    { label: 'Research invitations', value: 'research' },
    { label: 'Beta feature access', value: 'beta' },
  ];

  public readonly dynamicOptions: WritableSignal<CheckboxOption[]> = signal<CheckboxOption[]>([
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push notifications', value: 'push' },
  ]);
  public dynamicSelection: string[] | null = ['email'];
  public readonly dynamicOptionLabel: WritableSignal<string> = signal<string>('');

  public customModel: string = 'NO';
  public readonly customTrueValue: string = 'YES';
  public readonly customFalseValue: string = 'NO';

  public readonly reactiveForm: FormGroup<{
    accepted: FormControl<boolean>;
    channels: FormControl<string[] | null>;
    customStatus: FormControl<string>;
  }> = new FormGroup({
    accepted: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
    channels: new FormControl<string[] | null>([], {
      validators: [Validators.required],
    }),
    customStatus: new FormControl<string>('NO', { nonNullable: true }),
  });

  public templateAccepted: boolean = false;
  public templateSubmitted: boolean = false;

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  public readonly playgroundDescription: Signal<string | null> = computed<string | null>(
    (): string | null => (this.showDescription() ? this.description() : null)
  );

  public selectVariant(value: CheckboxVariant): void {
    this.variant.set(value);
  }

  public selectSize(value: CheckboxSize): void {
    this.size.set(value);
  }

  public onIndeterminateChange(next: boolean): void {
    this.indeterminateChecked = next;
    this.indeterminate.set(false);
  }

  public resetIndeterminateState(): void {
    this.indeterminate.set(true);
    this.indeterminateChecked = false;
  }

  public addDynamicOption(): void {
    const label: string = this.dynamicOptionLabel().trim();
    if (!label) {
      return;
    }

    const normalizedValue: string = label.toLowerCase().replace(/\s+/g, '-');
    const existingOption: CheckboxOption | undefined = this.dynamicOptions().find(
      (option: CheckboxOption): boolean => option.value === normalizedValue
    );
    if (existingOption) {
      this.dynamicOptionLabel.set('');
      return;
    }

    this.dynamicOptions.update((options: CheckboxOption[]): CheckboxOption[] => [
      ...options,
      { label, value: normalizedValue },
    ]);
    this.dynamicOptionLabel.set('');
  }

  public removeDynamicOption(value: string): void {
    this.dynamicOptions.update((options: CheckboxOption[]): CheckboxOption[] =>
      options.filter((option: CheckboxOption): boolean => option.value !== value)
    );
    const selectedValues: string[] = Array.isArray(this.dynamicSelection)
      ? this.dynamicSelection
      : [];
    this.dynamicSelection = selectedValues.filter(
      (selectedValue: string): boolean => selectedValue !== value
    );
  }

  public submitTemplateForm(form: NgForm): void {
    this.templateSubmitted = true;
    void form;
  }

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) {
      return;
    }
    this.setTab(value as TabKey);
  }

  public channelsInvalid(): boolean {
    const channelsControl: FormControl<string[] | null> = this.reactiveForm.controls.channels;
    return channelsControl.invalid && (channelsControl.touched || channelsControl.dirty);
  }

  public acceptedInvalid(): boolean {
    const acceptedControl: FormControl<boolean> = this.reactiveForm.controls.accepted;
    return acceptedControl.invalid && (acceptedControl.touched || acceptedControl.dirty);
  }

  public customStatusText(): string {
    return this.customModel === this.customTrueValue ? 'Enabled' : 'Disabled';
  }

  public groupSelectionText(): string {
    return JSON.stringify(this.groupSelection ?? []);
  }

  public dynamicSelectionText(): string {
    return JSON.stringify(this.dynamicSelection ?? []);
  }

  public reactiveFormValueText(): string {
    return JSON.stringify(this.reactiveForm.getRawValue());
  }

  public get viewportPresets(): ViewportPreset[] {
    return this.viewport?.presets() ?? [];
  }

  public viewportDisplayWidth(): number {
    return this.viewport?.displayWidth() ?? 0;
  }

  public viewportDisplayHeight(): number {
    return this.viewport?.displayHeight() ?? 0;
  }

  public viewportCustomWidth(): number {
    return this.viewport?.customWidth() ?? 0;
  }

  public setViewportCustomWidth(value: number): void {
    this.viewport?.setCustomWidth(value);
  }

  public setViewportPreset(preset: ViewportPreset): void {
    this.viewport?.setPreset(preset);
  }

  public applyViewportCustom(): void {
    this.viewport?.setCustom();
  }

  public rotateViewport(): void {
    this.viewport?.rotate();
  }

  public setViewportDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.viewport?.setDensity(value);
  }
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-checkbox-gap', description: 'Gap.' },
    { variable: '--uilib-checkbox-border', description: 'Border shorthand.' },
    { variable: '--uilib-checkbox-border-hover', description: 'Border shorthand (hover).' },
    { variable: '--uilib-checkbox-border-active', description: 'Border shorthand (active).' },
    { variable: '--uilib-checkbox-bg', description: 'Background colour.' },
    { variable: '--uilib-checkbox-filled-bg', description: 'Filled background colour.' },
    { variable: '--uilib-checkbox-filled-border-color', description: 'Filled Border text colour.' },
    { variable: '--uilib-checkbox-bg-checked', description: 'Background colour (checked).' },
    { variable: '--uilib-checkbox-check-color', description: 'Checkmark colour.' },
    { variable: '--uilib-checkbox-description-color', description: 'Description text colour.' },
    { variable: '--uilib-checkbox-radius', description: 'Border radius.' },
    { variable: '--uilib-checkbox-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-checkbox-size-sm', description: 'Size — sm.' },
    { variable: '--uilib-checkbox-size-md', description: 'Size — md.' },
    { variable: '--uilib-checkbox-size-lg', description: 'Size — lg.' },
    { variable: '--uilib-checkbox-font', description: 'Font.' },
    { variable: '--uilib-checkbox-padding-base', description: 'Padding Base.' },
    { variable: '--uilib-checkbox-transition-duration', description: 'Transition Duration.' },
    { variable: '--uilib-checkbox-size', description: 'Size.' },
  ];
}
