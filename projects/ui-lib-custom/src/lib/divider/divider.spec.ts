import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Divider } from './divider';
import type {
  DividerAlign,
  DividerOrientation,
  DividerType,
  DividerVariant,
} from './divider.types';

@Component({
  standalone: true,
  imports: [Divider],
  template: `
    <ui-lib-divider
      [orientation]="orientation()"
      [type]="type()"
      [align]="align()"
      [variant]="variant()"
      [styleClass]="styleClass()"
      [ariaLabel]="ariaLabel()"
      [decorative]="decorative()"
      >{{ content() }}</ui-lib-divider
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly orientation: WritableSignal<DividerOrientation> =
    signal<DividerOrientation>('horizontal');
  public readonly type: WritableSignal<DividerType> = signal<DividerType>('solid');
  public readonly align: WritableSignal<DividerAlign | null> = signal<DividerAlign | null>(null);
  public readonly variant: WritableSignal<DividerVariant | null> = signal<DividerVariant | null>(
    null
  );
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly decorative: WritableSignal<boolean> = signal<boolean>(false);
  public readonly content: WritableSignal<string> = signal<string>('');
}

describe('Divider', (): void => {
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

  function getDividerElement(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-divider') as HTMLElement;
  }

  it('should create the component', (): void => {
    expect(getDividerElement()).toBeTruthy();
  });

  it('should apply the base ui-lib-divider class', (): void => {
    expect(getDividerElement().classList).toContain('ui-lib-divider');
  });

  it('should default to horizontal orientation', (): void => {
    expect(getDividerElement().classList).toContain('ui-lib-divider--horizontal');
  });

  it('should apply vertical orientation class', (): void => {
    host.orientation.set('vertical');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--vertical');
    expect(getDividerElement().classList).not.toContain('ui-lib-divider--horizontal');
  });

  it('should default to solid type', (): void => {
    expect(getDividerElement().classList).toContain('ui-lib-divider--type-solid');
  });

  it('should apply dashed type class', (): void => {
    host.type.set('dashed');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--type-dashed');
  });

  it('should apply dotted type class', (): void => {
    host.type.set('dotted');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--type-dotted');
  });

  it('should default align to center when align is null', (): void => {
    host.align.set(null);
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--align-center');
  });

  it('should apply left align class', (): void => {
    host.align.set('left');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--align-left');
  });

  it('should apply right align class', (): void => {
    host.align.set('right');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--align-right');
  });

  it('should apply top align class', (): void => {
    host.align.set('top');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--align-top');
  });

  it('should apply bottom align class', (): void => {
    host.align.set('bottom');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('ui-lib-divider--align-bottom');
  });

  it('should apply variant class when provided', (): void => {
    const variants: DividerVariant[] = ['material', 'bootstrap', 'minimal'];
    for (const variant of variants) {
      host.variant.set(variant);
      fixture.detectChanges();
      expect(getDividerElement().classList).toContain(`ui-lib-divider--variant-${variant}`);
    }
  });

  it('should apply extra styleClass when provided', (): void => {
    host.styleClass.set('my-custom-divider');
    fixture.detectChanges();
    expect(getDividerElement().classList).toContain('my-custom-divider');
  });

  it('should have role="separator" on the host', (): void => {
    expect(getDividerElement().getAttribute('role')).toBe('separator');
  });

  it('should have aria-orientation="horizontal" by default', (): void => {
    expect(getDividerElement().getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should have aria-orientation="vertical" when orientation is vertical', (): void => {
    host.orientation.set('vertical');
    fixture.detectChanges();
    expect(getDividerElement().getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should have a generated unique id on the host', (): void => {
    expect(getDividerElement().getAttribute('id')).toMatch(/^ui-lib-divider-\d+$/);
  });

  it('should set aria-hidden="true" when decorative and no ariaLabel is provided', (): void => {
    host.decorative.set(true);
    fixture.detectChanges();
    expect(getDividerElement().getAttribute('aria-hidden')).toBe('true');
  });

  it('should set aria-label when ariaLabel is provided', (): void => {
    host.ariaLabel.set('Section divider');
    fixture.detectChanges();
    expect(getDividerElement().getAttribute('aria-label')).toBe('Section divider');
  });

  it('should trim aria-label and remove it when empty', (): void => {
    host.ariaLabel.set('   ');
    fixture.detectChanges();
    expect(getDividerElement().getAttribute('aria-label')).toBeNull();
  });

  it('should keep divider exposed when decorative is true but ariaLabel is provided', (): void => {
    host.decorative.set(true);
    host.ariaLabel.set('Content separator');
    fixture.detectChanges();
    expect(getDividerElement().getAttribute('aria-hidden')).toBeNull();
    expect(getDividerElement().getAttribute('aria-label')).toBe('Content separator');
  });

  it('should render the content div', (): void => {
    const contentDiv: Element | null = getDividerElement().querySelector(
      '.ui-lib-divider__content'
    );
    expect(contentDiv).toBeTruthy();
  });

  it('should project content into the content div', (): void => {
    host.content.set('OR');
    fixture.detectChanges();
    const contentDiv: Element | null = getDividerElement().querySelector(
      '.ui-lib-divider__content'
    );
    expect(contentDiv?.textContent!.trim()).toBe('OR');
  });
});
