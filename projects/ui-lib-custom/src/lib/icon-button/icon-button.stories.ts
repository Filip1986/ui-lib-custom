import type { Meta, StoryObj } from '@storybook/angular';
import { IconButton } from './icon-button';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    icon: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['material', 'bootstrap', 'minimal'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default: Story = {
  args: { icon: 'plus' },
};

export const Variants: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem;">
        <ui-lib-icon-button icon="plus" variant="material" />
        <ui-lib-icon-button icon="plus" variant="bootstrap" />
        <ui-lib-icon-button icon="plus" variant="minimal" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem;">
        <ui-lib-icon-button icon="plus" size="sm" />
        <ui-lib-icon-button icon="plus" size="md" />
        <ui-lib-icon-button icon="plus" size="lg" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem;">
        <ui-lib-icon-button icon="plus" />
        <ui-lib-icon-button icon="plus" disabled="true" />
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-icon-button icon="plus" />`,
  }),
};

export const FullApi: Story = {
  args: { icon: 'plus', size: 'lg', variant: 'bootstrap', disabled: false },
};
