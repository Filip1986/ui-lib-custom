import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { FloatLabelComponent } from './float-label';

declare const require: (moduleName: string) => unknown;

// ─── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <ui-lib-float-label>
      <input id="fl-over-input" type="text" placeholder=" " />
      <label for="fl-over-input">Username</label>
    </ui-lib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OverVariantHost {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <ui-lib-float-label variant="in">
      <input id="fl-in-input" type="text" placeholder=" " />
      <label for="fl-in-input">Email</label>
    </ui-lib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InVariantHost {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <ui-lib-float-label variant="on">
      <input id="fl-on-input" type="text" placeholder=" " />
      <label for="fl-on-input">City</label>
    </ui-lib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnVariantHost {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <ui-lib-float-label>
      <input id="fl-filled-input" type="text" placeholder=" " value="Ada" />
      <label for="fl-filled-input">First Name</label>
    </ui-lib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FilledStateHost {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <ui-lib-float-label>
      <textarea id="fl-textarea" placeholder=" "> </textarea>
      <label for="fl-textarea">Bio</label>
    </ui-lib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TextareaVariantHost {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <ui-lib-float-label>
      <input type="text" />
      <label>Generated label</label>
    </ui-lib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GeneratedAssociationHost {}

// ─── Shared setup ─────────────────────────────────────────────────────────────

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

function getFloatLabel(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-float-label') as HTMLElement;
}

function getLabelElement(fixture: ComponentFixture<unknown>): HTMLLabelElement {
  return (fixture.nativeElement as HTMLElement).querySelector('label') as HTMLLabelElement;
}

function getInputElement(
  fixture: ComponentFixture<unknown>,
): HTMLInputElement | HTMLTextAreaElement {
  const input: HTMLInputElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    'input',
  );
  if (input !== null) {
    return input;
  }
  return (fixture.nativeElement as HTMLElement).querySelector('textarea') as HTMLTextAreaElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('FloatLabel Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
  });

  // ── axe-core automated checks ─────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('passes axe in default state (variant=over)', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with variant=in', async (): Promise<void> => {
      const fixture: ComponentFixture<InVariantHost> = await setup(InVariantHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with variant=on', async (): Promise<void> => {
      const fixture: ComponentFixture<OnVariantHost> = await setup(OnVariantHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in filled state', async (): Promise<void> => {
      const fixture: ComponentFixture<FilledStateHost> = await setup(FilledStateHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with textarea', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaVariantHost> = await setup(TextareaVariantHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in focused state', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const input: HTMLInputElement = getInputElement(fixture) as HTMLInputElement;
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe when the component auto-generates label/input wiring', async (): Promise<void> => {
      const fixture: ComponentFixture<GeneratedAssociationHost> =
        await setup(GeneratedAssociationHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ── Label element type ────────────────────────────────────────────────────

  describe('label element', (): void => {
    it('uses a real <label> element, not a <span> or <div>', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const label: HTMLLabelElement = getLabelElement(fixture);
      expect(label).not.toBeNull();
      expect(label.tagName.toLowerCase()).toBe('label');
    });

    it('label has a for attribute that is not empty', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const label: HTMLLabelElement = getLabelElement(fixture);
      const forAttr: string | null = label.getAttribute('for');
      expect(forAttr).toBeTruthy();
    });

    it('label for attribute matches the input id', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const label: HTMLLabelElement = getLabelElement(fixture);
      const input: HTMLInputElement = getInputElement(fixture) as HTMLInputElement;
      expect(label.getAttribute('for')).toBe(input.id);
    });

    it('label for attribute matches the textarea id', async (): Promise<void> => {
      const fixture: ComponentFixture<TextareaVariantHost> = await setup(TextareaVariantHost);
      const label: HTMLLabelElement = getLabelElement(fixture);
      const textarea: HTMLTextAreaElement = getInputElement(fixture) as HTMLTextAreaElement;
      expect(label.getAttribute('for')).toBe(textarea.id);
    });

    it('label is always present in the DOM (not conditionally rendered)', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const floatLabel: HTMLElement = getFloatLabel(fixture);
      expect(floatLabel.querySelector('label')).not.toBeNull();
      // Simulate a value change — label stays in DOM
      const input: HTMLInputElement = getInputElement(fixture) as HTMLInputElement;
      input.value = 'test value';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(floatLabel.querySelector('label')).not.toBeNull();
    });

    it('label text content is readable', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const label: HTMLLabelElement = getLabelElement(fixture);
      expect(label.textContent!.trim()).toBe('Username');
    });

    it('auto-generates the control id and label for association when omitted by the consumer', async (): Promise<void> => {
      const fixture: ComponentFixture<GeneratedAssociationHost> =
        await setup(GeneratedAssociationHost);
      const label: HTMLLabelElement = getLabelElement(fixture);
      const input: HTMLInputElement = getInputElement(fixture) as HTMLInputElement;

      expect(input.id).toBeTruthy();
      expect(label.getAttribute('for')).toBe(input.id);
    });
  });

  // ── Font size (WCAG 1.4.4) ────────────────────────────────────────────────

  describe('font size — WCAG 1.4.4', (): void => {
    it('active/floated font-size CSS variable default is >= 11px (0.75rem)', (): void => {
      // 0.75rem at 16px base = 12px, which satisfies the ≥11px at 200% zoom requirement
      const fileSystem: { readFileSync: (filePath: string, encoding: string) => string } =
        require('fs') as { readFileSync: (filePath: string, encoding: string) => string };
      const pathModule: { join: (...parts: string[]) => string } = require('path') as {
        join: (...parts: string[]) => string;
      };
      const processModule: { cwd: () => string } = require('process') as { cwd: () => string };

      const stylesheetPath: string = pathModule.join(
        processModule.cwd(),
        'projects',
        'ui-lib-custom',
        'src',
        'lib',
        'float-label',
        'float-label.scss',
      );
      const stylesheetSource: string = fileSystem.readFileSync(stylesheetPath, 'utf8');

      // Verify the active font size token fallback is 0.75rem (12px), not smaller
      expect(stylesheetSource).toContain('--uilib-float-label-active-font-size, 0.75rem');
    });

    it('uses themed label color tokens for resting, active, and focused states', (): void => {
      const fileSystem: { readFileSync: (filePath: string, encoding: string) => string } =
        require('fs') as { readFileSync: (filePath: string, encoding: string) => string };
      const pathModule: { join: (...parts: string[]) => string } = require('path') as {
        join: (...parts: string[]) => string;
      };
      const processModule: { cwd: () => string } = require('process') as { cwd: () => string };

      const stylesheetPath: string = pathModule.join(
        processModule.cwd(),
        'projects',
        'ui-lib-custom',
        'src',
        'lib',
        'float-label',
        'float-label.scss',
      );
      const stylesheetSource: string = fileSystem.readFileSync(stylesheetPath, 'utf8');

      expect(stylesheetSource).toContain('--uilib-float-label-color');
      expect(stylesheetSource).toContain('--uilib-float-label-active-color');
      expect(stylesheetSource).toContain('--uilib-float-label-focus-color');
    });
  });

  // ── prefers-reduced-motion ────────────────────────────────────────────────

  describe('prefers-reduced-motion', (): void => {
    it('SCSS includes prefers-reduced-motion: reduce block disabling label transition', (): void => {
      const fileSystem: { readFileSync: (filePath: string, encoding: string) => string } =
        require('fs') as { readFileSync: (filePath: string, encoding: string) => string };
      const pathModule: { join: (...parts: string[]) => string } = require('path') as {
        join: (...parts: string[]) => string;
      };
      const processModule: { cwd: () => string } = require('process') as { cwd: () => string };

      const stylesheetPath: string = pathModule.join(
        processModule.cwd(),
        'projects',
        'ui-lib-custom',
        'src',
        'lib',
        'float-label',
        'float-label.scss',
      );
      const stylesheetSource: string = fileSystem.readFileSync(stylesheetPath, 'utf8');

      expect(stylesheetSource).toContain('prefers-reduced-motion: reduce');
      // Token-zero pattern: the transition token is set to none on the host so all
      // child transitions that reference var(--uilib-float-label-transition) stop.
      expect(stylesheetSource).toContain('--uilib-float-label-transition: 0ms');
    });

    it('prefers-reduced-motion block targets the float-label component host', (): void => {
      const fileSystem: { readFileSync: (filePath: string, encoding: string) => string } =
        require('fs') as { readFileSync: (filePath: string, encoding: string) => string };
      const pathModule: { join: (...parts: string[]) => string } = require('path') as {
        join: (...parts: string[]) => string;
      };
      const processModule: { cwd: () => string } = require('process') as { cwd: () => string };

      const stylesheetPath: string = pathModule.join(
        processModule.cwd(),
        'projects',
        'ui-lib-custom',
        'src',
        'lib',
        'float-label',
        'float-label.scss',
      );
      const stylesheetSource: string = fileSystem.readFileSync(stylesheetPath, 'utf8');

      // Token-zero pattern: the reduced-motion block sets the transition token to none
      // on the host (.ui-lib-float-label), which cascades to all children via CSS variables.
      expect(stylesheetSource).toContain('.ui-lib-float-label');
      expect(stylesheetSource).toContain('--uilib-float-label-transition: 0ms');
    });
  });

  describe('placeholder and pointer interaction', (): void => {
    it('auto-injects the single-space placeholder required by :placeholder-shown selectors', async (): Promise<void> => {
      const fixture: ComponentFixture<GeneratedAssociationHost> =
        await setup(GeneratedAssociationHost);
      const input: HTMLInputElement = getInputElement(fixture) as HTMLInputElement;

      expect(input.getAttribute('placeholder')).toBe(' ');
    });

    it('keeps the projected label non-interactive while it overlays the control', (): void => {
      const fileSystem: { readFileSync: (filePath: string, encoding: string) => string } =
        require('fs') as { readFileSync: (filePath: string, encoding: string) => string };
      const pathModule: { join: (...parts: string[]) => string } = require('path') as {
        join: (...parts: string[]) => string;
      };
      const processModule: { cwd: () => string } = require('process') as { cwd: () => string };

      const stylesheetPath: string = pathModule.join(
        processModule.cwd(),
        'projects',
        'ui-lib-custom',
        'src',
        'lib',
        'float-label',
        'float-label.scss',
      );
      const stylesheetSource: string = fileSystem.readFileSync(stylesheetPath, 'utf8');

      expect(stylesheetSource).toContain('pointer-events: none');
    });
  });

  // ── CSS float state — CSS-driven ──────────────────────────────────────────

  describe('float state driven by CSS', (): void => {
    it('label position is moved via CSS classes, not dynamic DOM removal', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const floatLabel: HTMLElement = getFloatLabel(fixture);
      // Label is present in resting state
      expect(floatLabel.querySelector('label')).not.toBeNull();
      // Label is still present after adding uilib-inputwrapper-filled class
      floatLabel.classList.add('uilib-inputwrapper-filled');
      fixture.detectChanges();
      expect(floatLabel.querySelector('label')).not.toBeNull();
    });

    it('variant=over applies correct host modifier class', async (): Promise<void> => {
      const fixture: ComponentFixture<OverVariantHost> = await setup(OverVariantHost);
      const floatLabel: HTMLElement = getFloatLabel(fixture);
      expect(floatLabel.classList.contains('ui-lib-float-label--over')).toBeTruthy();
    });

    it('variant=in applies correct host modifier class', async (): Promise<void> => {
      const fixture: ComponentFixture<InVariantHost> = await setup(InVariantHost);
      const floatLabel: HTMLElement = getFloatLabel(fixture);
      expect(floatLabel.classList.contains('ui-lib-float-label--in')).toBeTruthy();
    });

    it('variant=on applies correct host modifier class', async (): Promise<void> => {
      const fixture: ComponentFixture<OnVariantHost> = await setup(OnVariantHost);
      const floatLabel: HTMLElement = getFloatLabel(fixture);
      expect(floatLabel.classList.contains('ui-lib-float-label--on')).toBeTruthy();
    });

    it('stylesheet uses :focus-within and :placeholder-shown-compatible selectors for float state', (): void => {
      const fileSystem: { readFileSync: (filePath: string, encoding: string) => string } =
        require('fs') as { readFileSync: (filePath: string, encoding: string) => string };
      const pathModule: { join: (...parts: string[]) => string } = require('path') as {
        join: (...parts: string[]) => string;
      };
      const processModule: { cwd: () => string } = require('process') as { cwd: () => string };

      const stylesheetPath: string = pathModule.join(
        processModule.cwd(),
        'projects',
        'ui-lib-custom',
        'src',
        'lib',
        'float-label',
        'float-label.scss',
      );
      const stylesheetSource: string = fileSystem.readFileSync(stylesheetPath, 'utf8');

      expect(stylesheetSource).toContain(':focus-within label');
      expect(stylesheetSource).toContain(':not(:placeholder-shown)');
    });
  });
});
