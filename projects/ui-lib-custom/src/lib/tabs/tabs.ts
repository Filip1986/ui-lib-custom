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
  inject,
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
import { ThemeConfigService } from 'ui-lib-custom/theme';

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
    '[attr.dir]': 'hostDir() || null',
    '[class.ui-tabs--rtl]': 'isRtl() ? true : null',
  },
})
export class Tabs implements OnDestroy, AfterViewInit {
  private static nextId = 0;
  public readonly uid = `ui-lib-tabs-${++Tabs.nextId}`;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly themeConfig = inject(ThemeConfigService);

  public readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');
  public readonly variant = input<TabsVariant | null>(null);
  public readonly size = input<TabsSize>('md');
  public readonly orientation = input<TabsOrientation>('horizontal');
  public readonly align = input<TabsAlignment>('start');
  /** Controls panel rendering vs navigation-only mode. */
  public readonly mode = input<TabsMode>('default');
  public readonly selectedValue = input<TabsValue | null>(null);
  public readonly selectedIndex = input<number | null>(null);
  public readonly defaultValue = input<TabsValue | null>(null);
  public readonly defaultIndex = input<number | null>(null);
  /** Global lazy rendering mode; can be overridden per tab. */
  public readonly lazy = input<TabsLazyMode>(false);
  /** Scroll handling for overflowing tab lists. */
  public readonly scrollBehavior = input<TabsScrollBehavior>('auto');
  public readonly closable = input<boolean>(false);
  public readonly disabled = input<boolean>(false);
  /** Moves focus into the active panel on selection. */
  public readonly focusPanelOnSelect = input<boolean>(false);
  public readonly iconPosition = input<'left' | 'top' | 'right'>('left');

  public readonly selectedChange = output<{ value: TabsValue | null; index: number }>();
  public readonly selectedIndexChange = output<number>();
  /** Emitted when selection occurs in navigation mode. */
  public readonly navigate = output<{ value: TabsValue | null; index: number }>();
  public readonly tabClose = output<{ value: TabsValue | null; index: number }>();
  public readonly tabFocus = output<{ value: TabsValue | null; index: number }>();

  public readonly tabs: Signal<readonly Tab[]> = contentChildren(Tab);

  @ViewChildren('tabButton') public tabButtons?: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChild('tabList') public tabList?: ElementRef<HTMLElement>;
  @ViewChildren(TabPanel) public tabPanels?: QueryList<TabPanel>;

  private readonly renderedValues = signal<Set<TabsValue | null>>(new Set());
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
  protected readonly hostDir = computed<'ltr' | 'rtl' | null>(() => {
    const explicit = this.dir();
    return explicit === 'auto' ? null : explicit;
  });
  protected readonly isRtl = computed<boolean>(() => {
    const explicit = this.dir();
    if (explicit !== 'auto') {
      return explicit === 'rtl';
    }

    const list: HTMLElement = (this.tabList?.nativeElement ??
      this.elementRef.nativeElement) as HTMLElement;
    if (typeof getComputedStyle === 'undefined') {
      return false;
    }

    return getComputedStyle(list).direction === 'rtl';
  });

  private readonly indicatorStyle = signal<{
    transform: string;
    width?: string;
    height?: string;
  } | null>(null);
  private readonly internalSelection = signal<TabsSelection>({
    value: null,
    index: -1,
  });

  public readonly tabContexts = computed<TabsContextItem[]>(() => {
    const tabs = this.tabs();
    return tabs.map((tab, index): TabsContextItem => {
      const tabLazy = tab.lazy();
      const effectiveLazy: TabsLazyMode = tabLazy !== undefined ? tabLazy : this.lazy();
      const label = tab.label();
      const labelTemplate = tab.labelTemplate?.template as TemplateRef<unknown> | undefined;
      const contentTemplate = tab.contentTemplate?.template as TemplateRef<unknown> | undefined;
      const context: TabsContextItem = {
        ref: tab,
        value: tab.value() ?? index,
        index,
        disabled: this.disabled() || tab.disabled(),
        closable: tab.closable() || this.closable(),
        ...(label !== undefined && label !== null ? { label } : {}),
        ...(labelTemplate ? { labelTemplate } : {}),
        ...(tab.content ? { content: tab.content } : {}),
        ...(contentTemplate ? { contentTemplate } : {}),
        lazy: effectiveLazy,
      };
      return context;
    });
  });

  private readonly controlled = computed<boolean>(
    () => this.selectedValue() !== null || this.selectedIndex() !== null
  );

