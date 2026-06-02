import { signal, type WritableSignal } from '@angular/core';

import type { Meta, StoryObj } from '@storybook/angular';

import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

import { Drawer } from './drawer';
import type { DrawerPosition, DrawerVariant } from './drawer.types';

type DrawerStoryArgs = {
  header: string;
  position: DrawerPosition;
  size: string;
  modal: boolean;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  showCloseButton: boolean;
  variant: DrawerVariant | null;
};

type Story = StoryObj<DrawerStoryArgs>;

const meta: Meta<DrawerStoryArgs> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    header: { control: 'text' },
    position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    size: { control: 'text' },
    modal: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
  },
};

export default meta;

const renderDrawer: (args: Partial<DrawerStoryArgs>) => {
  props: Partial<DrawerStoryArgs> & { visible: WritableSignal<boolean> };
  moduleMetadata: { imports: unknown[] };
  template: string;
} = (
  args: Partial<DrawerStoryArgs>,
): {
  props: Partial<DrawerStoryArgs> & { visible: WritableSignal<boolean> };
  moduleMetadata: { imports: unknown[] };
  template: string;
} => {
  const visible: WritableSignal<boolean> = signal<boolean>(false);
  return {
    moduleMetadata: { imports: [Drawer, Button] },
    props: { ...args, visible },
    template: `
      <ui-lib-button (click)="visible.set(true)">Open Drawer</ui-lib-button>
      <ui-lib-drawer
        [(visible)]="visible"
        [header]="header"
        [position]="position"
        [size]="size"
        [modal]="modal"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
        [showCloseButton]="showCloseButton"
        [variant]="variant"
      >
        <p>Drawer content goes here. This panel slides in from the {{ position }} edge.</p>
        <p>You can place forms, navigation links, or any other content here.</p>
        <div drawerFooter style="display:flex; justify-content:flex-end;">
          <ui-lib-button (click)="visible.set(false)">Close</ui-lib-button>
        </div>
      </ui-lib-drawer>
    `,
  };
};

