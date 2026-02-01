import { ChangeDetectionStrategy, Component, HostBinding, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'ui-lib-custom';

@Component({
  selector: 'app-doc-control-group',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './doc-control-group.component.html',
  styleUrl: './doc-control-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'control-group' },
})
export class DocControlGroupComponent {
  title = input<string>('');
  description = input<string>('');
  columns = input<number | null>(null);

  headerVisible = computed(() => !!this.title()?.trim() || !!this.description()?.trim());

  @HostBinding('class.control-group--columns-3')
  get isThreeColumns(): boolean {
    return this.columns() === 3;
  }
}
