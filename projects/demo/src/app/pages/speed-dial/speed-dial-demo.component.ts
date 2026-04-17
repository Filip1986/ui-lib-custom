import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
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
} from 'ui-lib-custom/speed-dial';

type SpeedDialSnippetKey =
  | 'linear'
  | 'circle'
  | 'semiCircle'
  | 'quarterCircle'
  | 'tooltip'
  | 'mask'
  | 'template';

/**
 * Demo page for SpeedDial layouts, interaction patterns, and accessibility guidance.
 */
@Component({
  selector: 'app-speed-dial-demo',
  standalone: true,
  imports: [
    CommonModule,
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
    Icon,
    SpeedDialComponent,
    SpeedDialItemDirective,
    SpeedDialIconDirective,
  ],
  templateUrl: './speed-dial-demo.component.html',
  styleUrl: './speed-dial-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedDialDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'linear', label: 'Linear' },
    { id: 'circle', label: 'Circle' },
    { id: 'semi-circle', label: 'Semi-Circle' },
    { id: 'quarter-circle', label: 'Quarter-Circle' },
    { id: 'tooltip', label: 'Tooltip' },
    { id: 'mask', label: 'Mask' },
    { id: 'template', label: 'Template' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  public readonly snippets: Record<SpeedDialSnippetKey, string> = {
    linear: `<ui-lib-speed-dial [model]="items" direction="up" />
<ui-lib-speed-dial [model]="items" direction="down" />
<ui-lib-speed-dial [model]="items" direction="left" />
<ui-lib-speed-dial [model]="items" direction="right" />`,
    circle: `<ui-lib-speed-dial [model]="items" type="circle" [radius]="80" />`,
    semiCircle: `<ui-lib-speed-dial [model]="items" type="semi-circle" direction="up" [radius]="80" />
<ui-lib-speed-dial [model]="items" type="semi-circle" direction="down" [radius]="80" />
<ui-lib-speed-dial [model]="items" type="semi-circle" direction="left" [radius]="80" />
<ui-lib-speed-dial [model]="items" type="semi-circle" direction="right" [radius]="80" />`,
    quarterCircle: `<ui-lib-speed-dial [model]="items" type="quarter-circle" direction="up-left" [radius]="80" />
<ui-lib-speed-dial [model]="items" type="quarter-circle" direction="up-right" [radius]="80" />
<ui-lib-speed-dial [model]="items" type="quarter-circle" direction="down-left" [radius]="80" />
<ui-lib-speed-dial [model]="items" type="quarter-circle" direction="down-right" [radius]="80" />`,
    tooltip: `<ui-lib-speed-dial [model]="itemsWithTooltip" />`,
    mask: `<ui-lib-speed-dial [model]="items" [mask]="true" />`,
    template: `<ui-lib-speed-dial [model]="itemsWithTooltip">
  <ng-template speedDialIcon let-visible="$implicit">
    <ui-lib-icon [name]="visible ? 'times' : 'plus'" />
  </ng-template>

  <ng-template speedDialItem let-item="$implicit" let-index="index">
    <span class="template-item">
      <ui-lib-icon [name]="item.icon ?? 'plus'" />
      <span>{{ item.label }}</span>
      <span class="template-item__badge">{{ index + 1 }}</span>
    </span>
  </ng-template>
</ui-lib-speed-dial>`,
  };

  public readonly linearDirections: readonly SpeedDialDirection[] = ['up', 'down', 'left', 'right'];
  public readonly quarterDirections: readonly SpeedDialDirection[] = [
    'up-left',
    'up-right',
    'down-left',
    'down-right',
  ];

  public readonly lastAction: WritableSignal<string> = signal<string>('No action yet.');

  public readonly items: SpeedDialItem[] = [
    {
      label: 'Add',
      icon: 'plus',
      command: (event: SpeedDialItemCommandEvent): void => this.onAction(event),
    },
    {
      label: 'Update',
      icon: 'pencil',
      command: (event: SpeedDialItemCommandEvent): void => this.onAction(event),
    },
    {
      label: 'Delete',
      icon: 'trash',
      command: (event: SpeedDialItemCommandEvent): void => this.onAction(event),
    },
    {
      label: 'Search',
      icon: 'search',
      command: (event: SpeedDialItemCommandEvent): void => this.onAction(event),
    },
    {
      label: 'Share',
      icon: 'share-nodes',
      command: (event: SpeedDialItemCommandEvent): void => this.onAction(event),
    },
  ];

  public readonly itemsWithTooltip: SpeedDialItem[] = this.items.map(
    (item: SpeedDialItem, index: number): SpeedDialItem => ({
      ...item,
      tooltip: `${item.label ?? 'Action'} action`,
      styleClass: `demo-speed-dial-item-${String(index + 1)}`,
    })
  );

  public snippet(key: SpeedDialSnippetKey): string {
    return this.snippets[key];
  }

  public onAction(event: SpeedDialItemCommandEvent): void {
    const label: string = event.item.label ?? 'Unknown action';
    this.lastAction.set(`Last action: ${label}`);
  }
}
