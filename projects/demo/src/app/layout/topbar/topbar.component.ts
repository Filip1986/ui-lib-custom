import { Component, ChangeDetectionStrategy, input, output, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Button } from 'ui-lib-custom/button';
import { ThemeConfigService, ThemeMode } from 'ui-lib-custom/theme';

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
  readonly mode: Signal<ThemeMode> = this.themeService.mode;

  menuButtonClick = output<void>();
  themeToggle = output<void>();
  loadTheme = output<string>();
  theme = input<'light' | 'dark' | 'brand-example'>('light');
  themeName = input<string>('light');
  themeVariant = input<string>('material');
  savedThemes = input<string[]>([]);

  onMenuButtonClick(): void {
    this.menuButtonClick.emit();
  }

  onThemeToggle(): void {
    const current: ThemeMode = this.mode();
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
    this.themeService.setMode(next);
    this.themeToggle.emit();
  }

  onLoadTheme(name: string): void {
    if (name) {
      this.loadTheme.emit(name);
    }
  }
}
