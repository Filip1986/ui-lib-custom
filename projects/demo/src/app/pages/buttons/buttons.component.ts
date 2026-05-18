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
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';
import { Panel } from 'ui-lib-custom/panel';
import { Card } from 'ui-lib-custom/card';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

interface ButtonLogEntry {
  timestamp: string;
  message: string;
}

interface ApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
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
    TableComponent,
    TableColumnComponent,
    TableColumnBodyDirective,
    Panel,
    Card,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsComponent {
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

  public readonly apiRows: ApiRow[] = [
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
}
