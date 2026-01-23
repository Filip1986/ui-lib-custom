import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, Card, Badge, Inline } from '../../../../../ui-lib-custom/src/public-api';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, Button, Card, Badge, Inline, DocPageLayoutComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemesComponent {
  readonly sections: DocSection[] = [
    { id: 'side-by-side', label: 'Side-by-side Themes' },
    { id: 'toggle', label: 'Toggle in Your App' },
  ];
}
