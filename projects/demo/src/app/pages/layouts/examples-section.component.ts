import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, Container, Grid, Inline, Stack, Button } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';

@Component({
  selector: 'app-layout-examples-section',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Card,
    Container,
    Grid,
    Inline,
    Stack,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
  ],
  templateUrl: './examples-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutExamplesSectionComponent {
  readonly sections: DocSection[] = [{ id: 'examples', label: 'Examples' }];

  readonly metrics = [72.4, 48.1, 33.7, 68.9];
  readonly pricing = [29, 59, 129];
}
