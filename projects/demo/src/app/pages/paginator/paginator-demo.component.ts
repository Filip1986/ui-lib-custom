import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { PaginatorComponent } from 'ui-lib-custom/paginator';
import type { PaginatorPageEvent } from 'ui-lib-custom/paginator';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Paginator component.
 * Showcases all three variants, sizes, optional controls, and event handling.
 */
@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [PaginatorComponent, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './paginator-demo.component.html',
  styleUrl: './paginator-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorDemoComponent {
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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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
}
