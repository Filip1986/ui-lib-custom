import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { BottomSheet } from './bottom-sheet';
import type { BottomSheetVariant } from './bottom-sheet.types';

function getElement(fixture: ComponentFixture<unknown>, selector: string): HTMLElement {
  const found: HTMLElement | null = (
    fixture.nativeElement as HTMLElement
  ).querySelector<HTMLElement>(selector);
  if (!found) throw new Error(`Element not found: ${selector}`);
  return found;
}

function queryElement(fixture: ComponentFixture<unknown>, selector: string): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(selector);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BottomSheet],
  template: `
    <ui-lib-bottom-sheet
      [visible]="visibleState()"
      (visibleChange)="visibleState.set($event)"
      [variant]="variantState()"
      [header]="headerState()"
      [showBackdrop]="showBackdropState()"
      [closeOnBackdrop]="closeOnBackdropState()"
      [closeOnEscape]="closeOnEscapeState()"
      [styleClass]="styleClassState()"
    >
      <p class="sheet-content">Sheet body</p>
      <div bottomSheetFooter class="sheet-footer">Footer</div>
    </ui-lib-bottom-sheet>
  `,
})
class TestHostComponent {
  public readonly visibleState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variantState: WritableSignal<BottomSheetVariant | null> =
    signal<BottomSheetVariant | null>(null);
  public readonly headerState: WritableSignal<string> = signal<string>('');
  public readonly showBackdropState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly closeOnBackdropState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly closeOnEscapeState: WritableSignal<boolean> = signal<boolean>(true);
  public readonly styleClassState: WritableSignal<string | null> = signal<string | null>(null);
}

interface BootstrapOptions {
  visible?: boolean;
  variant?: BottomSheetVariant | null;
  header?: string;
  showBackdrop?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  styleClass?: string | null;
}

