import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ImageComponent } from './image';

// ─── Test host ────────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ImageComponent],
  template: `
    <button type="button" class="outside-trigger">Before image</button>
    <ui-lib-image
      [src]="src()"
      [alt]="alt()"
      [preview]="preview()"
      [(previewVisible)]="previewVisible"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ImageA11yHostComponent {
  public readonly src: WritableSignal<string> = signal<string>('https://example.com/photo.jpg');
  public readonly alt: WritableSignal<string> = signal<string>('A scenic mountain photo');
  public readonly preview: WritableSignal<boolean> = signal<boolean>(true);
  public readonly previewVisible: WritableSignal<boolean> = signal<boolean>(false);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function createFixture(): Promise<ComponentFixture<ImageA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ImageA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<ImageA11yHostComponent> =
    TestBed.createComponent(ImageA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function getImg(fixture: ComponentFixture<unknown>): HTMLImageElement | null {
  return getHostElement(fixture).querySelector<HTMLImageElement>('.uilib-image__img');
}

function getIndicator(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return getHostElement(fixture).querySelector<HTMLButtonElement>('.uilib-image__indicator');
}

function getMask(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return getHostElement(fixture).querySelector<HTMLElement>('.uilib-image__mask');
}

function getPreviewLiveRegion(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return getHostElement(fixture).querySelector<HTMLElement>('.uilib-image__sr-live');
}

function getCloseBtn(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return getHostElement(fixture).querySelector<HTMLButtonElement>(
    '.uilib-image__toolbar-btn--close',
  );
}

function getToolbarBtns(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return Array.from(
    getHostElement(fixture).querySelectorAll<HTMLButtonElement>('.uilib-image__toolbar-btn'),
  );
}

async function openPreview(fixture: ComponentFixture<ImageA11yHostComponent>): Promise<void> {
  getIndicator(fixture)!.click();
  fixture.detectChanges();
  await fixture.whenStable();
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Image Accessibility', (): void => {
  afterEach((): void => {
    document.body.querySelectorAll('ui-lib-image').forEach((element: Element): void => {
      element.remove();
    });
    document.body.querySelectorAll('.outside-trigger').forEach((element: Element): void => {
      element.remove();
    });
    TestBed.resetTestingModule();
  });

  // ─── ARIA structure ───────────────────────────────────────────────────────────

  it('renders the image with the provided alt text', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    expect(getImg(fixture)?.getAttribute('alt')).toBe('A scenic mountain photo');
  });

  it('renders the image with empty string alt when alt is not provided', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    fixture.componentInstance.alt.set('');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getImg(fixture)?.getAttribute('alt')).toBe('');
  });

  it('renders the preview indicator button with an aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    const indicator: HTMLButtonElement | null = getIndicator(fixture);
    expect(indicator?.getAttribute('aria-label')).toBeTruthy();
  });

  it('indicator button has aria-haspopup="dialog"', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    expect(getIndicator(fixture)?.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('indicator button has aria-controls pointing to the preview overlay when open', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    const indicator: HTMLButtonElement | null = getIndicator(fixture);
    const controlsId: string | null = indicator?.getAttribute('aria-controls') ?? null;
    expect(controlsId).toBeTruthy();
    // The controls id should match the mask element id
    const mask: HTMLElement | null = getMask(fixture);
    expect(mask?.getAttribute('id')).toBe(controlsId);
  });

  it('preview overlay has role="dialog"', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    expect(getMask(fixture)?.getAttribute('role')).toBe('dialog');
  });

  it('preview overlay has aria-modal="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    expect(getMask(fixture)?.getAttribute('aria-modal')).toBe('true');
  });

  it('preview overlay has an accessible label', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    expect(getMask(fixture)?.getAttribute('aria-label')).toBeTruthy();
  });

  it('preview overlay describes the live status region', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    const mask: HTMLElement | null = getMask(fixture);
    const liveRegion: HTMLElement | null = getPreviewLiveRegion(fixture);
    expect(mask?.getAttribute('aria-describedby')).toBe(liveRegion?.getAttribute('id'));
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
    expect(liveRegion?.getAttribute('aria-atomic')).toBe('true');
  });

  it('toolbar has role="toolbar" and an accessible label', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    const toolbar: HTMLElement | null = getHostElement(fixture).querySelector('[role="toolbar"]');
    expect(toolbar).toBeTruthy();
    expect(toolbar?.getAttribute('aria-label')).toBeTruthy();
  });

  it('all toolbar buttons have aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    const buttons: HTMLButtonElement[] = getToolbarBtns(fixture);
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((button: HTMLButtonElement): void => {
      expect(button.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('decorative SVG icons inside the toolbar buttons are aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    const mask: HTMLElement | null = getMask(fixture);
    const svgs: NodeListOf<SVGElement> = mask!.querySelectorAll<SVGElement>('svg');
    svgs.forEach((svg: SVGElement): void => {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('preview image carries the same alt text as the thumbnail', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    const previewImg: HTMLImageElement | null = getHostElement(
      fixture,
    ).querySelector<HTMLImageElement>('.uilib-image__preview-img');
    expect(previewImg?.getAttribute('alt')).toBe('A scenic mountain photo');
  });

  // ─── Keyboard interaction ─────────────────────────────────────────────────────

  it('closes the preview overlay on Escape key', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    expect(getMask(fixture)).toBeTruthy();

    getMask(fixture)!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getMask(fixture)).toBeNull();
  });

  it('restores focus to the indicator button when the preview is closed via Escape', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    const indicator: HTMLButtonElement = getIndicator(fixture)!;
    indicator.focus();
    await openPreview(fixture);

    getMask(fixture)!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    // Allow queueMicrotask to run
    await new Promise<void>((resolve: (value: void) => void): void => {
      queueMicrotask(resolve);
    });

    expect(document.activeElement).toBe(indicator);
  });

  it('restores focus to the indicator button when the preview is closed via close button', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    const indicator: HTMLButtonElement = getIndicator(fixture)!;
    indicator.focus();
    await openPreview(fixture);

    getCloseBtn(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    await new Promise<void>((resolve: (value: void) => void): void => {
      queueMicrotask(resolve);
    });

    expect(document.activeElement).toBe(indicator);
  });

  it('traps focus within the preview overlay while open', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    const mask: HTMLElement = getMask(fixture)!;
    const buttons: HTMLButtonElement[] = getToolbarBtns(fixture);
    const lastButton: HTMLButtonElement = buttons[buttons.length - 1]!;

    // Focus the last toolbar button
    lastButton.focus();

    // Tab forward — focus should wrap to first button inside the mask
    lastButton.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    // Focus should still be inside the mask
    expect(mask.contains(document.activeElement)).toBe(true);
  });

  it('zoom-in button has aria-disabled when zoom is at maximum', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    const buttons: HTMLButtonElement[] = getToolbarBtns(fixture);
    const zoomInBtn: HTMLButtonElement = buttons[0]!;

    // Click zoom-in until disabled (max=5, start=1, step=0.1 → 40 steps to reach max; 45 is more than enough)
    for (let index: number = 0; index < 45; index++) {
      zoomInBtn.click();
    }
    fixture.detectChanges();
    await fixture.whenStable();

    expect(zoomInBtn.getAttribute('aria-disabled')).toBe('true');
  });

  it('zoom-out button has aria-disabled when zoom is at minimum', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    const buttons: HTMLButtonElement[] = getToolbarBtns(fixture);
    const zoomOutBtn: HTMLButtonElement = buttons[1]!;

    // Click zoom-out until disabled (min=0.1, start=1, step=0.1 → 9 steps to reach min; 15 is more than enough)
    for (let index: number = 0; index < 15; index++) {
      zoomOutBtn.click();
    }
    fixture.detectChanges();
    await fixture.whenStable();

    expect(zoomOutBtn.getAttribute('aria-disabled')).toBe('true');
  });

  it('announces zoom changes when using keyboard shortcuts', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    getMask(fixture)!.dispatchEvent(
      new KeyboardEvent('keydown', { key: '+', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const liveRegion: HTMLElement = getPreviewLiveRegion(fixture)!;
    expect(liveRegion.textContent.trim()).toBe('Zoom 110%. Rotation 0 degrees.');
  });

  it('announces rotation changes when using arrow key shortcuts', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    getMask(fixture)!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const liveRegion: HTMLElement = getPreviewLiveRegion(fixture)!;
    expect(liveRegion.textContent.trim()).toBe('Zoom 100%. Rotation 90 degrees.');
  });

  it('announces completed full turns distinctly from the initial 0 degree state', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    for (let index: number = 0; index < 4; index++) {
      getMask(fixture)!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
      );
    }
    fixture.detectChanges();
    await fixture.whenStable();

    const liveRegion: HTMLElement = getPreviewLiveRegion(fixture)!;
    expect(liveRegion.textContent.trim()).toBe('Zoom 100%. Rotation 0 degrees after 1 full turn.');
  });

  it('supports zoom shortcut fallback via keyboard code values', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);

    getMask(fixture)!.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Unidentified',
        code: 'Equal',
        bubbles: true,
        cancelable: true,
      }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const liveRegion: HTMLElement = getPreviewLiveRegion(fixture)!;
    expect(liveRegion.textContent.trim()).toBe('Zoom 110%. Rotation 0 degrees.');
  });

  // ─── axe-core automated checks ────────────────────────────────────────────────

  it('passes axe checks for the default image (no preview)', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    fixture.componentInstance.preview.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe checks when the preview indicator is visible', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe checks when the preview overlay is open', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageA11yHostComponent> = await createFixture();
    await openPreview(fixture);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
