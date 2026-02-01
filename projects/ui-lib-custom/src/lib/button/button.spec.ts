import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAudioWaveform } from '@ng-icons/lucide';

import { Button } from './button';
import { Icon } from '../icon/icon';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button, Icon],
      providers: [provideIcons({ lucideAudioWaveform })],
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
    fixture.componentRef.setInput('variant', 'bootstrap');
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('color', 'danger');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    const btn = getButton();
    expect(btn.className).toContain('btn-bootstrap');
    expect(btn.className).toContain('btn-large');
    expect(btn.className).toContain('btn-danger');
    expect(btn.className).toContain('btn-appearance-outline');
  });

  it('disables and sets aria state when disabled or loading', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let btn = getButton();
    expect(btn.disabled).toBeTrue();
    expect(btn.getAttribute('aria-disabled')).toBe('true');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    btn = getButton();
    expect(btn.disabled).toBeTrue();
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('renders spinner when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.btn-icon--loading')).toBeTruthy();
  });
});
