import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { TimelineComponent } from './timeline.component';
import type { TimelineAlign, TimelineLayout } from './timeline.types';
import {
  TimelineContentDirective,
  TimelineMarkerDirective,
  TimelineOppositeDirective,
} from './timeline-template-directives';

interface TimelineEvent {
  readonly id: number;
  readonly title: string;
  readonly date: string;
  readonly description: string;
}

const SAMPLE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    title: 'Kickoff',
    date: '2026-01-15',
    description: 'Project starts',
  },
  {
    id: 2,
    title: 'Build',
    date: '2026-02-10',
    description: 'Implementation milestone',
  },
];

@Component({
  standalone: true,
  imports: [TimelineComponent],
  template: `
    <ui-lib-timeline
      [value]="events()"
      [ariaLabel]="ariaLabel()"
      [layout]="layout()"
      [align]="align()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicTimelineA11yHostComponent {
  public readonly events: WritableSignal<TimelineEvent[]> = signal<TimelineEvent[]>(SAMPLE_EVENTS);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Release timeline');
  public readonly layout: WritableSignal<TimelineLayout> = signal<TimelineLayout>('vertical');
  public readonly align: WritableSignal<TimelineAlign> = signal<TimelineAlign>('left');
}

@Component({
  standalone: true,
  imports: [
    TimelineComponent,
    TimelineContentDirective,
    TimelineMarkerDirective,
    TimelineOppositeDirective,
  ],
  template: `
    <ui-lib-timeline [value]="events()" [layout]="layout()" [align]="align()">
      <ng-template uiTimelineMarker let-event>
        <span class="custom-marker">{{ event.title.charAt(0) }}</span>
      </ng-template>
      <ng-template uiTimelineOpposite let-event>
        <span class="event-date">{{ event.date }}</span>
      </ng-template>
      <ng-template uiTimelineContent let-event>
        <button type="button" class="event-action">{{ event.title }}</button>
      </ng-template>
    </ui-lib-timeline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplatedTimelineA11yHostComponent {
  public readonly events: WritableSignal<TimelineEvent[]> = signal<TimelineEvent[]>(SAMPLE_EVENTS);
  public readonly layout: WritableSignal<TimelineLayout> = signal<TimelineLayout>('horizontal');
  public readonly align: WritableSignal<TimelineAlign> = signal<TimelineAlign>('top');
}

@Component({
  standalone: true,
  imports: [TimelineComponent],
  template: `
    <ui-lib-timeline [value]="events" />
    <ui-lib-timeline [value]="events" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DualTimelineA11yHostComponent {
  public readonly events: TimelineEvent[] = SAMPLE_EVENTS;
}

const createdFixtures: ComponentFixture<unknown>[] = [];

async function createFixture<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function getTimeline(fixture: ComponentFixture<unknown>): HTMLElement {
  return getHostElement(fixture).querySelector('ui-lib-timeline') as HTMLElement;
}

describe('Timeline Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
    TestBed.resetTestingModule();
  });

  it('should expose role="list" and the configured aria-label on the host', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );
    const timeline: HTMLElement = getTimeline(fixture);

    expect(timeline.getAttribute('role')).toBe('list');
    expect(timeline.getAttribute('aria-label')).toBe('Release timeline');
  });

  it('should generate a unique host id for the timeline instance', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );
    const timeline: HTMLElement = getTimeline(fixture);

    expect(timeline.getAttribute('id')).toMatch(/^ui-lib-timeline-\d+$/);
  });

  it('should expose role="listitem" on every rendered event', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );
    const events: NodeListOf<HTMLElement> =
      getHostElement(fixture).querySelectorAll('.ui-lib-timeline__event');

    events.forEach((event: HTMLElement): void => {
      expect(event.getAttribute('role')).toBe('listitem');
    });
  });

  it('should label default events from their generated content containers', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );
    const timeline: HTMLElement = getTimeline(fixture);
    const firstEvent: HTMLElement | null =
      getHostElement(fixture).querySelector('.ui-lib-timeline__event');
    const firstContent: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-timeline__default-content',
    );

    expect(firstEvent?.getAttribute('aria-labelledby')).toBe(`${timeline.id}-content-0`);
    expect((firstContent?.textContent ?? '').trim()).toBe('Kickoff — 2026-01-15');
  });

  it('should include opposite content in aria-labelledby when an opposite template is present', async (): Promise<void> => {
    const fixture: ComponentFixture<TemplatedTimelineA11yHostComponent> = await createFixture(
      TemplatedTimelineA11yHostComponent,
    );
    const timeline: HTMLElement = getTimeline(fixture);
    const firstEvent: HTMLElement | null =
      getHostElement(fixture).querySelector('.ui-lib-timeline__event');

    expect(firstEvent?.getAttribute('aria-labelledby')).toBe(
      `${timeline.id}-content-0 ${timeline.id}-opposite-0`,
    );
  });

  it('should apply ids to opposite-side content when an opposite template is present', async (): Promise<void> => {
    const fixture: ComponentFixture<TemplatedTimelineA11yHostComponent> = await createFixture(
      TemplatedTimelineA11yHostComponent,
    );
    const timeline: HTMLElement = getTimeline(fixture);
    const opposite: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-timeline__opposite',
    );

    expect(opposite?.getAttribute('id')).toBe(`${timeline.id}-opposite-0`);
  });

  it('should keep decorative connectors hidden from assistive technologies', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );
    const connectors: NodeListOf<HTMLElement> = getHostElement(fixture).querySelectorAll(
      '.ui-lib-timeline__connector',
    );

    connectors.forEach((connector: HTMLElement): void => {
      expect(connector.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should keep the default marker and marker wrapper hidden from assistive technologies', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );
    const marker: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-timeline__marker',
    );
    const dot: HTMLElement | null = getHostElement(fixture).querySelector('.ui-lib-timeline__dot');

    expect(marker?.getAttribute('aria-hidden')).toBe('true');
    expect(dot?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should keep custom marker content inside the decorative marker wrapper', async (): Promise<void> => {
    const fixture: ComponentFixture<TemplatedTimelineA11yHostComponent> = await createFixture(
      TemplatedTimelineA11yHostComponent,
    );
    const marker: HTMLElement | null = getHostElement(fixture).querySelector(
      '.ui-lib-timeline__marker',
    );
    const customMarker: HTMLElement | null =
      getHostElement(fixture).querySelector('.custom-marker');

    expect(marker?.getAttribute('aria-hidden')).toBe('true');
    expect((customMarker?.textContent ?? '').trim()).toBe('K');
  });

  it('should keep the host and event rows out of the tab order by default', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );
    const timeline: HTMLElement = getTimeline(fixture);
    const events: NodeListOf<HTMLElement> =
      getHostElement(fixture).querySelectorAll('.ui-lib-timeline__event');

    expect(timeline.getAttribute('tabindex')).toBeNull();
    events.forEach((event: HTMLElement): void => {
      expect(event.getAttribute('tabindex')).toBeNull();
    });
  });

  it('should preserve native keyboard access for projected interactive content', async (): Promise<void> => {
    const fixture: ComponentFixture<TemplatedTimelineA11yHostComponent> = await createFixture(
      TemplatedTimelineA11yHostComponent,
    );
    const button: HTMLButtonElement | null = getHostElement(fixture).querySelector('.event-action');

    expect(button?.disabled).toBe(false);
    expect(button?.tabIndex).toBe(0);
  });

  it('should generate unique ids for multiple timeline instances on the same page', async (): Promise<void> => {
    const fixture: ComponentFixture<DualTimelineA11yHostComponent> = await createFixture(
      DualTimelineA11yHostComponent,
    );
    const timelines: NodeListOf<HTMLElement> =
      getHostElement(fixture).querySelectorAll('ui-lib-timeline');

    expect(timelines).toHaveLength(2);
    expect(timelines[0]?.id).toBeTruthy();
    expect(timelines[1]?.id).toBeTruthy();
    expect(timelines[0]?.id).not.toBe(timelines[1]?.id);
  });

  it('should pass axe in the default state', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe with templated horizontal content', async (): Promise<void> => {
    const fixture: ComponentFixture<TemplatedTimelineA11yHostComponent> = await createFixture(
      TemplatedTimelineA11yHostComponent,
    );

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe after reactive layout changes', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTimelineA11yHostComponent> = await createFixture(
      BasicTimelineA11yHostComponent,
    );

    fixture.componentInstance.layout.set('horizontal');
    fixture.componentInstance.align.set('top');
    fixture.detectChanges();
    await fixture.whenStable();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
