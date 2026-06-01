import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanelMenuSubComponent } from './panel-menu-sub';
import { PANEL_MENU_CONTEXT } from './panel-menu-context';
import type { PanelMenuContext } from './panel-menu-context';
import type { PanelMenuItem } from './panel-menu.types';

/**
 * The recursive PanelMenuSubComponent owns the in-panel keyboard contract
 * (Enter/Space activate, ArrowUp/Down roving focus, Escape to parent header).
 * It is provided its host context via the PANEL_MENU_CONTEXT token, mocked here.
 */

function createMockContext(): jest.Mocked<PanelMenuContext> {
  return {
    isItemExpanded: jest.fn<boolean, [string]>().mockReturnValue(false),
    toggleItem: jest.fn(),
    onItemActivate: jest.fn(),
  };
}

let context: jest.Mocked<PanelMenuContext>;

@Component({
  selector: 'ui-lib-panel-menu-sub-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelMenuSubComponent],
  // The panel region wrapper + labelled header are required by Escape handling
  // (focusParentPanelHeader walks up to .ui-lib-panel-menu__content[role="region"]).
  template: `
    <div class="ui-lib-panel-menu__content" role="region" aria-labelledby="panel-header">
      <button id="panel-header" type="button">Section</button>
      <ui-lib-panel-menu-sub [items]="items()" [parentKey]="parentKey()" [depth]="2" />
    </div>
  `,
})
class HostComponent {
  public readonly items: WritableSignal<PanelMenuItem[]> = signal<PanelMenuItem[]>([]);
  public readonly parentKey: WritableSignal<string> = signal<string>('0');
}

function setup(
  items: PanelMenuItem[],
  parentKey: string = '0',
): {
  fixture: ComponentFixture<HostComponent>;
  sub: PanelMenuSubComponent;
} {
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.componentInstance.parentKey.set(parentKey);
  fixture.componentInstance.items.set(items);
  fixture.detectChanges();
  const sub: PanelMenuSubComponent = fixture.debugElement.query(By.directive(PanelMenuSubComponent))
    .componentInstance as PanelMenuSubComponent;
  return { fixture, sub };
}

const leaf: (label: string, extra?: Partial<PanelMenuItem>) => PanelMenuItem = (
  label: string,
  extra: Partial<PanelMenuItem> = {},
): PanelMenuItem => ({
  label,
  ...extra,
});
const group: (
  label: string,
  children: PanelMenuItem[],
  extra?: Partial<PanelMenuItem>,
) => PanelMenuItem = (
  label: string,
  children: PanelMenuItem[],
  extra: Partial<PanelMenuItem> = {},
): PanelMenuItem => ({
  label,
  items: children,
  ...extra,
});

