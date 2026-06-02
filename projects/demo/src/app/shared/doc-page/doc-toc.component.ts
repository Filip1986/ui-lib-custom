import type { InputSignal, OutputEmitterRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { DocSection } from './doc-section.model';

/**
 * Table of contents component for documentation sections.
 */
@Component({
  selector: 'app-doc-toc',
  standalone: true,
  imports: [],
  templateUrl: './doc-toc.component.html',
  styleUrl: './doc-toc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTocComponent {
  public readonly sections: InputSignal<DocSection[]> = input.required<DocSection[]>();
  public readonly activeId: InputSignal<string | null> = input<string | null>(null);
  public readonly sectionSelected: OutputEmitterRef<string> = output<string>();

  public onSelect(id: string): void {
    this.sectionSelected.emit(id);
  }
}
