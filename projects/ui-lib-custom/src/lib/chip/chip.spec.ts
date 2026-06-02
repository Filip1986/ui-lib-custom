import type { WritableSignal } from '@angular/core';
import type { DebugElement } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiLibI18nService } from 'ui-lib-custom/i18n';

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
      [selectable]="selectable()"
      [selected]="selected()"
      [size]="size()"
      [variant]="variant()"
      [styleClass]="styleClass()"
      (removed)="lastRemoveEvent = $event"
      (selectedChange)="lastSelectedChange = $event"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly label: WritableSignal<string | null> = signal<string | null>(null);
  public readonly icon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly image: WritableSignal<string | null> = signal<string | null>(null);
  public readonly imageAlt: WritableSignal<string | null> = signal<string | null>(null);
  public readonly removable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly removeIcon: WritableSignal<string> = signal<string>('pi pi-times');
  public readonly selectable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly selected: WritableSignal<boolean> = signal<boolean>(false);
  public readonly size: WritableSignal<ChipSize> = signal<ChipSize>('md');
  public readonly variant: WritableSignal<ChipVariant | null> = signal<ChipVariant | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public lastRemoveEvent: MouseEvent | null = null;
  public lastSelectedChange: boolean | null = null;
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
      By.css('.ui-lib-chip__remove-button'),
    );
    expect(button).toBeNull();
  });

  it('should render remove button when removable is true', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button'),
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
      By.css('.ui-lib-chip__remove-button'),
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
      By.css('.ui-lib-chip__remove-button'),
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Remove Vue');
  });

  it('should set generic remove aria-label when no label', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button'),
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Remove');
  });

  it('applies no host role for a plain (non-removable, non-selectable) chip', (): void => {
    const { fixture } = setup();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    // role="option" outside a listbox violates aria-required-parent — a plain chip
    // is just a labelled element and carries no role.
    expect(chip.getAttribute('role')).toBeNull();
  });

  it('applies role="option" on host when selectable', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('role')).toBe('option');
  });

  it('should apply role="group" on host when removable', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('role')).toBe('group');
  });

  it('sets host aria-label from label input on a roled (selectable) chip', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.label.set('React');
    host.selectable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('aria-label')).toBe('React');
  });

  it('does not set a host aria-label on a plain roleless chip (named by visible text)', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.label.set('React');
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('aria-label')).toBeNull();
    expect(chip.textContent).toContain('React');
  });

  it('should use custom removeIcon class', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    host.removeIcon.set('pi pi-trash');
    fixture.detectChanges();
    await fixture.whenStable();
    const iconSpan: HTMLElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button span'),
    ).nativeElement as HTMLElement;
    expect(iconSpan.className).toContain('pi-trash');
  });

  it('should assign a unique chipId to each instance', (): void => {
    const { fixture } = setup();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('id')).toMatch(/^ui-lib-chip-\d+$/);
  });

  it('should add selectable class when selectable is true', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.className).toContain('ui-lib-chip--selectable');
  });

  it('should add selected class when selectable and selected are true', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    host.selected.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.className).toContain('ui-lib-chip--selected');
  });

  it('should set aria-selected="false" when selectable and not selected', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('aria-selected')).toBe('false');
  });

  it('should set aria-selected="true" when selectable and selected', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    host.selected.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('aria-selected')).toBe('true');
  });

  it('should set tabindex="0" when selectable', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    expect(chip.getAttribute('tabindex')).toBe('0');
  });

  it('should emit selectedChange when Space is pressed on selectable chip', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(host.lastSelectedChange).toBe(true);
  });

  it('should emit selectedChange when Enter is pressed on selectable chip', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.selectable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(host.lastSelectedChange).toBe(true);
  });

  it('should not emit selectedChange on keydown when not selectable', async (): Promise<void> => {
    const { fixture, host } = setup();
    fixture.detectChanges();
    await fixture.whenStable();
    const chip: HTMLElement = fixture.debugElement.query(By.css('ui-lib-chip'))
      .nativeElement as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(host.lastSelectedChange).toBeNull();
  });

  // ── I18n ─────────────────────────────────────────────────────────────────────

  it('should use i18n key for remove button aria-label when label is set', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    host.label.set('Angular');
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button'),
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Remove Angular');
  });

  it('should use i18n remove-unlabelled key when chip has no label', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button'),
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Remove');
  });

  it('should reflect locale change in remove button aria-label', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.removable.set(true);
    host.label.set('Vue');
    fixture.detectChanges();
    await fixture.whenStable();
    const i18n: UiLibI18nService = TestBed.inject(UiLibI18nService);
    i18n.setBundle({ 'chip.remove': 'Supprimer {label}' }, 'fr');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ui-lib-chip__remove-button'),
    ).nativeElement as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Supprimer Vue');
  });

  it('should use i18n image-alt when imageAlt input is null', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.image.set('/assets/photo.jpg');
    fixture.detectChanges();
    await fixture.whenStable();
    const img: HTMLImageElement = fixture.debugElement.query(By.css('.ui-lib-chip__image'))
      .nativeElement as HTMLImageElement;
    expect(img.alt).toBe('Chip');
  });

  it('should prefer explicit imageAlt over i18n default', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.image.set('/assets/photo.jpg');
    host.imageAlt.set('Profile photo');
    fixture.detectChanges();
    await fixture.whenStable();
    const img: HTMLImageElement = fixture.debugElement.query(By.css('.ui-lib-chip__image'))
      .nativeElement as HTMLImageElement;
    expect(img.alt).toBe('Profile photo');
  });
});
