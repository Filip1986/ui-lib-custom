import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alert } from './alert';
import { ThemeConfigService } from 'ui-lib-custom/theme';

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
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(root).getPropertyValue('--alert-bg').trim();

    root.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(root).getPropertyValue('--alert-bg').trim();

    expect(dark).not.toBe(light);
    root.removeAttribute('data-theme');
  });

  it('uses global variant when no variant input provided', () => {
    const service: ThemeConfigService = TestBed.inject(ThemeConfigService);
    service.setVariant('minimal');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.className).toContain('alert-minimal');
  });
});
