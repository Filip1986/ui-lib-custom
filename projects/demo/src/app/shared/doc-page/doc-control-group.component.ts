import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-control-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-control-group.component.html',
  styleUrl: './doc-control-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'control-group' },
})
export class DocControlGroupComponent {
  title = input<string>('');
  description = input<string>('');
  columns = input<number | null>(null);

  @HostBinding('class.control-group--columns-3')
  get isThreeColumns(): boolean {
    return this.columns() === 3;
  }
}
