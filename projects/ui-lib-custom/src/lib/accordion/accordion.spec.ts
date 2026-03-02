import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly variant = signal<AccordionVariant>('material');
  public readonly size = signal<AccordionSize>('md');
  public readonly expandMode = signal<AccordionExpandMode>('single');
  public readonly expandedPanels = signal<string[]>([]);
  public readonly defaultExpandedPanels = signal<string[]>([]);
  public readonly disabledSecond = signal<boolean>(false);
  public readonly disabledThird = signal<boolean>(false);
  public readonly expandedEvents: AccordionChangeEvent[] = [];
  public readonly toggleEvents: AccordionChangeEvent[] = [];

  public onExpanded(event: AccordionChangeEvent): void {
    this.expandedEvents.push(event);
  }

  public onToggle(event: AccordionChangeEvent): void {
    this.toggleEvents.push(event);
  }
}

describe('Accordion', (): void => {
  beforeEach(async (): Promise<void> => {
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
    const headers: NodeListOf<Element> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.accordion-panel-header'
    );
    return Array.from(headers) as HTMLElement[];
  }

  function getPanelContents(fixture: ComponentFixture<TestHostComponent>): HTMLElement[] {
    const contents: NodeListOf<Element> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.accordion-panel-content'
    );
    return Array.from(contents) as HTMLElement[];
  }

  function getRequiredElement<T extends Element>(elements: T[], index: number, label: string): T {
    const element = elements[index];
    if (!element) {
      throw new Error(`Expected ${label} at index ${index}.`);
    }
    return element;
  }

  function togglePanel(fixture: ComponentFixture<TestHostComponent>, index: number): void {
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header = getRequiredElement(headers, index, 'accordion header');
    header.click();
    fixture.detectChanges();
  }

  async function stabilizeAccordion(fixture: ComponentFixture<TestHostComponent>): Promise<void> {
    fixture.detectChanges();
    await new Promise<void>((resolve: () => void): void => {
      setTimeout((): void => resolve(), 0);
    });
    fixture.detectChanges();
  }

  it('creates accordion and panels with projected content', async (): Promise<void> => {
    const fixture = createTestAccordion({ expandedPanels: ['panel-1'] });
    await stabilizeAccordion(fixture);
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const contentOne: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.panel-content-1'
    );

    expect(fixture.componentInstance).toBeTruthy();
    expect(headers.length).toBe(3);
    expect(contentOne).toBeTruthy();
    const contentText = (contentOne as HTMLElement).textContent;
    expect(contentText).toBeTruthy();
    expect((contentText as string).trim()).toBe('Content One');
    const header0 = getRequiredElement(headers, 0, 'accordion header');
    expect(header0.getAttribute('aria-expanded')).toBe('true');
  });

  it('applies variant and size classes and updates on change', (): void => {
    const fixture = createTestAccordion();
    const accordionEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-accordion'
    ) as HTMLElement;

    expect(accordionEl.className).toContain('accordion-variant-material');
    expect(accordionEl.className).toContain('accordion-size-md');

    fixture.componentInstance.variant.set('bootstrap');
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();

    expect(accordionEl.className).toContain('accordion-variant-bootstrap');
    expect(accordionEl.className).toContain('accordion-size-lg');
  });

  it('opens only one panel in single mode', (): void => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header0 = getRequiredElement(headers, 0, 'accordion header');
    const header1 = getRequiredElement(headers, 1, 'accordion header');

    togglePanel(fixture, 0);
    expect(header0.getAttribute('aria-expanded')).toBe('true');

    togglePanel(fixture, 1);
    expect(header0.getAttribute('aria-expanded')).toBe('false');
    expect(header1.getAttribute('aria-expanded')).toBe('true');
  });

  it('allows multiple panels in multiple mode', (): void => {
    const fixture = createTestAccordion({ expandMode: 'multiple' });
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header0 = getRequiredElement(headers, 0, 'accordion header');
    const header1 = getRequiredElement(headers, 1, 'accordion header');

    togglePanel(fixture, 0);
    togglePanel(fixture, 1);

    expect(header0.getAttribute('aria-expanded')).toBe('true');
    expect(header1.getAttribute('aria-expanded')).toBe('true');
  });

  it('initializes expansion from expandedPanels when controlled', async (): Promise<void> => {
    const fixture = createTestAccordion({ expandedPanels: ['panel-2'] });
    await stabilizeAccordion(fixture);
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header0 = getRequiredElement(headers, 0, 'accordion header');
    const header1 = getRequiredElement(headers, 1, 'accordion header');

    expect(header1.getAttribute('aria-expanded')).toBe('true');
    expect(header0.getAttribute('aria-expanded')).toBe('false');
  });

  it('reflects controlled expandedPanels input', (): void => {
    const fixture = createTestAccordion({ expandMode: 'multiple', expandedPanels: ['panel-3'] });
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header0 = getRequiredElement(headers, 0, 'accordion header');
    const header1 = getRequiredElement(headers, 1, 'accordion header');
    const header2 = getRequiredElement(headers, 2, 'accordion header');

    expect(header2.getAttribute('aria-expanded')).toBe('true');

    fixture.componentInstance.expandedPanels.set(['panel-1', 'panel-2']);
    fixture.detectChanges();

    expect(header0.getAttribute('aria-expanded')).toBe('true');
    expect(header1.getAttribute('aria-expanded')).toBe('true');
    expect(header2.getAttribute('aria-expanded')).toBe('false');
  });

  it('emits panelToggle and expandedChange events on toggle', (): void => {
    const fixture = createTestAccordion();

    togglePanel(fixture, 0);

    const host: TestHostComponent = fixture.componentInstance;
    expect(host.toggleEvents.length).toBe(1);
    expect(host.expandedEvents.length).toBe(1);
    expect(host.toggleEvents[0]).toEqual({ panelId: 'panel-1', expanded: true, index: 0 });
  });

  it('prevents toggling when panel is disabled', (): void => {
    const fixture = createTestAccordion({ disabledSecond: true });
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header1 = getRequiredElement(headers, 1, 'accordion header');

    togglePanel(fixture, 1);

    expect(header1.getAttribute('aria-expanded')).toBe('false');
    expect(header1.getAttribute('aria-disabled')).toBe('true');
  });

  it('skips disabled panels during keyboard navigation', (): void => {
    const fixture = createTestAccordion({ disabledSecond: true });
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header0 = getRequiredElement(headers, 0, 'accordion header');
    const header2 = getRequiredElement(headers, 2, 'accordion header');

    header0.focus();
    header0.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(header2);
  });

  it('supports Arrow, Home, End navigation between headers', (): void => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header0 = getRequiredElement(headers, 0, 'accordion header');
    const header1 = getRequiredElement(headers, 1, 'accordion header');
    const header2 = getRequiredElement(headers, 2, 'accordion header');

    header0.focus();
    header0.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(header1);

    header1.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(header2);

    header2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(document.activeElement).toBe(header0);
  });

  it('toggles with Enter and Space keys', (): void => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const header0 = getRequiredElement(headers, 0, 'accordion header');

    header0.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(header0.getAttribute('aria-expanded')).toBe('true');

    header0.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(header0.getAttribute('aria-expanded')).toBe('false');
  });

  it('exposes proper ARIA relationships', (): void => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const contents: HTMLElement[] = getPanelContents(fixture);

    headers.forEach((header: HTMLElement, index: number): void => {
      const content = getRequiredElement(contents, index, 'accordion content');
      const controls: string | null = header.getAttribute('aria-controls');
      const labelledBy: string | null = content.getAttribute('aria-labelledby');
      expect(header.getAttribute('role')).toBe('button');
      expect(controls).toBeTruthy();
      expect(labelledBy).toBe(header.getAttribute('id'));
      expect(content.getAttribute('role')).toBe('region');
    });
  });

  it('maintains unique header/content ids and linkage', (): void => {
    const fixture = createTestAccordion();
    const headers: HTMLElement[] = getPanelHeaders(fixture);
    const contents: HTMLElement[] = getPanelContents(fixture);
    const headerIds: Set<string> = new Set<string>();
    const contentIds: Set<string> = new Set<string>();

    headers.forEach((header: HTMLElement, index: number): void => {
      const content = getRequiredElement(contents, index, 'accordion content');
      const headerId: string | null = header.getAttribute('id');
      const contentId: string | null = content.getAttribute('id');
      expect(headerId).toBeTruthy();
      expect(contentId).toBeTruthy();
      headerIds.add(headerId as string);
      contentIds.add(contentId as string);
      expect(content.getAttribute('aria-labelledby')).toBe(headerId);
      expect(header.getAttribute('aria-controls')).toBe(contentId);
    });

    expect(headerIds.size).toBe(headers.length);
    expect(contentIds.size).toBe(contents.length);
  });

  it('applies expanded state classes and data attributes', (): void => {
    const fixture = createTestAccordion();
    const contents: HTMLElement[] = getPanelContents(fixture);
    const panelNodes: NodeListOf<Element> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'ui-lib-accordion-panel'
    );
    const panelHosts: HTMLElement[] = Array.from(panelNodes) as HTMLElement[];
    const panelHost0 = getRequiredElement(panelHosts, 0, 'accordion panel');
    const content0 = getRequiredElement(contents, 0, 'accordion content');

    expect(panelHost0.getAttribute('data-state')).toBe('collapsed');
    expect(content0.getAttribute('data-state')).toBe('collapsed');

    togglePanel(fixture, 0);

    expect(panelHost0.className).toContain('accordion-panel-expanded');
    expect(panelHost0.getAttribute('data-state')).toBe('expanded');
    expect(content0.getAttribute('data-state')).toBe('expanded');
    expect(content0.hasAttribute('hidden')).toBeFalsy();
  });

  it('applies dark theme variables', (): void => {
    const fixture = createTestAccordion();
    const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-accordion'
    ) as HTMLElement;
    const root: HTMLElement = document.documentElement;

    root.setAttribute('data-theme', 'light');
    host.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(host)
      .getPropertyValue('--uilib-accordion-panel-bg')
      .trim();

    host.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(host)
      .getPropertyValue('--uilib-accordion-panel-bg')
      .trim();

    expect(dark).not.toBe(light);
    host.removeAttribute('data-theme');
    root.removeAttribute('data-theme');
  });
});
