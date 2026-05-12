import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import type { EnvironmentProviders, Provider } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import {
  lucideArrowUp,
  lucideArrowDown,
  lucideChevronUp,
  lucideChevronDown,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsLeft,
  lucideChevronsRight,
} from '@ng-icons/lucide';
import { provideUiLibIcons } from 'ui-lib-custom/icon';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { PickListComponent } from './pick-list.component';
import { PickListItemDirective } from './pick-list-templates.directive';
import type { PickListVariant } from './pick-list.types';

// ---------------------------------------------------------------------------
// Helpers / types
// ---------------------------------------------------------------------------

interface Country {
  readonly code: string;
  readonly name: string;
}

const SOURCE_ITEMS: Country[] = [
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
];

const TARGET_ITEMS: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
];

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [PickListComponent, PickListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      [sourceAriaLabel]="sourceAriaLabel()"
      [targetAriaLabel]="targetAriaLabel()"
      [disabled]="disabled()"
      [variant]="variant()"
    >
      <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
    </ui-lib-pick-list>
  `,
})
class PickListA11yHostComponent {
  public readonly source: WritableSignal<Country[]> = signal<Country[]>([...SOURCE_ITEMS]);
  public readonly target: WritableSignal<Country[]> = signal<Country[]>([...TARGET_ITEMS]);
  public readonly sourceSelection: WritableSignal<Country[]> = signal<Country[]>([]);
  public readonly targetSelection: WritableSignal<Country[]> = signal<Country[]>([]);
  public readonly sourceHeader: WritableSignal<string | null> = signal<string | null>(null);
  public readonly targetHeader: WritableSignal<string | null> = signal<string | null>(null);
  public readonly filterBy: WritableSignal<string | null> = signal<string | null>(null);
  public readonly sourceAriaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly targetAriaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<PickListVariant | null> = signal<PickListVariant | null>(
    null
  );
}

/** Two instances on the same page for unique-ID testing. */
@Component({
  standalone: true,
  imports: [PickListComponent, PickListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-pick-list [source]="items" [target]="[]">
      <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
    </ui-lib-pick-list>
    <ui-lib-pick-list [source]="items" [target]="[]">
      <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
    </ui-lib-pick-list>
  `,
})
class MultiPickListA11yHostComponent {
  public readonly items: Country[] = SOURCE_ITEMS.slice(0, 2);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

const ICON_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  provideUiLibIcons(),
  provideIcons({
    arrowUp: lucideArrowUp,
    arrowDown: lucideArrowDown,
    chevronUp: lucideChevronUp,
    chevronDown: lucideChevronDown,
    chevronLeft: lucideChevronLeft,
    chevronRight: lucideChevronRight,
    chevronsLeft: lucideChevronsLeft,
    chevronsRight: lucideChevronsRight,
  }),
];

function queryEl<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryRequired<T extends Element>(fixture: ComponentFixture<unknown>, selector: string): T {
  const element: T | null = queryEl<T>(fixture, selector);
  if (element === null) throw new Error(`No element for selector: ${selector}`);
  return element;
}

