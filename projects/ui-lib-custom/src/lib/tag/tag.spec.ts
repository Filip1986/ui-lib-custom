import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Tag } from './tag';
import type { TagSeverity, TagSize, TagVariant } from './tag.types';

@Component({
  standalone: true,
  imports: [Tag],
  template: `
    <ui-lib-tag
      [value]="tagValue()"
      [icon]="tagIcon()"
      [severity]="tagSeverity()"
      [rounded]="tagRounded()"
      [size]="tagSize()"
      [variant]="tagVariant()"
      [styleClass]="tagStyleClass()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly tagValue: WritableSignal<string | null> = signal<string | null>(null);
  public readonly tagIcon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly tagSeverity: WritableSignal<TagSeverity> = signal<TagSeverity>('primary');
  public readonly tagRounded: WritableSignal<boolean> = signal<boolean>(false);
  public readonly tagSize: WritableSignal<TagSize> = signal<TagSize>('md');
  public readonly tagVariant: WritableSignal<TagVariant | null> = signal<TagVariant | null>(null);
  public readonly tagStyleClass: WritableSignal<string | null> = signal<string | null>(null);
}

describe('Tag', (): void => {
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

  function getTagElement(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-tag') as HTMLElement;
  }

  it('should create the component', (): void => {
    expect(getTagElement()).toBeTruthy();
  });

  it('should apply the base ui-lib-tag class', (): void => {
    expect(getTagElement().classList).toContain('ui-lib-tag');
  });

  it('should render the value', (): void => {
    host.tagValue.set('New');
    fixture.detectChanges();
    const span: Element | null = getTagElement().querySelector('.ui-lib-tag__value');
    expect(span?.textContent!.trim()).toBe('New');
  });

  it('should not render a value span when value is null', (): void => {
    host.tagValue.set(null);
    fixture.detectChanges();
    const span: Element | null = getTagElement().querySelector('.ui-lib-tag__value');
    expect(span).toBeNull();
  });

  it('should render an icon span when icon is provided', (): void => {
    host.tagIcon.set('pi pi-check');
    fixture.detectChanges();
    const iconSpan: Element | null = getTagElement().querySelector('.ui-lib-tag__icon');
    expect(iconSpan).toBeTruthy();
    expect(iconSpan?.classList).toContain('pi');
    expect(iconSpan?.classList).toContain('pi-check');
  });

  it('should not render an icon span when icon is null', (): void => {
    host.tagIcon.set(null);
    fixture.detectChanges();
    const iconSpan: Element | null = getTagElement().querySelector('.ui-lib-tag__icon');
    expect(iconSpan).toBeNull();
  });

  it('should apply size class', (): void => {
    host.tagSize.set('sm');
    fixture.detectChanges();
    expect(getTagElement().classList).toContain('ui-lib-tag--size-sm');

    host.tagSize.set('lg');
    fixture.detectChanges();
    expect(getTagElement().classList).toContain('ui-lib-tag--size-lg');
  });

  it('should apply the default md size class', (): void => {
    expect(getTagElement().classList).toContain('ui-lib-tag--size-md');
  });

  it('should apply severity class', (): void => {
    const severities: TagSeverity[] = [
      'primary',
      'secondary',
      'success',
      'info',
      'warn',
      'danger',
      'contrast',
    ];
    for (const severity of severities) {
      host.tagSeverity.set(severity);
      fixture.detectChanges();
      expect(getTagElement().classList).toContain(`ui-lib-tag--severity-${severity}`);
    }
  });

  it('should apply rounded class when rounded is true', (): void => {
    host.tagRounded.set(true);
    fixture.detectChanges();
    expect(getTagElement().classList).toContain('ui-lib-tag--rounded');
  });

  it('should not apply rounded class when rounded is false', (): void => {
    host.tagRounded.set(false);
    fixture.detectChanges();
    expect(getTagElement().classList).not.toContain('ui-lib-tag--rounded');
  });

  it('should apply default primary severity class', (): void => {
    expect(getTagElement().classList).toContain('ui-lib-tag--severity-primary');
  });

  it('should apply variant class when provided', (): void => {
    host.tagVariant.set('bootstrap');
    fixture.detectChanges();
    expect(getTagElement().classList).toContain('ui-lib-tag--variant-bootstrap');
  });

  it('should apply minimal variant class', (): void => {
    host.tagVariant.set('minimal');
    fixture.detectChanges();
    expect(getTagElement().classList).toContain('ui-lib-tag--variant-minimal');
  });

  it('should apply extra styleClass when provided', (): void => {
    host.tagStyleClass.set('my-custom-tag');
    fixture.detectChanges();
    expect(getTagElement().classList).toContain('my-custom-tag');
  });

  it('should set aria-label from value', (): void => {
    host.tagValue.set('Active');
    fixture.detectChanges();
    expect(getTagElement().getAttribute('aria-label')).toBe('Active');
  });

  it('should have role="status" on the host', (): void => {
    expect(getTagElement().getAttribute('role')).toBe('status');
  });

  it('should remove aria-label when value is null', (): void => {
    host.tagValue.set(null);
    fixture.detectChanges();
    expect(getTagElement().getAttribute('aria-label')).toBeNull();
  });

  it('should render icon and value together', (): void => {
    host.tagIcon.set('pi pi-info-circle');
    host.tagValue.set('Info');
    fixture.detectChanges();
    const tagEl: HTMLElement = getTagElement();
    expect(tagEl.querySelector('.ui-lib-tag__icon')).toBeTruthy();
    expect(tagEl.querySelector('.ui-lib-tag__value')?.textContent!.trim()).toBe('Info');
  });

  it('should mark icon as aria-hidden', (): void => {
    host.tagIcon.set('pi pi-check');
    fixture.detectChanges();
    const iconSpan: Element | null = getTagElement().querySelector('.ui-lib-tag__icon');
    expect(iconSpan?.getAttribute('aria-hidden')).toBe('true');
  });
});
