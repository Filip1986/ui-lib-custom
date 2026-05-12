import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ListboxComponent } from './listbox.component';
import type { ListboxOption } from './listbox.types';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

const SKIP_LISTBOX_STRUCTURE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

const FLAT_OPTIONS: ListboxOption[] = [
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

@Component({
  standalone: true,
  imports: [FormsModule, ListboxComponent],
  template: `
    <span id="external-label">External Fruits Label</span>
    <ui-lib-listbox
      [options]="options()"
      [multiple]="multiple()"
      [checkbox]="checkbox()"
      [showToggleAll]="showToggleAll()"
      [filter]="filter()"
      [group]="group()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ListboxA11yHostComponent {
  public readonly options: WritableSignal<unknown[]> = signal<unknown[]>(FLAT_OPTIONS);
  public readonly multiple: WritableSignal<boolean> = signal<boolean>(false);
  public readonly checkbox: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showToggleAll: WritableSignal<boolean> = signal<boolean>(false);
  public readonly filter: WritableSignal<boolean> = signal<boolean>(false);
  public readonly group: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Choose a fruit');
  public readonly ariaLabelledBy: WritableSignal<string> = signal<string>('');
  public value: unknown = null;
}

@Component({
  standalone: true,
  imports: [ListboxComponent],
  template: `
    <ui-lib-listbox [options]="firstOptions" ariaLabel="First" />
    <ui-lib-listbox [options]="secondOptions" ariaLabel="Second" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoListboxHostComponent {
  public readonly firstOptions: ListboxOption[] = FLAT_OPTIONS;
  public readonly secondOptions: ListboxOption[] = FLAT_OPTIONS;
}

const fixtures: ComponentFixture<unknown>[] = [];

async function setup(
  configure?: (host: ListboxA11yHostComponent) => void
): Promise<ComponentFixture<ListboxA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ListboxA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<ListboxA11yHostComponent> =
    TestBed.createComponent(ListboxA11yHostComponent);

  configure?.(fixture.componentInstance);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  fixtures.push(fixture);
  return fixture;
}

async function setupTwoListboxHost(): Promise<ComponentFixture<TwoListboxHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TwoListboxHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<TwoListboxHostComponent> =
    TestBed.createComponent(TwoListboxHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  fixtures.push(fixture);
  return fixture;
}

function hostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function listboxElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const element: HTMLElement | null = hostElement(fixture).querySelector(
    '.ui-lib-listbox__list-container'
  );
  if (!element) {
    throw new Error('Listbox element not found');
  }
  return element;
}

function optionElements(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(hostElement(fixture).querySelectorAll('.ui-lib-listbox__item'));
}

function liveRegionElement(fixture: ComponentFixture<unknown>): HTMLElement {
  const element: HTMLElement | null = hostElement(fixture).querySelector(
    '.ui-lib-listbox__sr-live'
  );
  if (!element) {
    throw new Error('Live region element not found');
  }
  return element;
}

async function pressKey(
  fixture: ComponentFixture<unknown>,
  element: HTMLElement,
  key: string
): Promise<void> {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('Listbox Accessibility', (): void => {
  afterEach((): void => {
    fixtures.forEach((fixture: ComponentFixture<unknown>): void => {
      const fixtureElement: HTMLElement = fixture.nativeElement as HTMLElement;
      fixture.destroy();
      if (fixtureElement.parentNode === document.body) {
        document.body.removeChild(fixtureElement);
      }
    });
    fixtures.length = 0;
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe in default state', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in multiple + checkbox + toggle-all state', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.multiple.set(true);
          host.checkbox.set(true);
          host.showToggleAll.set(true);
        }
      );
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in grouped state', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.options.set(GROUPED_OPTIONS as unknown[]);
          host.group.set(true);
        }
      );
      await checkA11y(fixture, { rules: SKIP_LISTBOX_STRUCTURE_RULES });
    });

    it('passes axe in filtered-empty state', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.filter.set(true);
        }
      );
      const filterInput: HTMLInputElement = hostElement(fixture).querySelector(
        '.ui-lib-listbox__filter-input'
      ) as HTMLInputElement;
      filterInput.value = 'zzzz';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_LISTBOX_STRUCTURE_RULES });
    });
  });

  describe('ARIA structure', (): void => {
    it('sets role="listbox" on the list container', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      expect(listboxElement(fixture).getAttribute('role')).toBe('listbox');
    });

    it('sets role="option" on every option item', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      optionElements(fixture).forEach((option: HTMLElement): void => {
        expect(option.getAttribute('role')).toBe('option');
      });
    });

    it('sets aria-multiselectable="false" in single-select mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      expect(listboxElement(fixture).getAttribute('aria-multiselectable')).toBe('false');
    });

    it('sets aria-multiselectable="true" in multiple mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.multiple.set(true);
        }
      );
      expect(listboxElement(fixture).getAttribute('aria-multiselectable')).toBe('true');
    });

    it('uses aria-label from input', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      expect(listboxElement(fixture).getAttribute('aria-label')).toBe('Choose a fruit');
    });

    it('uses aria-labelledby when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.ariaLabel.set('');
          host.ariaLabelledBy.set('external-label');
        }
      );
      expect(listboxElement(fixture).getAttribute('aria-labelledby')).toBe('external-label');
    });

    it('marks group headers as decorative for screen readers', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.options.set(GROUPED_OPTIONS as unknown[]);
          host.group.set(true);
        }
      );
      const groupHeader: HTMLElement | null = hostElement(fixture).querySelector(
        '.ui-lib-listbox__group-header'
      );
      expect(groupHeader?.getAttribute('aria-hidden')).toBe('true');
    });

    it('provides an accessible label for the select-all checkbox', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.multiple.set(true);
          host.showToggleAll.set(true);
        }
      );
      const selectAll: HTMLInputElement | null = hostElement(fixture).querySelector(
        '.ui-lib-listbox__header input[type="checkbox"]'
      );
      expect(selectAll?.getAttribute('aria-label')).toBe('Select all options');
    });

    it('marks filter icon graphics as decorative', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.filter.set(true);
        }
      );
      const iconWrap: HTMLElement | null = hostElement(fixture).querySelector(
        '.ui-lib-listbox__filter-icon'
      );
      const iconSvg: SVGElement | null = hostElement(fixture).querySelector(
        '.ui-lib-listbox__filter-icon svg'
      );
      expect(iconWrap?.getAttribute('aria-hidden')).toBe('true');
      expect(iconSvg?.getAttribute('aria-hidden')).toBe('true');
      expect(iconSvg?.getAttribute('focusable')).toBe('false');
    });

    it('marks checkbox check icon SVG as decorative', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.multiple.set(true);
          host.checkbox.set(true);
        }
      );
      optionElements(fixture)[0]?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const checkedIcon: SVGElement | null = hostElement(fixture).querySelector(
        '.ui-lib-listbox__checkbox--checked svg'
      );
      expect(checkedIcon?.getAttribute('aria-hidden')).toBe('true');
      expect(checkedIcon?.getAttribute('focusable')).toBe('false');
    });

    it('generates a unique listbox element id', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      expect(listboxElement(fixture).id).toMatch(/^ui-lib-listbox-\d+-list$/);
    });

    it('generates unique option ids within a listbox instance', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const ids: string[] = optionElements(fixture).map((option: HTMLElement): string => option.id);
      const uniqueIds: Set<string> = new Set<string>(ids);
      expect(ids.every((id: string): boolean => id.startsWith('ui-lib-listbox-'))).toBe(true);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('keyboard navigation and aria-activedescendant', (): void => {
    it('sets aria-activedescendant after list receives focus', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);
      expect(listbox.getAttribute('aria-activedescendant')).toBeNull();

      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(listbox.getAttribute('aria-activedescendant')).toBeTruthy();
    });

    it('ArrowDown updates aria-activedescendant', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);
      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const before: string | null = listbox.getAttribute('aria-activedescendant');
      await pressKey(fixture, listbox, 'ArrowDown');
      const after: string | null = listbox.getAttribute('aria-activedescendant');

      expect(after).not.toBe(before);
    });

    it('ArrowUp moves aria-activedescendant backward', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);
      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      await pressKey(fixture, listbox, 'ArrowDown');
      const beforeArrowUp: string | null = listbox.getAttribute('aria-activedescendant');
      await pressKey(fixture, listbox, 'ArrowUp');
      const afterArrowUp: string | null = listbox.getAttribute('aria-activedescendant');

      expect(afterArrowUp).not.toBe(beforeArrowUp);
    });

    it('Home focuses the first option id', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);
      const firstOptionId: string = optionElements(fixture)[0]!.id;

      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await pressKey(fixture, listbox, 'End');
      await pressKey(fixture, listbox, 'Home');

      expect(listbox.getAttribute('aria-activedescendant')).toBe(firstOptionId);
    });

    it('End focuses the last enabled option id', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);
      const enabledOptions: HTMLElement[] = optionElements(fixture).filter(
        (option: HTMLElement): boolean => option.getAttribute('aria-disabled') !== 'true'
      );
      const expectedLastEnabledId: string = enabledOptions[enabledOptions.length - 1]!.id;

      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await pressKey(fixture, listbox, 'End');

      expect(listbox.getAttribute('aria-activedescendant')).toBe(expectedLastEnabledId);
    });

    it('aria-activedescendant always points to an existing option element', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);

      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await pressKey(fixture, listbox, 'ArrowDown');

      const activeId: string | null = listbox.getAttribute('aria-activedescendant');
      expect(activeId).toBeTruthy();
      expect(hostElement(fixture).querySelector(`#${activeId}`)).toBeTruthy();
    });

    it('clears aria-activedescendant when filter removes all options', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.filter.set(true);
        }
      );
      const listbox: HTMLElement = listboxElement(fixture);
      const filterInput: HTMLInputElement = hostElement(fixture).querySelector(
        '.ui-lib-listbox__filter-input'
      ) as HTMLInputElement;

      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      filterInput.value = 'zzzz';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(listbox.getAttribute('aria-activedescendant')).toBeNull();
    });

    it('Enter selects the focused option', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);

      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await pressKey(fixture, listbox, 'Enter');

      expect(optionElements(fixture)[0]!.getAttribute('aria-selected')).toBe('true');
    });

    it('Space selects the focused option', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const listbox: HTMLElement = listboxElement(fixture);

      listbox.focus();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await pressKey(fixture, listbox, ' ');

      expect(optionElements(fixture)[0]!.getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('live region announcements', (): void => {
    it('renders a polite live region with atomic announcements', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const liveRegion: HTMLElement = liveRegionElement(fixture);

      expect(liveRegion.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
    });

    it('starts with an empty live region', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      expect(liveRegionElement(fixture).textContent!.trim()).toBe('');
    });

    it('announces result count when filtering', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.filter.set(true);
        }
      );
      const filterInput: HTMLInputElement = hostElement(fixture).querySelector(
        '.ui-lib-listbox__filter-input'
      ) as HTMLInputElement;

      filterInput.value = 'a';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(liveRegionElement(fixture).textContent!.trim()).toMatch(/results? available\./i);
    });

    it('announces selected option label in single-select mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      optionElements(fixture)[1]!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(liveRegionElement(fixture).textContent!.trim()).toBe('Selected Banana.');
    });

    it('announces selection cleared when active item is deselected', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup();
      const firstOption: HTMLElement = optionElements(fixture)[0]!;

      firstOption.click();
      fixture.detectChanges();
      await fixture.whenStable();
      firstOption.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(liveRegionElement(fixture).textContent!.trim()).toBe('Selection cleared.');
    });

    it('announces selected option count in multiple mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.multiple.set(true);
          host.showToggleAll.set(true);
        }
      );
      const selectAll: HTMLInputElement = hostElement(fixture).querySelector(
        '.ui-lib-listbox__header input[type="checkbox"]'
      ) as HTMLInputElement;

      selectAll.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(liveRegionElement(fixture).textContent!.trim()).toBe('3 options selected.');
    });

    it('announces zero selected options when toggle-all is switched off', async (): Promise<void> => {
      const fixture: ComponentFixture<ListboxA11yHostComponent> = await setup(
        (host: ListboxA11yHostComponent): void => {
          host.multiple.set(true);
          host.showToggleAll.set(true);
        }
      );
      const selectAll: HTMLInputElement = hostElement(fixture).querySelector(
        '.ui-lib-listbox__header input[type="checkbox"]'
      ) as HTMLInputElement;

      selectAll.click();
      fixture.detectChanges();
      await fixture.whenStable();
      selectAll.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(liveRegionElement(fixture).textContent!.trim()).toBe('0 options selected.');
    });
  });

  describe('instance id uniqueness', (): void => {
    it('creates distinct listbox ids for different component instances', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoListboxHostComponent> = await setupTwoListboxHost();
      const listboxes: HTMLElement[] = Array.from(
        hostElement(fixture).querySelectorAll('.ui-lib-listbox__list-container')
      );

      expect(listboxes.length).toBe(2);
      expect(listboxes[0]!.id).not.toBe(listboxes[1]!.id);
      expect(listboxes[0]!.id).toMatch(/^ui-lib-listbox-\d+-list$/);
      expect(listboxes[1]!.id).toMatch(/^ui-lib-listbox-\d+-list$/);
    });
  });
});
