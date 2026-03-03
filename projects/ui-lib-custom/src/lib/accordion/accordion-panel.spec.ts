import { CommonModule } from '@angular/common';
import { Component, signal, type DebugElement, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection, ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Icon } from '../icon/icon';
import { AccordionPanel, AccordionHeader, AccordionToggleIcon } from 'ui-lib-custom';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, AccordionPanel, AccordionHeader],
  template: `
    <ui-lib-accordion-panel
      [header]="header()"
      [value]="value()"
      [disabled]="disabled()"
      [expanded]="expanded()"
      [iconPosition]="iconPosition()"
      [expandIcon]="expandIcon()"
      [collapseIcon]="collapseIcon()"
      [showIcon]="showIcon()"
    >
      @if (useCustomHeader()) {
        <div accordionHeader class="custom-header">Custom Header</div>
      }
      <div class="panel-body">Panel Body</div>
    </ui-lib-accordion-panel>
  `,
})
class PanelHostComponent {
  public readonly header: WritableSignal<string> = signal<string>('Panel Title');
  public readonly value: WritableSignal<string | null> = signal<string | null>('panel-a');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly expanded: WritableSignal<boolean> = signal<boolean>(false);
  public readonly useCustomHeader: WritableSignal<boolean> = signal<boolean>(false);
  public readonly iconPosition: WritableSignal<'start' | 'end'> = signal<'start' | 'end'>('end');
  public readonly expandIcon: WritableSignal<string> = signal<string>('chevron-up');
  public readonly collapseIcon: WritableSignal<string> = signal<string>('chevron-down');
  public readonly showIcon: WritableSignal<boolean> = signal<boolean>(true);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, AccordionPanel, AccordionToggleIcon],
  template: `
    <ui-lib-accordion-panel [expanded]="expanded()" [showIcon]="showIcon()" header="Template Panel">
      <ng-template accordionToggleIcon let-expanded="expanded">
        <span class="toggle-text">{{ expanded ? 'Expanded' : 'Collapsed' }}</span>
      </ng-template>
      <div class="panel-body">Panel Body</div>
    </ui-lib-accordion-panel>
  `,
})
class PanelTemplateHostComponent {
  public readonly expanded: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showIcon: WritableSignal<boolean> = signal<boolean>(true);
}

