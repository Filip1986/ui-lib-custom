import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';
import type { ButtonAppearance, ButtonColor, ButtonSize, ButtonVariant } from './button';

type ButtonStoryArgs = {
  label: string;
  variant: ButtonVariant | null;
  size: ButtonSize;
  color: ButtonColor;
  appearance: ButtonAppearance;
  disabled: boolean;
  loading: boolean;
  icon?: string;
};

type Story = StoryObj<ButtonStoryArgs>;

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['material', 'bootstrap', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    appearance: { control: 'select', options: ['solid', 'outline', 'ghost'] },
    icon: { control: 'text' },
  },
};

export default meta;

const renderButton = (
  args: Partial<ButtonStoryArgs>
): { props: Partial<ButtonStoryArgs>; template: string } => ({
  props: args,
  template: `
    <ui-lib-button
      [variant]="variant"
      [size]="size"
      [color]="color"
      [disabled]="disabled"
      [loading]="loading"
      [appearance]="appearance"
      [icon]="icon"
    >
      {{ label }}
    </ui-lib-button>
  `,
});

export const Default: Story = {
  render: renderButton,
  args: {
    label: 'Button',
    variant: null,
    size: 'md',
    color: 'primary',
    appearance: 'solid',
    disabled: false,
    loading: false,
  },
};

export const Variants: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <ui-lib-button variant="material">Material</ui-lib-button>
        <ui-lib-button variant="bootstrap">Bootstrap</ui-lib-button>
        <ui-lib-button variant="minimal">Minimal</ui-lib-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <ui-lib-button size="sm">Small</ui-lib-button>
        <ui-lib-button size="md">Medium</ui-lib-button>
        <ui-lib-button size="lg">Large</ui-lib-button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <ui-lib-button>Normal</ui-lib-button>
        <ui-lib-button disabled="true">Disabled</ui-lib-button>
        <ui-lib-button loading="true">Loading</ui-lib-button>
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: renderButton,
  args: {
    label: 'Dark mode',
    variant: 'material',
    size: 'md',
    color: 'primary',
    appearance: 'solid',
  },
};

export const FullApi: Story = {
  render: renderButton,
  args: {
    label: 'Full API',
    variant: 'bootstrap',
    size: 'lg',
    color: 'secondary',
    appearance: 'outline',
    icon: 'plus',
    disabled: false,
    loading: false,
  },
};
