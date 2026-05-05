import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { classNames, ClassNamesPipe } from 'ui-lib-custom/class-names';

/**
 * Demo page for the classNames utility and ClassNamesPipe.
 */
@Component({
  selector: 'app-class-names-demo',
  standalone: true,
  imports: [ClassNamesPipe],
  templateUrl: './class-names-demo.component.html',
  styleUrl: './class-names-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassNamesDemoComponent {
  /** Controls the active state for the playground element. */
  public readonly isActive: WritableSignal<boolean> = signal<boolean>(true);

  /** Controls the disabled state for the playground element. */
  public readonly isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  /** Controls the highlighted state for the playground element. */
  public readonly isHighlighted: WritableSignal<boolean> = signal<boolean>(false);

  /** Computed class string via the classNames function in TypeScript. */
  public readonly computedClasses: Signal<string> = computed<string>((): string =>
    classNames('demo-box', {
      'demo-box--active': this.isActive(),
      'demo-box--disabled': this.isDisabled(),
      'demo-box--highlighted': this.isHighlighted(),
    })
  );

  /** Result preview for the function call section. */
  public readonly functionResult: Signal<string> = computed<string>((): string =>
    classNames('btn', this.isActive() && 'btn--active', {
      'btn--disabled': this.isDisabled(),
    })
  );

  public toggleActive(): void {
    this.isActive.update((value: boolean): boolean => !value);
  }

  public toggleDisabled(): void {
    this.isDisabled.update((value: boolean): boolean => !value);
  }

  public toggleHighlighted(): void {
    this.isHighlighted.update((value: boolean): boolean => !value);
  }
}
