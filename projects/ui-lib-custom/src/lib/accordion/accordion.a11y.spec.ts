import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Accordion } from './accordion';
import { AccordionPanel } from './accordion-panel';
import { ThemeConfigService, ThemeVariant, ThemePreset } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  template: `
    <ui-lib-accordion>
      <ui-lib-accordion-panel header="Panel 1">
        <div>Content One</div>
      </ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Panel 2">
        <div>Content Two</div>
      </ui-lib-accordion-panel>
    </ui-lib-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

describe('Accordion Accessibility', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async (): Promise<void> => {
    const variant = signal<ThemeVariant>('material');
    const buildPreset = (): ThemePreset => ({
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
        sizes: { md: '1rem' },
      },
      createdAt: 0,
      updatedAt: 0,
    });
    const mockTheme = {
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
