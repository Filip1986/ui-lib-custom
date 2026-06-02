import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Tree } from './tree';
import type { TreeNode, TreeSelectionMode } from './tree.types';

// ─── axe rules ────────────────────────────────────────────────────────────────

/**
 * `aria-required-children` is disabled because the root `<ul role="none">` and the
 * `<ui-lib-tree-node>` custom-element host (no role) are transparent DOM wrappers
 * that axe may not fully flatten in jsdom.
 */
const SKIP_TREE_STRUCTURE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

// ─── Test data ────────────────────────────────────────────────────────────────

function buildNodes(): TreeNode[] {
  return [
    {
      key: 'docs',
      label: 'Documents',
      expanded: true,
      children: [
        {
          key: 'work',
          label: 'Work',
          expanded: true,
          children: [
            { key: 'file1', label: 'Expenses.xlsx', leaf: true },
            { key: 'file2', label: 'Resume.docx', leaf: true },
          ],
        },
        {
          key: 'home',
          label: 'Home',
          expanded: true,
          children: [{ key: 'file3', label: 'Invoices.xlsx', leaf: true }],
        },
      ],
    },
    {
      key: 'pics',
      label: 'Pictures',
      expanded: false,
      children: [{ key: 'pic1', label: 'barcelona.jpg', leaf: true }],
    },
    {
      key: 'movies',
      label: 'Movies',
      leaf: true,
    },
  ];
}

function buildCheckboxNodes(): TreeNode[] {
  return [
    {
      key: 'fruits',
      label: 'Fruits',
      expanded: true,
      children: [
        { key: 'apple', label: 'Apple', leaf: true },
        { key: 'banana', label: 'Banana', leaf: true },
      ],
    },
    { key: 'vegs', label: 'Vegetables', leaf: true },
  ];
}

// ─── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Tree],
  template: `
    <ui-lib-tree
      [value]="nodes()"
      [selectionMode]="selectionMode()"
      [ariaLabel]="ariaLabel()"
      [(selection)]="selection"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TreeA11yHost {
  public readonly nodes: WritableSignal<TreeNode[]> = signal(buildNodes());
  public readonly selectionMode: WritableSignal<TreeSelectionMode> = signal(null);
  public readonly ariaLabel: WritableSignal<string> = signal('File system');
  public readonly selection: WritableSignal<TreeNode | TreeNode[] | null> = signal(null);
}

@Component({
  standalone: true,
  imports: [Tree],
  template: `
    <ui-lib-tree
      [value]="nodes()"
      selectionMode="checkbox"
      ariaLabel="Select files"
      [(selection)]="selection"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CheckboxTreeHost {
  public readonly nodes: WritableSignal<TreeNode[]> = signal(buildCheckboxNodes());
  public readonly selection: WritableSignal<TreeNode[]> = signal([]);
}

