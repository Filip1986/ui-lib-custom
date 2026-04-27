import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UploadComponent } from './upload.component';
import { UploadEmptyDirective, UploadHeaderDirective } from './upload.template-directives';
import type {
  UploadHandlerEvent,
  UploadRemoveEvent,
  UploadSelectEvent,
  UploadSize,
  UploadVariant,
} from './upload.types';

// ─── Typed query helpers ──────────────────────────────────────────────────────

function queryElement<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllElements<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function createFakeFile(name: string, sizeBytes: number, type: string): File {
  return new File([new ArrayBuffer(sizeBytes)], name, { type });
}

// ─── Default host component ───────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [UploadComponent],
  template: `<ui-lib-upload />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {}

// ─── Configurable host component ─────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [UploadComponent],
  template: `
    <ui-lib-upload
      [variant]="variant"
      [size]="size"
      [multiple]="multiple"
      [accept]="accept"
      [disabled]="disabled"
      [auto]="auto"
      [maxFileSize]="maxFileSize"
      [fileLimit]="fileLimit"
      [chooseLabel]="chooseLabel"
      [uploadLabel]="uploadLabel"
      [cancelLabel]="cancelLabel"
      [showUploadButton]="showUploadButton"
      [showCancelButton]="showCancelButton"
      [customUpload]="customUpload"
      [emptyMessage]="emptyMessage"
      (fileSelect)="onFileSelect($event)"
      (fileRemove)="onFileRemove($event)"
      (uploadClear)="onUploadClear()"
      (uploadHandler)="onUploadHandler($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfigurableHostComponent {
  public variant: UploadVariant = 'material';
  public size: UploadSize = 'md';
  public multiple: boolean = false;
  public accept: string = '';
  public disabled: boolean = false;
  public auto: boolean = false;
  public maxFileSize: number | null = null;
  public fileLimit: number | null = null;
  public chooseLabel: string = 'Choose';
  public uploadLabel: string = 'Upload';
  public cancelLabel: string = 'Cancel';
  public showUploadButton: boolean = true;
  public showCancelButton: boolean = true;
  public customUpload: boolean = false;
  public emptyMessage: string = 'Drag and drop files here to upload.';

  public lastSelectEvent: UploadSelectEvent | null = null;
  public lastRemoveEvent: UploadRemoveEvent | null = null;
  public clearCount: number = 0;
  public lastHandlerEvent: UploadHandlerEvent | null = null;

  public onFileSelect(event: UploadSelectEvent): void {
    this.lastSelectEvent = event;
  }

  public onFileRemove(event: UploadRemoveEvent): void {
    this.lastRemoveEvent = event;
  }

  public onUploadClear(): void {
    this.clearCount += 1;
  }

  public onUploadHandler(event: UploadHandlerEvent): void {
    this.lastHandlerEvent = event;
  }
}

