import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Menu, MENU_DEFAULT_ARIA_LABEL } from './menu';
import type { MenuItem, MenuItemCommandEvent, MenuSize, MenuVariant } from './menu.types';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-menu') as HTMLElement;
}

function getInstance(fixture: ComponentFixture<unknown>): Menu {
  return fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof Menu
  ).componentInstance as Menu;
}

function getPanel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-menu__panel');
}

function getMenuLinks(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-menu__link')
  );
}

function makeFakeClickEvent(): MouseEvent {
  return new MouseEvent('click', { bubbles: true, clientX: 100, clientY: 200 });
}

// ── Host component ─────────────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Menu],
  template: `
    <ui-lib-menu
      [model]="model()"
      [popup]="popup()"
      [variant]="variant()"
      [size]="size()"
      [styleClass]="styleClass()"
      [ariaLabel]="ariaLabel()"
      (itemClick)="handleItemClick($event)"
      (menuShow)="handleShow()"
      (menuHide)="handleHide()"
    />
  `,
})
class HostComponent {
  public readonly model: WritableSignal<MenuItem[]> = signal<MenuItem[]>([
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ]);
  public readonly popup: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<MenuVariant> = signal<MenuVariant>('material');
  public readonly size: WritableSignal<MenuSize> = signal<MenuSize>('md');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(MENU_DEFAULT_ARIA_LABEL);

  public lastClickedItem: MenuItem | null = null;
  public showCount: number = 0;
  public hideCount: number = 0;

  public handleItemClick(event: MenuItemCommandEvent): void {
    this.lastClickedItem = event.item;
  }
  public handleShow(): void {
    this.showCount++;
  }
  public handleHide(): void {
    this.hideCount++;
  }
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('Menu', (): void => {
  function createFixture(modelOverride?: MenuItem[]): ComponentFixture<HostComponent> {
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    if (modelOverride) {
      fixture.componentInstance.model.set(modelOverride);
    }
    fixture.detectChanges();
    return fixture;
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  // ── Creation ───────────────────────────────────────────────────────────────

  describe('creation', (): void => {
    it('should create', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      expect(getInstance(fixture)).toBeTruthy();
    });

    it('should render the panel in static mode', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      expect(getPanel(fixture)).not.toBeNull();
    });

    it('should not render the panel in popup mode when hidden', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      expect(getPanel(fixture)).toBeNull();
    });
  });

  // ── Host classes ───────────────────────────────────────────────────────────

  describe('host classes', (): void => {
    it('should apply ui-lib-menu base class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      expect(getHost(fixture).classList).toContain('ui-lib-menu');
    });

    it('should apply variant class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      expect(getHost(fixture).classList).toContain('ui-lib-menu--variant-material');
    });

