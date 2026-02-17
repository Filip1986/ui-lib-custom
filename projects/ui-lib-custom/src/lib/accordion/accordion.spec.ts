import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Accordion } from './accordion';
import { AccordionPanel } from './accordion-panel';
import {
  AccordionChangeEvent,
  AccordionExpandMode,
  AccordionSize,
  AccordionVariant,
} from './accordion.types';

interface AccordionConfig {
  variant: AccordionVariant;
  size: AccordionSize;
  expandMode: AccordionExpandMode;
  expandedPanels: string[];
  defaultExpandedPanels: string[];
  disabledSecond: boolean;
  disabledThird: boolean;
}

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  template: `
    <ui-lib-accordion
      [variant]="variant()"
      [size]="size()"
      [expandMode]="expandMode()"
      [expandedPanels]="expandedPanels()"
      [defaultExpandedPanels]="defaultExpandedPanels()"
      (expandedChange)="onExpanded($event)"
      (panelToggle)="onToggle($event)"
    >
      <ui-lib-accordion-panel header="Panel 1" value="panel-1">
        <div class="panel-content-1">Content One</div>
      </ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Panel 2" value="panel-2" [disabled]="disabledSecond()">
        <div accordionHeader class="custom-header">Custom Header</div>
        <div class="panel-content-2">Content Two</div>
      </ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Panel 3" value="panel-3" [disabled]="disabledThird()">
        <div class="panel-content-3">Content Three</div>
      </ui-lib-accordion-panel>
    </ui-lib-accordion>
  `,
})
class TestHostComponent {
  variant = signal<AccordionVariant>('material');
  size = signal<AccordionSize>('md');
  expandMode = signal<AccordionExpandMode>('single');
  expandedPanels = signal<string[]>([]);
  defaultExpandedPanels = signal<string[]>([]);
  disabledSecond = signal<boolean>(false);
  disabledThird = signal<boolean>(false);
  expandedEvents: AccordionChangeEvent[] = [];
  toggleEvents: AccordionChangeEvent[] = [];

  onExpanded(event: AccordionChangeEvent): void {
    this.expandedEvents.push(event);
  }

  onToggle(event: AccordionChangeEvent): void {
    this.toggleEvents.push(event);
  }
}

