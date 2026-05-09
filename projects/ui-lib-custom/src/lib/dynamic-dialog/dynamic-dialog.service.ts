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
      this.applicationRef.detachView(containerRef.hostView);
      element.remove();
      containerRef.destroy();
    });

    return ref;
  }
}
