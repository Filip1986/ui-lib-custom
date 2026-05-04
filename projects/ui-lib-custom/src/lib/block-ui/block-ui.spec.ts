import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { BlockUI } from './block-ui';
import type { BlockUIVariant } from './block-ui.types';

function getElement(fixture: ComponentFixture<unknown>, selector: string): HTMLElement {
  const element: HTMLElement | null = (
    fixture.nativeElement as HTMLElement
  ).querySelector<HTMLElement>(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BlockUI],
  template: `
    <ui-lib-block-ui
      [blocked]="blocked()"
      [variant]="variant()"
      [styleClass]="styleClass()"
      [baseZIndex]="baseZIndex()"
    >
      <p class="content">Protected content</p>
      <span blockTemplate class="mask-content">Loading...</span>
    </ui-lib-block-ui>
  `,
})
class TestHostComponent {
  public readonly blocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<BlockUIVariant | null> = signal<BlockUIVariant | null>(
    null
  );
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly baseZIndex: WritableSignal<number> = signal<number>(0);
}

describe('BlockUI', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  interface BootstrapOptions {
    blocked?: boolean;
    variant?: BlockUIVariant | null;
    styleClass?: string | null;
    baseZIndex?: number;
  }

  function bootstrap(initial?: BootstrapOptions): {
    fixture: ComponentFixture<TestHostComponent>;
    host: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    if (initial?.blocked !== undefined) fixture.componentInstance.blocked.set(initial.blocked);
    if (initial?.variant !== undefined)
      fixture.componentInstance.variant.set(initial.variant ?? null);
    if (initial?.styleClass !== undefined)
      fixture.componentInstance.styleClass.set(initial.styleClass ?? null);
    if (initial?.baseZIndex !== undefined)
      fixture.componentInstance.baseZIndex.set(initial.baseZIndex);
    fixture.detectChanges();
    const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      'ui-lib-block-ui'
    ) as HTMLElement;
    return { fixture, host };
  }

  it('should create', (): void => {
    const { host } = bootstrap();
    expect(host).toBeTruthy();
  });

  it('should have ui-lib-block-ui class on host', (): void => {
    const { host } = bootstrap();
    expect(host.classList.contains('ui-lib-block-ui')).toBe(true);
  });

  it('should not be blocked by default', (): void => {
    const { host } = bootstrap();
    expect(host.classList.contains('ui-lib-block-ui--blocked')).toBe(false);
    expect(host.getAttribute('aria-busy')).toBe('false');
  });

  it('should add blocked class when blocked is true', (): void => {
    const { host } = bootstrap({ blocked: true });
    expect(host.classList.contains('ui-lib-block-ui--blocked')).toBe(true);
    expect(host.getAttribute('aria-busy')).toBe('true');
  });

  it('should toggle blocked class reactively', (): void => {
    const { fixture, host } = bootstrap();
    expect(host.classList.contains('ui-lib-block-ui--blocked')).toBe(false);
    fixture.componentInstance.blocked.set(true);
    fixture.detectChanges();
    expect(host.classList.contains('ui-lib-block-ui--blocked')).toBe(true);
    fixture.componentInstance.blocked.set(false);
    fixture.detectChanges();
    expect(host.classList.contains('ui-lib-block-ui--blocked')).toBe(false);
  });

  it('should show mask as visible when blocked', (): void => {
    const { fixture } = bootstrap({ blocked: true });
    const mask: HTMLElement = getElement(fixture, '.ui-lib-block-ui__mask');
    expect(mask.classList.contains('ui-lib-block-ui__mask--visible')).toBe(true);
  });

  it('should hide mask when not blocked', (): void => {
    const { fixture } = bootstrap({ blocked: false });
    const mask: HTMLElement = getElement(fixture, '.ui-lib-block-ui__mask');
    expect(mask.classList.contains('ui-lib-block-ui__mask--visible')).toBe(false);
  });

  it('should set aria-hidden on mask when not blocked', (): void => {
    const { fixture } = bootstrap({ blocked: false });
    const mask: HTMLElement = getElement(fixture, '.ui-lib-block-ui__mask');
    expect(mask.getAttribute('aria-hidden')).toBe('true');
  });

  it('should remove aria-hidden from mask when blocked', (): void => {
    const { fixture } = bootstrap({ blocked: true });
    const mask: HTMLElement = getElement(fixture, '.ui-lib-block-ui__mask');
    expect(mask.getAttribute('aria-hidden')).toBe('false');
  });

  it('should project default content', (): void => {
    const { fixture } = bootstrap();
    const content: HTMLElement = getElement(fixture, '.content');
    expect(content.textContent!.trim()).toBe('Protected content');
  });

  it('should project blockTemplate content into mask', (): void => {
    const { fixture } = bootstrap({ blocked: true });
    const maskContent: HTMLElement = getElement(fixture, '.mask-content');
    expect(maskContent.textContent!.trim()).toBe('Loading...');
  });

  it('should apply variant class', (): void => {
    const { host } = bootstrap({ variant: 'material' });
    expect(host.classList.contains('ui-lib-block-ui--variant-material')).toBe(true);
  });

  it('should apply bootstrap variant class', (): void => {
    const { host } = bootstrap({ variant: 'bootstrap' });
    expect(host.classList.contains('ui-lib-block-ui--variant-bootstrap')).toBe(true);
  });

  it('should apply minimal variant class', (): void => {
    const { host } = bootstrap({ variant: 'minimal' });
    expect(host.classList.contains('ui-lib-block-ui--variant-minimal')).toBe(true);
  });

  it('should apply extra styleClass', (): void => {
    const { host } = bootstrap({ styleClass: 'custom-class' });
    expect(host.classList.contains('custom-class')).toBe(true);
  });

  it('should apply baseZIndex to mask when set', (): void => {
    const { fixture } = bootstrap({ baseZIndex: 200 });
    const mask: HTMLElement = getElement(fixture, '.ui-lib-block-ui__mask');
    expect(mask.style.zIndex).toBe('200');
  });

  it('should use auto z-index when baseZIndex is 0', (): void => {
    const { fixture } = bootstrap({ baseZIndex: 0 });
    const mask: HTMLElement = getElement(fixture, '.ui-lib-block-ui__mask');
    expect(mask.style.zIndex).toBe('auto');
  });

  it('should have role=status on mask', (): void => {
    const { fixture } = bootstrap();
    const mask: HTMLElement = getElement(fixture, '.ui-lib-block-ui__mask');
    expect(mask.getAttribute('role')).toBe('status');
  });
});
