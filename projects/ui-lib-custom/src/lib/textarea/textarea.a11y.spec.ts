import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { UiLibTextarea } from './textarea';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-textarea ariaLabel="Message" />`,
})
class TextareaAriaLabelHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span id="textarea-label-source">Message</span>
    <ui-lib-textarea ariaLabelledBy="textarea-label-source" />
  `,
})
class TextareaAriaLabelledByHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-textarea label="Description" />`,
})
class TextareaVisibleLabelHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ui-lib-textarea ariaLabel="Details" [hint]="'Include enough context.'" /> `,
})
class TextareaHintHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-textarea ariaLabel="Details" [invalid]="true" [hint]="'Explain the issue.'">
      <span textareaError>Details are required.</span>
    </ui-lib-textarea>
  `,
})
class TextareaInvalidHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-textarea ariaLabel="Required details" [required]="true" />
    <ui-lib-textarea ariaLabel="Readonly details" [readonly]="true" />
    <ui-lib-textarea ariaLabel="Disabled details" [disabled]="true" />
  `,
})
class TextareaStateHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-textarea ariaLabel="First message" />
    <ui-lib-textarea ariaLabel="Second message" />
  `,
})
class TextareaMultipleInstanceHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-textarea ariaLabel="Comment">
      <span textareaHint>Projected hint content.</span>
    </ui-lib-textarea>
  `,
})
class TextareaProjectedHintHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-textarea ariaLabel="Disabled details" [disabled]="true" />`,
})
class TextareaDisabledHostComponent {}

@Component({
  standalone: true,
  imports: [UiLibTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-textarea ariaLabel="Readonly details" [readonly]="true" />`,
})
class TextareaReadonlyHostComponent {}

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getTextareas<T>(fixture: ComponentFixture<T>): HTMLTextAreaElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll('textarea')
  ) as HTMLTextAreaElement[];
}

function getTextarea<T>(fixture: ComponentFixture<T>, index: number = 0): HTMLTextAreaElement {
  return getTextareas(fixture)[index] as HTMLTextAreaElement;
}

