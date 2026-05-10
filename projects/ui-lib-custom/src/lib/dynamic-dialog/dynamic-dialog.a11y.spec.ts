import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { DynamicDialog } from './dynamic-dialog';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DialogService } from './dynamic-dialog.service';
import { DYNAMIC_DIALOG_CONFIG } from './dynamic-dialog.types';
import type { DynamicDialogConfig } from './dynamic-dialog.types';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ---- Guest stub component ----

@Component({
  selector: 'app-dynamic-dialog-a11y-guest',
  standalone: true,
  template: `
    <p id="guest-description">This dialog shows important information.</p>
    <button type="button" class="first-btn">First Action</button>
    <button type="button" class="second-btn">Second Action</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GuestStubComponent {}

// ---- Helpers ----

function createContainer(config: DynamicDialogConfig = {}): {
  fixture: ComponentFixture<DynamicDialog>;
  ref: DynamicDialogRef;
} {
  const ref: DynamicDialogRef = new DynamicDialogRef();
  const mergedConfig: DynamicDialogConfig = {
    header: 'Accessible Dialog',
    modal: true,
    closable: true,
    dismissableMask: false,
    blockScroll: false,
    position: 'center',
    ...config,
  };

  TestBed.configureTestingModule({
    imports: [DynamicDialog],
    providers: [
      provideZonelessChangeDetection(),
      { provide: DynamicDialogRef, useValue: ref },
      { provide: DYNAMIC_DIALOG_CONFIG, useValue: mergedConfig },
    ],
  });

  const fixture: ComponentFixture<DynamicDialog> = TestBed.createComponent(DynamicDialog);
  fixture.componentRef.setInput('componentType', null);
  fixture.detectChanges();
  TestBed.flushEffects();
  return { fixture, ref };
}

function getPanel(fixture: ComponentFixture<DynamicDialog>): HTMLElement {
  const host: HTMLElement = fixture.nativeElement as HTMLElement;
  const panel: HTMLElement | null = host.querySelector<HTMLElement>(
    '.ui-lib-dynamic-dialog__panel'
  );
  if (!panel) {
    throw new Error('Expected dialog panel to exist.');
  }
  return panel;
}

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<DynamicDialog>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

// ---- Tests ----

describe('DynamicDialog Accessibility', (): void => {
  afterEach((): void => {
    document.body.style.overflow = '';
    TestBed.resetTestingModule();
  });

  // ---- axe-core automated checks ----

  describe('axe-core automated checks', (): void => {
    it('passes axe when modal=true with header', async (): Promise<void> => {
      const { fixture } = createContainer({ header: 'Axe Test Dialog', modal: true });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe when modal=false (non-modal) with header', async (): Promise<void> => {
      const { fixture } = createContainer({ header: 'Non-Modal Dialog', modal: false });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe when no header and ariaLabel is provided', async (): Promise<void> => {
      const { fixture } = createContainer({
        header: '',
        closable: false,
        ariaLabel: 'Settings Dialog',
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe when ariaDescribedby is configured', async (): Promise<void> => {
      // Create a description element in the DOM.
      const descEl: HTMLElement = document.createElement('p');
      descEl.id = 'test-dialog-desc';
      descEl.textContent = 'This dialog collects your settings.';
      document.body.appendChild(descEl);

      const { fixture } = createContainer({
        header: 'Settings',
        ariaDescribedby: 'test-dialog-desc',
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });

      descEl.remove();
    });
  });

  // ---- ARIA attribute tests ----

  describe('ARIA attribute tests', (): void => {
    it('panel has role="dialog"', (): void => {
      const { fixture } = createContainer();
      expect(getPanel(fixture).getAttribute('role')).toBe('dialog');
    });

    it('panel has aria-modal="true" when modal=true', (): void => {
      const { fixture } = createContainer({ modal: true });
      expect(getPanel(fixture).getAttribute('aria-modal')).toBe('true');
    });

    it('panel has no aria-modal when modal=false', (): void => {
      const { fixture } = createContainer({ modal: false });
      expect(getPanel(fixture).getAttribute('aria-modal')).toBeNull();
    });

    it('panel has aria-labelledby pointing to the title element when header is provided', (): void => {
      const { fixture } = createContainer({ header: 'My Dialog' });
      const panel: HTMLElement = getPanel(fixture);
      const labelledById: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();

      const titleEl: Element | null = (fixture.nativeElement as HTMLElement).querySelector(
        `#${labelledById}`
      );
      expect(titleEl).not.toBeNull();
      expect(titleEl!.textContent!.trim()).toBe('My Dialog');
    });

    it('panel has no aria-labelledby when no header is provided', (): void => {
      const { fixture } = createContainer({ header: '', closable: false });
      expect(getPanel(fixture).getAttribute('aria-labelledby')).toBeNull();
    });

    it('panel has aria-label="Dialog" as fallback when no header and no ariaLabel configured', (): void => {
      const { fixture } = createContainer({ header: '', closable: false });
      expect(getPanel(fixture).getAttribute('aria-label')).toBe('Dialog');
    });

    it('panel uses config.ariaLabel when no header is provided', (): void => {
      const { fixture } = createContainer({
        header: '',
        closable: false,
        ariaLabel: 'Custom Label',
      });
      expect(getPanel(fixture).getAttribute('aria-label')).toBe('Custom Label');
    });

    it('panel has no aria-label when header text is present (aria-labelledby takes over)', (): void => {
      const { fixture } = createContainer({ header: 'Has Header' });
      expect(getPanel(fixture).getAttribute('aria-label')).toBeNull();
    });

    it('panel has aria-describedby when ariaDescribedby is configured', (): void => {
      const { fixture } = createContainer({ ariaDescribedby: 'some-desc-id' });
      expect(getPanel(fixture).getAttribute('aria-describedby')).toBe('some-desc-id');
    });

    it('panel has no aria-describedby when ariaDescribedby is not configured', (): void => {
      const { fixture } = createContainer();
      expect(getPanel(fixture).getAttribute('aria-describedby')).toBeNull();
    });

    it('panel has tabindex="-1" for programmatic focus', (): void => {
      const { fixture } = createContainer();
      expect(getPanel(fixture).getAttribute('tabindex')).toBe('-1');
    });

    it('close button has aria-label="Close"', (): void => {
      const { fixture } = createContainer({ closable: true });
      const closeBtn: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__close-btn');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close');
    });

    it('close button SVG icon is aria-hidden', (): void => {
      const { fixture } = createContainer({ closable: true });
      const icon: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__close-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ---- Focus management tests ----

  describe('Focus management tests', (): void => {
    it('activateFocusTrap() moves focus to the first focusable element inside the panel', (): void => {
      const { fixture } = createContainer({ closable: false, header: '' });

      // Manually render a focusable element inside the content area.
      const content: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__content');
      if (!content) {
        throw new Error('Expected content area to exist.');
      }
      const btn: HTMLButtonElement = document.createElement('button');
      btn.textContent = 'Inner Action';
      content.appendChild(btn);

      const component: DynamicDialog = fixture.componentInstance;
      (component as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      expect(document.activeElement).toBe(btn);
    });

    it('activateFocusTrap() focuses the panel itself when no focusable child exists', (): void => {
      const { fixture } = createContainer({ closable: false, header: '' });
      const component: DynamicDialog = fixture.componentInstance;
      (component as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      expect(document.activeElement).toBe(getPanel(fixture));
    });

    it('close button receives focus via FocusTrap when closable=true and no other focusable element', (): void => {
      const { fixture } = createContainer({ closable: true, header: '' });
      const component: DynamicDialog = fixture.componentInstance;
      (component as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      const closeBtn: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__close-btn');
      expect(document.activeElement).toBe(closeBtn);
    });

    it('Tab wraps from last focusable element back to first inside the panel', (): void => {
      const { fixture } = createContainer({ closable: false, header: '' });

      const content: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__content');
      if (!content) throw new Error('Content area missing');

      const firstBtn: HTMLButtonElement = document.createElement('button');
      firstBtn.textContent = 'First';
      const lastBtn: HTMLButtonElement = document.createElement('button');
      lastBtn.textContent = 'Last';
      content.appendChild(firstBtn);
      content.appendChild(lastBtn);

      const component: DynamicDialog = fixture.componentInstance;
      (component as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      lastBtn.focus();
      const event: KeyboardEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      lastBtn.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(firstBtn);
    });

    it('Shift+Tab wraps from first focusable element back to last inside the panel', (): void => {
      const { fixture } = createContainer({ closable: false, header: '' });

      const content: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__content');
      if (!content) throw new Error('Content area missing');

      const firstBtn: HTMLButtonElement = document.createElement('button');
      firstBtn.textContent = 'First';
      const lastBtn: HTMLButtonElement = document.createElement('button');
      lastBtn.textContent = 'Last';
      content.appendChild(firstBtn);
      content.appendChild(lastBtn);

      const component: DynamicDialog = fixture.componentInstance;
      (component as unknown as { activateFocusTrap: () => void }).activateFocusTrap();

      firstBtn.focus();
      const event: KeyboardEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });
      firstBtn.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(lastBtn);
    });
  });

  // ---- Focus restoration tests (via DialogService) ----

  describe('Focus restoration via DialogService', (): void => {
    let service: DialogService;

    beforeEach((): void => {
      TestBed.configureTestingModule({
        providers: [provideZonelessChangeDetection()],
      });
      service = TestBed.inject(DialogService);
    });

    afterEach((): void => {
      document.querySelectorAll('ui-lib-dynamic-dialog').forEach((el: Element): void => {
        el.remove();
      });
    });

    it('restores focus to the trigger element when the dialog closes', (): void => {
      // Create a trigger button and focus it.
      const triggerBtn: HTMLButtonElement = document.createElement('button');
      triggerBtn.textContent = 'Open Dialog';
      document.body.appendChild(triggerBtn);
      triggerBtn.focus();

      expect(document.activeElement).toBe(triggerBtn);

      const ref: DynamicDialogRef = service.open(GuestStubComponent, { blockScroll: false });

      // Close the dialog — focus should be restored to the trigger.
      ref.close();

      expect(document.activeElement).toBe(triggerBtn);

      triggerBtn.remove();
    });

    it('does not throw when trigger element is removed before dialog closes', (): void => {
      const triggerBtn: HTMLButtonElement = document.createElement('button');
      document.body.appendChild(triggerBtn);
      triggerBtn.focus();

      const ref: DynamicDialogRef = service.open(GuestStubComponent, { blockScroll: false });

      // Remove trigger before closing — focus restoration should be a no-op.
      triggerBtn.remove();

      expect((): void => {
        ref.close();
      }).not.toThrow();
    });

    it('returns a DynamicDialogRef that can be closed with data', (done: jest.DoneCallback): void => {
      const ref: DynamicDialogRef = service.open(GuestStubComponent, { blockScroll: false });
      ref.onClose.subscribe((data: unknown): void => {
        expect(data).toEqual({ result: 'ok' });
        done();
      });
      ref.close({ result: 'ok' });
    });
  });

  // ---- Keyboard interaction tests ----

  describe('Keyboard interaction tests', (): void => {
    it('Escape key closes the dialog', (): void => {
      const { fixture, ref } = createContainer();
      const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
      const panel: HTMLElement = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(closeSpy).toHaveBeenCalled();
    });

    it('Escape key from inside guest component content closes the dialog', (): void => {
      const { fixture, ref } = createContainer();
      const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');

      // Simulate a keydown inside the content area that bubbles up to the panel.
      const content: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__content');
      if (!content) throw new Error('Content area missing');

      content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(closeSpy).toHaveBeenCalled();
    });

    it('non-Escape key does not close the dialog', (): void => {
      const { fixture, ref } = createContainer();
      const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
      const panel: HTMLElement = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('clicking the close button closes the dialog', (): void => {
      const { fixture, ref } = createContainer({ closable: true });
      const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
      const closeBtn: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__close-btn');
      closeBtn?.click();
      expect(closeSpy).toHaveBeenCalled();
    });

    it('clicking the backdrop closes the dialog when dismissableMask=true', (): void => {
      const { fixture, ref } = createContainer({ modal: true, dismissableMask: true });
      const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
      const backdrop: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__backdrop');
      backdrop?.click();
      expect(closeSpy).toHaveBeenCalled();
    });

    it('clicking the backdrop does NOT close the dialog when dismissableMask=false', (): void => {
      const { fixture, ref } = createContainer({ modal: true, dismissableMask: false });
      const closeSpy: jest.SpyInstance<void, [data?: unknown], unknown> = jest.spyOn(ref, 'close');
      const backdrop: HTMLElement | null = queryEl(fixture, '.ui-lib-dynamic-dialog__backdrop');
      backdrop?.click();
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  // ---- Axe rationale documentation ----

  describe('Axe rationale documentation', (): void => {
    it('documents intentional axe rule skips', (): void => {
      // Color-contrast is intentionally skipped in jest-axe checks because
      // token-driven theme values are validated separately in visual/theming audits.
      expect(SKIP_COLOR_CONTRAST_RULES).toEqual({
        'color-contrast': { enabled: false },
      });
    });
  });
});
