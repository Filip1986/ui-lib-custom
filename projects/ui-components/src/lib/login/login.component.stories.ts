import type { Meta, StoryObj } from '@storybook/angular';
import { LoginComponent } from './login.component';

const meta: Meta<LoginComponent> = {
  component: LoginComponent,
  title: 'LoginComponent',
};
export default meta;
type Story = StoryObj<LoginComponent>;

export const SimpleCard: Story = {
  args: {
    variant: '1',
  },
};

export const Style2: Story = {
  args: {
    variant: '2',
  },
};

export const Style3: Story = {
  args: {
    variant: '3',
  },
};

