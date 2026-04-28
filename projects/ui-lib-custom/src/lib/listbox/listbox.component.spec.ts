import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListboxComponent } from './listbox.component';
import type {
  ListboxChangeEvent,
  ListboxFilterEvent,
  ListboxOption,
  ListboxSize,
  ListboxVariant,
} from './listbox.types';

// ---------------------------------------------------------------------------
// Typed DOM helpers
// ---------------------------------------------------------------------------

function queryEl<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element;
}

function queryAllEls<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function hasClass(fixture: ComponentFixture<unknown>, selector: string, cls: string): boolean {
  const element: Element | null = (fixture.nativeElement as HTMLElement).querySelector(selector);
  return element?.classList.contains(cls) ?? false;
}

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const SIMPLE_OPTIONS: ListboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date', disabled: true },
];

const GROUPED_OPTIONS: Array<{ label: string; items: ListboxOption[] }> = [
  {
    label: 'Fruits',
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Host — ngModel (single)
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-listbox
      [options]="options()"
      [variant]="variant()"
      [size]="size()"
      [multiple]="multiple()"
      [filter]="filter()"
      [filterValue]="filterValue()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [checkbox]="checkbox()"
      [showToggleAll]="showToggleAll()"
      [striped]="striped()"
      [group]="group()"
      [ariaLabel]="ariaLabel()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
      (selectionChange)="onSelectionChange($event)"
      (filterChange)="onFilterChange($event)"
    />
  `,
})
class ListboxNgModelHostComponent {
  public readonly options: WritableSignal<ListboxOption[]> =
    signal<ListboxOption[]>(SIMPLE_OPTIONS);
  public readonly variant: WritableSignal<ListboxVariant> = signal<ListboxVariant>('material');
  public readonly size: WritableSignal<ListboxSize> = signal<ListboxSize>('md');
  public readonly multiple: WritableSignal<boolean> = signal<boolean>(false);
  public readonly filter: WritableSignal<boolean> = signal<boolean>(false);
  public readonly filterValue: WritableSignal<string> = signal<string>('');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly checkbox: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showToggleAll: WritableSignal<boolean> = signal<boolean>(false);
  public readonly striped: WritableSignal<boolean> = signal<boolean>(false);
  public readonly group: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Choose a fruit');
  public value: unknown = null;
  public readonly changeEvents: ListboxChangeEvent[] = [];
  public readonly filterEvents: ListboxFilterEvent[] = [];

  public onSelectionChange(event: ListboxChangeEvent): void {
    this.changeEvents.push(event);
  }

  public onFilterChange(event: ListboxFilterEvent): void {
    this.filterEvents.push(event);
  }
}

// ---------------------------------------------------------------------------
// Host — reactive forms
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ListboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <ui-lib-listbox [options]="options" formControlName="selection" />
    </form>
  `,
})
class ListboxReactiveHostComponent {
  public readonly options: ListboxOption[] = SIMPLE_OPTIONS;
  public readonly form: FormGroup = new FormGroup({
    selection: new FormControl<unknown>(null),
  });
}

