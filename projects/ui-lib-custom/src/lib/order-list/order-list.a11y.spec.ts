import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { OrderListComponent } from './order-list.component';
import { OrderListItemDirective } from './order-list-templates.directive';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { provideUiLibIcons } from 'ui-lib-custom/icon';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

// ---------------------------------------------------------------------------
// ThemeConfigService mock
// ---------------------------------------------------------------------------

function buildMockTheme(): {
  variant: WritableSignal<ThemeVariant>;
  setVariant: (value: ThemeVariant) => void;
  getPreset: () => ThemePreset;
  preset: () => ThemePreset;
} {
  const variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
  const buildPreset: () => ThemePreset = (): ThemePreset => ({
    id: 'test-preset',
    name: 'Test Preset',
    variant: 'material',
    shape: 'rounded',
    density: 'default',
    darkMode: 'light',
    colors: {
      primary: '#000000',
      secondary: '#000000',
      success: '#000000',
      danger: '#000000',
      warning: '#000000',
      info: '#000000',
      surface: '#000000',
      background: '#000000',
    },
    fonts: { heading: 'Inter', body: 'Inter', mono: 'monospace' },
    icons: {
      defaultLibrary: 'lucide',
      defaultSize: 'md',
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
    createdAt: 0,
    updatedAt: 0,
  });
  return {
    variant,
    setVariant: (value: ThemeVariant): void => variant.set(value),
    getPreset: buildPreset,
    preset: buildPreset,
  };
}

// ---------------------------------------------------------------------------
// Shared test data
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

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [OrderListComponent, OrderListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-order-list
      [value]="value()"
      (valueChange)="value.set($any($event))"
      [selection]="selection()"
      (selectionChange)="selection.set($any($event))"
      ariaLabel="Fruit list"
    >
      <ng-template uiOrderListItem let-item>{{ item.name }}</ng-template>
    </ui-lib-order-list>
  `,
})
class BasicHostComponent {
  public readonly value: WritableSignal<Fruit[]> = signal<Fruit[]>([...FRUITS]);
  public readonly selection: WritableSignal<Fruit[]> = signal<Fruit[]>([]);
}

@Component({
  standalone: true,
  imports: [OrderListComponent, OrderListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-order-list
      [value]="value()"
      (valueChange)="value.set($any($event))"
      [selection]="selection()"
      (selectionChange)="selection.set($any($event))"
      ariaLabel="Fruit list"
      [disabled]="true"
    >
      <ng-template uiOrderListItem let-item>{{ item.name }}</ng-template>
    </ui-lib-order-list>
  `,
})
class DisabledHostComponent {
  public readonly value: WritableSignal<Fruit[]> = signal<Fruit[]>([...FRUITS]);
  public readonly selection: WritableSignal<Fruit[]> = signal<Fruit[]>([]);
}

@Component({
  standalone: true,
  imports: [OrderListComponent, OrderListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-order-list
      [value]="value()"
      (valueChange)="value.set($any($event))"
      [selection]="selection()"
      (selectionChange)="selection.set($any($event))"
      ariaLabel="Fruit list"
      filterBy="name"
      filterPlaceholder="Search fruits"
    >
      <ng-template uiOrderListItem let-item>{{ item.name }}</ng-template>
    </ui-lib-order-list>
  `,
})
class FilterHostComponent {
  public readonly value: WritableSignal<Fruit[]> = signal<Fruit[]>([...FRUITS]);
  public readonly selection: WritableSignal<Fruit[]> = signal<Fruit[]>([]);
}

@Component({
  standalone: true,
  imports: [OrderListComponent, OrderListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-order-list
      [value]="value()"
      (valueChange)="value.set($any($event))"
      [selection]="selection()"
      (selectionChange)="selection.set($any($event))"
      header="Fruits"
      ariaLabel="Fruit list"
    >
      <ng-template uiOrderListItem let-item>{{ item.name }}</ng-template>
    </ui-lib-order-list>
  `,
})
class WithHeaderHostComponent {
  public readonly value: WritableSignal<Fruit[]> = signal<Fruit[]>([...FRUITS]);
  public readonly selection: WritableSignal<Fruit[]> = signal<Fruit[]>([]);
}

// ---------------------------------------------------------------------------
// Fixture factory
// ---------------------------------------------------------------------------

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideZonelessChangeDetection(),
      provideUiLibIcons(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement as HTMLElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function cleanupFixture(fixture: ComponentFixture<unknown>): void {
  (fixture.nativeElement as HTMLElement).remove();
}

function getListboxEl(fixture: ComponentFixture<unknown>): HTMLElement {
  const el: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '[role="listbox"]'
  );
  if (!el) throw new Error('Expected listbox element');
  return el;
}

function getItemEls(fixture: ComponentFixture<unknown>): NodeListOf<HTMLElement> {
  return (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[role="option"]');
}

function getControlBtns(fixture: ComponentFixture<unknown>): NodeListOf<HTMLButtonElement> {
  return (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
    '.ui-lib-order-list__control-btn'
  );
}

function dispatchKeyOnListbox(
  fixture: ComponentFixture<unknown>,
  key: string,
  options: KeyboardEventInit = {}
): void {
  getListboxEl(fixture).dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, ...options })
  );
  fixture.detectChanges();
}