// ─── Custom template host ─────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [UploadComponent, UploadHeaderDirective, UploadEmptyDirective],
  template: `
    <ui-lib-upload>
      <ng-template uiUploadHeader>
        <div class="custom-header">Custom header</div>
      </ng-template>
      <ng-template uiUploadEmpty>
        <div class="custom-empty">Custom empty</div>
      </ng-template>
    </ui-lib-upload>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateHostComponent {}

// ─── Suite ────────────────────────────────────────────────────────────────────

describe('UploadComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe('rendering', (): void => {
    it('should create with default inputs', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host).toBeTruthy();
    });

    it('should apply material variant class by default', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host.classList.contains('ui-lib-upload--material')).toBe(true);
    });

    it('should apply md size class by default', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host.classList.contains('ui-lib-upload--md')).toBe(true);
    });

    it('should render default toolbar buttons', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const chooseBtn: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__btn--choose'
      );
      const uploadBtn: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__btn--upload'
      );
      const cancelBtn: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__btn--cancel'
      );
      expect(chooseBtn).toBeTruthy();
      expect(uploadBtn).toBeTruthy();
      expect(cancelBtn).toBeTruthy();
    });

    it('should render the empty state by default', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const emptyEl: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__empty'
      );
      expect(emptyEl).toBeTruthy();
    });
  });

  // ── Variant classes ────────────────────────────────────────────────────────

  describe('variant', (): void => {
    it('should apply bootstrap class', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.variant = 'bootstrap';
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host.classList.contains('ui-lib-upload--bootstrap')).toBe(true);
    });

    it('should apply minimal class', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.variant = 'minimal';
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host.classList.contains('ui-lib-upload--minimal')).toBe(true);
    });
  });

  // ── Size classes ───────────────────────────────────────────────────────────

  describe('size', (): void => {
    it('should apply sm size class', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.size = 'sm';
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host.classList.contains('ui-lib-upload--sm')).toBe(true);
    });

    it('should apply lg size class', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.size = 'lg';
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host.classList.contains('ui-lib-upload--lg')).toBe(true);
    });
  });

  // ── Disabled state ─────────────────────────────────────────────────────────

  describe('disabled', (): void => {
    it('should apply disabled class when disabled', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const host: HTMLElement = queryElement<HTMLElement>(fixture, 'ui-lib-upload')!;
      expect(host.classList.contains('ui-lib-upload--disabled')).toBe(true);
    });

    it('should disable the choose button when disabled', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const chooseBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.ui-lib-upload__btn--choose'
      );
      expect(chooseBtn?.disabled).toBe(true);
    });
  });

  // ── Button visibility ──────────────────────────────────────────────────────

  describe('button visibility', (): void => {
    it('should hide upload button when showUploadButton is false', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.showUploadButton = false;
      fixture.detectChanges();
      const uploadBtn: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__btn--upload'
      );
      expect(uploadBtn).toBeNull();
    });

    it('should hide cancel button when showCancelButton is false', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.showCancelButton = false;
      fixture.detectChanges();
      const cancelBtn: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__btn--cancel'
      );
      expect(cancelBtn).toBeNull();
    });
  });

  // ── Button labels ──────────────────────────────────────────────────────────

  describe('labels', (): void => {
    it('should render custom choose label', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.chooseLabel = 'Browse';
      fixture.detectChanges();
      const chooseBtn: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__btn--choose'
      );
      expect((chooseBtn?.textContent ?? '').trim()).toContain('Browse');
    });

    it('should render custom empty message', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.emptyMessage = 'Drop your files here';
      fixture.detectChanges();
      const emptyMsg: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__empty-message'
      );
      expect((emptyMsg?.textContent ?? '').trim()).toBe('Drop your files here');
    });
  });

  // ── File processing ────────────────────────────────────────────────────────

  describe('file processing', (): void => {
    it('should display file in list after internal processFiles is called', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const fakeFile: File = createFakeFile('test.pdf', 1024, 'application/pdf');
      const fakeEvent: Event = new Event('change');

      // Access via the public method exposed for the file input
      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([fakeFile], fakeEvent);
      fixture.detectChanges();

      const fileItems: HTMLElement[] = queryAllElements<HTMLElement>(
        fixture,
        '.ui-lib-upload__file-item'
      );
      expect(fileItems.length).toBe(1);
    });

    it('should show file name in the file list', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const fakeFile: File = createFakeFile('my-document.pdf', 2048, 'application/pdf');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([fakeFile], fakeEvent);
      fixture.detectChanges();

      const nameEl: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__file-name'
      );
      expect((nameEl?.textContent ?? '').trim()).toBe('my-document.pdf');
    });

    it('should emit fileSelect event when file is processed', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const fakeFile: File = createFakeFile(
        'report.xlsx',
        500,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([fakeFile], fakeEvent);
      fixture.detectChanges();

      const hostInstance: ConfigurableHostComponent = fixture.componentInstance;
      expect(hostInstance.lastSelectEvent).not.toBeNull();
      expect(hostInstance.lastSelectEvent?.files[0]!.name).toBe('report.xlsx');
    });
  });

  // ── Validation ─────────────────────────────────────────────────────────────

  describe('validation', (): void => {
    it('should show error message when file exceeds maxFileSize', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.maxFileSize = 1000;
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const oversizedFile: File = createFakeFile('large.pdf', 5000, 'application/pdf');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([oversizedFile], fakeEvent);
      fixture.detectChanges();

      const messagesEl: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__messages'
      );
      expect(messagesEl).toBeTruthy();
    });

    it('should show error for disallowed file type', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.accept = 'image/*';
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const pdfFile: File = createFakeFile('doc.pdf', 512, 'application/pdf');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([pdfFile], fakeEvent);
      fixture.detectChanges();

      const messagesEl: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__messages'
      );
      expect(messagesEl).toBeTruthy();
    });

    it('should clear validation messages when clearMessages is called', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.maxFileSize = 100;
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const oversizedFile: File = createFakeFile('big.zip', 5000, 'application/zip');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([oversizedFile], fakeEvent);
      fixture.detectChanges();

      componentInstance.clearMessages();
      fixture.detectChanges();

      const messagesEl: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__messages'
      );
      expect(messagesEl).toBeNull();
    });
  });

  // ── Remove file ────────────────────────────────────────────────────────────

  describe('removeFile', (): void => {
    it('should remove file from list and emit fileRemove', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const fakeFile: File = createFakeFile('remove-me.txt', 100, 'text/plain');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([fakeFile], fakeEvent);
      fixture.detectChanges();

      expect(componentInstance.hasFiles()).toBe(true);

      const clickEvent: MouseEvent = new MouseEvent('click');
      componentInstance.removeFile(clickEvent, 0);
      fixture.detectChanges();

      expect(componentInstance.hasFiles()).toBe(false);
      expect(fixture.componentInstance.lastRemoveEvent?.file.name).toBe('remove-me.txt');
    });
  });

  // ── Cancel / clear ─────────────────────────────────────────────────────────

  describe('onCancel', (): void => {
    it('should clear files and emit uploadClear', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const fakeFile: File = createFakeFile('clear-me.txt', 100, 'text/plain');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([fakeFile], fakeEvent);
      fixture.detectChanges();

      componentInstance.onCancel();
      fixture.detectChanges();

      expect(componentInstance.hasFiles()).toBe(false);
      expect(fixture.componentInstance.clearCount).toBe(1);
    });
  });

  // ── Custom upload handler ──────────────────────────────────────────────────

  describe('customUpload', (): void => {
    it('should emit uploadHandler when onUpload is called with customUpload=true', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.componentInstance.customUpload = true;
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const fakeFile: File = createFakeFile('upload.csv', 200, 'text/csv');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([fakeFile], fakeEvent);
      fixture.detectChanges();

      componentInstance.onUpload();
      fixture.detectChanges();

      expect(fixture.componentInstance.lastHandlerEvent?.files[0]!.name).toBe('upload.csv');
    });
  });

  // ── formatSize ─────────────────────────────────────────────────────────────

  describe('formatSize', (): void => {
    it('should return "0 B" for zero bytes', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;
      expect(componentInstance.formatSize(0)).toBe('0 B');
    });

    it('should format KB correctly', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;
      expect(componentInstance.formatSize(1024)).toBe('1.0 KB');
    });

    it('should format MB correctly', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;
      expect(componentInstance.formatSize(1048576)).toBe('1.0 MB');
    });
  });

  // ── Content templates ──────────────────────────────────────────────────────

  describe('content templates', (): void => {
    it('should render custom header template', (): void => {
      const fixture: ComponentFixture<TemplateHostComponent> =
        TestBed.createComponent(TemplateHostComponent);
      fixture.detectChanges();
      const customHeader: HTMLElement | null = queryElement<HTMLElement>(fixture, '.custom-header');
      expect(customHeader).toBeTruthy();
      expect((customHeader?.textContent ?? '').trim()).toBe('Custom header');
    });

    it('should hide default toolbar when custom header template is provided', (): void => {
      const fixture: ComponentFixture<TemplateHostComponent> =
        TestBed.createComponent(TemplateHostComponent);
      fixture.detectChanges();
      const defaultHeader: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__header'
      );
      expect(defaultHeader).toBeNull();
    });

    it('should render custom empty template', (): void => {
      const fixture: ComponentFixture<TemplateHostComponent> =
        TestBed.createComponent(TemplateHostComponent);
      fixture.detectChanges();
      const customEmpty: HTMLElement | null = queryElement<HTMLElement>(fixture, '.custom-empty');
      expect(customEmpty).toBeTruthy();
    });
  });

  // ── isImage ────────────────────────────────────────────────────────────────

  describe('isImage', (): void => {
    it('should return true for image MIME types', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;
      const imageFile: File = createFakeFile('photo.jpg', 512, 'image/jpeg');
      expect(componentInstance.isImage(imageFile)).toBe(true);
    });

    it('should return false for non-image MIME types', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;
      const pdfFile: File = createFakeFile('doc.pdf', 512, 'application/pdf');
      expect(componentInstance.isImage(pdfFile)).toBe(false);
    });
  });

  // ── Accessibility ──────────────────────────────────────────────────────────

  describe('accessibility', (): void => {
    it('should have role=toolbar on the toolbar', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const toolbar: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__toolbar'
      );
      expect(toolbar?.getAttribute('role')).toBe('toolbar');
    });

    it('should have role=region on the drop zone', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture.detectChanges();
      const content: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__content'
      );
      expect(content?.getAttribute('role')).toBe('region');
    });

    it('should have role=list on the file list', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      const fakeFile: File = createFakeFile('a11y-test.txt', 100, 'text/plain');
      const fakeEvent: Event = new Event('change');

      (componentInstance as unknown as { processFiles: (files: File[], event: Event) => void })[
        'processFiles'
      ]([fakeFile], fakeEvent);
      fixture.detectChanges();

      const fileList: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.ui-lib-upload__file-list'
      );
      expect(fileList?.getAttribute('role')).toBe('list');
    });

    it('should set aria-label on file remove button', (): void => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();

      const componentInstance: UploadComponent = fixture.debugElement.query(
        By.directive(UploadComponent)
      ).componentInstance as UploadComponent;

      componentInstance.addFiles([new File([''], 'test.txt', { type: 'text/plain' })]);
      fixture.detectChanges();

      const removeButtons: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[aria-label]')
      ).filter(
        (el: HTMLElement): boolean =>
          el.tagName === 'BUTTON' && (el.getAttribute('aria-label') ?? '').length > 0
      );
      expect(removeButtons.length).toBeGreaterThan(0);
    });
  });
});
