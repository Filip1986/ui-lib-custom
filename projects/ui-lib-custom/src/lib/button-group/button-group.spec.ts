import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  provideZonelessChangeDetection,
  type WritableSignal,
} from '@angular/core';
import { ButtonGroup } from './button-group';
import { Button } from '../button/button';
import type { ButtonSize, ButtonVariant } from '../button/button';

@Component({
  standalone: true,
  imports: [ButtonGroup, Button],
  template: `
    <ui-lib-button-group
      [variant]="variant()"
      [orientation]="orientation()"
      [vertical]="vertical()"
      [size]="size()"
      [ariaLabel]="ariaLabel()"
    >
      <ui-lib-button>One</ui-lib-button>
      <ui-lib-button>Two</ui-lib-button>
    </ui-lib-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
  public readonly variant: WritableSignal<ButtonVariant> = signal<ButtonVariant>('material');
  public readonly orientation: WritableSignal<'horizontal' | 'vertical'> = signal<
    'horizontal' | 'vertical'
  >('horizontal');
  public readonly vertical: WritableSignal<boolean> = signal<boolean>(false);
  public readonly size: WritableSignal<ButtonSize> = signal<ButtonSize>('md');
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>('Group actions');
}

describe('ButtonGroup', (): void => {
  let fixture: ComponentFixture<HostComponent>;

  const getHost: () => HTMLElement = (): HTMLElement =>
    (fixture.nativeElement as HTMLElement).querySelector('ui-lib-button-group') as HTMLElement;
  const getGroup: () => HTMLElement = (): HTMLElement =>
    (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-button-group .ui-lib-button-group__group',
    ) as HTMLElement;
  const getButtons: () => HTMLButtonElement[] = (): HTMLButtonElement[] =>
    Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button'),
    ) as HTMLButtonElement[];

  const getRequiredButton: (buttons: HTMLButtonElement[], index: number) => HTMLButtonElement = (
    buttons: HTMLButtonElement[],
    index: number,
  ): HTMLButtonElement => {
    const button: HTMLButtonElement | undefined = buttons[index];
    if (!button) {
      throw new Error(`Expected button at index ${index}.`);
    }
    return button;
  };

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  describe('basic rendering', (): void => {
    it('renders with ui-lib-button-group class and projects children', (): void => {
      expect(getHost().classList.contains('ui-lib-button-group')).toBeTruthy();
      const buttons: HTMLButtonElement[] = getButtons();
      expect(buttons.length).toBe(2);
      const firstText: string | null = getRequiredButton(buttons, 0).textContent;
      const secondText: string | null = getRequiredButton(buttons, 1).textContent;
      expect(firstText).toBeTruthy();
      expect(secondText).toBeTruthy();
      expect((firstText as string).trim()).toBe('One');
      expect((secondText as string).trim()).toBe('Two');
    });

    it('has role="group" attribute', (): void => {
      expect(getGroup().getAttribute('role')).toBe('group');
    });
  });

  describe('orientation', (): void => {
    it('is horizontal by default', (): void => {
      expect(getHost().classList.contains('ui-lib-button-group--vertical')).toBeFalsy();
    });

    it('applies vertical class when orientation=vertical', (): void => {
      fixture.componentInstance.orientation.set('vertical');
      fixture.detectChanges();
      expect(getHost().classList.contains('ui-lib-button-group--vertical')).toBeTruthy();
    });

    it('keeps backwards compatibility when vertical=true', (): void => {
      fixture.componentInstance.vertical.set(true);
      fixture.detectChanges();
      expect(getHost().classList.contains('ui-lib-button-group--vertical')).toBeTruthy();
    });
  });

  describe('variant inheritance', (): void => {
    it('applies material class by default', (): void => {
      expect(getHost().classList.contains('ui-lib-button-group--material')).toBeTruthy();
    });

    it('applies bootstrap class when variant=bootstrap', (): void => {
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getHost().classList.contains('ui-lib-button-group--bootstrap')).toBeTruthy();
    });

    it('applies minimal class when variant=minimal', (): void => {
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      expect(getHost().classList.contains('ui-lib-button-group--minimal')).toBeTruthy();
    });
  });

  describe('size inheritance', (): void => {
    it('applies small size class for "sm"', (): void => {
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      expect(getHost().classList.contains('ui-lib-button-group--size-small')).toBeTruthy();
    });

    it('applies NO size class for default "md"', (): void => {
      fixture.componentInstance.size.set('md');
      fixture.detectChanges();
      expect(getHost().classList.contains('ui-lib-button-group--size-small')).toBeFalsy();
      expect(getHost().classList.contains('ui-lib-button-group--size-large')).toBeFalsy();
    });

    it('applies large size class for "lg"', (): void => {
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      expect(getHost().classList.contains('ui-lib-button-group--size-large')).toBeTruthy();
    });
  });

  describe('accessibility', (): void => {
    it('role group is present', (): void => {
      expect(getGroup().getAttribute('role')).toBe('group');
    });

    it('sets aria-label when provided', (): void => {
      fixture.componentInstance.ariaLabel.set('Formatting actions');
      fixture.detectChanges();
      expect(getGroup().getAttribute('aria-label')).toBe('Formatting actions');
    });

    it('buttons remain focusable in order', (): void => {
      const buttons: HTMLButtonElement[] = getButtons();
      expect(getRequiredButton(buttons, 0).tabIndex).toBe(0);
      expect(getRequiredButton(buttons, 1).tabIndex).toBe(0);
    });
  });
});
