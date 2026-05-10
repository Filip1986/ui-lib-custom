import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StyleClass } from 'ui-lib-custom/style-class';
import { Button } from 'ui-lib-custom/button';

/**
 * Demo page for the StyleClass directive.
 */
@Component({
  selector: 'app-style-class-demo',
  standalone: true,
  imports: [StyleClass, Button],
  templateUrl: './style-class-demo.component.html',
  styleUrl: './style-class-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleClassDemoComponent {}
