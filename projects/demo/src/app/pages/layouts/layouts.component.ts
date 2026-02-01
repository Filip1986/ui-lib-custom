import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Card, Stack, Inline, Grid, Container } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [Stack, Inline, Grid, Container, Card, DocPageLayoutComponent, DocDemoViewportComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutsComponent {
  readonly sections: DocSection[] = [
    { id: 'semantic-spacing', label: 'Semantic Spacing' },
    { id: 'stack', label: 'Stack' },
    { id: 'inline', label: 'Inline' },
    { id: 'grid', label: 'Grid' },
    { id: 'container', label: 'Container' },
    { id: 'composition', label: 'Composition' },
    { id: 'design-tokens', label: 'Design Tokens' },
    { id: 'themed-layouts', label: 'Themed Layouts' },
  ];
}
