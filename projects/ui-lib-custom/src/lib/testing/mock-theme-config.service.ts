import { Injectable, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import type { ThemeVariant } from 'ui-lib-custom/theme';

/**
 * Lightweight test double for ThemeConfigService.
 *
 * Exposes a variant signal and a setter without using browser APIs.
 */
@Injectable()
export class MockThemeConfigService {
  private readonly variantSignal: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');

  /**
   * Current theme variant signal.
   */
  public readonly variant: Signal<ThemeVariant> = this.variantSignal.asReadonly();

  /**
   * Update the active variant for tests.
   */
  public setVariant(variant: ThemeVariant): void {
    this.variantSignal.set(variant);
  }
}
