import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  private readonly router = inject(Router);
  sidebarVisible = signal(false);
  theme = computed<'light' | 'dark' | 'brand-example'>(() => this.themeService.preset().name as 'light' | 'dark' | 'brand-example');
  viewportEnabled = signal(false);
  savedThemes = signal<string[]>([]);

  constructor() {
    // Ensure initial application of CSS vars when the component instantiates.
    this.themeService.applyToRoot();
    this.refreshSavedThemes();
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

  saveTheme() {
    const name = prompt('Save theme as:', this.themeService.preset().name) ?? '';
    if (!name.trim()) return;
    this.themeService.saveToLocalStorage(name.trim());
    this.refreshSavedThemes();
  }

  loadTheme(name: string) {
    this.themeService.loadFromLocalStorage(name);
    this.refreshSavedThemes();
  }

  goToProjectStarter() {
    this.router.navigate(['/project-starter']);
  }

  private refreshSavedThemes() {
    this.savedThemes.set(this.themeService.listSavedThemes());
  }

  private applyPreset(name: 'light' | 'dark' | 'brand-example') {
    const preset = this.themeService.listBuiltInPresets()[name];
    if (preset) {
      this.themeService.loadPreset(preset, { apply: true, persist: true, merge: false });
      this.refreshSavedThemes();
    }
  }
}
