import { Component } from '@angular/core';
import { MegaMenu } from 'ui-lib-custom/mega-menu';
import type { MegaMenuItem } from 'ui-lib-custom/mega-menu';

@Component({
  standalone: true,
  imports: [MegaMenu],
  templateUrl: './basic-horizontal.example.html',
})
export class MyComponent {
  readonly items: MegaMenuItem[] = [
    {
      label: 'Products',
      items: [
        {
          header: 'Design Tools',
          items: [
            { label: 'Figma Plugin', icon: 'pi pi-palette' },
            { label: 'CLI Toolkit', icon: 'pi pi-terminal' },
          ],
        },
      ],
    },
    { label: 'Docs', url: 'https://example.com/docs', target: '_blank' },
  ];
}
