import type { Meta, StoryObj } from '@storybook/angular';
import { Checkbox } from './checkbox';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'select', options: ['material', 'bootstrap', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;

const renderCheckbox = (
  args: Record<string, any>
): { props: Record<string, any>; template: string } => ({
  props: args,
  template: `
    <ui-lib-checkbox
      [label]="label"
      [description]="description"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [indeterminate]="indeterminate"
      [checked]="checked"
    />
  `,
});

export const Default: Story = {
  render: renderCheckbox,
  args: {
    label: 'I agree to terms',
    description: 'Optional helper text',
    variant: null,
    size: 'md',
    disabled: false,
    indeterminate: false,
    checked: false,
  },
};

export const Variants: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-checkbox label="Material" variant="material" />
        <ui-lib-checkbox label="Bootstrap" variant="bootstrap" />
        <ui-lib-checkbox label="Minimal" variant="minimal" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-checkbox label="Small" size="sm" />
        <ui-lib-checkbox label="Medium" size="md" />
        <ui-lib-checkbox label="Large" size="lg" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-checkbox label="Normal" />
        <ui-lib-checkbox label="Checked" [checked]="true" />
        <ui-lib-checkbox label="Indeterminate" [indeterminate]="true" />
        <ui-lib-checkbox label="Disabled" [disabled]="true" />
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-checkbox label="Dark mode" />`,
  }),
};

export const FullApi: Story = {
  render: renderCheckbox,
  args: {
    label: 'Full API',
    description: 'Custom checkbox configuration',
    variant: 'bootstrap',
    size: 'lg',
    disabled: false,
    indeterminate: false,
    checked: true,
  },
};
