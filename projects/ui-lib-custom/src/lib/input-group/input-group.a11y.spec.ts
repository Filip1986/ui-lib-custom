import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputMaskComponent } from '../input-mask';
import { InputNumberComponent } from '../input-number';
import { UiLibInput } from '../input';
import { PasswordComponent } from '../password';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { InputGroupAddonComponent } from './input-group-addon';
import { InputGroupComponent } from './input-group';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent],
  template: `
    <label for="amount-input" data-testid="amount-label">Amount</label>
    <ui-lib-input-group id="amount-group" data-testid="amount-group">
      <ui-lib-input-group-addon addonLeft>
        <span aria-hidden="true" data-testid="currency-addon">$</span>
      </ui-lib-input-group-addon>
      <input id="amount-input" type="text" data-testid="amount-input" />
      <ui-lib-input-group-addon addonRight>
        <button type="button" aria-label="Copy amount" data-testid="copy-button">
          <span aria-hidden="true">⧉</span>
        </button>
      </ui-lib-input-group-addon>
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupA11yHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent],
  template: `
    <ui-lib-input-group data-testid="slot-group">
      <ui-lib-input-group-addon addonLeft data-testid="slot-left">
        <span aria-hidden="true">https://</span>
      </ui-lib-input-group-addon>
      <input id="url-input" type="url" data-testid="slot-input" />
      <ui-lib-input-group-addon addonRight data-testid="slot-right">.com</ui-lib-input-group-addon>
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupSlotHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  template: `
    <ui-lib-input-group>
      <ui-lib-input-group-addon addonLeft>
        <span aria-hidden="true">@</span>
      </ui-lib-input-group-addon>
      <ui-lib-input label="Email" />
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupInputComposableHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputMaskComponent],
  template: `
    <label for="phone-input">Phone</label>
    <ui-lib-input-group>
      <ui-lib-input-group-addon addonLeft>
        <span aria-hidden="true" data-testid="phone-addon">+1</span>
      </ui-lib-input-group-addon>
      <ui-lib-input-mask id="phone-input" mask="(999) 999-9999" />
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupInputMaskComposableHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputNumberComponent],
  template: `
    <ui-lib-input-group>
      <ui-lib-input-group-addon addonLeft>
        <span aria-hidden="true" data-testid="number-addon">$</span>
      </ui-lib-input-group-addon>
      <ui-lib-input-number label="Price" [value]="12" />
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupInputNumberComposableHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, PasswordComponent],
  template: `
    <ui-lib-input-group>
      <ui-lib-input-group-addon addonRight>
        <span aria-hidden="true" data-testid="password-addon">🔒</span>
      </ui-lib-input-group-addon>
      <ui-lib-password label="Password" />
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupPasswordComposableHostComponent {}

const fixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  fixture.detectChanges();
  await fixture.whenStable();
  fixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getRootElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

