import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { Badge } from 'ui-lib-custom/badge';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo home page entry for the component library.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Card, Button, Badge, DocPageLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly sections: DocSection[] = [
    { id: 'quick-links', label: 'Quick Links' },
    { id: 'features', label: 'Features' },
    { id: 'quick-preview', label: 'Quick Preview' },
    { id: 'theme-preview', label: 'Theme Preview' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'profiling-notes', label: 'Profiling Notes' },
  ];
}
