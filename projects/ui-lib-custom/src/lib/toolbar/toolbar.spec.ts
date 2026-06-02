import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

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
    null,
  );
  public readonly size: WritableSignal<ToolbarSize> = signal<ToolbarSize>('md');
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="Keyboard toolbar">
      <div uiToolbarStart>
        <button type="button">One</button>
        <button type="button">Two</button>
        <button type="button">Three</button>
      </div>
    </ui-lib-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class KeyboardHostComponent {}

@Component({
  standalone: true,
  imports: [Toolbar],
  template: `
    <ui-lib-toolbar ariaLabel="First" />
    <ui-lib-toolbar ariaLabel="Second" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoToolbarsComponent {}

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

  it('should assign a unique id matching the pattern', (): void => {
    expect(getToolbarElement().getAttribute('id')).toMatch(/^ui-lib-toolbar-\d+$/);
  });

  it('should render start group wrapper', (): void => {
    const startGroup: Element | null = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--start',
    );
    expect(startGroup).toBeTruthy();
  });

  it('should render center group wrapper', (): void => {
    const centerGroup: Element | null = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--center',
    );
    expect(centerGroup).toBeTruthy();
  });

  it('should render end group wrapper', (): void => {
    const endGroup: Element | null = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--end',
    );
    expect(endGroup).toBeTruthy();
  });

  it('should project start content into start group', (): void => {
    const startGroup: Element = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--start',
    ) as Element;
    const startContent: Element | null = startGroup.querySelector('[data-testid="start-content"]');
    expect(startContent).toBeTruthy();
    expect(startContent!.textContent!.trim()).toBe('Start');
  });

  it('should project center content into center group', (): void => {
    const centerGroup: Element = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--center',
    ) as Element;
    const centerContent: Element | null = centerGroup.querySelector(
      '[data-testid="center-content"]',
    );
    expect(centerContent).toBeTruthy();
    expect(centerContent!.textContent!.trim()).toBe('Center');
  });

  it('should project end content into end group', (): void => {
    const endGroup: Element = getToolbarElement().querySelector(
      '.ui-lib-toolbar__group--end',
    ) as Element;
    const endContent: Element | null = endGroup.querySelector('[data-testid="end-content"]');
    expect(endContent).toBeTruthy();
    expect(endContent!.textContent!.trim()).toBe('End');
  });
});

describe('Toolbar unique IDs', (): void => {
  it('two toolbar instances should have different ids', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TwoToolbarsComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    const twoFixture: ComponentFixture<TwoToolbarsComponent> =
      TestBed.createComponent(TwoToolbarsComponent);
    twoFixture.detectChanges();
    const toolbars: NodeListOf<HTMLElement> = (
      twoFixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('ui-lib-toolbar');
    const id0: string | null = toolbars[0]?.getAttribute('id') ?? null;
    const id1: string | null = toolbars[1]?.getAttribute('id') ?? null;
    expect(id0).toBeTruthy();
    expect(id1).toBeTruthy();
    expect(id0).not.toBe(id1);
    twoFixture.destroy();
  });
});

describe('Toolbar keyboard navigation', (): void => {
  let fixture: ComponentFixture<KeyboardHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [KeyboardHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(KeyboardHostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach((): void => {
    fixture.destroy();
  });

  function getButtons(): HTMLElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('button'),
    );
  }

  function dispatchKey(target: HTMLElement, key: string): void {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  }

  it('first button has tabindex="0" and others have tabindex="-1" after init', (): void => {
    const buttons: HTMLElement[] = getButtons();
    expect(buttons[0]?.getAttribute('tabindex')).toBe('0');
    expect(buttons[1]?.getAttribute('tabindex')).toBe('-1');
    expect(buttons[2]?.getAttribute('tabindex')).toBe('-1');
  });

  it('ArrowRight moves focus forward', (): void => {
    const buttons: HTMLElement[] = getButtons();
    buttons[0]?.focus();
    dispatchKey(buttons[0] as HTMLElement, 'ArrowRight');
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('ArrowLeft moves focus backward', (): void => {
    const buttons: HTMLElement[] = getButtons();
    buttons[1]?.focus();
    dispatchKey(buttons[1] as HTMLElement, 'ArrowLeft');
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('ArrowRight wraps to first from last', (): void => {
    const buttons: HTMLElement[] = getButtons();
    buttons[2]?.focus();
    dispatchKey(buttons[2] as HTMLElement, 'ArrowRight');
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('ArrowLeft wraps to last from first', (): void => {
    const buttons: HTMLElement[] = getButtons();
    buttons[0]?.focus();
    dispatchKey(buttons[0] as HTMLElement, 'ArrowLeft');
    expect(document.activeElement).toBe(buttons[2]);
  });

  it('Home focuses the first button', (): void => {
    const buttons: HTMLElement[] = getButtons();
    buttons[2]?.focus();
    dispatchKey(buttons[2] as HTMLElement, 'Home');
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('End focuses the last button', (): void => {
    const buttons: HTMLElement[] = getButtons();
    buttons[0]?.focus();
    dispatchKey(buttons[0] as HTMLElement, 'End');
    expect(document.activeElement).toBe(buttons[2]);
  });

  it('navigation updates tabindex on moved-to item', (): void => {
    const buttons: HTMLElement[] = getButtons();
    buttons[0]?.focus();
    dispatchKey(buttons[0] as HTMLElement, 'ArrowRight');
    expect(buttons[0]?.getAttribute('tabindex')).toBe('-1');
    expect(buttons[1]?.getAttribute('tabindex')).toBe('0');
  });
});
