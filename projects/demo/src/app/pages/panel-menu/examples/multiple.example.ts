import { Component } from '@angular/core';
import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type { PanelMenuItem } from 'ui-lib-custom/panel-menu';

@Component({
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './multiple.example.html',
})
export class MyComponent {
  readonly items: PanelMenuItem[] = [
    {
      label: 'Frontend',
      icon: 'pi pi-desktop',
      items: [{ label: 'Angular' }, { label: 'React' }],
    },
    {
      label: 'Backend',
      icon: 'pi pi-server',
      items: [{ label: 'Node.js' }, { label: 'Python' }],
    },
  ];
}
