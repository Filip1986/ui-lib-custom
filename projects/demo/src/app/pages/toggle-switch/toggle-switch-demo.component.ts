import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitch } from 'ui-lib-custom/toggle-switch';
import { Button } from 'ui-lib-custom/button';
import type { ToggleSwitchSize, ToggleSwitchVariant } from 'ui-lib-custom/toggle-switch';
import { Card } from 'ui-lib-custom/card';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the ToggleSwitch component.
 */
@Component({
  selector: 'app-toggle-switch-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    ToggleSwitch,
    Card,
    FormsModule,
    ReactiveFormsModule,
    Button,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './toggle-switch-demo.component.html',
  styleUrl: './toggle-switch-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToggleSwitchDemoComponent {
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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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
    { nonNullable: true }
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
}
