import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Avatar } from './avatar';
import { AvatarGroup } from './avatar-group';

@Component({
  standalone: true,
  imports: [Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-avatar
      [image]="image()"
      [imageAlt]="imageAlt()"
      [name]="name()"
      [label]="label()"
      [icon]="icon()"
      [ariaLabel]="ariaLabel()"
    />
  `,
})
class AvatarA11yHostComponent {
  public readonly image: WritableSignal<string | null> = signal<string | null>(null);
  public readonly imageAlt: WritableSignal<string | null> = signal<string | null>(null);
  public readonly name: WritableSignal<string | null> = signal<string | null>(null);
  public readonly label: WritableSignal<string | null> = signal<string | null>(null);
  public readonly icon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
}

@Component({
  standalone: true,
  imports: [AvatarGroup, Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-avatar-group
      [ariaLabel]="groupAriaLabel()"
      [overflowCount]="overflowCount()"
      [overflowAriaLabel]="overflowAriaLabel()"
    >
      <ui-lib-avatar label="JD" name="Jane Doe" />
      <ui-lib-avatar label="AB" name="Alex Brown" />
    </ui-lib-avatar-group>
  `,
})
class AvatarGroupA11yHostComponent {
  public readonly groupAriaLabel: WritableSignal<string | null> = signal<string | null>(
    'Project team',
  );
  public readonly overflowCount: WritableSignal<number> = signal<number>(2);
  public readonly overflowAriaLabel: WritableSignal<string | null> = signal<string | null>(null);
}

@Component({
  standalone: true,
  imports: [Avatar, AvatarGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-avatar label="AA" name="Alex Avery" />
    <ui-lib-avatar-group ariaLabel="Contributors">
      <ui-lib-avatar label="BB" name="Blair Brown" />
    </ui-lib-avatar-group>
  `,
})
class AvatarMultiInstanceHostComponent {}

async function createFixture<T>(hostComponent: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

describe('Avatar accessibility', (): void => {
  it('uses role="img" for standalone avatars', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    expect(queryEl<HTMLElement>(fixture, 'ui-lib-avatar')?.getAttribute('role')).toBe('img');
  });

  it('uses explicit imageAlt text when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.image.set('/assets/avatar.png');
    fixture.componentInstance.imageAlt.set('Jane Doe portrait');
    fixture.detectChanges();

    expect(queryEl<HTMLImageElement>(fixture, '.ui-lib-avatar__image')?.getAttribute('alt')).toBe(
      'Jane Doe portrait',
    );
  });

  it('falls back image alt to name when imageAlt is empty', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.image.set('/assets/avatar.png');
    fixture.componentInstance.name.set('Jane Doe');
    fixture.detectChanges();

    expect(queryEl<HTMLImageElement>(fixture, '.ui-lib-avatar__image')?.getAttribute('alt')).toBe(
      'Jane Doe',
    );
    expect(queryEl<HTMLElement>(fixture, 'ui-lib-avatar')?.getAttribute('aria-label')).toBe(
      'Jane Doe',
    );
  });

  it('falls back image alt to label when name is absent', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.image.set('/assets/avatar.png');
    fixture.componentInstance.label.set('JD');
    fixture.detectChanges();

    expect(queryEl<HTMLImageElement>(fixture, '.ui-lib-avatar__image')?.getAttribute('alt')).toBe(
      'JD',
    );
  });

  it('uses name for initials aria-labels', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.label.set('JD');
    fixture.componentInstance.name.set('Jane Doe');
    fixture.detectChanges();

    expect(queryEl<HTMLElement>(fixture, 'ui-lib-avatar')?.getAttribute('aria-label')).toBe(
      'Jane Doe',
    );
  });

  it('ensures icon avatars have an aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.icon.set('pi pi-user');
    fixture.detectChanges();

    expect(queryEl<HTMLElement>(fixture, 'ui-lib-avatar')?.getAttribute('aria-label')).toBe(
      'Avatar',
    );
  });

  it('allows ariaLabel override on icon avatars', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.icon.set('pi pi-user');
    fixture.componentInstance.ariaLabel.set('Guest profile');
    fixture.detectChanges();

    expect(queryEl<HTMLElement>(fixture, 'ui-lib-avatar')?.getAttribute('aria-label')).toBe(
      'Guest profile',
    );
  });

  it('marks avatar internals as decorative', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.image.set('/assets/avatar.png');
    fixture.detectChanges();
    expect(
      queryEl<HTMLImageElement>(fixture, '.ui-lib-avatar__image')?.getAttribute('aria-hidden'),
    ).toBe('true');

    fixture.componentInstance.image.set(null);
    fixture.componentInstance.label.set('JD');
    fixture.detectChanges();
    expect(
      queryEl<HTMLElement>(fixture, '.ui-lib-avatar__label')?.getAttribute('aria-hidden'),
    ).toBe('true');

    fixture.componentInstance.label.set(null);
    fixture.componentInstance.icon.set('pi pi-user');
    fixture.detectChanges();
    expect(queryEl<HTMLElement>(fixture, '.ui-lib-avatar__icon')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('renders avatar groups as role="list"', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarGroupA11yHostComponent> = await createFixture(
      AvatarGroupA11yHostComponent,
    );
    expect(queryEl<HTMLElement>(fixture, 'ui-lib-avatar-group')?.getAttribute('role')).toBe('list');
  });

  it('renders grouped avatars as listitems', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarGroupA11yHostComponent> = await createFixture(
      AvatarGroupA11yHostComponent,
    );
    const avatars: HTMLElement[] = queryAllEl<HTMLElement>(fixture, 'ui-lib-avatar');
    expect(avatars.length).toBe(2);
    avatars.forEach((avatar: HTMLElement): void => {
      expect(avatar.getAttribute('role')).toBe('listitem');
    });
  });

  it('announces overflow with an accessible listitem label', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarGroupA11yHostComponent> = await createFixture(
      AvatarGroupA11yHostComponent,
    );
    const overflow: HTMLElement | null = queryEl<HTMLElement>(
      fixture,
      '.ui-lib-avatar-group__overflow',
    );

    expect(overflow?.getAttribute('role')).toBe('listitem');
    expect(overflow?.textContent.trim()).toBe('+2');
    expect(overflow?.getAttribute('aria-label')).toBe('2 more avatar(s) not shown');
  });

  it('generates unique ids across avatar and group instances', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarMultiInstanceHostComponent> = await createFixture(
      AvatarMultiInstanceHostComponent,
    );
    const avatars: HTMLElement[] = queryAllEl<HTMLElement>(fixture, 'ui-lib-avatar');
    const groups: HTMLElement[] = queryAllEl<HTMLElement>(fixture, 'ui-lib-avatar-group');

    expect(avatars[0]?.id).toMatch(/^ui-lib-avatar-\d+$/);
    expect(avatars[1]?.id).toMatch(/^ui-lib-avatar-\d+$/);
    expect(avatars[0]?.id).not.toBe(avatars[1]?.id);
    expect(groups[0]?.id).toMatch(/^ui-lib-avatar-group-\d+$/);
  });

  it('passes axe for default initials avatar', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.label.set('JD');
    fixture.componentInstance.name.set('Jane Doe');
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe for image avatar with computed alt', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarA11yHostComponent> =
      await createFixture(AvatarA11yHostComponent);
    fixture.componentInstance.image.set('/assets/avatar.png');
    fixture.componentInstance.name.set('Jane Doe');
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe for avatar group with overflow indicator', async (): Promise<void> => {
    const fixture: ComponentFixture<AvatarGroupA11yHostComponent> = await createFixture(
      AvatarGroupA11yHostComponent,
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
