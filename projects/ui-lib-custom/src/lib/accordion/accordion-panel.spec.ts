import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AccordionPanel, AccordionHeader } from './accordion-panel';

@Component({
  standalone: true,
  imports: [CommonModule, AccordionPanel, AccordionHeader],
  template: `
    <ui-lib-accordion-panel
      [header]="header()"
      [value]="value()"
      [disabled]="disabled()"
      [expanded]="expanded()"
    >
      @if (useCustomHeader()) {
        <div accordionHeader class="custom-header">Custom Header</div>
      }
      <div class="panel-body">Panel Body</div>
    </ui-lib-accordion-panel>
  `,
})
class PanelHostComponent {
  header = signal<string>('Panel Title');
  value = signal<string | null>('panel-a');
  disabled = signal<boolean>(false);
  expanded = signal<boolean>(false);
  useCustomHeader = signal<boolean>(false);
}

describe('AccordionPanel', () => {
  let fixture: ComponentFixture<PanelHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelHostComponent);
    fixture.detectChanges();
  });

  function headerButton(): HTMLElement {
    return fixture.nativeElement.querySelector('.accordion-panel-header');
  }

  function contentEl(): HTMLElement {
    return fixture.nativeElement.querySelector('.accordion-panel-content');
  }

  function panelHost(): HTMLElement {
    return fixture.nativeElement.querySelector('ui-lib-accordion-panel');
  }

  it('creates panel and renders projected content', () => {
    const body: HTMLElement | null = fixture.nativeElement.querySelector('.panel-body');
    expect(fixture.componentInstance).toBeTruthy();
    expect(body?.textContent?.trim()).toBe('Panel Body');
  });

  it('renders default header text when no custom header', () => {
    const title: HTMLElement | null = fixture.nativeElement.querySelector('.accordion-panel-title');
    expect(title?.textContent?.trim()).toBe('Panel Title');
  });

  it('uses custom header content when provided', () => {
    fixture.componentInstance.useCustomHeader.set(true);
    fixture.detectChanges();

    const title: HTMLElement | null = fixture.nativeElement.querySelector('.accordion-panel-title');
    const custom: HTMLElement | null = fixture.nativeElement.querySelector('.custom-header');
    expect(title).toBeNull();
    expect(custom?.textContent?.trim()).toBe('Custom Header');
  });

  it('applies aria attributes and roles', () => {
    const header: HTMLElement = headerButton();
    const content: HTMLElement = contentEl();

    expect(header.getAttribute('role')).toBe('button');
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(content.getAttribute('role')).toBe('region');
    expect(content.getAttribute('aria-labelledby')).toBe(header.getAttribute('id'));
    expect(header.getAttribute('aria-controls')).toBe(content.getAttribute('id'));
  });

  it('respects initial expanded input when uncontrolled', () => {
    fixture.componentInstance.expanded.set(true);
    fixture.detectChanges();

    expect(panelHost().getAttribute('data-state')).toBe('expanded');
    expect(contentEl().hasAttribute('hidden')).toBeFalse();
    expect(headerButton().getAttribute('aria-expanded')).toBe('true');
  });

  it('toggles expansion on click', () => {
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

  it('toggles via Enter and Space keys', () => {
    const header: HTMLElement = headerButton();

    header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(header.getAttribute('aria-expanded')).toBe('true');

    header.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(header.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not toggle when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const header: HTMLElement = headerButton();
    header.click();
    fixture.detectChanges();

    expect(header.getAttribute('aria-disabled')).toBe('true');
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(header.getAttribute('tabindex')).toBe('-1');
  });

  it('generates unique ids linking header and content', () => {
    const header: HTMLElement = headerButton();
    const content: HTMLElement = contentEl();
    const headerId: string | null = header.getAttribute('id');
    const contentId: string | null = content.getAttribute('id');

    expect(headerId).toBeTruthy();
    expect(contentId).toBeTruthy();
    expect(header.getAttribute('aria-controls')).toBe(contentId);
    expect(content.getAttribute('aria-labelledby')).toBe(headerId);
  });
});
