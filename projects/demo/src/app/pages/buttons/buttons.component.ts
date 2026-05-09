import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
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
 * Shows all variants, appearances, severities, sizes, icons, and states.
 */
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [Button, ButtonGroup, TableComponent, TableColumnComponent, TableColumnBodyDirective],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsComponent {
  public readonly activeVariant: WritableSignal<ButtonVariant> = signal<ButtonVariant>('material');
  public readonly eventLog: WritableSignal<ButtonLogEntry[]> = signal<ButtonLogEntry[]>([]);

  public readonly variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];
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
  public readonly sizes: ButtonSize[] = ['small', 'medium', 'large'];

  public readonly apiRows: ApiRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. Falls back to the global theme when null.',
    },
    {
      name: 'appearance',
      type: "'solid' | 'outline' | 'ghost'",
      default: "'solid'",
      description: 'Fill style. Overridden by the text and outlined shorthand inputs.',
    },
    {
      name: 'severity',
      type: 'ButtonSeverity | null',
      default: 'null',
      description:
        'Semantic colour role (primary, secondary, success, info, warn, warning, help, danger, contrast). Takes precedence over color.',
    },
    {
      name: 'color',
      type: 'ButtonSeverity',
      default: "'primary'",
      description: 'Alias for severity. Used when severity is not set.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'",
      default: "'md'",
      description: 'Button size. Short and long aliases are both accepted.',
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
      type: 'boolean | null',
      default: 'null',
      description:
        'Hides the projected label and applies icon-only styles. Must be paired with ariaLabel.',
    },
    {
      name: 'raised',
      type: 'boolean',
      default: 'false',
      description: 'Adds a drop shadow beneath the button.',
    },
    {
      name: 'rounded',
      type: 'boolean',
      default: 'false',
      description: 'Applies full pill border-radius.',
    },
    {
      name: 'text',
      type: 'boolean',
      default: 'false',
      description: 'Shorthand for appearance="ghost".',
    },
    {
      name: 'outlined',
      type: 'boolean',
      default: 'false',
      description: 'Shorthand for appearance="outline".',
    },
    {
      name: 'link',
      type: 'boolean',
      default: 'false',
      description: 'Renders the button with a hyperlink-style appearance.',
    },
    {
      name: 'contrast',
      type: 'boolean',
      default: 'false',
      description: 'Shorthand that forces severity="contrast".',
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
      name: 'badgeColor',
      type: 'BadgeSeverity',
      default: "'danger'",
      description: 'Badge colour. badgeSeverity takes precedence when set.',
    },
    {
      name: 'badgeSeverity',
      type: 'BadgeSeverity | null',
      default: 'null',
      description: 'Semantic severity for the badge overlay.',
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
