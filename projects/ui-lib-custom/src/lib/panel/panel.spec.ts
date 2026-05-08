import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Panel } from './panel';
import type { PanelToggleEvent, PanelVariant } from './panel.types';

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel
      [header]="headerText()"
      [toggleable]="toggleableState()"
      [(collapsed)]="collapsedState"
      [variant]="variant()"
      [styleClass]="styleClass()"
      (toggled)="lastToggleEvent = $event"
    >
      <p class="test-body">Body content</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly headerText: WritableSignal<string> = signal<string>('Test Header');
  public readonly toggleableState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly collapsedState: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<PanelVariant | null> = signal<PanelVariant | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public lastToggleEvent: PanelToggleEvent | null = null;
}

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel [toggleable]="true">
      <span panelHeader class="custom-header">Custom <strong>Header</strong></span>
      <button panelIcons type="button" class="icon-btn">Action</button>
      <p class="test-body">Body content</p>
      <div panelFooter class="custom-footer">Footer text</div>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProjectionHostComponent {}

describe('Panel', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getPanel(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-panel') as HTMLElement;
  }

  function getHeader(): HTMLElement {
    return getPanel().querySelector('.ui-lib-panel__header') as HTMLElement;
  }

  function getTitle(): HTMLElement | null {
    return getPanel().querySelector('.ui-lib-panel__title');
  }

  function getToggleButton(): HTMLElement | null {
    return getPanel().querySelector('.ui-lib-panel__toggle-button');
  }

  function getContentWrapper(): HTMLElement {
    return getPanel().querySelector('.ui-lib-panel__content-wrapper') as HTMLElement;
  }

  function getFooter(): HTMLElement {
    return getPanel().querySelector('.ui-lib-panel__footer') as HTMLElement;
  }

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---- Rendering ---------------------------------------------------------

  it('should create', (): void => {
    expect(getPanel()).toBeTruthy();
  });

  it('should apply base host class', (): void => {
    expect(getPanel().classList.contains('ui-lib-panel')).toBe(true);
  });

  it('should render header text from input', (): void => {
    const title: HTMLElement | null = getTitle();
    expect(title).toBeTruthy();
    expect(title!.textContent!.trim()).toBe('Test Header');
  });

  it('should update header text when input changes', (): void => {
    host.headerText.set('Updated Header');
    fixture.detectChanges();
    expect(getTitle()!.textContent!.trim()).toBe('Updated Header');
  });

  it('should not render title element when header is empty', (): void => {
    host.headerText.set('');
    fixture.detectChanges();
    expect(getTitle()).toBeNull();
  });

  it('should have role=region on host', (): void => {
    expect(getPanel().getAttribute('role')).toBe('region');
  });

  it('should have aria-labelledby pointing to header id', (): void => {
    const panelElement: HTMLElement = getPanel();
    const labelledBy: string | null = panelElement.getAttribute('aria-labelledby');
    const headerId: string = getHeader().getAttribute('id') ?? '';
    expect(labelledBy).toBe(headerId);
    expect(headerId).toContain('ui-lib-panel-');
  });

  // ---- Variant -----------------------------------------------------------

  it('should apply variant class', (): void => {
    host.variant.set('material');
    fixture.detectChanges();
    expect(getPanel().classList.contains('ui-lib-panel--variant-material')).toBe(true);
  });

  it('should switch variant class', (): void => {
    host.variant.set('bootstrap');
    fixture.detectChanges();
    expect(getPanel().classList.contains('ui-lib-panel--variant-bootstrap')).toBe(true);
    expect(getPanel().classList.contains('ui-lib-panel--variant-material')).toBe(false);
  });

  it('should apply styleClass to host', (): void => {
    host.styleClass.set('my-custom-class');
    fixture.detectChanges();
    expect(getPanel().classList.contains('my-custom-class')).toBe(true);
  });

  // ---- Toggle button visibility ------------------------------------------

  it('should not render toggle button when toggleable is false', (): void => {
    expect(getToggleButton()).toBeNull();
  });

  it('should render toggle button when toggleable is true', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    expect(getToggleButton()).toBeTruthy();
  });

  it('should add toggleable host class when toggleable is true', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    expect(getPanel().classList.contains('ui-lib-panel--toggleable')).toBe(true);
  });

  // ---- Toggle button aria ------------------------------------------------

  it('should set aria-expanded=true on toggle button when not collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(false);
    fixture.detectChanges();
    expect(getToggleButton()!.getAttribute('aria-expanded')).toBe('true');
  });

  it('should set aria-expanded=false on toggle button when collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getToggleButton()!.getAttribute('aria-expanded')).toBe('false');
  });

  it('should set aria-controls on toggle button pointing to content wrapper', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    const toggleButton: HTMLElement = getToggleButton() as HTMLElement;
    const controls: string | null = toggleButton.getAttribute('aria-controls');
    const contentId: string = getContentWrapper().getAttribute('id') ?? '';
    expect(controls).toBe(contentId);
    expect(contentId).toContain('ui-lib-panel-');
  });

  // ---- Collapse state ----------------------------------------------------

  it('should not add collapsed class when not toggleable', (): void => {
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getPanel().classList.contains('ui-lib-panel--collapsed')).toBe(false);
  });

  it('should add collapsed class when toggleable and collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getPanel().classList.contains('ui-lib-panel--collapsed')).toBe(true);
  });

  it('should add collapsed modifier on content wrapper when collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getContentWrapper().classList.contains('ui-lib-panel__content-wrapper--collapsed')).toBe(
      true
    );
  });

  it('should set aria-hidden on content when collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    expect(getContentWrapper().getAttribute('aria-hidden')).toBe('true');
  });

  it('should not set aria-hidden when not collapsed', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(false);
    fixture.detectChanges();
    expect(getContentWrapper().getAttribute('aria-hidden')).toBeNull();
  });

  // ---- Toggle interaction ------------------------------------------------

  it('should toggle collapsed state on toggle button click', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    getToggleButton()!.click();
    fixture.detectChanges();
    expect(host.collapsedState()).toBe(true);
  });

  it('should emit toggled event with collapsed=true after collapsing', (): void => {
    host.toggleableState.set(true);
    fixture.detectChanges();
    getToggleButton()!.click();
    fixture.detectChanges();
    expect(host.lastToggleEvent).not.toBeNull();
    expect(host.lastToggleEvent!.collapsed).toBe(true);
  });

  it('should emit toggled event with collapsed=false after expanding', (): void => {
    host.toggleableState.set(true);
    host.collapsedState.set(true);
    fixture.detectChanges();
    getToggleButton()!.click();
    fixture.detectChanges();
    expect(host.lastToggleEvent!.collapsed).toBe(false);
  });

  it('should not toggle when not toggleable', (): void => {
    host.toggleableState.set(false);
    fixture.detectChanges();
    // No toggle button exists; collapsed stays as-is
    expect(host.collapsedState()).toBe(false);
  });

  // ---- Footer ------------------------------------------------------------

  it('should render footer element', (): void => {
    expect(getFooter()).toBeTruthy();
  });
});

