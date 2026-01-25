import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Badge, Button, Card, Inline, UiLibInput } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { ThemeConfigService } from 'ui-lib-custom';
import { Router } from '@angular/router';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Card, Badge, Inline, UiLibInput, DocPageLayoutComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemesComponent {
  private readonly themeService = inject(ThemeConfigService);
  private readonly router = inject(Router);

  readonly sections: DocSection[] = [
    { id: 'side-by-side', label: 'Side-by-side Themes' },
    { id: 'toggle', label: 'Toggle in Your App' },
  ];

  themeName = signal<string>(this.themeService.preset().name ?? 'theme');
  status = signal('');

  saveTheme(): void {
    const name = this.themeName().trim();
    if (!name) {
      this.status.set('Enter a name before saving');
      return;
    }
    this.themeService.saveToLocalStorage(name);
    this.status.set(`Saved theme as "${name}"`);
  }

  goToProjectStarter(): void {
    this.router.navigate(['/project-starter']);
  }
}
