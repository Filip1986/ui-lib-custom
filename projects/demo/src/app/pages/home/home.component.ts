import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'ui-components';
import { Card } from 'ui-components';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Button, Card, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}

