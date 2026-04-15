import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Breadcrumb component.
 */
@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  templateUrl: './breadcrumb-demo.component.html',
  styleUrl: './breadcrumb-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {}
