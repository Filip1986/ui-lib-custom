import type { Meta, StoryObj } from '@storybook/angular';

import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from 'ui-lib-custom/core';

import { Menu } from './menu';
import type { MenuItem, MenuSize, MenuVariant } from './menu.types';

type MenuStoryArgs = {
  variant: MenuVariant | null;
  size: MenuSize;
  ariaLabel: string;
};

type Story = StoryObj<MenuStoryArgs>;

const profileGroup: MenuItem[] = [
  {
    label: 'Profile',
    items: [
      { label: 'Account', icon: 'user' },
      { label: 'Settings', icon: 'settings' },
      { label: 'Notifications', icon: 'bell' },
    ],
  },
];

const systemGroup: MenuItem[] = [
  {
    label: 'System',
    items: [
      { label: 'Help', icon: 'help' },
      { label: 'Logout', icon: 'sign-out' },
    ],
  },
];

const sampleItems: MenuItem[] = [...profileGroup, { separator: true }, ...systemGroup];

const meta: Meta<MenuStoryArgs> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    ariaLabel: { control: 'text' },
  },
};

export default meta;

const renderMenu: (args: Partial<MenuStoryArgs>) => {
  props: Partial<MenuStoryArgs> & { model: MenuItem[] };
  moduleMetadata: { imports: unknown[] };
  template: string;
} = (
  args: Partial<MenuStoryArgs>,
): {
  props: Partial<MenuStoryArgs> & { model: MenuItem[] };
  moduleMetadata: { imports: unknown[] };
  template: string;
} => ({
  moduleMetadata: { imports: [Menu] },
  props: { ...args, model: sampleItems },
  template: `
    <ui-lib-menu
      [model]="model"
      [variant]="variant"
      [size]="size"
      [ariaLabel]="ariaLabel"
    />
  `,
});

export const Default: Story = {
  render: renderMenu,
  args: {
    variant: null,
    size: SHARED_DEFAULTS.Size,
    ariaLabel: 'User menu',
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: { themeVariants: typeof SHARED_THEME_VARIANTS; model: MenuItem[] };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Menu] },
    props: { themeVariants: SHARED_THEME_VARIANTS, model: sampleItems },
    template: `
      <div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:flex-start;">
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Material</p>
          <ui-lib-menu [model]="model" [variant]="themeVariants.Material" ariaLabel="Material menu" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Bootstrap</p>
          <ui-lib-menu [model]="model" [variant]="themeVariants.Bootstrap" ariaLabel="Bootstrap menu" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Minimal</p>
          <ui-lib-menu [model]="model" [variant]="themeVariants.Minimal" ariaLabel="Minimal menu" />
        </div>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const Sizes: Story = {
  render: (): {
    props: { model: MenuItem[] };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Menu] },
    props: { model: sampleItems },
    template: `
      <div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:flex-start;">
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Small</p>
          <ui-lib-menu [model]="model" size="sm" ariaLabel="Small menu" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Medium</p>
          <ui-lib-menu [model]="model" size="md" ariaLabel="Medium menu" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Large</p>
          <ui-lib-menu [model]="model" size="lg" ariaLabel="Large menu" />
        </div>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: {
      groupedModel: MenuItem[];
      disabledModel: MenuItem[];
      separatorModel: MenuItem[];
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const groupedModel: MenuItem[] = [
      {
        label: 'Profile',
        items: [
          { label: 'Account', icon: 'user' },
          { label: 'Settings', icon: 'settings' },
        ],
      },
      {
        label: 'System',
        items: [{ label: 'Help' }, { label: 'Logout' }],
      },
    ];

    const disabledModel: MenuItem[] = [
      { label: 'Account', icon: 'user' },
      { label: 'Settings', icon: 'settings', disabled: true },
      { label: 'Notifications', disabled: true },
      { label: 'Logout', icon: 'sign-out' },
    ];

    const separatorModel: MenuItem[] = [
      { label: 'Profile' },
      { label: 'Settings' },
      { separator: true },
      { label: 'Terms of Service' },
      { separator: true },
      { label: 'Sign Out' },
    ];

    return {
      moduleMetadata: { imports: [Menu] },
      props: { groupedModel, disabledModel, separatorModel },
      template: `
        <div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:flex-start;">
          <div>
            <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Grouped</p>
            <ui-lib-menu [model]="groupedModel" ariaLabel="Grouped menu" />
          </div>
          <div>
            <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">With Disabled</p>
            <ui-lib-menu [model]="disabledModel" ariaLabel="Menu with disabled items" />
          </div>
          <div>
            <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">With Separators</p>
            <ui-lib-menu [model]="separatorModel" ariaLabel="Menu with separators" />
          </div>
        </div>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: renderMenu,
  args: {
    variant: 'material',
    size: SHARED_DEFAULTS.Size,
    ariaLabel: 'Dark mode menu',
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: { fullModel: MenuItem[] };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const fullModel: MenuItem[] = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Account',
            icon: 'user',
            command: (event: {
              item: MenuItem;
              originalEvent: MouseEvent | KeyboardEvent;
            }): void => {
              console.warn('Account clicked', event.item);
            },
          },
          { label: 'Settings', icon: 'settings' },
          { label: 'Notifications', icon: 'bell', disabled: true },
        ],
      },
      { separator: true },
      {
        label: 'Workspace',
        items: [
          { label: 'Team Members' },
          { label: 'Billing', url: '#billing', target: '_blank' },
          { label: 'API Keys' },
        ],
      },
      { separator: true },
      {
        label: 'System',
        items: [
          { label: 'Help Center', icon: 'help' },
          { label: 'Report Issue', icon: 'alert', styleClass: 'story-danger-item' },
          { separator: true },
          { label: 'Sign Out', icon: 'sign-out' },
        ],
      },
    ];

    return {
      moduleMetadata: { imports: [Menu] },
      props: { fullModel },
      template: `
        <ui-lib-menu
          [model]="fullModel"
          variant="bootstrap"
          size="md"
          ariaLabel="Full API menu"
        />
      `,
    };
  },
};
