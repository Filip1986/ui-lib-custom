import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, Card, Badge } from 'ui-lib-custom';
import { RouterLink } from '@angular/router';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Button, Card, Badge, RouterLink, DocPageLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly sections: DocSection[] = [
    { id: 'quick-links', label: 'Quick Links' },
    { id: 'features', label: 'Features' },
    { id: 'quick-preview', label: 'Quick Preview' },
    { id: 'theme-preview', label: 'Theme Preview' },
    { id: 'getting-started', label: 'Getting Started' },
  ];
}
