import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal, provideZonelessChangeDetection } from '@angular/core';
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
})
class HostComponent {
  variant = signal<ButtonVariant>('material');
  vertical = signal<boolean>(false);
  size = signal<ButtonSize | null>(null);
}

describe('ButtonGroup', () => {
  let fixture: ComponentFixture<HostComponent>;

  const getGroup = (): HTMLElement => fixture.nativeElement.querySelector('ui-lib-button-group');
  const getButtons = (): NodeListOf<HTMLButtonElement> =>
    fixture.nativeElement.querySelectorAll('button');

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
      expect(group.classList.contains('btn-group')).toBeTrue();
      const buttons = getButtons();
      expect(buttons.length).toBe(2);
      expect(buttons[0].textContent?.trim()).toBe('One');
      expect(buttons[1].textContent?.trim()).toBe('Two');
    });

    it('has role="group" attribute', () => {
      expect(getGroup().getAttribute('role')).toBe('group');
    });
  });

  describe('orientation', () => {
    it('is horizontal by default', () => {
      expect(getGroup().classList.contains('btn-group-vertical')).toBeFalse();
    });

    it('applies vertical class when vertical=true', () => {
      fixture.componentInstance.vertical.set(true);
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-vertical')).toBeTrue();
    });
  });

  describe('variant inheritance', () => {
    it('applies material class by default', () => {
      expect(getGroup().classList.contains('btn-group-material')).toBeTrue();
    });

    it('applies bootstrap class when variant=bootstrap', () => {
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-bootstrap')).toBeTrue();
    });

    it('applies minimal class when variant=minimal', () => {
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-minimal')).toBeTrue();
    });
  });

  describe('size inheritance', () => {
    it('applies small size class hook', () => {
      fixture.componentInstance.size.set('small');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-size-small')).toBeTrue();
    });

    it('applies large size class hook', () => {
      fixture.componentInstance.size.set('large');
      fixture.detectChanges();
      expect(getGroup().classList.contains('btn-group-size-large')).toBeTrue();
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
