import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'ui-lib-custom';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule, Button],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
}
