import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
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
    this.themeToggle.emit();
  }

  onLoadTheme(name: string): void {
    if (name) {
      this.loadTheme.emit(name);
    }
  }
}
