import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { UiLibInput } from 'ui-lib-custom/input';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { SelectOption } from 'ui-lib-custom/select';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';

/**
 * Demo page for accessibility guidance and examples.
 */
@Component({
  selector: 'app-accessibility-page',
  standalone: true,
  imports: [
    CommonModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
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
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [{ id: 'high-contrast', label: 'High Contrast' }];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly options: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];
}
