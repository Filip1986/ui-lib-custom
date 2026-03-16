import type { Meta, StoryObj } from '@storybook/angular';
// noinspection JSUnusedGlobalSymbols
import { SHARED_DEFAULTS, SHARED_SIZE_OPTIONS } from 'ui-lib-custom/core';
import { Badge } from './badge';

type BadgeStoryArgs = {
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size: 'sm' | 'md' | 'lg';
  variant: 'solid' | 'outline';
  pill: boolean;
};

type Story = StoryObj<BadgeStoryArgs>;

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
    },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    variant: { control: 'select', options: ['solid', 'outline'] },
    pill: { control: 'boolean' },
  },
};

export default meta;

// noinspection JSUnusedGlobalSymbols
export const Default: Story = {
  render: (): { template: string } => ({
    template: `<ui-lib-badge>Badge</ui-lib-badge>`,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <ui-lib-badge variant="solid">Solid</ui-lib-badge>
        <ui-lib-badge variant="outline">Outline</ui-lib-badge>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <ui-lib-badge size="sm">Small</ui-lib-badge>
        <ui-lib-badge size="md">Medium</ui-lib-badge>
        <ui-lib-badge size="lg">Large</ui-lib-badge>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <ui-lib-badge>Normal</ui-lib-badge>
        <ui-lib-badge [pill]="true">Pill</ui-lib-badge>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-badge color="primary">Dark</ui-lib-badge>`,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  args: {
    color: 'info',
    size: SHARED_DEFAULTS.Size,
    variant: 'solid',
    pill: true,
  },
  render: (args: BadgeStoryArgs): { props: BadgeStoryArgs; template: string } => ({
    props: { ...args },
    template:
      '<ui-lib-badge [color]="color" [size]="size" [variant]="variant" [pill]="pill">Full API</ui-lib-badge>',
  }),
};
