import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { Button } from 'ui-lib-custom/button';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { checkA11y, A11Y_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Card, Button],
  template: `
    <ui-lib-card>
      <div card-header>Header</div>
      <p>Body</p>
      <div card-footer>
        <ui-lib-button>Action</ui-lib-button>
      </div>
    </ui-lib-card>
  `,
})
class TestHostComponent {}

describe('Card Accessibility', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    const mockTheme = {
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
    await checkA11y(fixture, { rules: A11Y_RULES.skipColorContrast });
  });
});
