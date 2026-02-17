import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'ui-lib-custom/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
