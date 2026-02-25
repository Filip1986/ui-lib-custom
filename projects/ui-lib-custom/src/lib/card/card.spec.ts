import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeConfigService, ThemeVariant } from 'ui-lib-custom/theme';

import { Card, CardVariant, CardElevation } from './card';

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card
      [variant]="variant"
      [elevation]="elevation"
      [bordered]="bordered"
      [hoverable]="hoverable"
      [showHeader]="showHeader"
      [showFooter]="showFooter"
    >
      <div card-header>Header</div>
      Body
      <div card-footer>Footer</div>
    </ui-lib-card>
  `,
})
class CardHost {
  variant: CardVariant = 'material';
  elevation: CardElevation = 'medium';
  bordered: boolean = true;
  hoverable: boolean = false;
  showHeader: boolean | null = null;
  showFooter: boolean | null = null;
}

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card [hoverable]="true" [ariaLabel]="'Open card'" (click)="onClick()">
      <div card-header>Clickable</div>
      Click body
    </ui-lib-card>
  `,
})
class ClickableCardHost {
  clickCount: number = 0;

  onClick(): void {
    this.clickCount += 1;
  }
}

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card
      [theme]="theme"
      [headerIcon]="headerIcon"
      [subtitle]="subtitle"
      [closable]="closable"
      (closed)="onClosed()"
    >
      <div card-header>Header</div>
      Body
    </ui-lib-card>
  `,
})
class CardThemeHost {
  theme: unknown = null;
  headerIcon: string | null = null;
  subtitle: string | null = null;
  closable: boolean = false;
  closedCount: number = 0;

  onClosed(): void {
    this.closedCount += 1;
  }
}

class MockThemeConfigService {
  readonly variant = signal<ThemeVariant>('material');

  setVariant(variant: ThemeVariant): void {
    this.variant.set(variant);
  }

  getPreset(): { variant: string; colors: Record<string, string> } {
    return { variant: 'material', colors: {} };
  }

  getCssVars(): Record<string, string> {
    return { '--uilib-card-bg': 'rgb(1, 2, 3)' };
  }
}

describe('Card', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHost],
      providers: [{ provide: ThemeConfigService, useClass: MockThemeConfigService }],
    }).compileComponents();
  });

  async function bootstrap(initial?: Partial<CardHost>): Promise<ComponentFixture<CardHost>> {
    const fixture: ComponentFixture<CardHost> = TestBed.createComponent(CardHost);
    Object.assign(fixture.componentInstance, initial);
    fixture.detectChanges();
    return fixture;
  }

  const getCard = (fixture: ComponentFixture<CardHost>): HTMLElement =>
    fixture.nativeElement.querySelector('.card');

  it('should create', async () => {
    const fixture = await bootstrap();
    expect(getCard(fixture)).toBeTruthy();
  });

  it('applies variant, elevation, and bordered classes', async () => {
    const fixture = await bootstrap({ variant: 'bootstrap', elevation: 'high', hoverable: true });
    const card = getCard(fixture);
    expect(card.className).toContain('card-bootstrap');
    expect(card.className).toContain('card-elevation-high');
    expect(card.className).toContain('card-bordered');
    expect(card.className).toContain('card-hoverable');
  });

  it('applies each variant class', async () => {
    const variants: CardVariant[] = ['material', 'bootstrap', 'minimal'];

    for (const variant of variants) {
      const variantValue: CardVariant = variant;
      const fixture: ComponentFixture<CardHost> = await bootstrap({ variant: variantValue });
      expect(getCard(fixture).classList.contains(`card-${variantValue}`)).toBeTruthy();
    }
  });

  it('projects header, body, and footer slots', async () => {
    const fixture = await bootstrap();
    if (fixture.whenRenderingDone) {
      await fixture.whenRenderingDone();
    }
    await fixture.whenStable();
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('.card-header');
    const body: HTMLElement | null = fixture.nativeElement.querySelector('.card-body');
    const footer: HTMLElement | null = fixture.nativeElement.querySelector('.card-footer');

    expect(header?.textContent).toContain('Header');
    expect(body?.textContent).toContain('Body');
    expect(footer?.textContent).toContain('Footer');
  });

  it('respects showHeader/showFooter visibility controls', async () => {
    const fixture = await bootstrap({ showHeader: false, showFooter: false });

    const header: HTMLElement | null = fixture.nativeElement.querySelector('.card-header');
    const footer: HTMLElement | null = fixture.nativeElement.querySelector('.card-footer');

    expect(header).toBeNull();
    expect(footer).toBeNull();
  });

  it('applies dark theme variables', async () => {
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-card-bg').trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-card-bg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
  });
});

describe('Card theme and header features', () => {
  let fixture: ComponentFixture<CardThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardThemeHost],
      providers: [{ provide: ThemeConfigService, useClass: MockThemeConfigService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardThemeHost);
  });

  function cardEl(): HTMLElement {
    return fixture.nativeElement.querySelector('ui-lib-card');
  }

  async function setTheme(value: unknown): Promise<void> {
    fixture.componentInstance.theme = value;
    fixture.detectChanges(false);
    await fixture.whenStable();
    fixture.detectChanges(false);
  }

  async function setHeaderContent(icon: string | null, subtitle: string | null): Promise<void> {
    fixture.componentInstance.headerIcon = icon;
    fixture.componentInstance.subtitle = subtitle;
    fixture.detectChanges(false);
    await fixture.whenStable();
    fixture.detectChanges(false);
  }

  async function setClosable(value: boolean): Promise<void> {
    fixture.componentInstance.closable = value;
    fixture.detectChanges(false);
    await fixture.whenStable();
    fixture.detectChanges(false);
  }

  it('applies data-theme for string theme values', async () => {
    await setTheme('dark');

    expect(cardEl().getAttribute('data-theme')).toBe('dark');
  });

  it('applies variant and variables for scoped theme object', async () => {
    const scopedTheme: {
      variant: string;
      colors: { primary: string };
      variables: { '--uilib-card-border': string };
      colorScheme: 'light';
    } = {
      variant: 'bootstrap',
      colors: { primary: '#ff0000' },
      variables: { '--uilib-card-border': 'rgb(2, 3, 4)' },
      colorScheme: 'light',
    };

    await setTheme(scopedTheme);

    const el: HTMLElement = cardEl();
    expect(el.getAttribute('data-variant')).toBe('bootstrap');
    expect(el.getAttribute('data-theme')).toBe('light');
    expect(el.style.getPropertyValue('--uilib-card-bg')).toContain('rgb(1, 2, 3)');
    expect(el.style.getPropertyValue('--uilib-card-border')).toContain('rgb(2, 3, 4)');
  });

  it('clears theme attributes when theme is reset', async () => {
    await setTheme('dark');

    const freshFixture: ComponentFixture<CardThemeHost> = TestBed.createComponent(CardThemeHost);
    freshFixture.detectChanges();

    const freshHost: HTMLElement = freshFixture.nativeElement.querySelector('ui-lib-card');
    expect(freshHost.getAttribute('data-theme')).toBeNull();
    expect(freshHost.getAttribute('data-variant')).toBeNull();
  });

  it('renders header icon and subtitle when provided', async () => {
    await setHeaderContent('info', 'Details');

    const iconEl: HTMLElement | null = fixture.nativeElement.querySelector('.card-header-icon');
    const subtitleEl: HTMLElement | null = fixture.nativeElement.querySelector('.card-subtitle');

    expect(iconEl).toBeTruthy();
    expect(subtitleEl?.textContent).toContain('Details');
  });

  it('emits closed when close icon is clicked', async () => {
    await setClosable(true);

    const closeIcon: HTMLElement | null = fixture.nativeElement.querySelector('.card-close-icon');
    closeIcon?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.closedCount).toBe(1);
  });
});

describe('Card clickable behavior', () => {
  let fixture: ComponentFixture<ClickableCardHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickableCardHost],
      providers: [{ provide: ThemeConfigService, useClass: MockThemeConfigService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClickableCardHost);
    fixture.detectChanges();
  });

  const getCard = (): HTMLElement => fixture.nativeElement.querySelector('.card');

  it('emits click events when hoverable', () => {
    const host: ClickableCardHost = fixture.componentInstance;
    getCard().click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(1);
  });

  it('adds role and tabindex for hoverable cards', () => {
    const card: HTMLElement = getCard();
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');
  });
});

describe('Card keyboard accessibility', () => {
  let fixture: ComponentFixture<ClickableCardHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickableCardHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ClickableCardHost);
    fixture.detectChanges();
  });

  function cardEl(): HTMLElement {
    return fixture.nativeElement.querySelector('.card');
  }

  it('sets role, tabindex, and aria-label when hoverable', () => {
    const card = cardEl();
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');
    expect(card.getAttribute('aria-label')).toBe('Open card');
  });

  it('fires click on Enter key', () => {
    const card = cardEl();
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.clickCount).toBe(1);
  });

  it('fires click on Space key', () => {
    const card = cardEl();
    card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.clickCount).toBe(1);
  });
});
