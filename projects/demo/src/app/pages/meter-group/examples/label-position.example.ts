import { Component } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';

@Component({
  standalone: true,
  imports: [MeterGroup],
  templateUrl: './label-position.example.html',
})
export class MyComponent {
  public readonly items: MeterItem[] = [
    { label: 'Documents', value: 38, color: '#0ea5e9' },
    { label: 'Videos', value: 21, color: '#d946ef' },
    { label: 'Photos', value: 17, color: '#f59e0b' },
    { label: 'Other', value: 12, color: '#6b7280' },
  ];
}
