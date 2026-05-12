import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { TreeSelect } from './tree-select.component';
import type { TreeNode, TreeSelectSelectionMode } from './tree-select.types';

const TREE_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

const SAMPLE_NODES: TreeNode[] = [
  {
    key: 'documents',
    label: 'Documents',
    expanded: true,
    children: [
      {
        key: 'work',
        label: 'Work',
        expanded: true,
        children: [
          { key: 'expenses', label: 'Expenses.xlsx', leaf: true },
          { key: 'resume', label: 'Resume.docx', leaf: true },
        ],
      },
      {
        key: 'home',
        label: 'Home',
        expanded: true,
        children: [{ key: 'invoices', label: 'Invoices.xlsx', leaf: true }],
      },
    ],
  },
  {
    key: 'pictures',
    label: 'Pictures',
    expanded: false,
    children: [{ key: 'barcelona', label: 'Barcelona.jpg', leaf: true }],
  },
  {
    key: 'music',
    label: 'Music',
    leaf: true,
  },
];

function cloneTreeNodes(): TreeNode[] {
  return JSON.parse(JSON.stringify(SAMPLE_NODES)) as TreeNode[];
}

@Component({
  standalone: true,
  imports: [FormsModule, TreeSelect],
  template: `
    <label id="tree-select-external-label">Tree files</label>
    <ui-lib-tree-select
      [nodes]="nodes()"
      [selectionMode]="selectionMode()"
      [filter]="filter()"
      [showClear]="showClear()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="selection"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TreeSelectA11yHostComponent {
  public readonly nodes: WritableSignal<TreeNode[]> = signal<TreeNode[]>(cloneTreeNodes());
  public readonly selectionMode: WritableSignal<TreeSelectSelectionMode> =
    signal<TreeSelectSelectionMode>('single');
  public readonly filter: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showClear: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>('Choose a file');
  public readonly ariaLabelledBy: WritableSignal<string | null> = signal<string | null>(null);
  public selection: TreeNode | TreeNode[] | null = null;
}

@Component({
  standalone: true,
  imports: [TreeSelect],
  template: `
    <ui-lib-tree-select [nodes]="nodes" ariaLabel="Primary tree" />
    <ui-lib-tree-select [nodes]="nodes" ariaLabel="Secondary tree" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoTreeSelectHostComponent {
  public readonly nodes: TreeNode[] = cloneTreeNodes();
}

async function setup(
  configure?: (host: TreeSelectA11yHostComponent) => void
): Promise<ComponentFixture<TreeSelectA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TreeSelectA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<TreeSelectA11yHostComponent> = TestBed.createComponent(
    TreeSelectA11yHostComponent
  );
  configure?.(fixture.componentInstance);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

async function stabilize(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function rootElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function comboboxElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const element: HTMLElement | null = rootElement(fixture).querySelector('ui-lib-tree-select');
  if (!element) {
    throw new Error('Expected combobox host element');
  }
  return element;
}

function triggerElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const element: HTMLElement | null = rootElement(fixture).querySelector('.ui-lib-tree-select__trigger');
  if (!element) {
    throw new Error('Expected trigger element');
  }
  return element;
}

function panelElement(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return rootElement(fixture).querySelector('.ui-lib-tree-select__panel');
}

function treeElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const element: HTMLElement | null = rootElement(fixture).querySelector('.ui-lib-tree');
  if (!element) {
    throw new Error('Expected tree element');
  }
  return element;
}

function liveRegionElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const element: HTMLElement | null = rootElement(fixture).querySelector(
    '.ui-lib-tree-select__sr-live'
  );
  if (!element) {
    throw new Error('Expected live region element');
  }
  return element;
}

function treeItems(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(rootElement(fixture).querySelectorAll<HTMLElement>('[role="treeitem"]'));
}

function treeItemByLabel(fixture: ComponentFixture<unknown>, label: string): HTMLElement {
  const item: HTMLElement | undefined = treeItems(fixture).find(
    (element: HTMLElement): boolean => (element.getAttribute('data-node-label') ?? '') === label
  );
  if (!item) {
    throw new Error(`Expected tree item with label "${label}"`);
  }
  return item;
}

