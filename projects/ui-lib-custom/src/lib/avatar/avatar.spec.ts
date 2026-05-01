import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Component, ChangeDetectionStrategy, provideZonelessChangeDetection } from '@angular/core';
import { Avatar } from './avatar';
import { AvatarGroup } from './avatar-group';
import type { AvatarSize, AvatarShape, AvatarVariant } from './avatar.types';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Avatar],
  template: `
    <ui-lib-avatar
      [image]="image"
      [imageAlt]="imageAlt"
      [label]="label"
      [icon]="icon"
      [size]="size"
      [shape]="shape"
      [variant]="variant"
      [styleClass]="styleClass"
      [ariaLabel]="ariaLabel"
    />
  `,
})
class TestHostComponent {
  public image: string | null = null;
  public imageAlt: string = 'Avatar';
  public label: string | null = null;
  public icon: string | null = null;
  public size: AvatarSize = 'md';
  public shape: AvatarShape = 'circle';
  public variant: AvatarVariant | null = null;
  public styleClass: string | null = null;
  public ariaLabel: string | null = null;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AvatarGroup, Avatar],
  template: `
    <ui-lib-avatar-group [ariaLabel]="groupAriaLabel">
      <ui-lib-avatar label="AA" />
      <ui-lib-avatar label="BB" />
    </ui-lib-avatar-group>
  `,
})
class GroupTestHostComponent {
  public groupAriaLabel: string | null = 'Team members';
}
describe('Avatar', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, GroupTestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });
  function bootstrap(initial?: Partial<TestHostComponent>): {
    fixture: ComponentFixture<TestHostComponent>;
    el: HTMLElement;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    if (initial) Object.assign(fixture.componentInstance, initial);
    fixture.detectChanges();
    const el: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-avatar'
    ) as HTMLElement;
    return { fixture, el };
  }
  it('should create', (): void => {
    const { el } = bootstrap();
    expect(el).toBeTruthy();
  });
  it('applies base class', (): void => {
    const { el } = bootstrap();
    expect(el.className).toContain('ui-lib-avatar');
  });
  it('applies size class', (): void => {
    const { el } = bootstrap({ size: 'lg' });
    expect(el.className).toContain('ui-lib-avatar--size-lg');
  });
  it('applies shape class', (): void => {
    const { el } = bootstrap({ shape: 'square' });
    expect(el.className).toContain('ui-lib-avatar--shape-square');
  });
  it('applies default circle shape', (): void => {
    const { el } = bootstrap();
    expect(el.className).toContain('ui-lib-avatar--shape-circle');
  });
  it('renders image when image input is provided', (): void => {
    const { fixture } = bootstrap({ image: '/assets/photo.jpg', imageAlt: 'Jane Doe' });
    const img: HTMLImageElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-avatar__image'
    );
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('/assets/photo.jpg');
  });
  it('renders label when no image is provided', (): void => {
    const { fixture } = bootstrap({ label: 'JD' });
    const span: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-avatar__label'
    );
    expect(span).toBeTruthy();
    expect(String((span as HTMLElement).textContent).trim()).toBe('JD');
  });
  it('renders icon when no image or label is provided', (): void => {
    const { fixture } = bootstrap({ icon: 'pi pi-user' });
    const span: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-avatar__icon'
    );
    expect(span).toBeTruthy();
    expect(span?.className).toContain('pi pi-user');
  });
  it('prefers image over label', (): void => {
    const { fixture } = bootstrap({ image: '/img.jpg', label: 'JD' });
    const img: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-avatar__image'
    );
    const label: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-avatar__label'
    );
    expect(img).toBeTruthy();
    expect(label).toBeNull();
  });
  it('prefers label over icon', (): void => {
    const { fixture } = bootstrap({ label: 'JD', icon: 'pi pi-user' });
    const label: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-avatar__label'
    );
    const icon: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-avatar__icon'
    );
    expect(label).toBeTruthy();
    expect(icon).toBeNull();
  });
  it('applies aria-label from ariaLabel input', (): void => {
    const { el } = bootstrap({ ariaLabel: 'Profile photo' });
    expect(el.getAttribute('aria-label')).toBe('Profile photo');
  });
  it('applies aria-label from label when no ariaLabel override', (): void => {
    const { el } = bootstrap({ label: 'JD' });
    expect(el.getAttribute('aria-label')).toBe('JD');
  });
  it('applies aria-label from imageAlt when image is set', (): void => {
    const { el } = bootstrap({ image: '/foo.jpg', imageAlt: 'Jane Doe' });
    expect(el.getAttribute('aria-label')).toBe('Jane Doe');
  });
  it('applies role="img"', (): void => {
    const { el } = bootstrap();
    expect(el.getAttribute('role')).toBe('img');
  });
  it('applies extra styleClass', (): void => {
    const { el } = bootstrap({ styleClass: 'custom-class' });
    expect(el.className).toContain('custom-class');
  });
  it('applies variant class when explicit variant is given', (): void => {
    const { el } = bootstrap({ variant: 'bootstrap' });
    expect(el.className).toContain('ui-lib-avatar--variant-bootstrap');
  });
});
describe('AvatarGroup', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [GroupTestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });
  it('should create', (): void => {
    const fixture: ComponentFixture<GroupTestHostComponent> =
      TestBed.createComponent(GroupTestHostComponent);
    fixture.detectChanges();
    const groupEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-avatar-group'
    ) as HTMLElement;
    expect(groupEl).toBeTruthy();
  });
  it('applies role="group"', (): void => {
    const fixture: ComponentFixture<GroupTestHostComponent> =
      TestBed.createComponent(GroupTestHostComponent);
    fixture.detectChanges();
    const groupEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-avatar-group'
    ) as HTMLElement;
    expect(groupEl.getAttribute('role')).toBe('group');
  });
  it('applies aria-label to group', (): void => {
    const fixture: ComponentFixture<GroupTestHostComponent> =
      TestBed.createComponent(GroupTestHostComponent);
    fixture.detectChanges();
    const groupEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-avatar-group'
    ) as HTMLElement;
    expect(groupEl.getAttribute('aria-label')).toBe('Team members');
  });
});
