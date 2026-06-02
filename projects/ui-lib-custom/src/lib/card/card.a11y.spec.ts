import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Card } from './card';
import { Button } from 'ui-lib-custom/button';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeVariant, ThemePreset } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ---------------------------------------------------------------------------
// Shared mock
// ---------------------------------------------------------------------------

function buildPreset(): ThemePreset {
  return {
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
    fonts: { heading: 'Inter', body: 'Inter', mono: 'monospace' },
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
  };
}

function makeMockTheme(): {
  variant: WritableSignal<ThemeVariant>;
  setVariant: (value: ThemeVariant) => void;
  getPreset: () => ThemePreset;
  preset: () => ThemePreset;
} {
  const variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
  return {
    variant,
    setVariant: (value: ThemeVariant): void => variant.set(value),
    getPreset: (): ThemePreset => buildPreset(),
    preset: (): ThemePreset => buildPreset(),
  };
}

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card [hoverable]="true" [ariaLabel]="'Open product card'">
      <div card-header>Product Title</div>
      <p>Product description</p>
    </ui-lib-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HoverableCardHost {}

@Component({
  standalone: true,
  imports: [Card, Button],
  template: `
    <ui-lib-card [closable]="true">
      <div card-header>Dismissible</div>
      <p>Content</p>
    </ui-lib-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ClosableCardHost {}

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card [hoverable]="true" [ariaLabel]="label()">
      <div card-header>Card</div>
      <p>Body</p>
    </ui-lib-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DynamicLabelHost {
  public readonly label: WritableSignal<string | null> = signal<string | null>('Initial label');
}

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card variant="bootstrap">
      <div card-header>Bootstrap Card</div>
      <p>Content</p>
    </ui-lib-card>
    <ui-lib-card variant="minimal">
      <div card-header>Minimal Card</div>
      <p>Content</p>
    </ui-lib-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiVariantHost {}

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card>
      <div card-header>Card One</div>
      <p>Body one</p>
    </ui-lib-card>
    <ui-lib-card>
      <div card-header>Card Two</div>
      <p>Body two</p>
    </ui-lib-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoCardHost {}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [{ provide: ThemeConfigService, useValue: makeMockTheme() }],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function card(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-card') as HTMLElement;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Card Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((f: ComponentFixture<unknown>): void => f.destroy());
    createdFixtures.length = 0;
  });

  it('basic card: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await setup(TestHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('hoverable card: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<HoverableCardHost> = await setup(HoverableCardHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('closable card: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<ClosableCardHost> = await setup(ClosableCardHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('multi-variant cards: no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<MultiVariantHost> = await setup(MultiVariantHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('hoverable card: has role="button"', async (): Promise<void> => {
    const fixture: ComponentFixture<HoverableCardHost> = await setup(HoverableCardHost);
    expect(card(fixture).getAttribute('role')).toBe('button');
  });

  it('hoverable card: has tabindex="0"', async (): Promise<void> => {
    const fixture: ComponentFixture<HoverableCardHost> = await setup(HoverableCardHost);
    expect(card(fixture).getAttribute('tabindex')).toBe('0');
  });

  it('hoverable card: has aria-label from ariaLabel input', async (): Promise<void> => {
    const fixture: ComponentFixture<HoverableCardHost> = await setup(HoverableCardHost);
    expect(card(fixture).getAttribute('aria-label')).toBe('Open product card');
  });

  it('hoverable card: does not have aria-labelledby', async (): Promise<void> => {
    const fixture: ComponentFixture<HoverableCardHost> = await setup(HoverableCardHost);
    expect(card(fixture).getAttribute('aria-labelledby')).toBeNull();
  });

  it('non-hoverable card: no role attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await setup(TestHostComponent);
    expect(card(fixture).getAttribute('role')).toBeNull();
  });

  it('non-hoverable card: no tabindex attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await setup(TestHostComponent);
    expect(card(fixture).getAttribute('tabindex')).toBeNull();
  });

  it('non-hoverable card with header: has aria-labelledby pointing to title', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await setup(TestHostComponent);
    const cardEl: HTMLElement = card(fixture);
    const labelledBy: string | null = cardEl.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    const titleEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-card__title',
    );
    expect(titleEl).toBeTruthy();
    expect(titleEl?.id).toBe(labelledBy);
  });

  it('non-hoverable card with header: title div has a stable non-empty id', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await setup(TestHostComponent);
    const titleEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-card__title',
    );
    expect(titleEl?.id).toMatch(/^ui-lib-card-title-\d+$/);
  });

  it('multiple card instances: title IDs are unique', async (): Promise<void> => {
    const fixture: ComponentFixture<TwoCardHost> = await setup(TwoCardHost);
    const titles: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-card__title'),
    );
    expect(titles.length).toBe(2);
    expect(titles[0]?.id).toBeTruthy();
    expect(titles[1]?.id).toBeTruthy();
    expect(titles[0]?.id).not.toBe(titles[1]?.id);
  });

  it('hoverable card: Enter key triggers click', async (): Promise<void> => {
    const fixture: ComponentFixture<HoverableCardHost> = await setup(HoverableCardHost);
    let clicked: boolean = false;
    // The handler dispatches click on the ui-lib-card host element, which bubbles up
    (fixture.nativeElement as HTMLElement).addEventListener('click', (): void => {
      clicked = true;
    });
    card(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(clicked).toBe(true);
  });

  it('hoverable card: Space key triggers click', async (): Promise<void> => {
    const fixture: ComponentFixture<HoverableCardHost> = await setup(HoverableCardHost);
    let clicked: boolean = false;
    (fixture.nativeElement as HTMLElement).addEventListener('click', (): void => {
      clicked = true;
    });
    card(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(clicked).toBe(true);
  });

  it('non-hoverable card: Enter key does not trigger click', async (): Promise<void> => {
    const fixture: ComponentFixture<TestHostComponent> = await setup(TestHostComponent);
    let clicked: boolean = false;
    (fixture.nativeElement as HTMLElement).addEventListener('click', (): void => {
      clicked = true;
    });
    card(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(clicked).toBe(false);
  });

  it('closable card: close button has an accessible label', async (): Promise<void> => {
    const fixture: ComponentFixture<ClosableCardHost> = await setup(ClosableCardHost);
    const closeIconHost: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-card__close-icon',
    );
    expect(closeIconHost).toBeTruthy();
    // The clickable icon renders a button child with aria-label
    const labelledEl: HTMLElement | null =
      (closeIconHost?.querySelector('[aria-label]') as HTMLElement | null) ?? closeIconHost;
    const label: string = labelledEl?.getAttribute('aria-label') ?? '';
    expect(label.length).toBeGreaterThan(0);
  });

  it('hoverable card: aria-label updates when signal changes', async (): Promise<void> => {
    const fixture: ComponentFixture<DynamicLabelHost> = await setup(DynamicLabelHost);
    expect(card(fixture).getAttribute('aria-label')).toBe('Initial label');

    fixture.componentInstance.label.set('Updated label');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(card(fixture).getAttribute('aria-label')).toBe('Updated label');
  });
});
