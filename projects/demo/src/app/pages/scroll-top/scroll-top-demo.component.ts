import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollTop } from 'ui-lib-custom/scroll-top';

/**
 * Demo page for the ScrollTop component.
 */
@Component({
  selector: 'app-scroll-top-demo',
  standalone: true,
  imports: [ScrollTop],
  templateUrl: './scroll-top-demo.component.html',
  styleUrl: './scroll-top-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollTopDemoComponent {
  /** Items for the scrollable container demo. */
  public readonly dummyItems: number[] = Array.from(
    { length: 20 },
    (_: unknown, index: number): number => index + 1
  );

  /** Filler items to make the page tall enough to scroll. */
  public readonly fillerItems: number[] = Array.from(
    { length: 8 },
    (_: unknown, index: number): number => index + 1
  );
}