@Component({
  standalone: true,
  imports: [Tree],
  template: ` <ui-lib-tree [value]="nodes" [filter]="true" ariaLabel="Filter tree" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FilterTreeHost {
  public readonly nodes: TreeNode[] = buildNodes();
}

@Component({
  standalone: true,
  imports: [Tree],
  template: `
    <ui-lib-tree ariaLabel="First tree" [value]="nodes" />
    <ui-lib-tree ariaLabel="Second tree" [value]="nodes" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoTreesHost {
  public readonly nodes: TreeNode[] = [{ key: 'n1', label: 'Node 1', leaf: true }];
}

// ─── Fixture helpers ──────────────────────────────────────────────────────────

const fixtureRefs: ComponentFixture<unknown>[] = [];

async function createTreeA11yFixture(
  configure?: (host: TreeA11yHost) => void,
): Promise<ComponentFixture<TreeA11yHost>> {
  await TestBed.configureTestingModule({
    imports: [TreeA11yHost],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<TreeA11yHost> = TestBed.createComponent(TreeA11yHost);
  configure?.(fixture.componentInstance);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  fixtureRefs.push(fixture);
  return fixture;
}

async function createCheckboxFixture(
  configure?: (host: CheckboxTreeHost) => void,
): Promise<ComponentFixture<CheckboxTreeHost>> {
  await TestBed.configureTestingModule({
    imports: [CheckboxTreeHost],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<CheckboxTreeHost> = TestBed.createComponent(CheckboxTreeHost);
  configure?.(fixture.componentInstance);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  fixtureRefs.push(fixture);
  return fixture;
}

function queryAll(container: Element, selector: string): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

function query(container: Element, selector: string): HTMLElement | null {
  return container.querySelector<HTMLElement>(selector);
}

function dispatchKeydown(target: HTMLElement, key: string): void {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Tree — accessibility', (): void => {
  afterEach((): void => {
    for (const fixture of fixtureRefs) {
      (fixture.nativeElement as HTMLElement).remove();
      fixture.destroy();
    }
    fixtureRefs.length = 0;
    TestBed.resetTestingModule();
  });

  // ─── Role structure ─────────────────────────────────────────────────────────

  describe('role structure', (): void => {
    it('should have role="tree" on the host element', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const tree: HTMLElement | null = query(fixture.nativeElement as Element, 'ui-lib-tree');
      expect(tree?.getAttribute('role')).toBe('tree');
    });

    it('should have aria-label on the tree host', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const tree: HTMLElement | null = query(fixture.nativeElement as Element, 'ui-lib-tree');
      expect(tree?.getAttribute('aria-label')).toBe('File system');
    });

    it('should not carry role="tree" on the inner root <ul>', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const ul: HTMLElement | null = query(fixture.nativeElement as Element, 'ul.uilib-tree-root');
      expect(ul?.getAttribute('role')).toBe('none');
    });

    it('should have role="treeitem" on visible node rows', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should have role="group" on nested child lists', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const groups: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="group"]');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  // ─── aria-level ─────────────────────────────────────────────────────────────

  describe('aria-level', (): void => {
    it('should set aria-level="1" on root-level treeitems', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const rootItems: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => parseInt(item.getAttribute('aria-level') ?? '0', 10) === 1,
      );
      expect(rootItems.length).toBeGreaterThan(0);
    });

    it('should set aria-level="2" on depth-1 treeitems', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const depth1Items: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => parseInt(item.getAttribute('aria-level') ?? '0', 10) === 2,
      );
      expect(depth1Items.length).toBeGreaterThan(0);
    });

    it('should set aria-level="3" on depth-2 leaf treeitems', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const depth2Items: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => parseInt(item.getAttribute('aria-level') ?? '0', 10) === 3,
      );
      expect(depth2Items.length).toBeGreaterThan(0);
    });
  });

  // ─── aria-setsize / aria-posinset ────────────────────────────────────────────

  describe('aria-setsize and aria-posinset', (): void => {
    it('should set aria-setsize on all visible treeitems', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      for (const item of items) {
        expect(item.getAttribute('aria-setsize')).not.toBeNull();
      }
    });

    it('should set aria-posinset on all visible treeitems', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      for (const item of items) {
        expect(item.getAttribute('aria-posinset')).not.toBeNull();
      }
    });

    it('should set correct aria-setsize for root nodes (3 root nodes)', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const rootItems: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-level') === '1',
      );
      for (const item of rootItems) {
        expect(item.getAttribute('aria-setsize')).toBe('3');
      }
    });

    it('should set correct aria-posinset for root nodes', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const rootItems: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-level') === '1',
      );
      const positions: string[] = rootItems.map(
        (item: HTMLElement): string => item.getAttribute('aria-posinset') ?? '',
      );
      expect(positions).toContain('1');
      expect(positions).toContain('2');
      expect(positions).toContain('3');
    });

    it('should set aria-posinset=1 for the first child in a group', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const depth2Items: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-level') === '2',
      );
      expect(depth2Items[0]?.getAttribute('aria-posinset')).toBe('1');
    });
  });

  // ─── aria-expanded ───────────────────────────────────────────────────────────

  describe('aria-expanded', (): void => {
    it('should set aria-expanded="true" on expanded branch items', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const expanded: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-expanded') === 'true',
      );
      expect(expanded.length).toBeGreaterThan(0);
    });

    it('should set aria-expanded="false" on collapsed branch items', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const collapsed: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-expanded') === 'false',
      );
      expect(collapsed.length).toBeGreaterThan(0);
    });

    it('should not set aria-expanded on leaf items', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const leafMovies: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Movies',
      );
      expect(leafMovies).toBeTruthy();
      expect(leafMovies?.hasAttribute('aria-expanded')).toBe(false);
    });
  });

  // ─── aria-multiselectable ────────────────────────────────────────────────────

  describe('aria-multiselectable', (): void => {
    it('should not set aria-multiselectable when selectionMode=null', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const tree: HTMLElement | null = query(fixture.nativeElement as Element, 'ui-lib-tree');
      expect(tree?.hasAttribute('aria-multiselectable')).toBe(false);
    });

    it('should set aria-multiselectable="true" in multiple mode', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.selectionMode.set('multiple');
        },
      );
      const tree: HTMLElement | null = query(fixture.nativeElement as Element, 'ui-lib-tree');
      expect(tree?.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should set aria-multiselectable="true" in checkbox mode', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture();
      const tree: HTMLElement | null = query(fixture.nativeElement as Element, 'ui-lib-tree');
      expect(tree?.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should not set aria-multiselectable in single mode', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.selectionMode.set('single');
        },
      );
      const tree: HTMLElement | null = query(fixture.nativeElement as Element, 'ui-lib-tree');
      expect(tree?.hasAttribute('aria-multiselectable')).toBe(false);
    });
  });

  // ─── aria-selected ───────────────────────────────────────────────────────────

  describe('aria-selected', (): void => {
    it('should set aria-selected="false" on unselected items in single mode', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.selectionMode.set('single');
        },
      );
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const unselected: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-selected') === 'false',
      );
      expect(unselected.length).toBeGreaterThan(0);
    });

    it('should set aria-selected="true" on the selected item', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.selectionMode.set('single');
          host.selection.set(buildNodes()[0] as TreeNode);
        },
      );
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const selected: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-selected') === 'true',
      );
      expect(selected.length).toBe(1);
    });

    it('should not set aria-selected in checkbox mode (uses aria-checked)', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const withSelected: HTMLElement[] = items.filter((item: HTMLElement): boolean =>
        item.hasAttribute('aria-selected'),
      );
      expect(withSelected.length).toBe(0);
    });
  });

  // ─── aria-checked (checkbox mode) ────────────────────────────────────────────

  describe('aria-checked (checkbox mode)', (): void => {
    it('should set aria-checked="false" on unchecked items', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const unchecked: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-checked') === 'false',
      );
      expect(unchecked.length).toBeGreaterThan(0);
    });

    it('should set aria-checked="true" on a fully checked item', async (): Promise<void> => {
      const nodes: TreeNode[] = buildCheckboxNodes();
      const apple: TreeNode = nodes[0]!.children![0]!;
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture(
        (host: CheckboxTreeHost): void => {
          host.selection.set([apple]);
        },
      );
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const checked: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-checked') === 'true',
      );
      expect(checked.length).toBeGreaterThan(0);
    });

    it('should set aria-checked="mixed" on partially checked parent', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture();
      // Click Apple checkbox only → Fruits becomes partially checked
      const checkboxes: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-tree-node-checkbox',
      );
      // Order: Fruits(0), Apple(1), Banana(2), Vegetables(3)
      checkboxes[1]?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const partial: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.getAttribute('aria-checked') === 'mixed',
      );
      expect(partial).toBeTruthy();
    });

    it('should not render nested role="checkbox" elements (state lives on treeitem)', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture();
      const nestedCheckboxes: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '[role="checkbox"]',
      );
      expect(nestedCheckboxes.length).toBe(0);
    });
  });

  // ─── aria-disabled ───────────────────────────────────────────────────────────

  describe('aria-disabled', (): void => {
    it('should set aria-disabled="true" on non-selectable items', async (): Promise<void> => {
      const nodes: TreeNode[] = [
        { key: 'a', label: 'Enabled', leaf: true },
        { key: 'b', label: 'Disabled', leaf: true, selectable: false },
      ];
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.nodes.set(nodes);
          host.selectionMode.set('single');
        },
      );
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const disabledItem: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Disabled',
      );
      expect(disabledItem?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not set aria-disabled on selectable items', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.selectionMode.set('single');
        },
      );
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      expect(items[0]?.hasAttribute('aria-disabled')).toBe(false);
    });
  });

  // ─── Unique instance IDs ──────────────────────────────────────────────────────

  describe('unique instance IDs', (): void => {
    it('should assign a unique id to each tree instance', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [TwoTreesHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<TwoTreesHost> = TestBed.createComponent(TwoTreesHost);
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();
      await fixture.whenStable();

      const trees: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-tree'),
      );
      expect(trees.length).toBe(2);
      const id1: string | null = trees[0]!.getAttribute('id');
      const id2: string | null = trees[1]!.getAttribute('id');
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);

      (fixture.nativeElement as HTMLElement).remove();
      fixture.destroy();
    });
  });

  // ─── Keyboard navigation ─────────────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    it('ArrowDown should move focus to the next treeitem', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[0]!.focus();
      dispatchKeydown(items[0] as HTMLElement, 'ArrowDown');
      expect(document.activeElement).toBe(items[1]);
    });

    it('ArrowUp should move focus to the previous treeitem', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[1]!.focus();
      dispatchKeydown(items[1] as HTMLElement, 'ArrowUp');
      expect(document.activeElement).toBe(items[0]);
    });

    it('Home should move focus to the first treeitem', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[items.length - 1]!.focus();
      dispatchKeydown(items[items.length - 1] as HTMLElement, 'Home');
      expect(document.activeElement).toBe(items[0]);
    });

    it('End should move focus to the last visible treeitem', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[0]!.focus();
      dispatchKeydown(items[0] as HTMLElement, 'End');
      expect(document.activeElement).toBe(items[items.length - 1]);
    });

    it('ArrowRight on a collapsed branch should expand it', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      // Pictures is collapsed (aria-expanded="false")
      const pictures: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.getAttribute('aria-expanded') === 'false',
      );
      expect(pictures).toBeTruthy();
      pictures!.focus();
      dispatchKeydown(pictures!, 'ArrowRight');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(pictures!.getAttribute('aria-expanded')).toBe('true');
    });

    it('ArrowRight on an expanded branch should focus the first child', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      // Documents (items[0]) is expanded — ArrowRight should move focus to Work (items[1])
      const docs: HTMLElement = items[0] as HTMLElement;
      expect(docs.getAttribute('aria-expanded')).toBe('true');
      docs.focus();
      dispatchKeydown(docs, 'ArrowRight');
      expect(document.activeElement).toBe(items[1]);
    });

    it('ArrowRight on a leaf should do nothing', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const movies: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Movies',
      );
      expect(movies).toBeTruthy();
      movies!.focus();
      dispatchKeydown(movies!, 'ArrowRight');
      expect(document.activeElement).toBe(movies);
    });

    it('ArrowLeft on an expanded branch should collapse it', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const docs: HTMLElement = items[0] as HTMLElement;
      expect(docs.getAttribute('aria-expanded')).toBe('true');
      docs.focus();
      dispatchKeydown(docs, 'ArrowLeft');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(docs.getAttribute('aria-expanded')).toBe('false');
    });

    it('ArrowLeft on a leaf should move focus to the parent treeitem', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      // Expenses.xlsx (level 3) → parent is Work (level 2)
      const expenses: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Expenses.xlsx',
      );
      const work: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Work',
      );
      expect(expenses).toBeTruthy();
      expect(work).toBeTruthy();
      expenses!.focus();
      dispatchKeydown(expenses!, 'ArrowLeft');
      expect(document.activeElement).toBe(work);
    });

    it('ArrowLeft on a root-level collapsed node should not move focus (no parent)', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      // Pictures is root-level and collapsed
      const pictures: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.getAttribute('aria-expanded') === 'false',
      );
      expect(pictures).toBeTruthy();
      pictures!.focus();
      dispatchKeydown(pictures!, 'ArrowLeft');
      expect(document.activeElement).toBe(pictures);
    });
  });

  // ─── Type-ahead ──────────────────────────────────────────────────────────────

  describe('type-ahead navigation', (): void => {
    it('pressing "d" should focus the next item starting with "d"', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      // Focus Movies (last) — 'd' should wrap to Documents
      items[items.length - 1]!.focus();
      dispatchKeydown(items[items.length - 1] as HTMLElement, 'd');
      const documents: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Documents',
      );
      expect(document.activeElement).toBe(documents);
    });

    it('pressing "p" should focus Pictures', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[0]!.focus();
      dispatchKeydown(items[0] as HTMLElement, 'p');
      const pictures: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Pictures',
      );
      expect(document.activeElement).toBe(pictures);
    });

    it('pressing "m" should focus Movies', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[0]!.focus();
      dispatchKeydown(items[0] as HTMLElement, 'm');
      const movies: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Movies',
      );
      expect(document.activeElement).toBe(movies);
    });

    it('type-ahead should wrap around from end to start', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      const movies: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Movies',
      );
      const documents: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Documents',
      );
      movies?.focus();
      dispatchKeydown(movies!, 'd');
      expect(document.activeElement).toBe(documents);
    });

    it('type-ahead should be case-insensitive', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[0]!.focus();
      // Uppercase 'P' should still find Pictures
      dispatchKeydown(items[0] as HTMLElement, 'P');
      const pictures: HTMLElement | undefined = items.find(
        (item: HTMLElement): boolean => item.textContent.trim() === 'Pictures',
      );
      expect(document.activeElement).toBe(pictures);
    });

    it('should not trigger type-ahead for non-printable keys', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const items: HTMLElement[] = queryAll(fixture.nativeElement as Element, '[role="treeitem"]');
      items[0]!.focus();
      dispatchKeydown(items[0] as HTMLElement, 'Shift');
      expect(document.activeElement).toBe(items[0]);
    });
  });

  // ─── Toggle button ARIA ──────────────────────────────────────────────────────

  describe('toggle button ARIA', (): void => {
    it('should have aria-label="Expand" on a collapsed toggle', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const toggles: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-tree-node-toggle',
      );
      const expandToggle: HTMLElement | undefined = toggles.find(
        (btn: HTMLElement): boolean => btn.getAttribute('aria-label') === 'Expand',
      );
      expect(expandToggle).toBeTruthy();
    });

    it('should have aria-label="Collapse" on an expanded toggle', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const toggles: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-tree-node-toggle',
      );
      const collapseToggle: HTMLElement | undefined = toggles.find(
        (btn: HTMLElement): boolean => btn.getAttribute('aria-label') === 'Collapse',
      );
      expect(collapseToggle).toBeTruthy();
    });

    it('toggle buttons should have tabindex="-1" (not in tab order)', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      const toggles: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-tree-node-toggle',
      );
      for (const toggle of toggles) {
        expect(toggle.getAttribute('tabindex')).toBe('-1');
      }
    });
  });

  // ─── Filter input ARIA ────────────────────────────────────────────────────────

  describe('filter input ARIA', (): void => {
    it('should have aria-label on the filter input', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [FilterTreeHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<FilterTreeHost> = TestBed.createComponent(FilterTreeHost);
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();
      await fixture.whenStable();

      const input: HTMLElement | null = query(
        fixture.nativeElement as Element,
        '.uilib-tree-filter-input',
      );
      expect(input?.getAttribute('aria-label')).toBeTruthy();

      (fixture.nativeElement as HTMLElement).remove();
      fixture.destroy();
    });
  });

  // ─── axe automated checks ─────────────────────────────────────────────────────

  describe('axe automated checks', (): void => {
    it('basic tree should pass axe', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture();
      await checkA11y(fixture, { rules: SKIP_TREE_STRUCTURE_RULES });
    });

    it('single-selection tree should pass axe', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.selectionMode.set('single');
        },
      );
      await checkA11y(fixture, { rules: SKIP_TREE_STRUCTURE_RULES });
    });

    it('multiple-selection tree should pass axe', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeA11yHost> = await createTreeA11yFixture(
        (host: TreeA11yHost): void => {
          host.selectionMode.set('multiple');
        },
      );
      await checkA11y(fixture, { rules: SKIP_TREE_STRUCTURE_RULES });
    });

    it('checkbox tree should pass axe', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture();
      await checkA11y(fixture, { rules: SKIP_TREE_STRUCTURE_RULES });
    });

    it('partially-checked checkbox tree should pass axe', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxTreeHost> = await createCheckboxFixture();
      const checkboxes: HTMLElement[] = queryAll(
        fixture.nativeElement as Element,
        '.uilib-tree-node-checkbox',
      );
      checkboxes[1]?.click(); // Check Apple only → Fruits becomes partial
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_TREE_STRUCTURE_RULES });
    });
  });
});
