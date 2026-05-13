import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { InputMaskComponent } from './input-mask.component';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      Phone
      <uilib-input-mask mask="(999) 999-9999" />
    </label>
  `,
})
class InputMaskDefaultHostComponent {}

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span id="phone-label">Phone number</span>
    <uilib-input-mask
      id="phone-id"
      mask="(999) 999-9999"
      ariaLabel="Phone"
      ariaLabelledBy="phone-label"
      maskHint="3 digits, 3 digits, 4 digits"
    />
  `,
})
class InputMaskLabelHostComponent {}

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      Invalid
      <uilib-input-mask mask="(999) 999-9999" [invalid]="true" errorMessage="Invalid phone" />
    </label>
  `,
})
class InputMaskInvalidHostComponent {}

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      Disabled
      <uilib-input-mask mask="99/99/9999" [disabled]="true" />
    </label>
    <label>
      Readonly
      <uilib-input-mask mask="99/99/9999" [readonly]="true" />
    </label>
  `,
})
class InputMaskStateHostComponent {}

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      Incomplete allowed
      <uilib-input-mask mask="(999) 999-9999" [autoClear]="false" errorMessage="Complete phone" />
    </label>
  `,
})
class InputMaskIncompleteHostComponent {}

@Component({
  standalone: true,
  imports: [InputMaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <uilib-input-mask mask="99/99/9999" />
    <uilib-input-mask mask="99/99/9999" />
  `,
})
class InputMaskMultipleInstanceHostComponent {}

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}

