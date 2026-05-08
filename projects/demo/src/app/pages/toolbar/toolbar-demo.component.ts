import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Toolbar } from 'ui-lib-custom/toolbar';
import type { ToolbarSize, ToolbarVariant } from 'ui-lib-custom/toolbar';

/**
 * Demo page for the Toolbar component.
 */
@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [Toolbar],
  templateUrl: './toolbar-demo.component.html',
  styleUrl: './toolbar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDemoComponent {
  public readonly variants: ToolbarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ToolbarSize[] = ['sm', 'md', 'lg'];

  public readonly playgroundVariant: WritableSignal<ToolbarVariant> =
    signal<ToolbarVariant>('material');
  public readonly playgroundSize: WritableSignal<ToolbarSize> = signal<ToolbarSize>('md');

  public setVariant(variant: ToolbarVariant): void {
    this.playgroundVariant.set(variant);
  }

  public setSize(size: ToolbarSize): void {
    this.playgroundSize.set(size);
  }
}
