import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Badge } from './badge';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <ui-lib-badge>New</ui-lib-badge>
    <ui-lib-badge color="success">Success</ui-lib-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

describe('Badge Accessibility', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async (): Promise<void> => {
    const variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
    const buildPreset: () => ThemePreset = (): ThemePreset => ({
      id: 'test-preset',
      name: 'Test Preset',
      variant: 'material',
      shape: 'rounded',
      density: 'default',
      darkMode: 'light',
      colors: {
        primary: '#000000',
        secondary: '#000000',
        success: '#000000',
        danger: '#000000',
        warning: '#000000',
        info: '#000000',
        surface: '#000000',
        background: '#000000',
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter',
        mono: 'monospace',
      },
      icons: {
        defaultLibrary: 'lucide',
        defaultSize: 'md',
        sizes: {
          xs: '0.75rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
        },
      },
      createdAt: 0,
      updatedAt: 0,
    });
    const mockTheme: {
      variant: WritableSignal<ThemeVariant>;
      setVariant: (value: ThemeVariant) => void;
      getPreset: () => ThemePreset;
      preset: () => ThemePreset;
    } = {
      variant,
      setVariant: (value: ThemeVariant): void => variant.set(value),
      getPreset: (): ThemePreset => buildPreset(),
      preset: (): ThemePreset => buildPreset(),
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: ThemeConfigService, useValue: mockTheme }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should have no accessibility violations', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
