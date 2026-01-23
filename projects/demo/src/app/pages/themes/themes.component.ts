import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, Card, Badge, Stack, Inline } from '../../../../../ui-lib-custom/src/public-api';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, Button, Card, Badge, Stack, Inline],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemesComponent {}
