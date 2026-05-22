import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from 'ui-lib-custom/icon';
import { UiLibInput } from 'ui-lib-custom/input';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, Icon, UiLibInput, IconFieldComponent, InputIconComponent],
  templateUrl: './template.example.html',
})
export class MyComponent {
  public svgValue: string = '';
  public iconValue: string = '';
}
