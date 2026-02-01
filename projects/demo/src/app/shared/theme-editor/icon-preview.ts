import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon, IconLibrary, SemanticIcon, SEMANTIC_ICONS } from 'ui-lib-custom';

@Component({
  selector: 'ui-lib-icon-preview',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './icon-preview.component.html',
  styleUrls: ['./icon-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPreview {
  libraries: IconLibrary[] = ['lucide', 'bootstrap', 'material', 'heroicons', 'tabler'];
  semanticIcons: SemanticIcon[] = SEMANTIC_ICONS;

  selectedIcon = signal<SemanticIcon>('home');

  onIconSelect(event: Event) {
    this.selectedIcon.set((event.target as HTMLSelectElement).value as SemanticIcon);
  }
}
