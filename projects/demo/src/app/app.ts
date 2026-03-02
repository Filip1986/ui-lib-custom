import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ThemeConfigService, ThemeVariant } from 'ui-lib-custom/theme';
import { ThemeEditorComponent } from './shared/theme-editor/theme-editor.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent, ThemeEditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly themeService = inject(ThemeConfigService);
  public readonly sidebarVisible = signal<boolean>(false);
  public readonly theme = computed<'light' | 'dark' | 'brand-example'>(
    () => this.themeService.preset().name as 'light' | 'dark' | 'brand-example'
  );
  public readonly themeName = computed<string>(() => this.themeService.preset().name);
  public readonly themeVariant = computed<ThemeVariant>(() => this.themeService.variant());
  public readonly savedThemes = this.themeService.savedThemes;

  constructor() {
    // Ensure initial application of CSS vars when the component instantiates.
    this.themeService.applyToRoot();
  }

  public toggleSidebar(): void {
    this.sidebarVisible.update((v: boolean) => !v);
  }

  public toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyPreset(next);
  }

  public loadTheme(name: string): void {
    this.themeService.loadFromLocalStorage(name);
  }

  private applyPreset(name: 'light' | 'dark' | 'brand-example'): void {
    const preset = this.themeService.listBuiltInPresets()[name];
    if (preset) {
      this.themeService.loadPreset(preset, { apply: true, persist: true, merge: false });
    }
  }
}
