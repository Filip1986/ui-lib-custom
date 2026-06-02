import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import type { MenubarCommandEvent, MenubarItem } from './menubar.types';
import { MenubarSubComponent } from './menubar-submenu';

/**
 * MenubarSubComponent is the recursive dropdown panel. It owns the submenu
 * keyboard contract (Enter/Space, ArrowRight to open nested, ArrowLeft/Escape
 * to close or bubble, ArrowUp/Down roving focus) and emits itemActivated /
 * escapePanel up to the host Menubar.
 */

@Component({
  selector: 'ui-lib-menubar-sub-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenubarSubComponent],
  template: `
    <ui-lib-menubar-sub
      [items]="items()"
      (itemActivated)="lastActivated = $event"
      (escapePanel)="escapeCount = escapeCount + 1"
    />
  `,
})
class HostComponent {
  public readonly items: WritableSignal<MenubarItem[]> = signal<MenubarItem[]>([]);
  public lastActivated: MenubarCommandEvent | null = null;
  public escapeCount: number = 0;
}

function setup(items: MenubarItem[]): {
  fixture: ComponentFixture<HostComponent>;
  host: HostComponent;
  sub: MenubarSubComponent;
} {
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.componentInstance.items.set(items);
  fixture.detectChanges();
  const sub: MenubarSubComponent = fixture.debugElement.query(By.directive(MenubarSubComponent))
    .componentInstance as MenubarSubComponent;
  return { fixture, host: fixture.componentInstance, sub };
}

const leaf: (label: string, extra?: Partial<MenubarItem>) => MenubarItem = (
  label: string,
  extra: Partial<MenubarItem> = {},
): MenubarItem => ({ label, ...extra });
const parent: (
  label: string,
  children: MenubarItem[],
  extra?: Partial<MenubarItem>,
) => MenubarItem = (
  label: string,
  children: MenubarItem[],
  extra: Partial<MenubarItem> = {},
): MenubarItem => ({ label, items: children, ...extra });

function keydown(key: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key });
}

/** Indexed access under noUncheckedIndexedAccess yields `T | undefined`; assert presence in tests. */
function at<T>(arr: readonly T[], index: number): T {
  const value: T | undefined = arr[index];
  if (value === undefined) {
    throw new Error(`Expected an element at index ${index}`);
  }
  return value;
}

