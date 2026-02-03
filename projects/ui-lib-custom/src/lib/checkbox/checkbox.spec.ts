import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Checkbox, CheckboxSize, CheckboxVariant } from './checkbox';

@Component({
  standalone: true,
  imports: [Checkbox],
  template: `
    <ui-lib-checkbox
      [label]="label()"
      [description]="description()"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [indeterminate]="indeterminate()"
      [(checked)]="checked"
    >
      {{ content() }}
    </ui-lib-checkbox>
  `,
})
class HostComponent {
  label = signal('Accept terms');
  description = signal('Required to continue');
  variant = signal<CheckboxVariant>('material');
  size = signal<CheckboxSize>('md');
  disabled = signal(false);
  indeterminate = signal(false);
  checked = false;
  content = signal('');
}

describe('Checkbox', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function checkboxEl(): HTMLElement {
    return fixture.nativeElement.querySelector('ui-lib-checkbox');
  }

  it('should render label and description', () => {
    const el = checkboxEl();
    expect(el.querySelector('.checkbox-label')?.textContent).toContain('Accept terms');
    expect(el.querySelector('.checkbox-description')?.textContent).toContain(
      'Required to continue'
    );
  });

  it('applies variant, size, and checked classes', () => {
    fixture.componentInstance.variant.set('bootstrap');
    fixture.componentInstance.size.set('lg');
    fixture.componentInstance.checked = true;
    fixture.detectChanges();

    const el = checkboxEl();
    expect(el.className).toContain('ui-checkbox-variant-bootstrap');
    expect(el.className).toContain('ui-checkbox-size-lg');
    expect(el.className).toContain('ui-checkbox-checked');
  });

  it('reflects indeterminate state via aria', () => {
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();

    expect(checkboxEl().getAttribute('aria-checked')).toBe('mixed');
    expect(checkboxEl().className).toContain('ui-checkbox-indeterminate');
  });

  it('toggles checked state on click when enabled', () => {
    const el = checkboxEl();
    el.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeTrue();
    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('does not toggle when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const el = checkboxEl();
    el.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeFalse();
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('supports keyboard interaction', () => {
    const el = checkboxEl();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeTrue();

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.checked).toBeFalse();
  });
});
