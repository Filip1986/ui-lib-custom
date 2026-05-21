import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { PaginatorComponent } from 'ui-lib-custom/paginator';
import type { PaginatorPageEvent } from 'ui-lib-custom/paginator';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Paginator component.
 * Showcases all three variants, sizes, optional controls, and event handling.
 */
@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [
    PaginatorComponent,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './paginator-demo.component.html',
  styleUrl: './paginator-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { PaginatorComponent } from 'ui-lib-custom/paginator'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'current-page-report', label: 'Current Page Report' },
    { id: 'rows-per-page', label: 'Rows Per Page' },
    { id: 'jump-to-page', label: 'Jump To Page' },
    { id: 'without-first-last', label: 'Without First / Last Icons' },
    { id: 'arrows-only', label: 'Page Links Off' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'totalRecords',
      type: 'number',
      default: '0',
      description: 'Total number of records to paginate.',
    },
    {
      name: 'rows',
      type: 'number',
      description: 'Number of records per page (two-way bindable via [(rows)]).',
    },
    {
      name: 'first',
      type: 'number',
      description:
        'Zero-based index of the first record on the current page (two-way bindable via [(first)]).',
    },
    {
      name: 'pageLinkSize',
      type: 'number',
      default: '5',
      description: 'Number of page links displayed.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Paginator size.' },
    {
      name: 'alwaysShow',
      type: 'boolean',
      default: 'true',
      description: 'Always renders the paginator even when there is only one page.',
    },
    {
      name: 'showFirstLastIcon',
      type: 'boolean',
      default: 'true',
      description: 'Shows first/last page buttons.',
    },
    {
      name: 'showPageLinks',
      type: 'boolean',
      default: 'true',
      description: 'Shows numbered page links.',
    },
    {
      name: 'showCurrentPageReport',
      type: 'boolean',
      default: 'false',
      description: "Shows a 'Showing X to Y of Z' report.",
    },
    {
      name: 'currentPageReportTemplate',
      type: 'string',
      default: "'{first} - {last} of {totalRecords}'",
      description: 'Template for the page report text.',
    },
    {
      name: 'rowsPerPageOptions',
      type: 'number[] | null',
      default: 'null',
      description: 'Options for the rows-per-page dropdown.',
    },
    {
      name: 'showJumpToPageInput',
      type: 'boolean',
      default: 'false',
      description: 'Shows a page-number jump input.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Pagination'",
      description: 'Accessible label for the pagination nav.',
    },
  ];

  // ── Shared state ────────────────────────────────────────────────────────────
  public readonly totalRecords: WritableSignal<number> = signal(120);
  public readonly rows: WritableSignal<number> = signal(10);
  public readonly first: WritableSignal<number> = signal(0);
  public readonly lastEvent: WritableSignal<PaginatorPageEvent | null> = signal(null);

  // ── Large dataset state ─────────────────────────────────────────────────────
  public readonly largeFirst: WritableSignal<number> = signal(0);
  public readonly largeRows: WritableSignal<number> = signal(25);

  public onPageChange(event: PaginatorPageEvent): void {
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.lastEvent.set(event);
  }

  public onLargePageChange(event: PaginatorPageEvent): void {
    this.largeFirst.set(event.first);
    this.largeRows.set(event.rows);
  }
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-paginator-gap', description: 'Gap.' },
    { variable: '--uilib-paginator-padding', description: 'Padding.' },
    { variable: '--uilib-paginator-button-size', description: 'Button size.' },
    { variable: '--uilib-paginator-button-font-size', description: 'Button Font size.' },
    { variable: '--uilib-paginator-button-radius', description: 'Button border radius.' },
    { variable: '--uilib-paginator-button-bg', description: 'Button background colour.' },
    { variable: '--uilib-paginator-button-color', description: 'Button text colour.' },
    { variable: '--uilib-paginator-button-border', description: 'Button border shorthand.' },
    {
      variable: '--uilib-paginator-button-bg-hover',
      description: 'Button background colour (hover).',
    },
    {
      variable: '--uilib-paginator-button-color-hover',
      description: 'Button text colour (hover).',
    },
    {
      variable: '--uilib-paginator-button-bg-selected',
      description: 'Button background colour (selected).',
    },
    {
      variable: '--uilib-paginator-button-color-selected',
      description: 'Button text colour (selected).',
    },
    {
      variable: '--uilib-paginator-button-bg-disabled',
      description: 'Button background colour (disabled).',
    },
    {
      variable: '--uilib-paginator-button-color-disabled',
      description: 'Button text colour (disabled).',
    },
    { variable: '--uilib-paginator-icon-size', description: 'Icon size.' },
    { variable: '--uilib-paginator-current-color', description: 'Current text colour.' },
    { variable: '--uilib-paginator-current-font-size', description: 'Current Font size.' },
    { variable: '--uilib-paginator-jtp-width', description: 'Jtp width.' },
    { variable: '--uilib-paginator-jtp-height', description: 'Jtp height.' },
    { variable: '--uilib-paginator-jtp-border', description: 'Jtp border shorthand.' },
    { variable: '--uilib-paginator-jtp-radius', description: 'Jtp border radius.' },
    { variable: '--uilib-paginator-jtp-font-size', description: 'Jtp Font size.' },
    { variable: '--uilib-paginator-jtp-bg', description: 'Jtp background colour.' },
    { variable: '--uilib-paginator-jtp-color', description: 'Jtp text colour.' },
    { variable: '--uilib-paginator-rpp-height', description: 'Rpp height.' },
    { variable: '--uilib-paginator-rpp-border', description: 'Rpp border shorthand.' },
    { variable: '--uilib-paginator-rpp-radius', description: 'Rpp border radius.' },
    { variable: '--uilib-paginator-rpp-font-size', description: 'Rpp Font size.' },
    { variable: '--uilib-paginator-rpp-bg', description: 'Rpp background colour.' },
    { variable: '--uilib-paginator-rpp-color', description: 'Rpp text colour.' },
    { variable: '--uilib-paginator-rpp-padding', description: 'Rpp padding.' },
    { variable: '--uilib-paginator-transition', description: 'Transition.' },
  ];
}
