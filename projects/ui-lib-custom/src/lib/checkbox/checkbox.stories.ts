import type { Meta, StoryObj } from '@storybook/angular';
import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from '../core/shared/constants';
import { Checkbox } from './checkbox';
import type { CheckboxSize, CheckboxVariant } from './checkbox';

type CheckboxStoryArgs = {
  label: string;
  description: string;
  variant: CheckboxVariant | null;
  size: CheckboxSize;
  disabled: boolean;
  indeterminate: boolean;
  checked: boolean;
};

type Story = StoryObj<CheckboxStoryArgs>;

const meta: Meta<CheckboxStoryArgs> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;

const renderCheckbox: (args: Partial<CheckboxStoryArgs>) => {
  props: Partial<CheckboxStoryArgs>;
  template: string;
} = (
  args: Partial<CheckboxStoryArgs>
): { props: Partial<CheckboxStoryArgs>; template: string } => ({
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
    size: SHARED_DEFAULTS.Size,
    disabled: false,
    indeterminate: false,
    checked: false,
  },
};

export const Variants: Story = {
  render: (): { template: string; props: { themeVariants: typeof SHARED_THEME_VARIANTS } } => ({
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-checkbox label="Material" [variant]="themeVariants.Material" />
        <ui-lib-checkbox label="Bootstrap" [variant]="themeVariants.Bootstrap" />
        <ui-lib-checkbox label="Minimal" [variant]="themeVariants.Minimal" />
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
