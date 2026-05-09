import { Subject } from 'rxjs';
import type { Observable } from 'rxjs';

/**
 * Handle returned by DialogService.open().
 *
 * Inject this in the dynamically-loaded guest component to programmatically
 * close the dialog and optionally return data to the caller.
 *
 * @example
 * // In the guest component:
 * private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
 *
 * submit(): void {
 *   this.ref.close({ confirmed: true });
 * }
 *
 * // In the caller:
 * const ref = this.dialogService.open(MyComponent);
 * ref.onClose.subscribe((result) => console.log(result));
 */
export class DynamicDialogRef {
  private readonly closeSubject: Subject<unknown> = new Subject<unknown>();

  /** Observable that emits once (with optional return data) when the dialog closes. */
  public readonly onClose: Observable<unknown> = this.closeSubject.asObservable();

  /**
   * Close the dialog and optionally pass return data to any onClose subscribers.
   * Safe to call multiple times — subsequent calls are no-ops.
   */
  public close(data?: unknown): void {
    if (!this.closeSubject.closed) {
      this.closeSubject.next(data);
      this.closeSubject.complete();
    }
  }

  /**
   * @internal — called by DialogService to complete the subject without emitting,
   * used when the container is destroyed externally rather than by close().
   */
  public _destroy(): void {
    if (!this.closeSubject.closed) {
      this.closeSubject.complete();
    }
  }
}
