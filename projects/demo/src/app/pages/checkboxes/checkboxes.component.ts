import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Button, Checkbox, CheckboxSize, CheckboxVariant } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocControlGroupComponent } from '../../shared/doc-page/doc-control-group.component';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-checkboxes',
  standalone: true,
  imports: [
    CommonModule,
    Checkbox,
    Button,
    DocPageLayoutComponent,
    DocControlGroupComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './checkboxes.component.html',
  styleUrl: './checkboxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  readonly variants: CheckboxVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly sizes: CheckboxSize[] = ['sm', 'md', 'lg'];

  variant = signal<CheckboxVariant>('material');
  size = signal<CheckboxSize>('md');
  disabled = signal(false);
  indeterminate = signal(false);
  showDescription = signal(true);
  label = signal('Receive product updates');
  description = signal('Weekly highlights, delivered every Monday.');

  checkedPrimary = false;
  checkedSecondary = true;

  readonly playgroundDescription = computed(() => (this.showDescription() ? this.description() : null));

  readonly snippets = {
    usage: `import { Checkbox } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Checkbox],
  template: \`
    <ui-lib-checkbox
      label="Sync data"
      description="Keep devices aligned"
      variant="material"
      size="md"
      [(checked)]="syncEnabled">
    </ui-lib-checkbox>
  \`
})
export class SettingsComponent {
  syncEnabled = false;
}`,
  } as const;

  selectVariant(value: CheckboxVariant): void {
    this.variant.set(value);
  }

  selectSize(value: CheckboxSize): void {
    this.size.set(value);
  }

  onPrimaryChange(next: boolean): void {
    this.checkedPrimary = next;
  }

  onSecondaryChange(next: boolean): void {
    this.checkedSecondary = next;
  }
}
