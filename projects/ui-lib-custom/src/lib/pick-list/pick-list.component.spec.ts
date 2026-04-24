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
import { PickListComponent } from './pick-list.component';
import type {
  PickListMoveToTargetEvent,
  PickListMoveToSourceEvent,
  PickListMoveAllToTargetEvent,
  PickListMoveAllToSourceEvent,
  PickListReorderEvent,
  PickListSelectionChangeEvent,
  PickListSize,
  PickListVariant,
} from './pick-list.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface Country {
  code: string;
  name: string;
}

const SOURCE_COUNTRIES: Country[] = [
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
];

const TARGET_COUNTRIES: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
];

function getCountry(countries: Country[], index: number): Country {
  const country: Country | undefined = countries[index];
  if (country === undefined) {
    throw new Error(`Expected country at index ${index}`);
  }
  return country;
}

function getSourceItems(fixture: ComponentFixture<PickListHostComponent>): NodeListOf<HTMLElement> {
  return rootEl(fixture).querySelectorAll<HTMLElement>(
    '.ui-lib-pick-list__panel--source .ui-lib-pick-list__item'
  );
}

function getTargetItems(fixture: ComponentFixture<PickListHostComponent>): NodeListOf<HTMLElement> {
  return rootEl(fixture).querySelectorAll<HTMLElement>(
    '.ui-lib-pick-list__panel--target .ui-lib-pick-list__item'
  );
}

function getTransferButtons(fixture: ComponentFixture<PickListHostComponent>): HTMLElement[] {
  return Array.from(
    rootEl(fixture).querySelectorAll<HTMLElement>('.ui-lib-pick-list__transfer-btn')
  );
}

