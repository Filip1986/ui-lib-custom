import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  provideZonelessChangeDetection,
} from '@angular/core';
import { ButtonGroup } from './button-group';
import { Button, ButtonSize, ButtonVariant } from '../button/button';
import { Icon } from '../icon/icon';

@Component({
  standalone: true,
  imports: [ButtonGroup, Button, Icon],
  template: `
    <ui-lib-button-group [variant]="variant()" [vertical]="vertical()" [size]="size()">
      <ui-lib-button>One</ui-lib-button>
      <ui-lib-button>Two</ui-lib-button>
    </ui-lib-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
  public readonly variant = signal<ButtonVariant>('material');
  public readonly vertical = signal<boolean>(false);
  public readonly size = signal<ButtonSize>('md');
}

describe('ButtonGroup', () => {
  let fixture: ComponentFixture<HostComponent>;

  const getGroup = (): HTMLElement =>
    (fixture.nativeElement as HTMLElement).querySelector('ui-lib-button-group') as HTMLElement;
  const getButtons = (): NodeListOf<HTMLButtonElement> =>
    (fixture.nativeElement as HTMLElement).querySelectorAll('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  describe('basic rendering', () => {
    it('renders with btn-group class and projects children', () => {
      const group = getGroup();
      expect(group.classList.contains('btn-group')).toBeTruthy();
      const buttons = getButtons();
      expect(buttons.length).toBe(2);
      const firstText = buttons[0].textContent;
      const secondText = buttons[1].textContent;
      expect(firstText).toBeTruthy();
      expect(secondText).toBeTruthy();
      expect((firstText as string).trim()).toBe('One');
      expect((secondText as string).trim()).toBe('Two');
    });

    it('has role="group" attribute', () => {
      expect(getGroup().getAttribute('role')).toBe('group');
    });
  });

  describe('orientation', () => {
    it('is horizontal by default', () => {
      expect(getGroup().classList.contains('btn-group-vertical')).toBeFalsy();
    });

    it('applies vertical class when vertical=true', () => {
      fixture.componentInstance.vertical.set(true);
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-vertical')).toBeTruthy();
    });
  });

  describe('variant inheritance', () => {
    it('applies material class by default', () => {
      expect(getGroup().classList.contains('btn-group-material')).toBeTruthy();
    });

    it('applies bootstrap class when variant=bootstrap', () => {
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-bootstrap')).toBeTruthy();
    });

    it('applies minimal class when variant=minimal', () => {
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-minimal')).toBeTruthy();
    });
  });

  describe('size inheritance', () => {
    it('applies small size class hook', () => {
      fixture.componentInstance.size.set('small');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-size-small')).toBeTruthy();
    });

    it('applies large size class hook', () => {
      fixture.componentInstance.size.set('large');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-size-large')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('role group is present', () => {
      expect(getGroup().getAttribute('role')).toBe('group');
    });

    it('buttons remain focusable in order', () => {
      const buttons = getButtons();
      expect(buttons[0].tabIndex).toBe(0);
      expect(buttons[1].tabIndex).toBe(0);
    });
  });
});
