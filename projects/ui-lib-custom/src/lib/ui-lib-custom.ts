import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-lib-ui-lib-custom',
  imports: [],
  template: ` <p>ui-lib-custom works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UiLibCustom {}