function getSingleInput<T>(fixture: ComponentFixture<T>): HTMLInputElement {
  return (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
}

function sendKeypress(input: HTMLInputElement, character: string): void {
  const keyCode: number = character.charCodeAt(0);
  const event: KeyboardEvent = new KeyboardEvent('keypress', {
    key: character,
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, 'which', { value: keyCode });
  Object.defineProperty(event, 'keyCode', { value: keyCode });
  input.dispatchEvent(event);
}

describe('InputMask Accessibility', (): void => {
  it('axe: has no accessibility violations for a labeled default input mask', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskDefaultHostComponent> = await createFixture(
      InputMaskDefaultHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: has no accessibility violations when invalid is set', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskInvalidHostComponent> = await createFixture(
      InputMaskInvalidHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe: has no accessibility violations for disabled and readonly states', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskStateHostComponent> = await createFixture(
      InputMaskStateHostComponent
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('sets aria-label when ariaLabel input is provided', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskLabelHostComponent> = await createFixture(
      InputMaskLabelHostComponent
    );
    expect(getSingleInput(fixture).getAttribute('aria-label')).toBe('Phone');
  });

  it('sets aria-labelledby when ariaLabelledBy input is provided', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskLabelHostComponent> = await createFixture(
      InputMaskLabelHostComponent
    );
    expect(getSingleInput(fixture).getAttribute('aria-labelledby')).toBe('phone-label');
  });

  it('uses explicit id input for the native input id', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskLabelHostComponent> = await createFixture(
      InputMaskLabelHostComponent
    );
    expect(getSingleInput(fixture).id).toBe('phone-id');
  });

  it('links aria-describedby to generated hint id by default', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskDefaultHostComponent> = await createFixture(
      InputMaskDefaultHostComponent
    );
    expect(getSingleInput(fixture).getAttribute('aria-describedby')).toMatch(/-hint$/);
  });

  it('renders a default format hint using the mask value', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskDefaultHostComponent> = await createFixture(
      InputMaskDefaultHostComponent
    );
    const hint: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.uilib-input-mask-sr-only'
    );
    expect(hint).toBeTruthy();
    expect((hint as HTMLElement).textContent.trim()).toBe('Format: (999) 999-9999');
  });

  it('renders a custom format hint from maskHint input', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskLabelHostComponent> = await createFixture(
      InputMaskLabelHostComponent
    );
    const hint: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.uilib-input-mask-sr-only'
    );
    expect(hint).toBeTruthy();
    expect((hint as HTMLElement).textContent.trim()).toBe('Format: 3 digits, 3 digits, 4 digits');
  });

  it('sets aria-invalid on externally invalid mask', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskInvalidHostComponent> = await createFixture(
      InputMaskInvalidHostComponent
    );
    expect(getSingleInput(fixture).getAttribute('aria-invalid')).toBe('true');
  });

  it('links externally invalid state to error id in aria-describedby', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskInvalidHostComponent> = await createFixture(
      InputMaskInvalidHostComponent
    );
    expect(getSingleInput(fixture).getAttribute('aria-describedby')).toContain('-error');
  });

  it('renders error element with role alert for invalid state', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskInvalidHostComponent> = await createFixture(
      InputMaskInvalidHostComponent
    );
    const error: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.uilib-input-mask-error'
    );
    expect(error).toBeTruthy();
    expect((error as HTMLElement).getAttribute('role')).toBe('alert');
  });

  it('marks incomplete masks as aria-invalid on blur when autoClear is false', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskIncompleteHostComponent> = await createFixture(
      InputMaskIncompleteHostComponent
    );
    const input: HTMLInputElement = getSingleInput(fixture);

    input.value = '123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain('-error');
  });

  it('keeps complete masks aria-valid after blur', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskIncompleteHostComponent> = await createFixture(
      InputMaskIncompleteHostComponent
    );
    const input: HTMLInputElement = getSingleInput(fixture);

    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    for (const character of '1234567890') {
      sendKeypress(input, character);
      fixture.detectChanges();
    }

    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('announces blocked characters via polite live region', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskDefaultHostComponent> = await createFixture(
      InputMaskDefaultHostComponent
    );
    const input: HTMLInputElement = getSingleInput(fixture);

    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    sendKeypress(input, 'A');
    fixture.detectChanges();

    const liveRegion: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '[aria-live="polite"].uilib-input-mask-sr-only'
    );
    expect(liveRegion).toBeTruthy();
    expect((liveRegion as HTMLElement).textContent.trim()).toContain(
      'Character "A" does not match'
    );
  });

  it('uses aria-valuetext for user-entered characters', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskDefaultHostComponent> = await createFixture(
      InputMaskDefaultHostComponent
    );
    const input: HTMLInputElement = getSingleInput(fixture);

    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    for (const character of '123') {
      sendKeypress(input, character);
      fixture.detectChanges();
    }

    expect(input.getAttribute('aria-valuetext')).toBe('123');
  });

  it('reflects disabled and readonly states on native inputs', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskStateHostComponent> = await createFixture(
      InputMaskStateHostComponent
    );
    const inputs: NodeListOf<HTMLInputElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('input');

    expect(inputs).toHaveLength(2);
    expect(inputs[0]?.disabled).toBeTruthy();
    expect(inputs[1]?.readOnly).toBeTruthy();
  });

  it('generates unique ids for multiple input-mask instances', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskMultipleInstanceHostComponent> = await createFixture(
      InputMaskMultipleInstanceHostComponent
    );
    const inputs: NodeListOf<HTMLInputElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('input');

    expect(inputs).toHaveLength(2);
    expect(inputs[0]?.id).toMatch(/^ui-lib-input-mask-\d+$/);
    expect(inputs[1]?.id).toMatch(/^ui-lib-input-mask-\d+$/);
    expect(inputs[0]?.id).not.toBe(inputs[1]?.id);
  });

  it('keeps aria-describedby focused on hint when not invalid', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskDefaultHostComponent> = await createFixture(
      InputMaskDefaultHostComponent
    );
    const describedBy: string | null = getSingleInput(fixture).getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(describedBy).toContain('-hint');
    expect(describedBy).not.toContain('-error');
  });

  it('includes both hint and error ids in aria-describedby when invalid', async (): Promise<void> => {
    const fixture: ComponentFixture<InputMaskInvalidHostComponent> = await createFixture(
      InputMaskInvalidHostComponent
    );
    const describedBy: string | null = getSingleInput(fixture).getAttribute('aria-describedby');

    expect(describedBy).toContain('-hint');
    expect(describedBy).toContain('-error');
  });
});
