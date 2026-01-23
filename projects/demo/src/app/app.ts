import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly THEME_KEY = 'uilib-theme';
  sidebarVisible = signal(false);
  theme = signal<'light' | 'dark'>(this.getInitialTheme());

  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.theme());
      localStorage.setItem(this.THEME_KEY, this.theme());
    });
  }

  private getInitialTheme(): 'light' | 'dark' {
    const stored = localStorage.getItem(this.THEME_KEY) as 'light' | 'dark' | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }

  toggleTheme() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
