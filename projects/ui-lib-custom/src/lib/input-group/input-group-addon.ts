import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { INPUT_GROUP_CLASSES } from './input-group.constants';

/**
 *
 */
@Component({
  selector: 'uilib-input-group-addon',
  standalone: true,
  templateUrl: './input-group-addon.html',
  styleUrl: './input-group-addon.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: INPUT_GROUP_CLASSES.Addon,
  },
})
export class InputGroupAddonComponent {}