function checkboxByLabel(fixture: ComponentFixture<unknown>, label: string): HTMLElement {
  const item: HTMLElement = treeItemByLabel(fixture, label);
  const checkbox: HTMLElement | null = item.querySelector('.uilib-tree-node-checkbox');
  if (!checkbox) {
    throw new Error(`Expected checkbox for "${label}"`);
  }
  return checkbox;
}

async function openPanelWithClick(fixture: ComponentFixture<unknown>): Promise<void> {
  triggerElement(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await stabilize(fixture);
}

async function dispatchKey(
  fixture: ComponentFixture<unknown>,
  target: HTMLElement,
  key: string
): Promise<KeyboardEvent> {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  await stabilize(fixture);
  return event;
}

async function focusElement(
  fixture: ComponentFixture<unknown>,
  element: HTMLElement
): Promise<void> {
  element.focus();
  await stabilize(fixture);
}

describe('TreeSelect Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe when closed', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await checkA11y(fixture, { rules: TREE_AXE_RULES });
    });

    it('passes axe when open', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      await checkA11y(fixture, { rules: TREE_AXE_RULES });
    });

    it('passes axe in checkbox + filter mode', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup(
        (host: TreeSelectA11yHostComponent): void => {
          host.selectionMode.set('checkbox');
          host.filter.set(true);
        }
      );
      await openPanelWithClick(fixture);
      await checkA11y(fixture, { rules: TREE_AXE_RULES });
    });
  });

  describe('ARIA structure', (): void => {
    it('exposes role="combobox" on the host', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      expect(comboboxElement(fixture).getAttribute('role')).toBe('combobox');
    });

    it('uses aria-haspopup="tree" on the host', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      expect(comboboxElement(fixture).getAttribute('aria-haspopup')).toBe('tree');
    });

    it('toggles aria-expanded on the host', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      expect(comboboxElement(fixture).getAttribute('aria-expanded')).toBe('false');
      await openPanelWithClick(fixture);
      expect(comboboxElement(fixture).getAttribute('aria-expanded')).toBe('true');
    });

    it('points aria-controls to the popup tree id', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const controlledId: string | null = comboboxElement(fixture).getAttribute('aria-controls');
      expect(controlledId).toBeTruthy();
      expect(treeElement(fixture).id).toBe(controlledId);
    });

    it('renders a tree popup with role="tree"', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      expect(treeElement(fixture).getAttribute('role')).toBe('tree');
    });

    it('applies aria-label to the popup tree', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      expect(treeElement(fixture).getAttribute('aria-label')).toBe('Choose a file');
    });

    it('uses aria-labelledby on the host when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup(
        (host: TreeSelectA11yHostComponent): void => {
          host.ariaLabel.set(null);
          host.ariaLabelledBy.set('tree-select-external-label');
        }
      );
      expect(comboboxElement(fixture).getAttribute('aria-labelledby')).toBe(
        'tree-select-external-label'
      );
    });

    it('renders role="group" on nested tree lists', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const groups: HTMLElement[] = Array.from(
        rootElement(fixture).querySelectorAll<HTMLElement>('.uilib-tree-children')
      );
      expect(groups.length).toBeGreaterThan(0);
      groups.forEach((group: HTMLElement): void => {
        expect(group.getAttribute('role')).toBe('group');
      });
    });

    it('sets aria-level on nested nodes', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      expect(treeItemByLabel(fixture, 'Documents').getAttribute('aria-level')).toBe('1');
      expect(treeItemByLabel(fixture, 'Work').getAttribute('aria-level')).toBe('2');
      expect(treeItemByLabel(fixture, 'Expenses.xlsx').getAttribute('aria-level')).toBe('3');
    });

    it('sets aria-setsize within each sibling group', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      expect(treeItemByLabel(fixture, 'Documents').getAttribute('aria-setsize')).toBe('3');
      expect(treeItemByLabel(fixture, 'Work').getAttribute('aria-setsize')).toBe('2');
      expect(treeItemByLabel(fixture, 'Expenses.xlsx').getAttribute('aria-setsize')).toBe('2');
    });

    it('sets aria-posinset within each sibling group', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      expect(treeItemByLabel(fixture, 'Documents').getAttribute('aria-posinset')).toBe('1');
      expect(treeItemByLabel(fixture, 'Pictures').getAttribute('aria-posinset')).toBe('2');
      expect(treeItemByLabel(fixture, 'Home').getAttribute('aria-posinset')).toBe('2');
    });

    it('sets aria-expanded on branches and omits it on leaves', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      expect(treeItemByLabel(fixture, 'Documents').getAttribute('aria-expanded')).toBe('true');
      expect(treeItemByLabel(fixture, 'Pictures').getAttribute('aria-expanded')).toBe('false');
      expect(treeItemByLabel(fixture, 'Music').getAttribute('aria-expanded')).toBeNull();
    });

    it('sets aria-selected in single-select mode', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup(
        (host: TreeSelectA11yHostComponent): void => {
          host.selection = cloneTreeNodes()[0]?.children?.[0] ?? null;
        }
      );
      await openPanelWithClick(fixture);
      expect(treeItemByLabel(fixture, 'Work').getAttribute('aria-selected')).toBe('true');
    });

    it('sets aria-multiselectable in checkbox mode', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup(
        (host: TreeSelectA11yHostComponent): void => {
          host.selectionMode.set('checkbox');
        }
      );
      await openPanelWithClick(fixture);
      expect(treeElement(fixture).getAttribute('aria-multiselectable')).toBe('true');
    });

    it('sets aria-checked on treeitems in checkbox mode', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup(
        (host: TreeSelectA11yHostComponent): void => {
          host.selectionMode.set('checkbox');
        }
      );
      await openPanelWithClick(fixture);
      checkboxByLabel(fixture, 'Expenses.xlsx').click();
      await stabilize(fixture);
      expect(treeItemByLabel(fixture, 'Expenses.xlsx').getAttribute('aria-checked')).toBe('true');
      expect(treeItemByLabel(fixture, 'Work').getAttribute('aria-checked')).toBe('mixed');
    });

    it('keeps decorative icons hidden from assistive tech', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const chevron: HTMLElement | null = rootElement(fixture).querySelector(
        '.ui-lib-tree-select__chevron'
      );
      const toggleIcon: HTMLElement | null = rootElement(fixture).querySelector('.uilib-tree-toggle-icon');
      expect(chevron?.getAttribute('aria-hidden')).toBe('true');
      expect(toggleIcon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('labels the clear button when rendered', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup(
        (host: TreeSelectA11yHostComponent): void => {
          host.showClear.set(true);
          host.selection = cloneTreeNodes()[0] ?? null;
        }
      );
      await stabilize(fixture);
      const clearButton: HTMLButtonElement | null = rootElement(fixture).querySelector(
        '.ui-lib-tree-select__clear'
      );
      expect(clearButton?.getAttribute('aria-label')).toBe('Clear selection');
    });

    it('renders a polite live region for selection announcements', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      expect(liveRegionElement(fixture).getAttribute('aria-live')).toBe('polite');
      expect(liveRegionElement(fixture).getAttribute('aria-atomic')).toBe('true');
      expect(liveRegionElement(fixture).textContent.trim()).toBe('No item selected');
    });

    it('updates the live region text when selection changes', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      treeItemByLabel(fixture, 'Work').click();
      await stabilize(fixture);
      expect(liveRegionElement(fixture).textContent.trim()).toBe('Work selected');
    });

    it('generates unique ids for multiple instances', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [TwoTreeSelectHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<TwoTreeSelectHostComponent> =
        TestBed.createComponent(TwoTreeSelectHostComponent);
      document.body.appendChild(fixture.nativeElement);
      await stabilize(fixture);
      const hosts: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-tree-select')
      );
      expect(hosts[0]?.id).not.toBe(hosts[1]?.id);
    });
  });

  describe('keyboard and focus management', (): void => {
    it('opens with Enter and moves focus into the tree', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      comboboxElement(fixture).focus();
      await dispatchKey(fixture, comboboxElement(fixture), 'Enter');
      expect(panelElement(fixture)).toBeTruthy();
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Documents'));
    });

    it('opens with ArrowDown and moves focus into the tree', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      comboboxElement(fixture).focus();
      await dispatchKey(fixture, comboboxElement(fixture), 'ArrowDown');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Documents'));
    });

    it('moves focus to the filter input when filter mode is enabled', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup(
        (host: TreeSelectA11yHostComponent): void => {
          host.filter.set(true);
        }
      );
      await openPanelWithClick(fixture);
      const filterInput: HTMLInputElement | null = rootElement(fixture).querySelector(
        '.uilib-tree-filter-input'
      );
      expect(document.activeElement).toBe(filterInput);
    });

    it('closes with Escape and restores focus to the combobox', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const documents: HTMLElement = treeItemByLabel(fixture, 'Documents');
      documents.focus();
      await dispatchKey(fixture, documents, 'Escape');
      expect(panelElement(fixture)).toBeNull();
      expect(document.activeElement).toBe(comboboxElement(fixture));
    });

    it('closes on Tab from the combobox host', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      comboboxElement(fixture).focus();
      await dispatchKey(fixture, comboboxElement(fixture), 'Enter');
      await dispatchKey(fixture, comboboxElement(fixture), 'Tab');
      expect(panelElement(fixture)).toBeNull();
    });

    it('moves to the next visible tree item with ArrowDown', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const documents: HTMLElement = treeItemByLabel(fixture, 'Documents');
      await focusElement(fixture, documents);
      await dispatchKey(fixture, treeElement(fixture), 'ArrowDown');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Work'));
    });

    it('moves to the previous visible tree item with ArrowUp', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const work: HTMLElement = treeItemByLabel(fixture, 'Work');
      await focusElement(fixture, work);
      await dispatchKey(fixture, work, 'ArrowUp');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Documents'));
    });

    it('moves to the first visible item with Home', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const music: HTMLElement = treeItemByLabel(fixture, 'Music');
      await focusElement(fixture, music);
      await dispatchKey(fixture, music, 'Home');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Documents'));
    });

    it('moves to the last visible item with End', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const documents: HTMLElement = treeItemByLabel(fixture, 'Documents');
      await focusElement(fixture, documents);
      await dispatchKey(fixture, documents, 'End');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Music'));
    });

    it('expands a collapsed branch with ArrowRight', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const pictures: HTMLElement = treeItemByLabel(fixture, 'Pictures');
      await focusElement(fixture, pictures);
      await dispatchKey(fixture, pictures, 'ArrowRight');
      expect(treeItemByLabel(fixture, 'Pictures').getAttribute('aria-expanded')).toBe('true');
    });

    it('focuses the first child with ArrowRight on an expanded branch', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const documents: HTMLElement = treeItemByLabel(fixture, 'Documents');
      await focusElement(fixture, documents);
      await dispatchKey(fixture, documents, 'ArrowRight');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Work'));
    });

    it('collapses an expanded branch with ArrowLeft', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const documents: HTMLElement = treeItemByLabel(fixture, 'Documents');
      await focusElement(fixture, documents);
      await dispatchKey(fixture, documents, 'ArrowLeft');
      expect(treeItemByLabel(fixture, 'Documents').getAttribute('aria-expanded')).toBe('false');
    });

    it('moves focus to the parent with ArrowLeft on a leaf node', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const expenses: HTMLElement = treeItemByLabel(fixture, 'Expenses.xlsx');
      await focusElement(fixture, expenses);
      await dispatchKey(fixture, expenses, 'ArrowLeft');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Work'));
    });

    it('supports type-ahead navigation', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      await openPanelWithClick(fixture);
      const documents: HTMLElement = treeItemByLabel(fixture, 'Documents');
      await focusElement(fixture, documents);
      await dispatchKey(fixture, documents, 'p');
      expect(document.activeElement).toBe(treeItemByLabel(fixture, 'Pictures'));
    });

    it('closes after single selection and restores focus to the combobox', async (): Promise<void> => {
      const fixture: ComponentFixture<TreeSelectA11yHostComponent> = await setup();
      comboboxElement(fixture).focus();
      await dispatchKey(fixture, comboboxElement(fixture), 'Enter');
      treeItemByLabel(fixture, 'Work').click();
      await stabilize(fixture);
      expect(panelElement(fixture)).toBeNull();
      expect(document.activeElement).toBe(comboboxElement(fixture));
    });
  });
});
