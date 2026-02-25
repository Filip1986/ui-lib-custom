import type { Meta, StoryObj } from '@storybook/angular';
import { FormField } from './form-field';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Form Field',
  component: FormField,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
};

export default meta;

export const Default: Story = {
  render: (): { template: string } => ({
    template: `<ui-lib-form-field label="Label"><input /></ui-lib-form-field>`,
  }),
};

export const Variants: Story = Default;
export const Sizes: Story = Default;
export const States: Story = Default;
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-form-field label="Label"><input /></ui-lib-form-field>`,
  }),
};
export const FullApi: Story = Default;
