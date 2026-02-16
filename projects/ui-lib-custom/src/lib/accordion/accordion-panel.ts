import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  OnDestroy,
  InputSignal,
  TemplateRef,
  ViewChild,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { AccordionContext, ACCORDION_CONTEXT } from './accordion';
import { AccordionIconPosition } from './accordion.types';
import { Icon } from '../icon/icon';

let accordionPanelId = 0;

@Directive({
  selector: '[accordionHeader]',
  standalone: true,
})
export class AccordionHeader {
  constructor(public readonly template: TemplateRef<unknown>) {}
}

export interface AccordionToggleIconContext {
  $implicit: boolean;
  expanded: boolean;
}

@Directive({
  selector: '[accordionToggleIcon]',
  standalone: true,
})
export class AccordionToggleIcon {
  constructor(public readonly template: TemplateRef<AccordionToggleIconContext>) {}
}

@Component({
  selector: 'ui-lib-accordion-panel',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './accordion-panel.html',
  styleUrl: './accordion-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-state]': "isExpanded() ? 'expanded' : 'collapsed'",
    '[attr.data-disabled]': 'disabled() ? true : null',
  },
})
export class AccordionPanel implements OnDestroy {
  header: InputSignal<string> = input<string>('');
  value: InputSignal<string | null> = input<string | null>(null);
  disabled: InputSignal<boolean> = input<boolean>(false);
  expanded: InputSignal<boolean> = input<boolean>(false);
  iconPosition: InputSignal<AccordionIconPosition> = input<AccordionIconPosition>('end');
  expandIcon: InputSignal<string> = input<string>('chevron-up');
  collapseIcon: InputSignal<string> = input<string>('chevron-down');
  showIcon: InputSignal<boolean> = input<boolean>(true);

  constructor() {
    if (this.context) {
      this.context.registerPanel(this);
    }
  }

  @ContentChild(AccordionHeader) headerTemplate?: AccordionHeader;
  @ContentChild(AccordionToggleIcon) toggleIconTemplate?: AccordionToggleIcon;
  @ViewChild('headerButton', { static: true })
  headerButton?: ElementRef<HTMLButtonElement>;

  private readonly context: AccordionContext | null = inject(ACCORDION_CONTEXT, {
    optional: true,
  });
  private readonly uid: string = this.createId();
  private readonly internalExpanded = signal<boolean>(this.expanded());

  readonly hostClasses = computed(() => {
    const classes: string[] = ['ui-lib-accordion-panel', 'accordion-panel'];
    if (this.isExpanded()) {
      classes.push('accordion-panel-expanded');
    }
    if (this.disabled()) {
      classes.push('accordion-panel-disabled');
    }
    return classes.join(' ');
  });

  readonly hasCustomHeader = computed((): boolean => !!this.headerTemplate);
  readonly resolvedId = computed((): string => this.value() ?? this.panelId());
  readonly isExpanded = computed((): boolean =>
    this.context ? this.context.isPanelExpanded(this.resolvedId()) : this.internalExpanded()
  );

  readonly headerId = computed((): string => `${this.uid}-header`);
  readonly panelId = computed((): string => `${this.uid}-panel`);
  readonly resolvedIconName = computed((): string =>
    this.isExpanded() ? this.expandIcon() : this.collapseIcon()
  );
  readonly isIconEnd = computed((): boolean => this.iconPosition() === 'end');

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    if (this.context) {
      this.context.togglePanel(this.resolvedId());
      return;
    }
    this.internalExpanded.set(!this.internalExpanded());
  }

  onKeydown(event: KeyboardEvent): void {
    const key: string = event.key;
    if (key === ' ' || key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  focusHeader(): void {
    const button: HTMLButtonElement | undefined = this.headerButton?.nativeElement;
    if (button && !this.disabled()) {
      button.focus();
    }
  }

  ngOnDestroy(): void {
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
