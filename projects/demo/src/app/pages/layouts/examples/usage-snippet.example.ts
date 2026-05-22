import { Component } from '@angular/core';
import { Container, Grid, Stack } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [Container, Grid, Stack],
  templateUrl: './usage-snippet.example.html',
})
export class MyComponent {}
