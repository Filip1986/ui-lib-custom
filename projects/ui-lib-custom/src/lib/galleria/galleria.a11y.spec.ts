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
import { GalleriaComponent } from './galleria';
import type { GalleriaItem, GalleriaThumbnailsPosition } from './galleria.types';

const TEST_ITEMS: GalleriaItem[] = [
  {
    src: 'https://example.com/image-1.jpg',
    alt: 'Mountain sunrise',
    thumbnailSrc: 'https://example.com/thumb-1.jpg',
    thumbnailAlt: 'Mountain thumbnail',
  },
  {
    src: 'https://example.com/image-2.jpg',
    alt: 'Calm ocean',
    thumbnailSrc: 'https://example.com/thumb-2.jpg',
  },
  {
    src: 'https://example.com/image-3.jpg',
    alt: 'City skyline at dusk',
    thumbnailSrc: 'https://example.com/thumb-3.jpg',
  },
];

@Component({
  standalone: true,
  imports: [GalleriaComponent],
  template: `
    <button type="button" class="outside-trigger">Before gallery</button>
    <ui-lib-galleria
      [value]="items()"
      [activeIndex]="activeIndex()"
      (activeIndexChange)="activeIndex.set($event)"
      [showThumbnails]="showThumbnails()"
      [showItemNavigators]="showItemNavigators()"
      [thumbnailsPosition]="thumbnailsPosition()"
      [fullScreen]="fullScreen()"
      [visible]="visible()"
      (visibleChange)="visible.set($event)"
      [lightboxLabel]="lightboxLabel()"
      [prevLabel]="prevLabel()"
      [nextLabel]="nextLabel()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GalleriaA11yHostComponent {
  public readonly items: WritableSignal<GalleriaItem[]> = signal<GalleriaItem[]>(TEST_ITEMS);
  public readonly activeIndex: WritableSignal<number> = signal<number>(0);
  public readonly visible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showThumbnails: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showItemNavigators: WritableSignal<boolean> = signal<boolean>(true);
  public readonly fullScreen: WritableSignal<boolean> = signal<boolean>(true);
  public readonly thumbnailsPosition: WritableSignal<GalleriaThumbnailsPosition> =
    signal<GalleriaThumbnailsPosition>('bottom');
  public readonly lightboxLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly prevLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly nextLabel: WritableSignal<string | null> = signal<string | null>(null);
}

async function createFixture(): Promise<ComponentFixture<GalleriaA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [GalleriaA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<GalleriaA11yHostComponent> =
    TestBed.createComponent(GalleriaA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getHostElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function getFullscreenOpenButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return getHostElement(fixture).querySelector(
    '.uilib-galleria__fullscreen-btn',
  ) as HTMLButtonElement;
}

function getCloseButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return getHostElement(fixture).querySelector('.uilib-galleria__close-btn') as HTMLButtonElement;
}

function getLightboxDialog(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return getHostElement(fixture).querySelector('.uilib-galleria__fullscreen-container');
}

function getMainImage(fixture: ComponentFixture<unknown>): HTMLImageElement | null {
  return getHostElement(fixture).querySelector('.uilib-galleria__item img');
}

function getThumbnailButtons(fixture: ComponentFixture<unknown>): NodeListOf<HTMLButtonElement> {
  return getHostElement(fixture).querySelectorAll<HTMLButtonElement>(
    '.uilib-galleria__thumbnail-item',
  );
}

async function openFullscreen(fixture: ComponentFixture<GalleriaA11yHostComponent>): Promise<void> {
  getFullscreenOpenButton(fixture).click();
  fixture.detectChanges();
  await fixture.whenStable();
}

describe('Galleria Accessibility', (): void => {
  afterEach((): void => {
    document.body.querySelectorAll('ui-lib-galleria').forEach((element: Element): void => {
      element.remove();
    });
    document.body.querySelectorAll('.outside-trigger').forEach((element: Element): void => {
      element.remove();
    });
    TestBed.resetTestingModule();
  });

  it('renders fullscreen overlay as a modal dialog', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    await openFullscreen(fixture);

    const dialog: HTMLElement | null = getLightboxDialog(fixture);
    expect(dialog?.getAttribute('role')).toBe('dialog');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
  });

  it('uses the fallback lightbox aria-label when no custom label is provided', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    await openFullscreen(fixture);

    const dialog: HTMLElement | null = getLightboxDialog(fixture);
    expect(dialog?.getAttribute('aria-label')).toBe('Image gallery');
  });

  it('uses a custom lightbox aria-label when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    fixture.componentInstance.lightboxLabel.set('Product gallery dialog');
    await openFullscreen(fixture);

    const dialog: HTMLElement | null = getLightboxDialog(fixture);
    expect(dialog?.getAttribute('aria-label')).toBe('Product gallery dialog');
  });

  it('moves focus to the close button when fullscreen opens', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    const openButton: HTMLButtonElement = getFullscreenOpenButton(fixture);
    openButton.focus();
    await openFullscreen(fixture);

    expect(document.activeElement).toBe(getCloseButton(fixture));
  });

  it('restores focus to the fullscreen trigger when fullscreen closes', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    getFullscreenOpenButton(fixture).focus();
    await openFullscreen(fixture);

    getCloseButton(fixture).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(getFullscreenOpenButton(fixture));
  });

  it('provides an accessible name for the close button', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    await openFullscreen(fixture);

    expect(getCloseButton(fixture).getAttribute('aria-label')).toBe('Close gallery');
  });

  it('propagates item alt text to the main image', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    fixture.componentInstance.activeIndex.set(1);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getMainImage(fixture)?.getAttribute('alt')).toBe('Calm ocean');
  });

  it('falls back to decorative alt text when item alt is blank', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    fixture.componentInstance.items.set([
      { src: 'https://example.com/image-empty-alt.jpg', alt: '   ' } as GalleriaItem,
    ]);
    fixture.componentInstance.activeIndex.set(0);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getMainImage(fixture)?.getAttribute('alt')).toBe('');
  });

  it('applies default previous and next accessible labels', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    const host: HTMLElement = getHostElement(fixture);

    expect(host.querySelector('.uilib-galleria__item-nav--prev')?.getAttribute('aria-label')).toBe(
      'Previous image',
    );
    expect(host.querySelector('.uilib-galleria__item-nav--next')?.getAttribute('aria-label')).toBe(
      'Next image',
    );
  });

  it('applies custom previous and next accessible labels', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    fixture.componentInstance.prevLabel.set('Go to previous photo');
    fixture.componentInstance.nextLabel.set('Go to next photo');
    fixture.detectChanges();
    await fixture.whenStable();

    const host: HTMLElement = getHostElement(fixture);
    expect(host.querySelector('.uilib-galleria__item-nav--prev')?.getAttribute('aria-label')).toBe(
      'Go to previous photo',
    );
    expect(host.querySelector('.uilib-galleria__item-nav--next')?.getAttribute('aria-label')).toBe(
      'Go to next photo',
    );
  });

  it('renders thumbnail strip as a semantic list and marks the active item', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    fixture.componentInstance.activeIndex.set(1);
    fixture.detectChanges();
    await fixture.whenStable();

    const thumbnailList: HTMLElement | null = getHostElement(fixture).querySelector(
      '.uilib-galleria__thumbnail-items',
    );
    const thumbnailButtons: NodeListOf<HTMLButtonElement> = getThumbnailButtons(fixture);
    expect(thumbnailList?.getAttribute('role')).toBe('list');
    expect(thumbnailButtons[1]?.getAttribute('aria-current')).toBe('true');
  });

  it('uses thumbnailAlt first, then item alt for thumbnail button labels', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    const thumbnailButtons: NodeListOf<HTMLButtonElement> = getThumbnailButtons(fixture);

    expect(thumbnailButtons[0]?.getAttribute('aria-label')).toBe('Mountain thumbnail');
    expect(thumbnailButtons[1]?.getAttribute('aria-label')).toBe('Calm ocean');
  });

  it('supports ArrowRight keyboard navigation in horizontal thumbnail mode', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    const firstThumbnail: HTMLButtonElement = getThumbnailButtons(fixture)[0] as HTMLButtonElement;
    firstThumbnail.focus();
    firstThumbnail.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const secondThumbnail: HTMLButtonElement = getThumbnailButtons(fixture)[1] as HTMLButtonElement;
    expect(fixture.componentInstance.activeIndex()).toBe(1);
    expect(document.activeElement).toBe(secondThumbnail);
  });

  it('supports ArrowDown keyboard navigation in vertical thumbnail mode', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    fixture.componentInstance.thumbnailsPosition.set('left');
    fixture.detectChanges();
    await fixture.whenStable();

    const firstThumbnail: HTMLButtonElement = getThumbnailButtons(fixture)[0] as HTMLButtonElement;
    firstThumbnail.focus();
    firstThumbnail.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const secondThumbnail: HTMLButtonElement = getThumbnailButtons(fixture)[1] as HTMLButtonElement;
    expect(fixture.componentInstance.activeIndex()).toBe(1);
    expect(document.activeElement).toBe(secondThumbnail);
  });

  it('passes axe checks in inline mode', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe checks when fullscreen dialog is open', async (): Promise<void> => {
    const fixture: ComponentFixture<GalleriaA11yHostComponent> = await createFixture();
    await openFullscreen(fixture);

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
