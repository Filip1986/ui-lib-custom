import { Component } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';

@Component({
  standalone: true,
  imports: [MeterGroup],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly storageItems: MeterItem[] = [
    { label: 'Apps', value: 16, color: '#34d399' },
    { label: 'Messages', value: 8, color: '#818cf8' },
    { label: 'Media', value: 24, color: '#fb923c' },
    { label: 'System', value: 10, color: '#f87171' },
  ];
}
