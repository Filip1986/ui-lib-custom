import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { UploadComponent } from './upload.component';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function createFakeFile(name: string, sizeBytes: number = 1024, type: string = 'text/plain'): File {
  return new File([new ArrayBuffer(sizeBytes)], name, { type });
}

/**
 * Creates a minimal DragEvent-compatible stub for jsdom environments where
 * `DragEvent` may not be available.
 */
function fakeDragEvent(): DragEvent {
  return {
    preventDefault: (): void => {},
    stopPropagation: (): void => {},
  } as unknown as DragEvent;
}

// ─── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [UploadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-upload />`,
})
class DefaultHostComponent {}

@Component({
  standalone: true,
  imports: [UploadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-upload [disabled]="true" />`,
})
class DisabledHostComponent {}

@Component({
  standalone: true,
  imports: [UploadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-upload [multiple]="true" />`,
})
class MultipleHostComponent {}

@Component({
  standalone: true,
  imports: [UploadComponent, UploadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-upload />
    <ui-lib-upload />
  `,
})
class TwoInstancesHostComponent {}

// ─── Fixture factory ─────────────────────────────────────────────────────────

async function createFixture<T>(hostComponent: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostComponent);
  document.body.appendChild(fixture.nativeElement as HTMLElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

// ─── Test suite ───────────────────────────────────────────────────────────────

describe('Upload Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  // ── 1. ARIA structure — toolbar ──────────────────────────────────────────

  describe('toolbar semantics', (): void => {
    it('toolbar has role="toolbar" with aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const toolbar: HTMLElement | null = queryEl(fixture, '[role="toolbar"]');
      expect(toolbar).not.toBeNull();
      expect(toolbar?.getAttribute('aria-label')).toBe('Upload actions');
    });

    it('Choose button has accessible text', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const chooseBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__btn--choose');
      expect((chooseBtn?.textContent ?? '').trim()).toBeTruthy();
    });

    it('Upload and Cancel buttons are present and have accessible text', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const uploadBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__btn--upload');
      const cancelBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__btn--cancel');

      expect((uploadBtn?.textContent ?? '').trim()).toBeTruthy();
      expect((cancelBtn?.textContent ?? '').trim()).toBeTruthy();
    });

    it('toolbar buttons have aria-disabled when in disabled state', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      // Upload and Cancel buttons are disabled when no files (isUploadDisabled / isCancelDisabled)
      const uploadBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__btn--upload');
      const cancelBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__btn--cancel');

      expect(uploadBtn?.getAttribute('aria-disabled')).toBe('true');
      expect(cancelBtn?.getAttribute('aria-disabled')).toBe('true');
    });

    it('Choose button has aria-disabled when component is disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledHostComponent> =
        await createFixture(DisabledHostComponent);

      const chooseBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__btn--choose');
      expect(chooseBtn?.getAttribute('aria-disabled')).toBe('true');
    });
  });

  // ── 2. ARIA structure — drop zone ────────────────────────────────────────

  describe('drop zone semantics', (): void => {
    it('drop zone has role="region" with aria-label="File upload area"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const dropZone: HTMLElement | null = queryEl(fixture, '[role="region"]');
      expect(dropZone).not.toBeNull();
      expect(dropZone?.getAttribute('aria-label')).toBe('File upload area');
    });

    it('drop zone sets aria-disabled when component is disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledHostComponent> =
        await createFixture(DisabledHostComponent);

      const dropZone: HTMLElement | null = queryEl(fixture, '[role="region"]');
      expect(dropZone?.getAttribute('aria-disabled')).toBe('true');
    });

    it('drop zone does not have aria-disabled when enabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const dropZone: HTMLElement | null = queryEl(fixture, '[role="region"]');
      expect(dropZone?.getAttribute('aria-disabled')).toBeNull();
    });
  });

  // ── 3. ARIA structure — file input ───────────────────────────────────────

  describe('file input', (): void => {
    it('file input has aria-hidden="true" to hide it from AT', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const input: HTMLInputElement | null = queryEl(fixture, 'input[type="file"]');
      expect(input?.getAttribute('aria-hidden')).toBe('true');
    });

    it('file input has tabindex="-1" to exclude it from tab order', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const input: HTMLInputElement | null = queryEl(fixture, 'input[type="file"]');
      expect(input?.getAttribute('tabindex')).toBe('-1');
    });

    it('file input has a unique id', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const input: HTMLInputElement | null = queryEl(fixture, 'input[type="file"]');
      const inputId: string | null | undefined = input?.getAttribute('id');
      expect(inputId).toBeTruthy();
      expect(inputId).toMatch(/^ui-lib-upload-input-\d+$/);
    });

    it('label element is associated with the file input via [for]', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const input: HTMLInputElement | null = queryEl(fixture, 'input[type="file"]');
      const inputId: string | null | undefined = input?.getAttribute('id');
      const label: HTMLLabelElement | null = queryEl(fixture, `label[for="${inputId ?? ''}"]`);
      expect(label).not.toBeNull();
    });
  });

  // ── 4. ARIA structure — file list ────────────────────────────────────────

  describe('file list semantics', (): void => {
    it('file list has role="list" with aria-label when files are present', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.addFiles([createFakeFile('report.pdf', 1024, 'application/pdf')]);
      fixture.detectChanges();
      await fixture.whenStable();

      const fileList: HTMLElement | null = queryEl(fixture, '[role="list"]');
      expect(fileList).not.toBeNull();
      expect(fileList?.getAttribute('aria-label')).toBe('Files to upload');
    });

    it('each file item has role="listitem"', async (): Promise<void> => {
      const fixture: ComponentFixture<MultipleHostComponent> =
        await createFixture(MultipleHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.addFiles([createFakeFile('file-a.txt'), createFakeFile('file-b.txt')]);
      fixture.detectChanges();
      await fixture.whenStable();

      const items: HTMLElement[] = queryAllEl(fixture, '[role="listitem"]');
      expect(items.length).toBe(2);
    });

    it('remove button has aria-label="Remove <filename>"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.addFiles([createFakeFile('document.txt')]);
      fixture.detectChanges();
      await fixture.whenStable();

      const removeBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__file-remove');
      expect(removeBtn?.getAttribute('aria-label')).toBe('Remove document.txt');
    });

    it('remove button icons have aria-hidden="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      // Use a non-image file to avoid URL.createObjectURL (not available in jsdom)
      component.addFiles([createFakeFile('document.txt', 1024, 'text/plain')]);
      fixture.detectChanges();
      await fixture.whenStable();

      const svgs: HTMLElement[] = queryAllEl(fixture, '.ui-lib-upload__file-remove svg');
      svgs.forEach((svg: HTMLElement): void => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  // ── 5. ARIA structure — validation messages ──────────────────────────────

  describe('validation messages', (): void => {
    it('validation container has role="alert" and aria-live="assertive"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      // Trigger a validation error by providing an oversized file (maxFileSize defaults to null,
      // so we need to set messages directly via processFiles with wrong type).
      // Use addFiles with a valid file, then manually set validationMessages.
      component.validationMessages.set([
        { summary: 'Invalid file type', detail: 'test.exe: Invalid file type.' },
      ]);
      fixture.detectChanges();
      await fixture.whenStable();

      const alerts: HTMLElement[] = queryAllEl(fixture, '[role="alert"]');
      expect(alerts.length).toBeGreaterThanOrEqual(1);
      const alertEl: HTMLElement = alerts[0]!;
      expect(alertEl.getAttribute('aria-live')).toBe('assertive');
    });

    it('dismiss button has aria-label="Dismiss validation messages"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.validationMessages.set([{ summary: 'Error', detail: 'Something went wrong.' }]);
      fixture.detectChanges();
      await fixture.whenStable();

      const closeBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__messages-close');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Dismiss validation messages');
    });
  });

  // ── 6. Drag-over live region ─────────────────────────────────────────────

  describe('drag-over live region', (): void => {
    it('aria-live="polite" region is always present in the DOM', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const liveRegion: HTMLElement | null = queryEl(fixture, '[aria-live="polite"]');
      expect(liveRegion).not.toBeNull();
    });

    it('live region text is empty by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const liveRegion: HTMLElement | null = queryEl(fixture, '[aria-live="polite"]');
      expect((liveRegion?.textContent ?? '').trim()).toBe('');
    });

    it('live region announces when drag enters', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      const fakeEvent: DragEvent = fakeDragEvent();
      component.onDragEnter(fakeEvent);
      fixture.detectChanges();
      await fixture.whenStable();

      const liveRegion: HTMLElement | null = queryEl(fixture, '[aria-live="polite"]');
      expect((liveRegion?.textContent ?? '').trim()).toBeTruthy();
    });

    it('live region clears when drag leaves', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.onDragEnter(fakeDragEvent());
      fixture.detectChanges();

      component.onDragLeave(fakeDragEvent());
      fixture.detectChanges();
      await fixture.whenStable();

      const liveRegion: HTMLElement | null = queryEl(fixture, '[aria-live="polite"]');
      expect((liveRegion?.textContent ?? '').trim()).toBe('');
    });
  });

  // ── 7. Unique instance IDs ───────────────────────────────────────────────

  describe('unique instance IDs', (): void => {
    it('two instances have distinct file input IDs', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoInstancesHostComponent> =
        await createFixture(TwoInstancesHostComponent);

      const inputs: HTMLInputElement[] = queryAllEl(fixture, 'input[type="file"]');
      expect(inputs.length).toBe(2);
      const id1: string | null = inputs[0]?.getAttribute('id') ?? null;
      const id2: string | null = inputs[1]?.getAttribute('id') ?? null;
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });
  });

  // ── 8. Keyboard interaction ──────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('Choose button is focusable (not removed from tab order)', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const chooseBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__btn--choose');
      expect(chooseBtn?.getAttribute('tabindex')).not.toBe('-1');
      expect(chooseBtn?.getAttribute('disabled')).toBeNull();
    });

    it('remove buttons are focusable when files are present', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.addFiles([createFakeFile('data.csv')]);
      fixture.detectChanges();
      await fixture.whenStable();

      const removeBtn: HTMLButtonElement | null = queryEl(fixture, '.ui-lib-upload__file-remove');
      expect(removeBtn).not.toBeNull();
      expect(removeBtn?.getAttribute('tabindex')).not.toBe('-1');
      expect(removeBtn?.getAttribute('disabled')).toBeNull();
    });
  });

  // ── 9. axe-core automated checks ─────────────────────────────────────────

  describe('axe automated checks', (): void => {
    it('default state passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('with files queued passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.addFiles([
        createFakeFile('report.pdf', 1024, 'application/pdf'),
        createFakeFile('data.csv', 512, 'text/csv'),
      ]);
      fixture.detectChanges();
      await fixture.whenStable();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('with validation messages passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.validationMessages.set([
        { summary: 'Invalid file type', detail: 'note.xyz: Invalid file type. Allowed: image/*.' },
      ]);
      fixture.detectChanges();
      await fixture.whenStable();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('disabled state passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledHostComponent> =
        await createFixture(DisabledHostComponent);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('drag-over state passes axe', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      const component: UploadComponent = fixture.debugElement.query(By.directive(UploadComponent))
        .componentInstance as UploadComponent;
      component.onDragEnter(fakeDragEvent());
      fixture.detectChanges();
      await fixture.whenStable();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
