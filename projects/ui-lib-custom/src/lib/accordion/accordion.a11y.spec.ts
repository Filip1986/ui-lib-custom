import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Accordion } from './accordion';
import { AccordionPanel } from './accordion-panel';
import { ThemeConfigService, ThemeVariant } from 'ui-lib-custom/theme';
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
})
class TestHostComponent {}

describe('Accordion Accessibility', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    const variant = signal<ThemeVariant>('material');
    const mockTheme = {
      variant,
      setVariant: (value: ThemeVariant): void => variant.set(value),
      getPreset: () => ({
        variant: 'material',
        icons: {
          defaultLibrary: 'lucide',
          defaultSize: 'md',
          sizes: { md: '1rem' },
        },
        colors: {},
      }),
      preset: () => ({
        variant: 'material',
        icons: {
          defaultLibrary: 'lucide',
          defaultSize: 'md',
          sizes: { md: '1rem' },
        },
        colors: {},
      }),
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: ThemeConfigService, useValue: mockTheme }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should have no accessibility violations', async () => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
