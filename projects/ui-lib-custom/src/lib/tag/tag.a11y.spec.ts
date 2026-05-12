import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type Type,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Tag } from './tag';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

function buildMockTheme(): {
  variant: WritableSignal<ThemeVariant>;
  setVariant: (value: ThemeVariant) => void;
  getPreset: () => ThemePreset;
  preset: () => ThemePreset;
} {
  const variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
  const buildPreset: () => ThemePreset = (): ThemePreset => ({
    id: 'tag-a11y-preset',
    name: 'Tag A11y Preset',
    variant: 'material',
    shape: 'rounded',
    density: 'default',
    darkMode: 'light',
    colors: {
      primary: '#000000',
      secondary: '#000000',
      success: '#000000',
      danger: '#000000',
      warning: '#000000',
      info: '#000000',
      surface: '#000000',
      background: '#000000',
    },
    fonts: { heading: 'Inter', body: 'Inter', mono: 'monospace' },
    icons: {
      defaultLibrary: 'lucide',
      defaultSize: 'md',
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
    createdAt: 0,
    updatedAt: 0,
  });

  return {
    variant,
    setVariant: (value: ThemeVariant): void => variant.set(value),
    getPreset: buildPreset,
    preset: buildPreset,
  };
}

@Component({
  standalone: true,
  imports: [Tag],
  template: `
    <div role="region" aria-label="Tag examples">
      <ui-lib-tag value="Angular" />
      <ui-lib-tag value="React" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicTagHostComponent {}

@Component({
  standalone: true,
  imports: [Tag],
  template: `
    <div role="region" aria-label="Tag icon example">
      <ui-lib-tag value="Angular" icon="pi pi-bolt" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class IconTagHostComponent {}

@Component({
  standalone: true,
  imports: [Tag],
  template: `
    <div role="region" aria-label="Dismissible tags">
      <ui-lib-tag value="Python" [dismissible]="true" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DismissibleTagHostComponent {}

@Component({
  standalone: true,
  imports: [Tag],
  template: `
    <div role="region" aria-label="Dismissible empty tag">
      <ui-lib-tag [dismissible]="true" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DismissibleNoValueHostComponent {}

@Component({
  standalone: true,
  imports: [Tag],
  template: `
    <div role="region" aria-label="Dismissible tags">
      <ui-lib-tag value="Angular" [dismissible]="true" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DismissKeyboardHostComponent {}

async function createFixture<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function query<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

describe('Tag Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  it('basic tags should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTagHostComponent> =
      await createFixture(BasicTagHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('icon tag should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<IconTagHostComponent> =
      await createFixture(IconTagHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('dismissible tag should have no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissibleTagHostComponent> = await createFixture(
      DismissibleTagHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('tag host should expose role="status" by default', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTagHostComponent> =
      await createFixture(BasicTagHostComponent);
    const tag: HTMLElement | null = query(fixture, 'ui-lib-tag');
    expect(tag?.getAttribute('role')).toBe('status');
  });

  it('dismissible tag host should expose role="group"', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissibleTagHostComponent> = await createFixture(
      DismissibleTagHostComponent
    );
    const tag: HTMLElement | null = query(fixture, 'ui-lib-tag');
    expect(tag?.getAttribute('role')).toBe('group');
  });

  it('tag host should set aria-label from value', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTagHostComponent> =
      await createFixture(BasicTagHostComponent);
    const tag: HTMLElement | null = query(fixture, 'ui-lib-tag');
    expect(tag?.getAttribute('aria-label')).toBe('Angular');
  });

  it('leading icon should be aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<IconTagHostComponent> =
      await createFixture(IconTagHostComponent);
    const icon: HTMLElement | null = query(fixture, '.ui-lib-tag__icon');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('dismiss button should include tag value in aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissibleTagHostComponent> = await createFixture(
      DismissibleTagHostComponent
    );
    const button: HTMLButtonElement | null = query(fixture, '.ui-lib-tag__remove-button');
    expect(button?.getAttribute('aria-label')).toBe('Remove Python tag');
  });

  it('dismiss button should fallback to "Remove tag" when value is missing', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissibleNoValueHostComponent> = await createFixture(
      DismissibleNoValueHostComponent
    );
    const button: HTMLButtonElement | null = query(fixture, '.ui-lib-tag__remove-button');
    expect(button?.getAttribute('aria-label')).toBe('Remove tag');
  });

  it('dismiss button icon should be aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissibleTagHostComponent> = await createFixture(
      DismissibleTagHostComponent
    );
    const icon: HTMLElement | null = query(fixture, '.ui-lib-tag__remove-button span');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('dismiss button should use native button semantics', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissibleTagHostComponent> = await createFixture(
      DismissibleTagHostComponent
    );
    const button: HTMLButtonElement | null = query(fixture, '.ui-lib-tag__remove-button');
    expect(button?.tagName.toLowerCase()).toBe('button');
    expect(button?.type).toBe('button');
  });

  it('dismiss button should be keyboard focusable', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissKeyboardHostComponent> = await createFixture(
      DismissKeyboardHostComponent
    );
    const button: HTMLButtonElement = query(
      fixture,
      '.ui-lib-tag__remove-button'
    ) as HTMLButtonElement;
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('each tag instance should have a unique generated id', async (): Promise<void> => {
    const fixture: ComponentFixture<BasicTagHostComponent> =
      await createFixture(BasicTagHostComponent);
    const tags: NodeListOf<HTMLElement> = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'ui-lib-tag'
    );
    const ids: string[] = Array.from(tags).map(
      (tag: HTMLElement): string => tag.getAttribute('id') ?? ''
    );
    ids.forEach((id: string): void => {
      expect(id).toMatch(/^ui-lib-tag-\d+$/);
    });
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('dismiss button click should emit removed output once', async (): Promise<void> => {
    const fixture: ComponentFixture<DismissibleTagHostComponent> = await createFixture(
      DismissibleTagHostComponent
    );
    const tagInstance: Tag = fixture.debugElement.children[0].children[0].componentInstance as Tag;
    let emissionCount: number = 0;
    tagInstance.removed.subscribe((): void => {
      emissionCount += 1;
    });

    const button: HTMLButtonElement = query(
      fixture,
      '.ui-lib-tag__remove-button'
    ) as HTMLButtonElement;
    button.click();

    expect(emissionCount).toBe(1);
  });
});
