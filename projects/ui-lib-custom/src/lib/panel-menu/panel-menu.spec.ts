import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { PanelMenu } from './panel-menu';
import type {
  PanelMenuCommandEvent,
  PanelMenuItem,
  PanelMenuPanelToggleEvent,
} from './panel-menu.types';
import { ThemeConfigService } from 'ui-lib-custom/theme';

@Component({
  standalone: true,
  imports: [PanelMenu],
  template: `
    <ui-lib-panel-menu
      [model]="model()"
      [multiple]="multiple()"
      [variant]="variant()"
      [size]="size()"
      [ariaLabel]="ariaLabel()"
      (itemClick)="onItemClick($event)"
      (panelToggle)="onPanelToggle($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly model: WritableSignal<PanelMenuItem[]> = signal<PanelMenuItem[]>([]);
  public readonly multiple: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<'material' | 'bootstrap' | 'minimal' | null> = signal<
    'material' | 'bootstrap' | 'minimal' | null
  >(null);
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Panel Menu');

  public lastItemClick: PanelMenuCommandEvent | null = null;
  public lastPanelToggle: PanelMenuPanelToggleEvent | null = null;

  public onItemClick(event: PanelMenuCommandEvent): void {
    this.lastItemClick = event;
  }
  public onPanelToggle(event: PanelMenuPanelToggleEvent): void {
    this.lastPanelToggle = event;
  }
}

function setup(): {
  fixture: ComponentFixture<TestHostComponent>;
  host: TestHostComponent;
  el: HTMLElement;
} {
  TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideZonelessChangeDetection(), ThemeConfigService],
  });
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  const host: TestHostComponent = fixture.componentInstance;
  const el: HTMLElement = fixture.nativeElement as HTMLElement;
  return { fixture, host, el };
}

const basicModel: PanelMenuItem[] = [
  {
    label: 'Account',
    items: [
      { label: 'Profile', icon: 'pi pi-user' },
      { label: 'Settings', icon: 'pi pi-cog' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Projects', icon: 'pi pi-briefcase' },
      { label: 'Analytics', icon: 'pi pi-chart-bar' },
    ],
  },
  {
    label: 'Support',
    items: [{ label: 'Help', icon: 'pi pi-question-circle' }],
  },
];

describe('PanelMenu', (): void => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a container with aria role and label', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.ariaLabel.set('Navigation');
    fixture.detectChanges();

    const container: HTMLElement | null = el.querySelector('.ui-lib-panel-menu__container');
    expect(container).toBeTruthy();
    expect(container?.getAttribute('role')).toBe('menu');
    expect(container?.getAttribute('aria-label')).toBe('Navigation');
  });

  it('renders one panel per root item', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    fixture.detectChanges();

    const panels: NodeListOf<HTMLElement> = el.querySelectorAll('.ui-lib-panel-menu__panel');
    expect(panels.length).toBe(3);
  });

  it('renders panel headers with correct labels', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    fixture.detectChanges();

    const labels: NodeListOf<HTMLElement> = el.querySelectorAll('.ui-lib-panel-menu__header-label');
    const label0: HTMLElement = labels[0] as HTMLElement;
    const label1: HTMLElement = labels[1] as HTMLElement;
    expect((label0.textContent as string).trim()).toBe('Account');
    expect((label1.textContent as string).trim()).toBe('Workspace');
  });

  it('does not render hidden items (visible === false)', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([
      { label: 'Visible', items: [{ label: 'Child' }] },
      { label: 'Hidden', visible: false, items: [{ label: 'Child' }] },
    ]);
    fixture.detectChanges();

    const panels: NodeListOf<HTMLElement> = el.querySelectorAll('.ui-lib-panel-menu__panel');
    expect(panels.length).toBe(1);
  });

  it('renders separator items', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([
      { label: 'A', items: [{ label: 'A1' }] },
      { separator: true },
      { label: 'B', items: [{ label: 'B1' }] },
    ]);
    fixture.detectChanges();

    const separators: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__separator'
    );
    expect(separators.length).toBe(1);
  });

  // ── Expansion (single mode) ────────────────────────────────────────────────

  it('starts collapsed by default', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    fixture.detectChanges();

    const expanded: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__panel--expanded'
    );
    expect(expanded.length).toBe(0);
  });

  it('expands a panel when its header is clicked', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    fixture.detectChanges();

    const firstHeader: HTMLButtonElement = el.querySelector(
      '.ui-lib-panel-menu__header'
    ) as HTMLButtonElement;
    firstHeader.click();
    fixture.detectChanges();

    const expanded: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__panel--expanded'
    );
    expect(expanded.length).toBe(1);
  });

  it('collapses a panel when its header is clicked again', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    fixture.detectChanges();

    const firstHeader: HTMLButtonElement = el.querySelector(
      '.ui-lib-panel-menu__header'
    ) as HTMLButtonElement;
    firstHeader.click();
    fixture.detectChanges();
    firstHeader.click();
    fixture.detectChanges();

    const expanded: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__panel--expanded'
    );
    expect(expanded.length).toBe(0);
  });

  it('collapses previously opened panel in single mode', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.multiple.set(false);
    fixture.detectChanges();

    const headers: NodeListOf<HTMLButtonElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__header'
    );
    (headers[0] as HTMLButtonElement).click();
    fixture.detectChanges();
    (headers[1] as HTMLButtonElement).click();
    fixture.detectChanges();

    const expanded: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__panel--expanded'
    );
    expect(expanded.length).toBe(1);
  });

  // ── Expansion (multiple mode) ──────────────────────────────────────────────

  it('allows multiple panels open in multiple mode', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.multiple.set(true);
    fixture.detectChanges();

    const headers: NodeListOf<HTMLButtonElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__header'
    );
    (headers[0] as HTMLButtonElement).click();
    fixture.detectChanges();
    (headers[1] as HTMLButtonElement).click();
    fixture.detectChanges();

    const expanded: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__panel--expanded'
    );
    expect(expanded.length).toBe(2);
  });

  // ── Initial expansion ─────────────────────────────────────────────────────

  it('respects item.expanded=true on initial render', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([
      { label: 'A', expanded: true, items: [{ label: 'A1' }] },
      { label: 'B', items: [{ label: 'B1' }] },
    ]);
    fixture.detectChanges();

    const expanded: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__panel--expanded'
    );
    expect(expanded.length).toBe(1);
  });

  // ── Disabled ──────────────────────────────────────────────────────────────

  it('does not expand a disabled root item', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([{ label: 'Disabled', disabled: true, items: [{ label: 'Child' }] }]);
    fixture.detectChanges();

    const header: HTMLButtonElement = el.querySelector(
      '.ui-lib-panel-menu__header'
    ) as HTMLButtonElement;
    expect(header.disabled).toBe(true);
  });

  // ── Outputs ───────────────────────────────────────────────────────────────

  it('emits panelToggle when a root panel expands', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    fixture.detectChanges();

    const firstHeader: HTMLButtonElement = el.querySelector(
      '.ui-lib-panel-menu__header'
    ) as HTMLButtonElement;
    firstHeader.click();
    fixture.detectChanges();

    expect(host.lastPanelToggle).not.toBeNull();
    expect(host.lastPanelToggle?.expanded).toBe(true);
    expect(host.lastPanelToggle?.key).toBe('0');
  });

  it('emits panelToggle with expanded=false when a panel collapses', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    fixture.detectChanges();

    const firstHeader: HTMLButtonElement = el.querySelector(
      '.ui-lib-panel-menu__header'
    ) as HTMLButtonElement;
    firstHeader.click();
    fixture.detectChanges();
    firstHeader.click();
    fixture.detectChanges();

    expect(host.lastPanelToggle?.expanded).toBe(false);
  });

  it('emits itemClick when a leaf item is activated', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([
      {
        label: 'Group',
        expanded: true,
        items: [{ label: 'Leaf' }],
      },
    ]);
    fixture.detectChanges();

    const link: HTMLElement | null = el.querySelector('.ui-lib-panel-menu__sub-link');
    link?.click();
    fixture.detectChanges();

    expect(host.lastItemClick).not.toBeNull();
    expect(host.lastItemClick?.item.label).toBe('Leaf');
  });

  it('invokes command callback when a leaf item is activated', (): void => {
    const { fixture, host, el } = setup();
    const commandSpy: jest.Mock = jest.fn();
    host.model.set([
      {
        label: 'Group',
        expanded: true,
        items: [{ label: 'Action', command: commandSpy }],
      },
    ]);
    fixture.detectChanges();

    const link: HTMLElement | null = el.querySelector('.ui-lib-panel-menu__sub-link');
    link?.click();
    fixture.detectChanges();

    expect(commandSpy).toHaveBeenCalledTimes(1);
  });

  // ── Variants ──────────────────────────────────────────────────────────────

  it('applies material variant class', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.variant.set('material');
    fixture.detectChanges();

    expect(el.querySelector('ui-lib-panel-menu')?.className).toContain(
      'ui-lib-panel-menu--variant-material'
    );
  });

  it('applies bootstrap variant class', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.variant.set('bootstrap');
    fixture.detectChanges();

    expect(el.querySelector('ui-lib-panel-menu')?.className).toContain(
      'ui-lib-panel-menu--variant-bootstrap'
    );
  });

  it('applies minimal variant class', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.variant.set('minimal');
    fixture.detectChanges();

    expect(el.querySelector('ui-lib-panel-menu')?.className).toContain(
      'ui-lib-panel-menu--variant-minimal'
    );
  });

  // ── Sizes ─────────────────────────────────────────────────────────────────

  it('applies sm size class', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.size.set('sm');
    fixture.detectChanges();

    expect(el.querySelector('ui-lib-panel-menu')?.className).toContain(
      'ui-lib-panel-menu--size-sm'
    );
  });

  it('applies lg size class', (): void => {
    const { fixture, host, el } = setup();
    host.model.set(basicModel);
    host.size.set('lg');
    fixture.detectChanges();

    expect(el.querySelector('ui-lib-panel-menu')?.className).toContain(
      'ui-lib-panel-menu--size-lg'
    );
  });

  // ── Sub-items ─────────────────────────────────────────────────────────────

  it('renders sub-items when panel is expanded', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([
      {
        label: 'Group',
        expanded: true,
        items: [{ label: 'Item A' }, { label: 'Item B' }],
      },
    ]);
    fixture.detectChanges();

    const links: NodeListOf<HTMLElement> = el.querySelectorAll('.ui-lib-panel-menu__sub-link');
    expect(links.length).toBe(2);
  });

  it('renders sub-items with icons', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([
      {
        label: 'Group',
        expanded: true,
        items: [{ label: 'Profile', icon: 'pi pi-user' }],
      },
    ]);
    fixture.detectChanges();

    const icon: HTMLElement | null = el.querySelector('.ui-lib-panel-menu__sub-icon');
    expect(icon).toBeTruthy();
    expect(icon?.className).toContain('pi pi-user');
  });

  it('renders header toggle chevron only for items with children', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([{ label: 'WithChildren', items: [{ label: 'Child' }] }, { label: 'Leaf' }]);
    fixture.detectChanges();

    const toggleIcons: NodeListOf<HTMLElement> = el.querySelectorAll(
      '.ui-lib-panel-menu__header-toggle'
    );
    // Only panel with children should have toggle
    expect(toggleIcons.length).toBe(1);
  });

  // ── URL items ─────────────────────────────────────────────────────────────

  it('renders leaf items with url as anchor with href', (): void => {
    const { fixture, host, el } = setup();
    host.model.set([
      {
        label: 'Links',
        expanded: true,
        items: [{ label: 'Angular', url: 'https://angular.dev', target: '_blank' }],
      },
    ]);
    fixture.detectChanges();

    const anchor: HTMLAnchorElement | null = el.querySelector('a.ui-lib-panel-menu__sub-link');
    expect(anchor?.getAttribute('href')).toBe('https://angular.dev');
    expect(anchor?.getAttribute('target')).toBe('_blank');
  });
});
