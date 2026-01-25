import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ThemeConfigService } from 'ui-lib-custom';
import { ThemeEditorComponent } from './shared/theme-editor/theme-editor.component';
import { ViewportPreviewComponent } from './shared/viewport-preview/viewport-preview.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent, ThemeEditorComponent, ViewportPreviewComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly themeService = inject(ThemeConfigService);
  sidebarVisible = signal(false);
  theme = computed<'light' | 'dark' | 'brand-example'>(() => this.themeService.preset().name as 'light' | 'dark' | 'brand-example');
  viewportEnabled = signal(false);
  savedThemes = this.themeService.savedThemes;

  constructor() {
    // Ensure initial application of CSS vars when the component instantiates.
    this.themeService.applyToRoot();
  }

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }

  toggleTheme() {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyPreset(next);
  }

  toggleViewport() {
    this.viewportEnabled.update((v) => !v);
  }

  loadTheme(name: string) {
    this.themeService.loadFromLocalStorage(name);
  }

  private applyPreset(name: 'light' | 'dark' | 'brand-example') {
    const preset = this.themeService.listBuiltInPresets()[name];
    if (preset) {
      this.themeService.loadPreset(preset, { apply: true, persist: true, merge: false });
    }
  }
}
