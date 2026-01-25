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
  viewportToggle = output<void>();
  loadTheme = output<string>();
  theme = input<'light' | 'dark' | 'brand-example'>('light');
  savedThemes = input<string[]>([]);

  onMenuButtonClick() {
    this.menuButtonClick.emit();
  }

  onThemeToggle() {
    this.themeToggle.emit();
  }

  onViewportToggle() {
    this.viewportToggle.emit();
  }

  onLoadTheme(name: string) {
    if (name) {
      this.loadTheme.emit(name);
    }
  }
}
