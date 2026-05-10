import type { Meta, StoryObj } from '@storybook/angular';
import { Menubar } from './menubar';
import type { MenubarItem, MenubarSize, MenubarVariant } from './menubar.types';
import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from 'ui-lib-custom/core';

type MenubarStoryArgs = {
  variant: MenubarVariant | null;
  size: MenubarSize;
  ariaLabel: string;
};

type Story = StoryObj<MenubarStoryArgs>;

const sampleItems: MenubarItem[] = [
  {
    label: 'File',
    items: [
      { label: 'New', icon: 'plus' },
      { label: 'Open', icon: 'folder' },
      { separator: true },
      { label: 'Save', icon: 'save' },
      { label: 'Save As…', icon: 'save' },
      { separator: true },
      { label: 'Export PDF', icon: 'file', disabled: true },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Cut', icon: 'scissors' },
      { label: 'Copy', icon: 'copy' },
      { label: 'Paste', icon: 'clipboard' },
      { separator: true },
      {
        label: 'Find & Replace',
        items: [{ label: 'Find…' }, { label: 'Replace…' }, { label: 'Find in Files' }],
      },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'Sidebar', icon: 'layout' },
      { label: 'Terminal' },
      { separator: true },
      { label: 'Zoom In' },
      { label: 'Zoom Out' },
      { label: 'Reset Zoom' },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'Documentation' },
      { label: 'Release Notes' },
      { separator: true },
      { label: 'Report Issue', icon: 'alert' },
      { label: 'About' },
    ],
  },
];

const meta: Meta<MenubarStoryArgs> = {
  title: 'Components/Menubar',
  component: Menubar,
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

const renderMenubar: (args: Partial<MenubarStoryArgs>) => {
  props: Partial<MenubarStoryArgs> & { model: MenubarItem[] };
  moduleMetadata: { imports: unknown[] };
  template: string;
} = (
  args: Partial<MenubarStoryArgs>
): {
  props: Partial<MenubarStoryArgs> & { model: MenubarItem[] };
  moduleMetadata: { imports: unknown[] };
  template: string;
} => ({
  moduleMetadata: { imports: [Menubar] },
  props: { ...args, model: sampleItems },
  template: `
    <ui-lib-menubar
      [model]="model"
      [variant]="variant"
      [size]="size"
      [ariaLabel]="ariaLabel"
    />
  `,
});

export const Default: Story = {
  render: renderMenubar,
  args: {
    variant: null,
    size: SHARED_DEFAULTS.Size,
    ariaLabel: 'Main navigation',
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: { themeVariants: typeof SHARED_THEME_VARIANTS; model: MenubarItem[] };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Menubar] },
    props: { themeVariants: SHARED_THEME_VARIANTS, model: sampleItems },
    template: `
      <div style="display:grid; gap:1.5rem;">
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Material</p>
          <ui-lib-menubar [model]="model" [variant]="themeVariants.Material" ariaLabel="Material nav" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Bootstrap</p>
          <ui-lib-menubar [model]="model" [variant]="themeVariants.Bootstrap" ariaLabel="Bootstrap nav" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Minimal</p>
          <ui-lib-menubar [model]="model" [variant]="themeVariants.Minimal" ariaLabel="Minimal nav" />
        </div>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const Sizes: Story = {
  render: (): {
    props: { model: MenubarItem[] };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Menubar] },
    props: { model: sampleItems },
    template: `
      <div style="display:grid; gap:1.5rem;">
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Small</p>
          <ui-lib-menubar [model]="model" size="sm" ariaLabel="Small nav" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Medium</p>
          <ui-lib-menubar [model]="model" size="md" ariaLabel="Medium nav" />
        </div>
        <div>
          <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">Large</p>
          <ui-lib-menubar [model]="model" size="lg" ariaLabel="Large nav" />
        </div>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: { modelWithDisabled: MenubarItem[]; modelWithSeparators: MenubarItem[] };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const modelWithDisabled: MenubarItem[] = [
      {
        label: 'File',
        items: [{ label: 'New' }, { label: 'Open' }, { label: 'Export', disabled: true }],
      },
      { label: 'Edit', disabled: true, items: [{ label: 'Cut' }] },
      {
        label: 'View',
        items: [{ label: 'Sidebar' }, { label: 'Terminal' }],
      },
    ];

    const modelWithSeparators: MenubarItem[] = [
      {
        label: 'Account',
        items: [
          { label: 'Profile' },
          { label: 'Settings' },
          { separator: true },
          { label: 'Sign out' },
        ],
      },
      {
        label: 'Help',
        items: [{ label: 'Documentation' }, { separator: true }, { label: 'Report Bug' }],
      },
    ];

    return {
      moduleMetadata: { imports: [Menubar] },
      props: { modelWithDisabled, modelWithSeparators },
      template: `
        <div style="display:grid; gap:1.5rem;">
          <div>
            <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">With disabled items</p>
            <ui-lib-menubar [model]="modelWithDisabled" ariaLabel="Nav with disabled items" />
          </div>
          <div>
            <p style="margin:0 0 0.5rem; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.6;">With separators</p>
            <ui-lib-menubar [model]="modelWithSeparators" ariaLabel="Nav with separators" />
          </div>
        </div>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: renderMenubar,
  args: {
    variant: 'material',
    size: SHARED_DEFAULTS.Size,
    ariaLabel: 'Dark mode navigation',
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: { fullModel: MenubarItem[] };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const fullModel: MenubarItem[] = [
      {
        label: 'File',
        items: [
          { label: 'New File', icon: 'plus' },
          { label: 'Open…', icon: 'folder' },
          { separator: true },
          { label: 'Save', icon: 'save' },
          { label: 'Save As…' },
          { separator: true },
          { label: 'Print', disabled: true },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo' },
          { label: 'Redo' },
          { separator: true },
          { label: 'Cut', icon: 'scissors' },
          { label: 'Copy', icon: 'copy' },
          { label: 'Paste', icon: 'clipboard' },
          { separator: true },
          {
            label: 'Advanced',
            items: [{ label: 'Format Document' }, { label: 'Sort Lines' }],
          },
        ],
      },
      {
        label: 'Help',
        items: [
          { label: 'Documentation', url: '#', target: '_blank' },
          { separator: true },
          { label: 'About' },
        ],
      },
    ];

    return {
      moduleMetadata: { imports: [Menubar] },
      props: { fullModel },
      template: `
        <ui-lib-menubar
          [model]="fullModel"
          variant="bootstrap"
          size="md"
          ariaLabel="Application menu"
        />
      `,
    };
  },
};
