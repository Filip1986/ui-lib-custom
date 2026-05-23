import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PasswordComponent } from '../password/password.component';
import { UiLibInput } from '../input/input';
import { InputMaskComponent } from '../input-mask/input-mask.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { IconFieldComponent } from './icon-field';
import { InputIconComponent } from './input-icon';

declare const __dirname: string;
declare function require(moduleName: string): unknown;

const { readFileSync } = require('fs') as {
  readFileSync: (path: string, encoding: string) => string;
};
const { join } = require('path') as {
  join: (...paths: string[]) => string;
};
const ICON_FIELD_STYLES: string = readFileSync(join(__dirname, 'icon-field.scss'), 'utf8');

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon styleClass="pi pi-search" />
      <input type="text" aria-label="Search" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultIconFieldA11yHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field iconPosition="right">
      <input type="text" aria-label="Email" />
      <ui-lib-input-icon styleClass="pi pi-envelope" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RightIconFieldA11yHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon
        [decorative]="false"
        ariaLabel="Warning status"
        styleClass="pi pi-exclamation-triangle"
      />
      <input type="text" aria-label="Amount" aria-describedby="amount-help" />
      <span id="amount-help">Warning state is described by helper text.</span>
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InformativeIconFieldHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent, UiLibInput],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon styleClass="pi pi-user" />
      <ui-lib-input label="Username" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class UiLibInputIconFieldHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent, PasswordComponent],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon styleClass="pi pi-lock" />
      <ui-lib-password ariaLabel="Password" [feedback]="false" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PasswordIconFieldHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent, InputMaskComponent],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon styleClass="pi pi-phone" />
      <ui-lib-input-mask aria-label="Phone number" mask="999-999-9999" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputMaskIconFieldHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent, InputNumberComponent],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon styleClass="pi pi-dollar" />
      <ui-lib-input-number ariaLabel="Amount" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputNumberIconFieldHostComponent {}

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getInputIcon(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.debugElement.query(By.css('ui-lib-input-icon')).nativeElement as HTMLElement;
}

function getInjectedStylesText(): string {
  return ICON_FIELD_STYLES;
}

describe('IconField Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  describe('axe-core', (): void => {
    it('default icon field has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultIconFieldA11yHostComponent> = await setup(
        DefaultIconFieldA11yHostComponent
      );
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('informative icon field has no accessibility violations', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconFieldHostComponent> = await setup(
        InformativeIconFieldHostComponent
      );
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  describe('decorative icon defaults', (): void => {
    it('marks input icons as aria-hidden by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultIconFieldA11yHostComponent> = await setup(
        DefaultIconFieldA11yHostComponent
      );

      expect(getInputIcon(fixture).getAttribute('aria-hidden')).toBe('true');
    });

    it('keeps decorative input icons out of the tab order', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultIconFieldA11yHostComponent> = await setup(
        DefaultIconFieldA11yHostComponent
      );

      expect(getInputIcon(fixture).getAttribute('tabindex')).toBe('-1');
      expect(getInputIcon(fixture).tabIndex).toBe(-1);
    });

    it('keeps pointer events disabled on the icon container', async (): Promise<void> => {
      await setup(DefaultIconFieldA11yHostComponent);

      expect(getInjectedStylesText()).toMatch(/\.ui-lib-input-icon[\s\S]*pointer-events:\s*none/);
    });
  });

  describe('informative icon opt-in', (): void => {
    it('allows informative icons to opt out of aria-hidden', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconFieldHostComponent> = await setup(
        InformativeIconFieldHostComponent
      );

      expect(getInputIcon(fixture).getAttribute('aria-hidden')).toBeNull();
    });

    it('uses role img when an informative icon label is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<InformativeIconFieldHostComponent> = await setup(
        InformativeIconFieldHostComponent
      );

      expect(getInputIcon(fixture).getAttribute('role')).toBe('img');
      expect(getInputIcon(fixture).getAttribute('aria-label')).toBe('Warning status');
    });
  });

  describe('padding and composability', (): void => {
    it('increases left padding for native inputs when a left icon is present', async (): Promise<void> => {
      await setup(DefaultIconFieldA11yHostComponent);

      expect(getInjectedStylesText()).toMatch(
        /\.ui-lib-icon-field--left[\s\S]*padding-left:\s*var\(--uilib-icon-field-input-padding-with-icon,\s*2\.5rem\)/
      );
    });

    it('increases right padding for native inputs when a right icon is present', async (): Promise<void> => {
      await setup(RightIconFieldA11yHostComponent);

      expect(getInjectedStylesText()).toMatch(
        /\.ui-lib-icon-field--right[\s\S]*padding-right:\s*var\(--uilib-icon-field-input-padding-with-icon,\s*2\.5rem\)/
      );
    });

    it('applies icon-field padding to ui-lib-input internals', async (): Promise<void> => {
      await setup(UiLibInputIconFieldHostComponent);

      expect(getInjectedStylesText()).toContain('.ui-lib-icon-field--left > ui-lib-input input');
    });

    it('applies icon-field padding to password internals', async (): Promise<void> => {
      await setup(PasswordIconFieldHostComponent);

      expect(getInjectedStylesText()).toContain('.ui-lib-icon-field--left > ui-lib-password input');
    });

    it('applies icon-field padding to input mask internals', async (): Promise<void> => {
      await setup(InputMaskIconFieldHostComponent);

      expect(getInjectedStylesText()).toContain(
        '.ui-lib-icon-field--left > ui-lib-input-mask input'
      );
    });

    it('applies icon-field padding to input number internals', async (): Promise<void> => {
      await setup(InputNumberIconFieldHostComponent);

      expect(getInjectedStylesText()).toContain(
        '.ui-lib-icon-field--left > ui-lib-input-number input'
      );
    });
  });
});
