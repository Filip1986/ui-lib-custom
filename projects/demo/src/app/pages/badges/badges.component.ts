import { Component } from '@angular/core';
import { Badge, Stack, Inline } from '../../../../../ui-lib-custom/src/public-api';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [Badge, Stack, Inline],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
})
export class BadgesComponent {}