export const Default: Story = {
  render: renderDrawer,
  args: {
    header: 'Drawer',
    position: 'right',
    size: '300px',
    modal: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
    variant: null,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: {
      themeVariants: typeof SHARED_THEME_VARIANTS;
      materialVisible: WritableSignal<boolean>;
      bootstrapVisible: WritableSignal<boolean>;
      minimalVisible: WritableSignal<boolean>;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const materialVisible: WritableSignal<boolean> = signal<boolean>(false);
    const bootstrapVisible: WritableSignal<boolean> = signal<boolean>(false);
    const minimalVisible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [Drawer, Button] },
      props: {
        themeVariants: SHARED_THEME_VARIANTS,
        materialVisible,
        bootstrapVisible,
        minimalVisible,
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button [variant]="themeVariants.Material" (click)="materialVisible.set(true)">Material</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Bootstrap" (click)="bootstrapVisible.set(true)">Bootstrap</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Minimal" (click)="minimalVisible.set(true)">Minimal</ui-lib-button>
        </div>
        <ui-lib-drawer [(visible)]="materialVisible" header="Material Drawer" [variant]="themeVariants.Material">
          <p>Material design drawer with surface elevation and smooth transitions.</p>
        </ui-lib-drawer>
        <ui-lib-drawer [(visible)]="bootstrapVisible" header="Bootstrap Drawer" [variant]="themeVariants.Bootstrap">
          <p>Bootstrap-style drawer with bordered container.</p>
        </ui-lib-drawer>
        <ui-lib-drawer [(visible)]="minimalVisible" header="Minimal Drawer" [variant]="themeVariants.Minimal">
          <p>Minimal drawer with clean, understated styling.</p>
        </ui-lib-drawer>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const Positions: Story = {
  render: (): {
    props: {
      leftVisible: WritableSignal<boolean>;
      rightVisible: WritableSignal<boolean>;
      topVisible: WritableSignal<boolean>;
      bottomVisible: WritableSignal<boolean>;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const leftVisible: WritableSignal<boolean> = signal<boolean>(false);
    const rightVisible: WritableSignal<boolean> = signal<boolean>(false);
    const topVisible: WritableSignal<boolean> = signal<boolean>(false);
    const bottomVisible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [Drawer, Button] },
      props: { leftVisible, rightVisible, topVisible, bottomVisible },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button (click)="leftVisible.set(true)">Left</ui-lib-button>
          <ui-lib-button (click)="rightVisible.set(true)">Right</ui-lib-button>
          <ui-lib-button (click)="topVisible.set(true)">Top</ui-lib-button>
          <ui-lib-button (click)="bottomVisible.set(true)">Bottom</ui-lib-button>
        </div>
        <ui-lib-drawer [(visible)]="leftVisible" header="Left Drawer" position="left" size="280px">
          <p>Slides in from the left — typical for navigation sidebars.</p>
        </ui-lib-drawer>
        <ui-lib-drawer [(visible)]="rightVisible" header="Right Drawer" position="right" size="320px">
          <p>Slides in from the right — common for detail panels and settings.</p>
        </ui-lib-drawer>
        <ui-lib-drawer [(visible)]="topVisible" header="Top Drawer" position="top" size="200px">
          <p>Slides in from the top — good for notifications or quick actions.</p>
        </ui-lib-drawer>
        <ui-lib-drawer [(visible)]="bottomVisible" header="Bottom Drawer" position="bottom" size="240px">
          <p>Slides in from the bottom — ideal for action sheets on mobile.</p>
        </ui-lib-drawer>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: {
      noCloseVisible: WritableSignal<boolean>;
      noBackdropVisible: WritableSignal<boolean>;
      noEscapeVisible: WritableSignal<boolean>;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const noCloseVisible: WritableSignal<boolean> = signal<boolean>(false);
    const noBackdropVisible: WritableSignal<boolean> = signal<boolean>(false);
    const noEscapeVisible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [Drawer, Button] },
      props: { noCloseVisible, noBackdropVisible, noEscapeVisible },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button (click)="noCloseVisible.set(true)">No Close Button</ui-lib-button>
          <ui-lib-button (click)="noBackdropVisible.set(true)">No Backdrop Close</ui-lib-button>
          <ui-lib-button (click)="noEscapeVisible.set(true)">No Escape Close</ui-lib-button>
        </div>

        <ui-lib-drawer
          [(visible)]="noCloseVisible"
          header="No Close Button"
          [showCloseButton]="false"
        >
          <p>The built-in close button is hidden. Use a custom action to dismiss.</p>
          <div drawerFooter>
            <ui-lib-button (click)="noCloseVisible.set(false)">Dismiss</ui-lib-button>
          </div>
        </ui-lib-drawer>

        <ui-lib-drawer
          [(visible)]="noBackdropVisible"
          header="No Backdrop Close"
          [closeOnBackdrop]="false"
        >
          <p>Clicking the backdrop does not close this drawer.</p>
        </ui-lib-drawer>

        <ui-lib-drawer
          [(visible)]="noEscapeVisible"
          header="No Escape Close"
          [closeOnEscape]="false"
        >
          <p>Pressing Escape does not close this drawer.</p>
        </ui-lib-drawer>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: renderDrawer,
  args: {
    header: 'Dark Drawer',
    position: 'right',
    size: '300px',
    modal: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
    variant: 'material',
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: { visible: WritableSignal<boolean> };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const visible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [Drawer, Button] },
      props: { visible },
      template: `
        <ui-lib-button variant="bootstrap" (click)="visible.set(true)">Full API Drawer</ui-lib-button>
        <ui-lib-drawer
          [(visible)]="visible"
          header="Settings"
          variant="bootstrap"
          position="right"
          size="400px"
          [modal]="true"
          [closeOnBackdrop]="true"
          [closeOnEscape]="true"
          [showCloseButton]="true"
          [blockScroll]="true"
          styleClass="story-full-api-drawer"
        >
          <div style="display:grid; gap:1rem; padding:0.5rem 0;">
            <p><strong>Account Settings</strong></p>
            <p>Adjust your profile preferences, notification settings, and privacy options.</p>
            <label style="display:grid; gap:0.25rem;">
              <span>Display name</span>
              <input type="text" value="Jane Smith" style="padding:0.5rem; border:1px solid #d1d5db; border-radius:0.25rem;" />
            </label>
            <label style="display:grid; gap:0.25rem;">
              <span>Email</span>
              <input type="email" value="jane@example.com" style="padding:0.5rem; border:1px solid #d1d5db; border-radius:0.25rem;" />
            </label>
          </div>
          <div drawerFooter style="display:flex; gap:0.5rem; justify-content:flex-end;">
            <ui-lib-button appearance="ghost" (click)="visible.set(false)">Cancel</ui-lib-button>
            <ui-lib-button severity="primary" (click)="visible.set(false)">Save Changes</ui-lib-button>
          </div>
        </ui-lib-drawer>
      `,
    };
  },
};
