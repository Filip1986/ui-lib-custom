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
  public readonly libraries: IconLibrary[] = [
    'lucide',
    'bootstrap',
    'material',
    'heroicons',
    'tabler',
  ];
  public readonly semanticIcons: SemanticIcon[] = SEMANTIC_ICONS;

  public readonly selectedIcon = signal<SemanticIcon>('home');

  public onIconSelect(event: Event): void {
    this.selectedIcon.set((event.target as HTMLSelectElement).value as SemanticIcon);
  }
}
