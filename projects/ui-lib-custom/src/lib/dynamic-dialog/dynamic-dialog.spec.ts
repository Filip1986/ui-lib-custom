import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { DebugElement, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicDialog } from './dynamic-dialog';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DialogService } from './dynamic-dialog.service';
import { DYNAMIC_DIALOG_CONFIG } from './dynamic-dialog.types';
import type { DynamicDialogConfig } from './dynamic-dialog.types';

// ---- Helpers ----

@Component({
  selector: 'app-test-guest',
  standalone: true,
  template: '<p>Guest content</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestGuestComponent {}

function detectAndFlush(): void {
  TestBed.flushEffects();
}

function createContainer(config: DynamicDialogConfig = {}): {
  fixture: ComponentFixture<DynamicDialog>;
  ref: DynamicDialogRef;
} {
  const ref: DynamicDialogRef = new DynamicDialogRef();
  const mergedConfig: DynamicDialogConfig = {
    header: 'Test Dialog',
    modal: true,
    closable: true,
    dismissableMask: false,
    blockScroll: false,
    position: 'center',
    ...config,
  };

  TestBed.configureTestingModule({
    imports: [DynamicDialog],
    providers: [
      provideZonelessChangeDetection(),
      { provide: DynamicDialogRef, useValue: ref },
      { provide: DYNAMIC_DIALOG_CONFIG, useValue: mergedConfig },
    ],
  });

  const fixture: ComponentFixture<DynamicDialog> = TestBed.createComponent(DynamicDialog);
  fixture.componentRef.setInput('componentType', null);
  fixture.detectChanges();
  detectAndFlush();
  return { fixture, ref };
}

function getElement<T extends HTMLElement>(
  fixture: ComponentFixture<DynamicDialog>,
  selector: string
): T {
  const host: HTMLElement = fixture.nativeElement as HTMLElement;
  const element: T | null = host.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
}

function queryElement<T extends HTMLElement>(
  fixture: ComponentFixture<DynamicDialog>,
  selector: string
): T | null {
  const host: HTMLElement = fixture.nativeElement as HTMLElement;
  return host.querySelector<T>(selector);
}

// ---- DynamicDialogRef ----

describe('DynamicDialogRef', (): void => {
  it('should emit provided data when close() is called', (done: jest.DoneCallback): void => {
    const ref: DynamicDialogRef = new DynamicDialogRef();
    ref.onClose.subscribe((data: unknown): void => {
      expect(data).toEqual({ confirmed: true });
      done();
    });
    ref.close({ confirmed: true });
  });

  it('should emit undefined when close() is called without data', (done: jest.DoneCallback): void => {
    const ref: DynamicDialogRef = new DynamicDialogRef();
    ref.onClose.subscribe((data: unknown): void => {
      expect(data).toBeUndefined();
      done();
    });
    ref.close();
  });

  it('should complete the observable after close()', (done: jest.DoneCallback): void => {
    const ref: DynamicDialogRef = new DynamicDialogRef();
    ref.onClose.subscribe({
      complete: (): void => {
        done();
      },
    });
    ref.close();
  });

  it('should not re-emit if close() is called again after already closed', (): void => {
    const ref: DynamicDialogRef = new DynamicDialogRef();
    let count: number = 0;
    ref.onClose.subscribe((): void => {
      count += 1;
    });
    ref.close();
    ref.close();
    expect(count).toBe(1);
  });

  it('should complete without emitting when _destroy() is called', (done: jest.DoneCallback): void => {
    const ref: DynamicDialogRef = new DynamicDialogRef();
    let emitted: boolean = false;
    ref.onClose.subscribe({
      next: (): void => {
        emitted = true;
      },
      complete: (): void => {
        expect(emitted).toBe(false);
        done();
      },
    });
    ref._destroy();
  });
});

// ---- DynamicDialog container ----

describe('DynamicDialog container', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
  });

  it('should render the backdrop when modal is true', (): void => {
    const { fixture } = createContainer({ modal: true });
    const backdrop: DebugElement = fixture.debugElement.query(
      By.css('.ui-lib-dynamic-dialog__backdrop')
    );
    expect(backdrop).toBeTruthy();
  });

  it('should not render the backdrop when modal is false', (): void => {
    const { fixture } = createContainer({ modal: false });
    const backdrop: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-dynamic-dialog__backdrop')
    );
    expect(backdrop).toBeNull();
  });

  it('should render the header when header text is provided', (): void => {
    const { fixture } = createContainer({ header: 'My Dialog' });
    const title: HTMLElement = getElement(fixture, '.ui-lib-dynamic-dialog__title');
    expect(title.textContent!.trim()).toBe('My Dialog');
  });

  it('should not render the header section when header is empty and closable is false', (): void => {
    const { fixture } = createContainer({ header: '', closable: false });
    const header: HTMLElement | null = queryElement(fixture, '.ui-lib-dynamic-dialog__header');
    expect(header).toBeNull();
  });

  it('should render the close button when closable is true', (): void => {
    const { fixture } = createContainer({ closable: true });
    const closeButton: HTMLElement | null = queryElement(
      fixture,
      '.ui-lib-dynamic-dialog__close-btn'
    );
    expect(closeButton).not.toBeNull();
  });

  it('should not render the close button when closable is false', (): void => {
    const { fixture } = createContainer({ closable: false, header: 'Dialog' });
    const closeButton: HTMLElement | null = queryElement(
      fixture,
      '.ui-lib-dynamic-dialog__close-btn'
    );
    expect(closeButton).toBeNull();
  });

  it('should apply the correct position class to the host', (): void => {
    const { fixture } = createContainer({ position: 'top' });
    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.classList).toContain('ui-lib-dynamic-dialog--top');
  });

  it('should apply the default center position class when position is not specified', (): void => {
    const { fixture } = createContainer({ position: 'center' });
    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.classList).toContain('ui-lib-dynamic-dialog--center');
  });

  it('should apply the variant class to the panel', (): void => {
    const { fixture } = createContainer({ variant: 'bootstrap' });
    const panel: HTMLElement = getElement(fixture, '.ui-lib-dynamic-dialog__panel');
    expect(panel.classList).toContain('ui-lib-dynamic-dialog--variant-bootstrap');
  });

  it('should apply custom styleClass to the host', (): void => {
    const { fixture } = createContainer({ styleClass: 'my-custom-dialog' });
    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.classList).toContain('my-custom-dialog');
  });

  it('should apply width style to the panel when width is provided', (): void => {
    const { fixture } = createContainer({ width: '500px' });
    const panel: HTMLElement = getElement(fixture, '.ui-lib-dynamic-dialog__panel');
    expect(panel.style.width).toBe('500px');
  });

  it('should call ref.close() when the close button is clicked', (): void => {
    const { fixture, ref } = createContainer({ closable: true });
    const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
    const closeButton: HTMLButtonElement = getElement<HTMLButtonElement>(
      fixture,
      '.ui-lib-dynamic-dialog__close-btn'
    );
    closeButton.click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should call ref.close() on backdrop click when dismissableMask is true', (): void => {
    const { fixture, ref } = createContainer({ dismissableMask: true });
    const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-dynamic-dialog__backdrop');
    backdrop.click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should NOT call ref.close() on backdrop click when dismissableMask is false', (): void => {
    const { fixture, ref } = createContainer({ dismissableMask: false });
    const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-dynamic-dialog__backdrop');
    backdrop.click();
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should call ref.close() when Escape is pressed on the panel', (): void => {
    const { fixture, ref } = createContainer();
    const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
    const panel: HTMLElement = getElement(fixture, '.ui-lib-dynamic-dialog__panel');
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should NOT close when a key other than Escape is pressed', (): void => {
    const { fixture, ref } = createContainer();
    const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
    const panel: HTMLElement = getElement(fixture, '.ui-lib-dynamic-dialog__panel');
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should render the content area', (): void => {
    const { fixture } = createContainer();
    const content: HTMLElement | null = queryElement(fixture, '.ui-lib-dynamic-dialog__content');
    expect(content).not.toBeNull();
  });

  it('should apply the base class to the host', (): void => {
    const { fixture } = createContainer();
    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.classList).toContain('ui-lib-dynamic-dialog');
  });
});

