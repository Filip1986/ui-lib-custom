import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ScrollPanel } from './scroll-panel';
import type { ScrollPanelVariant } from './scroll-panel.types';

@Component({
  standalone: true,
  imports: [ScrollPanel],
  template: `
    <ui-lib-scroll-panel [variant]="variant()" [styleClass]="styleClass()">
      <p class="test-content">Scrollable content</p>
    </ui-lib-scroll-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly variant: WritableSignal<ScrollPanelVariant | null> =
    signal<ScrollPanelVariant | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
}

@Component({
  standalone: true,
  imports: [ScrollPanel],
  template: `
    <ui-lib-scroll-panel>
      <span class="projected-a">First</span>
      <span class="projected-b">Second</span>
    </ui-lib-scroll-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProjectionHostComponent {}

describe('ScrollPanel', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getPanel(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-scroll-panel',
    ) as HTMLElement;
  }

  function getContent(): HTMLElement {
    return getPanel().querySelector('.ui-lib-scroll-panel__content') as HTMLElement;
  }

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', (): void => {
    it('should create the component', (): void => {
      expect(getPanel()).toBeTruthy();
    });

    it('should render the content wrapper', (): void => {
      expect(getContent()).toBeTruthy();
    });

    it('should apply the base host class', (): void => {
      expect(getPanel().classList).toContain('ui-lib-scroll-panel');
    });

    it('should project content into the content wrapper', (): void => {
      const projected: HTMLElement | null = getContent().querySelector('.test-content');
      expect(projected).toBeTruthy();
      expect(projected!.textContent!.trim()).toBe('Scrollable content');
    });
  });

  describe('variant input', (): void => {
    it('should apply a default variant class from ThemeConfigService', (): void => {
      const classes: DOMTokenList = getPanel().classList;
      const hasVariant: boolean =
        classes.contains('ui-lib-scroll-panel--variant-material') ||
        classes.contains('ui-lib-scroll-panel--variant-bootstrap') ||
        classes.contains('ui-lib-scroll-panel--variant-minimal');
      expect(hasVariant).toBe(true);
    });

    it('should apply the material variant class', (): void => {
      host.variant.set('material');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ui-lib-scroll-panel--variant-material');
    });

    it('should apply the bootstrap variant class', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ui-lib-scroll-panel--variant-bootstrap');
    });

    it('should apply the minimal variant class', (): void => {
      host.variant.set('minimal');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ui-lib-scroll-panel--variant-minimal');
    });

    it('should not apply multiple variant classes simultaneously', (): void => {
      host.variant.set('material');
      fixture.detectChanges();
      const classes: DOMTokenList = getPanel().classList;
      expect(classes).not.toContain('ui-lib-scroll-panel--variant-bootstrap');
      expect(classes).not.toContain('ui-lib-scroll-panel--variant-minimal');
    });

    it('should switch variant class when variant input changes', (): void => {
      host.variant.set('material');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ui-lib-scroll-panel--variant-material');

      host.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ui-lib-scroll-panel--variant-bootstrap');
      expect(getPanel().classList).not.toContain('ui-lib-scroll-panel--variant-material');
    });
  });

  describe('styleClass input', (): void => {
    it('should apply an extra class when styleClass is set', (): void => {
      host.styleClass.set('my-custom-panel');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('my-custom-panel');
    });

    it('should remove the extra class when styleClass is cleared', (): void => {
      host.styleClass.set('my-custom-panel');
      fixture.detectChanges();
      host.styleClass.set(null);
      fixture.detectChanges();
      expect(getPanel().classList).not.toContain('my-custom-panel');
    });

    it('should not add extraneous class when styleClass is null', (): void => {
      host.styleClass.set(null);
      fixture.detectChanges();
      expect(getPanel().classList.length).toBe(2); // base + variant
    });
  });

  describe('content projection', (): void => {
    it('should project multiple children into the content wrapper', async (): Promise<void> => {
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [ProjectionHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const projectionFixture: ComponentFixture<ProjectionHostComponent> =
        TestBed.createComponent(ProjectionHostComponent);
      projectionFixture.detectChanges();

      const panel: HTMLElement = (projectionFixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-scroll-panel',
      ) as HTMLElement;
      const content: HTMLElement = panel.querySelector(
        '.ui-lib-scroll-panel__content',
      ) as HTMLElement;

      expect(content.querySelector('.projected-a')).toBeTruthy();
      expect(content.querySelector('.projected-b')).toBeTruthy();
    });
  });
});