describe('BottomSheet', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: BootstrapOptions): {
    fixture: ComponentFixture<TestHostComponent>;
    host: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    if (initial?.visible !== undefined) fixture.componentInstance.visibleState.set(initial.visible);
    if (initial?.variant !== undefined)
      fixture.componentInstance.variantState.set(initial.variant ?? null);
    if (initial?.header !== undefined) fixture.componentInstance.headerState.set(initial.header);
    if (initial?.showBackdrop !== undefined)
      fixture.componentInstance.showBackdropState.set(initial.showBackdrop);
    if (initial?.closeOnBackdrop !== undefined)
      fixture.componentInstance.closeOnBackdropState.set(initial.closeOnBackdrop);
    if (initial?.closeOnEscape !== undefined)
      fixture.componentInstance.closeOnEscapeState.set(initial.closeOnEscape);
    if (initial?.styleClass !== undefined)
      fixture.componentInstance.styleClassState.set(initial.styleClass ?? null);
    fixture.detectChanges();
    const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      'ui-lib-bottom-sheet'
    ) as HTMLElement;
    return { fixture, host };
  }

  it('should create', (): void => {
    const { host } = bootstrap();
    expect(host).toBeTruthy();
  });

  it('should have ui-lib-bottom-sheet class on host', (): void => {
    const { host } = bootstrap();
    expect(host.classList.contains('ui-lib-bottom-sheet')).toBe(true);
  });

  it('should not be open by default', (): void => {
    const { host } = bootstrap();
    expect(host.classList.contains('ui-lib-bottom-sheet--open')).toBe(false);
  });

  it('should have aria-hidden true when closed', (): void => {
    const { host } = bootstrap();
    expect(host.getAttribute('aria-hidden')).toBe('true');
  });

  it('should add open class when visible is true', (): void => {
    const { host } = bootstrap({ visible: true });
    expect(host.classList.contains('ui-lib-bottom-sheet--open')).toBe(true);
  });

  it('should have aria-hidden false when open', (): void => {
    const { host } = bootstrap({ visible: true });
    expect(host.getAttribute('aria-hidden')).toBe('false');
  });

  it('should toggle open class reactively', (): void => {
    const { fixture, host } = bootstrap();
    expect(host.classList.contains('ui-lib-bottom-sheet--open')).toBe(false);
    fixture.componentInstance.visibleState.set(true);
    fixture.detectChanges();
    expect(host.classList.contains('ui-lib-bottom-sheet--open')).toBe(true);
    fixture.componentInstance.visibleState.set(false);
    fixture.detectChanges();
    expect(host.classList.contains('ui-lib-bottom-sheet--open')).toBe(false);
  });

  it('should render backdrop element', (): void => {
    const { fixture } = bootstrap();
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should not show backdrop when closed', (): void => {
    const { fixture } = bootstrap({ showBackdrop: true });
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__backdrop');
    expect(backdrop.classList.contains('ui-lib-bottom-sheet__backdrop--visible')).toBe(false);
  });

  it('should show backdrop when open and showBackdrop is true', (): void => {
    const { fixture } = bootstrap({ visible: true, showBackdrop: true });
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__backdrop');
    expect(backdrop.classList.contains('ui-lib-bottom-sheet__backdrop--visible')).toBe(true);
  });

  it('should not show backdrop when showBackdrop is false even if open', (): void => {
    const { fixture } = bootstrap({ visible: true, showBackdrop: false });
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__backdrop');
    expect(backdrop.classList.contains('ui-lib-bottom-sheet__backdrop--visible')).toBe(false);
  });

  it('should render the panel element', (): void => {
    const { fixture } = bootstrap();
    const panel: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__panel');
    expect(panel).toBeTruthy();
  });

  it('should not have open class on panel when closed', (): void => {
    const { fixture } = bootstrap();
    const panel: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__panel');
    expect(panel.classList.contains('ui-lib-bottom-sheet__panel--open')).toBe(false);
  });

  it('should add open class on panel when visible', (): void => {
    const { fixture } = bootstrap({ visible: true });
    const panel: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__panel');
    expect(panel.classList.contains('ui-lib-bottom-sheet__panel--open')).toBe(true);
  });

  it('should have role=dialog on panel', (): void => {
    const { fixture } = bootstrap();
    const panel: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__panel');
    expect(panel.getAttribute('role')).toBe('dialog');
  });

  it('should not render header when header input is empty', (): void => {
    const { fixture } = bootstrap({ header: '' });
    const headerEl: HTMLElement | null = queryElement(fixture, '.ui-lib-bottom-sheet__header');
    expect(headerEl).toBeNull();
  });

  it('should render header when header input is provided', (): void => {
    const { fixture } = bootstrap({ header: 'My Sheet' });
    const headerEl: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__header');
    expect(headerEl).toBeTruthy();
    const titleEl: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__title');
    expect(titleEl.textContent!.trim()).toBe('My Sheet');
  });

  it('should render close button in header', (): void => {
    const { fixture } = bootstrap({ header: 'My Sheet' });
    const closeButton: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__close');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('aria-label')).toBe('Close');
  });

  it('should close when close button is clicked', (): void => {
    const { fixture } = bootstrap({ header: 'My Sheet', visible: true });
    const closeButton: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__close');
    closeButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleState()).toBe(false);
  });

  it('should close on backdrop click when closeOnBackdrop is true', (): void => {
    const { fixture } = bootstrap({ visible: true, closeOnBackdrop: true });
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__backdrop');
    backdrop.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleState()).toBe(false);
  });

  it('should not close on backdrop click when closeOnBackdrop is false', (): void => {
    const { fixture } = bootstrap({ visible: true, closeOnBackdrop: false });
    const backdrop: HTMLElement = getElement(fixture, '.ui-lib-bottom-sheet__backdrop');
    backdrop.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleState()).toBe(true);
  });

  it('should project default content', (): void => {
    const { fixture } = bootstrap();
    const content: HTMLElement = getElement(fixture, '.sheet-content');
    expect(content.textContent!.trim()).toBe('Sheet body');
  });

  it('should project footer content into footer slot', (): void => {
    const { fixture } = bootstrap();
    const footer: HTMLElement = getElement(fixture, '.sheet-footer');
    expect(footer.textContent!.trim()).toBe('Footer');
  });

  it('should apply material variant class', (): void => {
    const { host } = bootstrap({ variant: 'material' });
    expect(host.classList.contains('ui-lib-bottom-sheet--variant-material')).toBe(true);
  });

  it('should apply bootstrap variant class', (): void => {
    const { host } = bootstrap({ variant: 'bootstrap' });
    expect(host.classList.contains('ui-lib-bottom-sheet--variant-bootstrap')).toBe(true);
  });

  it('should apply minimal variant class', (): void => {
    const { host } = bootstrap({ variant: 'minimal' });
    expect(host.classList.contains('ui-lib-bottom-sheet--variant-minimal')).toBe(true);
  });

  it('should apply extra styleClass', (): void => {
    const { host } = bootstrap({ styleClass: 'custom-class' });
    expect(host.classList.contains('custom-class')).toBe(true);
  });
});
