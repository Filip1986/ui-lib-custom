import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSection } from './doc-section.model';

@Component({
  selector: 'app-doc-toc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-toc.component.html',
  styleUrl: './doc-toc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTocComponent {
  @Input({ required: true }) sections: DocSection[] = [];
  @Input() activeId: string | null = null;
  @Output() sectionSelected = new EventEmitter<string>();

  onSelect(id: string): void {
    this.sectionSelected.emit(id);
  }
}
