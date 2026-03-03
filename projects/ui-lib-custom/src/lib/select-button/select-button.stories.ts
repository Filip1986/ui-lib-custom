import type { Meta, StoryObj } from '@storybook/angular';
import { SelectButton } from './select-button';

type Story = StoryObj;

type Option = { label: string; value: string };

const meta: Meta = {
  title: 'Components/Select Button',
  component: SelectButton,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    variant: { control: 'select', options: ['material', 'bootstrap', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

const options: Option[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

export const Default: Story = {
  render: (): { template: string; props: Record<string, unknown> } => ({
    template: `<ui-lib-select-button [options]="options" />`,
    props: { options },
  }),
};

export const Variants: Story = {
  render: (): { template: string; props: Record<string, unknown> } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-select-button variant="material" [options]="options" />
        <ui-lib-select-button variant="bootstrap" [options]="options" />
        <ui-lib-select-button variant="minimal" [options]="options" />
      </div>
    `,
    props: { options },
  }),
};

export const Sizes: Story = {
  render: (): { template: string; props: Record<string, unknown> } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-select-button size="sm" [options]="options" />
        <ui-lib-select-button size="md" [options]="options" />
        <ui-lib-select-button size="lg" [options]="options" />
      </div>
    `,
    props: { options },
  }),
};

export const States: Story = {
  render: (): { template: string; props: Record<string, unknown> } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-select-button [options]="options" />
        <ui-lib-select-button [options]="options" [disabled]="true" />
      </div>
    `,
    props: { options },
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; props: Record<string, unknown> } => ({
    template: `<ui-lib-select-button [options]="options" />`,
    props: { options },
  }),
};

export const FullApi: Story = {
  args: { variant: 'bootstrap', size: 'lg', multiple: true },
  render: (
    args: Record<string, unknown>
  ): { props: Record<string, unknown>; template: string } => ({
    props: { ...args, options },
    template: `<ui-lib-select-button [options]="options" [variant]="variant" [size]="size" [multiple]="multiple" />`,
  }),
};
