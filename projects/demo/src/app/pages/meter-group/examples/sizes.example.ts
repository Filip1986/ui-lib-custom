import { Component } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';

@Component({
  standalone: true,
  imports: [MeterGroup],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly items: MeterItem[] = [
    { label: 'Used', value: 45, color: '#6366f1' },
    { label: 'Cached', value: 25, color: '#a5b4fc' },
    { label: 'Free', value: 30, color: '#e0e7ff' },
  ];
}