describe('Textarea Accessibility', (): void => {
  describe('label association', (): void => {
    it('textarea has accessible name via ariaLabel input', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaAriaLabelHostComponent> = await createFixture(
        TextareaAriaLabelHostComponent
      );

      expect(getTextarea(fixture).getAttribute('aria-label')).toBe('Message');
    });

    it('textarea has accessible name via ariaLabelledBy input', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaAriaLabelledByHostComponent> = await createFixture(
        TextareaAriaLabelledByHostComponent
      );

      expect(getTextarea(fixture).getAttribute('aria-labelledby')).toBe('textarea-label-source');
    });

    it('textarea keeps native label association via generated id', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaVisibleLabelHostComponent> = await createFixture(
        TextareaVisibleLabelHostComponent
      );
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const label: HTMLLabelElement = root.querySelector('label') as HTMLLabelElement;
      const textarea: HTMLTextAreaElement = getTextarea(fixture);

      expect(label.htmlFor).toBe(textarea.id);
      expect(textarea.id).toMatch(/^ui-lib-textarea-\d+$/);
    });

    it('textarea does not use placeholder as an aria-label fallback', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [UiLibTextarea],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ui-lib-textarea placeholder="Placeholder only" />`,
      })
      class TextareaPlaceholderOnlyHostComponent {}

      const fixture: ComponentFixture<TextareaPlaceholderOnlyHostComponent> = await createFixture(
        TextareaPlaceholderOnlyHostComponent
      );

      expect(getTextarea(fixture).getAttribute('aria-label')).toBeNull();
    });

    it('textarea id is unique per instance', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaMultipleInstanceHostComponent> = await createFixture(
        TextareaMultipleInstanceHostComponent
      );
      const [firstTextarea, secondTextarea]: HTMLTextAreaElement[] = getTextareas(fixture);

      expect(firstTextarea.id).not.toBe(secondTextarea.id);
    });
  });

  describe('validation state', (): void => {
    it('aria-invalid="true" when invalid is set', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaInvalidHostComponent> = await createFixture(
        TextareaInvalidHostComponent
      );

      expect(getTextarea(fixture).getAttribute('aria-invalid')).toBe('true');
    });

    it('aria-invalid is absent when not invalid', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaAriaLabelHostComponent> = await createFixture(
        TextareaAriaLabelHostComponent
      );

      expect(getTextarea(fixture).getAttribute('aria-invalid')).toBeNull();
    });

    it('aria-describedby points to the error element id', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaInvalidHostComponent> = await createFixture(
        TextareaInvalidHostComponent
      );
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const error: HTMLElement = root.querySelector('.ui-lib-textarea__error') as HTMLElement;
      const describedBy: string = getTextarea(fixture).getAttribute('aria-describedby') ?? '';

      expect(describedBy).toContain(error.id);
    });

    it('aria-describedby also includes the hint id when hint text is present', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaInvalidHostComponent> = await createFixture(
        TextareaInvalidHostComponent
      );
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const hint: HTMLElement = root.querySelector('.ui-lib-textarea__hint') as HTMLElement;
      const describedBy: string = getTextarea(fixture).getAttribute('aria-describedby') ?? '';

      expect(describedBy).toContain(hint.id);
    });

    it('error element has role="alert"', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaInvalidHostComponent> = await createFixture(
        TextareaInvalidHostComponent
      );
      const error: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-textarea__error'
      ) as HTMLElement;

      expect(error.getAttribute('role')).toBe('alert');
    });

    it('renders projected [textareaError] content inside the error region', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaInvalidHostComponent> = await createFixture(
        TextareaInvalidHostComponent
      );
      const error: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-textarea__error'
      ) as HTMLElement;

      expect(error.textContent.trim()).toBe('Details are required.');
    });
  });

  describe('hint association', (): void => {
    it('links hint input content through aria-describedby', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaHintHostComponent> =
        await createFixture(TextareaHintHostComponent);
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const hint: HTMLElement = root.querySelector('.ui-lib-textarea__hint') as HTMLElement;

      expect(getTextarea(fixture).getAttribute('aria-describedby')).toBe(hint.id);
    });

    it('renders projected [textareaHint] content', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaProjectedHintHostComponent> = await createFixture(
        TextareaProjectedHintHostComponent
      );
      const hint: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-textarea__hint'
      ) as HTMLElement;

      expect(hint.textContent.trim()).toBe('Projected hint content.');
    });
  });

  describe('required', (): void => {
    it('aria-required="true" when required is set', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaStateHostComponent> = await createFixture(
        TextareaStateHostComponent
      );

      expect(getTextarea(fixture, 0).getAttribute('aria-required')).toBe('true');
    });
  });

  describe('readonly/disabled', (): void => {
    it('readonly textarea has aria-readonly="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaStateHostComponent> = await createFixture(
        TextareaStateHostComponent
      );

      expect(getTextarea(fixture, 1).getAttribute('aria-readonly')).toBe('true');
    });

    it('readonly textarea has native readonly attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaStateHostComponent> = await createFixture(
        TextareaStateHostComponent
      );

      expect(getTextarea(fixture, 1).hasAttribute('readonly')).toBe(true);
    });

    it('disabled textarea has native disabled attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaStateHostComponent> = await createFixture(
        TextareaStateHostComponent
      );

      expect(getTextarea(fixture, 2).disabled).toBe(true);
    });

    it('disabled textarea exposes aria-disabled="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaStateHostComponent> = await createFixture(
        TextareaStateHostComponent
      );

      expect(getTextarea(fixture, 2).getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe — default state with ariaLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaAriaLabelHostComponent> = await createFixture(
        TextareaAriaLabelHostComponent
      );

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — invalid state', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaInvalidHostComponent> = await createFixture(
        TextareaInvalidHostComponent
      );

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — disabled state', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaDisabledHostComponent> = await createFixture(
        TextareaDisabledHostComponent
      );

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — readonly state', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaReadonlyHostComponent> = await createFixture(
        TextareaReadonlyHostComponent
      );

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
