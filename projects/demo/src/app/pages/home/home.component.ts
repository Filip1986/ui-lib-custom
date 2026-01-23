import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'ui-lib-custom';
import { Card } from 'ui-lib-custom';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Button, Card, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}