// ---- Content projection ------------------------------------------------

describe('Panel content projection', (): void => {
  let fixture: ComponentFixture<ProjectionHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ProjectionHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectionHostComponent);
    fixture.detectChanges();
  });

  it('should project custom header via [panelHeader]', (): void => {
    const customHeader: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.custom-header'
    );
    expect(customHeader).toBeTruthy();
  });

  it('should project icon actions via [panelIcons]', (): void => {
    const iconButton: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.icon-btn'
    );
    expect(iconButton).toBeTruthy();
  });

  it('should project body content into default slot', (): void => {
    const body: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.test-body'
    );
    expect(body).toBeTruthy();
  });

  it('should project footer content via [panelFooter]', (): void => {
    const footer: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.custom-footer'
    );
    expect(footer).toBeTruthy();
  });
});

// ---- Unique IDs --------------------------------------------------------

describe('Panel unique IDs', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should generate unique IDs for each instance', (): void => {
    const fixture1: ComponentFixture<TestHostComponent> =
      TestBed.createComponent(TestHostComponent);
    const fixture2: ComponentFixture<TestHostComponent> =
      TestBed.createComponent(TestHostComponent);
    fixture1.detectChanges();
    fixture2.detectChanges();

    const header1: HTMLElement = (fixture1.nativeElement as HTMLElement).querySelector(
      '.ui-lib-panel__header'
    ) as HTMLElement;
    const header2: HTMLElement = (fixture2.nativeElement as HTMLElement).querySelector(
      '.ui-lib-panel__header'
    ) as HTMLElement;
    expect(header1.getAttribute('id')).not.toBe(header2.getAttribute('id'));
  });
});
