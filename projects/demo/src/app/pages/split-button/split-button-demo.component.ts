import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  type WritableSignal,
} from '@angular/core';
import type { Signal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Icon } from 'ui-lib-custom/icon';
import { SplitButtonComponent, SplitButtonContentDirective } from 'ui-lib-custom/split-button';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { Panel } from 'ui-lib-custom/panel';
import type {
  SplitButtonItem,
  SplitButtonItemCommandEvent,
  SplitButtonSeverity,
} from 'ui-lib-custom/split-button';
import {
  basicHtml,
  basicTs,
  iconsHtml,
  iconsTs,
  severityHtml,
  severityTs,
  disabledHtml,
  disabledTs,
  raisedHtml,
  raisedTs,
  roundedHtml,
  roundedTs,
  textHtml,
  textTs,
  raisedTextHtml,
  raisedTextTs,
  outlinedHtml,
  outlinedTs,
  sizesHtml,
  sizesTs,
  templateHtml,
  templateTs,
} from './snippets.generated';
import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';

/**
 * Demo page for SplitButton variants, states, templating, and accessibility guidance.
 */
@Component({
  selector: 'app-split-button-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    Icon,
    SplitButtonComponent,
    SplitButtonContentDirective,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,

    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './split-button-demo.component.html',
  styleUrl: './split-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitButtonDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly iconsHtml: string = iconsHtml;
  public readonly iconsTs: string = iconsTs;
  public readonly severityHtml: string = severityHtml;
  public readonly severityTs: string = severityTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly raisedHtml: string = raisedHtml;
  public readonly raisedTs: string = raisedTs;
  public readonly roundedHtml: string = roundedHtml;
  public readonly roundedTs: string = roundedTs;
  public readonly textHtml: string = textHtml;
  public readonly textTs: string = textTs;
  public readonly raisedTextHtml: string = raisedTextHtml;
  public readonly raisedTextTs: string = raisedTextTs;
  public readonly outlinedHtml: string = outlinedHtml;
  public readonly outlinedTs: string = outlinedTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly templateHtml: string = templateHtml;
  public readonly templateTs: string = templateTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
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

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string =
    "import { SplitButtonComponent } from 'ui-lib-custom/split-button'";

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'icons', label: 'Icons' },
    { id: 'severity', label: 'Severity' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'raised', label: 'Raised' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'text', label: 'Text' },
    { id: 'raised-text', label: 'Raised Text' },
    { id: 'outlined', label: 'Outlined' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'template', label: 'Template' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  public readonly severities: readonly SplitButtonSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'help',
    'danger',
    'contrast',
  ];

  public readonly lastAction: WritableSignal<string> = signal<string>('No action yet.');

  public readonly items: SplitButtonItem[] = [
    {
      label: 'Update',
      icon: 'pencil',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
    {
      label: 'Delete',
      icon: 'trash',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
    {
      label: 'Copy Link',
      icon: 'link',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
    { separator: true },
    {
      label: 'Help',
      icon: 'help',
      tooltip: 'Open help',
      command: (event: SplitButtonItemCommandEvent): void => this.onItemAction(event),
    },
  ];

  public readonly iconItems: SplitButtonItem[] = [...this.items];

  public onPrimaryAction(): void {
    this.lastAction.set('Primary action: Save');
  }

  public onItemAction(event: SplitButtonItemCommandEvent): void {
    const label: string = event.item.label ?? 'Unknown action';
    this.lastAction.set(`Menu action: ${label}`);
  }
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-split-button-bg', description: 'Background colour.' },
    { variable: '--uilib-split-button-fg', description: 'Fg.' },
    { variable: '--uilib-split-button-border', description: 'Border shorthand.' },
    { variable: '--uilib-split-button-bg-hover', description: 'Background colour (hover).' },
    { variable: '--uilib-split-button-fg-hover', description: 'Fg (hover).' },
    { variable: '--uilib-split-button-emphasis', description: 'Emphasis.' },
    { variable: '--uilib-split-button-radius', description: 'Border radius.' },
    { variable: '--uilib-split-button-padding', description: 'Padding.' },
    { variable: '--uilib-split-button-font-size', description: 'Font size.' },
    { variable: '--uilib-split-button-shadow', description: 'Box shadow.' },
    { variable: '--uilib-split-button-transition', description: 'Transition.' },
    { variable: '--uilib-split-button-focus-ring', description: 'Focus ring.' },
    { variable: '--uilib-split-button-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-split-button-divider-color', description: 'Divider text colour.' },
    { variable: '--uilib-split-button-menu-bg', description: 'Menu background colour.' },
    { variable: '--uilib-split-button-menu-shadow', description: 'Menu box shadow.' },
    { variable: '--uilib-split-button-menu-radius', description: 'Menu border radius.' },
    { variable: '--uilib-split-button-menu-z', description: 'Menu Z.' },
    { variable: '--uilib-split-button-menu-item-padding', description: 'Menu Item padding.' },
    {
      variable: '--uilib-split-button-menu-item-hover-bg',
      description: 'Menu Item Hover background colour.',
    },
    {
      variable: '--uilib-split-button-menu-item-disabled-opacity',
      description: 'Menu Item Disabled opacity.',
    },
    { variable: '--uilib-split-button-separator-color', description: 'Separator text colour.' },
    { variable: '--uilib-split-button-icon-size', description: 'Icon size.' },
  ];
}
