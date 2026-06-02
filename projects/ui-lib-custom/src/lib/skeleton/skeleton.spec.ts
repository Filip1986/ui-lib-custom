import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { Skeleton } from './skeleton';
import type { SkeletonAnimation, SkeletonShape, SkeletonVariant } from './skeleton.types';

@Component({
  selector: 'app-test-host',
  standalone: true,
  imports: [Skeleton],
  template: `
    <ui-lib-skeleton
      [loading]="loadingSignal()"
      [shape]="shapeSignal()"
      [width]="widthSignal()"
      [height]="heightSignal()"
      [size]="sizeSignal()"
      [borderRadius]="borderRadiusSignal()"
      [animation]="animationSignal()"
      [variant]="variantSignal()"
      [styleClass]="styleClassSignal()"
      [ariaLabel]="ariaLabelSignal()"
    >
      <span class="loaded-content">Loaded content</span>
    </ui-lib-skeleton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly loadingSignal: WritableSignal<boolean> = signal<boolean>(true);
  public readonly shapeSignal: WritableSignal<SkeletonShape> = signal<SkeletonShape>('rectangle');
  public readonly widthSignal: WritableSignal<string> = signal<string>('100%');
  public readonly heightSignal: WritableSignal<string> = signal<string>('1rem');
  public readonly sizeSignal: WritableSignal<string | null> = signal<string | null>(null);
  public readonly borderRadiusSignal: WritableSignal<string | null> = signal<string | null>(null);
  public readonly animationSignal: WritableSignal<SkeletonAnimation> =
    signal<SkeletonAnimation>('wave');
  public readonly variantSignal: WritableSignal<SkeletonVariant | null> =
    signal<SkeletonVariant | null>(null);
  public readonly styleClassSignal: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabelSignal: WritableSignal<string> = signal<string>('Loading content');
}

function setup(configure?: (host: TestHostComponent) => void): {
  host: TestHostComponent;
  skeleton: HTMLElement;
} {
  TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  if (configure) {
    configure(fixture.componentInstance);
  }
  fixture.detectChanges();
  const root: HTMLElement = fixture.nativeElement as HTMLElement;
  return {
    host: fixture.componentInstance,
    skeleton: root.querySelector('ui-lib-skeleton') as HTMLElement,
  };
}

describe('Skeleton', (): void => {
  it('should create', (): void => {
    const { skeleton } = setup();
    expect(skeleton).toBeTruthy();
  });

  it('should have base class', (): void => {
    const { skeleton } = setup();
    expect(skeleton.classList).toContain('ui-lib-skeleton');
  });

  it('should apply rectangle shape class by default', (): void => {
    const { skeleton } = setup();
    expect(skeleton.classList).toContain('ui-lib-skeleton--shape-rectangle');
  });

  it('should apply circle shape class when shape is circle', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.shapeSignal.set('circle');
    });
    expect(skeleton.classList).toContain('ui-lib-skeleton--shape-circle');
  });

  it('should apply wave animation class by default', (): void => {
    const { skeleton } = setup();
    expect(skeleton.classList).toContain('ui-lib-skeleton--wave');
  });

  it('should not apply wave class when animation is none', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.animationSignal.set('none');
    });
    expect(skeleton.classList).not.toContain('ui-lib-skeleton--wave');
  });

  it('should apply material variant class by default (from ThemeConfigService)', (): void => {
    const { skeleton } = setup();
    expect(skeleton.classList).toContain('ui-lib-skeleton--variant-material');
  });

  it('should apply bootstrap variant class when set', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.variantSignal.set('bootstrap');
    });
    expect(skeleton.classList).toContain('ui-lib-skeleton--variant-bootstrap');
  });

  it('should apply minimal variant class when set', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.variantSignal.set('minimal');
    });
    expect(skeleton.classList).toContain('ui-lib-skeleton--variant-minimal');
  });

  it('should apply default width of 100%', (): void => {
    const { skeleton } = setup();
    expect(skeleton.style.width).toBe('100%');
  });

  it('should apply default height of 1rem', (): void => {
    const { skeleton } = setup();
    expect(skeleton.style.height).toBe('1rem');
  });

  it('should apply custom width', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.widthSignal.set('12rem');
    });
    expect(skeleton.style.width).toBe('12rem');
  });

  it('should apply custom height', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.heightSignal.set('3rem');
    });
    expect(skeleton.style.height).toBe('3rem');
  });

  it('should use size input for both width and height', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.sizeSignal.set('5rem');
    });
    expect(skeleton.style.width).toBe('5rem');
    expect(skeleton.style.height).toBe('5rem');
  });

  it('should override width/height when size is set alongside them', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.widthSignal.set('20rem');
      host.heightSignal.set('2rem');
      host.sizeSignal.set('6rem');
    });
    expect(skeleton.style.width).toBe('6rem');
    expect(skeleton.style.height).toBe('6rem');
  });

  it('should apply custom borderRadius style', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.borderRadiusSignal.set('8px');
    });
    expect(skeleton.style.borderRadius).toBe('8px');
  });

  it('should not set borderRadius style when borderRadius is null', (): void => {
    const { skeleton } = setup();
    expect(skeleton.style.borderRadius).toBe('');
  });

  it('should apply additional styleClass', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.styleClassSignal.set('my-custom-class');
    });
    expect(skeleton.classList).toContain('my-custom-class');
  });

  it('should have aria-busy="true" by default', (): void => {
    const { skeleton } = setup();
    expect(skeleton.getAttribute('aria-busy')).toBe('true');
  });

  it('should render the placeholder as aria-hidden while loading', (): void => {
    const { skeleton } = setup();
    const placeholder: Element | null = skeleton.querySelector('.ui-lib-skeleton__placeholder');
    expect(placeholder?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render the shimmer inner element as aria-hidden', (): void => {
    const { skeleton } = setup();
    const shimmer: Element | null = skeleton.querySelector('.ui-lib-skeleton__shimmer');
    expect(shimmer).toBeTruthy();
    expect(shimmer?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should apply a unique host id', (): void => {
    const { skeleton } = setup();
    expect(skeleton.id).toMatch(/^ui-lib-skeleton-\d+$/);
  });

  it('should render projected content and remove the placeholder when loading is false', (): void => {
    const { skeleton } = setup((host: TestHostComponent): void => {
      host.loadingSignal.set(false);
    });
    expect(skeleton.getAttribute('aria-busy')).toBe('false');
    expect(skeleton.querySelector('.ui-lib-skeleton__placeholder')).toBeNull();
    const loadedContent: Element = skeleton.querySelector('.loaded-content') as Element;
    const contentText: string = loadedContent.textContent as string;
    expect(contentText.trim()).toBe('Loaded content');
  });
});
