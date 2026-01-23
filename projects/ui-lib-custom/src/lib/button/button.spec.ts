import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies classes from inputs', () => {
    component.variant.set('bootstrap');
    component.size.set('large');
    component.color.set('danger');
    component.appearance.set('outline');
    fixture.detectChanges();

    const btn = getButton();
    expect(btn.className).toContain('btn-bootstrap');
    expect(btn.className).toContain('btn-large');
    expect(btn.className).toContain('btn-danger');
    expect(btn.className).toContain('btn-appearance-outline');
  });

  it('disables and sets aria state when disabled or loading', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    let btn = getButton();
    expect(btn.disabled).toBeTrue();
    expect(btn.getAttribute('aria-disabled')).toBe('true');

    component.disabled.set(false);
    component.loading.set(true);
    fixture.detectChanges();

    btn = getButton();
    expect(btn.disabled).toBeTrue();
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('renders spinner when loading', () => {
    component.loading.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.btn-spinner')).toBeTruthy();
  });
});
