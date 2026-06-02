import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { BlockUI } from './block-ui';

// ─── Typed query helpers ──────────────────────────────────────────────────────

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

// ─── Host component ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [BlockUI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-block-ui [blocked]="blocked()">
      <button class="inner-btn" type="button">Click me</button>
      <a class="inner-link" href="#">A link</a>
      <span blockTemplate class="mask-label">Loading…</span>
    </ui-lib-block-ui>
  `,
})
class BlockUIA11yHostComponent {
  public readonly blocked: WritableSignal<boolean> = signal<boolean>(false);
}

// ─── Setup helpers ────────────────────────────────────────────────────────────

async function createFixture(
  blocked: boolean = false,
): Promise<ComponentFixture<BlockUIA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [BlockUIA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<BlockUIA11yHostComponent> =
    TestBed.createComponent(BlockUIA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.componentInstance.blocked.set(blocked);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('BlockUI Accessibility', (): void => {
  afterEach((): void => {
    const el: HTMLElement | null = document.body.querySelector('div[id^="ui-lib-block-ui"]');
    if (el) el.remove();
  });

  // ─── Host element ARIA ──────────────────────────────────────────────────────

  describe('host element ARIA', (): void => {
    it('should have aria-busy="false" when not blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(false);
      const host: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-block-ui') as HTMLElement;
      expect(host.getAttribute('aria-busy')).toBe('false');
    });

    it('should have aria-busy="true" when blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(true);
      const host: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-block-ui') as HTMLElement;
      expect(host.getAttribute('aria-busy')).toBe('true');
    });

    it('should NOT have aria-disabled when not blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(false);
      const host: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-block-ui') as HTMLElement;
      expect(host.getAttribute('aria-disabled')).toBeNull();
    });

    it('should have aria-disabled="true" when blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(true);
      const host: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-block-ui') as HTMLElement;
      expect(host.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have a unique id on the host element', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture();
      const host: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-block-ui') as HTMLElement;
      expect(host.id).toMatch(/^ui-lib-block-ui-\d+$/);
    });
  });

  // ─── Mask element ARIA ──────────────────────────────────────────────────────

  describe('mask element ARIA', (): void => {
    it('should have role="status" on the mask element', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture();
      const mask: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-block-ui__mask',
      ) as HTMLElement;
      expect(mask.getAttribute('role')).toBe('status');
    });

    it('should have aria-live="polite" on the mask element', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture();
      const mask: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-block-ui__mask',
      ) as HTMLElement;
      expect(mask.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-hidden="true" on mask when not blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(false);
      const mask: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-block-ui__mask',
      ) as HTMLElement;
      expect(mask.getAttribute('aria-hidden')).toBe('true');
    });

    it('should NOT have aria-hidden on mask when blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(true);
      const mask: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-block-ui__mask',
      ) as HTMLElement;
      expect(mask.getAttribute('aria-hidden')).toBeNull();
    });
  });

  // ─── Focus / keyboard interaction ──────────────────────────────────────────

  describe('keyboard focus trap', (): void => {
    it('content wrapper should NOT have inert when not blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(false);
      const content: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-block-ui__content',
      ) as HTMLElement;
      expect(content.hasAttribute('inert')).toBe(false);
    });

    it('content wrapper should have inert when blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(true);
      const content: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-block-ui__content',
      ) as HTMLElement;
      expect(content.hasAttribute('inert')).toBe(true);
    });

    it('inner button should be focusable when not blocked', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(false);
      const btn: HTMLButtonElement = queryEl<HTMLButtonElement>(
        fixture,
        '.inner-btn',
      ) as HTMLButtonElement;
      btn.focus();
      expect(document.activeElement).toBe(btn);
    });

    it('should remove inert from content wrapper when unblocked reactively', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(true);
      const content: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.ui-lib-block-ui__content',
      ) as HTMLElement;
      expect(content.hasAttribute('inert')).toBe(true);

      fixture.componentInstance.blocked.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(content.hasAttribute('inert')).toBe(false);
    });
  });

  // ─── axe-core automated checks ─────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('should pass axe in unblocked state', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(false);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('should pass axe in blocked state', async (): Promise<void> => {
      const fixture: ComponentFixture<BlockUIA11yHostComponent> = await createFixture(true);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
