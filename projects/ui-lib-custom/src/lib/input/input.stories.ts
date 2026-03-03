import type { Meta, StoryObj } from '@storybook/angular';
import { UiLibInput } from './input';
import type { InputSize, InputVariant } from './input';

type InputStoryArgs = {
  label: string;
  placeholder: string;
  variant: InputVariant | null;
  size: InputSize;
  disabled: boolean;
  required: boolean;
  error: string | null;
};

type Story = StoryObj<InputStoryArgs>;

const meta: Meta<InputStoryArgs> = {
  title: 'Components/Input',
  component: UiLibInput,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    variant: { control: 'select', options: ['material', 'bootstrap', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
  },
};

export default meta;

const renderInput: (args: Partial<InputStoryArgs>) => {
  props: Partial<InputStoryArgs>;
  template: string;
} = (args: Partial<InputStoryArgs>): { props: Partial<InputStoryArgs>; template: string } => ({
  props: args,
  template: `
    <ui-lib-input
      [label]="label"
      [placeholder]="placeholder"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [required]="required"
      [error]="error"
    />
  `,
});

export const Default: Story = {
  render: renderInput,
  args: {
    label: 'Label',
    placeholder: 'Enter value',
    variant: null,
    size: 'md',
    disabled: false,
    required: false,
    error: null,
  },
};

export const Variants: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-input label="Material" variant="material" placeholder="Material" />
        <ui-lib-input label="Bootstrap" variant="bootstrap" placeholder="Bootstrap" />
        <ui-lib-input label="Minimal" variant="minimal" placeholder="Minimal" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-input label="Small" size="sm" placeholder="Small" />
        <ui-lib-input label="Medium" size="md" placeholder="Medium" />
        <ui-lib-input label="Large" size="lg" placeholder="Large" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-input label="Normal" placeholder="Normal" />
        <ui-lib-input label="Disabled" placeholder="Disabled" [disabled]="true" />
        <ui-lib-input label="Error" placeholder="Error" error="Invalid" />
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-input label="Dark" placeholder="Dark mode" />`,
  }),
};

export const FullApi: Story = {
  render: renderInput,
  args: {
    label: 'Full API',
    placeholder: 'Type here',
    variant: 'bootstrap',
    size: 'lg',
    required: true,
    error: null,
  },
};
