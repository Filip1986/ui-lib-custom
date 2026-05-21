import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';
import {
  SpeedDialComponent,
  SpeedDialIconDirective,
  SpeedDialItemDirective,
} from 'ui-lib-custom/speed-dial';
import type {
  SpeedDialDirection,
  SpeedDialItem,
  SpeedDialItemCommandEvent,
  SpeedDialVariant,
} from 'ui-lib-custom/speed-dial';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
interface SpeedDialLogEntry {
  timestamp: string;
  message: string;
}

/**
 * Demo page for the SpeedDial component.
 * Shows all layout types, directions, tooltip, mask, template, and disabled states.
 */
@Component({
  selector: 'app-speed-dial-demo',
  standalone: true,
  imports: [
    Icon,
    SpeedDialComponent,
    SpeedDialIconDirective,
    SpeedDialItemDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './speed-dial-demo.component.html',
  styleUrl: './speed-dial-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SpeedDialDemoComponent {
  public readonly importCode: string =
    "import { SpeedDialComponent } from 'ui-lib-custom/speed-dial'";

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
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'linear', label: 'Linear' },
    { id: 'circle', label: 'Circle' },
    { id: 'semi-circle', label: 'Semi-Circle' },
    { id: 'quarter-circle', label: 'Quarter-Circle' },
    { id: 'tooltip', label: 'Tooltip' },
    { id: 'mask', label: 'Mask' },
    { id: 'custom-template', label: 'Custom Template' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'event-log', label: 'Event Log' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'model',
      type: 'SpeedDialItem[]',
      default: '[]',
      description: 'Array of action items.',
    },
    {
      name: 'type',
      type: "'linear' | 'circle' | 'semi-circle' | 'quarter-circle'",
      default: "'linear'",
      description: 'Layout type of the action items.',
    },
    {
      name: 'direction',
      type: "'up' | 'down' | 'left' | 'right'",
      default: "'up'",
      description: 'Direction the items expand toward.',
    },
    {
      name: 'radius',
      type: 'number',
      default: '0',
      description: 'Radius in pixels for circle/semi-circle layouts.',
    },
    {
      name: 'mask',
      type: 'boolean',
      default: 'false',
      description: 'Shows a full-screen backdrop mask when open.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the speed dial.',
    },
    {
      name: 'hideOnClickOutside',
      type: 'boolean',
      default: 'true',
      description: 'Closes the dial when clicking outside.',
    },
    {
      name: 'rotateAnimation',
      type: 'boolean',
      default: 'true',
      description: 'Rotates the toggle icon when open.',
    },
    {
      name: 'showIcon',
      type: 'string',
      default: "'plus'",
      description: 'Icon name for the closed state.',
    },
    {
      name: 'hideIcon',
      type: 'string | null',
      default: 'null',
      description: 'Icon name for the open state (defaults to showIcon if null).',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size.' },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order.' },
    {
      name: 'buttonAriaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label for the toggle button.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label for the speed dial group.',
    },
  ];

  public readonly activeVariant: WritableSignal<SpeedDialVariant> =
    signal<SpeedDialVariant>('material');
  public readonly eventLog: WritableSignal<SpeedDialLogEntry[]> = signal<SpeedDialLogEntry[]>([]);

  public readonly variants: SpeedDialVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly linearDirections: readonly SpeedDialDirection[] = ['up', 'down', 'left', 'right'];
  public readonly quarterDirections: readonly SpeedDialDirection[] = [
    'up-left',
    'up-right',
    'down-left',
    'down-right',
  ];

  public readonly items: SpeedDialItem[] = [
    {
      label: 'Add',
      icon: 'plus',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Update',
      icon: 'pencil',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Delete',
      icon: 'trash',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Search',
      icon: 'search',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
    {
      label: 'Share',
      icon: 'share-nodes',
      command: (event: SpeedDialItemCommandEvent): void =>
        this.logEvent(event.item.label ?? 'action'),
    },
  ];

  public readonly itemsWithTooltip: SpeedDialItem[] = this.items.map(
    (item: SpeedDialItem, index: number): SpeedDialItem => ({
      ...item,
      tooltip: `${item.label ?? 'Action'} action`,
      styleClass: `demo-speed-dial-item-${String(index + 1)}`,
    })
  );

  public setVariant(variant: SpeedDialVariant): void {
    this.activeVariant.set(variant);
  }

  public logEvent(message: string): void {
    const timestamp: string = new Date().toLocaleTimeString();
    this.eventLog.update((entries: SpeedDialLogEntry[]): SpeedDialLogEntry[] => [
      { timestamp, message: `Clicked: ${message}` },
      ...entries.slice(0, 9),
    ]);
  }
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-speed-dial-button-size', description: 'Button size.' },
    { variable: '--uilib-speed-dial-button-bg', description: 'Button background colour.' },
    { variable: '--uilib-speed-dial-button-color', description: 'Button text colour.' },
    { variable: '--uilib-speed-dial-button-shadow', description: 'Button box shadow.' },
    { variable: '--uilib-speed-dial-item-size', description: 'Item size.' },
    { variable: '--uilib-speed-dial-item-bg', description: 'Item background colour.' },
    { variable: '--uilib-speed-dial-item-color', description: 'Item text colour.' },
    { variable: '--uilib-speed-dial-item-shadow', description: 'Item box shadow.' },
    { variable: '--uilib-speed-dial-gap', description: 'Gap.' },
    { variable: '--uilib-speed-dial-radius', description: 'Border radius.' },
    { variable: '--uilib-speed-dial-mask-bg', description: 'Mask background colour.' },
    { variable: '--uilib-speed-dial-mask-z', description: 'Mask Z.' },
    { variable: '--uilib-speed-dial-list-z', description: 'List Z.' },
    { variable: '--uilib-speed-dial-transition-duration', description: 'Transition Duration.' },
    { variable: '--uilib-speed-dial-transition-easing', description: 'Transition Easing.' },
    { variable: '--uilib-speed-dial-rotate-open', description: 'Rotate (open).' },
    { variable: '--uilib-speed-dial-focus-ring', description: 'Focus ring.' },
  ];
}
