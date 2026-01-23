import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'uilib-ui-lib-custom',
  imports: [],
  template: `
    <p>
      ui-lib-custom works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLibCustom {

}