function rootEl(fixture: ComponentFixture<PickListHostComponent>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [PickListComponent],
  template: `
    <ui-lib-pick-list
      [source]="source()"
      (sourceChange)="source.set($any($event))"
      [target]="target()"
      (targetChange)="target.set($any($event))"
      [sourceSelection]="sourceSelection()"
      (sourceSelectionChange)="sourceSelection.set($any($event))"
      [targetSelection]="targetSelection()"
      (targetSelectionChange)="targetSelection.set($any($event))"
      [sourceHeader]="sourceHeader()"
      [targetHeader]="targetHeader()"
      [filterBy]="filterBy()"
      [showSourceControls]="showSourceControls()"
      [showTargetControls]="showTargetControls()"
      [disabled]="disabled()"
      [metaKeySelection]="metaKeySelection()"
      [stripedRows]="stripedRows()"
      [dragDrop]="dragDrop()"
      [variant]="variant()"
      [size]="size()"
      [trackBy]="trackBy()"
      (movedToTarget)="lastMoveToTarget = $event"
      (movedToSource)="lastMoveToSource = $event"
      (movedAllToTarget)="lastMoveAllToTarget = $event"
      (movedAllToSource)="lastMoveAllToSource = $event"
      (sourceSelectionChanged)="lastSourceSelectionChange = $event"
      (targetSelectionChanged)="lastTargetSelectionChange = $event"
      (reordered)="lastReorder = $event"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PickListHostComponent {
  public readonly source: WritableSignal<Country[]> = signal<Country[]>([...SOURCE_COUNTRIES]);
  public readonly target: WritableSignal<Country[]> = signal<Country[]>([...TARGET_COUNTRIES]);
  public readonly sourceSelection: WritableSignal<Country[]> = signal<Country[]>([]);
  public readonly targetSelection: WritableSignal<Country[]> = signal<Country[]>([]);
  public readonly sourceHeader: WritableSignal<string | null> = signal<string | null>(null);
  public readonly targetHeader: WritableSignal<string | null> = signal<string | null>(null);
  public readonly filterBy: WritableSignal<string | null> = signal<string | null>(null);
  public readonly showSourceControls: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showTargetControls: WritableSignal<boolean> = signal<boolean>(true);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly metaKeySelection: WritableSignal<boolean> = signal<boolean>(false);
  public readonly stripedRows: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dragDrop: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<PickListVariant | null> = signal<PickListVariant | null>(
    null
  );
  public readonly size: WritableSignal<PickListSize> = signal<PickListSize>('md');
  public readonly trackBy: WritableSignal<string | null> = signal<string | null>(null);

  public lastMoveToTarget: PickListMoveToTargetEvent | null = null;
  public lastMoveToSource: PickListMoveToSourceEvent | null = null;
  public lastMoveAllToTarget: PickListMoveAllToTargetEvent | null = null;
  public lastMoveAllToSource: PickListMoveAllToSourceEvent | null = null;
  public lastSourceSelectionChange: PickListSelectionChangeEvent | null = null;
  public lastTargetSelectionChange: PickListSelectionChangeEvent | null = null;
  public lastReorder: PickListReorderEvent | null = null;
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

function setup(
  overrides: Partial<{
    source: Country[];
    target: Country[];
    sourceHeader: string | null;
    targetHeader: string | null;
    filterBy: string | null;
    showSourceControls: boolean;
    showTargetControls: boolean;
    disabled: boolean;
    variant: PickListVariant;
    size: PickListSize;
  }> = {}
): {
  fixture: ComponentFixture<PickListHostComponent>;
  host: PickListHostComponent;
  component: PickListComponent;
} {
  TestBed.configureTestingModule({
    imports: [PickListHostComponent],
    providers: [provideZonelessChangeDetection()],
  });

  const fixture: ComponentFixture<PickListHostComponent> =
    TestBed.createComponent(PickListHostComponent);
  const host: PickListHostComponent = fixture.componentInstance;

  if (overrides.source !== undefined) host.source.set(overrides.source);
  if (overrides.target !== undefined) host.target.set(overrides.target);
  if (overrides.sourceHeader !== undefined) host.sourceHeader.set(overrides.sourceHeader);
  if (overrides.targetHeader !== undefined) host.targetHeader.set(overrides.targetHeader);
  if (overrides.filterBy !== undefined) host.filterBy.set(overrides.filterBy);
  if (overrides.showSourceControls !== undefined)
    host.showSourceControls.set(overrides.showSourceControls);
  if (overrides.showTargetControls !== undefined)
    host.showTargetControls.set(overrides.showTargetControls);
  if (overrides.disabled !== undefined) host.disabled.set(overrides.disabled);
  if (overrides.variant !== undefined) host.variant.set(overrides.variant);
  if (overrides.size !== undefined) host.size.set(overrides.size);

  fixture.detectChanges();

  const component: PickListComponent = fixture.debugElement.query(By.directive(PickListComponent))
    .componentInstance as PickListComponent;

  return { fixture, host, component };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PickListComponent', (): void => {
  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  describe('rendering', (): void => {
    it('should create the component', (): void => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('should render source items', (): void => {
      const { fixture, host } = setup();
      host.trackBy.set('name');
      fixture.detectChanges();
      const items: NodeListOf<HTMLElement> = getSourceItems(fixture);
      expect(items.length).toBe(SOURCE_COUNTRIES.length);
      expect(items[0].textContent.trim()).toBe('Germany');
    });

    it('should render target items', (): void => {
      const { fixture, host } = setup();
      host.trackBy.set('name');
      fixture.detectChanges();
      const items: NodeListOf<HTMLElement> = getTargetItems(fixture);
      expect(items.length).toBe(TARGET_COUNTRIES.length);
      expect(items[0].textContent.trim()).toBe('United States');
    });

    it('should render empty state when source is empty', (): void => {
      const { fixture } = setup({ source: [] });
      const sourcePanel: HTMLElement | null = rootEl(fixture).querySelector(
        '.ui-lib-pick-list__panel--source'
      );
      const empty: HTMLElement | null | undefined = sourcePanel?.querySelector(
        '.ui-lib-pick-list__empty'
      );
      expect(empty).not.toBeNull();
    });

    it('should render headers when set', (): void => {
      const { fixture } = setup({
        sourceHeader: 'Available',
        targetHeader: 'Selected',
      });
      const headers: NodeListOf<HTMLElement> = rootEl(fixture).querySelectorAll<HTMLElement>(
        '.ui-lib-pick-list__header'
      );
      expect(headers.length).toBe(2);
      expect(headers[0].textContent.trim()).toBe('Available');
      expect(headers[1].textContent.trim()).toBe('Selected');
    });

    it('should render filter inputs when filterBy is set', (): void => {
      const { fixture } = setup({ filterBy: 'name' });
      const filters: NodeListOf<HTMLElement> = rootEl(fixture).querySelectorAll<HTMLElement>(
        '.ui-lib-pick-list__filter-input'
      );
      expect(filters.length).toBe(2);
    });

    it('should not render filter inputs when filterBy is null', (): void => {
      const { fixture } = setup({ filterBy: null });
      const filters: NodeListOf<HTMLElement> = rootEl(fixture).querySelectorAll<HTMLElement>(
        '.ui-lib-pick-list__filter-input'
      );
      expect(filters.length).toBe(0);
    });

    it('should render 4 transfer buttons', (): void => {
      const { fixture } = setup();
      expect(getTransferButtons(fixture).length).toBe(4);
    });

    it('should hide source reorder controls when showSourceControls is false', (): void => {
      const { fixture } = setup({ showSourceControls: false });
      const sourcePanel: HTMLElement | null = rootEl(fixture).querySelector(
        '.ui-lib-pick-list__panel--source'
      );
      const controls: HTMLElement | null | undefined = sourcePanel?.querySelector(
        '.ui-lib-pick-list__controls'
      );
      expect(controls).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Host classes
  // -------------------------------------------------------------------------

  describe('host classes', (): void => {
    it('should apply base class', (): void => {
      const { component } = setup();
      expect(component.hostClasses()).toContain('ui-lib-pick-list');
    });

    it('should apply variant class', (): void => {
      const { component } = setup({ variant: 'bootstrap' });
      expect(component.hostClasses()).toContain('ui-lib-pick-list--bootstrap');
    });

    it('should apply size class', (): void => {
      const { component } = setup({ size: 'sm' });
      expect(component.hostClasses()).toContain('ui-lib-pick-list--sm');
    });

    it('should apply disabled class', (): void => {
      const { component } = setup({ disabled: true });
      expect(component.hostClasses()).toContain('ui-lib-pick-list--disabled');
    });

    (['material', 'bootstrap', 'minimal'] as PickListVariant[]).forEach(
      (variant: PickListVariant): void => {
        it(`should apply ${variant} variant class`, (): void => {
          const { component } = setup({ variant });
          expect(component.hostClasses()).toContain(`ui-lib-pick-list--${variant}`);
        });
      }
    );

    (['sm', 'md', 'lg'] as PickListSize[]).forEach((size: PickListSize): void => {
      it(`should apply ${size} size class`, (): void => {
        const { component } = setup({ size });
        expect(component.hostClasses()).toContain(`ui-lib-pick-list--${size}`);
      });
    });
  });

  // -------------------------------------------------------------------------
  // Transfer operations
  // -------------------------------------------------------------------------

  describe('transfer operations', (): void => {
    it('should move selected source items to target via moveToTarget()', (): void => {
      const { host, component } = setup();
      const germany: Country = getCountry(SOURCE_COUNTRIES, 0);
      host.sourceSelection.set([germany]);
      TestBed.flushEffects();

      component.moveToTarget();

      expect(host.source()).not.toContain(germany);
      expect(host.target()).toContain(germany);
      expect(host.sourceSelection()).toEqual([]);
      expect(host.lastMoveToTarget?.items).toEqual([germany]);
    });

    it('should move all source items to target via moveAllToTarget()', (): void => {
      const { host, component } = setup();

      component.moveAllToTarget();

      expect(host.source()).toEqual([]);
      expect(host.target().length).toBe(SOURCE_COUNTRIES.length + TARGET_COUNTRIES.length);
      expect(host.lastMoveAllToTarget?.items.length).toBe(SOURCE_COUNTRIES.length);
    });

    it('should move selected target items to source via moveToSource()', (): void => {
      const { host, component } = setup();
      const us: Country = getCountry(TARGET_COUNTRIES, 0);
      host.targetSelection.set([us]);
      TestBed.flushEffects();

      component.moveToSource();

      expect(host.target()).not.toContain(us);
      expect(host.source()).toContain(us);
      expect(host.targetSelection()).toEqual([]);
      expect(host.lastMoveToSource?.items).toEqual([us]);
    });

    it('should move all target items to source via moveAllToSource()', (): void => {
      const { host, component } = setup();

      component.moveAllToSource();

      expect(host.target()).toEqual([]);
      expect(host.source().length).toBe(SOURCE_COUNTRIES.length + TARGET_COUNTRIES.length);
      expect(host.lastMoveAllToSource?.items.length).toBe(TARGET_COUNTRIES.length);
    });

    it('should not move when isMoveToTargetDisabled', (): void => {
      const { host, component } = setup();
      // no sourceSelection set
      const sourceCountBefore: number = host.source().length;
      component.moveToTarget();
      expect(host.source().length).toBe(sourceCountBefore);
    });

    it('should not move all when source is empty', (): void => {
      const { host, component } = setup({ source: [] });
      component.moveAllToTarget();
      expect(host.target().length).toBe(TARGET_COUNTRIES.length);
    });

    it('should update isMoveToTargetDisabled based on selection', (): void => {
      const { host, component } = setup();
      expect(component.isMoveToTargetDisabled()).toBe(true);

      host.sourceSelection.set([getCountry(SOURCE_COUNTRIES, 0)]);
      TestBed.flushEffects();
      expect(component.isMoveToTargetDisabled()).toBe(false);
    });

    it('should update isMoveAllToTargetDisabled based on source items', (): void => {
      const { component } = setup({ source: [] });
      expect(component.isMoveAllToTargetDisabled()).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Selection
  // -------------------------------------------------------------------------

  describe('selection', (): void => {
    it('should toggle source item selection on click', (): void => {
      const { fixture, host, component } = setup();
      const germany: Country = getCountry(SOURCE_COUNTRIES, 0);

      const firstItem: HTMLElement | undefined = getSourceItems(fixture)[0];
      expect(firstItem).toBeDefined();
      firstItem!.click();
      fixture.detectChanges();

      expect(component.isSourceSelected(germany)).toBe(true);
      expect(host.sourceSelection()).toContain(germany);
    });

    it('should deselect source item on second click', (): void => {
      const { fixture, host, component } = setup();
      const germany: Country = getCountry(SOURCE_COUNTRIES, 0);

      const firstItem: HTMLElement | undefined = getSourceItems(fixture)[0];
      firstItem!.click();
      fixture.detectChanges();
      firstItem!.click();
      fixture.detectChanges();

      expect(component.isSourceSelected(germany)).toBe(false);
      expect(host.sourceSelection()).not.toContain(germany);
    });

    it('should toggle target item selection on click', (): void => {
      const { fixture, host, component } = setup();
      const us: Country = getCountry(TARGET_COUNTRIES, 0);

      const firstTarget: HTMLElement | undefined = getTargetItems(fixture)[0];
      firstTarget!.click();
      fixture.detectChanges();

      expect(component.isTargetSelected(us)).toBe(true);
      expect(host.targetSelection()).toContain(us);
    });

    it('should emit sourceSelectionChanged on source click', (): void => {
      const { fixture, host } = setup();

      getSourceItems(fixture)[0]!.click();
      fixture.detectChanges();

      expect(host.lastSourceSelectionChange).not.toBeNull();
      expect(host.lastSourceSelectionChange?.value.length).toBe(1);
    });

    it('should emit targetSelectionChanged on target click', (): void => {
      const { fixture, host } = setup();

      getTargetItems(fixture)[0]!.click();
      fixture.detectChanges();

      expect(host.lastTargetSelectionChange).not.toBeNull();
      expect(host.lastTargetSelectionChange?.value.length).toBe(1);
    });

    it('should not change selection when disabled', (): void => {
      const { fixture, component } = setup({ disabled: true });

      getSourceItems(fixture)[0]!.click();
      fixture.detectChanges();

      expect(component.sourceSelection().length).toBe(0);
    });
  });

  // -------------------------------------------------------------------------
  // Source reorder
  // -------------------------------------------------------------------------

  describe('source reorder', (): void => {
    it('should move selected source item up', (): void => {
      const { host, component } = setup();
      const france: Country = getCountry(SOURCE_COUNTRIES, 1);
      host.sourceSelection.set([france]);
      TestBed.flushEffects();

      component.moveSourceUp();

      expect(host.source()[0]).toBe(france);
      expect(host.lastReorder?.list).toBe('source');
    });

    it('should not move source item up when already at top', (): void => {
      const { host, component } = setup();
      const germany: Country = getCountry(SOURCE_COUNTRIES, 0);
      host.sourceSelection.set([germany]);
      TestBed.flushEffects();

      expect(component.isSourceMoveUpDisabled()).toBe(true);
      component.moveSourceUp();
      expect(host.source()[0]).toBe(germany);
    });

    it('should move selected source item down', (): void => {
      const { host, component } = setup();
      const germany: Country = getCountry(SOURCE_COUNTRIES, 0);
      host.sourceSelection.set([germany]);
      TestBed.flushEffects();

      component.moveSourceDown();

      expect(host.source()[1]).toBe(germany);
    });

    it('should move selected source item to top', (): void => {
      const { host, component } = setup();
      const italy: Country = getCountry(SOURCE_COUNTRIES, 2);
      host.sourceSelection.set([italy]);
      TestBed.flushEffects();

      component.moveSourceTop();

      expect(host.source()[0]).toBe(italy);
    });

    it('should move selected source item to bottom', (): void => {
      const { host, component } = setup();
      const germany: Country = getCountry(SOURCE_COUNTRIES, 0);
      host.sourceSelection.set([germany]);
      TestBed.flushEffects();

      component.moveSourceBottom();

      expect(host.source()[host.source().length - 1]).toBe(germany);
    });
  });

  // -------------------------------------------------------------------------
  // Target reorder
  // -------------------------------------------------------------------------

  describe('target reorder', (): void => {
    it('should move selected target item up', (): void => {
      const { host, component } = setup();
      const gb: Country = getCountry(TARGET_COUNTRIES, 1);
      host.targetSelection.set([gb]);
      TestBed.flushEffects();

      component.moveTargetUp();

      expect(host.target()[0]).toBe(gb);
      expect(host.lastReorder?.list).toBe('target');
    });

    it('should move selected target item to bottom', (): void => {
      const { host, component } = setup();
      const us: Country = getCountry(TARGET_COUNTRIES, 0);
      host.targetSelection.set([us]);
      TestBed.flushEffects();

      component.moveTargetBottom();

      expect(host.target()[host.target().length - 1]).toBe(us);
    });
  });

  // -------------------------------------------------------------------------
  // Filter
  // -------------------------------------------------------------------------

  describe('filter', (): void => {
    it('should filter source items by name', (): void => {
      const { component } = setup({ filterBy: 'name' });
      component.sourceFilterQuery.set('ger');
      TestBed.flushEffects();

      expect(component.displaySourceItems().length).toBe(1);
      expect((component.displaySourceItems()[0] as Country).name).toBe('Germany');
    });

    it('should show all source items when filter is cleared', (): void => {
      const { component } = setup({ filterBy: 'name' });
      component.sourceFilterQuery.set('ger');
      TestBed.flushEffects();
      component.sourceFilterQuery.set('');
      TestBed.flushEffects();

      expect(component.displaySourceItems().length).toBe(SOURCE_COUNTRIES.length);
    });

    it('should set isSourceEmptyDueToFilter when no items match', (): void => {
      const { component } = setup({ filterBy: 'name' });
      component.sourceFilterQuery.set('zzz');
      TestBed.flushEffects();

      expect(component.isSourceEmptyDueToFilter()).toBe(true);
    });

    it('should filter target items independently', (): void => {
      const { component } = setup({ filterBy: 'name' });
      component.targetFilterQuery.set('unit');
      TestBed.flushEffects();

      expect(component.displayTargetItems().length).toBe(2);
    });
  });

  // -------------------------------------------------------------------------
  // Disabled state
  // -------------------------------------------------------------------------

  describe('disabled', (): void => {
    it('should disable all transfer buttons when disabled', (): void => {
      const { fixture } = setup({ disabled: true });
      const buttons: HTMLElement[] = getTransferButtons(fixture);
      buttons.forEach((button: HTMLElement): void => {
        expect(button.hasAttribute('disabled')).toBe(true);
      });
    });

    it('should not transfer when disabled', (): void => {
      const { host, component } = setup({ disabled: true });
      host.sourceSelection.set([getCountry(SOURCE_COUNTRIES, 0)]);
      TestBed.flushEffects();

      component.moveToTarget();

      expect(host.source().length).toBe(SOURCE_COUNTRIES.length);
    });
  });

  // -------------------------------------------------------------------------
  // trackBy
  // -------------------------------------------------------------------------

  describe('trackBy', (): void => {
    it('should use trackBy key for item identity', (): void => {
      const { host, component } = setup();
      host.trackBy.set('code');
      TestBed.flushEffects();

      // Create a new reference but same code
      const germanyClone: Country = { code: 'DE', name: 'Germany' };
      expect(component.isSourceSelected(germanyClone)).toBe(false);

      host.sourceSelection.set([germanyClone]);
      TestBed.flushEffects();

      expect(component.isSourceSelected(germanyClone)).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // resolveItemLabel
  // -------------------------------------------------------------------------

  describe('resolveItemLabel', (): void => {
    it('should return string representation of item when no trackBy', (): void => {
      const { component } = setup();
      expect(component.resolveItemLabel('simple')).toBe('simple');
    });

    it('should resolve trackBy property as label', (): void => {
      const { host, component } = setup();
      host.trackBy.set('name');
      TestBed.flushEffects();
      expect(component.resolveItemLabel(getCountry(SOURCE_COUNTRIES, 0))).toBe('Germany');
    });
  });

  // -------------------------------------------------------------------------
  // Computed disabled states
  // -------------------------------------------------------------------------

  describe('computed disabled states', (): void => {
    it('isSourceMoveUpDisabled should be true when nothing selected', (): void => {
      const { component } = setup();
      expect(component.isSourceMoveUpDisabled()).toBe(true);
    });

    it('isSourceMoveDownDisabled should be true when bottom item selected', (): void => {
      const { host, component } = setup();
      const lastCountry: Country = getCountry(SOURCE_COUNTRIES, SOURCE_COUNTRIES.length - 1);
      host.sourceSelection.set([lastCountry]);
      TestBed.flushEffects();
      expect(component.isSourceMoveDownDisabled()).toBe(true);
    });

    it('isMoveAllToSourceDisabled should be true when target is empty', (): void => {
      const { component } = setup({ target: [] });
      TestBed.flushEffects();
      expect(component.isMoveAllToSourceDisabled()).toBe(true);
    });
  });
});
