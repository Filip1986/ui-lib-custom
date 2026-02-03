import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Icon,
  IconLibrary,
  IconSize,
  SemanticIcon,
  ThemeConfigService,
  ThemeIconConfig,
} from 'ui-lib-custom';

@Component({
  selector: 'ui-lib-icon-editor-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, Icon, TitleCasePipe],
  templateUrl: './icon-editor-panel.html',
  styleUrls: ['./icon-editor-panel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconEditorPanel {
  private readonly themeService = inject(ThemeConfigService);

  libraries: IconLibrary[] = ['material', 'bootstrap', 'lucide', 'heroicons', 'tabler'];
  sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  previewIcons: SemanticIcon[] = ['home', 'user', 'settings', 'search', 'mail', 'star'];
  private readonly defaultSizes: Record<IconSize, string> = {
    xs: '0.75rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
  };

  config = computed<ThemeIconConfig>(
    () =>
      this.themeService.preset().icons ?? {
        defaultLibrary: 'lucide',
        defaultSize: 'md',
        sizes: { ...this.defaultSizes },
      }
  );

  private pushPatch(patch: Partial<ThemeIconConfig>) {
    const current = this.config();
    const next: ThemeIconConfig = {
      defaultLibrary: patch.defaultLibrary ?? current.defaultLibrary,
      defaultSize: patch.defaultSize ?? current.defaultSize,
      sizes: patch.sizes ?? current.sizes,
    };
    this.themeService.loadPreset({ icons: next }, { merge: true, apply: true, persist: true });
  }

  onLibraryChange(event: Event) {
    const library = (event.target as HTMLSelectElement).value as IconLibrary;
    this.pushPatch({ defaultLibrary: library });
  }

  onSizeChange(event: Event) {
    const size = (event.target as HTMLSelectElement).value as IconSize;
    this.pushPatch({ defaultSize: size });
  }

  onSizeValueChange(size: IconSize, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const mergedSizes = { ...this.config().sizes, [size]: value } as Record<IconSize, string>;
    this.pushPatch({ sizes: mergedSizes });
  }
}
