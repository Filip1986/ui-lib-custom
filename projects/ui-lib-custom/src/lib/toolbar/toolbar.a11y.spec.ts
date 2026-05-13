import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Toolbar } from './toolbar';

// ── Host components ─────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="Main toolbar">
      <div uiToolbarStart>
        <button type="button">Bold</button>
        <button type="button">Italic</button>
        <button type="button">Underline</button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultToolbarHost {}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar>
      <div uiToolbarStart>
        <button type="button">Cut</button>
        <button type="button">Copy</button>
      </div>
      <div uiToolbarEnd>
        <button type="button">Undo</button>
        <button type="button">Redo</button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NoLabelToolbarHost {}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="Icon toolbar">
      <div uiToolbarStart>
        <button type="button" aria-label="Save document">
          <span aria-hidden="true" class="pi pi-save"></span>
        </button>
        <button type="button" aria-label="Print document">
          <span aria-hidden="true" class="pi pi-print"></span>
        </button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class IconOnlyToolbarHost {}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="First toolbar">
      <div uiToolbarStart>
        <button type="button">A</button>
      </div>
    </ui-lib-toolbar>
    <ui-lib-toolbar ariaLabel="Second toolbar">
      <div uiToolbarStart>
        <button type="button">B</button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoToolbarsHost {}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="Navigation toolbar">
      <div uiToolbarStart>
        <button type="button">One</button>
        <button type="button">Two</button>
        <button type="button">Three</button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class KeyboardToolbarHost {}

// ── Helpers ──────────────────────────────────────────────────────────────────

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

function getToolbar(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-toolbar') as HTMLElement;
}

function getToolbars(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-toolbar')
  );
}

function getButtons(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('button'));
}

function dispatchKey(target: HTMLElement, key: string): void {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Toolbar Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  // ── axe-core ─────────────────────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('default toolbar with aria-label has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultToolbarHost> = await setup(DefaultToolbarHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('toolbar without aria-label has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<NoLabelToolbarHost> = await setup(NoLabelToolbarHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('icon-only toolbar with aria-labels has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<IconOnlyToolbarHost> = await setup(IconOnlyToolbarHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── ARIA structure ────────────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('host has role="toolbar"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultToolbarHost> = await setup(DefaultToolbarHost);
      expect(getToolbar(fixture).getAttribute('role')).toBe('toolbar');
    });

    it('applies aria-label when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultToolbarHost> = await setup(DefaultToolbarHost);
      expect(getToolbar(fixture).getAttribute('aria-label')).toBe('Main toolbar');
    });

    it('does not apply aria-label when not provided', async (): Promise<void> => {
      const fixture: ComponentFixture<NoLabelToolbarHost> = await setup(NoLabelToolbarHost);
      expect(getToolbar(fixture).getAttribute('aria-label')).toBeNull();
    });

    it('decorative icons inside buttons have aria-hidden="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<IconOnlyToolbarHost> = await setup(IconOnlyToolbarHost);
      const icons: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.pi')
      );
      expect(icons.length).toBeGreaterThan(0);
      icons.forEach((icon: HTMLElement): void => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('icon-only buttons have descriptive aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<IconOnlyToolbarHost> = await setup(IconOnlyToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons.forEach((button: HTMLElement): void => {
        expect(button.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  // ── Unique IDs ────────────────────────────────────────────────────────────

  describe('unique instance IDs', (): void => {
    it('assigns a unique generated id to the host', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultToolbarHost> = await setup(DefaultToolbarHost);
      expect(getToolbar(fixture).getAttribute('id')).toMatch(/^ui-lib-toolbar-\d+$/);
    });

    it('two toolbar instances get different ids', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoToolbarsHost> = await setup(TwoToolbarsHost);
      const toolbars: HTMLElement[] = getToolbars(fixture);
      expect(toolbars.length).toBe(2);
      const id0: string | null = toolbars[0]?.getAttribute('id') ?? null;
      const id1: string | null = toolbars[1]?.getAttribute('id') ?? null;
      expect(id0).toBeTruthy();
      expect(id1).toBeTruthy();
      expect(id0).not.toBe(id1);
    });
  });

  // ── Roving tabindex ───────────────────────────────────────────────────────

  describe('roving tabindex', (): void => {
    it('first button has tabindex="0" after render', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultToolbarHost> = await setup(DefaultToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      expect(buttons[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('subsequent buttons have tabindex="-1" after render', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultToolbarHost> = await setup(DefaultToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      expect(buttons[1]?.getAttribute('tabindex')).toBe('-1');
      expect(buttons[2]?.getAttribute('tabindex')).toBe('-1');
    });

    it('focusin on a non-active button updates the roving tabindex', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultToolbarHost> = await setup(DefaultToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[1]?.focus();
      fixture.detectChanges();
      expect(buttons[0]?.getAttribute('tabindex')).toBe('-1');
      expect(buttons[1]?.getAttribute('tabindex')).toBe('0');
      expect(buttons[2]?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    it('ArrowRight moves focus to the next button', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[0]?.focus();
      dispatchKey(buttons[0] as HTMLElement, 'ArrowRight');
      expect(document.activeElement).toBe(buttons[1]);
    });

    it('ArrowLeft moves focus to the previous button', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[1]?.focus();
      dispatchKey(buttons[1] as HTMLElement, 'ArrowLeft');
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('ArrowRight wraps from last to first button', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[2]?.focus();
      dispatchKey(buttons[2] as HTMLElement, 'ArrowRight');
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('ArrowLeft wraps from first to last button', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[0]?.focus();
      dispatchKey(buttons[0] as HTMLElement, 'ArrowLeft');
      expect(document.activeElement).toBe(buttons[2]);
    });

    it('Home moves focus to the first button', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[2]?.focus();
      dispatchKey(buttons[2] as HTMLElement, 'Home');
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('End moves focus to the last button', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[0]?.focus();
      dispatchKey(buttons[0] as HTMLElement, 'End');
      expect(document.activeElement).toBe(buttons[2]);
    });

    it('ArrowDown moves focus to the next button (vertical axis alias)', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[0]?.focus();
      dispatchKey(buttons[0] as HTMLElement, 'ArrowDown');
      expect(document.activeElement).toBe(buttons[1]);
    });

    it('ArrowUp moves focus to the previous button (vertical axis alias)', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[1]?.focus();
      dispatchKey(buttons[1] as HTMLElement, 'ArrowUp');
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('keyboard navigation updates tabindex on active item', async (): Promise<void> => {
      const fixture: ComponentFixture<KeyboardToolbarHost> = await setup(KeyboardToolbarHost);
      const buttons: HTMLElement[] = getButtons(fixture);
      buttons[0]?.focus();
      dispatchKey(buttons[0] as HTMLElement, 'ArrowRight');
      expect(buttons[0]?.getAttribute('tabindex')).toBe('-1');
      expect(buttons[1]?.getAttribute('tabindex')).toBe('0');
    });
  });
});