describe('MenubarSubComponent', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('filters items with visible === false', (): void => {
    const { sub } = setup([leaf('A'), leaf('B', { visible: false }), leaf('C')]);
    expect(sub.visibleItems().map((item: MenubarItem): string | undefined => item.label)).toEqual([
      'A',
      'C',
    ]);
  });

  describe('getSubItemClasses', (): void => {
    it('combines disabled, active, has-submenu and custom styleClass', (): void => {
      const { sub } = setup([parent('P', [leaf('c')], { disabled: true, styleClass: 'custom' })]);
      sub.activeIndex.set(0);
      const classes: string = sub.getSubItemClasses(at(sub.visibleItems(), 0), 0);
      expect(classes).toContain('ui-lib-menubar__sub-item--disabled');
      expect(classes).toContain('ui-lib-menubar__sub-item--active');
      expect(classes).toContain('ui-lib-menubar__sub-item--has-submenu');
      expect(classes).toContain('custom');
    });

    it('returns only the base class for a plain enabled leaf', (): void => {
      const { sub } = setup([leaf('A')]);
      expect(sub.getSubItemClasses(at(sub.visibleItems(), 0), 0)).toBe('ui-lib-menubar__sub-item');
    });
  });

  describe('onItemMouseEnter', (): void => {
    it('opens the nested panel for a parent item', (): void => {
      const { sub } = setup([parent('P', [leaf('c')])]);
      sub.onItemMouseEnter(0, at(sub.visibleItems(), 0));
      expect(sub.activeIndex()).toBe(0);
    });

    it('closes any open panel when hovering a leaf', (): void => {
      const { sub } = setup([parent('P', [leaf('c')]), leaf('B')]);
      sub.activeIndex.set(0);
      sub.onItemMouseEnter(1, at(sub.visibleItems(), 1));
      expect(sub.activeIndex()).toBe(-1);
    });

    it('closes the panel for a disabled or separator item', (): void => {
      const { sub } = setup([leaf('A', { disabled: true })]);
      sub.activeIndex.set(0);
      sub.onItemMouseEnter(0, at(sub.visibleItems(), 0));
      expect(sub.activeIndex()).toBe(-1);
    });
  });

  describe('onItemClick', (): void => {
    it('ignores disabled items', (): void => {
      const { host, sub } = setup([leaf('A', { disabled: true })]);
      const event: MouseEvent = new MouseEvent('click');
      const preventSpy: jest.SpyInstance = jest.spyOn(event, 'preventDefault');
      sub.onItemClick(event, at(sub.visibleItems(), 0), 0);
      expect(preventSpy).toHaveBeenCalled();
      expect(host.lastActivated).toBeNull();
    });

    it('toggles a parent item open and closed', (): void => {
      const { sub } = setup([parent('P', [leaf('c')])]);
      const item: MenubarItem = at(sub.visibleItems(), 0);
      sub.onItemClick(new MouseEvent('click'), item, 0);
      expect(sub.activeIndex()).toBe(0);
      sub.onItemClick(new MouseEvent('click'), item, 0);
      expect(sub.activeIndex()).toBe(-1);
    });

    it('activates a leaf and runs its command, preventing default when it has no url', (): void => {
      const command: jest.Mock = jest.fn();
      const { host, sub } = setup([leaf('A', { command })]);
      const event: MouseEvent = new MouseEvent('click');
      const preventSpy: jest.SpyInstance = jest.spyOn(event, 'preventDefault');

      sub.onItemClick(event, at(sub.visibleItems(), 0), 0);

      expect(preventSpy).toHaveBeenCalled();
      expect(host.lastActivated?.item.label).toBe('A');
      expect(command).toHaveBeenCalledWith(expect.objectContaining({ originalEvent: event }));
    });

    it('does not prevent default for a leaf that has a url', (): void => {
      const { host, sub } = setup([leaf('A', { url: '/somewhere' })]);
      const event: MouseEvent = new MouseEvent('click');
      const preventSpy: jest.SpyInstance = jest.spyOn(event, 'preventDefault');

      sub.onItemClick(event, at(sub.visibleItems(), 0), 0);

      expect(preventSpy).not.toHaveBeenCalled();
      expect(host.lastActivated?.item.label).toBe('A');
    });
  });

  describe('onItemKeyDown — activation', (): void => {
    it('Enter toggles a parent item', (): void => {
      const { sub } = setup([parent('P', [leaf('c')])]);
      sub.onItemKeyDown(keydown('Enter'), at(sub.visibleItems(), 0), 0);
      expect(sub.activeIndex()).toBe(0);
    });

    it('Space activates a leaf and runs its command', (): void => {
      const command: jest.Mock = jest.fn();
      const { host, sub } = setup([leaf('A', { command })]);
      sub.onItemKeyDown(keydown(' '), at(sub.visibleItems(), 0), 0);
      expect(host.lastActivated?.item.label).toBe('A');
      expect(command).toHaveBeenCalled();
    });

    it('Enter on a disabled item is a no-op', (): void => {
      const { host, sub } = setup([leaf('A', { disabled: true })]);
      sub.onItemKeyDown(keydown('Enter'), at(sub.visibleItems(), 0), 0);
      expect(host.lastActivated).toBeNull();
    });
  });

  describe('onItemKeyDown — navigation', (): void => {
    it('ArrowRight opens the nested panel for a parent item', (): void => {
      const { sub } = setup([parent('P', [leaf('c')])]);
      sub.onItemKeyDown(keydown('ArrowRight'), at(sub.visibleItems(), 0), 0);
      expect(sub.activeIndex()).toBe(0);
    });

    it('ArrowRight on a leaf does nothing', (): void => {
      const { sub } = setup([leaf('A')]);
      sub.onItemKeyDown(keydown('ArrowRight'), at(sub.visibleItems(), 0), 0);
      expect(sub.activeIndex()).toBe(-1);
    });

    it('Escape closes an open nested panel without bubbling', (): void => {
      const { host, sub } = setup([parent('P', [leaf('c')])]);
      sub.activeIndex.set(0);
      sub.onItemKeyDown(keydown('Escape'), at(sub.visibleItems(), 0), 0);
      expect(sub.activeIndex()).toBe(-1);
      expect(host.escapeCount).toBe(0);
    });

    it('ArrowLeft at the root level emits escapePanel to the parent', (): void => {
      const { host, sub } = setup([leaf('A')]);
      sub.onItemKeyDown(keydown('ArrowLeft'), at(sub.visibleItems(), 0), 0);
      expect(host.escapeCount).toBe(1);
    });
  });

  describe('roving focus (ArrowDown / ArrowUp)', (): void => {
    function links(fixture: ComponentFixture<HostComponent>): HTMLElement[] {
      return Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          'ul[role="menu"] > li > a.ui-lib-menubar__sub-link',
        ),
      );
    }

    it('ArrowDown moves focus to the next link', (): void => {
      const { fixture } = setup([leaf('A'), leaf('B'), leaf('C')]);
      const items: HTMLElement[] = links(fixture);
      at(items, 0).focus();
      at(items, 0).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      expect(document.activeElement).toBe(at(items, 1));
    });

    it('ArrowUp from the first link wraps to the last', (): void => {
      const { fixture } = setup([leaf('A'), leaf('B'), leaf('C')]);
      const items: HTMLElement[] = links(fixture);
      at(items, 0).focus();
      at(items, 0).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      expect(document.activeElement).toBe(at(items, items.length - 1));
    });

    it('does not move focus when the target is outside a role=menu list', (): void => {
      const { sub } = setup([leaf('A')]);
      const orphan: HTMLElement = document.createElement('a');
      orphan.tabIndex = 0; // an <a> without href is not focusable otherwise
      document.body.appendChild(orphan);
      try {
        orphan.focus();
        const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        Object.defineProperty(event, 'currentTarget', { value: orphan });
        expect((): void => sub.onItemKeyDown(event, at(sub.visibleItems(), 0), 0)).not.toThrow();
        expect(document.activeElement).toBe(orphan);
      } finally {
        orphan.remove();
      }
    });
  });
});
