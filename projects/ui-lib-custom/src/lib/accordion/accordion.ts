import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  contentChildren,
  computed,
  effect,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { AccordionPanel } from './accordion-panel';
import { ACCORDION_CONTEXT, AccordionContext } from './accordion-context';
import {
  AccordionChangeEvent,
  AccordionExpandMode,
  AccordionSize,
  AccordionVariant,
} from './accordion.types';

interface AccordionPanelContext {
  panel: AccordionPanel;
  id: string;
  index: number;
  disabled: boolean;
  expanded: boolean;
}

@Component({
  selector: 'ui-lib-accordion',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content />',
  styleUrl: './accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-accordion',
    '[class]': 'hostClasses()',
    role: 'presentation',
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    {
      provide: ACCORDION_CONTEXT,
      useExisting: Accordion,
    },
  ],
})
export class Accordion implements AccordionContext {
  variant = input<AccordionVariant>('material');
  size = input<AccordionSize>('md');
  expandMode = input<AccordionExpandMode>('single');
  expandedPanels = input<string[]>([]);
  defaultExpandedPanels = input<string[]>([]);

  expandedChange = output<AccordionChangeEvent>();
  panelToggle = output<AccordionChangeEvent>();

  readonly panels = contentChildren(AccordionPanel);

  private readonly initialExpandedRef: string[] = this.expandedPanels();
  private readonly controlled = signal<boolean>(false);
  private readonly internalExpanded = signal<Set<string>>(new Set(this.defaultExpandedPanels()));
  private readonly registeredPanels: Set<AccordionPanel> = new Set<AccordionPanel>();

  constructor() {
    effect((): void => {
      const defaults: string[] = this.defaultExpandedPanels();
      if (!this.controlled()) {
        this.internalExpanded.set(new Set(defaults));
      }
    });

    effect((): void => {
      const provided: string[] = this.expandedPanels();
      if (!this.controlled() && provided !== this.initialExpandedRef) {
        this.controlled.set(true);
      }
      if (this.controlled()) {
        this.internalExpanded.set(new Set(provided));
      }
    });

    effect((): void => {
      if (this.expandMode() === 'single') {
        const current: Set<string> = new Set<string>(this.internalExpanded());
        if (current.size > 1) {
          const first: string | undefined = Array.from(current)[0];
          this.internalExpanded.set(first ? new Set<string>([first]) : new Set<string>());
        }
      }
    });
  }

  hostClasses = computed((): string => {
    const classes: string[] = [
      'ui-lib-accordion',
      `accordion-variant-${this.variant()}`,
      `accordion-size-${this.size()}`,
      `accordion-expand-mode-${this.expandMode()}`,
    ];
    return classes.join(' ');
  });

  panelContexts = computed((): AccordionPanelContext[] => {
    const panels: readonly AccordionPanel[] = this.panels();
    return panels.map((panel, index) => {
      const id: string = this.resolvePanelId(panel);
      return {
        panel,
        id,
        index,
        disabled: panel.disabled(),
        expanded: this.isPanelExpanded(id),
      };
    });
  });

  togglePanel(panelId: string): void {
    const contexts = this.panelContexts();
    const ctx = contexts.find((c) => c.id === panelId);
    if (!ctx || ctx.disabled) {
      return;
    }

    const mode: AccordionExpandMode = this.expandMode();
    const next: Set<string> = new Set<string>(this.internalExpanded());
    const currentlyExpanded: boolean = next.has(panelId);

    if (mode === 'single') {
      next.clear();
      if (!currentlyExpanded) {
        next.add(panelId);
      }
    } else {
      if (currentlyExpanded) {
        next.delete(panelId);
      } else {
        next.add(panelId);
      }
    }

    this.internalExpanded.set(next);

    const expandedNow: boolean = next.has(panelId);
    const event: AccordionChangeEvent = {
      panelId,
      expanded: expandedNow,
      index: ctx.index,
    };

    this.panelToggle.emit(event);
    this.expandedChange.emit(event);
  }

  isPanelExpanded(panelId: string): boolean {
    return this.internalExpanded().has(panelId);
  }

  registerPanel(panel: AccordionPanel): void {
    this.registeredPanels.add(panel);
  }

  unregisterPanel(panel: AccordionPanel): void {
    this.registeredPanels.delete(panel);
  }

  onKeydown(event: KeyboardEvent): void {
    const key: string = event.key;
    if (key === 'ArrowDown' || key === 'ArrowRight') {
      event.preventDefault();
      this.focusNext(this.indexForEventTarget(event.target));
      return;
    }

    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      event.preventDefault();
      this.focusPrev(this.indexForEventTarget(event.target));
      return;
    }

    if (key === 'Home') {
      event.preventDefault();
      this.focusFirst();
      return;
    }

    if (key === 'End') {
      event.preventDefault();
      this.focusLast();
    }
  }

  private focusNext(currentIndex: number): void {
    const target: number = this.findNextEnabledIndex(currentIndex + 1);
    this.focusAtIndex(target);
  }

  private focusPrev(currentIndex: number): void {
    const target: number = this.findPrevEnabledIndex(currentIndex - 1);
    this.focusAtIndex(target);
  }

  private focusFirst(): void {
    this.focusAtIndex(this.findNextEnabledIndex(0));
  }

  private focusLast(): void {
    const contexts = this.panelContexts();
    this.focusAtIndex(this.findPrevEnabledIndex(contexts.length - 1));
  }

  private focusAtIndex(index: number): void {
    const contexts = this.panelContexts();
    if (index < 0 || index >= contexts.length) {
      return;
    }
    const ctx = contexts.at(index);
    if (ctx && !ctx.disabled) {
      ctx.panel.focusHeader();
    }
  }

  private findNextEnabledIndex(startIndex: number): number {
    const contexts = this.panelContexts();
    for (let i = startIndex; i < contexts.length; i += 1) {
      if (!contexts.at(i)?.disabled) {
        return i;
      }
    }
    return this.findNextEnabledIndexFromStart();
  }

  private findPrevEnabledIndex(startIndex: number): number {
    const contexts = this.panelContexts();
    for (let i = startIndex; i >= 0; i -= 1) {
      if (!contexts.at(i)?.disabled) {
        return i;
      }
    }
    return this.findPrevEnabledIndexFromEnd();
  }

  private findNextEnabledIndexFromStart(): number {
    const contexts = this.panelContexts();
    for (let i = 0; i < contexts.length; i += 1) {
      if (!contexts.at(i)?.disabled) {
        return i;
      }
    }
    return -1;
  }

  private findPrevEnabledIndexFromEnd(): number {
    const contexts = this.panelContexts();
    for (let i = contexts.length - 1; i >= 0; i -= 1) {
      if (!contexts.at(i)?.disabled) {
        return i;
      }
    }
    return -1;
  }

  private indexForEventTarget(target: EventTarget | null): number {
    if (!target) {
      return -1;
    }
    const contexts = this.panelContexts();
    return contexts.findIndex((ctx) => ctx.panel.headerButton?.nativeElement === target);
  }

  private resolvePanelId(panel: AccordionPanel): string {
    const value: string | null = panel.value();
    return value ?? panel.panelId();
  }
}
