import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { DebugElement } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Inplace } from './inplace';
import type { InplaceVariant } from './inplace.types';

// ---- Minimal test host -----------------------------------------------

@Component({
  standalone: true,
  imports: [Inplace],
  template: `
    <ui-lib-inplace
      [active]="activeState()"
      (activeChange)="activeState.set($event)"
      [disabled]="disabled()"
      [closable]="closable()"
      [closeIcon]="closeIcon()"
      [variant]="variant()"
      [styleClass]="styleClass()"
      (activated)="activatedCount = activatedCount + 1"
      (deactivated)="deactivatedCount = deactivatedCount + 1"
    >
      <span inplaceDisplay>Display content</span>
      <input inplaceContent type="text" placeholder="Edit here" />
    </ui-lib-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly activeState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly closable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly closeIcon: WritableSignal<string> = signal<string>('pi pi-times');
  public readonly variant: WritableSignal<InplaceVariant | null> = signal<InplaceVariant | null>(
    null
  );
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public activatedCount: number = 0;
  public deactivatedCount: number = 0;
}

// ---- Helpers ----------------------------------------------------------

function setup(): { fixture: ComponentFixture<TestHostComponent>; host: TestHostComponent } {
  TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  return { fixture, host: fixture.componentInstance };
}

// ---- Tests ------------------------------------------------------------

describe('Inplace', (): void => {
  it('should create', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('should apply base class and default variant class on host', (): void => {
    const { fixture } = setup();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-inplace');
    expect(el.className).toContain('ui-lib-inplace--variant-');
  });

  it('should show display slot and hide content slot when inactive', (): void => {
    const { fixture } = setup();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    const content: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__content'))
      .nativeElement as HTMLElement;
    expect(display.classList).not.toContain('ui-lib-inplace__display--hidden');
    expect(content.classList).toContain('ui-lib-inplace__content--hidden');
  });

  it('should hide display slot and show content slot when active', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.activeState.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    const content: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__content'))
      .nativeElement as HTMLElement;
    expect(display.classList).toContain('ui-lib-inplace__display--hidden');
    expect(content.classList).not.toContain('ui-lib-inplace__content--hidden');
  });

  it('should apply active class on host when active', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.activeState.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-inplace--active');
  });

  it('should activate on display click', async (): Promise<void> => {
    const { fixture } = setup();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    display.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-inplace--active');
  });

  it('should emit activated output when activated', async (): Promise<void> => {
    const { fixture, host } = setup();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    display.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.activatedCount).toBe(1);
  });

  it('should not activate when disabled on click', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    display.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.activatedCount).toBe(0);
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el.className).not.toContain('ui-lib-inplace--active');
  });

  it('should apply disabled class when disabled', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-inplace--disabled');
  });

  it('should set aria-disabled when disabled', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    expect(display.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have tabindex="0" on display when not disabled', (): void => {
    const { fixture } = setup();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    expect(display.getAttribute('tabindex')).toBe('0');
  });

  it('should remove tabindex from display when disabled', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    expect(display.getAttribute('tabindex')).toBeNull();
  });

  it('should not render close button when closable is false', (): void => {
    const { fixture } = setup();
    const closeButton: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-inplace__close-button')
    );
    expect(closeButton).toBeNull();
  });

  it('should render close button when closable is true', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.closable.set(true);
    host.activeState.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const closeButton: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-inplace__close-button')
    );
    expect(closeButton).not.toBeNull();
  });

  it('should deactivate when close button is clicked', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.closable.set(true);
    host.activeState.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const closeButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-inplace__close-button')
    ).nativeElement as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.deactivatedCount).toBe(1);
  });

  it('should emit deactivated output when deactivated', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.closable.set(true);
    host.activeState.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const closeButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-inplace__close-button')
    ).nativeElement as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.deactivatedCount).toBe(1);
  });

  it('should apply variant class when variant is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('ui-lib-inplace--variant-bootstrap');
  });

  it('should apply extra styleClass to host', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.styleClass.set('my-custom-class');
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.debugElement.query(By.css('ui-lib-inplace'))
      .nativeElement as HTMLElement;
    expect(el.className).toContain('my-custom-class');
  });

  it('should activate on Enter keydown on display slot', async (): Promise<void> => {
    const { fixture, host } = setup();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    display.dispatchEvent(event);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.activatedCount).toBe(1);
  });

  it('should activate on Space keydown on display slot', async (): Promise<void> => {
    const { fixture, host } = setup();
    const display: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-inplace__display'))
      .nativeElement as HTMLElement;
    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    display.dispatchEvent(event);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.activatedCount).toBe(1);
  });

  it('should use custom closeIcon class', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.closable.set(true);
    host.activeState.set(true);
    host.closeIcon.set('pi pi-check');
    fixture.detectChanges();
    await fixture.whenStable();
    const iconSpan: HTMLElement = fixture.debugElement.query(
      By.css('.ui-lib-inplace__close-button span')
    ).nativeElement as HTMLElement;
    expect(iconSpan.className).toContain('pi-check');
  });
});
