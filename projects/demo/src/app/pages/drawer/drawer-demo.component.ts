import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Drawer } from 'ui-lib-custom/drawer';
import type { DrawerPosition, DrawerVariant } from 'ui-lib-custom/drawer';
import { Button } from 'ui-lib-custom/button';

/**
 * Demo page for the Drawer component.
 */
@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [Drawer, TitleCasePipe, Button],
  templateUrl: './drawer-demo.component.html',
  styleUrl: './drawer-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDemoComponent {
  public readonly basicOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly positionOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentPosition: WritableSignal<DrawerPosition> = signal<DrawerPosition>('right');
  public readonly variantOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentVariant: WritableSignal<DrawerVariant> = signal<DrawerVariant>('material');
  public readonly noBackdropOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly fullScreenOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly footerOpen: WritableSignal<boolean> = signal<boolean>(false);

  public openPosition(position: DrawerPosition): void {
    this.currentPosition.set(position);
    this.positionOpen.set(true);
  }

  public openVariant(variant: DrawerVariant): void {
    this.currentVariant.set(variant);
    this.variantOpen.set(true);
  }
}