// ---------------------------------------------------------------------------
// ARIA structure
// ---------------------------------------------------------------------------

describe('OrderList — ARIA structure', (): void => {
  let fixture: ComponentFixture<BasicHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(BasicHostComponent);
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('should render a listbox with role="listbox"', (): void => {
    expect(getListboxEl(fixture).getAttribute('role')).toBe('listbox');
  });

  it('should have aria-multiselectable="true" on the listbox', (): void => {
    expect(getListboxEl(fixture).getAttribute('aria-multiselectable')).toBe('true');
  });

  it('should set a unique id on the listbox element', (): void => {
    const id: string | null = getListboxEl(fixture).getAttribute('id');
    expect(id).toBeTruthy();
    expect(id).toContain('ui-lib-order-list');
    expect(id).toContain('-list');
  });

  it('should reflect ariaLabel on the listbox', (): void => {
    expect(getListboxEl(fixture).getAttribute('aria-label')).toBe('Fruit list');
  });

  it('should render all items with role="option"', (): void => {
    expect(getItemEls(fixture).length).toBe(FRUITS.length);
  });

  it('each option should have aria-selected="false" by default', (): void => {
    getItemEls(fixture).forEach((item: HTMLElement): void => {
      expect(item.getAttribute('aria-selected')).toBe('false');
    });
  });

  it('selected item should have aria-selected="true"', (): void => {
    const host: BasicHostComponent = fixture.componentInstance;
    const firstFruit: Fruit = FRUITS[0]!;
    host.selection.set([firstFruit]);
    fixture.detectChanges();
    const firstItem: HTMLElement = getItemEls(fixture)[0]!;
    expect(firstItem.getAttribute('aria-selected')).toBe('true');
  });

  it('each option should have a unique id attribute', (): void => {
    const items: NodeListOf<HTMLElement> = getItemEls(fixture);
    const ids: string[] = Array.from(items).map((el: HTMLElement): string => el.id);
    const uniqueIds: Set<string> = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('each control button should have an aria-label', (): void => {
    const btns: NodeListOf<HTMLButtonElement> = getControlBtns(fixture);
    btns.forEach((btn: HTMLButtonElement): void => {
      expect(btn.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should have four control buttons (top, up, down, bottom)', (): void => {
    expect(getControlBtns(fixture).length).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// Unique IDs across instances
// ---------------------------------------------------------------------------

describe('OrderList — Unique IDs per instance', (): void => {
  let fixtureA: ComponentFixture<BasicHostComponent>;
  let fixtureB: ComponentFixture<BasicHostComponent> | undefined;

  beforeEach(async (): Promise<void> => {
    fixtureB = undefined;
    fixtureA = await createFixture(BasicHostComponent);
  });

  afterEach((): void => {
    cleanupFixture(fixtureA);
    if (fixtureB !== undefined) cleanupFixture(fixtureB);
  });

  it('each instance should have a listbox ID containing the component prefix', (): void => {
    const id: string | null = getListboxEl(fixtureA).getAttribute('id');
    expect(id).toBeTruthy();
    expect(id).toMatch(/^ui-lib-order-list-\d+-list$/);
  });

  it('two sequentially rendered instances should have different listbox IDs', async (): Promise<void> => {
    const idA: string | null = getListboxEl(fixtureA).getAttribute('id');

    TestBed.resetTestingModule();
    fixtureB = await createFixture(BasicHostComponent);
    const idB: string | null = getListboxEl(fixtureB).getAttribute('id');

    expect(idA).toBeTruthy();
    expect(idB).toBeTruthy();
    expect(idA).not.toBe(idB);
  });
});

// ---------------------------------------------------------------------------
// Control button labels
// ---------------------------------------------------------------------------

describe('OrderList — Control button aria-labels', (): void => {
  let fixture: ComponentFixture<BasicHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(BasicHostComponent);
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('first button should label "Move to top"', (): void => {
    expect(getControlBtns(fixture)[0]!.getAttribute('aria-label')).toBe('Move to top');
  });

  it('second button should label "Move up"', (): void => {
    expect(getControlBtns(fixture)[1]!.getAttribute('aria-label')).toBe('Move up');
  });

  it('third button should label "Move down"', (): void => {
    expect(getControlBtns(fixture)[2]!.getAttribute('aria-label')).toBe('Move down');
  });

  it('fourth button should label "Move to bottom"', (): void => {
    expect(getControlBtns(fixture)[3]!.getAttribute('aria-label')).toBe('Move to bottom');
  });
});

// ---------------------------------------------------------------------------
// Keyboard navigation
// ---------------------------------------------------------------------------

describe('OrderList — Keyboard navigation', (): void => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let component: OrderListComponent;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(BasicHostComponent);
    component = fixture.debugElement.query(By.directive(OrderListComponent))
      .componentInstance as OrderListComponent;
    // Seed focus at index 0
    component.focusedIndex.set(0);
    fixture.detectChanges();
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('ArrowDown should advance focused index', (): void => {
    dispatchKeyOnListbox(fixture, 'ArrowDown');
    expect(component.focusedIndex()).toBe(1);
  });

  it('ArrowUp should retreat focused index', (): void => {
    component.focusedIndex.set(2);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'ArrowUp');
    expect(component.focusedIndex()).toBe(1);
  });

  it('Home should move focus to first item', (): void => {
    component.focusedIndex.set(3);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'Home');
    expect(component.focusedIndex()).toBe(0);
  });

  it('End should move focus to last item', (): void => {
    dispatchKeyOnListbox(fixture, 'End');
    expect(component.focusedIndex()).toBe(FRUITS.length - 1);
  });

  it('ArrowDown on last item should wrap to first', (): void => {
    component.focusedIndex.set(FRUITS.length - 1);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'ArrowDown');
    expect(component.focusedIndex()).toBe(0);
  });

  it('ArrowUp on first item should wrap to last', (): void => {
    component.focusedIndex.set(0);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'ArrowUp');
    expect(component.focusedIndex()).toBe(FRUITS.length - 1);
  });

  it('Space should toggle selection of focused item', (): void => {
    component.focusedIndex.set(0);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, ' ');
    expect(component.selection().length).toBe(1);
  });

  it('Enter should toggle selection of focused item', (): void => {
    component.focusedIndex.set(1);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'Enter');
    expect(component.selection().length).toBe(1);
  });

  it('Ctrl+A should select all visible items', (): void => {
    dispatchKeyOnListbox(fixture, 'a', { ctrlKey: true });
    expect(component.selection().length).toBe(FRUITS.length);
  });

  it('Escape should clear selection', (): void => {
    component.selection.set([FRUITS[0]!]);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'Escape');
    expect(component.selection().length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Keyboard reorder
// ---------------------------------------------------------------------------

describe('OrderList — Keyboard reorder shortcuts', (): void => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let component: OrderListComponent;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(BasicHostComponent);
    component = fixture.debugElement.query(By.directive(OrderListComponent))
      .componentInstance as OrderListComponent;
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('Alt+ArrowDown should move selected item down', (): void => {
    const secondFruit: Fruit = FRUITS[1]!;
    component.selection.set([secondFruit]);
    component.focusedIndex.set(1);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'ArrowDown', { altKey: true });
    const values: Fruit[] = component.value() as Fruit[];
    expect(values[2]!.id).toBe(secondFruit.id);
  });

  it('Alt+ArrowUp should move selected item up', (): void => {
    const secondFruit: Fruit = FRUITS[1]!;
    component.selection.set([secondFruit]);
    component.focusedIndex.set(1);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'ArrowUp', { altKey: true });
    const values: Fruit[] = component.value() as Fruit[];
    expect(values[0]!.id).toBe(secondFruit.id);
  });

  it('Alt+Home should move selected item to top', (): void => {
    const thirdFruit: Fruit = FRUITS[2]!;
    component.selection.set([thirdFruit]);
    component.focusedIndex.set(2);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'Home', { altKey: true });
    const values: Fruit[] = component.value() as Fruit[];
    expect(values[0]!.id).toBe(thirdFruit.id);
  });

  it('Alt+End should move selected item to bottom', (): void => {
    const firstFruit: Fruit = FRUITS[0]!;
    component.selection.set([firstFruit]);
    component.focusedIndex.set(0);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'End', { altKey: true });
    const values: Fruit[] = component.value() as Fruit[];
    expect(values[values.length - 1]!.id).toBe(firstFruit.id);
  });
});

// ---------------------------------------------------------------------------
// Live announcement
// ---------------------------------------------------------------------------

describe('OrderList — Screen reader announcements', (): void => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let component: OrderListComponent;
  let announcer: LiveAnnouncerService;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(BasicHostComponent);
    component = fixture.debugElement.query(By.directive(OrderListComponent))
      .componentInstance as OrderListComponent;
    announcer = TestBed.inject(LiveAnnouncerService);
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('reorder via Alt+ArrowDown should trigger a live announcement', (): void => {
    const spy: jest.SpyInstance = jest.spyOn(announcer, 'announce');
    component.selection.set([FRUITS[0]!]);
    component.focusedIndex.set(0);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'ArrowDown', { altKey: true });
    expect(spy).toHaveBeenCalled();
    const firstCall: unknown[] | undefined = spy.mock.calls[0] as unknown[] | undefined;
    const message: string = firstCall ? String(firstCall[0]) : '';
    expect(message).toContain('position');
    spy.mockRestore();
  });

  it('reorder via Alt+ArrowUp should trigger a live announcement', (): void => {
    const spy: jest.SpyInstance = jest.spyOn(announcer, 'announce');
    component.selection.set([FRUITS[1]!]);
    component.focusedIndex.set(1);
    fixture.detectChanges();
    dispatchKeyOnListbox(fixture, 'ArrowUp', { altKey: true });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// axe-core automated checks
// ---------------------------------------------------------------------------

describe('OrderList — axe-core (default state)', (): void => {
  let fixture: ComponentFixture<BasicHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(BasicHostComponent);
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('should pass axe in default (empty selection) state', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe with one item selected', async (): Promise<void> => {
    fixture.componentInstance.selection.set([FRUITS[0]!]);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe with all items selected', async (): Promise<void> => {
    fixture.componentInstance.selection.set([...FRUITS]);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});

describe('OrderList — axe-core (disabled state)', (): void => {
  let fixture: ComponentFixture<DisabledHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(DisabledHostComponent);
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('should pass axe when disabled', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});

describe('OrderList — axe-core (filter state)', (): void => {
  let fixture: ComponentFixture<FilterHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(FilterHostComponent);
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('should pass axe with filter input rendered', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});

describe('OrderList — axe-core (with header)', (): void => {
  let fixture: ComponentFixture<WithHeaderHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await createFixture(WithHeaderHostComponent);
  });

  afterEach((): void => {
    cleanupFixture(fixture);
  });

  it('should pass axe when header is present', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
