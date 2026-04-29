import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ImageComponent } from './image';
import type { ImageSize, ImageVariant } from './image.types';

// ─── Test helpers ─────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('ui-lib-image')!;
}

function getImg(fixture: ComponentFixture<unknown>): HTMLImageElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLImageElement>(
    '.uilib-image__img'
  );
}

function getIndicator(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
    '.uilib-image__indicator'
  );
}

function getMask(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.uilib-image__mask');
}

function getPreviewImg(fixture: ComponentFixture<unknown>): HTMLImageElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLImageElement>(
    '.uilib-image__preview-img'
  );
}

function getToolbarButtons(fixture: ComponentFixture<unknown>): NodeListOf<HTMLButtonElement> {
  return (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
    '.uilib-image__toolbar-btn'
  );
}

function getZoomInBtn(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  const buttons: NodeListOf<HTMLButtonElement> = getToolbarButtons(fixture);
  return buttons[0] ?? null;
}

function getZoomOutBtn(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  const buttons: NodeListOf<HTMLButtonElement> = getToolbarButtons(fixture);
  return buttons[1] ?? null;
}

function getCloseBtn(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
    '.uilib-image__toolbar-btn--close'
  );
}

// ─── Test host ────────────────────────────────────────────────────────────────

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [ImageComponent],
  template: `
    <ui-lib-image
      [src]="src()"
      [alt]="alt()"
      [preview]="preview()"
      [variant]="variant()"
      [size]="size()"
      [(previewVisible)]="previewVisible"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly src: WritableSignal<string> = signal<string>('test.jpg');
  public readonly alt: WritableSignal<string> = signal<string>('Test image');
  public readonly preview: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<ImageVariant> = signal<ImageVariant>('material');
  public readonly size: WritableSignal<ImageSize> = signal<ImageSize>('md');
  public readonly previewVisible: WritableSignal<boolean> = signal<boolean>(false);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ImageComponent', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  // ─── Rendering ──────────────────────────────────────────────────────────────

  it('should render the host element', (): void => {
    expect(getHost(fixture)).toBeTruthy();
  });

  it('should render the img element with the correct src', (): void => {
    const img: HTMLImageElement | null = getImg(fixture);
    expect(img).toBeTruthy();
    expect(img!.getAttribute('src')).toBe('test.jpg');
  });

  it('should render the img element with the correct alt attribute', (): void => {
    const img: HTMLImageElement | null = getImg(fixture);
    expect(img!.getAttribute('alt')).toBe('Test image');
  });

  // ─── Host classes ────────────────────────────────────────────────────────────

  it('should apply variant class to the host element', (): void => {
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image--variant-material')).toBe(true);
  });

  it('should apply size class to the host element', (): void => {
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image--size-md')).toBe(true);
  });

  it('should switch variant class when variant input changes', async (): Promise<void> => {
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image--variant-bootstrap')).toBe(true);
    expect(hostEl.classList.contains('ui-lib-image--variant-material')).toBe(false);
  });

  it('should apply previewable class when preview is true', async (): Promise<void> => {
    host.preview.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image--previewable')).toBe(true);
  });

  it('should not apply previewable class when preview is false', (): void => {
    const hostEl: HTMLElement = getHost(fixture);
    expect(hostEl.classList.contains('ui-lib-image--previewable')).toBe(false);
  });

  // ─── Preview indicator ────────────────────────────────────────────────────────

  it('should not render the indicator button when preview is false', (): void => {
    expect(getIndicator(fixture)).toBeNull();
  });

  it('should render the indicator button when preview is true', async (): Promise<void> => {
    host.preview.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getIndicator(fixture)).toBeTruthy();
  });

  it('should have correct aria-label on the indicator button', async (): Promise<void> => {
    host.preview.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const indicator: HTMLButtonElement | null = getIndicator(fixture);
    expect(indicator!.getAttribute('aria-label')).toBe('Preview image');
  });

  // ─── Preview overlay ──────────────────────────────────────────────────────────

  it('should not render the preview overlay initially', (): void => {
    expect(getMask(fixture)).toBeNull();
  });

  it('should render the preview overlay when previewVisible is set', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getMask(fixture)).toBeTruthy();
  });

  it('should render the preview image inside the overlay', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const previewImg: HTMLImageElement | null = getPreviewImg(fixture);
    expect(previewImg).toBeTruthy();
    expect(previewImg!.getAttribute('src')).toBe('test.jpg');
  });

  it('should open the preview overlay when the indicator is clicked', async (): Promise<void> => {
    host.preview.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    getIndicator(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getMask(fixture)).toBeTruthy();
  });

  it('should close the preview overlay when the close button is clicked', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    getCloseBtn(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getMask(fixture)).toBeNull();
  });

  it('should close the preview overlay on Escape key', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const mask: HTMLElement = getMask(fixture)!;
    mask.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getMask(fixture)).toBeNull();
  });

  // ─── Zoom controls ────────────────────────────────────────────────────────────

  it('should zoom in when zoom-in button is clicked', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const zoomInBtn: HTMLButtonElement | null = getZoomInBtn(fixture);
    expect(zoomInBtn).toBeTruthy();
    zoomInBtn!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const previewImg: HTMLImageElement | null = getPreviewImg(fixture);
    expect(previewImg!.style.transform).toContain('scale(1.1)');
  });

  it('should zoom out when zoom-out button is clicked', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    // Zoom in twice to start at 1.2, then zoom out once to reach 1.1
    getZoomInBtn(fixture)!.click();
    getZoomInBtn(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    getZoomOutBtn(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const previewImg: HTMLImageElement | null = getPreviewImg(fixture);
    expect(previewImg!.style.transform).toContain('scale(1.1)');
  });

  it('should disable zoom-in when at max zoom', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const zoomInBtn: HTMLButtonElement = getZoomInBtn(fixture)!;
    for (let index: number = 0; index < 45; index++) {
      zoomInBtn.click();
    }
    fixture.detectChanges();
    await fixture.whenStable();

    expect(zoomInBtn.disabled).toBe(true);
  });

  it('should disable zoom-out when at min zoom', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const zoomOutBtn: HTMLButtonElement = getZoomOutBtn(fixture)!;
    for (let index: number = 0; index < 15; index++) {
      zoomOutBtn.click();
    }
    fixture.detectChanges();
    await fixture.whenStable();

    expect(zoomOutBtn.disabled).toBe(true);
  });

  // ─── Rotate controls ─────────────────────────────────────────────────────────

  it('should rotate the preview image right', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttons: NodeListOf<HTMLButtonElement> = getToolbarButtons(fixture);
    const rotateRightBtn: HTMLButtonElement = buttons[3]!; // index 3: rotate right
    rotateRightBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const previewImg: HTMLImageElement | null = getPreviewImg(fixture);
    expect(previewImg!.style.transform).toContain('rotate(90deg)');
  });

  it('should rotate the preview image left', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttons: NodeListOf<HTMLButtonElement> = getToolbarButtons(fixture);
    const rotateLeftBtn: HTMLButtonElement = buttons[2]!; // index 2: rotate left
    rotateLeftBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const previewImg: HTMLImageElement | null = getPreviewImg(fixture);
    expect(previewImg!.style.transform).toContain('rotate(-90deg)');
  });

  // ─── Error state ──────────────────────────────────────────────────────────────

  it('should not render the preview indicator when there is an error', async (): Promise<void> => {
    host.preview.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const img: HTMLImageElement | null = getImg(fixture);
    img!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getIndicator(fixture)).toBeNull();
  });

  it('should show the error placeholder after image error', async (): Promise<void> => {
    fixture.detectChanges();
    await fixture.whenStable();

    const img: HTMLImageElement | null = getImg(fixture);
    img!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    await fixture.whenStable();

    const errorEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.uilib-image__error'
    );
    expect(errorEl).toBeTruthy();
  });

  // ─── Load / Error outputs ─────────────────────────────────────────────────────

  it('should emit loadEvent when the image loads', async (): Promise<void> => {
    const imageEl: HTMLImageElement | null = getImg(fixture);
    let emitted: boolean = false;

    const imageComp: ImageComponent = fixture.debugElement.children[0]!.children[0]!
      .componentInstance as ImageComponent;
    imageComp.loadEvent.subscribe((): void => {
      emitted = true;
    });

    imageEl!.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(emitted).toBe(true);
  });

  it('should emit errorEvent when the image fails to load', async (): Promise<void> => {
    const imageEl: HTMLImageElement | null = getImg(fixture);
    let emitted: boolean = false;

    const imageComp: ImageComponent = fixture.debugElement.children[0]!.children[0]!
      .componentInstance as ImageComponent;
    imageComp.errorEvent.subscribe((): void => {
      emitted = true;
    });

    imageEl!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(emitted).toBe(true);
  });

  // ─── ARIA ────────────────────────────────────────────────────────────────────

  it('should have role="dialog" on the preview overlay', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getMask(fixture)!.getAttribute('role')).toBe('dialog');
  });

  it('should have aria-modal="true" on the preview overlay', async (): Promise<void> => {
    host.preview.set(true);
    host.previewVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getMask(fixture)!.getAttribute('aria-modal')).toBe('true');
  });

  // ─── Size ────────────────────────────────────────────────────────────────────

  it('should apply size class to the host', async (): Promise<void> => {
    host.size.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getHost(fixture).classList.contains('ui-lib-image--size-lg')).toBe(true);
  });
});
