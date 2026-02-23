import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alert } from './alert';

describe('Alert', () => {
  let fixture: ComponentFixture<Alert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alert],
    }).compileComponents();

    fixture = TestBed.createComponent(Alert);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('applies dark theme variables', () => {
    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    const light: string = getComputedStyle(host).getPropertyValue('--alert-bg').trim();

    host.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(host).getPropertyValue('--alert-bg').trim();

    expect(dark).not.toBe(light);
    host.removeAttribute('data-theme');
  });
});