// ---------------------------------------------------------------------------
// Host — multiple reactive forms
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ListboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <ui-lib-listbox [options]="options" [multiple]="true" formControlName="selection" />
    </form>
  `,
})
class ListboxMultipleReactiveHostComponent {
  public readonly options: ListboxOption[] = SIMPLE_OPTIONS;
  public readonly form: FormGroup = new FormGroup({
    selection: new FormControl<unknown[]>([]),
  });
}

// ---------------------------------------------------------------------------
// Factory helpers
// ---------------------------------------------------------------------------

async function createNgModelFixture(
  setup?: (host: ListboxNgModelHostComponent) => void
): Promise<ComponentFixture<ListboxNgModelHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ListboxNgModelHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<ListboxNgModelHostComponent> = TestBed.createComponent(
    ListboxNgModelHostComponent
  );
  setup?.(fixture.componentInstance);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

async function createReactiveFixture(): Promise<ComponentFixture<ListboxReactiveHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ListboxReactiveHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<ListboxReactiveHostComponent> = TestBed.createComponent(
    ListboxReactiveHostComponent
  );
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

async function createMultipleReactiveFixture(): Promise<
  ComponentFixture<ListboxMultipleReactiveHostComponent>
> {
  await TestBed.configureTestingModule({
    imports: [ListboxMultipleReactiveHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<ListboxMultipleReactiveHostComponent> = TestBed.createComponent(
    ListboxMultipleReactiveHostComponent
  );
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ListboxComponent', (): void => {
  // ── Rendering ────────────────────────────────────────────────────────────

  describe('rendering', (): void => {
    it('should create the component', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listboxEl: HTMLElement = queryEl(fixture, 'ui-lib-listbox');
      expect(listboxEl).toBeTruthy();
    });

    it('should render the correct number of option items', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      expect(items.length).toBe(SIMPLE_OPTIONS.length);
    });

    it('should render option labels', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const labels: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item-label');
      expect(labels[0]!.textContent!.trim()).toBe('Apple');
      expect(labels[1]!.textContent!.trim()).toBe('Banana');
    });

    it('should apply --disabled class to disabled option', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      const disabledItem: HTMLElement = items[3]!; // Date is disabled
      expect(disabledItem.classList.contains('ui-lib-listbox__item--disabled')).toBe(true);
    });

    it('should render the filter input when filter=true', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.filter.set(true);
        }
      );
      const filterInput: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.ui-lib-listbox__filter-input'
      );
      expect(filterInput).toBeTruthy();
    });

    it('should not render the filter input when filter=false', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const filterInput: HTMLInputElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLInputElement>('.ui-lib-listbox__filter-input');
      expect(filterInput).toBeNull();
    });

    it('should render toggle-all header in multiple+showToggleAll mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
          host.showToggleAll.set(true);
        }
      );
      const header: HTMLElement = queryEl(fixture, '.ui-lib-listbox__header');
      expect(header).toBeTruthy();
    });

    it('should not render toggle-all header when showToggleAll=false', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const header: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-listbox__header'
      );
      expect(header).toBeNull();
    });

    it('should render checkboxes in multiple+checkbox mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
          host.checkbox.set(true);
        }
      );
      const checkboxes: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should show empty message when options array is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.options.set([]);
        }
      );
      const empty: HTMLElement = queryEl(fixture, '.ui-lib-listbox__empty');
      expect(empty.textContent!.trim()).toBeTruthy();
    });
  });

  // ── Variants ─────────────────────────────────────────────────────────────

  describe('variants', (): void => {
    const variants: ListboxVariant[] = ['material', 'bootstrap', 'minimal'];

    variants.forEach((variant: ListboxVariant): void => {
      it(`should apply variant class for "${variant}"`, async (): Promise<void> => {
        const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
          (host: ListboxNgModelHostComponent): void => {
            host.variant.set(variant);
          }
        );
        const hasVariantClass: boolean = hasClass(
          fixture,
          'ui-lib-listbox',
          `ui-lib-listbox--${variant}`
        );
        expect(hasVariantClass).toBe(true);
      });
    });
  });

  // ── Sizes ─────────────────────────────────────────────────────────────────

  describe('sizes', (): void => {
    const sizes: ListboxSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size: ListboxSize): void => {
      it(`should apply size class for "${size}"`, async (): Promise<void> => {
        const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
          (host: ListboxNgModelHostComponent): void => {
            host.size.set(size);
          }
        );
        const hasSizeClass: boolean = hasClass(
          fixture,
          'ui-lib-listbox',
          `ui-lib-listbox--size-${size}`
        );
        expect(hasSizeClass).toBe(true);
      });
    });
  });

  // ── Single selection ──────────────────────────────────────────────────────

  describe('single selection', (): void => {
    it('should mark an item as selected when clicked', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(items[0]!.classList.contains('ui-lib-listbox__item--selected')).toBe(true);
    });

    it('should deselect an already-selected item when clicked again', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(items[0]!.classList.contains('ui-lib-listbox__item--selected')).toBe(false);
    });

    it('should only keep one selected item at a time', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      items[1]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0]).toBe(items[1]);
    });

    it('should not select a disabled option', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      const disabledItem: HTMLElement = items[3]!; // Date
      disabledItem.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(disabledItem.classList.contains('ui-lib-listbox__item--selected')).toBe(false);
    });

    it('should emit selectionChange when an option is clicked', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.changeEvents.length).toBe(1);
      expect(fixture.componentInstance.changeEvents[0]!.value).toBe('apple');
    });

    it('should set aria-selected="true" on the selected item', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(items[0]!.getAttribute('aria-selected')).toBe('true');
      expect(items[1]!.getAttribute('aria-selected')).toBe('false');
    });
  });

  // ── Multiple selection ────────────────────────────────────────────────────

  describe('multiple selection', (): void => {
    it('should allow selecting multiple options', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
        }
      );
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      items[1]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      expect(selectedItems.length).toBe(2);
    });

    it('should deselect an item when clicked again in multiple mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
        }
      );
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      expect(selectedItems.length).toBe(0);
    });

    it('should apply --multiple host class', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
        }
      );
      expect(hasClass(fixture, 'ui-lib-listbox', 'ui-lib-listbox--multiple')).toBe(true);
    });
  });

  // ── Toggle all ────────────────────────────────────────────────────────────

  describe('toggle all', (): void => {
    it('should select all non-disabled options when toggle-all is clicked', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
          host.showToggleAll.set(true);
        }
      );
      const toggleCheckbox: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.ui-lib-listbox__header input[type="checkbox"]'
      );
      toggleCheckbox.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      // 3 non-disabled options (Date is disabled)
      expect(selectedItems.length).toBe(3);
    });

    it('should deselect all when toggle-all is clicked again', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
          host.showToggleAll.set(true);
        }
      );
      const toggleCheckbox: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.ui-lib-listbox__header input[type="checkbox"]'
      );
      // Select all
      toggleCheckbox.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Deselect all
      toggleCheckbox.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      expect(selectedItems.length).toBe(0);
    });
  });

  // ── Filtering ─────────────────────────────────────────────────────────────

  describe('filtering', (): void => {
    it('should filter options by label when text is typed', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.filter.set(true);
        }
      );
      const filterInput: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.ui-lib-listbox__filter-input'
      );
      filterInput.value = 'ban';
      filterInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      expect(items.length).toBe(1);
      expect(items[0]!.textContent!.trim()).toBe('Banana');
    });

    it('should show empty filter message when no options match', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.filter.set(true);
        }
      );
      const filterInput: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.ui-lib-listbox__filter-input'
      );
      filterInput.value = 'zzz';
      filterInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const empty: HTMLElement = queryEl(fixture, '.ui-lib-listbox__empty');
      expect(empty).toBeTruthy();
    });

    it('should emit filterChange event when filter input changes', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.filter.set(true);
        }
      );
      const filterInput: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.ui-lib-listbox__filter-input'
      );
      filterInput.value = 'app';
      filterInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.filterEvents.length).toBe(1);
      expect(fixture.componentInstance.filterEvents[0]!.filter).toBe('app');
    });
  });

  // ── Groups ────────────────────────────────────────────────────────────────

  describe('grouped options', (): void => {
    it('should render group headers when group=true', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.options.set(GROUPED_OPTIONS as unknown as ListboxOption[]);
          host.group.set(true);
        }
      );
      const groupHeaders: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__group-header');
      expect(groupHeaders.length).toBe(2);
      expect(groupHeaders[0]!.textContent!.trim()).toBe('Fruits');
      expect(groupHeaders[1]!.textContent!.trim()).toBe('Vegetables');
    });

    it('should render all items under their groups', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.options.set(GROUPED_OPTIONS as unknown as ListboxOption[]);
          host.group.set(true);
        }
      );
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      expect(items.length).toBe(4);
    });

    it('should allow selecting options from groups', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.options.set(GROUPED_OPTIONS as unknown as ListboxOption[]);
          host.group.set(true);
        }
      );
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(items[0]!.classList.contains('ui-lib-listbox__item--selected')).toBe(true);
    });
  });

  // ── Disabled host ─────────────────────────────────────────────────────────

  describe('disabled state', (): void => {
    it('should apply --disabled host class when disabled=true', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.disabled.set(true);
        }
      );
      expect(hasClass(fixture, 'ui-lib-listbox', 'ui-lib-listbox--disabled')).toBe(true);
    });

    it('should set aria-disabled on host when disabled=true', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.disabled.set(true);
        }
      );
      const host: HTMLElement = queryEl(fixture, 'ui-lib-listbox');
      expect(host.getAttribute('aria-disabled')).toBe('true');
    });
  });

  // ── Readonly ──────────────────────────────────────────────────────────────

  describe('readonly state', (): void => {
    it('should apply --readonly host class when readonly=true', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.readonly.set(true);
        }
      );
      expect(hasClass(fixture, 'ui-lib-listbox', 'ui-lib-listbox--readonly')).toBe(true);
    });

    it('should not change value when readonly and option is clicked', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.readonly.set(true);
        }
      );
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[0]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(items[0]!.classList.contains('ui-lib-listbox__item--selected')).toBe(false);
    });
  });

  // ── Striped ───────────────────────────────────────────────────────────────

  describe('striped', (): void => {
    it('should apply --striped host class when striped=true', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.striped.set(true);
        }
      );
      expect(hasClass(fixture, 'ui-lib-listbox', 'ui-lib-listbox--striped')).toBe(true);
    });
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    it('should move focus down with ArrowDown', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');

      listContainer.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      listContainer.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const focusedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--focused');
      expect(focusedItems.length).toBe(1);
    });

    it('should move focus up with ArrowUp', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');

      listContainer.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();

      // ArrowDown twice to index 1
      listContainer.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();
      listContainer.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();

      // ArrowUp back to index 0 (or 1)
      listContainer.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const focusedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--focused');
      expect(focusedItems.length).toBe(1);
    });

    it('should select focused item with Enter', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');

      listContainer.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      listContainer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      expect(selectedItems.length).toBe(1);
    });

    it('should select focused item with Space', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');

      listContainer.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      listContainer.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      expect(selectedItems.length).toBe(1);
    });

    it('should focus the first item with Home key', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');

      listContainer.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();
      // Move to last
      listContainer.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      // Home back
      listContainer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      expect(items[0]!.classList.contains('ui-lib-listbox__item--focused')).toBe(true);
    });
  });

  // ── ARIA ──────────────────────────────────────────────────────────────────

  describe('ARIA attributes', (): void => {
    it('should have role="listbox" on the list container', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');
      expect(listContainer.getAttribute('role')).toBe('listbox');
    });

    it('should have role="option" on each option item', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items.forEach((item: HTMLElement): void => {
        expect(item.getAttribute('role')).toBe('option');
      });
    });

    it('should set aria-multiselectable="true" in multiple mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.multiple.set(true);
        }
      );
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');
      expect(listContainer.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should set aria-label from ariaLabel input', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');
      expect(listContainer.getAttribute('aria-label')).toBe('Choose a fruit');
    });

    it('should set aria-disabled on the list container when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.disabled.set(true);
        }
      );
      const listContainer: HTMLElement = queryEl(fixture, '.ui-lib-listbox__list-container');
      expect(listContainer.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set aria-posinset and aria-setsize on option items', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      expect(items[0]!.getAttribute('aria-posinset')).toBe('1');
      expect(items[0]!.getAttribute('aria-setsize')).toBe(String(SIMPLE_OPTIONS.length));
    });
  });

  // ── ControlValueAccessor — ngModel ────────────────────────────────────────

  describe('ControlValueAccessor — ngModel', (): void => {
    it('should reflect an externally set ngModel value', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture(
        (host: ListboxNgModelHostComponent): void => {
          host.value = 'banana';
        }
      );
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      expect(items[1]!.classList.contains('ui-lib-listbox__item--selected')).toBe(true);
    });

    it('should update ngModel when an option is selected', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxNgModelHostComponent> = await createNgModelFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[2]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.componentInstance.value).toBe('cherry');
    });
  });

  // ── ControlValueAccessor — reactive forms ─────────────────────────────────

  describe('ControlValueAccessor — reactive forms (single)', (): void => {
    it('should reflect control value', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxReactiveHostComponent> = await createReactiveFixture();
      fixture.componentInstance.form.controls['selection']!.setValue('apple');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      expect(items[0]!.classList.contains('ui-lib-listbox__item--selected')).toBe(true);
    });

    it('should update control value when option is clicked', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxReactiveHostComponent> = await createReactiveFixture();
      const items: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item');
      items[1]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.form.controls['selection']!.value).toBe('banana');
    });

    it('should disable the component via setDisabledState', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxReactiveHostComponent> = await createReactiveFixture();
      fixture.componentInstance.form.controls['selection']!.disable();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const host: HTMLElement = queryEl(fixture, 'ui-lib-listbox');
      expect(host.classList.contains('ui-lib-listbox--disabled')).toBe(true);
    });
  });

  // ── ControlValueAccessor — reactive forms (multiple) ──────────────────────

  describe('ControlValueAccessor — reactive forms (multiple)', (): void => {
    it('should reflect array control value', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxMultipleReactiveHostComponent> =
        await createMultipleReactiveFixture();
      fixture.componentInstance.form.controls['selection']!.setValue(['apple', 'cherry']);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const selectedItems: HTMLElement[] = queryAllEls(fixture, '.ui-lib-listbox__item--selected');
      expect(selectedItems.length).toBe(2);
    });
  });
});
