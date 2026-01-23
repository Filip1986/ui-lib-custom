import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, Card, Button],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
}
