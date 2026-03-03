import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { Signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icon, ThemeConfigService } from 'ui-lib-custom';
import type { IconLibrary, IconSize, SemanticIcon, ThemeIconConfig } from 'ui-lib-custom';

@Component({
  selector: 'ui-lib-icon-editor-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, Icon, TitleCasePipe],
  templateUrl: './icon-editor-panel.html',
  styleUrls: ['./icon-editor-panel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconEditorPanel {
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly libraries: IconLibrary[] = [
    'material',
    'bootstrap',
    'lucide',
    'heroicons',
    'tabler',
  ];
  public readonly sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  public readonly previewIcons: SemanticIcon[] = [
    'home',
    'user',
    'settings',
    'search',
    'mail',
    'star',
  ];
  private readonly defaultSizes: Record<IconSize, string> = {
    xs: '0.75rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
  };

  public readonly config: Signal<ThemeIconConfig> = computed<ThemeIconConfig>(
    (): ThemeIconConfig =>
      this.themeService.preset().icons ?? {
        defaultLibrary: 'lucide',
        defaultSize: 'md',
        sizes: { ...this.defaultSizes },
      }
  );

  private pushPatch(patch: Partial<ThemeIconConfig>): void {
    const current: ThemeIconConfig = this.config();
    const next: ThemeIconConfig = {
      defaultLibrary: patch.defaultLibrary ?? current.defaultLibrary,
      defaultSize: patch.defaultSize ?? current.defaultSize,
      sizes: patch.sizes ?? current.sizes,
    };
    this.themeService.loadPreset({ icons: next }, { merge: true, apply: true, persist: true });
  }

  public onLibraryChange(event: Event): void {
    const library: IconLibrary = (event.target as HTMLSelectElement).value as IconLibrary;
    this.pushPatch({ defaultLibrary: library });
  }

  public onSizeChange(event: Event): void {
    const size: IconSize = (event.target as HTMLSelectElement).value as IconSize;
    this.pushPatch({ defaultSize: size });
  }

  public onSizeValueChange(size: IconSize, event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    const mergedSizes: Record<IconSize, string> = { ...this.config().sizes, [size]: value };
    this.pushPatch({ sizes: mergedSizes });
  }
}
