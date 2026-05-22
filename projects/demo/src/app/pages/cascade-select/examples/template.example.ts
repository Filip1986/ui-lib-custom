import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect, CascadeSelectOptionDirective } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect, CascadeSelectOptionDirective],
  templateUrl: './template.example.html',
})
export class MyComponent {
  public templatedCode: string | null = null;
  public countries = [
    /* your country data */
  ];

  public resolveNodeLabel(option: unknown): string {
    const node = option as { cname?: string; name?: string };
    return node.cname ?? node.name ?? '';
  }

  public resolveNodeIcon(option: unknown): string {
    const node = option as { icon?: string };
    return node.icon ?? 'pi pi-circle';
  }
}
