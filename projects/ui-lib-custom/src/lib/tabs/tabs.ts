import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  TemplateRef,
  computed,
  contentChildren,
  effect,
  input,
  output,
  signal,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';
import {
  TabsAlignment,
  TabsLazyMode,
  TabsOrientation,
  TabsScrollBehavior,
  TabsSize,
  TabsValue,
  TabsVariant,
} from './tabs.types';

@Component({
  selector: 'ui-lib-tabs',
  standalone: true,
  imports: [CommonModule, TabPanel],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs implements OnDestroy {
  private static nextId = 0;
  readonly uid = `ui-lib-tabs-${++Tabs.nextId}`;

  variant = input<TabsVariant>('material');
  size = input<TabsSize>('medium');
  orientation = input<TabsOrientation>('horizontal');
  align = input<TabsAlignment>('start');
  selectedValue = input<TabsValue | null>(null);
  selectedIndex = input<number | null>(null);
  defaultValue = input<TabsValue | null>(null);
  defaultIndex = input<number | null>(null);
  lazy = input<TabsLazyMode>(false);
  scrollBehavior = input<TabsScrollBehavior>('auto');
  closable = input<boolean>(false);
  disabled = input<boolean>(false);
  focusPanelOnSelect = input<boolean>(false);
  iconPosition = input<'left' | 'top' | 'right'>('left');

  selectedChange = output<{ value: TabsValue | null; index: number }>();
  selectedIndexChange = output<number>();
  tabClose = output<{ value: TabsValue | null; index: number }>();
  tabFocus = output<{ value: TabsValue | null; index: number }>();

  readonly tabs = contentChildren(Tab);

  @ViewChildren('tabButton') tabButtons?: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChild('tabList') tabList?: ElementRef<HTMLElement>;
  @ViewChildren(TabPanel) tabPanels?: QueryList<TabPanel>;

  private renderedValues = signal<Set<TabsValue | null>>(new Set());
  private indicatorStyle = signal<{ transform: string; width?: string; height?: string } | null>(
    null
  );
  private internalSelection = signal<{ value: TabsValue | null; index: number }>({
    value: null,
    index: -1,
  });

  tabContexts = computed(() => {
    const tabs = this.tabs();
    return tabs.map((tab, index) => ({
      ref: tab,
      value: tab.value() ?? index,
      index,
      disabled: this.disabled() || tab.disabled(),
      closable: tab.closable() || this.closable(),
      label: tab.label(),
      labelTemplate: tab.labelTemplate?.template as TemplateRef<unknown> | undefined,
      content: tab.content,
    }));
  });

  private controlled = computed(
    () => this.selectedValue() !== null || this.selectedIndex() !== null
  );

  private resolvedSelection = computed(() => {
    const tabs = this.tabContexts();
    const byValue = this.selectedValue();
    if (byValue !== null) {
      const idx = tabs.findIndex((t) => t.value === byValue);
      if (idx !== -1) {
        return { value: byValue, index: idx };
      }
    }

    const byIndex = this.selectedIndex();
    if (byIndex !== null && byIndex >= 0 && byIndex < tabs.length) {
      return { value: tabs[byIndex]?.value ?? null, index: byIndex };
    }

    const defValue = this.defaultValue();
    if (defValue !== null) {
      const idx = tabs.findIndex((t) => t.value === defValue);
      if (idx !== -1) {
        return { value: defValue, index: idx };
      }
    }

    const defIndex = this.defaultIndex();
    if (defIndex !== null && defIndex >= 0 && defIndex < tabs.length) {
      return { value: tabs[defIndex]?.value ?? null, index: defIndex };
    }

    const firstEnabled = tabs.find((t) => !t.disabled);
    return { value: firstEnabled?.value ?? null, index: firstEnabled?.index ?? -1 };
  });

  activeSelection = computed(() =>
    this.controlled() ? this.resolvedSelection() : this.internalSelection()
  );

  tabsClasses = computed(() => {
    const classes = [
      'tabs-root',
      `tabs-${this.variant()}`,
      `tabs-size-${this.size()}`,
      `tabs-orientation-${this.orientation()}`,
      `tabs-align-${this.align()}`,
    ];

    if (this.disabled()) {
      classes.push('tabs-disabled');
    }

    return classes.join(' ');
  });

  private indicatorKey: string | null = null;
  private indicatorRaf: number | null = null;

  constructor() {
    effect(() => {
      if (!this.controlled()) {
        this.internalSelection.set(this.resolvedSelection());
      }
    });

    effect(() => {
      const active = this.activeSelection();
      const variant = this.variant();

      if (this.lazy() === 'keep-alive') {
        const current = this.renderedValues();
        if (!current.has(active.value)) {
          const next = new Set(current);
          next.add(active.value);
          this.renderedValues.set(next);
        }
      }

      if (this.focusPanelOnSelect()) {
        queueMicrotask(() => this.focusActivePanel());
      }

      const key =
        variant === 'material' ? `${variant}:${this.orientation()}:${active.index}` : null;
      if (variant !== 'material') {
        this.indicatorKey = null;
        this.cancelIndicatorRaf();
        this.indicatorStyle.set(null);
        return;
      }

      if (key !== this.indicatorKey) {
        this.indicatorKey = key;
        this.scheduleIndicatorUpdate();
      }
    });
  }

  ngOnDestroy() {
    this.cancelIndicatorRaf();
  }

  private scheduleIndicatorUpdate() {
    this.cancelIndicatorRaf();
    this.indicatorRaf = requestAnimationFrame(() => {
      this.indicatorRaf = null;
      this.updateIndicator();
    });
  }

  private cancelIndicatorRaf() {
    if (this.indicatorRaf !== null) {
      cancelAnimationFrame(this.indicatorRaf);
      this.indicatorRaf = null;
    }
  }

  onSelect(tab: { value: TabsValue | null; index: number; disabled: boolean }) {
    if (tab.disabled || this.disabled()) {
      return;
    }

    if (!this.controlled()) {
      this.internalSelection.set({ value: tab.value, index: tab.index });
    }

    this.selectedChange.emit({ value: tab.value, index: tab.index });
    this.selectedIndexChange.emit(tab.index);
  }

  onFocus(tab: { value: TabsValue | null; index: number; disabled: boolean }) {
    if (tab.disabled || this.disabled()) {
      return;
    }
    this.tabFocus.emit({ value: tab.value, index: tab.index });
  }

  onClose(tab: { value: TabsValue | null; index: number; disabled: boolean }, event: MouseEvent) {
    event.stopPropagation();
    if (tab.disabled || this.disabled()) {
      return;
    }
    this.tabClose.emit({ value: tab.value, index: tab.index });
  }

  isActive(index: number) {
    return this.activeSelection().index === index;
  }

  tabId(index: number) {
    return `${this.uid}-tab-${index}`;
  }

  panelId(index: number) {
    return `${this.uid}-panel-${index}`;
  }

  tabTabIndex(index: number, disabled: boolean) {
    if (disabled || this.disabled()) {
      return -1;
    }
    return this.isActive(index) ? 0 : -1;
  }

  shouldRenderPanel(value: TabsValue | null, index: number) {
    const lazy = this.lazy();
    if (lazy === false) {
      return true;
    }

    const isActive = this.activeSelection().index === index;
    if (lazy === 'unmount') {
      return isActive;
    }

    if (lazy === 'keep-alive') {
      return isActive || this.renderedValues().has(value);
    }

    return true;
  }

  onKeydown(event: KeyboardEvent, currentIndex: number) {
    const key = event.key;
    if (key === 'Home') {
      event.preventDefault();
      this.focusIndex(this.firstEnabledIndex());
      return;
    }

    if (key === 'End') {
      event.preventDefault();
      this.focusIndex(this.lastEnabledIndex());
      return;
    }

    const horizontal = this.orientation() === 'horizontal';
    const forward = horizontal ? key === 'ArrowRight' : key === 'ArrowDown';
    const backward = horizontal ? key === 'ArrowLeft' : key === 'ArrowUp';

    if (forward) {
      event.preventDefault();
      this.focusNext(currentIndex);
    }

    if (backward) {
      event.preventDefault();
      this.focusPrev(currentIndex);
    }

    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      const tab = this.tabContexts()[currentIndex];
      if (tab) {
        this.onSelect(tab);
      }
    }
  }

  private focusNext(currentIndex: number) {
    const tabs = this.tabContexts();
    for (let i = currentIndex + 1; i < tabs.length; i++) {
      if (!tabs[i].disabled) {
        this.focusIndex(i);
        this.onSelect(tabs[i]);
        break;
      }
    }
  }

  private focusPrev(currentIndex: number) {
    const tabs = this.tabContexts();
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!tabs[i].disabled) {
        this.focusIndex(i);
        this.onSelect(tabs[i]);
        break;
      }
    }
  }

  private firstEnabledIndex() {
    return this.tabContexts().find((t) => !t.disabled)?.index ?? -1;
  }

  private lastEnabledIndex() {
    const tabs = this.tabContexts();
    for (let i = tabs.length - 1; i >= 0; i--) {
      if (!tabs[i].disabled) {
        return i;
      }
    }
    return -1;
  }

  private focusIndex(index: number) {
    if (index < 0) {
      return;
    }
    const btn = this.tabButtons?.get(index)?.nativeElement;
    if (btn) {
      btn.focus();
    }
  }

  private focusActivePanel() {
    const activeIndex = this.activeSelection().index;
    const panel = this.tabPanels?.get(activeIndex);
    if (panel) {
      queueMicrotask(() => panel.focus());
    }
  }

  private updateIndicator() {
    if (this.variant() !== 'material') {
      this.indicatorStyle.set(null);
      return;
    }

    const activeIndex = this.activeSelection().index;
    const list = this.tabList?.nativeElement;
    const btn = this.tabButtons?.get(activeIndex)?.nativeElement;

    if (!list || !btn) {
      this.indicatorStyle.set(null);
      return;
    }

    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const horizontal = this.orientation() === 'horizontal';

    if (horizontal) {
      const left = btnRect.left - listRect.left + list.scrollLeft;
      this.indicatorStyle.set({
        transform: `translateX(${left}px)`,
        width: `${btnRect.width}px`,
      });
    } else {
      const top = btnRect.top - listRect.top + list.scrollTop;
      this.indicatorStyle.set({
        transform: `translateY(${top}px)`,
        height: `${btnRect.height}px`,
      });
    }
  }

  indicatorStyles() {
    return this.indicatorStyle();
  }
}
