import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { OrganizationChart } from './organization-chart';
import type {
  OrganizationChartNode,
  OrganizationChartSelectionMode,
} from './organization-chart.types';

const SKIP_ORG_CHART_STRUCTURE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

function buildNodes(): OrganizationChartNode[] {
  return [
    {
      key: 'ceo',
      label: 'CEO',
      expanded: true,
      children: [
        {
          key: 'vp-eng',
          label: 'VP Engineering',
          expanded: true,
          children: [{ key: 'dev-1', label: 'Developer One' }],
        },
        { key: 'vp-sales', label: 'VP Sales' },
      ],
    },
    {
      key: 'cto',
      label: 'CTO',
      expanded: false,
      children: [{ key: 'arch', label: 'Architect' }],
    },
  ];
}

@Component({
  standalone: true,
  imports: [OrganizationChart],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-organization-chart
      [value]="nodes()"
      [selectionMode]="selectionMode()"
      [collapsible]="collapsible()"
      [ariaLabel]="ariaLabel()"
      [(selection)]="selection"
    >
      <div listFallback class="fallback-list">Linear fallback list</div>
    </ui-lib-organization-chart>
  `,
})
class OrganizationChartA11yHost {
  public readonly nodes: WritableSignal<OrganizationChartNode[]> = signal(buildNodes());
  public readonly selectionMode: WritableSignal<OrganizationChartSelectionMode> = signal(null);
  public readonly collapsible: WritableSignal<boolean> = signal(true);
  public readonly ariaLabel: WritableSignal<string> = signal('Organization hierarchy');
  public readonly selection: WritableSignal<
    OrganizationChartNode | OrganizationChartNode[] | null
  > = signal(null);
}

const fixtureRefs: ComponentFixture<unknown>[] = [];

async function createFixture(
  configure?: (host: OrganizationChartA11yHost) => void
): Promise<ComponentFixture<OrganizationChartA11yHost>> {
  await TestBed.configureTestingModule({
    imports: [OrganizationChartA11yHost],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<OrganizationChartA11yHost> =
    TestBed.createComponent(OrganizationChartA11yHost);
  configure?.(fixture.componentInstance);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  fixtureRefs.push(fixture);
  return fixture;
}

function query(container: Element, selector: string): HTMLElement | null {
  return container.querySelector<HTMLElement>(selector);
}

function queryAll(container: Element, selector: string): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

function dispatchKeydown(target: HTMLElement, key: string): void {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

function getTreeItems(fixture: ComponentFixture<OrganizationChartA11yHost>): HTMLElement[] {
  return queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
}

function focusTreeItemByLabel(
  fixture: ComponentFixture<OrganizationChartA11yHost>,
  label: string
): HTMLElement {
  const item: HTMLElement | undefined = getTreeItems(fixture).find(
    (treeItem: HTMLElement): boolean => treeItem.textContent.includes(label)
  );
  expect(item).toBeTruthy();
  item!.focus();
  return item!;
}

describe('OrganizationChart — accessibility', (): void => {
  afterEach((): void => {
    for (const fixture of fixtureRefs) {
      (fixture.nativeElement as HTMLElement).remove();
      fixture.destroy();
    }
    fixtureRefs.length = 0;
    TestBed.resetTestingModule();
  });

  describe('tree semantics', (): void => {
    it('should set role="tree" on the root list', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      expect(
        query(fixture.nativeElement as Element, '.uilib-org-chart-root')?.getAttribute('role')
      ).toBe('tree');
    });

    it('should expose aria-label on the root tree', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      expect(
        query(fixture.nativeElement as Element, '.uilib-org-chart-root')?.getAttribute('aria-label')
      ).toBe('Organization hierarchy');
    });

    it('should render role="treeitem" nodes', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      expect(getTreeItems(fixture).length).toBeGreaterThan(0);
    });

    it('should set aria-level on root and nested nodes', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const levels: string[] = getTreeItems(fixture)
        .map((item: HTMLElement): string => item.getAttribute('aria-level') ?? '')
        .filter(Boolean);
      expect(levels).toContain('1');
      expect(levels).toContain('2');
      expect(levels).toContain('3');
    });

    it('should set aria-setsize on root nodes', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const rootNodes: HTMLElement[] = getTreeItems(fixture).filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-level') === '1'
      );
      expect(rootNodes[0]?.getAttribute('aria-setsize')).toBe('2');
      expect(rootNodes[1]?.getAttribute('aria-setsize')).toBe('2');
    });

    it('should set aria-posinset for sibling order', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const rootNodes: HTMLElement[] = getTreeItems(fixture).filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-level') === '1'
      );
      expect(rootNodes[0]?.getAttribute('aria-posinset')).toBe('1');
      expect(rootNodes[1]?.getAttribute('aria-posinset')).toBe('2');
    });

    it('should render nested child containers as role="group"', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      expect(queryAll(fixture.nativeElement as Element, '[role="group"]').length).toBeGreaterThan(
        0
      );
    });

    it('should expose aria-expanded true/false for branch nodes and omit it for leaves', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const ceo: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      const cto: HTMLElement = focusTreeItemByLabel(fixture, 'CTO');
      const leaf: HTMLElement = focusTreeItemByLabel(fixture, 'VP Sales');
      expect(ceo.getAttribute('aria-expanded')).toBe('true');
      expect(cto.getAttribute('aria-expanded')).toBe('false');
      expect(leaf.getAttribute('aria-expanded')).toBeNull();
    });

    it('should expose aria-selected only when selection mode is active', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const ceoBefore: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      expect(ceoBefore.getAttribute('aria-selected')).toBeNull();

      fixture.componentInstance.selectionMode.set('single');
      fixture.detectChanges();
      await fixture.whenStable();

      const ceoAfter: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      expect(ceoAfter.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('keyboard navigation', (): void => {
    it('ArrowDown should move focus to next visible node', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const first: HTMLElement = getTreeItems(fixture)[0]!;
      first.focus();
      dispatchKeydown(first, 'ArrowDown');
      expect(document.activeElement?.textContent).toContain('VP Engineering');
    });

    it('ArrowUp should move focus to previous visible node', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const second: HTMLElement = getTreeItems(fixture)[1]!;
      second.focus();
      dispatchKeydown(second, 'ArrowUp');
      expect(document.activeElement?.textContent).toContain('CEO');
    });

    it('Home should move focus to first visible node', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const last: HTMLElement = getTreeItems(fixture).at(-1)!;
      last.focus();
      dispatchKeydown(last, 'Home');
      expect(document.activeElement?.textContent).toContain('CEO');
    });

    it('End should move focus to last visible node', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const first: HTMLElement = getTreeItems(fixture)[0]!;
      first.focus();
      dispatchKeydown(first, 'End');
      expect(document.activeElement?.textContent).toContain('CTO');
    });

    it('ArrowRight should expand a collapsed branch', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const cto: HTMLElement = focusTreeItemByLabel(fixture, 'CTO');
      dispatchKeydown(cto, 'ArrowRight');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(focusTreeItemByLabel(fixture, 'CTO').getAttribute('aria-expanded')).toBe('true');
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Architect');
    });

    it('ArrowRight should move focus to the first child when already expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const ceo: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      dispatchKeydown(ceo, 'ArrowRight');
      expect(document.activeElement?.textContent).toContain('VP Engineering');
    });

    it('ArrowLeft should collapse an expanded branch', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const ceo: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      dispatchKeydown(ceo, 'ArrowLeft');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(focusTreeItemByLabel(fixture, 'CEO').getAttribute('aria-expanded')).toBe('false');
      expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('VP Engineering');
    });

    it('ArrowLeft should move focus to parent when branch is collapsed or leaf', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const child: HTMLElement = focusTreeItemByLabel(fixture, 'VP Sales');
      dispatchKeydown(child, 'ArrowLeft');
      expect(document.activeElement?.textContent).toContain('CEO');
    });

    it('Enter should select the focused node in single mode', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture(
        (host: OrganizationChartA11yHost): void => {
          host.selectionMode.set('single');
        }
      );
      const ceo: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      dispatchKeydown(ceo, 'Enter');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(focusTreeItemByLabel(fixture, 'CEO').getAttribute('aria-selected')).toBe('true');
    });

    it('Space should select the focused node in single mode', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture(
        (host: OrganizationChartA11yHost): void => {
          host.selectionMode.set('single');
        }
      );
      const vpEngineering: HTMLElement = focusTreeItemByLabel(fixture, 'VP Engineering');
      dispatchKeydown(vpEngineering, ' ');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(focusTreeItemByLabel(fixture, 'VP Engineering').getAttribute('aria-selected')).toBe(
        'true'
      );
    });

    it('type-ahead should move focus to next matching label', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const ceo: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      dispatchKeydown(ceo, 'v');
      expect(document.activeElement?.textContent).toContain('VP Engineering');
    });
  });

  describe('decorative content', (): void => {
    it('should mark down connectors as aria-hidden', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const connectors: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-org-chart-connector-down'
      );
      expect(connectors.length).toBeGreaterThan(0);
      connectors.forEach((connector: HTMLElement): void => {
        expect(connector.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should mark up connectors as aria-hidden', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const connectors: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-org-chart-connector-up'
      );
      expect(connectors.length).toBeGreaterThan(0);
      connectors.forEach((connector: HTMLElement): void => {
        expect(connector.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should hide toggle icon glyphs from screen readers', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const toggleIcons: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-org-chart-toggle-icon'
      );
      expect(toggleIcons.length).toBeGreaterThan(0);
      toggleIcons.forEach((icon: HTMLElement): void => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('linear fallback slot', (): void => {
    it('should render projected fallback content', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      expect(query(fixture.nativeElement as Element, '.fallback-list')?.textContent).toContain(
        'Linear fallback list'
      );
    });

    it('should keep fallback content outside treeitem navigation', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      expect(
        query(fixture.nativeElement as Element, '.fallback-list')?.closest('[role="treeitem"]')
      ).toBeNull();
    });
  });

  describe('axe', (): void => {
    it('should pass axe checks in default state', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      await checkA11y(fixture, { rules: SKIP_ORG_CHART_STRUCTURE_RULES });
    });

    it('should pass axe checks when branch nodes are expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture();
      const cto: HTMLElement = focusTreeItemByLabel(fixture, 'CTO');
      dispatchKeydown(cto, 'ArrowRight');
      fixture.detectChanges();
      await fixture.whenStable();
      await checkA11y(fixture, { rules: SKIP_ORG_CHART_STRUCTURE_RULES });
    });

    it('should pass axe checks when a node is selected', async (): Promise<void> => {
      const fixture: ComponentFixture<OrganizationChartA11yHost> = await createFixture(
        (host: OrganizationChartA11yHost): void => {
          host.selectionMode.set('single');
        }
      );
      const ceo: HTMLElement = focusTreeItemByLabel(fixture, 'CEO');
      dispatchKeydown(ceo, 'Enter');
      fixture.detectChanges();
      await fixture.whenStable();
      await checkA11y(fixture, { rules: SKIP_ORG_CHART_STRUCTURE_RULES });
    });
  });
});
