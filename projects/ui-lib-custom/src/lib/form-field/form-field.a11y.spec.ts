import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { FormField } from './form-field';

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field label="Email">
      <input type="email" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field label="Email" hint="Use your work email">
      <input type="email" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HintHostComponent {}

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field
      label="Email"
      [invalid]="true"
      error="Email is required"
      hint="Use your work email"
    >
      <input type="email" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InvalidHostComponent {}

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field label="Email" [required]="true">
      <input type="email" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RequiredHostComponent {}

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field label="Email" [disabled]="true">
      <input type="email" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {}

@Component({
  standalone: true,
  imports: [FormField],
  template: `
    <ui-lib-form-field label="Email" inputId="custom-email-id">
      <input type="email" />
    </ui-lib-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CustomIdHostComponent {}

async function createFixture<T>(hostType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostType],
    providers: [
      provideZonelessChangeDetection(),
      {
        provide: LiveAnnouncerService,
        useValue: { announceError: jest.fn().mockResolvedValue(undefined) },
      },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getInputElement(fixture: ComponentFixture<unknown>): HTMLInputElement {
  return (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
}

function getLabelElement(fixture: ComponentFixture<unknown>): HTMLLabelElement {
  return (fixture.nativeElement as HTMLElement).querySelector('label') as HTMLLabelElement;
}

describe('FormField Accessibility', (): void => {
  afterEach((): void => {
    document.body.querySelectorAll('ui-lib-form-field').forEach((element: Element): void => {
      element.remove();
    });
    TestBed.resetTestingModule();
  });

  it('generates input id for projected native input', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    expect(inputElement.id).toMatch(/^form-field-\d+-input$/);
  });

  it('label htmlFor points to input id', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    const labelElement: HTMLLabelElement = getLabelElement(fixture);
    expect(labelElement.getAttribute('for')).toBe(inputElement.id);
  });

  it('label has generated id', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    const labelElement: HTMLLabelElement = getLabelElement(fixture);
    expect(labelElement.id).toMatch(/^form-field-\d+-label$/);
  });

  it('input links to label id via aria-labelledby', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    const labelElement: HTMLLabelElement = getLabelElement(fixture);
    expect(inputElement.getAttribute('aria-labelledby')).toBe(labelElement.id);
  });

  it('input id respects inputId override', async (): Promise<void> => {
    const fixture: ComponentFixture<CustomIdHostComponent> =
      await createFixture(CustomIdHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    const labelElement: HTMLLabelElement = getLabelElement(fixture);
    expect(inputElement.id).toBe('custom-email-id');
    expect(labelElement.getAttribute('for')).toBe('custom-email-id');
  });

  it('hint element renders with generated id', async (): Promise<void> => {
    const fixture: ComponentFixture<HintHostComponent> = await createFixture(HintHostComponent);
    const hintElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-hint'
    ) as HTMLElement;
    expect(hintElement.id).toMatch(/^form-field-\d+-hint$/);
  });

  it('hint text is present for screen reader consumption', async (): Promise<void> => {
    const fixture: ComponentFixture<HintHostComponent> = await createFixture(HintHostComponent);
    const hintElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-hint'
    ) as HTMLElement;
    expect((hintElement.textContent as string).trim()).toBe('Use your work email');
  });

  it('hint id is linked in aria-describedby', async (): Promise<void> => {
    const fixture: ComponentFixture<HintHostComponent> = await createFixture(HintHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    const hintElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-hint'
    ) as HTMLElement;
    expect(inputElement.getAttribute('aria-describedby')).toBe(hintElement.id);
  });

  it('error element renders when invalid and error are provided', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    const errorElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error'
    ) as HTMLElement;
    expect(errorElement).toBeTruthy();
  });

  it('error element has role=alert', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    const errorElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error'
    ) as HTMLElement;
    expect(errorElement.getAttribute('role')).toBe('alert');
  });

  it('error element has generated id', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    const errorElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error'
    ) as HTMLElement;
    expect(errorElement.id).toMatch(/^form-field-\d+-error$/);
  });

  it('error id is linked in aria-describedby when invalid', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    const errorElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error'
    ) as HTMLElement;
    expect(inputElement.getAttribute('aria-describedby')?.includes(errorElement.id)).toBe(true);
  });

  it('aria-describedby contains both hint and error ids when both are present', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    const hintElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-hint'
    ) as HTMLElement;
    const errorElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error'
    ) as HTMLElement;
    expect(inputElement.getAttribute('aria-describedby')).toBe(
      `${hintElement.id} ${errorElement.id}`
    );
  });

  it('aria-invalid=true is set on input when invalid', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    expect(inputElement.getAttribute('aria-invalid')).toBe('true');
  });

  it('aria-invalid is not present when control is valid', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    expect(inputElement.getAttribute('aria-invalid')).toBeNull();
  });

  it('required asterisk is aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<RequiredHostComponent> =
      await createFixture(RequiredHostComponent);
    const requiredIndicator: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-required-indicator'
    ) as HTMLElement;
    expect(requiredIndicator.getAttribute('aria-hidden')).toBe('true');
  });

  it('aria-required=true is set when required', async (): Promise<void> => {
    const fixture: ComponentFixture<RequiredHostComponent> =
      await createFixture(RequiredHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    expect(inputElement.getAttribute('aria-required')).toBe('true');
  });

  it('native required is set when required', async (): Promise<void> => {
    const fixture: ComponentFixture<RequiredHostComponent> =
      await createFixture(RequiredHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    expect(inputElement.required).toBe(true);
  });

  it('native disabled is set when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    expect(inputElement.disabled).toBe(true);
  });

  it('aria-disabled=true is set when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    const inputElement: HTMLInputElement = getInputElement(fixture);
    expect(inputElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('label and error ids share the same form-field prefix', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    const labelElement: HTMLLabelElement = getLabelElement(fixture);
    const errorElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-form-field-error'
    ) as HTMLElement;
    expect(errorElement.id.split('-').slice(0, 3).join('-')).toBe(
      labelElement.id.split('-').slice(0, 3).join('-')
    );
  });

  it('axe passes for default form field', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> =
      await createFixture(DefaultHostComponent);
    await checkA11y(fixture, {
      axeOptions: {
        rules: SKIP_COLOR_CONTRAST_RULES,
      },
    });
  });

  it('axe passes for form field with hint', async (): Promise<void> => {
    const fixture: ComponentFixture<HintHostComponent> = await createFixture(HintHostComponent);
    await checkA11y(fixture, {
      axeOptions: {
        rules: SKIP_COLOR_CONTRAST_RULES,
      },
    });
  });

  it('axe passes for form field with invalid error state', async (): Promise<void> => {
    const fixture: ComponentFixture<InvalidHostComponent> =
      await createFixture(InvalidHostComponent);
    await checkA11y(fixture, {
      axeOptions: {
        rules: SKIP_COLOR_CONTRAST_RULES,
      },
    });
  });

  it('axe passes for disabled form field', async (): Promise<void> => {
    const fixture: ComponentFixture<DisabledHostComponent> =
      await createFixture(DisabledHostComponent);
    await checkA11y(fixture, {
      axeOptions: {
        rules: SKIP_COLOR_CONTRAST_RULES,
      },
    });
  });
});
