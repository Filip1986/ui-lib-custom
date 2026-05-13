import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
  ViewEncapsulation,
  ElementRef,
  inject,
  isDevMode,
  type InputSignal,
  type Signal,
} from '@angular/core';
import type { ButtonVariant, ButtonSize } from '../button';

/**
 * Groups buttons with shared sizing and variant styling.
 */
@Component({
  selector: 'ui-lib-button-group',
  standalone: true,
  templateUrl: './button-group.html',
  styleUrl: './button-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-button-group',
    '[class.ui-lib-button-group--vertical]': "resolvedOrientation() === 'vertical'",
    '[class.ui-lib-button-group--size-small]': "normalizedSize() === 'small'",
    '[class.ui-lib-button-group--size-large]': "normalizedSize() === 'large'",
    '[class.ui-lib-button-group--material]': "variant() === 'material'",
    '[class.ui-lib-button-group--bootstrap]': "variant() === 'bootstrap'",
    '[class.ui-lib-button-group--minimal]': "variant() === 'minimal'",
  },
})
export class ButtonGroup {
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  public readonly variant: InputSignal<ButtonVariant> = input<ButtonVariant>('material');
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly orientation: InputSignal<'horizontal' | 'vertical'> = input<
    'horizontal' | 'vertical'
  >('horizontal');
  public readonly vertical: InputSignal<boolean> = input<boolean>(false);
  public readonly size: InputSignal<ButtonSize> = input<ButtonSize>('md');

  public readonly resolvedOrientation: Signal<'horizontal' | 'vertical'> = computed<
    'horizontal' | 'vertical'
  >((): 'horizontal' | 'vertical' =>
    this.orientation() === 'vertical' || this.vertical() ? 'vertical' : 'horizontal'
  );

  public readonly normalizedSize: Signal<'small' | 'medium' | 'large'> = computed<
    'small' | 'medium' | 'large'
  >((): 'small' | 'medium' | 'large' => {
    const size: ButtonSize = this.size();
    const map: Record<ButtonSize, 'small' | 'medium' | 'large'> = {
      sm: 'small',
      md: 'medium',
      lg: 'large',
    };
    return map[size];
  });

  constructor() {
    afterNextRender((): void => this.warnIfMissingAriaLabel());
  }

  private warnIfMissingAriaLabel(): void {
    if (!isDevMode() || this.ariaLabel()) {
      return;
    }

    const groupElement: HTMLElement | null = this.elementRef.nativeElement.querySelector(
      '.ui-lib-button-group__group'
    );
    const hasProjectedContent: boolean = this.hasProjectedContent(groupElement);
    if (hasProjectedContent) {
      console.warn(
        '[ui-lib-button-group] Missing ariaLabel. Provide ariaLabel when grouping related actions for assistive technologies.'
      );
    }
  }

  private hasProjectedContent(groupElement: HTMLElement | null): boolean {
    if (!groupElement) {
      return false;
    }

    return Array.from(groupElement.childNodes).some((node: ChildNode): boolean => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      return false;
    });
  }
}
