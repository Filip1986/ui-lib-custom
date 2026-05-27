import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
  type ElementRef,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type { PanelToggleEvent, PanelVariant } from './panel.types';

export type { PanelToggleEvent, PanelVariant } from './panel.types';

let panelIdCounter: number = 0;

/**
 * Panel — a flexible content container with an optional collapsible body.
 *
 * Supports header text or projected header content, an icon area for actions,
 * an optional footer, and three design variants (material / bootstrap / minimal).
 * Collapse animation uses the CSS grid-row technique.
 *
 * @example
 * <!-- Basic panel -->
 * <ui-lib-panel header="My Panel">
 *   <p>Panel body content.</p>
 * </ui-lib-panel>
 *
 * <!-- Toggleable panel with two-way binding -->
 * <ui-lib-panel header="Advanced" [toggleable]="true" [(collapsed)]="isCollapsed">
 *   <p>Collapsible content.</p>
 * </ui-lib-panel>
 *
 * <!-- Custom header and footer -->
 * <ui-lib-panel [toggleable]="true">
 *   <span panelHeader>Custom <strong>Header</strong></span>
 *   <p>Body content.</p>
 *   <div panelFooter>Footer content</div>
 * </ui-lib-panel>
 */
@Component({
  selector: 'ui-lib-panel',
  standalone: true,
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'region',
    '[attr.aria-labelledby]': 'showHeader() ? headerId : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Panel {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  private readonly componentId: string = `ui-lib-panel-${(panelIdCounter += 1)}`;

  /** ID connecting host aria-labelledby to the header element. */
  public readonly headerId: string = `${this.componentId}-header`;
  /** ID connecting header aria-controls to the content wrapper. */
  public readonly contentId: string = `${this.componentId}-content`;

  /** Text to render in the header. Use `[panelHeader]` projection for custom HTML. */
  public readonly header: InputSignal<string> = input<string>('');

  /** Whether the panel body can be collapsed/expanded by the user. */
  public readonly toggleable: InputSignal<boolean> = input<boolean>(false);

  /** Two-way binding for the collapsed state. Only meaningful when toggleable is true. */
  public readonly collapsed: ModelSignal<boolean> = model<boolean>(false);

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<PanelVariant | null> = input<PanelVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted after the collapsed state changes when toggleable is true. */
  public readonly toggled: OutputEmitterRef<PanelToggleEvent> = output<PanelToggleEvent>();

  /** @internal Template ref wrapping projected [panelHeader] content. */
  private readonly projectedHeaderSlot: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('projectedHeaderSlot');

  /** @internal Template ref wrapping projected [panelIcons] content. */
  private readonly projectedIconsSlot: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('projectedIconsSlot');

  /** @internal Whether any projected header or icon content was detected after render. */
  private readonly hasProjectedContent: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    afterNextRender((): void => {
      const headerEl: HTMLElement | undefined = this.projectedHeaderSlot()?.nativeElement;
      const iconsEl: HTMLElement | undefined = this.projectedIconsSlot()?.nativeElement;
      const hasContent: boolean =
        (headerEl !== undefined && headerEl.childNodes.length > 0) ||
        (iconsEl !== undefined && iconsEl.childNodes.length > 0);
      this.hasProjectedContent.set(hasContent);
    });
  }

  /** Whether the header section should be rendered at all. */
  public readonly showHeader: Signal<boolean> = computed<boolean>(
    (): boolean => Boolean(this.header()) || this.toggleable() || this.hasProjectedContent(),
  );

  private readonly effectiveVariant: Signal<PanelVariant> = computed<PanelVariant>(
    (): PanelVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-panel', `ui-lib-panel--variant-${this.effectiveVariant()}`];
    if (this.toggleable()) {
      classes.push('ui-lib-panel--toggleable');
    }
    if (this.toggleable() && this.collapsed()) {
      classes.push('ui-lib-panel--collapsed');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Toggle the collapsed state and emit the toggled event. */
  public toggle(event?: Event): void {
    const nextCollapsed: boolean = !this.collapsed();
    this.collapsed.set(nextCollapsed);
    this.toggled.emit(
      event !== undefined
        ? { collapsed: nextCollapsed, originalEvent: event }
        : { collapsed: nextCollapsed },
    );
  }

  public handleToggleClick(event: Event): void {
    if (!this.toggleable()) {
      return;
    }
    this.toggle(event);
  }

  public handleToggleKeydown(event: Event): void {
    if (!this.toggleable()) {
      return;
    }
    event.preventDefault();
    this.toggle(event);
  }
}
