import {
  ApplicationRef,
  createComponent,
  DOCUMENT,
  inject,
  Injectable,
  Injector,
} from '@angular/core';
import type { ComponentRef, Type } from '@angular/core';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DynamicDialog } from './dynamic-dialog';
import { DYNAMIC_DIALOG_CONFIG } from './dynamic-dialog.types';
import type { DynamicDialogConfig } from './dynamic-dialog.types';

/**
 * Service for programmatically opening dialog panels that render any Angular component.
 *
 * Place this in your component's providers or inject it from the root injector.
 *
 * @example
 * constructor(private readonly dialogService: DialogService) {}
 *
 * open(): void {
 *   const ref = this.dialogService.open(UserProfileComponent, {
 *     header: 'User Profile',
 *     width: '40rem',
 *     data: { userId: 42 },
 *   });
 *
 *   ref.onClose.subscribe((result) => {
 *     console.log('Dialog closed with:', result);
 *   });
 * }
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly applicationRef: ApplicationRef = inject(ApplicationRef);
  private readonly injector: Injector = inject(Injector);
  private readonly document: Document = inject(DOCUMENT);

  /**
   * Dynamically create a dialog that renders `component` inside its content area.
   *
   * @param component — standalone Angular component to render inside the dialog.
   * @param config — optional configuration for the dialog shell.
   * @returns DynamicDialogRef — use it to close the dialog or subscribe to its close event.
   */
  public open<C>(component: Type<C>, config: DynamicDialogConfig = {}): DynamicDialogRef {
    // Capture the currently-focused element BEFORE creating the dialog so focus can be
    // restored when the dialog closes — required for WCAG 2.1 SC 3.2.2 / 2.4.3.
    const priorFocusElement: HTMLElement | null =
      this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null;

    const ref: DynamicDialogRef = new DynamicDialogRef();
    const mergedConfig: DynamicDialogConfig = {
      modal: true,
      closable: true,
      dismissableMask: false,
      blockScroll: true,
      position: 'center',
      ...config,
    };

    // Create an element-level injector that provides the ref and config to both
    // the container and the guest component.
    const dialogInjector: Injector = Injector.create({
      providers: [
        { provide: DynamicDialogRef, useValue: ref },
        { provide: DYNAMIC_DIALOG_CONFIG, useValue: mergedConfig },
      ],
      parent: this.injector,
    });

    const containerRef: ComponentRef<DynamicDialog> = createComponent(DynamicDialog, {
      environmentInjector: this.applicationRef.injector,
      elementInjector: dialogInjector,
    });

    // Set input before attaching so the signal value is ready on first render.
    containerRef.setInput('componentType', component);

    this.applicationRef.attachView(containerRef.hostView);

    const element: HTMLElement = containerRef.location.nativeElement as HTMLElement;
    this.document.body.appendChild(element);

    // Clean up the container after the dialog signals it should close.
    ref.onClose.subscribe((): void => {
      // Restore focus to the element that was active before the dialog opened.
      // Must happen before DOM removal so the element is still the document's
      // sequential focus point (not already detached).
      if (priorFocusElement?.isConnected) {
        priorFocusElement.focus();
      }
      this.applicationRef.detachView(containerRef.hostView);
      element.remove();
      containerRef.destroy();
    });

    return ref;
  }
}
