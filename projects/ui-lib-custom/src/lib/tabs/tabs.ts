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
  AfterViewInit,
  ViewEncapsulation,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from 'ui-lib-custom/icon';
import { SemanticIcon } from 'ui-lib-custom/icon';
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
  TabContext,
  TabsMode,
} from './tabs.types';

type RtlScrollAxis = 'default' | 'negative' | 'reverse';

type TabsSelection = { value: TabsValue | null; index: number };

type TabsContextItem = TabContext & {
  ref: Tab;
  disabled: boolean;
  closable: boolean;
  label?: string;
  contentTemplate?: TemplateRef<unknown>;
  lazy: TabsLazyMode;
};

interface ScrollMetrics {
  axis: 'horizontal' | 'vertical';
  max: number;
  position: number;
}

@Component({
  selector: 'ui-lib-tabs',
  standalone: true,
  imports: [CommonModule, TabPanel, Icon],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.data-scroll-arrows]': 'shouldShowScrollButtons() ? true : null',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class Tabs implements OnDestroy, AfterViewInit {
  private static nextId = 0;
  readonly uid = `ui-lib-tabs-${++Tabs.nextId}`;

  variant = input<TabsVariant>('material');
  size = input<TabsSize>('medium');
  orientation = input<TabsOrientation>('horizontal');
  align = input<TabsAlignment>('start');
  /** Controls panel rendering vs navigation-only mode. */
  mode = input<TabsMode>('default');
  selectedValue = input<TabsValue | null>(null);
  selectedIndex = input<number | null>(null);
  defaultValue = input<TabsValue | null>(null);
  defaultIndex = input<number | null>(null);
  /** Global lazy rendering mode; can be overridden per tab. */
  lazy = input<TabsLazyMode>(false);
  /** Scroll handling for overflowing tab lists. */
  scrollBehavior = input<TabsScrollBehavior>('auto');
  closable = input<boolean>(false);
  disabled = input<boolean>(false);
  /** Moves focus into the active panel on selection. */
  focusPanelOnSelect = input<boolean>(false);
  iconPosition = input<'left' | 'top' | 'right'>('left');

  selectedChange = output<{ value: TabsValue | null; index: number }>();
  selectedIndexChange = output<number>();
  /** Emitted when selection occurs in navigation mode. */
  navigate = output<{ value: TabsValue | null; index: number }>();
  tabClose = output<{ value: TabsValue | null; index: number }>();
  tabFocus = output<{ value: TabsValue | null; index: number }>();

  readonly tabs: Signal<readonly Tab[]> = contentChildren(Tab);

  @ViewChildren('tabButton') tabButtons?: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChild('tabList') tabList?: ElementRef<HTMLElement>;
  @ViewChildren(TabPanel) tabPanels?: QueryList<TabPanel>;

  private renderedValues = signal<Set<TabsValue | null>>(new Set());
  private readonly overflowDetected = signal<boolean>(false);
  private readonly canScrollPrev = signal<boolean>(false);
  private readonly canScrollNext = signal<boolean>(false);
  private readonly scrollable = computed<boolean>(() => this.scrollBehavior() === 'arrows');
  private readonly showScrollButtons = computed<boolean>(
    () => this.scrollable() && this.overflowDetected()
  );
  private readonly scrollAxis = computed<'horizontal' | 'vertical'>(() =>
    this.orientation() === 'vertical' ? 'vertical' : 'horizontal'
  );
  private readonly isNavigationMode = computed<boolean>(() => this.mode() === 'navigation');
  private readonly tabListId = computed<string>(() => `${this.uid}-tablist`);

  private indicatorStyle = signal<{ transform: string; width?: string; height?: string } | null>(
    null
  );
  private internalSelection = signal<TabsSelection>({
    value: null,
    index: -1,
  });

  tabContexts = computed<TabsContextItem[]>(() => {
    const tabs = this.tabs();
    return tabs.map((tab, index): TabsContextItem => {
      const tabLazy = tab.lazy();
      const effectiveLazy: TabsLazyMode = tabLazy !== undefined ? tabLazy : this.lazy();
      return {
        ref: tab,
        value: tab.value() ?? index,
        index,
        disabled: this.disabled() || tab.disabled(),
        closable: tab.closable() || this.closable(),
        label: tab.label() ?? undefined,
        labelTemplate: tab.labelTemplate?.template as TemplateRef<unknown> | undefined,
        content: tab.content,
        contentTemplate: tab.contentTemplate?.template as TemplateRef<unknown> | undefined,
        lazy: effectiveLazy,
      };
    });
  });

  private controlled = computed<boolean>(
    () => this.selectedValue() !== null || this.selectedIndex() !== null
  );

  private resolvedSelection = computed<TabsSelection>(() => {
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

  activeSelection = computed<TabsSelection>(() =>
    this.controlled() ? this.resolvedSelection() : this.internalSelection()
  );

  tabsClasses = computed<string>(() => {
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
  private scrollStateRaf: number | null = null;
  private scrollIntoViewRaf: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private isRtl = false;
  private rtlScrollAxis: RtlScrollAxis = 'default';

  private readonly onTabListScroll: () => void = () => {
    this.scheduleScrollStateUpdate();
  };

  constructor() {
    effect(() => {
      if (!this.controlled()) {
        this.internalSelection.set(this.resolvedSelection());
      }
    });

    effect(() => {
      this.tabContexts();
      this.orientation();
      this.scrollBehavior();
      this.mode();
      if (!this.scrollable()) {
        this.overflowDetected.set(false);
        this.canScrollPrev.set(false);
        this.canScrollNext.set(false);
        return;
      }
      queueMicrotask(() => this.scheduleScrollStateUpdate());
    });

    effect(() => {
      const active = this.activeSelection();
      const variant = this.variant();
      const activeTab = this.tabContexts()[active.index];
      const activeLazy: TabsLazyMode | undefined = activeTab?.lazy;

      if (activeLazy === 'keep-alive' && activeTab) {
        const current = this.renderedValues();
        if (!current.has(activeTab.value)) {
          const next = new Set(current);
          next.add(activeTab.value);
          this.renderedValues.set(next);
        }
      }

      if (this.focusPanelOnSelect() && !this.isNavigationMode()) {
        queueMicrotask(() => this.focusActivePanel());
      }

      this.scheduleScrollIntoView(active.index);

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

  ngAfterViewInit(): void {
    this.setupScrollObservers();
    this.scheduleScrollStateUpdate();
  }

  ngOnDestroy(): void {
    this.cancelIndicatorRaf();
    this.cancelScrollRaf();
    this.cancelScrollIntoViewRaf();
    this.teardownScrollObservers();
  }

  private scheduleIndicatorUpdate(): void {
    this.cancelIndicatorRaf();
    this.indicatorRaf = requestAnimationFrame(() => {
      this.indicatorRaf = null;
      this.updateIndicator();
    });
  }

  private cancelIndicatorRaf(): void {
    if (this.indicatorRaf !== null) {
      cancelAnimationFrame(this.indicatorRaf);
      this.indicatorRaf = null;
    }
  }

  /** Selects a tab and emits selection events. */
  onSelect(tab: { value: TabsValue | null; index: number; disabled: boolean }): void {
    if (tab.disabled || this.disabled()) {
      return;
    }

    if (!this.controlled()) {
      this.internalSelection.set({ value: tab.value, index: tab.index });
    }

    this.selectedChange.emit({ value: tab.value, index: tab.index });
    this.selectedIndexChange.emit(tab.index);

    if (this.isNavigationMode()) {
      this.navigate.emit({ value: tab.value, index: tab.index });
    }

    this.scheduleScrollIntoView(tab.index);
  }

  /** Emits focus events and keeps the focused tab in view. */
  onFocus(tab: { value: TabsValue | null; index: number; disabled: boolean }): void {
    if (tab.disabled || this.disabled()) {
      return;
    }
    this.tabFocus.emit({ value: tab.value, index: tab.index });
    this.scheduleScrollIntoView(tab.index);
  }

  /** Emits close events for closable tabs. */
  onClose(
    tab: { value: TabsValue | null; index: number; disabled: boolean },
    event: MouseEvent
  ): void {
    event.stopPropagation();
    if (tab.disabled || this.disabled()) {
      return;
    }
    this.tabClose.emit({ value: tab.value, index: tab.index });
  }

  /** Returns whether the given index is active. */
  isActive(index: number): boolean {
    return this.activeSelection().index === index;
  }

  /** Stable DOM id for a tab trigger. */
  tabId(index: number): string {
    return `${this.uid}-tab-${index}`;
  }

  /** Stable DOM id for a tab panel. */
  panelId(index: number): string {
    return `${this.uid}-panel-${index}`;
  }

  /** Computes tabindex for roving focus. */
  tabTabIndex(index: number, disabled: boolean): number {
    if (disabled || this.disabled()) {
      return -1;
    }
    return this.isActive(index) ? 0 : -1;
  }

  /** Determines whether a panel should render given the effective lazy mode. */
  shouldRenderPanel(tab: TabsContextItem): boolean {
    if (this.isNavigationMode()) {
      return false;
    }
    const lazy: TabsLazyMode = tab.lazy;
    if (lazy === false) {
      return true;
    }

    const isActive = this.activeSelection().index === tab.index;
    if (lazy === 'unmount') {
      return isActive;
    }

    if (lazy === 'keep-alive') {
      return isActive || this.renderedValues().has(tab.value);
    }

    return true;
  }

  /** Handles keyboard navigation for the tab list. */
  onKeydown(event: KeyboardEvent, currentIndex: number): void {
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

  private focusNext(currentIndex: number): void {
    const tabs: TabsContextItem[] = this.tabContexts();
    for (let i = currentIndex + 1; i < tabs.length; i++) {
      if (!tabs[i].disabled) {
        this.focusIndex(i);
        this.onSelect(tabs[i]);
        break;
      }
    }
  }

  private focusPrev(currentIndex: number): void {
    const tabs: TabsContextItem[] = this.tabContexts();
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!tabs[i].disabled) {
        this.focusIndex(i);
        this.onSelect(tabs[i]);
        break;
      }
    }
  }

  private firstEnabledIndex(): number {
    return this.tabContexts().find((tab) => !tab.disabled)?.index ?? -1;
  }

  private lastEnabledIndex(): number {
    const tabs: TabsContextItem[] = this.tabContexts();
    for (let i = tabs.length - 1; i >= 0; i--) {
      if (!tabs[i].disabled) {
        return i;
      }
    }
    return -1;
  }

  private focusIndex(index: number): void {
    if (index < 0) {
      return;
    }
    const btn: HTMLButtonElement | undefined = this.tabButtons?.get(index)?.nativeElement;
    if (btn) {
      this.scheduleScrollIntoView(index);
      btn.focus();
    }
  }

  private focusActivePanel(): void {
    const activeIndex: number = this.activeSelection().index;
    const panel: TabPanel | undefined = this.tabPanels?.get(activeIndex);
    if (panel) {
      queueMicrotask(() => panel.focus());
    }
  }

  private updateIndicator(): void {
    if (this.variant() !== 'material') {
      this.indicatorStyle.set(null);
      return;
    }

    const activeIndex: number = this.activeSelection().index;
    const list: HTMLElement | undefined = this.tabList?.nativeElement;
    const btn: HTMLButtonElement | undefined = this.tabButtons?.get(activeIndex)?.nativeElement;

    if (!list || !btn) {
      this.indicatorStyle.set(null);
      return;
    }

    const listRect: DOMRect = list.getBoundingClientRect();
    const btnRect: DOMRect = btn.getBoundingClientRect();
    const horizontal: boolean = this.orientation() === 'horizontal';

    if (horizontal) {
      const left: number = btnRect.left - listRect.left + list.scrollLeft;
      this.indicatorStyle.set({
        transform: `translateX(${left}px)`,
        width: `${btnRect.width}px`,
      });
    } else {
      const top: number = btnRect.top - listRect.top + list.scrollTop;
      this.indicatorStyle.set({
        transform: `translateY(${top}px)`,
        height: `${btnRect.height}px`,
      });
    }
  }

  /** Exposes indicator styles for the material variant. */
  indicatorStyles(): { transform: string; width?: string; height?: string } | null {
    return this.indicatorStyle();
  }

  /** DOM id for the tablist (used by scroll buttons). */
  tabListDomId(): string {
    return this.tabListId();
  }

  /** Whether scroll buttons should render. */
  shouldShowScrollButtons(): boolean {
    return this.showScrollButtons();
  }

  /** Whether the tab list can scroll backward. */
  canScrollPrevTab(): boolean {
    return this.canScrollPrev();
  }

  /** Whether the tab list can scroll forward. */
  canScrollNextTab(): boolean {
    return this.canScrollNext();
  }

  /** Label for the previous scroll button. */
  scrollPrevLabel(): string {
    return 'Previous tabs';
  }

  /** Label for the next scroll button. */
  scrollNextLabel(): string {
    return 'Next tabs';
  }

  /** Icon name for the previous scroll button. */
  scrollPrevIcon(): SemanticIcon {
    return this.orientation() === 'vertical' ? 'chevron-up' : 'chevron-left';
  }

  /** Icon name for the next scroll button. */
  scrollNextIcon(): SemanticIcon {
    return this.orientation() === 'vertical' ? 'chevron-down' : 'chevron-right';
  }

  /** Scrolls the tab list backward by one step. */
  onScrollPrev(): void {
    this.scrollByStep('prev');
  }

  /** Scrolls the tab list forward by one step. */
  onScrollNext(): void {
    this.scrollByStep('next');
  }

  /** Updates scroll state on manual scroll. */
  onTabListScrolled(): void {
    this.onTabListScroll();
  }

  /** Returns true when the component is in navigation mode. */
  isNavigation(): boolean {
    return this.isNavigationMode();
  }

  private setupScrollObservers(): void {
    const list = this.tabList?.nativeElement;
    if (!list) {
      return;
    }

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.scheduleScrollStateUpdate();
      });
      this.resizeObserver.observe(list);
    }
  }

  private teardownScrollObservers(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private cancelScrollRaf(): void {
    if (this.scrollStateRaf !== null) {
      cancelAnimationFrame(this.scrollStateRaf);
      this.scrollStateRaf = null;
    }
  }

  private cancelScrollIntoViewRaf(): void {
    if (this.scrollIntoViewRaf !== null) {
      cancelAnimationFrame(this.scrollIntoViewRaf);
      this.scrollIntoViewRaf = null;
    }
  }

  private scheduleScrollStateUpdate(): void {
    this.cancelScrollRaf();
    this.scrollStateRaf = requestAnimationFrame(() => {
      this.scrollStateRaf = null;
      this.updateScrollState();
    });
  }

  private scheduleScrollIntoView(index: number): void {
    this.cancelScrollIntoViewRaf();
    this.scrollIntoViewRaf = requestAnimationFrame(() => {
      this.scrollIntoViewRaf = null;
      const btn = this.tabButtons?.get(index)?.nativeElement;
      if (!btn) {
        return;
      }
      const options: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      };
      btn.scrollIntoView(options);
      this.scheduleScrollStateUpdate();
    });
  }

  private updateScrollState(): void {
    if (!this.scrollable()) {
      this.overflowDetected.set(false);
      this.canScrollPrev.set(false);
      this.canScrollNext.set(false);
      return;
    }
    const list = this.tabList?.nativeElement;
    if (!list) {
      this.overflowDetected.set(false);
      this.canScrollPrev.set(false);
      this.canScrollNext.set(false);
      return;
    }

    const isRtl: boolean = this.readIsRtl(list);
    if (isRtl !== this.isRtl) {
      this.isRtl = isRtl;
      this.rtlScrollAxis = isRtl ? this.detectRtlScrollAxis(list) : 'default';
    }

    const metrics: ScrollMetrics = this.computeScrollMetrics(
      list,
      this.scrollAxis(),
      this.isRtl,
      this.rtlScrollAxis
    );

    this.overflowDetected.set(metrics.max > 1);
    this.canScrollPrev.set(metrics.position > 1);
    this.canScrollNext.set(metrics.position < metrics.max - 1);
  }

  private computeScrollMetrics(
    list: HTMLElement,
    axis: 'horizontal' | 'vertical',
    isRtl: boolean,
    rtlAxis: RtlScrollAxis
  ): ScrollMetrics {
    if (axis === 'vertical') {
      const max: number = Math.max(0, list.scrollHeight - list.clientHeight);
      const position: number = list.scrollTop;
      return { axis, max, position };
    }

    const max: number = Math.max(0, list.scrollWidth - list.clientWidth);
    const position: number = this.getNormalizedScrollPosition(list, isRtl, rtlAxis, max);
    return { axis, max, position };
  }

  private getNormalizedScrollPosition(
    list: HTMLElement,
    isRtl: boolean,
    rtlAxis: RtlScrollAxis,
    max: number
  ): number {
    if (!isRtl) {
      return list.scrollLeft;
    }

    if (rtlAxis === 'negative') {
      return Math.abs(list.scrollLeft);
    }

    if (rtlAxis === 'reverse') {
      return max - list.scrollLeft;
    }

    return list.scrollLeft;
  }

  private setNormalizedScrollPosition(
    list: HTMLElement,
    axis: 'horizontal' | 'vertical',
    position: number,
    isRtl: boolean,
    rtlAxis: RtlScrollAxis
  ): void {
    if (axis === 'vertical') {
      list.scrollTo({ top: position, behavior: 'smooth' });
      return;
    }

    if (!isRtl) {
      list.scrollTo({ left: position, behavior: 'smooth' });
      return;
    }

    const max: number = Math.max(0, list.scrollWidth - list.clientWidth);

    if (rtlAxis === 'negative') {
      list.scrollTo({ left: -position, behavior: 'smooth' });
      return;
    }

    if (rtlAxis === 'reverse') {
      list.scrollTo({ left: max - position, behavior: 'smooth' });
      return;
    }

    list.scrollTo({ left: position, behavior: 'smooth' });
  }

  private scrollByStep(direction: 'prev' | 'next'): void {
    const list = this.tabList?.nativeElement;
    if (!list) {
      return;
    }

    const axis: 'horizontal' | 'vertical' = this.scrollAxis();
    const viewport: number = axis === 'horizontal' ? list.clientWidth : list.clientHeight;
    const step: number = Math.max(1, Math.floor(viewport * 0.8));

    const metrics: ScrollMetrics = this.computeScrollMetrics(
      list,
      axis,
      this.isRtl,
      this.rtlScrollAxis
    );
    const delta: number = direction === 'prev' ? -step : step;
    const next: number = Math.min(Math.max(0, metrics.position + delta), metrics.max);

    this.setNormalizedScrollPosition(list, axis, next, this.isRtl, this.rtlScrollAxis);
    this.scheduleScrollStateUpdate();
  }

  private readIsRtl(list: HTMLElement): boolean {
    const direction: string = getComputedStyle(list).direction;
    return direction === 'rtl';
  }

  private detectRtlScrollAxis(list: HTMLElement): RtlScrollAxis {
    const original: number = list.scrollLeft;
    list.scrollLeft = 1;
    const positive: number = list.scrollLeft;
    list.scrollLeft = -1;
    const negative: number = list.scrollLeft;
    list.scrollLeft = original;

    if (negative < 0) {
      return 'negative';
    }

    if (positive === 0) {
      return 'reverse';
    }

    return 'default';
  }
}