function queryAll<T extends Element>(fixture: ComponentFixture<unknown>, selector: string): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function createFixture(): ComponentFixture<PickListA11yHostComponent> {
  const fixture: ComponentFixture<PickListA11yHostComponent> =
    TestBed.createComponent(PickListA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  return fixture;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PickList Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PickListA11yHostComponent, MultiPickListA11yHostComponent],
      providers: [provideZonelessChangeDetection(), ...ICON_PROVIDERS],
    }).compileComponents();
  });

  afterEach((): void => {
    document.body.innerHTML = '';
  });

  // -------------------------------------------------------------------------
  // axe-core automated checks
  // -------------------------------------------------------------------------

  describe('axe-core automated checks', (): void => {
    it('passes axe in default state', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with items selected in source', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.sourceSelection.set([SOURCE_ITEMS[0]!]);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with items selected in target', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.targetSelection.set([TARGET_ITEMS[0]!]);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with filter enabled', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.filterBy.set('name');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with empty source list', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.source.set([]);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // -------------------------------------------------------------------------
  // ARIA structure
  // -------------------------------------------------------------------------

  describe('ARIA structure', (): void => {
    it('renders source listbox with role=listbox', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const sourceList: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      expect(sourceList.getAttribute('role')).toBe('listbox');
    });

    it('renders target listbox with role=listbox', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const targetList: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--target .ui-lib-pick-list__list'
      );
      expect(targetList.getAttribute('role')).toBe('listbox');
    });

    it('sets aria-multiselectable="true" on both listboxes', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const lists: HTMLElement[] = queryAll<HTMLElement>(fixture, '.ui-lib-pick-list__list');
      expect(lists.length).toBe(2);
      lists.forEach((list: HTMLElement): void => {
        expect(list.getAttribute('aria-multiselectable')).toBe('true');
      });
    });

    it('uses default aria-label "Source list" when sourceAriaLabel is null', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const sourceList: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      expect(sourceList.getAttribute('aria-label')).toBe('Source list');
    });

    it('uses default aria-label "Target list" when targetAriaLabel is null', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const targetList: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--target .ui-lib-pick-list__list'
      );
      expect(targetList.getAttribute('aria-label')).toBe('Target list');
    });

    it('reflects custom sourceAriaLabel on the source listbox', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.sourceAriaLabel.set('Available countries');
      fixture.detectChanges();
      const sourceList: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      expect(sourceList.getAttribute('aria-label')).toBe('Available countries');
    });

    it('reflects custom targetAriaLabel on the target listbox', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.targetAriaLabel.set('Selected countries');
      fixture.detectChanges();
      const targetList: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--target .ui-lib-pick-list__list'
      );
      expect(targetList.getAttribute('aria-label')).toBe('Selected countries');
    });

    it('renders list items with role=option', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const items: HTMLElement[] = queryAll<HTMLElement>(fixture, '.ui-lib-pick-list__item');
      expect(items.length).toBeGreaterThan(0);
      items.forEach((item: HTMLElement): void => {
        expect(item.getAttribute('role')).toBe('option');
      });
    });

    it('sets aria-selected="false" on unselected items', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const items: HTMLElement[] = queryAll<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__item'
      );
      items.forEach((item: HTMLElement): void => {
        expect(item.getAttribute('aria-selected')).toBe('false');
      });
    });

    it('sets aria-selected="true" on selected source items', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.sourceSelection.set([SOURCE_ITEMS[0]!]);
      fixture.detectChanges();
      const items: HTMLElement[] = queryAll<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__item'
      );
      expect(items[0]?.getAttribute('aria-selected')).toBe('true');
      expect(items[1]?.getAttribute('aria-selected')).toBe('false');
    });

    it('assigns unique IDs to both listboxes within an instance', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const lists: HTMLElement[] = queryAll<HTMLElement>(fixture, '.ui-lib-pick-list__list');
      const ids: string[] = lists.map((list: HTMLElement): string => list.id);
      expect(new Set(ids).size).toBe(2);
    });

    it('assigns unique listbox IDs across multiple instances', (): void => {
      const fixture: ComponentFixture<MultiPickListA11yHostComponent> = TestBed.createComponent(
        MultiPickListA11yHostComponent
      );
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();

      const lists: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-pick-list__list'
        )
      );
      expect(lists.length).toBe(4);
      const ids: string[] = lists.map((list: HTMLElement): string => list.id);
      expect(new Set(ids).size).toBe(4);
    });

    it('marks all icons inside buttons as aria-hidden', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const icons: HTMLElement[] = queryAll<HTMLElement>(fixture, 'button ui-lib-icon');
      expect(icons.length).toBeGreaterThan(0);
      icons.forEach((icon: HTMLElement): void => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('transfer buttons have descriptive aria-labels', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const buttons: HTMLButtonElement[] = queryAll<HTMLButtonElement>(
        fixture,
        '.ui-lib-pick-list__transfer-btn'
      );
      expect(buttons.length).toBe(4);
      const labels: (string | null)[] = buttons.map((btn: HTMLButtonElement): string | null =>
        btn.getAttribute('aria-label')
      );
      expect(labels).toContain('Move all to target');
      expect(labels).toContain('Move selected to target');
      expect(labels).toContain('Move selected to source');
      expect(labels).toContain('Move all to source');
    });

    it('reorder control buttons have descriptive aria-labels', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const buttons: HTMLButtonElement[] = queryAll<HTMLButtonElement>(
        fixture,
        '.ui-lib-pick-list__control-btn'
      );
      expect(buttons.length).toBe(8);
      buttons.forEach((btn: HTMLButtonElement): void => {
        const label: string | null = btn.getAttribute('aria-label');
        expect(label).toBeTruthy();
        expect(label!.length).toBeGreaterThan(0);
      });
    });

    it('assigns unique IDs to item elements', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const items: HTMLElement[] = queryAll<HTMLElement>(fixture, '.ui-lib-pick-list__item');
      const ids: string[] = items.map((item: HTMLElement): string => item.id).filter(Boolean);
      expect(ids.length).toBe(items.length);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  // -------------------------------------------------------------------------
  // Keyboard navigation
  // -------------------------------------------------------------------------

  describe('keyboard navigation', (): void => {
    it('ArrowDown moves focus to the next source item', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      component.focusItem('source', 0);
      fixture.detectChanges();
      await fixture.whenStable();

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceFocusedIndex()).toBe(1);
    });

    it('ArrowUp moves focus to the previous source item', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      component.focusItem('source', 2);
      fixture.detectChanges();
      await fixture.whenStable();

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceFocusedIndex()).toBe(1);
    });

    it('Home key moves focus to the first source item', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      component.focusItem('source', 3);
      fixture.detectChanges();
      await fixture.whenStable();

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceFocusedIndex()).toBe(0);
    });

    it('End key moves focus to the last source item', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      component.focusItem('source', 0);
      fixture.detectChanges();
      await fixture.whenStable();

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceFocusedIndex()).toBe(3);
    });

    it('Space toggles selection of the focused source item', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      component.focusItem('source', 0);
      fixture.detectChanges();
      await fixture.whenStable();

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceSelection().length).toBe(1);
    });

    it('Enter toggles selection of the focused source item', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      component.focusItem('source', 1);
      fixture.detectChanges();
      await fixture.whenStable();

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceSelection().length).toBe(1);
    });

    it('Ctrl+a selects all source items', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceSelection().length).toBe(SOURCE_ITEMS.length);
    });

    it('Escape clears source selection', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.sourceSelection.set([SOURCE_ITEMS[0]!]);
      fixture.detectChanges();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sourceSelection().length).toBe(0);
    });

    it('Ctrl+ArrowRight transfers selected source item to target', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.sourceSelection.set([SOURCE_ITEMS[0]!]);
      fixture.detectChanges();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;
      const initialTargetCount: number = component.target().length;

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--source .ui-lib-pick-list__list'
      );
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', ctrlKey: true, bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.target().length).toBe(initialTargetCount + 1);
    });

    it('Ctrl+ArrowLeft transfers selected target item to source', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.targetSelection.set([TARGET_ITEMS[0]!]);
      fixture.detectChanges();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;
      const initialSourceCount: number = component.source().length;

      const list: HTMLElement = queryRequired<HTMLElement>(
        fixture,
        '.ui-lib-pick-list__panel--target .ui-lib-pick-list__list'
      );
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', ctrlKey: true, bubbles: true })
      );
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.source().length).toBe(initialSourceCount + 1);
    });
  });

  // -------------------------------------------------------------------------
  // Live region / transfer announcements
  // -------------------------------------------------------------------------

  describe('live region transfer announcements', (): void => {
    it('moveToTarget announces the number of moved items', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.sourceSelection.set([SOURCE_ITEMS[0]!]);
      fixture.detectChanges();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      const announcerSpy: jest.SpyInstance = jest.spyOn(
        (component as unknown as { liveAnnouncer: { announce: (msg: string) => Promise<void> } })
          .liveAnnouncer,
        'announce'
      );

      component.moveToTarget();
      expect(announcerSpy).toHaveBeenCalledWith(expect.stringContaining('moved to target'));
    });

    it('moveAllToTarget announces all moved items', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      const announcerSpy: jest.SpyInstance = jest.spyOn(
        (component as unknown as { liveAnnouncer: { announce: (msg: string) => Promise<void> } })
          .liveAnnouncer,
        'announce'
      );

      component.moveAllToTarget();
      expect(announcerSpy).toHaveBeenCalledWith(expect.stringContaining('moved to target'));
    });

    it('moveToSource announces the number of moved items', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.targetSelection.set([TARGET_ITEMS[0]!]);
      fixture.detectChanges();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      const announcerSpy: jest.SpyInstance = jest.spyOn(
        (component as unknown as { liveAnnouncer: { announce: (msg: string) => Promise<void> } })
          .liveAnnouncer,
        'announce'
      );

      component.moveToSource();
      expect(announcerSpy).toHaveBeenCalledWith(expect.stringContaining('moved to source'));
    });

    it('moveAllToSource announces all moved items', (): void => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      const component: PickListComponent = fixture.debugElement.query(
        By.directive(PickListComponent)
      ).componentInstance as PickListComponent;

      const announcerSpy: jest.SpyInstance = jest.spyOn(
        (component as unknown as { liveAnnouncer: { announce: (msg: string) => Promise<void> } })
          .liveAnnouncer,
        'announce'
      );

      component.moveAllToSource();
      expect(announcerSpy).toHaveBeenCalledWith(expect.stringContaining('moved to source'));
    });
  });

  // -------------------------------------------------------------------------
  // Variant checks
  // -------------------------------------------------------------------------

  describe('variant accessibility checks', (): void => {
    it('passes axe with material variant', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.variant.set('material');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with bootstrap variant', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with minimal variant', async (): Promise<void> => {
      const fixture: ComponentFixture<PickListA11yHostComponent> = createFixture();
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
