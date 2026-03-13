import type { Meta, StoryObj } from '@storybook/angular';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from '../core/shared/constants';
import { Icon } from './icon';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'text' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
  },
};

export default meta;

export const Default: Story = {
  args: { name: 'plus' },
};

export const Variants: Story = {
  render: (): { template: string; props: { themeVariants: typeof SHARED_THEME_VARIANTS } } => ({
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center;">
        <ui-lib-icon name="plus" [variant]="themeVariants.Material" />
        <ui-lib-icon name="plus" [variant]="themeVariants.Bootstrap" />
        <ui-lib-icon name="plus" [variant]="themeVariants.Minimal" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center;">
        <ui-lib-icon name="plus" size="sm" />
        <ui-lib-icon name="plus" size="md" />
        <ui-lib-icon name="plus" size="lg" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string } => ({
    template: `<ui-lib-icon name="plus" />`,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-icon name="plus" />`,
  }),
};

export const FullApi: Story = {
  args: { name: 'plus', size: 'lg', color: '#1976d2' },
  render: (
    args: Record<string, unknown>
  ): { props: Record<string, unknown>; template: string } => ({
    props: { ...args },
    template: `<ui-lib-icon [name]="name" [size]="size" [color]="color" />`,
  }),
};