describe('AccordionPanel', (): void => {
  let fixture: ComponentFixture<PanelHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PanelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelHostComponent);
    fixture.detectChanges();
  });

  function headerButton(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      '.accordion-panel-header'
    ) as HTMLElement;
  }

  function contentEl(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      '.accordion-panel-content'
    ) as HTMLElement;
  }

  function panelHost(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-accordion-panel'
    ) as HTMLElement;
  }

  function iconContainer(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector('.accordion-panel-icon');
  }

  function iconNames(): string[] {
    const icons: DebugElement[] = fixture.debugElement.queryAll(By.directive(Icon));
    return icons
      .map(
        (iconEl: DebugElement): unknown =>
          (iconEl as { componentInstance: unknown }).componentInstance
      )
      .filter((instance: unknown): instance is Icon => {
        if (!instance || typeof instance !== 'object') {
          return false;
        }
        const candidate: { name?: unknown } = instance as { name?: unknown };
        return typeof candidate.name === 'function';
      })
      .map((instance: Icon): string => instance.name());
  }

  it('creates panel and renders projected content', (): void => {
    const body: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.panel-body'
    );
    expect(fixture.componentInstance).toBeTruthy();
    expect(body).toBeTruthy();
    const bodyText: string | null = (body as HTMLElement).textContent;
    expect(bodyText).toBeTruthy();
    expect((bodyText as string).trim()).toBe('Panel Body');
  });

  it('renders default header text when no custom header', (): void => {
    const title: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.accordion-panel-title'
    );
    expect(title).toBeTruthy();
    const titleText: string | null = (title as HTMLElement).textContent;
    expect(titleText).toBeTruthy();
    expect((titleText as string).trim()).toBe('Panel Title');
  });

  it('uses custom header content when provided', (): void => {
    fixture.componentInstance.useCustomHeader.set(true);
    fixture.detectChanges();

    const title: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.accordion-panel-title'
    );
    const custom: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.custom-header'
    );
    expect(title).toBeNull();
    expect(custom).toBeTruthy();
    const customText: string | null = (custom as HTMLElement).textContent;
    expect(customText).toBeTruthy();
    expect((customText as string).trim()).toBe('Custom Header');
  });

  it('applies aria attributes and roles', (): void => {
    const header: HTMLElement = headerButton();
    const content: HTMLElement = contentEl();

    expect(header.getAttribute('role')).toBe('button');
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(content.getAttribute('role')).toBe('region');
    expect(content.getAttribute('aria-labelledby')).toBe(header.getAttribute('id'));
    expect(header.getAttribute('aria-controls')).toBe(content.getAttribute('id'));
  });

  it('respects initial expanded input when uncontrolled', (): void => {
    fixture.componentInstance.expanded.set(true);
    fixture.detectChanges();

    expect(panelHost().getAttribute('data-state')).toBe('expanded');
    expect(contentEl().hasAttribute('hidden')).toBeFalsy();
    expect(headerButton().getAttribute('aria-expanded')).toBe('true');
  });

  it('toggles expansion on click', (): void => {
    const header: HTMLElement = headerButton();

    header.click();
    fixture.detectChanges();
    expect(header.getAttribute('aria-expanded')).toBe('true');
    expect(panelHost().className).toContain('accordion-panel-expanded');

    header.click();
    fixture.detectChanges();
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(panelHost().getAttribute('data-state')).toBe('collapsed');
  });

  it('toggles via Enter and Space keys', (): void => {
    const header: HTMLElement = headerButton();

    header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(header.getAttribute('aria-expanded')).toBe('true');

    header.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(header.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not toggle when disabled', (): void => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const header: HTMLElement = headerButton();
    header.click();
    fixture.detectChanges();

    expect(header.getAttribute('aria-disabled')).toBe('true');
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(header.getAttribute('tabindex')).toBe('-1');
  });

  it('generates unique ids linking header and content', (): void => {
    const header: HTMLElement = headerButton();
    const content: HTMLElement = contentEl();
    const headerId: string | null = header.getAttribute('id');
    const contentId: string | null = content.getAttribute('id');

    expect(headerId).toBeTruthy();
    expect(contentId).toBeTruthy();
    expect(header.getAttribute('aria-controls')).toBe(contentId);
    expect(content.getAttribute('aria-labelledby')).toBe(headerId);
  });

  it('renders default collapse and expand icons', (): void => {
    const names: string[] = iconNames();
    expect(names).toContain('chevron-down');
    expect(names).toContain('chevron-up');
  });

  it('renders collapse icon when panel is collapsed', (): void => {
    fixture.componentInstance.collapseIcon.set('minus');
    fixture.componentInstance.expandIcon.set('plus');
    fixture.detectChanges();

    const names: string[] = iconNames();
    expect(names).toContain('minus');
    expect(names).toContain('plus');
    const iconEl: HTMLElement | null = iconContainer();
    expect(iconEl).toBeTruthy();
    expect((iconEl as HTMLElement).classList.contains('expanded')).toBeFalsy();
  });

  it('applies expanded icon class when panel is expanded', (): void => {
    fixture.componentInstance.expanded.set(true);
    fixture.detectChanges();

    const iconEl: HTMLElement | null = iconContainer();
    expect(iconEl).toBeTruthy();
    expect((iconEl as HTMLElement).classList.contains('expanded')).toBeTruthy();
  });

  it('positions icon at end by default', (): void => {
    const iconEl: HTMLElement | null = iconContainer();
    expect(iconEl).toBeTruthy();
    expect((iconEl as HTMLElement).classList.contains('icon-end')).toBeTruthy();
  });

  it('positions icon at start when iconPosition is start', (): void => {
    fixture.componentInstance.iconPosition.set('start');
    fixture.detectChanges();

    const iconEl: HTMLElement | null = iconContainer();
    expect(iconEl).toBeTruthy();
    expect((iconEl as HTMLElement).classList.contains('icon-start')).toBeTruthy();
  });

  it('adds expanded class to content when expanded', (): void => {
    fixture.componentInstance.expanded.set(true);
    fixture.detectChanges();

    expect(contentEl().classList.contains('expanded')).toBeTruthy();
  });
});

describe('AccordionPanel - Toggle Icon Template', (): void => {
  let templateFixture: ComponentFixture<PanelTemplateHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PanelTemplateHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    templateFixture = TestBed.createComponent(PanelTemplateHostComponent);
    templateFixture.detectChanges();
  });

  it('renders custom toggle icon template content', (): void => {
    const collapsedText: HTMLElement | null = (
      templateFixture.nativeElement as HTMLElement
    ).querySelector('.accordion-panel-icon .icon-collapsed .toggle-text');
    const expandedText: HTMLElement | null = (
      templateFixture.nativeElement as HTMLElement
    ).querySelector('.accordion-panel-icon .icon-expanded .toggle-text');

    expect(collapsedText).toBeTruthy();
    expect(expandedText).toBeTruthy();
    const collapsedTextContent: string | null = (collapsedText as HTMLElement).textContent;
    const expandedTextContent: string | null = (expandedText as HTMLElement).textContent;
    expect(collapsedTextContent).toBeTruthy();
    expect(expandedTextContent).toBeTruthy();
    expect((collapsedTextContent as string).trim()).toBe('Collapsed');
    expect((expandedTextContent as string).trim()).toBe('Expanded');
  });

  it('applies expanded class when panel is expanded', (): void => {
    const iconEl: HTMLElement | null = (templateFixture.nativeElement as HTMLElement).querySelector(
      '.accordion-panel-icon'
    );

    templateFixture.componentInstance.expanded.set(true);
    templateFixture.detectChanges();

    expect(iconEl).toBeTruthy();
    expect((iconEl as HTMLElement).classList.contains('expanded')).toBeTruthy();
  });
});
