import { Component, ChangeDetectionStrategy, input, output, inject, computed } from '@angular/core';
import type { Signal, InputSignal, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Button } from 'ui-lib-custom/button';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeMode, ThemeVariant } from 'ui-lib-custom/theme';
import type { ShapeToken, DensityToken } from 'ui-lib-custom/tokens';

/**
 * Demo topbar with theme toggles and navigation actions.
 */
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, Button],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);
  public readonly mode: Signal<ThemeMode> = this.themeService.mode;
  public readonly variant: Signal<ThemeVariant> = computed<ThemeVariant>(
    (): ThemeVariant => this.themeService.variant()
  );
  public readonly shape: Signal<ShapeToken> = computed<ShapeToken>(
    (): ShapeToken => this.themeService.shape()
  );
  public readonly density: Signal<DensityToken> = computed<DensityToken>(
    (): DensityToken => this.themeService.density()
  );

  public readonly menuButtonClick: OutputEmitterRef<void> = output<void>();
  public readonly themeToggle: OutputEmitterRef<void> = output<void>();
  public readonly loadTheme: OutputEmitterRef<string> = output<string>();
  public readonly theme: InputSignal<'light' | 'dark' | 'brand-example'> = input<
    'light' | 'dark' | 'brand-example'
  >('light');
  public readonly themeName: InputSignal<string> = input<string>('light');
  public readonly themeVariant: InputSignal<string> = input<string>('material');
  public readonly savedThemes: InputSignal<string[]> = input<string[]>([]);

  public onMenuButtonClick(): void {
    this.menuButtonClick.emit();
  }

  public onThemeToggle(): void {
    const current: ThemeMode = this.mode();
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
    this.themeService.setMode(next);
    this.themeToggle.emit();
  }

  public onLoadTheme(name: string): void {
    if (name) {
      this.loadTheme.emit(name);
    }
  }

  public setVariant(variant: ThemeVariant): void {
    this.themeService.setVariant(variant);
  }

  public setShape(shape: ShapeToken): void {
    this.themeService.setShape(shape);
  }

  public setDensity(density: DensityToken): void {
    this.themeService.setDensity(density);
  }
}
