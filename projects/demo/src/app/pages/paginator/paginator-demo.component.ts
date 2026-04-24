import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { PaginatorComponent } from 'ui-lib-custom/paginator';
import type { PaginatorPageEvent } from 'ui-lib-custom/paginator';

/**
 * Demo page for the Paginator component.
 * Showcases all three variants, sizes, optional controls, and event handling.
 */
@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './paginator-demo.component.html',
  styleUrl: './paginator-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorDemoComponent {
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
