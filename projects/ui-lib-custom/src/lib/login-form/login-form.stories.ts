import type { Meta, StoryObj } from '@storybook/angular';
import { LoginForm } from './login-form';
import type { LoginFormVariant } from './login-form';

type LoginFormStoryArgs = {
  variant?: LoginFormVariant;
  showSocialLogin?: boolean;
  showRememberMe?: boolean;
};

type Story = StoryObj<LoginFormStoryArgs>;

const meta: Meta<LoginForm> = {
  title: 'Components/Login Form',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    variant: { control: 'select', options: ['centered', 'split', 'minimal'] },
    showSocialLogin: { control: 'boolean' },
    showRememberMe: { control: 'boolean' },
  },
};

export default meta;

const renderLoginForm: (args: LoginFormStoryArgs) => {
  props: LoginFormStoryArgs;
  template: string;
} = (args: LoginFormStoryArgs): { props: LoginFormStoryArgs; template: string } => ({
  props: args,
  template: `
    <ui-lib-login-form
      [variant]="variant"
      [showSocialLogin]="showSocialLogin"
      [showRememberMe]="showRememberMe"
    />
  `,
});

export const Default: Story = {
  render: renderLoginForm,
  args: {
    variant: 'centered',
    showSocialLogin: false,
    showRememberMe: true,
  },
};

export const Variants: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-login-form variant="centered" />
        <ui-lib-login-form variant="split" />
        <ui-lib-login-form variant="minimal" />
      </div>
    `,
  }),
};

export const Sizes: Story = Default;

export const States: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-login-form />
        <ui-lib-login-form [showSocialLogin]="true" />
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-login-form />`,
  }),
};

export const FullApi: Story = {
  render: renderLoginForm,
  args: {
    variant: 'split',
    showSocialLogin: true,
    showRememberMe: true,
  },
};
