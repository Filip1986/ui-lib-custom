import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Storybook demo button component.
 */
@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule],
  template: ` <button
    type="button"
    (click)="clicked.emit($event)"
    [ngClass]="classes"
    [ngStyle]="{ 'background-color': backgroundColor }"
  >
    {{ label }}
  </button>`,
  styleUrls: ['./button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /** Is this the principal call to action on the page? */
  @Input()
  public primary: boolean = false;

  /** What background color to use */
  @Input()
  public backgroundColor?: string;

  /** How large should the button be? */
  @Input()
  public size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  public label: string = 'Button';

  /** Optional click handler */
  @Output()
  public clicked: EventEmitter<Event> = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode: string = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode];
  }
}
