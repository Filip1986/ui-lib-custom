import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Toolbar } from './toolbar';
import type { ToolbarSize, ToolbarVariant } from './toolbar.types';

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar
      [variant]="variant()"
      [size]="size()"
      [ariaLabel]="ariaLabel()"
      [styleClass]="styleClass()"
    >
      <div uiToolbarStart data-testid="start-content">Start</div>
      <div uiToolbarCenter data-testid="center-content">Center</div>
      <div uiToolbarEnd data-testid="end-content">End</div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly variant: WritableSignal<ToolbarVariant | null> = signal<ToolbarVariant | null>(
    null
  );
  public readonly size: WritableSignal<ToolbarSize> = signal<ToolbarSize>('md');
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
}

describe('Toolbar', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getToolbarElement(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-toolbar') as HTMLElement;
  }

  it('should create the component', (): void => {
    expect(getToolbarElement()).toBeTruthy();
  });

  it('should apply the base ui-lib-toolbar class', (): void => {
    expect(getToolbarElement().classList).toContain('ui-lib-toolbar');
  });

  it('should default to md size class', (): void => {
    expect(getToolbarElement().classList).toContain('ui-lib-toolbar--md');
  });

  it('should apply sm size class', (): void => {
    host.size.set('sm');
    fixture.detectChanges();
    expect(getToolbarElement().classList).toContain('ui-lib-toolbar--sm');
    expect(getToolbarElement().classList).not.toContain('ui-lib-toolbar--md');
  });

  it('should apply lg size class', (): void => {
    host.size.set('lg');
    fixture.detectChanges();
    expect(getToolbarElement().classList).toContain('ui-lib-toolbar--lg');
  });

  it('should apply variant class when provided', (): void => {
    const variants: ToolbarVariant[] = ['material', 'bootstrap', 'minimal'];
    for (const variant of variants) {
      host.variant.set(variant);
      fixture.detectChanges();
      expect(getToolbarElement().classList).toContain(`ui-lib-toolbar--variant-${variant}`);
    }
  });

  it('should apply extra styleClass when provided', (): void => {
    host.styleClass.set('my-custom-toolbar');
    fixture.detectChanges();
    expect(getToolbarElement().classList).toContain('my-custom-toolbar');
  });

  it('should have role="toolbar" on the host', (): void => {
    expect(getToolbarElement().getAttribute('role')).toBe('toolbar');
  });

  it('should not have aria-label by default', (): void => {
    expect(getToolbarElement().getAttribute('aria-label')).toBeNull();
  });

  it('should apply aria-label when provided', (): void => {
    host.ariaLabel.set('Main toolbar');
    fixture.detectChanges();
    expect(getToolbarElement().getAttribute('aria-label')).toBe('Main toolbar');
  });

  it('should render start group wrapper', (): void => {
    const startGroup: Element | null = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--start'
    );
    expect(startGroup).toBeTruthy();
  });

  it('should render center group wrapper', (): void => {
    const centerGroup: Element | null = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--center'
    );
    expect(centerGroup).toBeTruthy();
  });

  it('should render end group wrapper', (): void => {
    const endGroup: Element | null = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--end'
    );
    expect(endGroup).toBeTruthy();
  });

  it('should project start content into start group', (): void => {
    const startGroup: Element = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--start'
    ) as Element;
    const startContent: Element | null = startGroup.querySelector('[data-testid="start-content"]');
    expect(startContent).toBeTruthy();
    expect(startContent!.textContent!.trim()).toBe('Start');
  });

  it('should project center content into center group', (): void => {
    const centerGroup: Element = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--center'
    ) as Element;
    const centerContent: Element | null = centerGroup.querySelector(
      '[data-testid="center-content"]'
    );
    expect(centerContent).toBeTruthy();
    expect(centerContent!.textContent!.trim()).toBe('Center');
  });

  it('should project end content into end group', (): void => {
    const endGroup: Element = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--end'
    ) as Element;
    const endContent: Element | null = endGroup.querySelector('[data-testid="end-content"]');
    expect(endContent).toBeTruthy();
    expect(endContent!.textContent!.trim()).toBe('End');
  });
});
