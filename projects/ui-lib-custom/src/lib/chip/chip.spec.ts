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
import { Chip } from './chip';
import type { ChipSize, ChipVariant } from './chip.types';

// ---- Minimal test host ------------------------------------------------

@Component({
  standalone: true,
  imports: [Chip],
  template: `
    <ui-lib-chip
      [label]="label()"
      [icon]="icon()"
      [image]="image()"
      [imageAlt]="imageAlt()"
      [removable]="removable()"
      [removeIcon]="removeIcon()"
      [size]="size()"
      [variant]="variant()"
      [styleClass]="styleClass()"
      (removed)="lastRemoveEvent = $event"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly label: WritableSignal<string | null> = signal<string | null>(null);
  public readonly icon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly image: WritableSignal<string | null> = signal<string | null>(null);
  public readonly imageAlt: WritableSignal<string> = signal<string>('Chip');
  public readonly removable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly removeIcon: WritableSignal<string> = signal<string>('pi pi-times');
  public readonly size: WritableSignal<ChipSize> = signal<ChipSize>('md');
  public readonly variant: WritableSignal<ChipVariant | null> = signal<ChipVariant | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public lastRemoveEvent: MouseEvent | null = null;
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

describe('Chip', (): void => {
  it('should create', (): void => {
    const { fixture } = setup();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip).toBeTruthy();
  });

  it('should apply base class and default size/variant classes', (): void => {
    const { fixture } = setup();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.className).toContain('ui-lib-chip');
    expect(chip.className).toContain('ui-lib-chip--size-md');
  });

  it('should apply size class when size changes', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.size.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.className).toContain('ui-lib-chip--size-lg');
    expect(chip.className).not.toContain('ui-lib-chip--size-md');
  });

  it('should apply variant class when variant is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.className).toContain('ui-lib-chip--variant-bootstrap');
  });

  it('should apply extra styleClass', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.styleClass.set('my-custom-class');
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.className).toContain('my-custom-class');
  });

  it('should render label', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.label.set('Angular');
    fixture.detectChanges();
    await fixture.whenStable();
    const label: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-chip__label'))
      .nativeElement as HTMLElement;
    expect(label.textContent!.trim()).toBe('Angular');
  });

  it('should not render label element when label is null', (): void => {
    const { fixture } = setup();
    const label: DebugElement | null = fixture.debugElement.query(By.css('.ui-lib-chip__label'));
    expect(label).toBeNull();
  });

  it('should render icon when set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.icon.set('pi pi-user');
    fixture.detectChanges();
    await fixture.whenStable();
    const icon: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-chip__icon'))
      .nativeElement as HTMLElement;
    expect(icon).toBeTruthy();
    expect(icon.className).toContain('pi');
    expect(icon.className).toContain('pi-user');
  });

  it('should not render icon when image is also set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.icon.set('pi pi-user');
    host.image.set('/assets/photo.jpg');
    fixture.detectChanges();
    await fixture.whenStable();
    const icon: DebugElement | null = fixture.debugElement.query(By.css('.ui-lib-chip__icon'));
    expect(icon).toBeNull();
  });

  it('should render image when set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.image.set('/assets/photo.jpg');
    host.imageAlt.set('Profile photo');
    fixture.detectChanges();
    await fixture.whenStable();
    const img: HTMLImageElement = fixture.debugElement.query(By.css('.ui-lib-chip__image'))
      .nativeElement as HTMLImageElement;
    expect(img.src).toContain('/assets/photo.jpg');
    expect(img.alt).toBe('Profile photo');
  });

  it('should not render remove button when removable is false', (): void => {
    const { fixture } = setup();
    const button: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button')
    );
    expect(button).toBeNull();
  });

  it('should render remove button when removable is true', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button')
    );
    expect(button).not.toBeNull();
  });

  it('should add removable class when removable is true', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.className).toContain('ui-lib-chip--removable');
  });

  it('should emit removed event when remove button is clicked', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    host.label.set('Test');
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button')
    ).nativeElement as HTMLButtonElement;
    button.click();
    expect(host.lastRemoveEvent).toBeInstanceOf(MouseEvent);
  });

  it('should set accessible label on remove button based on label', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    host.label.set('Vue');
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button')
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Remove Vue');
  });

  it('should set generic remove aria-label when no label', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button')
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Remove');
  });

  it('should apply role="option" on host', (): void => {
    const { fixture } = setup();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('role')).toBe('option');
  });

  it('should set aria-label on host from label input', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.label.set('React');
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('aria-label')).toBe('React');
  });

  it('should use custom removeIcon class', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    host.removeIcon.set('pi pi-trash');
    fixture.detectChanges();
    await fixture.whenStable();
    const iconSpan: HTMLElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button span')
    ).nativeElement as HTMLElement;
    expect(iconSpan.className).toContain('pi-trash');
  });
});
