import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { Card } from 'ui-lib-custom/card';
import { Button } from 'ui-lib-custom/button';
import { ToggleButton } from 'ui-lib-custom/toggle-button';
import type {
  ToggleButtonChangeEvent,
  ToggleButtonIconPos,
  ToggleButtonSize,
  ToggleButtonVariant,
} from 'ui-lib-custom/toggle-button';

type SnippetKey =
  | 'basic'
  | 'labels'
  | 'icons'
  | 'iconRight'
  | 'sizes'
  | 'variants'
  | 'allowEmpty'
  | 'disabled'
  | 'ngModel'
  | 'reactive';

/**
 * Demo page for the ToggleButton component.
 */
@Component({
  selector: 'app-toggle-button-demo',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    Button,
    ToggleButton,
  ],
  templateUrl: './toggle-button-demo.component.html',
  styleUrl: './toggle-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonDemoComponent {
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

  public readonly snippets: Record<SnippetKey, string> = {
    basic: `<ui-lib-toggle-button [(checked)]="isActive" />`,

    labels: `<ui-lib-toggle-button
  onLabel="Active"
  offLabel="Inactive"
  [(checked)]="status"
/>`,

    icons: `<ui-lib-toggle-button
  onLabel="Muted"
  offLabel="Sound"
  onIcon="volumeOff"
  offIcon="volumeHigh"
  [(checked)]="muted"
/>`,

    iconRight: `<ui-lib-toggle-button
  onLabel="Muted"
  offLabel="Sound"
  onIcon="volumeOff"
  offIcon="volumeHigh"
  iconPos="right"
  [(checked)]="muted"
/>`,

    sizes: `<!-- Small -->
<ui-lib-toggle-button size="sm" onLabel="On" offLabel="Off" />

<!-- Medium (default) -->
<ui-lib-toggle-button size="md" onLabel="On" offLabel="Off" />

<!-- Large -->
<ui-lib-toggle-button size="lg" onLabel="On" offLabel="Off" />`,

    variants: `<!-- Material -->
<ui-lib-toggle-button variant="material" />

<!-- Bootstrap -->
<ui-lib-toggle-button variant="bootstrap" />

<!-- Minimal -->
<ui-lib-toggle-button variant="minimal" />`,

    allowEmpty: `<!-- Cannot uncheck once checked -->
<ui-lib-toggle-button [allowEmpty]="false" onLabel="Confirmed" offLabel="Confirm" />`,

    disabled: `<ui-lib-toggle-button [disabled]="true" onLabel="On" offLabel="Off" />`,

    ngModel: `<ui-lib-toggle-button [(ngModel)]="notificationsEnabled" />`,

    reactive: `<!-- Reactive Forms -->
<form [formGroup]="form">
  <ui-lib-toggle-button formControlName="notifications" />
  <ui-lib-toggle-button formControlName="darkMode" />
</form>`,
  };

  public snippet(key: SnippetKey): string {
    return this.snippets[key];
  }
}
