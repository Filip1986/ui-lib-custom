import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { PANEL_MENU_DEFAULT_ARIA_LABEL, PanelMenu } from './panel-menu';
import type { PanelMenuItem } from './panel-menu.types';

const SKIP_PANEL_MENU_STRUCTURE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

function dispatchKey(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

const baseModel: PanelMenuItem[] = [
  {
    id: 'account',
    label: 'Account',
    items: [
      { id: 'profile', label: 'Profile' },
      { id: 'security', label: 'Security', disabled: true },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    disabled: true,
    items: [{ id: 'users', label: 'Users' }],
  },
  { id: 'separator-1', separator: true },
  {
    id: 'help',
    label: 'Help',
    items: [
      { id: 'docs', label: 'Documentation' },
      { id: 'support', label: 'Support' },
    ],
  },
];

@Component({
  standalone: true,
  imports: [PanelMenu],
  template: `
    <ui-lib-panel-menu [model]="model()" [multiple]="multiple()" [ariaLabel]="ariaLabel()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PanelMenuA11yHostComponent {
  public readonly model: WritableSignal<PanelMenuItem[]> = signal<PanelMenuItem[]>(baseModel);
  public readonly multiple: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Main navigation');
}

@Component({
  standalone: true,
  imports: [PanelMenu],
  template: ` <ui-lib-panel-menu [model]="model()" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PanelMenuDefaultLabelHostComponent {
  public readonly model: WritableSignal<PanelMenuItem[]> = signal<PanelMenuItem[]>(baseModel);
}

@Component({
  standalone: true,
  imports: [PanelMenu],
  template: `
    <ui-lib-panel-menu [model]="modelA" [ariaLabel]="'Primary nav'" />
    <ui-lib-panel-menu [model]="modelB" [ariaLabel]="'Secondary nav'" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoPanelMenusHostComponent {
  public readonly modelA: PanelMenuItem[] = baseModel;
  public readonly modelB: PanelMenuItem[] = baseModel;
}

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideZonelessChangeDetection(), ThemeConfigService],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getRootContainer(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-panel-menu__container');
}

function getRootHeaders(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.ui-lib-panel-menu__header'
    )
  );
}

function getPanelRegions(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-panel-menu__content[role="region"]'
    )
  );
}

function getSubLinks(fixture: ComponentFixture<unknown>): HTMLAnchorElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>(
      '.ui-lib-panel-menu__sub-link'
    )
  );
}

describe('PanelMenu Accessibility', (): void => {
  let fixture: ComponentFixture<unknown> | null = null;

  afterEach((): void => {
    fixture?.destroy();
    fixture = null;
  });

  describe('navigation landmark', (): void => {
    it('root has role="navigation"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      expect(getRootContainer(fixture)?.getAttribute('role')).toBe('navigation');
    });

    it('root has aria-label from ariaLabel input', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      expect(getRootContainer(fixture)?.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('defaults to PANEL_MENU_DEFAULT_ARIA_LABEL', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuDefaultLabelHostComponent);
      expect(getRootContainer(fixture)?.getAttribute('aria-label')).toBe(
        PANEL_MENU_DEFAULT_ARIA_LABEL
      );
    });
  });

  describe('panel header ARIA', (): void => {
    it('panel header is a button element', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      expect(getRootHeaders(fixture)[0]?.tagName).toBe('BUTTON');
    });

    it('panel header has aria-expanded="false" when closed', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      expect(getRootHeaders(fixture)[0]?.getAttribute('aria-expanded')).toBe('false');
    });

    it('panel header has aria-expanded="true" when open', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[0]?.click();
      fixture.detectChanges();
      expect(getRootHeaders(fixture)[0]?.getAttribute('aria-expanded')).toBe('true');
    });

    it('panel header has aria-controls pointing to a valid panel id', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const header: HTMLButtonElement | undefined = getRootHeaders(fixture).at(0);
      const controlledId: string | null | undefined = header?.getAttribute('aria-controls');
      const panel: HTMLElement | null = controlledId
        ? (fixture.nativeElement as HTMLElement).querySelector(`#${controlledId}`)
        : null;
      expect(panel).toBeTruthy();
    });

    it('panel header id matches aria-labelledby on content region', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const header: HTMLButtonElement | undefined = getRootHeaders(fixture).at(0);
      const region: HTMLElement | undefined = getPanelRegions(fixture).at(0);
      expect(region?.getAttribute('aria-labelledby')).toBe(header?.getAttribute('id'));
    });

    it('disabled header has aria-disabled="true"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      expect(getRootHeaders(fixture)[1]?.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('panel content ARIA', (): void => {
    it('panel content has role="region"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      expect(getPanelRegions(fixture)[0]?.getAttribute('role')).toBe('region');
    });

    it('panel content has aria-labelledby matching header id', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const header: HTMLButtonElement | undefined = getRootHeaders(fixture).at(2);
      const region: HTMLElement | undefined = getPanelRegions(fixture).at(2);
      expect(region?.getAttribute('aria-labelledby')).toBe(header?.id ?? null);
    });

    it('closed panel has aria-hidden="true"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      expect(getPanelRegions(fixture)[0]?.getAttribute('aria-hidden')).toBe('true');
    });

    it('open panel does not have aria-hidden', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[0]?.click();
      fixture.detectChanges();
      expect(getPanelRegions(fixture)[0]?.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('sub-menu ARIA', (): void => {
    it('sub-list inside open panel has role="menu"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[0]?.click();
      fixture.detectChanges();
      const subList: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-panel-menu__content--visible .ui-lib-panel-menu__sub-list'
      );
      expect(subList?.getAttribute('role')).toBe('menu');
    });

    it('sub-item links have role="menuitem"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[0]?.click();
      fixture.detectChanges();
      expect(getSubLinks(fixture)[0]?.getAttribute('role')).toBe('menuitem');
    });

    it('disabled sub-item has aria-disabled="true"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[0]?.click();
      fixture.detectChanges();
      const disabledSubItem: HTMLAnchorElement | undefined = getSubLinks(fixture).at(1);
      expect(disabledSubItem?.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('separator ARIA', (): void => {
    it('separator has role="separator"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const separator: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-panel-menu__separator'
      );
      expect(separator?.getAttribute('role')).toBe('separator');
    });

    it('separator does not have aria-hidden="true"', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const separator: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-panel-menu__separator'
      );
      expect(separator?.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('keyboard navigation — headers', (): void => {
    it('Enter toggles panel open/closed', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const header: HTMLButtonElement = getRootHeaders(fixture)[0]!;
      dispatchKey(header, 'Enter');
      fixture.detectChanges();
      expect(header.getAttribute('aria-expanded')).toBe('true');
      dispatchKey(header, 'Enter');
      fixture.detectChanges();
      expect(header.getAttribute('aria-expanded')).toBe('false');
    });

    it('Space toggles panel open/closed', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const header: HTMLButtonElement = getRootHeaders(fixture)[0]!;
      dispatchKey(header, ' ');
      fixture.detectChanges();
      expect(header.getAttribute('aria-expanded')).toBe('true');
    });

    it('ArrowDown moves focus to the next header', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const headers: HTMLButtonElement[] = getRootHeaders(fixture);
      headers[0]!.focus();
      dispatchKey(headers[0]!, 'ArrowDown');
      expect(document.activeElement).toBe(headers[2]);
    });

    it('ArrowUp moves focus to the previous header', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const headers: HTMLButtonElement[] = getRootHeaders(fixture);
      headers[2]!.focus();
      dispatchKey(headers[2]!, 'ArrowUp');
      expect(document.activeElement).toBe(headers[0]);
    });

    it('Home moves focus to the first header', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const headers: HTMLButtonElement[] = getRootHeaders(fixture);
      headers[2]!.focus();
      dispatchKey(headers[2]!, 'Home');
      expect(document.activeElement).toBe(headers[0]);
    });

    it('End moves focus to the last header', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const headers: HTMLButtonElement[] = getRootHeaders(fixture);
      headers[0]!.focus();
      dispatchKey(headers[0]!, 'End');
      expect(document.activeElement).toBe(headers[2]);
    });
  });

  describe('keyboard navigation — sub-items', (): void => {
    it('ArrowDown and ArrowUp navigate within open panel sub-menu', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[2]?.click();
      fixture.detectChanges();
      const links: HTMLAnchorElement[] = getSubLinks(fixture).filter(
        (link: HTMLAnchorElement): boolean => link.getAttribute('aria-disabled') !== 'true'
      );
      const documentationLink: HTMLAnchorElement | undefined = links.find(
        (link: HTMLAnchorElement): boolean => link.textContent!.trim() === 'Documentation'
      );
      const supportLink: HTMLAnchorElement | undefined = links.find(
        (link: HTMLAnchorElement): boolean => link.textContent!.trim() === 'Support'
      );
      documentationLink?.focus();
      if (documentationLink) {
        dispatchKey(documentationLink, 'ArrowDown');
      }
      expect(document.activeElement).toBe(supportLink);
      if (supportLink) {
        dispatchKey(supportLink, 'ArrowUp');
      }
      expect(document.activeElement).toBe(documentationLink);
    });

    it('Escape returns focus to the panel header', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      const header: HTMLButtonElement = getRootHeaders(fixture)[0]!;
      header.click();
      fixture.detectChanges();
      const firstSubLink: HTMLAnchorElement = getSubLinks(fixture)[0]!;
      firstSubLink.focus();
      dispatchKey(firstSubLink, 'Escape');
      expect(document.activeElement).toBe(header);
    });
  });

  describe('multiple panels', (): void => {
    it('supports unique IDs across two PanelMenu instances', async (): Promise<void> => {
      fixture = await createFixture(TwoPanelMenusHostComponent);
      const headers: HTMLButtonElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll('.ui-lib-panel-menu__header')
      );
      const regions: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll(
          '.ui-lib-panel-menu__content[role="region"]'
        )
      );
      const headerIds: string[] = headers.map((header: HTMLButtonElement): string => header.id);
      const regionIds: string[] = regions
        .map((region: HTMLElement): string | null => region.getAttribute('id'))
        .filter((id: string | null): id is string => id !== null);

      expect(new Set(headerIds).size).toBe(headerIds.length);
      expect(new Set(regionIds).size).toBe(regionIds.length);
    });
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe with all panels closed', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      await checkA11y(fixture, { rules: SKIP_PANEL_MENU_STRUCTURE_RULES });
    });

    it('passes axe with first panel open', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[0]?.click();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_PANEL_MENU_STRUCTURE_RULES });
    });

    it('passes axe with multiple panels open when multiple=true', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      (fixture.componentInstance as PanelMenuA11yHostComponent).multiple.set(true);
      fixture.detectChanges();
      const headers: HTMLButtonElement[] = getRootHeaders(fixture);
      headers[0]!.click();
      fixture.detectChanges();
      headers[2]!.click();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_PANEL_MENU_STRUCTURE_RULES });
    });

    it('passes axe with disabled panel and disabled sub-item', async (): Promise<void> => {
      fixture = await createFixture(PanelMenuA11yHostComponent);
      getRootHeaders(fixture)[0]?.click();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_PANEL_MENU_STRUCTURE_RULES });
    });
  });
});
