import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'ui-components';
import { Button } from 'ui-components';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, Card, Button],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
}
