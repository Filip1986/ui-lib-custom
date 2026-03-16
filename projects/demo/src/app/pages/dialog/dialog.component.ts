import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Icon } from 'ui-lib-custom/icon';
import { DialogComponent } from 'ui-lib-custom/dialog';
import type { DialogPosition, DialogVariant } from 'ui-lib-custom/dialog';

/**
 * Demo page for Dialog component capabilities.
 */
@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    CommonModule,
    DocPageLayoutComponent,
    VariantComparisonComponent,
    Card,
    Button,
    Icon,
    DialogComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'custom-header-footer', label: 'Custom Header & Footer' },
    { id: 'position', label: 'Position' },
    { id: 'maximizable', label: 'Maximizable' },
    { id: 'long-content', label: 'Long Content' },
    { id: 'without-modal', label: 'Without Modal' },
    { id: 'responsive', label: 'Responsive' },
    { id: 'draggable', label: 'Draggable' },
    { id: 'headless', label: 'Headless' },
    { id: 'variant-switcher', label: 'Variant Switcher' },
  ];

  public basicVisible: boolean = false;
  public customVisible: boolean = false;
  public maximizableVisible: boolean = false;
  public longContentVisible: boolean = false;
  public nonModalVisible: boolean = false;
  public responsiveVisible: boolean = false;
  public draggableVisible: boolean = false;
  public headlessVisible: boolean = false;
  public variantVisible: boolean = false;

  public readonly positions: DialogPosition[] = [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  public readonly positionVisible: Record<DialogPosition, boolean> = {
    center: false,
    top: false,
    bottom: false,
    left: false,
    right: false,
    'top-left': false,
    'top-right': false,
    'bottom-left': false,
    'bottom-right': false,
  };

  public selectedVariant: DialogVariant = 'material';

  public readonly variantCompareVisible: Record<DialogVariant, boolean> = {
    material: false,
    bootstrap: false,
    minimal: false,
  };

  public readonly responsiveBreakpoints: Record<string, string> = {
    '1200px': '50vw',
    '960px': '75vw',
    '640px': '92vw',
  };

  public readonly longParagraphs: string[] = [
    'This section demonstrates dialog content scrolling when content exceeds available viewport height.',
    'Dialogs should keep actions visible and readable while allowing users to review longer body content.',
    'The component keeps body overflow inside the content region, not the entire page, when modal mode is active.',
    'Use this pattern for legal text, audit logs, long release notes, and multi-paragraph confirmation content.',
    'For very complex workflows consider routing to a full page instead of overloading a single dialog.',
    'Responsive breakpoints can be combined with long content to maintain readability on smaller screens.',
    'Keyboard users can still use Escape to close when `closeOnEscape` is enabled.',
    'Projected footer actions remain available at the bottom even when body content scrolls.',
  ];

  public openPosition(position: DialogPosition): void {
    this.positionVisible[position] = true;
  }

  public setVariant(variant: DialogVariant): void {
    this.selectedVariant = variant;
  }
}
