import { Component } from '@angular/core';
import { Stack, Inline, Grid, Container } from '../../../../../ui-lib-custom/src/public-api';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [Stack, Inline, Grid, Container],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {}
