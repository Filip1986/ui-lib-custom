import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Inplace } from './inplace';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ─── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Inplace],
  template: `
    <ui-lib-inplace>
      <span inplaceDisplay>Click to edit</span>
      <input inplaceContent type="text" placeholder="Edit here" />
    </ui-lib-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultInplaceHost {}

@Component({
  standalone: true,
  imports: [Inplace],
  template: `
    <ui-lib-inplace [active]="active()" (activeChange)="active.set($event)" [closable]="true">
      <span inplaceDisplay>Click to edit</span>
      <input inplaceContent type="text" placeholder="Edit here" />
    </ui-lib-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ActiveClosableInplaceHost {
  public readonly active: WritableSignal<boolean> = signal<boolean>(true);
}

@Component({
  standalone: true,
  imports: [Inplace],
  template: `
    <ui-lib-inplace [disabled]="true">
      <span inplaceDisplay>Read-only value</span>
      <input inplaceContent type="text" />
    </ui-lib-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledInplaceHost {}

@Component({
  standalone: true,
  imports: [Inplace],
  template: `
    <ui-lib-inplace [active]="active()" (activeChange)="active.set($event)">
      <span inplaceDisplay>Click to edit</span>
      <input inplaceContent type="text" placeholder="Edit here" />
    </ui-lib-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InteractiveInplaceHost {
  public readonly active: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [Inplace],
  template: `
    <ui-lib-inplace variant="material">
      <span inplaceDisplay>Material</span>
      <input inplaceContent type="text" />
    </ui-lib-inplace>
    <ui-lib-inplace variant="bootstrap">
      <span inplaceDisplay>Bootstrap</span>
      <input inplaceContent type="text" />
    </ui-lib-inplace>
    <ui-lib-inplace variant="minimal">
      <span inplaceDisplay>Minimal</span>
      <input inplaceContent type="text" />
    </ui-lib-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiVariantInplaceHost {}

@Component({
  standalone: true,
  imports: [Inplace],
  template: `
    <ui-lib-inplace>
      <span inplaceDisplay>First</span>
      <input inplaceContent type="text" />
    </ui-lib-inplace>
    <ui-lib-inplace>
      <span inplaceDisplay>Second</span>
      <input inplaceContent type="text" />
    </ui-lib-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoInplacesHost {}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getInplace(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-inplace') as HTMLElement;
}

function getDisplayButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-inplace__display'
  ) as HTMLButtonElement;
}

function getContentWrapper(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-inplace__content'
  ) as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Inplace Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  // ─── axe-core automated checks ───────────────────────────────────────────

  describe('axe-core', (): void => {
    it('default (inactive) state: no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultInplaceHost> = await setup(DefaultInplaceHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('active + closable state: no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<ActiveClosableInplaceHost> =
        await setup(ActiveClosableInplaceHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('disabled state: no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledInplaceHost> = await setup(DisabledInplaceHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('all three variants: no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiVariantInplaceHost> =
        await setup(MultiVariantInplaceHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ─── ARIA structure ───────────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('display element is a native button', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultInplaceHost> = await setup(DefaultInplaceHost);
      expect(getDisplayButton(fixture).tagName.toLowerCase()).toBe('button');
    });

    it('display button has aria-expanded="false" when inactive', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultInplaceHost> = await setup(DefaultInplaceHost);
      expect(getDisplayButton(fixture).getAttribute('aria-expanded')).toBe('false');
    });

    it('display button has aria-expanded="true" when active', async (): Promise<void> => {
      const fixture: ComponentFixture<ActiveClosableInplaceHost> =
        await setup(ActiveClosableInplaceHost);
      expect(getDisplayButton(fixture).getAttribute('aria-expanded')).toBe('true');
    });

    it('display button has aria-controls pointing to content wrapper id', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultInplaceHost> = await setup(DefaultInplaceHost);
      const controls: string | null = getDisplayButton(fixture).getAttribute('aria-controls');
      const contentId: string | null = getContentWrapper(fixture).getAttribute('id');
      expect(controls).toBeTruthy();
      expect(controls).toBe(contentId);
    });

    it('display button has a default aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultInplaceHost> = await setup(DefaultInplaceHost);
      expect(getDisplayButton(fixture).getAttribute('aria-label')).toBe('Click to edit');
    });

    it('close button has aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<ActiveClosableInplaceHost> =
        await setup(ActiveClosableInplaceHost);
      const closeBtn: HTMLButtonElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-inplace__close-button');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close editor');
    });

    it('close button icon span has aria-hidden="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<ActiveClosableInplaceHost> =
        await setup(ActiveClosableInplaceHost);
      const iconSpan: Element | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-inplace__close-button span'
      );
      expect(iconSpan?.getAttribute('aria-hidden')).toBe('true');
    });

    it('host element has a generated unique id', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultInplaceHost> = await setup(DefaultInplaceHost);
      expect(getInplace(fixture).getAttribute('id')).toMatch(/^ui-lib-inplace-\d+$/);
    });

    it('two instances have distinct host ids', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoInplacesHost> = await setup(TwoInplacesHost);
      const inplaces: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('ui-lib-inplace');
      expect(inplaces[0]?.id).not.toBe(inplaces[1]?.id);
    });
  });

  // ─── Disabled ARIA ────────────────────────────────────────────────────────

  describe('disabled state', (): void => {
    it('display button has disabled attribute when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledInplaceHost> = await setup(DisabledInplaceHost);
      expect(getDisplayButton(fixture).disabled).toBe(true);
    });

    it('display button still exposes aria-expanded when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledInplaceHost> = await setup(DisabledInplaceHost);
      expect(getDisplayButton(fixture).getAttribute('aria-expanded')).toBe('false');
    });
  });

  // ─── Keyboard interaction ─────────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('Enter key on display button activates the editor', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveInplaceHost> =
        await setup(InteractiveInplaceHost);
      const host: InteractiveInplaceHost = fixture.componentInstance;
      getDisplayButton(fixture).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.active()).toBe(true);
    });

    it('Space key on display button activates the editor', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveInplaceHost> =
        await setup(InteractiveInplaceHost);
      const host: InteractiveInplaceHost = fixture.componentInstance;
      getDisplayButton(fixture).dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.active()).toBe(true);
    });

    it('Escape key inside content wrapper deactivates the editor', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveInplaceHost> =
        await setup(InteractiveInplaceHost);
      const host: InteractiveInplaceHost = fixture.componentInstance;
      host.active.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      getContentWrapper(fixture).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.active()).toBe(false);
    });

    it('aria-expanded transitions from false to true on activation', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveInplaceHost> =
        await setup(InteractiveInplaceHost);
      const host: InteractiveInplaceHost = fixture.componentInstance;
      expect(getDisplayButton(fixture).getAttribute('aria-expanded')).toBe('false');
      host.active.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getDisplayButton(fixture).getAttribute('aria-expanded')).toBe('true');
    });

    it('aria-expanded transitions from true to false on deactivation', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveInplaceHost> =
        await setup(InteractiveInplaceHost);
      const host: InteractiveInplaceHost = fixture.componentInstance;
      host.active.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getDisplayButton(fixture).getAttribute('aria-expanded')).toBe('true');
      getContentWrapper(fixture).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getDisplayButton(fixture).getAttribute('aria-expanded')).toBe('false');
    });
  });
});
