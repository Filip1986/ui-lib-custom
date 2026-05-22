import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './header-icons.example.html',
})
export class MyComponent {
  public refresh(): void {
    /* reload data */
  }
  public download(): void {
    /* export data */
  }
}
