import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon, SEMANTIC_ICONS } from 'ui-lib-custom/icon';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import type { IconLibrary } from 'ui-lib-custom/core';

/**
 * Preview list of semantic icons for the theme editor.
 */
@Component({
  selector: 'ui-lib-icon-preview',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './icon-preview.component.html',
  styleUrls: ['./icon-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPreview {
  public readonly libraries: IconLibrary[] = [
    'lucide',
    'bootstrap',
    'material',
    'heroicons',
    'tabler',
  ];
  public readonly semanticIcons: SemanticIcon[] = SEMANTIC_ICONS;

  public readonly selectedIcon: WritableSignal<SemanticIcon> = signal<SemanticIcon>('home');

  public onIconSelect(event: Event): void {
    this.selectedIcon.set((event.target as HTMLSelectElement).value as SemanticIcon);
  }
}