describe('Accordion', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function createTestAccordion(
    config: Partial<AccordionConfig> = {}
  ): ComponentFixture<TestHostComponent> {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const host: TestHostComponent = fixture.componentInstance;

    if (config.variant) {
      host.variant.set(config.variant);
    }
    if (config.size) {
      host.size.set(config.size);
    }
    if (config.expandMode) {
      host.expandMode.set(config.expandMode);
    }
    if (config.expandedPanels) {
      host.expandedPanels.set(config.expandedPanels);
    }
    if (config.defaultExpandedPanels) {
      host.defaultExpandedPanels.set(config.defaultExpandedPanels);
    }
    if (config.disabledSecond !== undefined) {
      host.disabledSecond.set(config.disabledSecond);
    }
    if (config.disabledThird !== undefined) {
      host.disabledThird.set(config.disabledThird);
    }

    fixture.detectChanges();
    return fixture;
  }

  function getPanelHeaders(fixture: ComponentFixture<TestHostComponent>): HTMLElement[] {
    const headers: NodeListOf<Element> =
      fixture.nativeElement.querySelectorAll('.accordion-panel-header');
    return Array.from(headers) as HTMLElement[];
  }

  function getPanelContents(fixture: ComponentFixture<TestHostComponent>): HTMLElement[] {
    const contents: NodeListOf<Element> = fixture.nativeElement.querySelectorAll(
      '.accordion-panel-content'
    );
    return Array.from(contents) as HTMLElement[];
  }

  function togglePanel(fixture: ComponentFixture<TestHostComponent>, index: number): void {
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    headers[index].click();
    fixture.detectChanges();
  }

  async function stabilizeAccordion(fixture: ComponentFixture<TestHostComponent>): Promise<void> {
    fixture.detectChanges();
    await new Promise<void>((resolve: () => void): void => {
      setTimeout((): void => resolve(), 0);
    });
    fixture.detectChanges();
  }

  it('creates accordion and panels with projected content', async () => {
    const fixture = createTestAccordion({ expandedPanels: ['panel-1'] });
    await stabilizeAccordion(fixture);
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const contentOne: HTMLElement | null = fixture.nativeElement.querySelector('.panel-content-1');

    expect(fixture.componentInstance).toBeTruthy();
    expect(headers.length).toBe(3);
    expect(contentOne?.textContent?.trim()).toBe('Content One');
    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
  });

  it('applies variant and size classes and updates on change', () => {
    const fixture = createTestAccordion();
    const accordionEl: HTMLElement = fixture.nativeElement.querySelector('ui-lib-accordion');

    expect(accordionEl.className).toContain('accordion-variant-material');
    expect(accordionEl.className).toContain('accordion-size-md');

    fixture.componentInstance.variant.set('bootstrap');
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();

    expect(accordionEl.className).toContain('accordion-variant-bootstrap');
    expect(accordionEl.className).toContain('accordion-size-lg');
  });

  it('opens only one panel in single mode', () => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    togglePanel(fixture, 0);
    expect(headers[0].getAttribute('aria-expanded')).toBe('true');

    togglePanel(fixture, 1);
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('allows multiple panels in multiple mode', () => {
    const fixture = createTestAccordion({ expandMode: 'multiple' });
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    togglePanel(fixture, 0);
    togglePanel(fixture, 1);

    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('initializes expansion from expandedPanels when controlled', async () => {
    const fixture = createTestAccordion({ expandedPanels: ['panel-2'] });
    await stabilizeAccordion(fixture);
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
  });

  it('reflects controlled expandedPanels input', () => {
    const fixture = createTestAccordion({ expandMode: 'multiple', expandedPanels: ['panel-3'] });
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    expect(headers[2].getAttribute('aria-expanded')).toBe('true');

    fixture.componentInstance.expandedPanels.set(['panel-1', 'panel-2']);
    fixture.detectChanges();

    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
    expect(headers[2].getAttribute('aria-expanded')).toBe('false');
  });

  it('emits panelToggle and expandedChange events on toggle', () => {
    const fixture = createTestAccordion();

    togglePanel(fixture, 0);

    const host: TestHostComponent = fixture.componentInstance;
    expect(host.toggleEvents.length).toBe(1);
    expect(host.expandedEvents.length).toBe(1);
    expect(host.toggleEvents[0]).toEqual({ panelId: 'panel-1', expanded: true, index: 0 });
  });

  it('prevents toggling when panel is disabled', () => {
    const fixture = createTestAccordion({ disabledSecond: true });
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    togglePanel(fixture, 1);

    expect(headers[1].getAttribute('aria-expanded')).toBe('false');
    expect(headers[1].getAttribute('aria-disabled')).toBe('true');
  });

  it('skips disabled panels during keyboard navigation', () => {
    const fixture = createTestAccordion({ disabledSecond: true });
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    headers[0].focus();
    headers[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(headers[2]);
  });

  it('supports Arrow, Home, End navigation between headers', () => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    headers[0].focus();
    headers[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(headers[1]);

    headers[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(headers[2]);

    headers[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(document.activeElement).toBe(headers[0]);
  });

  it('toggles with Enter and Space keys', () => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);

    headers[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(headers[0].getAttribute('aria-expanded')).toBe('true');

    headers[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
  });

  it('exposes proper ARIA relationships', () => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const contents: HTMLElement[] = getPanelContents(fixture);

    headers.forEach((header: HTMLElement, index: number) => {
      const controls: string | null = header.getAttribute('aria-controls');
      const labelledBy: string | null = contents[index].getAttribute('aria-labelledby');
      expect(header.getAttribute('role')).toBe('button');
      expect(controls).toBeTruthy();
      expect(labelledBy).toBe(header.getAttribute('id'));
      expect(contents[index].getAttribute('role')).toBe('region');
    });
  });

  it('maintains unique header/content ids and linkage', () => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const contents: HTMLElement[] = getPanelContents(fixture);
    const headerIds: Set<string> = new Set<string>();
    const contentIds: Set<string> = new Set<string>();

    headers.forEach((header: HTMLElement, index: number) => {
      const headerId: string | null = header.getAttribute('id');
      const contentId: string | null = contents[index].getAttribute('id');
      expect(headerId).toBeTruthy();
      expect(contentId).toBeTruthy();
      headerIds.add(headerId as string);
      contentIds.add(contentId as string);
      expect(contents[index].getAttribute('aria-labelledby')).toBe(headerId);
      expect(header.getAttribute('aria-controls')).toBe(contentId);
    });

    expect(headerIds.size).toBe(headers.length);
    expect(contentIds.size).toBe(contents.length);
  });

  it('applies expanded state classes and data attributes', () => {
    const fixture = createTestAccordion();
    const contents: HTMLElement[] = getPanelContents(fixture);
    const panelNodes: NodeListOf<Element> =
      fixture.nativeElement.querySelectorAll('ui-lib-accordion-panel');
    const panelHosts: HTMLElement[] = Array.from(panelNodes) as HTMLElement[];

    expect(panelHosts[0].getAttribute('data-state')).toBe('collapsed');
    expect(contents[0].getAttribute('data-state')).toBe('collapsed');

    togglePanel(fixture, 0);

    expect(panelHosts[0].className).toContain('accordion-panel-expanded');
    expect(panelHosts[0].getAttribute('data-state')).toBe('expanded');
    expect(contents[0].getAttribute('data-state')).toBe('expanded');
    expect(contents[0].hasAttribute('hidden')).toBeFalse();
  });
});