describe('InputGroup accessibility', (): void => {
  afterEach((): void => {
    fixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    fixtures.length = 0;
    TestBed.resetTestingModule();
  });

  it('default composition has no axe violations', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupA11yHostComponent> = await setup(
      InputGroupA11yHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('decorative text addon is aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupA11yHostComponent> = await setup(
      InputGroupA11yHostComponent
    );
    const decorativeAddon: HTMLElement = getRootElement(fixture).querySelector(
      '[data-testid="currency-addon"]'
    ) as HTMLElement;

    expect(decorativeAddon.getAttribute('aria-hidden')).toBe('true');
  });

  it('decorative text addon is not focusable', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupA11yHostComponent> = await setup(
      InputGroupA11yHostComponent
    );
    const decorativeAddon: HTMLElement = getRootElement(fixture).querySelector(
      '[data-testid="currency-addon"]'
    ) as HTMLElement;

    expect(decorativeAddon.tagName.toLowerCase()).toBe('span');
    expect(decorativeAddon.getAttribute('tabindex')).toBeNull();
    expect(decorativeAddon.getAttribute('contenteditable')).toBeNull();
  });

  it('label for attribute targets the input id', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupA11yHostComponent> = await setup(
      InputGroupA11yHostComponent
    );
    const labelElement: HTMLLabelElement = getRootElement(fixture).querySelector(
      '[data-testid="amount-label"]'
    ) as HTMLLabelElement;
    const inputElement: HTMLInputElement = getRootElement(fixture).querySelector(
      '[data-testid="amount-input"]'
    ) as HTMLInputElement;

    expect(labelElement.getAttribute('for')).toBe(inputElement.id);
  });

  it('label for attribute does not target the group container', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupA11yHostComponent> = await setup(
      InputGroupA11yHostComponent
    );
    const labelElement: HTMLLabelElement = getRootElement(fixture).querySelector(
      '[data-testid="amount-label"]'
    ) as HTMLLabelElement;
    const groupElement: HTMLElement = getRootElement(fixture).querySelector(
      '[data-testid="amount-group"]'
    ) as HTMLElement;

    expect(labelElement.getAttribute('for')).not.toBe(groupElement.id);
  });

  it('button addon uses a native button element', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupA11yHostComponent> = await setup(
      InputGroupA11yHostComponent
    );
    const buttonElement: HTMLButtonElement = getRootElement(fixture).querySelector(
      '[data-testid="copy-button"]'
    ) as HTMLButtonElement;

    expect(buttonElement.tagName.toLowerCase()).toBe('button');
    expect(buttonElement.getAttribute('type')).toBe('button');
  });

  it('icon-only button addon has an aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupA11yHostComponent> = await setup(
      InputGroupA11yHostComponent
    );
    const buttonElement: HTMLButtonElement = getRootElement(fixture).querySelector(
      '[data-testid="copy-button"]'
    ) as HTMLButtonElement;

    expect(buttonElement.getAttribute('aria-label')).toBe('Copy amount');
  });

  it('supports addonLeft and addonRight slots around the input', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupSlotHostComponent> = await setup(
      InputGroupSlotHostComponent
    );
    const groupElement: HTMLElement = getRootElement(fixture).querySelector(
      '[data-testid="slot-group"]'
    ) as HTMLElement;
    const childTestIds: Array<string | null> = Array.from(groupElement.children).map(
      (childElement: Element): string | null => childElement.getAttribute('data-testid')
    );

    expect(childTestIds).toEqual(['slot-left', 'slot-input', 'slot-right']);
  });

  it('composes with ui-lib-input', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupInputComposableHostComponent> = await setup(
      InputGroupInputComposableHostComponent
    );
    const decorativeAddon: HTMLElement = fixture.debugElement.query(
      By.css('ui-lib-input-group-addon span')
    ).nativeElement as HTMLElement;

    expect(fixture.debugElement.query(By.css('ui-lib-input'))).toBeTruthy();
    expect(decorativeAddon.getAttribute('aria-hidden')).toBe('true');
  });

  it('composes with ui-lib-input-mask', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupInputMaskComposableHostComponent> = await setup(
      InputGroupInputMaskComposableHostComponent
    );
    const rootElement: HTMLElement = getRootElement(fixture);
    const decorativeAddon: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="phone-addon"]')
    ).nativeElement as HTMLElement;
    const labelElement: HTMLLabelElement = rootElement.querySelector('label') as HTMLLabelElement;
    const controlElement: HTMLElement = rootElement.querySelector('#phone-input') as HTMLElement;

    expect(fixture.debugElement.query(By.css('ui-lib-input-mask'))).toBeTruthy();
    expect(decorativeAddon.getAttribute('aria-hidden')).toBe('true');
    expect(labelElement.getAttribute('for')).toBe('phone-input');
    expect(controlElement).toBeTruthy();
  });

  it('composes with ui-lib-input-number', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupInputNumberComposableHostComponent> = await setup(
      InputGroupInputNumberComposableHostComponent
    );
    const decorativeAddon: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="number-addon"]')
    ).nativeElement as HTMLElement;

    expect(fixture.debugElement.query(By.css('ui-lib-input-number'))).toBeTruthy();
    expect(decorativeAddon.getAttribute('aria-hidden')).toBe('true');
  });

  it('composes with ui-lib-password', async (): Promise<void> => {
    const fixture: ComponentFixture<InputGroupPasswordComposableHostComponent> = await setup(
      InputGroupPasswordComposableHostComponent
    );
    const decorativeAddon: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="password-addon"]')
    ).nativeElement as HTMLElement;

    expect(fixture.debugElement.query(By.css('ui-lib-password'))).toBeTruthy();
    expect(decorativeAddon.getAttribute('aria-hidden')).toBe('true');
  });
});
