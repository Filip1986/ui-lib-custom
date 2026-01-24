import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Badge, Inline } from '../../../../../ui-lib-custom/src/public-api';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [Badge, Inline, DocPageLayoutComponent, DocCodeSnippetComponent],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgesComponent {
  readonly sections: DocSection[] = [
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'pill-shape', label: 'Pill Shape' },
    { id: 'dot-indicators', label: 'Dot Indicators' },
    { id: 'real-world-examples', label: 'Real-World Examples' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'performance', label: 'Performance Features' },
  ];

  readonly snippets = {
    solid: `<ui-lib-badge color="primary" variant="solid">Primary</ui-lib-badge>`,
    outline: `<ui-lib-badge color="secondary" variant="outline">Secondary</ui-lib-badge>`,
    subtle: `<ui-lib-badge color="info" variant="subtle">Info</ui-lib-badge>`,
    sizes: `<ui-lib-inline [gap]="3" align="center">
  <ui-lib-badge color="primary" size="sm">Small</ui-lib-badge>
  <ui-lib-badge color="primary" size="md">Medium</ui-lib-badge>
  <ui-lib-badge color="primary" size="lg">Large</ui-lib-badge>
</ui-lib-inline>`,
    pill: `<ui-lib-inline [gap]="3">
  <ui-lib-badge color="primary" [pill]="true">Primary</ui-lib-badge>
  <ui-lib-badge color="success" [pill]="true">Active</ui-lib-badge>
  <ui-lib-badge color="warning" [pill]="true">Pending</ui-lib-badge>
</ui-lib-inline>`,
    dotStatus: `<ui-lib-inline [gap]="2" align="center">
  <ui-lib-badge color="success" [dot]="true"></ui-lib-badge>
  <span>Online</span>
</ui-lib-inline>`,
    dotSizes: `<ui-lib-inline [gap]="4" align="center">
  <ui-lib-badge color="success" [dot]="true" size="sm"></ui-lib-badge>
  <ui-lib-badge color="success" [dot]="true" size="md"></ui-lib-badge>
  <ui-lib-badge color="success" [dot]="true" size="lg"></ui-lib-badge>
</ui-lib-inline>`,
    usage: `import { Badge } from 'ui-lib-custom';

@Component({
  imports: [Badge],
  template: \`
    <ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>
  \`
})`
  } as const;
}
