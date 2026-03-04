import type { Meta, StoryObj } from '@storybook/angular';
import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from '../shared/constants';
import { IconButton } from './icon-button';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    icon: { control: 'text' },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default: Story = {
  args: { icon: 'plus', size: SHARED_DEFAULTS.Size },
};

export const Variants: Story = {
  render: (): { template: string; props: { themeVariants: typeof SHARED_THEME_VARIANTS } } => ({
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:flex; gap:0.75rem;">
        <ui-lib-icon-button icon="plus" [variant]="themeVariants.Material" />
        <ui-lib-icon-button icon="plus" [variant]="themeVariants.Bootstrap" />
        <ui-lib-icon-button icon="plus" [variant]="themeVariants.Minimal" />
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
