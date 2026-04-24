import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import {
  TimelineContentDirective,
  TimelineMarkerDirective,
  TimelineOppositeDirective,
} from './timeline-template-directives';
import type {
  TimelineAlign,
  TimelineLayout,
  TimelineSize,
  TimelineVariant,
} from './timeline.types';
import { TIMELINE_DEFAULTS } from './timeline.constants';
interface TimelineEvent {
  id: number;
  title: string;
  date: string;
}
const SAMPLE_EVENTS: TimelineEvent[] = [
  { id: 1, title: 'Event One', date: '2024-01-01' },
  { id: 2, title: 'Event Two', date: '2024-02-01' },
  { id: 3, title: 'Event Three', date: '2024-03-01' },
];
// ---------------------------------------------------------------------------
// Host component helpers
// ---------------------------------------------------------------------------
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TimelineComponent,
    TimelineContentDirective,
    TimelineMarkerDirective,
    TimelineOppositeDirective,
  ],
  template: `
    <ui-lib-timeline
      [value]="value()"
      [layout]="layout()"
      [align]="align()"
      [variant]="variant()"
      [size]="size()"
      [styleClass]="styleClass()"
      [ariaLabel]="ariaLabel()"
    >
      @if (showContent()) {
        <ng-template uiTimelineContent let-event>
          <span class="content-text">{{ event.title }}</span>
        </ng-template>
      }
      @if (showMarker()) {
        <ng-template uiTimelineMarker let-event>
          <span class="custom-marker">&#x2022;</span>
        </ng-template>
      }
      @if (showOpposite()) {
        <ng-template uiTimelineOpposite let-event>
          <span class="opposite-text">{{ event.date }}</span>
        </ng-template>
      }
    </ui-lib-timeline>
  `,
})
class TimelineTestHostComponent {
  public readonly value: WritableSignal<TimelineEvent[]> = signal<TimelineEvent[]>(SAMPLE_EVENTS);
  public readonly layout: WritableSignal<TimelineLayout> = signal<TimelineLayout>('vertical');
  public readonly align: WritableSignal<TimelineAlign> = signal<TimelineAlign>('left');
  public readonly variant: WritableSignal<TimelineVariant | null> = signal<TimelineVariant | null>(
    null
  );
  public readonly size: WritableSignal<TimelineSize> = signal<TimelineSize>('md');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Timeline');
  public readonly showContent: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showMarker: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showOpposite: WritableSignal<boolean> = signal<boolean>(false);
}
// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
describe('TimelineComponent', (): void => {
  let fixture: ComponentFixture<TimelineTestHostComponent>;
  let host: TimelineTestHostComponent;
  function queryAll(selector: string): HTMLElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(selector)
    );
  }
  function queryOne(selector: string): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(selector);
  }
  function getTimeline(): HTMLElement {
    return queryOne('ui-lib-timeline') as HTMLElement;
  }
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TimelineTestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(TimelineTestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });
  // -------------------------------------------------------------------------
  // 1. Rendering
  // -------------------------------------------------------------------------
  describe('Rendering', (): void => {
    it('should create the component', (): void => {
      const timeline: HTMLElement | null = queryOne('ui-lib-timeline');
      expect(timeline).not.toBeNull();
    });
    it('should render the correct number of event elements', (): void => {
      const events: HTMLElement[] = queryAll('.ui-lib-timeline__event');
      expect(events.length).toBe(SAMPLE_EVENTS.length);
    });
    it('should render zero events when value is empty', (): void => {
      host.value.set([]);
      fixture.detectChanges();
      const events: HTMLElement[] = queryAll('.ui-lib-timeline__event');
      expect(events.length).toBe(0);
    });
  });
  // -------------------------------------------------------------------------
  // 2. Layout
  // -------------------------------------------------------------------------
  describe('Layout', (): void => {
    it('should apply vertical layout class by default', (): void => {
      const timeline: HTMLElement = getTimeline();
      expect(timeline.className).toContain('ui-lib-timeline--vertical');
    });
    it('should apply horizontal layout class when layout is horizontal', (): void => {
      host.layout.set('horizontal');
      fixture.detectChanges();
      const timeline: HTMLElement = getTimeline();
      expect(timeline.className).toContain('ui-lib-timeline--horizontal');
    });
  });
  // -------------------------------------------------------------------------
  // 3. Alignment
  // -------------------------------------------------------------------------
  describe('Alignment', (): void => {
    const aligns: TimelineAlign[] = ['left', 'right', 'alternate', 'top', 'bottom'];
    for (const align of aligns) {
      it(`should apply align-${align} class`, (): void => {
        host.align.set(align);
        fixture.detectChanges();
        const timeline: HTMLElement = getTimeline();
        expect(timeline.className).toContain(`ui-lib-timeline--align-${align}`);
      });
    }
  });
  // -------------------------------------------------------------------------
  // 4. Variants
  // -------------------------------------------------------------------------
  describe('Variants', (): void => {
    const variants: TimelineVariant[] = ['material', 'bootstrap', 'minimal'];
    for (const variant of variants) {
      it(`should apply ${variant} variant class`, (): void => {
        host.variant.set(variant);
        fixture.detectChanges();
        const timeline: HTMLElement = getTimeline();
        expect(timeline.className).toContain(`ui-lib-timeline--${variant}`);
      });
    }
  });
  // -------------------------------------------------------------------------
  // 5. Sizes
  // -------------------------------------------------------------------------
  describe('Sizes', (): void => {
    const sizes: TimelineSize[] = ['sm', 'md', 'lg'];
    for (const size of sizes) {
      it(`should apply size class --${size}`, (): void => {
        host.size.set(size);
        fixture.detectChanges();
        const timeline: HTMLElement = getTimeline();
        expect(timeline.className).toContain(`ui-lib-timeline--${size}`);
      });
    }
  });
  // -------------------------------------------------------------------------
  // 6. StyleClass
  // -------------------------------------------------------------------------
  describe('styleClass', (): void => {
    it('should append extra class to host when styleClass is provided', (): void => {
      host.styleClass.set('my-custom-class');
      fixture.detectChanges();
      const timeline: HTMLElement = getTimeline();
      expect(timeline.className).toContain('my-custom-class');
    });
  });
  // -------------------------------------------------------------------------
  // 7. Default dot marker
  // -------------------------------------------------------------------------
  describe('Default marker', (): void => {
    it('should render default dot when no markerTemplate is provided', (): void => {
      const dots: HTMLElement[] = queryAll('.ui-lib-timeline__dot');
      expect(dots.length).toBe(SAMPLE_EVENTS.length);
    });
    it('should render custom marker when markerTemplate is provided', (): void => {
      host.showMarker.set(true);
      fixture.detectChanges();
      const customMarkers: HTMLElement[] = queryAll('.custom-marker');
      expect(customMarkers.length).toBe(SAMPLE_EVENTS.length);
      // Default dots should not render
      const dots: HTMLElement[] = queryAll('.ui-lib-timeline__dot');
      expect(dots.length).toBe(0);
    });
  });
  // -------------------------------------------------------------------------
  // 8. Content template
  // -------------------------------------------------------------------------
  describe('Content template', (): void => {
    it('should render content template when provided', (): void => {
      host.showContent.set(true);
      fixture.detectChanges();
      const contentTexts: HTMLElement[] = queryAll('.content-text');
      expect(contentTexts.length).toBe(SAMPLE_EVENTS.length);
      expect(contentTexts[0].textContent!.trim()).toBe(SAMPLE_EVENTS[0].title);
    });
  });
  // -------------------------------------------------------------------------
  // 9. Opposite template
  // -------------------------------------------------------------------------
  describe('Opposite template', (): void => {
    it('should render opposite template when provided', (): void => {
      host.showOpposite.set(true);
      fixture.detectChanges();
      const oppositeTexts: HTMLElement[] = queryAll('.opposite-text');
      expect(oppositeTexts.length).toBe(SAMPLE_EVENTS.length);
      expect(oppositeTexts[0].textContent!.trim()).toBe(SAMPLE_EVENTS[0].date);
    });
  });
  // -------------------------------------------------------------------------
  // 10. Item context
  // -------------------------------------------------------------------------
  describe('Item context', (): void => {
    it('should pass $implicit as the event item to content template', (): void => {
      host.showContent.set(true);
      fixture.detectChanges();
      const contentTexts: HTMLElement[] = queryAll('.content-text');
      SAMPLE_EVENTS.forEach((event: TimelineEvent, index: number): void => {
        expect(contentTexts[index].textContent!.trim()).toBe(event.title);
      });
    });
  });
  // -------------------------------------------------------------------------
  // 11. Connectors
  // -------------------------------------------------------------------------
  describe('Connectors', (): void => {
    it('should not render a before-connector on the first event', (): void => {
      const firstEvent: HTMLElement | null = queryOne('.ui-lib-timeline__event');
      expect(firstEvent).not.toBeNull();
      const beforeConnector: HTMLElement | null = firstEvent!.querySelector(
        '.ui-lib-timeline__connector--before'
      );
      expect(beforeConnector).toBeNull();
    });
    it('should not render an after-connector on the last event', (): void => {
      const allEvents: HTMLElement[] = queryAll('.ui-lib-timeline__event');
      const lastEvent: HTMLElement = allEvents[allEvents.length - 1];
      const afterConnector: HTMLElement | null = lastEvent.querySelector(
        '.ui-lib-timeline__connector--after'
      );
      expect(afterConnector).toBeNull();
    });
    it('should render connectors on middle events', (): void => {
      const allEvents: HTMLElement[] = queryAll('.ui-lib-timeline__event');
      const middleEvent: HTMLElement = allEvents[1];
      const beforeConnector: HTMLElement | null = middleEvent.querySelector(
        '.ui-lib-timeline__connector--before'
      );
      const afterConnector: HTMLElement | null = middleEvent.querySelector(
        '.ui-lib-timeline__connector--after'
      );
      expect(beforeConnector).not.toBeNull();
      expect(afterConnector).not.toBeNull();
    });
  });
  // -------------------------------------------------------------------------
  // 12. Accessibility
  // -------------------------------------------------------------------------
  describe('Accessibility', (): void => {
    it('should have role="list" on the host element', (): void => {
      const timeline: HTMLElement = getTimeline();
      expect(timeline.getAttribute('role')).toBe('list');
    });
    it('should have role="listitem" on each event', (): void => {
      const events: HTMLElement[] = queryAll('.ui-lib-timeline__event');
      for (const event of events) {
        expect(event.getAttribute('role')).toBe('listitem');
      }
    });
    it('should set aria-label on the host element', (): void => {
      host.ariaLabel.set('Project milestones');
      fixture.detectChanges();
      const timeline: HTMLElement = getTimeline();
      expect(timeline.getAttribute('aria-label')).toBe('Project milestones');
    });
    it('should set aria-label on each event item', (): void => {
      const events: HTMLElement[] = queryAll('.ui-lib-timeline__event');
      events.forEach((event: HTMLElement, index: number): void => {
        expect(event.getAttribute('aria-label')).toBe(`Event ${index + 1}`);
      });
    });
  });
  // -------------------------------------------------------------------------
  // 13. TIMELINE_DEFAULTS
  // -------------------------------------------------------------------------
  describe('TIMELINE_DEFAULTS', (): void => {
    it('should export TIMELINE_DEFAULTS with correct default values', (): void => {
      expect(TIMELINE_DEFAULTS.layout).toBe('vertical');
      expect(TIMELINE_DEFAULTS.align).toBe('left');
      expect(TIMELINE_DEFAULTS.size).toBe('md');
      expect(TIMELINE_DEFAULTS.ariaLabel).toBe('Timeline');
    });
  });
  // -------------------------------------------------------------------------
  // 14. Dynamic value updates
  // -------------------------------------------------------------------------
  describe('Dynamic value updates', (): void => {
    it('should update rendered events when value signal changes', (): void => {
      const newEvents: TimelineEvent[] = [
        { id: 10, title: 'New Event', date: '2025-01-01' },
        { id: 11, title: 'Another Event', date: '2025-02-01' },
      ];
      host.value.set(newEvents);
      fixture.detectChanges();
      const events: HTMLElement[] = queryAll('.ui-lib-timeline__event');
      expect(events.length).toBe(2);
    });
  });
});
