import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { PaginatorComponent } from './paginator.component';

function queryElement<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryRequiredElement<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = queryElement<T>(fixture, selector);
  if (element === null) {
    throw new Error(`Expected element matching selector: ${selector}`);
  }
  return element;
}

function queryElements<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function getPageButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return queryElements<HTMLButtonElement>(fixture, '.uilib-paginator-page');
}

function getNavigationButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return queryElements<HTMLButtonElement>(
    fixture,
    '.uilib-paginator-first, .uilib-paginator-prev, .uilib-paginator-next, .uilib-paginator-last'
  );
}

function dispatchKeyboardActivation(button: HTMLButtonElement, key: 'Enter' | ' '): void {
  button.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  button.click();
}

@Component({
  standalone: true,
  imports: [PaginatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-paginator
      [totalRecords]="totalRecords()"
      [(rows)]="rows"
      [(first)]="first"
      [showCurrentPageReport]="showCurrentPageReport()"
      [rowsPerPageOptions]="rowsPerPageOptions()"
      [showJumpToPageInput]="showJumpToPageInput()"
      [ariaLabel]="ariaLabel()"
      [showFirstLastIcon]="showFirstLastIcon()"
      [showPageLinks]="showPageLinks()"
    />
  `,
})
class PaginatorA11yHostComponent {
  public readonly totalRecords: WritableSignal<number> = signal<number>(100);
  public readonly rows: WritableSignal<number> = signal<number>(10);
  public readonly first: WritableSignal<number> = signal<number>(0);
  public readonly showCurrentPageReport: WritableSignal<boolean> = signal<boolean>(false);
  public readonly rowsPerPageOptions: WritableSignal<number[] | null> = signal<number[] | null>(
    null
  );
  public readonly showJumpToPageInput: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Pagination');
  public readonly showFirstLastIcon: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showPageLinks: WritableSignal<boolean> = signal<boolean>(true);
}

@Component({
  standalone: true,
  imports: [PaginatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-paginator [totalRecords]="50" />
    <ui-lib-paginator [totalRecords]="80" />
  `,
})
class MultiPaginatorA11yHostComponent {}

describe('Paginator Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PaginatorA11yHostComponent, MultiPaginatorA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    document.body.innerHTML = '';
  });

  function createHostFixture(): ComponentFixture<PaginatorA11yHostComponent> {
    const fixture: ComponentFixture<PaginatorA11yHostComponent> = TestBed.createComponent(
      PaginatorA11yHostComponent
    );
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    return fixture;
  }

  // ── axe-core automated checks ────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe in default state', async (): Promise<void> => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with report, jump input, and rows-per-page controls visible', async (): Promise<void> => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      fixture.componentInstance.showCurrentPageReport.set(true);
      fixture.componentInstance.showJumpToPageInput.set(true);
      fixture.componentInstance.rowsPerPageOptions.set([5, 10, 25]);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe when paginator is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      fixture.componentInstance.totalRecords.set(0);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── ARIA structure ────────────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('exposes a navigation landmark with the configured aria-label', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const host: HTMLElement = queryRequiredElement<HTMLElement>(fixture, 'ui-lib-paginator');
      expect(host.getAttribute('role')).toBe('navigation');
      expect(host.getAttribute('aria-label')).toBe('Pagination');
    });

    it('updates the navigation aria-label when ariaLabel input changes', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      fixture.componentInstance.ariaLabel.set('Results pagination');
      fixture.detectChanges();
      const host: HTMLElement = queryRequiredElement<HTMLElement>(fixture, 'ui-lib-paginator');
      expect(host.getAttribute('aria-label')).toBe('Results pagination');
    });

    it('assigns unique host IDs per component instance', (): void => {
      const fixture: ComponentFixture<MultiPaginatorA11yHostComponent> = TestBed.createComponent(
        MultiPaginatorA11yHostComponent
      );
      fixture.detectChanges();
      const hosts: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-paginator')
      );
      expect(hosts.length).toBe(2);
      expect(hosts[0]?.id).toMatch(/^ui-lib-paginator-\d+$/);
      expect(hosts[1]?.id).toMatch(/^ui-lib-paginator-\d+$/);
      expect(hosts[0]?.id).not.toBe(hosts[1]?.id);
    });

    it('announces page changes through a polite live region', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const liveRegion: HTMLElement = queryRequiredElement<HTMLElement>(
        fixture,
        '.uilib-paginator-live'
      );
      expect(liveRegion.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
      expect(liveRegion.textContent.trim()).toBe('Page 1 of 10');
    });

    it('announces empty-state pagination in the live region', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      fixture.componentInstance.totalRecords.set(0);
      fixture.detectChanges();
      const liveRegion: HTMLElement = queryRequiredElement<HTMLElement>(
        fixture,
        '.uilib-paginator-live'
      );
      expect(liveRegion.textContent.trim()).toBe('No pages available');
    });

    it('provides labels for icon-only navigation buttons', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const buttonLabels: (string | null)[] = getNavigationButtons(fixture).map(
        (button: HTMLButtonElement): string | null => button.getAttribute('aria-label')
      );
      expect(buttonLabels).toEqual([
        'Go to first page',
        'Go to previous page',
        'Go to next page',
        'Go to last page',
      ]);
    });

    it('marks only the active page button with aria-current="page"', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const pageButtons: HTMLButtonElement[] = getPageButtons(fixture);
      expect(pageButtons[0]?.getAttribute('aria-current')).toBe('page');
      expect(pageButtons[1]?.getAttribute('aria-current')).toBeNull();
    });

    it('provides explicit labels for page buttons', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const pageButtons: HTMLButtonElement[] = getPageButtons(fixture);
      expect(pageButtons[0]?.getAttribute('aria-label')).toBe('Page 1, current page');
      expect(pageButtons[1]?.getAttribute('aria-label')).toBe('Go to page 2');
    });

    it('marks decorative SVG icons as aria-hidden and non-focusable', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const icons: SVGElement[] = queryElements<SVGElement>(fixture, '.uilib-paginator-button svg');
      expect(icons.length).toBeGreaterThan(0);
      for (const icon of icons) {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
        expect(icon.getAttribute('focusable')).toBe('false');
      }
    });
  });

  // ── Keyboard interaction ──────────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('supports Enter activation on the next-page button', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const nextButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        '.uilib-paginator-next'
      );
      dispatchKeyboardActivation(nextButton, 'Enter');
      fixture.detectChanges();
      expect(fixture.componentInstance.first()).toBe(10);
      expect(
        queryRequiredElement<HTMLElement>(fixture, '.uilib-paginator-live').textContent.trim()
      ).toBe('Page 2 of 10');
    });

    it('supports Space activation on a page-link button', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const thirdPageButton: HTMLButtonElement = getPageButtons(fixture)[2] as HTMLButtonElement;
      dispatchKeyboardActivation(thirdPageButton, ' ');
      fixture.detectChanges();
      expect(fixture.componentInstance.first()).toBe(20);
      expect(thirdPageButton.getAttribute('aria-current')).toBe('page');
    });

    it('does not change page from keyboard activation when previous button is disabled', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      const previousButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        '.uilib-paginator-prev'
      );
      expect(previousButton.disabled).toBe(true);
      dispatchKeyboardActivation(previousButton, 'Enter');
      fixture.detectChanges();
      expect(fixture.componentInstance.first()).toBe(0);
    });

    it('changes page when Enter is pressed in the jump-to-page input', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      fixture.componentInstance.showJumpToPageInput.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryRequiredElement<HTMLInputElement>(
        fixture,
        '.uilib-paginator-jtp-input'
      );
      input.value = '4';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.first()).toBe(30);
    });

    it('does not change page when non-Enter key is pressed in jump-to-page input', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      fixture.componentInstance.showJumpToPageInput.set(true);
      fixture.detectChanges();
      const input: HTMLInputElement = queryRequiredElement<HTMLInputElement>(
        fixture,
        '.uilib-paginator-jtp-input'
      );
      input.value = '4';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.first()).toBe(0);
    });

    it('updates page model when rows-per-page is changed via select control', (): void => {
      const fixture: ComponentFixture<PaginatorA11yHostComponent> = createHostFixture();
      fixture.componentInstance.rowsPerPageOptions.set([5, 10, 25]);
      fixture.detectChanges();
      const select: HTMLSelectElement = queryRequiredElement<HTMLSelectElement>(
        fixture,
        '.uilib-paginator-rpp-select'
      );
      select.value = '25';
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(fixture.componentInstance.rows()).toBe(25);
      expect(
        queryRequiredElement<HTMLElement>(fixture, '.uilib-paginator-live').textContent.trim()
      ).toBe('Page 1 of 4');
    });
  });
});
