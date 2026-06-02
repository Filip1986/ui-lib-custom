import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  type Type,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { TreeTableColumnComponent } from './tree-table-column.component';
import { TreeTableComponent } from './tree-table.component';
import type { TreeTableNode } from './tree-table.types';

// ---------------------------------------------------------------------------
// axe rules — skip colour-contrast for all checks
// ---------------------------------------------------------------------------

const SKIP_TREEGRID_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
};

// ---------------------------------------------------------------------------
// Sample tree data (3 levels)
//
//  Documents  [level=1, expanded]
//    Invoice.pdf  [level=2, leaf]
//    Reports  [level=2, expanded]
//      Q1.pdf  [level=3, leaf]
//  Pictures  [level=1, collapsed]
//    vacation.jpg  [level=2, leaf — not rendered]
//  Downloads  [level=1, leaf]
//
// Root setsize = 3; Documents siblings = 2; Reports siblings = 1
// ---------------------------------------------------------------------------

function buildTree(): TreeTableNode[] {
  return [
    {
      key: 'docs',
      data: { name: 'Documents', size: '100 KB', type: 'Folder' },
      expanded: true,
      children: [
        { key: 'invoice', data: { name: 'Invoice.pdf', size: '20 KB', type: 'PDF' }, leaf: true },
        {
          key: 'reports',
          data: { name: 'Reports', size: '40 KB', type: 'Folder' },
          expanded: true,
          children: [
            {
              key: 'q1',
              data: { name: 'Q1.pdf', size: '15 KB', type: 'PDF' },
              leaf: true,
            },
          ],
        },
      ],
    },
    {
      key: 'pics',
      data: { name: 'Pictures', size: '2 MB', type: 'Folder' },
      expanded: false,
      children: [
        {
          key: 'vacation',
          data: { name: 'vacation.jpg', size: '1 MB', type: 'Image' },
          leaf: true,
        },
      ],
    },
    { key: 'dl', data: { name: 'Downloads', size: '500 KB', type: 'Folder' }, leaf: true },
  ];
}

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-tree-table [value]="[]" ariaLabel="Empty tree table">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
      <ui-lib-tree-table-column field="size" header="Size" />
    </ui-lib-tree-table>
  `,
})
class EmptyHost {}

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-tree-table [value]="nodes" ariaLabel="File system">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
      <ui-lib-tree-table-column field="size" header="Size" />
      <ui-lib-tree-table-column field="type" header="Type" />
    </ui-lib-tree-table>
  `,
})
class FullTreeHost {
  public readonly nodes: TreeTableNode[] = buildTree();
}

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-tree-table [value]="nodes" ariaLabel="Collapsed tree table">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
      <ui-lib-tree-table-column field="size" header="Size" />
    </ui-lib-tree-table>
  `,
})
class CollapsedRootHost {
  public readonly nodes: TreeTableNode[] = [
    {
      key: 'folder',
      data: { name: 'Folder', size: '1 MB' },
      expanded: false,
      children: [{ key: 'file', data: { name: 'file.txt', size: '1 KB' }, leaf: true }],
    },
  ];
}

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-tree-table [value]="nodes" selectionMode="checkbox" ariaLabel="Checkbox tree table">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
      <ui-lib-tree-table-column field="size" header="Size" />
    </ui-lib-tree-table>
  `,
})
class CheckboxHost {
  public readonly nodes: TreeTableNode[] = buildTree();
}

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-tree-table [value]="nodes" ariaLabel="First tree">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
    </ui-lib-tree-table>
    <ui-lib-tree-table [value]="nodes" ariaLabel="Second tree">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
    </ui-lib-tree-table>
  `,
})
class TwoInstancesHost {
  public readonly nodes: TreeTableNode[] = buildTree();
}

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-tree-table [value]="nodes" caption="File system caption">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
    </ui-lib-tree-table>
  `,
})
class CaptionFallbackHost {
  public readonly nodes: TreeTableNode[] = buildTree();
}

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-tree-table [value]="[]">
      <ui-lib-tree-table-column field="name" header="Name" />
    </ui-lib-tree-table>
  `,
})
class NoLabelHost {}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function root<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function treegrid<T>(fixture: ComponentFixture<T>): HTMLElement {
  return root(fixture).querySelector('table[role="treegrid"]') as HTMLElement;
}

function bodyRows<T>(fixture: ComponentFixture<T>): HTMLElement[] {
  return Array.from(root(fixture).querySelectorAll('tr[role="row"][tabindex="0"]'));
}

function pressKey(target: HTMLElement, key: string): void {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('TreeTableComponent accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((f: ComponentFixture<unknown>): void => {
      const el: HTMLElement = f.nativeElement as HTMLElement;
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
      f.destroy();
    });
    createdFixtures.length = 0;
  });

  // ─── treegrid role + accessible name ──────────────────────────────────────

  describe('treegrid role and accessible name', (): void => {
    it('table element has role="treegrid"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      expect(treegrid(fixture).getAttribute('role')).toBe('treegrid');
    });

    it('treegrid has aria-label when ariaLabel input is set', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      expect(treegrid(fixture).getAttribute('aria-label')).toBe('File system');
    });

    it('treegrid falls back to caption text for aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<CaptionFallbackHost> = await setup(CaptionFallbackHost);
      expect(treegrid(fixture).getAttribute('aria-label')).toBe('File system caption');
    });

    it('treegrid falls back to default label when neither ariaLabel nor caption is set', async (): Promise<void> => {
      const fixture: ComponentFixture<NoLabelHost> = await setup(NoLabelHost);
      const table: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        'table[role="treegrid"]',
      );
      expect(table?.getAttribute('aria-label')).toBe('Tree table');
    });
  });

  // ─── Row role and level ────────────────────────────────────────────────────

  describe('row ARIA roles and aria-level', (): void => {
    it('every visible body row has role="row"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      bodyRows(fixture).forEach((row: HTMLElement): void => {
        expect(row.getAttribute('role')).toBe('row');
      });
    });

    it('root-level rows have aria-level="1"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      // Documents, Pictures, Downloads are at level 1
      const levelOneRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-level') === '1',
      );
      expect(levelOneRows.length).toBe(3);
    });

    it('direct children of an expanded parent have aria-level="2"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const levelTwoRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-level') === '2',
      );
      // Invoice.pdf and Reports are level 2 children of Documents
      expect(levelTwoRows.length).toBe(2);
    });

    it('grandchildren have aria-level="3"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const levelThreeRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-level') === '3',
      );
      // Q1.pdf is the only level 3 row
      expect(levelThreeRows.length).toBe(1);
    });
  });

  // ─── aria-expanded ─────────────────────────────────────────────────────────

  describe('aria-expanded', (): void => {
    it('expanded parent row has aria-expanded="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const docsRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'docs',
      ) as HTMLElement;
      expect(docsRow.getAttribute('aria-expanded')).toBe('true');
    });

    it('collapsed parent row has aria-expanded="false"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const picsRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'pics',
      ) as HTMLElement;
      expect(picsRow.getAttribute('aria-expanded')).toBe('false');
    });

    it('leaf row has no aria-expanded attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const leafRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'invoice',
      ) as HTMLElement;
      expect(leafRow.getAttribute('aria-expanded')).toBeNull();
    });

    it('expanding a node changes aria-expanded to "true"', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedRootHost> = await setup(CollapsedRootHost);
      const toggle: HTMLElement = root(fixture).querySelector(
        '.uilib-tree-table-toggle',
      ) as HTMLElement;
      toggle.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const rows: HTMLElement[] = bodyRows(fixture);
      expect(rows[0]?.getAttribute('aria-expanded')).toBe('true');
    });

    it('collapsing a node changes aria-expanded to "false"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const docsRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'docs',
      ) as HTMLElement;
      // Documents is expanded — find its toggle
      const toggle: HTMLElement = docsRow.querySelector('.uilib-tree-table-toggle') as HTMLElement;
      toggle.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const updatedDocsRow: HTMLElement = bodyRows(fixture).find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'docs',
      ) as HTMLElement;
      expect(updatedDocsRow.getAttribute('aria-expanded')).toBe('false');
    });
  });

  // ─── aria-setsize / aria-posinset ─────────────────────────────────────────

  describe('aria-setsize and aria-posinset', (): void => {
    it('root rows have correct aria-setsize (3)', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const rootRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-level') === '1',
      );
      rootRows.forEach((row: HTMLElement): void => {
        expect(row.getAttribute('aria-setsize')).toBe('3');
      });
    });

    it('root rows have sequential aria-posinset starting at 1', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const rootRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-level') === '1',
      );
      const positions: number[] = rootRows.map((row: HTMLElement): number =>
        parseInt(row.getAttribute('aria-posinset') ?? '0', 10),
      );
      expect(positions).toEqual([1, 2, 3]);
    });

    it('children of an expanded parent have correct aria-setsize (2)', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const levelTwoRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-level') === '2',
      );
      levelTwoRows.forEach((row: HTMLElement): void => {
        expect(row.getAttribute('aria-setsize')).toBe('2');
      });
    });

    it('children have sequential aria-posinset starting at 1', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const levelTwoRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-level') === '2',
      );
      const positions: number[] = levelTwoRows.map((row: HTMLElement): number =>
        parseInt(row.getAttribute('aria-posinset') ?? '0', 10),
      );
      expect(positions).toEqual([1, 2]);
    });

    it('a grandchild is the only sibling (aria-setsize=1, aria-posinset=1)', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const q1Row: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'q1',
      ) as HTMLElement;
      expect(q1Row.getAttribute('aria-setsize')).toBe('1');
      expect(q1Row.getAttribute('aria-posinset')).toBe('1');
    });

    it('all visible rows have aria-setsize and aria-posinset attributes', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      bodyRows(fixture).forEach((row: HTMLElement): void => {
        expect(row.getAttribute('aria-setsize')).not.toBeNull();
        expect(row.getAttribute('aria-posinset')).not.toBeNull();
      });
    });
  });

  // ─── Cell roles ────────────────────────────────────────────────────────────

  describe('cell roles', (): void => {
    it('first data cell in each row has role="rowheader"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows.forEach((row: HTMLElement): void => {
        const firstCell: HTMLElement = row.querySelector('td') as HTMLElement;
        expect(firstCell.getAttribute('role')).toBe('rowheader');
      });
    });

    it('non-first data cells have role="gridcell"', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows.forEach((row: HTMLElement): void => {
        const cells: HTMLElement[] = Array.from(row.querySelectorAll<HTMLElement>('td'));
        cells.slice(1).forEach((cell: HTMLElement): void => {
          expect(cell.getAttribute('role')).toBe('gridcell');
        });
      });
    });

    it('checkbox selection column td has role="gridcell"', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxHost> = await setup(CheckboxHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows.forEach((row: HTMLElement): void => {
        const checkboxCell: HTMLElement = row.querySelector(
          '.uilib-tree-table-td-selection',
        ) as HTMLElement;
        expect(checkboxCell.getAttribute('role')).toBe('gridcell');
      });
    });

    it('cells have aria-colindex attributes', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows.forEach((row: HTMLElement): void => {
        const cells: HTMLElement[] = Array.from(row.querySelectorAll<HTMLElement>('td'));
        cells.forEach((cell: HTMLElement): void => {
          const colIndex: string | null = cell.getAttribute('aria-colindex');
          expect(colIndex).not.toBeNull();
          expect(parseInt(colIndex!, 10)).toBeGreaterThan(0);
        });
      });
    });
  });

  // ─── Keyboard navigation ───────────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    it('ArrowDown moves focus to the next visible row', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows[0]!.focus();

      pressKey(rows[0]!, 'ArrowDown');
      fixture.detectChanges();

      expect(document.activeElement).toBe(rows[1]);
    });

    it('ArrowUp moves focus to the previous visible row', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows[1]!.focus();

      pressKey(rows[1]!, 'ArrowUp');
      fixture.detectChanges();

      expect(document.activeElement).toBe(rows[0]);
    });

    it('ArrowDown is clamped at the last row', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const lastRow: HTMLElement = rows[rows.length - 1]!;
      lastRow.focus();

      pressKey(lastRow, 'ArrowDown');
      fixture.detectChanges();

      expect(document.activeElement).toBe(lastRow);
    });

    it('ArrowUp is clamped at the first row', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows[0]!.focus();

      pressKey(rows[0]!, 'ArrowUp');
      fixture.detectChanges();

      expect(document.activeElement).toBe(rows[0]);
    });

    it('ArrowRight on a collapsed parent expands it', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedRootHost> = await setup(CollapsedRootHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const parentRow: HTMLElement = rows[0]!;
      expect(parentRow.getAttribute('aria-expanded')).toBe('false');
      parentRow.focus();

      pressKey(parentRow, 'ArrowRight');
      fixture.detectChanges();
      await fixture.whenStable();

      const updatedRows: HTMLElement[] = bodyRows(fixture);
      expect(updatedRows[0]?.getAttribute('aria-expanded')).toBe('true');
      // Child row now visible
      expect(updatedRows.length).toBe(2);
    });

    it('ArrowRight on an expanded parent moves focus to first child', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      // docs row (index 0) is expanded; its first child (Invoice.pdf) is at index 1
      rows[0]!.focus();
      expect(rows[0]!.getAttribute('aria-expanded')).toBe('true');

      pressKey(rows[0]!, 'ArrowRight');
      fixture.detectChanges();

      expect(document.activeElement).toBe(rows[1]);
    });

    it('ArrowRight on a leaf row does nothing', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const leafRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'invoice',
      ) as HTMLElement;
      leafRow.focus();

      pressKey(leafRow, 'ArrowRight');
      fixture.detectChanges();

      // Focus stays on leaf and row count is unchanged
      expect(document.activeElement).toBe(leafRow);
    });

    it('ArrowLeft on an expanded parent collapses it', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      const docsRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'docs',
      ) as HTMLElement;
      docsRow.focus();
      expect(docsRow.getAttribute('aria-expanded')).toBe('true');

      pressKey(docsRow, 'ArrowLeft');
      fixture.detectChanges();
      await fixture.whenStable();

      const updatedDocsRow: HTMLElement = bodyRows(fixture).find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'docs',
      ) as HTMLElement;
      expect(updatedDocsRow.getAttribute('aria-expanded')).toBe('false');
    });

    it('ArrowLeft on a child row moves focus to the parent', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      // Invoice.pdf (level 2) is at index 1; its parent Documents is at index 0
      const invoiceRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'invoice',
      ) as HTMLElement;
      const docsRow: HTMLElement = rows.find(
        (row: HTMLElement): boolean => row.getAttribute('data-key') === 'docs',
      ) as HTMLElement;
      invoiceRow.focus();

      pressKey(invoiceRow, 'ArrowLeft');
      fixture.detectChanges();

      expect(document.activeElement).toBe(docsRow);
    });

    it('ArrowLeft on a root-level collapsed node does nothing', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedRootHost> = await setup(CollapsedRootHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows[0]!.focus();
      expect(rows[0]!.getAttribute('aria-level')).toBe('1');

      pressKey(rows[0]!, 'ArrowLeft');
      fixture.detectChanges();

      expect(document.activeElement).toBe(rows[0]);
    });

    it('Home moves focus to the first row', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows[rows.length - 1]!.focus();

      pressKey(rows[rows.length - 1]!, 'Home');
      fixture.detectChanges();

      expect(document.activeElement).toBe(rows[0]);
    });

    it('End moves focus to the last row', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const rows: HTMLElement[] = bodyRows(fixture);
      rows[0]!.focus();

      pressKey(rows[0]!, 'End');
      fixture.detectChanges();

      expect(document.activeElement).toBe(rows[rows.length - 1]);
    });
  });

  // ─── Unique instance IDs ───────────────────────────────────────────────────

  describe('unique instance IDs', (): void => {
    it('each tree-table instance has a unique instanceId', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoInstancesHost> = await setup(TwoInstancesHost);
      const components: TreeTableComponent[] = fixture.debugElement
        .queryAll(By.directive(TreeTableComponent))
        .map(
          (debugEl: { componentInstance: unknown }): TreeTableComponent =>
            debugEl.componentInstance as TreeTableComponent,
        );
      expect(components.length).toBe(2);
      expect(components[0]!.instanceId).not.toBe(components[1]!.instanceId);
    });

    it('instanceId matches expected format', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      const component: TreeTableComponent = fixture.debugElement.query(
        By.directive(TreeTableComponent),
      ).componentInstance as TreeTableComponent;
      expect(component.instanceId).toMatch(/^ui-lib-tree-table-\d+$/);
    });
  });

  // ─── Empty state ───────────────────────────────────────────────────────────

  describe('empty state', (): void => {
    it('renders an empty table without body rows when value is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyHost> = await setup(EmptyHost);
      expect(bodyRows(fixture).length).toBe(0);
    });

    it('empty table still has role="treegrid" with accessible name', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyHost> = await setup(EmptyHost);
      expect(treegrid(fixture).getAttribute('role')).toBe('treegrid');
      expect(treegrid(fixture).getAttribute('aria-label')).toBe('Empty tree table');
    });
  });

  // ─── axe-core automated checks ────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('passes axe for an empty tree table', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyHost> = await setup(EmptyHost);
      await checkA11y(fixture, { rules: SKIP_TREEGRID_RULES });
    });

    it('passes axe for a flat (one-level) tree table', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedRootHost> = await setup(CollapsedRootHost);
      await checkA11y(fixture, { rules: SKIP_TREEGRID_RULES });
    });

    it('passes axe for a fully expanded two-level tree', async (): Promise<void> => {
      const fixture: ComponentFixture<FullTreeHost> = await setup(FullTreeHost);
      await checkA11y(fixture, { rules: SKIP_TREEGRID_RULES });
    });

    it('passes axe for a tree with a collapsed root node', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedRootHost> = await setup(CollapsedRootHost);
      await checkA11y(fixture, { rules: SKIP_TREEGRID_RULES });
    });

    it('passes axe with checkbox selection mode', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxHost> = await setup(CheckboxHost);
      await checkA11y(fixture, { rules: SKIP_TREEGRID_RULES });
    });
  });
});
