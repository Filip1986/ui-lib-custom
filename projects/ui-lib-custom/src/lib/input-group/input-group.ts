import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { INPUT_GROUP_CLASSES } from './input-group.constants';

/**
 * Wrapper container that composes inputs with optional addon elements.
 */
@Component({
  selector: 'uilib-input-group',
  standalone: true,
  templateUrl: './input-group.html',
  styleUrl: './input-group.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: INPUT_GROUP_CLASSES.Root,
  },
})
export class InputGroupComponent {}