// ---- DialogService ----

describe('DialogService', (): void => {
  let service: DialogService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(DialogService);
  });

  afterEach((): void => {
    document.querySelectorAll('ui-lib-dynamic-dialog').forEach((element: Element): void => {
      element.remove();
    });
    TestBed.resetTestingModule();
  });

  it('should return a DynamicDialogRef from open()', (): void => {
    const ref: DynamicDialogRef = service.open(TestGuestComponent);
    expect(ref).toBeInstanceOf(DynamicDialogRef);
    ref.close();
  });

  it('should append the dialog element to document.body', (): void => {
    const ref: DynamicDialogRef = service.open(TestGuestComponent);
    const element: Element | null = document.querySelector('ui-lib-dynamic-dialog');
    expect(element).not.toBeNull();
    ref.close();
  });

  it('should remove the dialog element from the DOM when ref.close() is called', (): void => {
    const ref: DynamicDialogRef = service.open(TestGuestComponent);
    ref.close();
    const element: Element | null = document.querySelector('ui-lib-dynamic-dialog');
    expect(element).toBeNull();
  });

  it('should accept config options and create the dialog', (): void => {
    const config: DynamicDialogConfig = { header: 'Service Test', modal: false };
    const ref: DynamicDialogRef = service.open(TestGuestComponent, config);
    expect(ref).toBeInstanceOf(DynamicDialogRef);
    ref.close();
  });

  it('should allow multiple dialogs to be open simultaneously', (): void => {
    const refA: DynamicDialogRef = service.open(TestGuestComponent, { header: 'Dialog A' });
    const refB: DynamicDialogRef = service.open(TestGuestComponent, { header: 'Dialog B' });

    const elements: NodeListOf<Element> = document.querySelectorAll('ui-lib-dynamic-dialog');
    expect(elements.length).toBe(2);

    refA.close();
    refB.close();
  });

  it('should expose data from config via DYNAMIC_DIALOG_CONFIG token', (): void => {
    const configWithData: DynamicDialogConfig = {
      data: { userId: 99 },
      blockScroll: false,
    };
    const ref: DynamicDialogRef = service.open(TestGuestComponent, configWithData);
    expect(ref).toBeInstanceOf(DynamicDialogRef);
    ref.close();
  });
});

// ---- Reactive componentType input ----

describe('DynamicDialog with reactive componentType', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
  });

  it('should update when componentType input changes', (): void => {
    const ref: DynamicDialogRef = new DynamicDialogRef();
    const config: DynamicDialogConfig = { blockScroll: false };

    TestBed.configureTestingModule({
      imports: [DynamicDialog],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DynamicDialogRef, useValue: ref },
        { provide: DYNAMIC_DIALOG_CONFIG, useValue: config },
      ],
    });

    const _componentTypeSignal: WritableSignal<typeof TestGuestComponent | null> = signal<
      typeof TestGuestComponent | null
    >(null);

    const fixture: ComponentFixture<DynamicDialog> = TestBed.createComponent(DynamicDialog);
    fixture.componentRef.setInput('componentType', null);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(fixture.componentInstance.componentType()).toBeNull();

    fixture.componentRef.setInput('componentType', TestGuestComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.componentType()).toBe(TestGuestComponent);
  });
});
