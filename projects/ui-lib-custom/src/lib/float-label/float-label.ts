import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import type { AfterViewChecked, InputSignal } from '@angular/core';
import type { FloatLabelVariant } from './float-label.types';

let nextFloatLabelLabelId: number = 0;
let nextFloatLabelControlId: number = 0;

type FloatLabelNativeControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * FloatLabel wrapper component scaffold.
 */
@Component({
  selector: 'uilib-float-label',
  standalone: true,
  templateUrl: './float-label.html',
  styleUrl: './float-label.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'uilib-float-label',
    '[class.uilib-float-label--over]': 'variant() === "over"',
    '[class.uilib-float-label--in]': 'variant() === "in"',
    '[class.uilib-float-label--on]': 'variant() === "on"',
  },
})
export class FloatLabelComponent implements AfterViewChecked {
  private readonly hostElementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private lastProjectedLabel: HTMLLabelElement | null = null;
  private lastProjectedControl: HTMLElement | null = null;
  private lastNativeControl: FloatLabelNativeControl | null = null;

  /** Defines the positioning of the label relative to the input. */
  public readonly variant: InputSignal<FloatLabelVariant> = input<FloatLabelVariant>('over');

  public ngAfterViewChecked(): void {
    const projectedLabel: HTMLLabelElement | null = this.resolveProjectedLabel();
    const projectedControl: HTMLElement | null = this.resolveProjectedControl();

    if (projectedLabel === null || projectedControl === null) {
      this.lastProjectedLabel = projectedLabel;
      this.lastProjectedControl = projectedControl;
      this.lastNativeControl = null;
      return;
    }

    const nativeControl: FloatLabelNativeControl | null =
      this.resolveNativeControl(projectedControl);

    if (!this.needsSynchronization(projectedLabel, projectedControl, nativeControl)) {
      return;
    }

    this.syncProjectedAccessibility(projectedLabel, projectedControl, nativeControl);
    this.lastProjectedLabel = projectedLabel;
    this.lastProjectedControl = projectedControl;
    this.lastNativeControl = nativeControl;
  }

  private syncProjectedAccessibility(
    projectedLabel: HTMLLabelElement,
    projectedControl: HTMLElement,
    nativeControl: FloatLabelNativeControl | null
  ): void {
    const labelId: string = this.ensureElementId(
      projectedLabel,
      `uilib-float-label-label-${nextFloatLabelLabelId++}`
    );

    if (nativeControl !== null) {
      const controlId: string = this.ensureElementId(
        nativeControl,
        `uilib-float-label-control-${nextFloatLabelControlId++}`
      );

      if (projectedLabel.htmlFor !== controlId) {
        this.renderer.setAttribute(projectedLabel, 'for', controlId);
      }

      this.ensurePlaceholder(nativeControl);
      return;
    }

    this.appendIdReference(projectedControl, 'aria-labelledby', labelId);
  }

  private needsSynchronization(
    projectedLabel: HTMLLabelElement,
    projectedControl: HTMLElement,
    nativeControl: FloatLabelNativeControl | null
  ): boolean {
    if (
      projectedLabel !== this.lastProjectedLabel ||
      projectedControl !== this.lastProjectedControl ||
      nativeControl !== this.lastNativeControl
    ) {
      return true;
    }

    if (projectedLabel.id.trim().length === 0) {
      return true;
    }

    if (nativeControl !== null) {
      if (nativeControl.id.trim().length === 0 || projectedLabel.htmlFor !== nativeControl.id) {
        return true;
      }

      if (
        !(nativeControl instanceof HTMLSelectElement) &&
        (nativeControl.getAttribute('placeholder') ?? '').trim().length === 0
      ) {
        return true;
      }

      return false;
    }

    const labelledBy: string[] = (projectedControl.getAttribute('aria-labelledby') ?? '')
      .split(/\s+/)
      .filter((token: string): boolean => token.length > 0);

    return !labelledBy.includes(projectedLabel.id);
  }

  private resolveProjectedLabel(): HTMLLabelElement | null {
    return (
      (Array.from(this.hostElementRef.nativeElement.children).find(
        (element: Element): boolean => element instanceof HTMLLabelElement
      ) as HTMLLabelElement | undefined) ?? null
    );
  }

  private resolveProjectedControl(): HTMLElement | null {
    return (
      (Array.from(this.hostElementRef.nativeElement.children).find(
        (element: Element): boolean => element.tagName.toLowerCase() !== 'label'
      ) as HTMLElement | undefined) ?? null
    );
  }

  private resolveNativeControl(projectedControl: HTMLElement): FloatLabelNativeControl | null {
    if (this.isNativeControl(projectedControl)) {
      return projectedControl;
    }

    return projectedControl.querySelector('input, textarea, select');
  }

  private isNativeControl(element: Element): element is FloatLabelNativeControl {
    return (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    );
  }

  private ensureElementId(element: HTMLElement, generatedId: string): string {
    const existingId: string = element.getAttribute('id')?.trim() ?? '';

    if (existingId.length > 0) {
      return existingId;
    }

    this.renderer.setAttribute(element, 'id', generatedId);
    return generatedId;
  }

  private ensurePlaceholder(control: FloatLabelNativeControl): void {
    if (control instanceof HTMLSelectElement) {
      return;
    }

    const existingPlaceholder: string = control.getAttribute('placeholder') ?? '';

    if (existingPlaceholder.trim().length > 0) {
      return;
    }

    this.renderer.setAttribute(control, 'placeholder', ' ');
  }

  private appendIdReference(
    element: HTMLElement,
    attributeName: 'aria-labelledby',
    id: string
  ): void {
    const existingTokens: string[] = (element.getAttribute(attributeName) ?? '')
      .split(/\s+/)
      .filter((token: string): boolean => token.length > 0);

    if (existingTokens.includes(id)) {
      return;
    }

    this.renderer.setAttribute(element, attributeName, [...existingTokens, id].join(' '));
  }
}