    it('should apply size class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      expect(getHost(fixture).classList).toContain('ui-lib-menu--size-md');
    });

    it('should apply popup class when popup is true', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-menu--popup');
    });

    it('should apply custom styleClass', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.styleClass.set('my-custom-class');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('my-custom-class');
    });

    it('should switch variant class reactively', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-menu--variant-bootstrap');
      expect(getHost(fixture).classList).not.toContain('ui-lib-menu--variant-material');
    });

    it('should switch size class reactively', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-menu--size-lg');
      expect(getHost(fixture).classList).not.toContain('ui-lib-menu--size-md');
    });
  });

  // ── Panel rendering ────────────────────────────────────────────────────────

  describe('panel rendering', (): void => {
    it('should apply role="menu" to panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const panel: HTMLElement | null = getPanel(fixture);
      expect(panel?.getAttribute('role')).toBe('menu');
    });

    it('should apply aria-label to panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const panel: HTMLElement | null = getPanel(fixture);
      expect(panel?.getAttribute('aria-label')).toBe(MENU_DEFAULT_ARIA_LABEL);
    });

    it('should update aria-label reactively', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.ariaLabel.set('Options');
      fixture.detectChanges();
      expect(getPanel(fixture)?.getAttribute('aria-label')).toBe('Options');
    });

    it('should render menu links for leaf items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getMenuLinks(fixture);
      // Profile, Settings, Logout (separator is not a link)
      expect(links.length).toBe(3);
    });

    it('should render item labels', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const labels: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-menu__item-label');
      const labelTexts: string[] = Array.from(labels).map((element: HTMLElement): string =>
        (element.textContent as string).trim()
      );
      expect(labelTexts).toContain('Profile');
      expect(labelTexts).toContain('Settings');
      expect(labelTexts).toContain('Logout');
    });

    it('should render a separator element', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const separators: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-menu__separator');
      expect(separators.length).toBe(1);
    });

    it('should apply role="separator" to separator elements', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const separator: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-menu__separator'
      );
      expect(separator?.getAttribute('role')).toBe('separator');
    });

    it('should hide items with visible=false', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'Visible' },
        { label: 'Hidden', visible: false },
      ]);
      const links: HTMLElement[] = getMenuLinks(fixture);
      expect(links.length).toBe(1);
    });

    it('should render icon spans for items with icon', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const icons: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-menu__item-icon');
      expect(icons.length).toBe(3);
    });
  });

  // ── Group rendering ────────────────────────────────────────────────────────

  describe('group rendering', (): void => {
    const groupedModel: MenuItem[] = [
      { label: 'Account', items: [{ label: 'Profile' }, { label: 'Security' }] },
      { label: 'System', items: [{ label: 'Settings' }, { label: 'Logs' }] },
    ];

    it('should render group label elements', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture(groupedModel);
      const groupLabels: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-menu__group-label');
      expect(groupLabels.length).toBe(2);
      expect(((groupLabels[0] as HTMLElement).textContent as string).trim()).toBe('Account');
      expect(((groupLabels[1] as HTMLElement).textContent as string).trim()).toBe('System');
    });

    it('should render group-list elements', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture(groupedModel);
      const groupLists: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-menu__group-list');
      expect(groupLists.length).toBe(2);
    });

    it('should render all group child items as links', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture(groupedModel);
      const links: HTMLElement[] = getMenuLinks(fixture);
      expect(links.length).toBe(4);
    });

    it('should apply aria-label to group-list', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture(groupedModel);
      const firstGroupList: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__group-list');
      expect(firstGroupList?.getAttribute('aria-label')).toBe('Account');
    });
  });

  // ── Disabled items ─────────────────────────────────────────────────────────

  describe('disabled items', (): void => {
    it('should apply disabled class to disabled items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'Enabled' },
        { label: 'Disabled', disabled: true },
      ]);
      const disabledItems: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-menu__item--disabled');
      expect(disabledItems.length).toBe(1);
    });

    it('should set aria-disabled on disabled item links', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'Enabled' },
        { label: 'Disabled', disabled: true },
      ]);
      const allLinks: HTMLElement[] = getMenuLinks(fixture);
      const disabledLink: HTMLElement | undefined = allLinks.find(
        (link: HTMLElement): boolean => link.getAttribute('aria-disabled') === 'true'
      );
      expect(disabledLink).toBeDefined();
    });

    it('should set tabindex=-1 on disabled item links', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'Disabled', disabled: true },
      ]);
      const link: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__link');
      expect(link?.getAttribute('tabindex')).toBe('-1');
    });

    it('should not emit itemClick for disabled items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'Disabled', disabled: true },
      ]);
      const link: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__link');
      link?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.lastClickedItem).toBeNull();
    });
  });

  // ── Outputs ────────────────────────────────────────────────────────────────

  describe('outputs', (): void => {
    it('should emit itemClick when a leaf item is clicked', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getMenuLinks(fixture);
      links[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.lastClickedItem?.label).toBe('Profile');
    });

    it('should invoke item command callback on activation', (): void => {
      let commandCalled: boolean = false;
      const fixture: ComponentFixture<HostComponent> = createFixture([
        {
          label: 'Action',
          command: (): void => {
            commandCalled = true;
          },
        },
      ]);
      const link: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__link');
      link?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      expect(commandCalled).toBe(true);
    });
  });

  // ── Popup mode ─────────────────────────────────────────────────────────────

  describe('popup mode', (): void => {
    it('should show panel after calling show()', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      getInstance(fixture).show(makeFakeClickEvent());
      fixture.detectChanges();
      expect(getPanel(fixture)).not.toBeNull();
    });

    it('should hide panel after calling hide()', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const instance: Menu = getInstance(fixture);
      instance.show(makeFakeClickEvent());
      fixture.detectChanges();
      instance.hide();
      fixture.detectChanges();
      expect(getPanel(fixture)).toBeNull();
    });

    it('should toggle panel via toggle()', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const instance: Menu = getInstance(fixture);
      instance.toggle(makeFakeClickEvent());
      fixture.detectChanges();
      expect(instance.isVisible()).toBe(true);
      instance.toggle(makeFakeClickEvent());
      fixture.detectChanges();
      expect(instance.isVisible()).toBe(false);
    });

    it('should emit menuShow when panel opens', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      getInstance(fixture).show(makeFakeClickEvent());
      fixture.detectChanges();
      expect(fixture.componentInstance.showCount).toBe(1);
    });

    it('should emit menuHide when panel closes', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const instance: Menu = getInstance(fixture);
      instance.show(makeFakeClickEvent());
      fixture.detectChanges();
      instance.hide();
      fixture.detectChanges();
      expect(fixture.componentInstance.hideCount).toBe(1);
    });

    it('should be a no-op when show() is called in static mode', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      getInstance(fixture).show(makeFakeClickEvent());
      fixture.detectChanges();
      expect(getInstance(fixture).isVisible()).toBe(false);
    });

    it('should be a no-op when hide() is called in static mode', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      expect((): void => {
        getInstance(fixture).hide();
      }).not.toThrow();
    });
  });

  // ── URL items ──────────────────────────────────────────────────────────────

  describe('url items', (): void => {
    it('should render an anchor with href for url items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'External', url: 'https://example.com' },
      ]);
      const link: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__link');
      expect(link?.getAttribute('href')).toBe('https://example.com');
    });

    it('should apply target attribute for url items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'External', url: 'https://example.com', target: '_blank' },
      ]);
      const link: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__link');
      expect(link?.getAttribute('target')).toBe('_blank');
    });
  });

  // ── Computed helpers ───────────────────────────────────────────────────────

  describe('flatFocusableItems()', (): void => {
    it('should include top-level non-disabled, non-separator leaf items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      expect(getInstance(fixture).flatFocusableItems().length).toBe(3);
    });

    it('should exclude disabled items from flat list', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'A' },
        { label: 'B', disabled: true },
        { label: 'C' },
      ]);
      expect(getInstance(fixture).flatFocusableItems().length).toBe(2);
    });

    it('should include group children in flat list', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'Group', items: [{ label: 'Child A' }, { label: 'Child B' }] },
      ]);
      expect(getInstance(fixture).flatFocusableItems().length).toBe(2);
    });
  });

  // ── Keyboard navigation ────────────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    it('should activate item on Enter key', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getMenuLinks(fixture);
      links[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.lastClickedItem?.label).toBe('Profile');
    });

    it('should activate item on Space key', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getMenuLinks(fixture);
      links[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.lastClickedItem?.label).toBe('Profile');
    });

    it('should close popup on Escape key', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const instance: Menu = getInstance(fixture);
      instance.show(makeFakeClickEvent());
      fixture.detectChanges();
      const links: HTMLElement[] = getMenuLinks(fixture);
      links[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(instance.isVisible()).toBe(false);
    });
  });

  // ── Accessibility ──────────────────────────────────────────────────────────

  describe('accessibility', (): void => {
    it('should apply role="menuitem" to each link', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getMenuLinks(fixture);
      for (const link of links) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });

    it('should apply tabindex=0 to enabled items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([{ label: 'Enabled' }]);
      const link: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__link');
      expect(link?.getAttribute('tabindex')).toBe('0');
    });

    it('should apply aria-hidden to separator elements', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const separator: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__separator');
      expect(separator?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should apply aria-hidden to group label elements', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture([
        { label: 'Group', items: [{ label: 'Child' }] },
      ]);
      const groupLabel: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-menu__group-label');
      expect(groupLabel?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