  private readonly resolvedSelection = computed<TabsSelection>(() => {
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

  public readonly activeSelection = computed<TabsSelection>(() =>
    this.controlled() ? this.resolvedSelection() : this.internalSelection()
  );

  private readonly normalizedSize = computed<'small' | 'medium' | 'large'>(
    (): 'small' | 'medium' | 'large' => {
      const size: TabsSize = this.size();
      const map: Record<TabsSize, 'small' | 'medium' | 'large'> = {
        sm: 'small',
        md: 'medium',
        lg: 'large',
        small: 'small',
        medium: 'medium',
        large: 'large',
      };
      return map[size];
    }
  );

  public readonly effectiveVariant = computed<TabsVariant>(
    () => this.variant() ?? this.themeConfig.variant()
  );

  public readonly tabsClasses = computed<string>(() => {
    const classes = [
      'tabs-root',
      `tabs-${this.effectiveVariant()}`,
      `tabs-${this.normalizedSize()}`,
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
  private scrollIsRtl = false;
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
      const variant = this.effectiveVariant();
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

  public ngAfterViewInit(): void {
    this.setupScrollObservers();
    this.scheduleScrollStateUpdate();
  }

  public ngOnDestroy(): void {
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
  public onSelect(tab: { value: TabsValue | null; index: number; disabled: boolean }): void {
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
  public onFocus(tab: { value: TabsValue | null; index: number; disabled: boolean }): void {
    if (tab.disabled || this.disabled()) {
      return;
    }
    this.tabFocus.emit({ value: tab.value, index: tab.index });
    this.scheduleScrollIntoView(tab.index);
  }

  /** Emits close events for closable tabs. */
  public onClose(
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
  public isActive(index: number): boolean {
    return this.activeSelection().index === index;
  }

  /** Stable DOM id for a tab trigger. */
  public tabId(index: number): string {
    return `${this.uid}-tab-${index}`;
  }

  /** Stable DOM id for a tab panel. */
  public panelId(index: number): string {
    return `${this.uid}-panel-${index}`;
  }

  /** Computes tabindex for roving focus. */
  public tabTabIndex(index: number, disabled: boolean): number {
    if (disabled || this.disabled()) {
      return -1;
    }
    return this.isActive(index) ? 0 : -1;
  }

  /** Determines whether a panel should render given the effective lazy mode. */
  public shouldRenderPanel(tab: TabsContextItem): boolean {
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

    return isActive || this.renderedValues().has(tab.value);
  }

  /** Handles keyboard navigation for the tab list. */
  public onKeydown(event: KeyboardEvent, currentIndex: number): void {
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
    const rtl = this.isRtl();
    const forward = horizontal ? key === (rtl ? 'ArrowLeft' : 'ArrowRight') : key === 'ArrowDown';
    const backward = horizontal ? key === (rtl ? 'ArrowRight' : 'ArrowLeft') : key === 'ArrowUp';

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
      const tab = tabs[i];
      if (tab && !tab.disabled) {
        this.focusIndex(i);
        this.onSelect(tab);
        break;
      }
    }
  }

  private focusPrev(currentIndex: number): void {
    const tabs: TabsContextItem[] = this.tabContexts();
    for (let i = currentIndex - 1; i >= 0; i--) {
      const tab = tabs[i];
      if (tab && !tab.disabled) {
        this.focusIndex(i);
        this.onSelect(tab);
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
      const tab = tabs[i];
      if (tab && !tab.disabled) {
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
    if (this.effectiveVariant() !== 'material') {
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
      const max: number = Math.max(0, list.scrollWidth - list.clientWidth);
      const scrollPos: number = this.getNormalizedScrollPosition(
        list,
        this.isRtl(),
        this.rtlScrollAxis,
        max
      );
      const offset: number = this.isRtl()
        ? listRect.right - btnRect.right + scrollPos
        : btnRect.left - listRect.left + scrollPos;
      this.indicatorStyle.set({
        transform: `translateX(${offset}px)`,
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
  public indicatorStyles(): { transform: string; width?: string; height?: string } | null {
    return this.indicatorStyle();
  }

  /** DOM id for the tablist (used by scroll buttons). */
  public tabListDomId(): string {
    return this.tabListId();
  }

  /** Whether scroll buttons should render. */
  public shouldShowScrollButtons(): boolean {
    return this.showScrollButtons();
  }

  /** Whether the tab list can scroll backward. */
  public canScrollPrevTab(): boolean {
    return this.canScrollPrev();
  }

  /** Whether the tab list can scroll forward. */
  public canScrollNextTab(): boolean {
    return this.canScrollNext();
  }

  /** Label for the previous scroll button. */
  public scrollPrevLabel(): string {
    return 'Previous tabs';
  }

  /** Label for the next scroll button. */
  public scrollNextLabel(): string {
    return 'Next tabs';
  }

  /** Icon name for the previous scroll button. */
  public scrollPrevIcon(): SemanticIcon {
    if (this.orientation() === 'vertical') {
      return 'chevron-up';
    }
    return this.isRtl() ? 'chevron-right' : 'chevron-left';
  }

  /** Icon name for the next scroll button. */
  public scrollNextIcon(): SemanticIcon {
    if (this.orientation() === 'vertical') {
      return 'chevron-down';
    }
    return this.isRtl() ? 'chevron-left' : 'chevron-right';
  }

  /** Scrolls the tab list backward by one step. */
  public onScrollPrev(): void {
    this.scrollByStep('prev');
  }

  /** Scrolls the tab list forward by one step. */
  public onScrollNext(): void {
    this.scrollByStep('next');
  }

  /** Updates scroll state on manual scroll. */
  public onTabListScrolled(): void {
    this.onTabListScroll();
  }

  /** Returns true when the component is in navigation mode. */
  public isNavigation(): boolean {
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

    const isRtl: boolean = this.isRtl();
    if (isRtl !== this.scrollIsRtl) {
      this.scrollIsRtl = isRtl;
      this.rtlScrollAxis = isRtl ? this.detectRtlScrollAxis(list) : 'default';
    }

    const metrics: ScrollMetrics = this.computeScrollMetrics(
      list,
      this.scrollAxis(),
      this.scrollIsRtl,
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
      this.scrollIsRtl,
      this.rtlScrollAxis
    );
    const baseDelta: number = direction === 'prev' ? -step : step;
    const delta: number = this.isRtl() && axis === 'horizontal' ? -baseDelta : baseDelta;
    const next: number = Math.min(Math.max(0, metrics.position + delta), metrics.max);

    this.setNormalizedScrollPosition(list, axis, next, this.scrollIsRtl, this.rtlScrollAxis);
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
