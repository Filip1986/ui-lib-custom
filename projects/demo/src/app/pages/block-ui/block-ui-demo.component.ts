import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { BlockUI } from 'ui-lib-custom/block-ui';
import { Button } from 'ui-lib-custom/button';

/**
 * Demo page for the BlockUI component.
 * Shows basic usage, custom mask content, variants, and interactive toggling.
 */
@Component({
  selector: 'app-block-ui-demo',
  standalone: true,
  imports: [BlockUI, Button],
  templateUrl: './block-ui-demo.component.html',
  styleUrl: './block-ui-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockUiDemoComponent {
  public readonly basicBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly spinnerBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly materialBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly bootstrapBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly minimalBlocked: WritableSignal<boolean> = signal<boolean>(false);

  public toggleBasic(): void {
    this.basicBlocked.update((value: boolean): boolean => !value);
  }

  public toggleSpinner(): void {
    this.spinnerBlocked.update((value: boolean): boolean => !value);
  }

  public toggleMaterial(): void {
    this.materialBlocked.update((value: boolean): boolean => !value);
  }

  public toggleBootstrap(): void {
    this.bootstrapBlocked.update((value: boolean): boolean => !value);
  }

  public toggleMinimal(): void {
    this.minimalBlocked.update((value: boolean): boolean => !value);
  }
}
