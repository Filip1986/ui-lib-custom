import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge, Button, Card, Checkbox, UiLibInput, UiLibSelect } from 'ui-lib-custom';
import type { SelectOption } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';

/**
 * Demo page for accessibility guidance and examples.
 */
@Component({
  selector: 'app-accessibility-page',
  standalone: true,
  imports: [
    CommonModule,
    DocPageLayoutComponent,
    Card,
    Button,
    UiLibInput,
    UiLibSelect,
    Checkbox,
    Badge,
  ],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityComponent {
  public readonly sections: DocSection[] = [{ id: 'high-contrast', label: 'High Contrast' }];

  public readonly options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];
}
