import type { Meta, StoryObj } from '@storybook/angular';
import { LoginComponent } from './login.component';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Login',
  component: LoginComponent,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
};

export default meta;

export const Default: Story = {};
export const Variants: Story = Default;
export const Sizes: Story = Default;
export const States: Story = Default;
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
};
export const FullApi: Story = Default;