describe('PanelMenuSubComponent', (): void => {
  beforeEach((): void => {
    context = createMockContext();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: PANEL_MENU_CONTEXT, useValue: context },
      ],
    });
  });

  describe('item keys and visibility', (): void => {
    it('filters out items with visible === false', (): void => {
      const { sub } = setup([leaf('A'), leaf('B', { visible: false }), leaf('C')]);
      expect(
        sub.visibleItems().map((item: PanelMenuItem): string | undefined => item.label),
      ).toEqual(['A', 'C']);
    });

    it('builds a key from the index alone when parentKey is empty', (): void => {
      const { sub } = setup([leaf('A')], '');
      expect(sub.getItemKey(2)).toBe('2');
    });

    it('prefixes the key with parentKey when present', (): void => {
      const { sub } = setup([leaf('A')], '0-1');
      expect(sub.getItemKey(3)).toBe('0-1-3');
    });

    it('delegates expansion state to the host context using the composed key', (): void => {
      const { sub } = setup([group('G', [leaf('child')])], '0');
      context.isItemExpanded.mockReturnValue(true);
      expect(sub.isItemExpanded(0)).toBe(true);
      expect(context.isItemExpanded).toHaveBeenCalledWith('0-0');
    });
  });

  describe('onToggle', (): void => {
    it('toggles an enabled group through the context', (): void => {
      const { sub } = setup([group('G', [leaf('c')])]);
      const item: PanelMenuItem = sub.visibleItems()[0];
      const event: MouseEvent = new MouseEvent('click');
      const preventSpy: jest.SpyInstance = jest.spyOn(event, 'preventDefault');

      sub.onToggle(event, item, 0);

      expect(preventSpy).toHaveBeenCalled();
      expect(context.toggleItem).toHaveBeenCalledWith('0-0', item);
    });

    it('does not toggle a disabled group', (): void => {
      const { sub } = setup([group('G', [leaf('c')], { disabled: true })]);
      const item: PanelMenuItem = sub.visibleItems()[0];
      const event: MouseEvent = new MouseEvent('click');
      const preventSpy: jest.SpyInstance = jest.spyOn(event, 'preventDefault');

      sub.onToggle(event, item, 0);

      expect(preventSpy).toHaveBeenCalled();
      expect(context.toggleItem).not.toHaveBeenCalled();
    });
  });

  describe('onActivate', (): void => {
    it('activates an enabled leaf through the context', (): void => {
      const { sub } = setup([leaf('A')]);
      const item: PanelMenuItem = sub.visibleItems()[0];
      const event: MouseEvent = new MouseEvent('click');

      sub.onActivate(event, item);

      expect(context.onItemActivate).toHaveBeenCalledWith(item, event);
    });

    it('does not activate a disabled leaf', (): void => {
      const { sub } = setup([leaf('A', { disabled: true })]);
      const item: PanelMenuItem = sub.visibleItems()[0];
      const event: MouseEvent = new MouseEvent('click');
      const preventSpy: jest.SpyInstance = jest.spyOn(event, 'preventDefault');

      sub.onActivate(event, item);

      expect(preventSpy).toHaveBeenCalled();
      expect(context.onItemActivate).not.toHaveBeenCalled();
    });
  });

  describe('keyboard activation (Enter / Space)', (): void => {
    function keydown(key: string): KeyboardEvent {
      return new KeyboardEvent('keydown', { key });
    }

    it('Enter on a group toggles it', (): void => {
      const { sub } = setup([group('G', [leaf('c')])]);
      const item: PanelMenuItem = sub.visibleItems()[0];

      sub.onItemKeyDown(keydown('Enter'), item, 0, true);

      expect(context.toggleItem).toHaveBeenCalledWith('0-0', item);
      expect(context.onItemActivate).not.toHaveBeenCalled();
    });

    it('Space on a leaf activates it', (): void => {
      const { sub } = setup([leaf('A')]);
      const item: PanelMenuItem = sub.visibleItems()[0];

      sub.onItemKeyDown(keydown(' '), item, 0, false);

      expect(context.onItemActivate).toHaveBeenCalledWith(item, expect.any(KeyboardEvent));
      expect(context.toggleItem).not.toHaveBeenCalled();
    });

    it('Enter on a disabled item does nothing but prevents default', (): void => {
      const { sub } = setup([leaf('A', { disabled: true })]);
      const item: PanelMenuItem = sub.visibleItems()[0];
      const event: KeyboardEvent = keydown('Enter');
      const preventSpy: jest.SpyInstance = jest.spyOn(event, 'preventDefault');

      sub.onItemKeyDown(event, item, 0, false);

      expect(preventSpy).toHaveBeenCalled();
      expect(context.onItemActivate).not.toHaveBeenCalled();
      expect(context.toggleItem).not.toHaveBeenCalled();
    });
  });

  describe('roving focus (ArrowDown / ArrowUp / Escape)', (): void => {
    function headers(fixture: ComponentFixture<HostComponent>): HTMLElement[] {
      return Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-panel-menu__sub-list > li > .ui-lib-panel-menu__sub-header,' +
            ' .ui-lib-panel-menu__sub-list > li > .ui-lib-panel-menu__sub-link',
        ),
      );
    }

    it('ArrowDown moves focus to the next interactive item', (): void => {
      const { fixture } = setup([leaf('A'), leaf('B'), leaf('C')]);
      const links: HTMLElement[] = headers(fixture);
      links[0].focus();

      links[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

      expect(document.activeElement).toBe(links[1]);
    });

    it('ArrowUp from the first item wraps to the last', (): void => {
      const { fixture } = setup([leaf('A'), leaf('B'), leaf('C')]);
      const links: HTMLElement[] = headers(fixture);
      links[0].focus();

      links[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));

      expect(document.activeElement).toBe(links[links.length - 1]);
    });

    it('Escape returns focus to the labelled parent panel header', (): void => {
      const { fixture } = setup([leaf('A'), leaf('B')]);
      const links: HTMLElement[] = headers(fixture);
      links[0].focus();

      links[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

      expect(document.activeElement?.id).toBe('panel-header');
    });

    it('does not move focus when the focused element is not inside a sub-list', (): void => {
      const { sub } = setup([leaf('A')]);
      const orphan: HTMLElement = document.createElement('button');
      document.body.appendChild(orphan);
      orphan.focus();

      // currentTarget has no closest sub-list — moveFocus must bail without throwing.
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      Object.defineProperty(event, 'currentTarget', { value: orphan });
      expect((): void => sub.onItemKeyDown(event, sub.visibleItems()[0], 0, false)).not.toThrow();
      expect(document.activeElement).toBe(orphan);

      orphan.remove();
    });
  });
});
