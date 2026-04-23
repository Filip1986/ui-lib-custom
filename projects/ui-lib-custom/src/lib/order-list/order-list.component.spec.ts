import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrderListComponent } from './order-list.component';
import type {
  OrderListControlsPosition,
  OrderListFilterMatchMode,
  OrderListReorderEvent,
  OrderListSelectionChangeEvent,
  OrderListSize,
  OrderListVariant,
} from './order-list.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface Fruit {
  id: number;
  name: string;
}

const FRUITS: Fruit[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Date' },
  { id: 5, name: 'Elderberry' },
];

function getFruit(index: number): Fruit {
  const fruit: Fruit | undefined = FRUITS[index];
  if (fruit === undefined) {
    throw new Error(`Expected FRUITS[${index}] to exist`);
  }
  return fruit;
}

function getOrderListItemElement(
  fixture: ComponentFixture<OrderListHostComponent>,
  index: number
): HTMLElement {
  const itemElement: HTMLElement | undefined = rootEl(fixture).querySelectorAll<HTMLElement>(
    '.ui-lib-order-list__item'
  )[index];
  if (itemElement === undefined) {
    throw new Error(`Expected order-list item element at index ${index}`);
  }
  return itemElement;
}

function getValueFruit(component: OrderListComponent, index: number): Fruit {
  const valueItem: unknown = component.value()[index];
  if (valueItem === undefined) {
    throw new Error(`Expected value item at index ${index}`);
  }
  return valueItem as Fruit;
}

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [OrderListComponent],
  template: `
    <ui-lib-order-list
      [value]="value()"
      (valueChange)="value.set($any($event))"
      [selection]="selection()"
      (selectionChange)="selection.set($any($event))"
      [header]="header()"
      [filterBy]="filterBy()"
      [filterPlaceholder]="filterPlaceholder()"
      [filterMatchMode]="filterMatchMode()"
      [dragDrop]="dragDrop()"
      [disabled]="disabled()"
      [metaKeySelection]="metaKeySelection()"
      [stripedRows]="stripedRows()"
      [controlsPosition]="controlsPosition()"
      [variant]="variant()"
      [size]="size()"
      [trackBy]="trackBy()"
      [styleClass]="styleClass()"
      (reordered)="onReordered($event)"
      (selectionChanged)="onSelectionChanged($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OrderListHostComponent {
  public value: WritableSignal<unknown[]> = signal<unknown[]>([...FRUITS]);
  public selection: WritableSignal<unknown[]> = signal<unknown[]>([]);
  public header: WritableSignal<string | null> = signal<string | null>(null);
  public filterBy: WritableSignal<string | null> = signal<string | null>(null);
  public filterPlaceholder: WritableSignal<string> = signal<string>('Filter');
  public filterMatchMode: WritableSignal<OrderListFilterMatchMode> =
    signal<OrderListFilterMatchMode>('contains');
  public dragDrop: WritableSignal<boolean> = signal<boolean>(false);
  public disabled: WritableSignal<boolean> = signal<boolean>(false);
  public metaKeySelection: WritableSignal<boolean> = signal<boolean>(false);
  public stripedRows: WritableSignal<boolean> = signal<boolean>(false);
  public controlsPosition: WritableSignal<OrderListControlsPosition> =
    signal<OrderListControlsPosition>('left');
  public variant: WritableSignal<OrderListVariant | null> = signal<OrderListVariant | null>(
    'material'
  );
  public size: WritableSignal<OrderListSize> = signal<OrderListSize>('md');
  public trackBy: WritableSignal<string | null> = signal<string | null>(null);
  public styleClass: WritableSignal<string | null> = signal<string | null>(null);

  public reorderedEvents: OrderListReorderEvent[] = [];
  public selectionChangedEvents: OrderListSelectionChangeEvent[] = [];

  public onReordered(event: OrderListReorderEvent): void {
    this.reorderedEvents.push(event);
  }
  public onSelectionChanged(event: OrderListSelectionChangeEvent): void {
    this.selectionChangedEvents.push(event);
  }
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

function createFixture(): ComponentFixture<OrderListHostComponent> {
  TestBed.configureTestingModule({
    imports: [OrderListHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<OrderListHostComponent> =
    TestBed.createComponent(OrderListHostComponent);
  fixture.detectChanges();
  return fixture;
}

function rootEl(fixture: ComponentFixture<OrderListHostComponent>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('OrderListComponent', (): void => {
  let fixture: ComponentFixture<OrderListHostComponent>;
  let host: OrderListHostComponent;
  let component: OrderListComponent;

  beforeEach((): void => {
    fixture = createFixture();
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(OrderListComponent))
      .componentInstance as OrderListComponent;
  });

  // -------------------------------------------------------------------------
  // Initialisation
  // -------------------------------------------------------------------------

  describe('initialisation', (): void => {
    it('should create', (): void => {
      expect(component).toBeTruthy();
    });

    it('should render all items', (): void => {
      const items: NodeListOf<Element> = rootEl(fixture).querySelectorAll(
        '.ui-lib-order-list__item'
      );
      expect(items.length).toBe(FRUITS.length);
    });

    it('should apply base host class', (): void => {
      const hostEl: Element | null = rootEl(fixture).querySelector('.ui-lib-order-list');
      expect(hostEl).toBeTruthy();
    });
  });

  // -------------------------------------------------------------------------
  // Host classes
  // -------------------------------------------------------------------------

  describe('hostClasses()', (): void => {
    it('should include variant class', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('ui-lib-order-list--bootstrap');
    });

    it('should include size class', (): void => {
      host.size.set('lg');
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('ui-lib-order-list--lg');
    });

    it('should include controls-position class', (): void => {
      host.controlsPosition.set('top');
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('ui-lib-order-list--controls-top');
    });

    it('should include disabled class when disabled', (): void => {
      host.disabled.set(true);
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('ui-lib-order-list--disabled');
    });

    it('should include striped class when stripedRows is true', (): void => {
      host.stripedRows.set(true);
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('ui-lib-order-list--striped');
    });

    it('should include dragdrop class when dragDrop is true', (): void => {
      host.dragDrop.set(true);
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('ui-lib-order-list--dragdrop');
    });

    it('should include custom styleClass', (): void => {
      host.styleClass.set('my-custom-class');
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('my-custom-class');
    });
  });

  // -------------------------------------------------------------------------
  // Header
  // -------------------------------------------------------------------------

  describe('header', (): void => {
    it('should not render header by default', (): void => {
      const header: Element | null = rootEl(fixture).querySelector('.ui-lib-order-list__header');
      expect(header).toBeNull();
    });

    it('should render header text when provided', (): void => {
      host.header.set('My List');
      fixture.detectChanges();
      const header: Element | null = rootEl(fixture).querySelector('.ui-lib-order-list__header');
      expect(header?.textContent).toContain('My List');
    });
  });

  // -------------------------------------------------------------------------
  // Filter
  // -------------------------------------------------------------------------

  describe('filter', (): void => {
    beforeEach((): void => {
      host.filterBy.set('name');
      fixture.detectChanges();
    });

    it('should render filter input when filterBy is set', (): void => {
      const input: Element | null = rootEl(fixture).querySelector(
        '.ui-lib-order-list__filter-input'
      );
      expect(input).toBeTruthy();
    });

    it('should filter items by query (contains)', (): void => {
      component.filterQuery.set('an');
      fixture.detectChanges();
      // apple=no, banana=yes, cherry=no, date=no, elderberry=no → 1 item
      expect(component.displayItems().length).toBe(1);
      expect((component.displayItems()[0] as Fruit).name).toBe('Banana');
    });

    it('should filter using startsWith mode', (): void => {
      host.filterMatchMode.set('startsWith');
      fixture.detectChanges();
      component.filterQuery.set('cher');
      fixture.detectChanges();
      expect(component.displayItems().length).toBe(1);
      expect((component.displayItems()[0] as Fruit).name).toBe('Cherry');
    });

    it('should filter using endsWith mode', (): void => {
      host.filterMatchMode.set('endsWith');
      fixture.detectChanges();
      component.filterQuery.set('erry');
      fixture.detectChanges();
      // Cherry, Elderberry → 2
      expect(component.displayItems().length).toBe(2);
    });

    it('should filter using equals mode', (): void => {
      host.filterMatchMode.set('equals');
      fixture.detectChanges();
      component.filterQuery.set('apple');
      fixture.detectChanges();
      expect(component.displayItems().length).toBe(1);
      expect((component.displayItems()[0] as Fruit).name).toBe('Apple');
    });

    it('should return full list when query is empty', (): void => {
      component.filterQuery.set('');
      fixture.detectChanges();
      expect(component.displayItems().length).toBe(FRUITS.length);
    });

    it('isEmptyDueToFilter should be true when filter matches nothing', (): void => {
      component.filterQuery.set('zzz');
      fixture.detectChanges();
      expect(component.isEmptyDueToFilter()).toBe(true);
    });

    it('emptyContext should expose filter=true when list is empty due to filter', (): void => {
      component.filterQuery.set('zzz');
      fixture.detectChanges();
      expect(component.emptyContext()).toEqual({ filter: true });
    });

    it('onFilterInput should set query and emit filtered payload', (): void => {
      const emitSpy: jest.SpyInstance = jest.spyOn(component.filtered, 'emit');
      const inputElement: HTMLInputElement = document.createElement('input');
      inputElement.value = 'berry';

      component.onFilterInput({ target: inputElement } as unknown as Event);

      expect(component.filterQuery()).toBe('berry');
      expect(emitSpy).toHaveBeenCalled();
      const firstCall: unknown[] | undefined = (emitSpy.mock.calls as unknown[][])[0];
      const firstArg: Record<string, unknown> = (firstCall?.[0] ?? {}) as Record<string, unknown>;
      expect(firstArg['query']).toBe('berry');
      expect(Array.isArray(firstArg['filteredItems'])).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // resolveProperty
  // -------------------------------------------------------------------------

  describe('resolveProperty()', (): void => {
    it('should resolve a top-level property', (): void => {
      expect(component.resolveProperty({ name: 'Alice' }, 'name')).toBe('alice');
    });

    it('should resolve a nested property path', (): void => {
      expect(component.resolveProperty({ address: { city: 'Berlin' } }, 'address.city')).toBe(
        'berlin'
      );
    });

    it('should return empty string for missing path', (): void => {
      expect(component.resolveProperty({}, 'missing.path')).toBe('');
    });
  });

  // -------------------------------------------------------------------------
  // Selection
  // -------------------------------------------------------------------------

  describe('selection', (): void => {
    it('isSelected() should return false initially', (): void => {
      expect(component.isSelected(FRUITS[0])).toBe(false);
    });

    it('should toggle item into selection on click (toggle mode)', (): void => {
      const firstItem: HTMLElement = getOrderListItemElement(fixture, 0);
      firstItem.click();
      fixture.detectChanges();
      expect(component.selection()).toContain(FRUITS[0]);
    });

    it('should toggle item out of selection on second click (toggle mode)', (): void => {
      component.selection.set([FRUITS[0]]);
      fixture.detectChanges();
      const firstItem: HTMLElement = getOrderListItemElement(fixture, 0);
      firstItem.click();
      fixture.detectChanges();
      expect(component.selection()).not.toContain(FRUITS[0]);
    });

    it('should select single item with meta key (metaKeySelection mode)', (): void => {
      host.metaKeySelection.set(true);
      fixture.detectChanges();
      const mouseEvent: MouseEvent = new MouseEvent('click', { ctrlKey: true, bubbles: true });
      const itemEl: HTMLElement = getOrderListItemElement(fixture, 0);
      itemEl.dispatchEvent(mouseEvent);
      fixture.detectChanges();
      expect(component.selection()).toContain(FRUITS[0]);
    });

    it('should replace selection when clicking without meta key (metaKeySelection mode)', (): void => {
      host.metaKeySelection.set(true);
      component.selection.set([FRUITS[1]]);
      fixture.detectChanges();
      const itemEl: HTMLElement = getOrderListItemElement(fixture, 0);
      itemEl.click();
      fixture.detectChanges();
      expect(component.selection()).toEqual([FRUITS[0]]);
    });

    it('should emit selectionChanged output', (): void => {
      const spy: jest.SpyInstance = jest.spyOn(component.selectionChanged, 'emit');
      const itemEl: HTMLElement = getOrderListItemElement(fixture, 0);
      itemEl.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      const firstCall: unknown[] | undefined = (spy.mock.calls as unknown[][])[0];
      const firstArg: Record<string, unknown> = (firstCall?.[0] ?? {}) as Record<string, unknown>;
      expect(firstArg['value']).toEqual(expect.arrayContaining([FRUITS[0]]));
    });

    it('should not update selection when disabled', (): void => {
      host.disabled.set(true);
      fixture.detectChanges();
      const itemEl: HTMLElement = getOrderListItemElement(fixture, 0);
      itemEl.click();
      fixture.detectChanges();
      expect(component.selection()).toEqual([]);
    });

    it('isSelected() with trackBy should match by key', (): void => {
      host.trackBy.set('id');
      fixture.detectChanges();
      const copy: Fruit = { ...getFruit(0) }; // Different reference, same id
      component.selection.set([FRUITS[0]]);
      expect(component.isSelected(copy)).toBe(true);
    });

    it('should support shift range selection in metaKeySelection mode', (): void => {
      host.metaKeySelection.set(true);
      fixture.detectChanges();

      const firstItem: HTMLElement = getOrderListItemElement(fixture, 0);
      const fourthItem: HTMLElement = getOrderListItemElement(fixture, 3);

      firstItem.click();
      fixture.detectChanges();

      fourthItem.dispatchEvent(new MouseEvent('click', { shiftKey: true, bubbles: true }));
      fixture.detectChanges();

      expect(component.selection()).toEqual([getFruit(0), getFruit(1), getFruit(2), getFruit(3)]);
    });

    it('should toggle off an item by trackBy key when selection holds a different reference', (): void => {
      host.trackBy.set('id');
      fixture.detectChanges();

      const copiedFruit: Fruit = { ...getFruit(0) };
      component.selection.set([copiedFruit]);
      fixture.detectChanges();

      const firstItem: HTMLElement = getOrderListItemElement(fixture, 0);
      firstItem.click();
      fixture.detectChanges();

      expect(component.selection()).toEqual([]);
    });
  });

  // -------------------------------------------------------------------------
  // isMoveUpDisabled / isMoveDownDisabled
  // -------------------------------------------------------------------------

  describe('move disabled computed signals', (): void => {
    it('isMoveDisabled should be true with no selection', (): void => {
      expect(component.isMoveDisabled()).toBe(true);
    });

    it('isMoveDisabled should be true when disabled', (): void => {
      host.disabled.set(true);
      component.selection.set([FRUITS[0]]);
      fixture.detectChanges();
      expect(component.isMoveDisabled()).toBe(true);
    });

    it('isMoveUpDisabled should be true when first item is selected', (): void => {
      component.selection.set([FRUITS[0]]);
      fixture.detectChanges();
      expect(component.isMoveUpDisabled()).toBe(true);
    });

    it('isMoveUpDisabled should be false when non-first item is selected', (): void => {
      component.selection.set([FRUITS[2]]);
      fixture.detectChanges();
      expect(component.isMoveUpDisabled()).toBe(false);
    });

    it('isMoveDownDisabled should be true when last item is selected', (): void => {
      component.selection.set([FRUITS[FRUITS.length - 1]]);
      fixture.detectChanges();
      expect(component.isMoveDownDisabled()).toBe(true);
    });

    it('isMoveDownDisabled should be false when non-last item is selected', (): void => {
      component.selection.set([FRUITS[1]]);
      fixture.detectChanges();
      expect(component.isMoveDownDisabled()).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Reorder operations
  // -------------------------------------------------------------------------

  describe('moveUp()', (): void => {
    it('should move a selected item up by one position', (): void => {
      component.selection.set([FRUITS[1]]);
      fixture.detectChanges();
      component.moveUp();
      fixture.detectChanges();
      expect(getValueFruit(component, 0).id).toBe(getFruit(1).id);
    });

    it('should not move when first item is selected', (): void => {
      component.selection.set([FRUITS[0]]);
      fixture.detectChanges();
      const originalOrder: unknown[] = [...component.value()];
      component.moveUp();
      expect(component.value()).toEqual(originalOrder);
    });

    it('should emit reordered output', (): void => {
      component.selection.set([FRUITS[2]]);
      fixture.detectChanges();
      const spy: jest.SpyInstance = jest.spyOn(component.reordered, 'emit');
      component.moveUp();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('moveDown()', (): void => {
    it('should move a selected item down by one position', (): void => {
      component.selection.set([FRUITS[0]]);
      fixture.detectChanges();
      component.moveDown();
      fixture.detectChanges();
      expect(getValueFruit(component, 1).id).toBe(getFruit(0).id);
    });

    it('should not move when last item is selected', (): void => {
      const last: Fruit = getFruit(FRUITS.length - 1);
      component.selection.set([last]);
      fixture.detectChanges();
      const originalOrder: unknown[] = [...component.value()];
      component.moveDown();
      expect(component.value()).toEqual(originalOrder);
    });
  });

  describe('moveTop()', (): void => {
    it('should move selected item to the first position', (): void => {
      component.selection.set([FRUITS[3]]);
      fixture.detectChanges();
      component.moveTop();
      fixture.detectChanges();
      expect(getValueFruit(component, 0).id).toBe(getFruit(3).id);
    });

    it('should preserve relative order of multiple selected items', (): void => {
      component.selection.set([FRUITS[2], FRUITS[4]]);
      fixture.detectChanges();
      component.moveTop();
      fixture.detectChanges();
      expect(getValueFruit(component, 0).id).toBe(getFruit(2).id);
      expect(getValueFruit(component, 1).id).toBe(getFruit(4).id);
    });
  });

  describe('moveBottom()', (): void => {
    it('should move selected item to the last position', (): void => {
      component.selection.set([FRUITS[0]]);
      fixture.detectChanges();
      component.moveBottom();
      fixture.detectChanges();
      expect(getValueFruit(component, component.value().length - 1).id).toBe(getFruit(0).id);
    });

    it('should preserve relative order of multiple selected items', (): void => {
      component.selection.set([FRUITS[0], FRUITS[2]]);
      fixture.detectChanges();
      component.moveBottom();
      fixture.detectChanges();
      const last: number = component.value().length - 1;
      expect(getValueFruit(component, last - 1).id).toBe(getFruit(0).id);
      expect(getValueFruit(component, last).id).toBe(getFruit(2).id);
    });
  });

  // -------------------------------------------------------------------------
  // Control buttons
  // -------------------------------------------------------------------------

  describe('control buttons', (): void => {
    it('move-up button should be disabled when no selection', (): void => {
      const buttons: NodeListOf<HTMLButtonElement> = rootEl(
        fixture
      ).querySelectorAll<HTMLButtonElement>('.ui-lib-order-list__control-btn');
      // First two buttons are move-top and move-up — both disabled when no selection
      expect(buttons[1]?.disabled).toBe(true);
    });

    it('clicking move-up button should reorder', (): void => {
      // Set selection directly on component model
      component.selection.set([FRUITS[2]]);
      fixture.detectChanges();
      // Buttons: index 0=moveTop, 1=moveUp, 2=moveDown, 3=moveBottom
      const buttons: NodeListOf<HTMLButtonElement> = rootEl(
        fixture
      ).querySelectorAll<HTMLButtonElement>('.ui-lib-order-list__control-btn');
      buttons[1]?.click();
      fixture.detectChanges();
      expect(getValueFruit(component, 1).id).toBe(getFruit(2).id);
    });
  });

  // -------------------------------------------------------------------------
  // Keyboard navigation
  // -------------------------------------------------------------------------

  describe('keyboard navigation', (): void => {
    let listboxEl: HTMLElement;

    beforeEach((): void => {
      listboxEl = rootEl(fixture).querySelector<HTMLElement>('[role="listbox"]') as HTMLElement;
    });

    function dispatchKey(key: string, extra: Partial<KeyboardEventInit> = {}): void {
      listboxEl.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...extra }));
      fixture.detectChanges();
    }

    it('ArrowDown should advance focusedIndex', (): void => {
      component.focusedIndex.set(0);
      dispatchKey('ArrowDown');
      expect(component.focusedIndex()).toBe(1);
    });

    it('ArrowUp should decrement focusedIndex', (): void => {
      component.focusedIndex.set(2);
      dispatchKey('ArrowUp');
      expect(component.focusedIndex()).toBe(1);
    });

    it('ArrowDown from last item wraps to first', (): void => {
      component.focusedIndex.set(FRUITS.length - 1);
      dispatchKey('ArrowDown');
      expect(component.focusedIndex()).toBe(0);
    });

    it('ArrowUp from first item wraps to last', (): void => {
      component.focusedIndex.set(0);
      dispatchKey('ArrowUp');
      expect(component.focusedIndex()).toBe(FRUITS.length - 1);
    });

    it('Home should focus first item', (): void => {
      component.focusedIndex.set(3);
      dispatchKey('Home');
      expect(component.focusedIndex()).toBe(0);
    });

    it('End should focus last item', (): void => {
      component.focusedIndex.set(0);
      dispatchKey('End');
      expect(component.focusedIndex()).toBe(FRUITS.length - 1);
    });

    it('Space should toggle selection of focused item', (): void => {
      component.focusedIndex.set(1);
      dispatchKey(' ');
      expect(component.selection()).toContain(FRUITS[1]);
    });

    it('Enter should toggle selection of focused item', (): void => {
      component.focusedIndex.set(2);
      dispatchKey('Enter');
      expect(component.selection()).toContain(FRUITS[2]);
    });

    it('Escape should clear selection', (): void => {
      component.selection.set([FRUITS[0], FRUITS[1]]);
      fixture.detectChanges();
      dispatchKey('Escape');
      expect(component.selection()).toEqual([]);
    });

    it('Ctrl+A should select all visible items', (): void => {
      dispatchKey('a', { ctrlKey: true });
      expect(component.selection().length).toBe(FRUITS.length);
    });

    it('Alt+ArrowUp should move selected items up', (): void => {
      component.selection.set([FRUITS[1]]);
      component.focusedIndex.set(1);
      fixture.detectChanges();
      dispatchKey('ArrowUp', { altKey: true });
      expect(getValueFruit(component, 0).id).toBe(getFruit(1).id);
    });

    it('Alt+ArrowDown should move selected items down', (): void => {
      component.selection.set([FRUITS[0]]);
      component.focusedIndex.set(0);
      fixture.detectChanges();
      dispatchKey('ArrowDown', { altKey: true });
      expect(getValueFruit(component, 1).id).toBe(getFruit(0).id);
    });

    it('Alt+Home should move selected items to top', (): void => {
      component.selection.set([FRUITS[3]]);
      component.focusedIndex.set(3);
      fixture.detectChanges();
      dispatchKey('Home', { altKey: true });
      expect(getValueFruit(component, 0).id).toBe(getFruit(3).id);
    });

    it('Alt+End should move selected items to bottom', (): void => {
      component.selection.set([FRUITS[0]]);
      component.focusedIndex.set(0);
      fixture.detectChanges();
      dispatchKey('End', { altKey: true });
      expect(getValueFruit(component, component.value().length - 1).id).toBe(getFruit(0).id);
    });

    it('should not process keyboard events when disabled', (): void => {
      host.disabled.set(true);
      fixture.detectChanges();
      component.focusedIndex.set(0);
      dispatchKey('ArrowDown');
      expect(component.focusedIndex()).toBe(0);
    });
  });

  // -------------------------------------------------------------------------
  // itemId
  // -------------------------------------------------------------------------

  describe('itemId()', (): void => {
    it('should return stable unique id string', (): void => {
      const id0: string = component.itemId(0);
      const id1: string = component.itemId(1);
      expect(id0).toContain('item-0');
      expect(id1).toContain('item-1');
      expect(id0).not.toBe(id1);
    });
  });

  // -------------------------------------------------------------------------
  // Drag & drop
  // -------------------------------------------------------------------------

  describe('drag and drop', (): void => {
    /** Creates a minimal DragEvent-like object compatible with the jsdom environment. */
    function fakeDragEvent(type: string, extra: Partial<DragEvent> = {}): DragEvent {
      return {
        type,
        preventDefault: jest.fn(),
        dataTransfer: null,
        ...extra,
      } as unknown as DragEvent;
    }

    beforeEach((): void => {
      host.dragDrop.set(true);
      fixture.detectChanges();
    });

    it('onDragStart should set draggedIndex', (): void => {
      const mockDataTransfer: DataTransfer = {
        effectAllowed: '',
        setData: jest.fn(),
      } as unknown as DataTransfer;
      const event: DragEvent = fakeDragEvent('dragstart', {
        dataTransfer: mockDataTransfer,
      });
      component.onDragStart(event, 0);
      expect(component.draggedIndex()).toBe(0);
    });

    it('onDragEnd should clear dragState', (): void => {
      component.draggedIndex.set(1);
      component.dragOverIndex.set(2);
      component.onDragEnd(fakeDragEvent('dragend'));
      expect(component.draggedIndex()).toBeNull();
      expect(component.dragOverIndex()).toBeNull();
    });

    it('onDragOver should set drag position to before when pointer is in top half', (): void => {
      const dropEffectStore: { value: string } = { value: '' };
      const dragTarget: HTMLElement = document.createElement('div');
      dragTarget.getBoundingClientRect = (): DOMRect => ({ top: 100, height: 40 }) as DOMRect;
      const event: DragEvent = fakeDragEvent('dragover', {
        dataTransfer: {
          get dropEffect(): string {
            return dropEffectStore.value;
          },
          set dropEffect(value: string) {
            dropEffectStore.value = value;
          },
        } as unknown as DataTransfer,
        clientY: 105,
        currentTarget: dragTarget,
      });

      component.onDragOver(event, 2);

      expect(dropEffectStore.value).toBe('move');
      expect(component.dragOverIndex()).toBe(2);
      expect(component.dragPosition()).toBe('before');
    });

    it('onDragOver should set drag position to after when pointer is in bottom half', (): void => {
      const dropEffectStore: { value: string } = { value: '' };
      const dragTarget: HTMLElement = document.createElement('div');
      dragTarget.getBoundingClientRect = (): DOMRect => ({ top: 100, height: 40 }) as DOMRect;
      const event: DragEvent = fakeDragEvent('dragover', {
        dataTransfer: {
          get dropEffect(): string {
            return dropEffectStore.value;
          },
          set dropEffect(value: string) {
            dropEffectStore.value = value;
          },
        } as unknown as DataTransfer,
        clientY: 130,
        currentTarget: dragTarget,
      });

      component.onDragOver(event, 1);

      expect(component.dragOverIndex()).toBe(1);
      expect(component.dragPosition()).toBe('after');
    });

    it('onDragLeave should keep drag state when moving within the list', (): void => {
      component.dragOverIndex.set(2);
      component.dragPosition.set('after');

      const childNode: Node = document.createElement('span');
      const container: HTMLElement = document.createElement('div');
      container.appendChild(childNode);

      component.onDragLeave(
        fakeDragEvent('dragleave', {
          currentTarget: container as EventTarget,
          relatedTarget: childNode,
        })
      );

      expect(component.dragOverIndex()).toBe(2);
      expect(component.dragPosition()).toBe('after');
    });

    it('onDragLeave should clear drag state when leaving the list element', (): void => {
      component.dragOverIndex.set(2);
      component.dragPosition.set('after');

      const container: HTMLElement = document.createElement('div');
      const outsideNode: Node = document.createElement('span');

      component.onDragLeave(
        fakeDragEvent('dragleave', {
          currentTarget: container as EventTarget,
          relatedTarget: outsideNode,
        })
      );

      expect(component.dragOverIndex()).toBeNull();
      expect(component.dragPosition()).toBeNull();
    });

    it('onDrop should reorder items and emit', (): void => {
      const reorderSpy: jest.SpyInstance = jest.spyOn(component.reordered, 'emit');
      const dragDropSpy: jest.SpyInstance = jest.spyOn(component.dragDropped, 'emit');

      component.draggedIndex.set(0); // Apple dragged
      component.dragPosition.set('after');
      component.onDrop(fakeDragEvent('drop'), 1); // drop after Banana → Apple moves to index 1

      expect(getValueFruit(component, 1).id).toBe(getFruit(0).id);
      expect(reorderSpy).toHaveBeenCalled();
      expect(dragDropSpy).toHaveBeenCalled();
    });

    it('onDrop should be a no-op when source equals target', (): void => {
      const reorderSpy: jest.SpyInstance = jest.spyOn(component.reordered, 'emit');
      component.draggedIndex.set(1);
      component.dragPosition.set('before');
      component.onDrop(fakeDragEvent('drop'), 1);
      expect(reorderSpy).not.toHaveBeenCalled();
    });

    it('onDrop should clear drag state and no-op when there is no drag source', (): void => {
      component.dragOverIndex.set(1);
      component.dragPosition.set('after');
      component.draggedIndex.set(null);

      component.onDrop(fakeDragEvent('drop'), 1);

      expect(component.draggedIndex()).toBeNull();
      expect(component.dragOverIndex()).toBeNull();
      expect(component.dragPosition()).toBeNull();
    });

    it('should not start drag when disabled', (): void => {
      host.disabled.set(true);
      fixture.detectChanges();
      const mockDataTransfer: DataTransfer = {
        effectAllowed: '',
        setData: jest.fn(),
      } as unknown as DataTransfer;
      component.onDragStart(fakeDragEvent('dragstart', { dataTransfer: mockDataTransfer }), 0);
      expect(component.draggedIndex()).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // trackByFn
  // -------------------------------------------------------------------------

  describe('trackByFn()', (): void => {
    it('should return item itself when trackBy is null', (): void => {
      const item: Fruit = getFruit(0);
      expect(component.trackByFn(0, item)).toBe(item);
    });

    it('should return key value when trackBy is set', (): void => {
      host.trackBy.set('id');
      fixture.detectChanges();
      const firstFruit: Fruit = getFruit(0);
      expect(component.trackByFn(0, firstFruit)).toBe(firstFruit.id);
    });

    it('should return undefined when nested trackBy path is unresolvable', (): void => {
      host.trackBy.set('id.value');
      fixture.detectChanges();
      expect(component.trackByFn(0, getFruit(0))).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // resolveItemLabel
  // -------------------------------------------------------------------------

  describe('resolveItemLabel()', (): void => {
    it('should return String(item) when no trackBy', (): void => {
      expect(component.resolveItemLabel('hello')).toBe('hello');
    });

    it('should resolve trackBy property when set', (): void => {
      host.trackBy.set('name');
      fixture.detectChanges();
      expect(component.resolveItemLabel(FRUITS[0])).toBe('Apple');
    });
  });

  // -------------------------------------------------------------------------
  // getValueIndex
  // -------------------------------------------------------------------------

  describe('getValueIndex()', (): void => {
    it('should map display index to value index without filter', (): void => {
      expect(component.getValueIndex(2)).toBe(2);
    });

    it('should map display index to value index with active filter', (): void => {
      host.filterBy.set('name');
      fixture.detectChanges();
      component.filterQuery.set('cherry');
      fixture.detectChanges();
      // Display item 0 = Cherry, which is value index 2
      expect(component.getValueIndex(0)).toBe(2);
    });
  });

  // -------------------------------------------------------------------------
  // Empty state
  // -------------------------------------------------------------------------

  describe('empty state', (): void => {
    it('should show empty state when value is empty', (): void => {
      host.value.set([]);
      fixture.detectChanges();
      const emptyEl: Element | null = rootEl(fixture).querySelector('.ui-lib-order-list__empty');
      expect(emptyEl).toBeTruthy();
    });
  });

  // -------------------------------------------------------------------------
  // onItemFocus
  // -------------------------------------------------------------------------

  describe('onItemFocus()', (): void => {
    it('should update focusedIndex when item receives focus', (): void => {
      component.onItemFocus(new FocusEvent('focus'), 3);
      expect(component.focusedIndex()).toBe(3);
    });
  });
});
