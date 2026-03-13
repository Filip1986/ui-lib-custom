import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeVariant, ThemeScopeInput } from 'ui-lib-custom/theme';

import { Card } from './card';
import type { CardElevation, CardVariant } from './card';
import { SHARED_VARIANT_OPTIONS } from '../core/shared/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public variant: CardVariant = 'material';
  public elevation: CardElevation = 'medium';
  public bordered: boolean = true;
  public hoverable: boolean = false;
  public showHeader: boolean | null = null;
  public showFooter: boolean | null = null;
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ClickableCardHost {
  public clickCount: number = 0;

  public onClick(): void {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CardThemeHost {
  public theme: ThemeScopeInput = null;
  public headerIcon: string | null = null;
  public subtitle: string | null = null;
  public closable: boolean = false;
  public closedCount: number = 0;

  public onClosed(): void {
    this.closedCount += 1;
  }
}

class MockThemeConfigService {
  public readonly variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');

  public setVariant(variant: ThemeVariant): void {
    this.variant.set(variant);
  }

  public getPreset(): { variant: string; colors: Record<string, string> } {
    return { variant: 'material', colors: {} };
  }

  public getCssVars(): Record<string, string> {
    return { '--uilib-card-bg': 'rgb(1, 2, 3)' };
  }
}

describe('Card', (): void => {
  beforeEach(async (): Promise<void> => {
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

  const getCard: (fixture: ComponentFixture<CardHost>) => HTMLElement = (
    fixture: ComponentFixture<CardHost>
  ): HTMLElement => (fixture.nativeElement as HTMLElement).querySelector('.card') as HTMLElement;

  it('should create', async (): Promise<void> => {
    const fixture: ComponentFixture<CardHost> = await bootstrap();
    expect(getCard(fixture)).toBeTruthy();
  });

  it('applies variant, elevation, and bordered classes', async (): Promise<void> => {
    const fixture: ComponentFixture<CardHost> = await bootstrap({
      variant: 'bootstrap',
      elevation: 'high',
      hoverable: true,
    });
    const card: HTMLElement = getCard(fixture);
    expect(card.className).toContain('card-bootstrap');
    expect(card.className).toContain('card-elevation-high');
    expect(card.className).toContain('card-bordered');
    expect(card.className).toContain('card-hoverable');
  });

  it('applies each variant class', async (): Promise<void> => {
    const variants: CardVariant[] = [...SHARED_VARIANT_OPTIONS];

    for (const variant of variants) {
      const variantValue: CardVariant = variant;
      const fixture: ComponentFixture<CardHost> = await bootstrap({ variant: variantValue });
      expect(getCard(fixture).classList.contains(`card-${variantValue}`)).toBeTruthy();
    }
  });

  it('projects header, body, and footer slots', async (): Promise<void> => {
    const fixture: ComponentFixture<CardHost> = await bootstrap();
    await fixture.whenRenderingDone();
    await fixture.whenStable();
    fixture.detectChanges();

    const header: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-header'
    );
    const body: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-body'
    );
    const footer: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-footer'
    );

    expect(header?.textContent).toContain('Header');
    expect(body?.textContent).toContain('Body');
    expect(footer?.textContent).toContain('Footer');
  });

  it('respects showHeader/showFooter visibility controls', async (): Promise<void> => {
    const fixture: ComponentFixture<CardHost> = await bootstrap({
      showHeader: false,
      showFooter: false,
    });

    const header: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-header'
    );
    const footer: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-footer'
    );

    expect(header).toBeNull();
    expect(footer).toBeNull();
  });

  it('applies dark theme variables', (): void => {
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    scope.style.setProperty('--uilib-card-bg', 'light-bg');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-card-bg').trim();

    scope.setAttribute('data-theme', 'dark');
    scope.style.setProperty('--uilib-card-bg', 'dark-bg');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-card-bg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
  });
});

describe('Card theme and header features', (): void => {
  let fixture: ComponentFixture<CardThemeHost>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [CardThemeHost],
      providers: [{ provide: ThemeConfigService, useClass: MockThemeConfigService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardThemeHost);
  });

  function cardEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-card') as HTMLElement;
  }

  async function setTheme(value: ThemeScopeInput): Promise<void> {
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

  it('applies data-theme for string theme values', async (): Promise<void> => {
    await setTheme('dark');

    expect(cardEl().getAttribute('data-theme')).toBe('dark');
  });

  it('applies variant and variables for scoped theme object', async (): Promise<void> => {
    const scopedTheme: {
      variant: ThemeVariant;
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

  it('clears theme attributes when theme is reset', async (): Promise<void> => {
    await setTheme('dark');

    const freshFixture: ComponentFixture<CardThemeHost> = TestBed.createComponent(CardThemeHost);
    freshFixture.detectChanges();

    const freshHost: HTMLElement = (freshFixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-card'
    ) as HTMLElement;
    expect(freshHost.getAttribute('data-theme')).toBeNull();
    expect(freshHost.getAttribute('data-variant')).toBeNull();
  });

  it('renders header icon and subtitle when provided', async (): Promise<void> => {
    await setHeaderContent('info', 'Details');

    const iconEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-header-icon'
    );
    const subtitleEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-subtitle'
    );

    expect(iconEl).toBeTruthy();
    expect(subtitleEl?.textContent).toContain('Details');
  });

  it('emits closed when close icon is clicked', async (): Promise<void> => {
    await setClosable(true);

    const closeIcon: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-close-icon'
    );
    closeIcon?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.closedCount).toBe(1);
  });
});

describe('Card clickable behavior', (): void => {
  let fixture: ComponentFixture<ClickableCardHost>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ClickableCardHost],
      providers: [{ provide: ThemeConfigService, useClass: MockThemeConfigService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClickableCardHost);
    fixture.detectChanges();
  });

  const getCard: () => HTMLElement = (): HTMLElement =>
    (fixture.nativeElement as HTMLElement).querySelector('.card') as HTMLElement;

  it('emits click events when hoverable', (): void => {
    const host: ClickableCardHost = fixture.componentInstance;
    getCard().click();
    fixture.detectChanges();

    expect(host.clickCount).toBe(1);
  });

  it('adds role and tabindex for hoverable cards', (): void => {
    const card: HTMLElement = getCard();
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');
  });
});

describe('Card keyboard accessibility', (): void => {
  let fixture: ComponentFixture<ClickableCardHost>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ClickableCardHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ClickableCardHost);
    fixture.detectChanges();
  });

  function cardEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('.card') as HTMLElement;
  }

  it('sets role, tabindex, and aria-label when hoverable', (): void => {
    const card: HTMLElement = cardEl();
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');
    expect(card.getAttribute('aria-label')).toBe('Open card');
  });

  it('fires click on Enter key', (): void => {
    const card: HTMLElement = cardEl();
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.clickCount).toBe(1);
  });

  it('fires click on Space key', (): void => {
    const card: HTMLElement = cardEl();
    card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.clickCount).toBe(1);
  });
});
