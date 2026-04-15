import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Slider component.
 */
@Component({
  selector: 'app-slider-demo',
  standalone: true,
  template: `
    <section class="slider-demo" data-testid="slider-demo">
      <h1>Slider</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .slider-demo {
      padding: 1.5rem;
    }

    .slider-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .slider-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {}
