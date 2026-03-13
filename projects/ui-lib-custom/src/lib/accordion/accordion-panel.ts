import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import type { ElementRef, InputSignal, OnDestroy, Signal, WritableSignal } from '@angular/core';
import type { AccordionContext } from './accordion-context';
import { ACCORDION_CONTEXT } from './accordion-context';
import type { AccordionIconPosition, AccordionToggleIconContext } from './accordion.types';
import { Icon } from 'ui-lib-custom/icon';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ACCORDION_PANEL_STATES } from './accordion.constants';

let accordionPanelId: number = 0;

/**
 * Marks a custom accordion header template.
 */
@Directive({
  selector: '[accordionHeader]',
  standalone: true,
})
export class AccordionHeader {}

/**
 * Template directive for a custom accordion toggle icon.
 */
@Directive({
  selector: '[accordionToggleIcon]',
  standalone: true,
})
export class AccordionToggleIcon {
  public readonly template: TemplateRef<AccordionToggleIconContext> =
    inject<TemplateRef<AccordionToggleIconContext>>(TemplateRef);
}

/**
 * Accordion panel component with header and collapsible content.
 */
@Component({
  selector: 'ui-lib-accordion-panel',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './accordion-panel.html',
  styleUrl: './accordion-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-state]': 'isExpanded() ? panelStates.Expanded : panelStates.Collapsed',
    '[attr.data-disabled]': 'disabled() ? true : null',
  },
})
export class AccordionPanel implements OnDestroy {
  public readonly panelStates: typeof ACCORDION_PANEL_STATES = ACCORDION_PANEL_STATES;
  public readonly header: InputSignal<string> = input<string>('');
  public readonly value: InputSignal<string | null> = input<string | null>(null);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly expanded: InputSignal<boolean> = input<boolean>(false);
  public readonly iconPosition: InputSignal<AccordionIconPosition> =
    input<AccordionIconPosition>('end');
  public readonly expandIcon: InputSignal<string> = input<string>('chevron-up');
  public readonly collapseIcon: InputSignal<string> = input<string>('chevron-down');
  public readonly showIcon: InputSignal<boolean> = input<boolean>(false);

  constructor() {
    if (this.context) {
      this.context.registerPanel(this);
    }

    effect((): void => {
      if (!this.context) {
        this.internalExpanded.set(this.expanded());
      }
    });
  }

  public readonly headerTemplate: Signal<AccordionHeader | undefined> =
    contentChild(AccordionHeader);
  public readonly toggleIconTemplate: Signal<AccordionToggleIcon | undefined> =
    contentChild(AccordionToggleIcon);
  @ViewChild('headerButton', { static: true })
  public headerButton?: ElementRef<HTMLButtonElement>;

  private readonly context: AccordionContext | null = inject(ACCORDION_CONTEXT, {
    optional: true,
  });
  private readonly uid: string = this.createId();
  private readonly internalExpanded: WritableSignal<boolean> = signal<boolean>(this.expanded());

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-accordion-panel', 'accordion-panel'];
    if (this.isExpanded()) {
      classes.push('accordion-panel-expanded');
    }
    if (this.disabled()) {
      classes.push('accordion-panel-disabled');
    }
    return classes.join(' ');
  });

  public readonly hasCustomHeader: Signal<boolean> = computed<boolean>((): boolean =>
    Boolean(this.headerTemplate())
  );
  public readonly resolvedId: Signal<string> = computed<string>(
    (): string => this.value() ?? this.panelId()
  );
  public readonly isExpanded: Signal<boolean> = computed<boolean>((): boolean =>
    this.context ? this.context.isPanelExpanded(this.resolvedId()) : this.internalExpanded()
  );

  public readonly headerId: Signal<string> = computed<string>((): string => `${this.uid}-header`);
  public readonly panelId: Signal<string> = computed<string>((): string => `${this.uid}-panel`);
  public readonly resolvedIconName: Signal<string> = computed<string>((): string =>
    this.isExpanded() ? this.expandIcon() : this.collapseIcon()
  );
  public readonly isIconEnd: Signal<boolean> = computed<boolean>(
    (): boolean => this.iconPosition() === 'end'
  );

  public toggle(): void {
    if (this.disabled()) {
      return;
    }
    if (this.context) {
      this.context.togglePanel(this.resolvedId());
      return;
    }
    this.internalExpanded.set(!this.internalExpanded());
  }

  public onKeydown(event: KeyboardEvent): void {
    const key: string = event.key;
    if (key === KEYBOARD_KEYS.Space || key === KEYBOARD_KEYS.Enter) {
      event.preventDefault();
      this.toggle();
    }
  }

  public focusHeader(): void {
    const button: HTMLButtonElement | undefined = this.headerButton?.nativeElement;
    if (button && !this.disabled()) {
      button.focus();
    }
  }

  public ngOnDestroy(): void {
    this.context?.unregisterPanel(this);
  }

  private createId(): string {
    if (
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.randomUUID === 'function'
    ) {
      return `ui-lib-accordion-panel-${globalThis.crypto.randomUUID()}`;
    }
    accordionPanelId += 1;
    return `ui-lib-accordion-panel-${accordionPanelId}`;
  }
}
