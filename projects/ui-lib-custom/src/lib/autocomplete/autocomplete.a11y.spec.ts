import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { DebugElement, WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UiLibAutoComplete } from './autocomplete';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ── Shared option fixtures ────────────────────────────────────────────────────

interface FlatOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface GroupedOption {
  label: string;
  items: FlatOption[];
}

const FLAT_OPTIONS: FlatOption[] = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
];

const GROUPED_OPTIONS: GroupedOption[] = [
  {
    label: 'Letters',
    items: [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ],
  },
  {
    label: 'Numbers',
    items: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
];

// ── Host components ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  template: `
    <label [for]="'ac-test'">Search fruits</label>
    <ui-lib-autocomplete
      inputId="ac-test"
      [suggestions]="suggestions()"
      optionLabel="label"
      optionValue="value"
      [appendTo]="undefined"
      placeholder="Type to search"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {
  public readonly suggestions: WritableSignal<FlatOption[]> = signal<FlatOption[]>([]);
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  template: `
    <label [for]="'ac-multi'">Select tags</label>
    <ui-lib-autocomplete
      inputId="ac-multi"
      [multiple]="true"
      [suggestions]="suggestions()"
      optionLabel="label"
      optionValue="value"
      [appendTo]="undefined"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiHostComponent {
  public readonly suggestions: WritableSignal<FlatOption[]> = signal<FlatOption[]>([]);
  public value: string[] = [];
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  template: `
    <label [for]="'ac-group'">Select item</label>
    <ui-lib-autocomplete
      inputId="ac-group"
      [group]="true"
      [suggestions]="suggestions()"
      optionLabel="label"
      optionValue="value"
      [appendTo]="undefined"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GroupedHostComponent {
  public readonly suggestions: WritableSignal<GroupedOption[]> = signal<GroupedOption[]>([]);
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  template: `
    <label [for]="'ac-disabled'">Disabled search</label>
    <ui-lib-autocomplete
      inputId="ac-disabled"
      [disabled]="true"
      [suggestions]="suggestions()"
      optionLabel="label"
      optionValue="value"
      [appendTo]="undefined"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {
  public readonly suggestions: WritableSignal<FlatOption[]> = signal<FlatOption[]>([]);
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  template: `
    <label [for]="'ac-dropdown'">Pick option</label>
    <ui-lib-autocomplete
      inputId="ac-dropdown"
      [dropdown]="true"
      [showClear]="showClear()"
      [suggestions]="suggestions()"
      optionLabel="label"
      optionValue="value"
      [appendTo]="undefined"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DropdownHostComponent {
  public readonly suggestions: WritableSignal<FlatOption[]> = signal<FlatOption[]>([]);
  public readonly showClear: WritableSignal<boolean> = signal<boolean>(false);
  public value: string | null = null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function requireEl(root: HTMLElement, selector: string, label: string): HTMLElement {
  const element: Element | null = root.querySelector(selector);
  if (!element) throw new Error(`Expected ${label} (selector: ${selector})`);
  return element as HTMLElement;
}

function getInput(root: HTMLElement): HTMLInputElement {
  return requireEl(root, 'input.ui-autocomplete-input', 'autocomplete input') as HTMLInputElement;
}

function getPanel(root: HTMLElement): HTMLElement | null {
  return root.querySelector('.ui-autocomplete-panel');
}

function getAcInstance(fixture: ComponentFixture<unknown>): UiLibAutoComplete {
  const debugEl: DebugElement = fixture.debugElement.query(By.directive(UiLibAutoComplete));
  return (debugEl as unknown as { componentInstance: UiLibAutoComplete }).componentInstance;
}

// ── Test suites ───────────────────────────────────────────────────────────────

describe('UiLibAutoComplete — a11y', (): void => {
  // ── 1. Closed-state ARIA ────────────────────────────────────────────────────
  describe('Closed state ARIA', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let hostEl: HTMLElement;
    let input: HTMLInputElement;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
      input = getInput(hostEl);
    });

    it('input has role="combobox"', (): void => {
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('input has aria-haspopup="listbox"', (): void => {
      expect(input.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('input has aria-expanded="false" when panel is closed', (): void => {
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('input has aria-autocomplete="list"', (): void => {
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });

    it('aria-controls is null when panel is closed', (): void => {
      expect(input.getAttribute('aria-controls')).toBeNull();
    });

    it('aria-activedescendant is null when panel is closed', (): void => {
      expect(input.getAttribute('aria-activedescendant')).toBeNull();
    });

    it('no panel element in DOM when closed', (): void => {
      expect(getPanel(hostEl)).toBeNull();
    });
  });

  // ── 2. Open-state ARIA ──────────────────────────────────────────────────────
  describe('Open state ARIA', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let component: DefaultHostComponent;
    let hostEl: HTMLElement;
    let input: HTMLInputElement;
    let acComponent: UiLibAutoComplete;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(DefaultHostComponent);
      component = fixture.componentInstance;
      component.suggestions.set([...FLAT_OPTIONS]);
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
      acComponent = getAcInstance(fixture);
      acComponent.showPanel();
      fixture.detectChanges();
      input = getInput(hostEl);
    });

    it('input has aria-expanded="true" when panel is open', (): void => {
      expect(input.getAttribute('aria-expanded')).toBe('true');
    });

    it('aria-controls points to listbox id when open', (): void => {
      const listboxId: string | null = input.getAttribute('aria-controls');
      expect(listboxId).toBeTruthy();
      const listbox: Element | null = hostEl.querySelector(`#${listboxId}`);
      expect(listbox).toBeTruthy();
    });

    it('panel has role="listbox"', (): void => {
      const panel: HTMLElement | null = getPanel(hostEl);
      expect(panel?.getAttribute('role')).toBe('listbox');
    });

    it('options have role="option"', (): void => {
      const options: NodeListOf<Element> = hostEl.querySelectorAll('[role="option"]');
      expect(options.length).toBeGreaterThan(0);
    });

    it('options have aria-selected="false" when not selected', (): void => {
      const options: NodeListOf<Element> = hostEl.querySelectorAll('.ui-autocomplete-option');
      options.forEach((option: Element): void => {
        expect(option.getAttribute('aria-selected')).toBe('false');
      });
    });

    it('options have aria-setsize equal to total option count', (): void => {
      const options: NodeListOf<Element> = hostEl.querySelectorAll('.ui-autocomplete-option');
      options.forEach((option: Element): void => {
        expect(option.getAttribute('aria-setsize')).toBe(String(FLAT_OPTIONS.length));
      });
    });

    it('options have aria-posinset starting at 1', (): void => {
      const options: NodeListOf<Element> = hostEl.querySelectorAll('.ui-autocomplete-option');
      Array.from(options).forEach((option: Element, index: number): void => {
        expect(option.getAttribute('aria-posinset')).toBe(String(index + 1));
      });
    });

    it('first option is focused via aria-activedescendant', (): void => {
      const activeId: string | null = input.getAttribute('aria-activedescendant');
      expect(activeId).toBeTruthy();
      const activeOption: Element | null = hostEl.querySelector(`#${activeId}`);
      expect(activeOption).toBeTruthy();
    });
  });

  // ── 3. Keyboard navigation ──────────────────────────────────────────────────
  describe('Keyboard navigation', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let component: DefaultHostComponent;
    let hostEl: HTMLElement;
    let input: HTMLInputElement;
    let acComponent: UiLibAutoComplete;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(DefaultHostComponent);
      component = fixture.componentInstance;
      component.suggestions.set([...FLAT_OPTIONS]);
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
      acComponent = getAcInstance(fixture);
      input = getInput(hostEl);
    });

    it('ArrowDown opens panel', (): void => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel(hostEl)).toBeTruthy();
    });

    it('Enter selects focused option and closes panel', (): void => {
      acComponent.showPanel();
      fixture.detectChanges();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel(hostEl)).toBeNull();
    });

    it('Escape closes the panel', (): void => {
      acComponent.showPanel();
      fixture.detectChanges();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel(hostEl)).toBeNull();
    });

    it('ArrowDown moves aria-activedescendant to next option', (): void => {
      acComponent.showPanel();
      fixture.detectChanges();
      const before: string | null = input.getAttribute('aria-activedescendant');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      const after: string | null = input.getAttribute('aria-activedescendant');
      expect(after).not.toBe(before);
    });

    it('ArrowUp moves to a different option', (): void => {
      acComponent.showPanel();
      acComponent.setActiveIndex(FLAT_OPTIONS.length - 1);
      fixture.detectChanges();
      const before: string | null = input.getAttribute('aria-activedescendant');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      const after: string | null = input.getAttribute('aria-activedescendant');
      expect(after).not.toBe(before);
    });

    it('Home moves focus to first option', (): void => {
      acComponent.showPanel();
      acComponent.setActiveIndex(2);
      fixture.detectChanges();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      fixture.detectChanges();
      expect(acComponent.activeIndex()).toBe(0);
    });

    it('End moves focus to last option', (): void => {
      acComponent.showPanel();
      fixture.detectChanges();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      fixture.detectChanges();
      expect(acComponent.activeIndex()).toBe(FLAT_OPTIONS.length - 1);
    });
  });

  // ── 4. Multiple / chip mode ARIA ────────────────────────────────────────────
  describe('Multiple (chip) mode ARIA', (): void => {
    let fixture: ComponentFixture<MultiHostComponent>;
    let component: MultiHostComponent;
    let hostEl: HTMLElement;
    let acComponent: UiLibAutoComplete;

    beforeEach(async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [MultiHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(MultiHostComponent);
      component = fixture.componentInstance;
      component.suggestions.set([...FLAT_OPTIONS]);
      component.value = ['alpha'];
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
      acComponent = getAcInstance(fixture);
    });

    it('chip-list has role="group" (token container, not a selection listbox)', (): void => {
      const chipList: Element | null = hostEl.querySelector('.ui-autocomplete-chip-list');
      expect(chipList?.getAttribute('role')).toBe('group');
    });

    it('chip-list has aria-label="Selected items"', (): void => {
      const chipList: Element | null = hostEl.querySelector('.ui-autocomplete-chip-list');
      expect(chipList?.getAttribute('aria-label')).toBe('Selected items');
    });

    it('chip items have descriptive aria-label', (): void => {
      const chips: NodeListOf<Element> = hostEl.querySelectorAll('.ui-autocomplete-chip');
      chips.forEach((chip: Element): void => {
        expect(chip.getAttribute('aria-label')).toBeTruthy();
      });
    });

    it('chip remove button has aria-label containing "Remove"', (): void => {
      const removeBtn: Element | null = hostEl.querySelector('.ui-autocomplete-chip-remove');
      const label: string | null = removeBtn?.getAttribute('aria-label') ?? null;
      expect(label).toBeTruthy();
      expect(label).toContain('Remove');
    });

    it('chip remove button uses inline SVG not raw character', (): void => {
      const removeBtn: HTMLElement | null = hostEl.querySelector('.ui-autocomplete-chip-remove');
      const svg: Element | null = removeBtn?.querySelector('svg') ?? null;
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });

    it('panel stays open after chip selection in multiple mode', (): void => {
      acComponent.showPanel();
      fixture.detectChanges();
      const options: NodeListOf<HTMLElement> = hostEl.querySelectorAll('.ui-autocomplete-option');
      if (options.length > 0) {
        (options[0] as HTMLElement).click();
        fixture.detectChanges();
      }
      expect(getPanel(hostEl)).toBeTruthy();
    });
  });

  // ── 5. Disabled state ───────────────────────────────────────────────────────
  describe('Disabled state', (): void => {
    let fixture: ComponentFixture<DisabledHostComponent>;
    let hostEl: HTMLElement;
    let input: HTMLInputElement;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [DisabledHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(DisabledHostComponent);
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
      input = getInput(hostEl);
    });

    it('input has disabled attribute', (): void => {
      expect(input.disabled).toBe(true);
    });

    it('panel does not open on ArrowDown when disabled', (): void => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel(hostEl)).toBeNull();
    });
  });

  // ── 6. Dropdown + clear button ARIA ─────────────────────────────────────────
  describe('Dropdown and clear button', (): void => {
    let fixture: ComponentFixture<DropdownHostComponent>;
    let component: DropdownHostComponent;
    let hostEl: HTMLElement;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [DropdownHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(DropdownHostComponent);
      component = fixture.componentInstance;
      component.suggestions.set([...FLAT_OPTIONS]);
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
    });

    it('dropdown button has aria-label="Show suggestions"', (): void => {
      const btn: Element | null = hostEl.querySelector('.ui-autocomplete-dropdown-btn');
      expect(btn?.getAttribute('aria-label')).toBe('Show suggestions');
    });

    it('dropdown button uses inline SVG with aria-hidden="true"', (): void => {
      const btn: HTMLElement | null = hostEl.querySelector('.ui-autocomplete-dropdown-btn');
      const svg: Element | null = btn?.querySelector('svg') ?? null;
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });

    it('clear button has aria-label="Clear"', async (): Promise<void> => {
      component.showClear.set(true);
      const acComponent: UiLibAutoComplete = getAcInstance(fixture);
      acComponent.writeValue('alpha');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const btn: Element | null = hostEl.querySelector('.ui-autocomplete-clear');
      expect(btn?.getAttribute('aria-label')).toBe('Clear');
    });

    it('clear button uses inline SVG with aria-hidden="true"', async (): Promise<void> => {
      component.showClear.set(true);
      const acComponent: UiLibAutoComplete = getAcInstance(fixture);
      acComponent.writeValue('alpha');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const btn: HTMLElement | null = hostEl.querySelector('.ui-autocomplete-clear');
      const svg: Element | null = btn?.querySelector('svg') ?? null;
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── 7. Grouped options ARIA ─────────────────────────────────────────────────
  describe('Grouped options ARIA', (): void => {
    let fixture: ComponentFixture<GroupedHostComponent>;
    let component: GroupedHostComponent;
    let hostEl: HTMLElement;
    let acComponent: UiLibAutoComplete;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [GroupedHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(GroupedHostComponent);
      component = fixture.componentInstance;
      component.suggestions.set([...GROUPED_OPTIONS]);
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
      acComponent = getAcInstance(fixture);
      acComponent.showPanel();
      fixture.detectChanges();
    });

    it('group containers have role="group"', (): void => {
      const groups: NodeListOf<Element> = hostEl.querySelectorAll('.ui-autocomplete-option-group');
      expect(groups.length).toBe(2);
      groups.forEach((group: Element): void => {
        expect(group.getAttribute('role')).toBe('group');
      });
    });

    it('group containers have correct aria-label', (): void => {
      const groups: Element[] = Array.from(
        hostEl.querySelectorAll('.ui-autocomplete-option-group'),
      );
      expect(groups[0]?.getAttribute('aria-label')).toBe('Letters');
      expect(groups[1]?.getAttribute('aria-label')).toBe('Numbers');
    });

    it('group containers use CSS ::before for visual labels — no DOM label divs', (): void => {
      const labelDivs: NodeListOf<Element> = hostEl.querySelectorAll(
        '.ui-autocomplete-option-group-label',
      );
      expect(labelDivs.length).toBe(0);
    });

    it('all option children have role="option"', (): void => {
      const options: NodeListOf<Element> = hostEl.querySelectorAll('.ui-autocomplete-option');
      expect(options.length).toBe(4);
      options.forEach((opt: Element): void => {
        expect(opt.getAttribute('role')).toBe('option');
      });
    });

    it('options have aria-setsize spanning total of all grouped items', (): void => {
      const options: NodeListOf<Element> = hostEl.querySelectorAll('.ui-autocomplete-option');
      options.forEach((opt: Element): void => {
        expect(opt.getAttribute('aria-setsize')).toBe('4');
      });
    });
  });

  // ── 8. Live region for result count ─────────────────────────────────────────
  describe('Live region announcement', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let component: DefaultHostComponent;
    let hostEl: HTMLElement;
    let acComponent: UiLibAutoComplete;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      fixture = TestBed.createComponent(DefaultHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      hostEl = fixture.nativeElement as HTMLElement;
      acComponent = getAcInstance(fixture);
    });

    it('live region is always in the DOM', (): void => {
      const liveRegion: Element | null = hostEl.querySelector('.ui-autocomplete-sr-live');
      expect(liveRegion).toBeTruthy();
    });

    it('live region has aria-live="polite" and aria-atomic="true"', (): void => {
      const liveRegion: Element | null = hostEl.querySelector('.ui-autocomplete-sr-live');
      expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion?.getAttribute('aria-atomic')).toBe('true');
    });

    it('live region is empty when panel is closed', (): void => {
      const liveRegion: Element | null = hostEl.querySelector('.ui-autocomplete-sr-live');
      expect((liveRegion?.textContent ?? '').trim()).toBe('');
    });

    it('live region announces "N results available" when panel opens', (): void => {
      component.suggestions.set([...FLAT_OPTIONS]);
      acComponent.showPanel();
      fixture.detectChanges();
      const liveRegion: Element | null = hostEl.querySelector('.ui-autocomplete-sr-live');
      expect(liveRegion?.textContent).toContain('3 results available');
    });

    it('live region announces "1 result available" for single suggestion', (): void => {
      component.suggestions.set([FLAT_OPTIONS[0] as FlatOption]);
      acComponent.showPanel();
      fixture.detectChanges();
      const liveRegion: Element | null = hostEl.querySelector('.ui-autocomplete-sr-live');
      expect(liveRegion?.textContent).toContain('1 result available');
    });

    it('live region is empty when panel closes', (): void => {
      component.suggestions.set([...FLAT_OPTIONS]);
      acComponent.showPanel();
      fixture.detectChanges();
      acComponent.hidePanel();
      fixture.detectChanges();
      const liveRegion: Element | null = hostEl.querySelector('.ui-autocomplete-sr-live');
      expect((liveRegion?.textContent ?? '').trim()).toBe('');
    });
  });

  // ── 9. axe-core automated checks ────────────────────────────────────────────
  describe('axe-core automated checks', (): void => {
    it('closed state passes axe', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('open state with flat options passes axe', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.componentInstance.suggestions.set([...FLAT_OPTIONS]);
      fixture.detectChanges();
      getAcInstance(fixture).showPanel();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('multiple mode with chips passes axe', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [MultiHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<MultiHostComponent> =
        TestBed.createComponent(MultiHostComponent);
      fixture.componentInstance.suggestions.set([...FLAT_OPTIONS]);
      fixture.componentInstance.value = ['alpha', 'beta'];
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('multiple mode open panel passes axe', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [MultiHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<MultiHostComponent> =
        TestBed.createComponent(MultiHostComponent);
      fixture.componentInstance.suggestions.set([...FLAT_OPTIONS]);
      fixture.detectChanges();
      getAcInstance(fixture).showPanel();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('grouped options open state passes axe', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [GroupedHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<GroupedHostComponent> =
        TestBed.createComponent(GroupedHostComponent);
      fixture.componentInstance.suggestions.set([...GROUPED_OPTIONS]);
      fixture.detectChanges();
      getAcInstance(fixture).showPanel();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('disabled state passes axe', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [DisabledHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<DisabledHostComponent> =
        TestBed.createComponent(DisabledHostComponent);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('dropdown with clear button passes axe', async (): Promise<void> => {
      TestBed.configureTestingModule({
        imports: [DropdownHostComponent],
        providers: [provideZonelessChangeDetection()],
      });
      const fixture: ComponentFixture<DropdownHostComponent> =
        TestBed.createComponent(DropdownHostComponent);
      fixture.componentInstance.suggestions.set([...FLAT_OPTIONS]);
      fixture.componentInstance.showClear.set(true);
      fixture.detectChanges();
      const acInstance: UiLibAutoComplete = getAcInstance(fixture);
      acInstance.writeValue('alpha');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
