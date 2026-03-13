import type { Meta, StoryObj } from '@storybook/angular';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from '../core/shared/constants';
import { Alert } from './alert';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    dismissible: { control: 'boolean' },
  },
};

export default meta;

export const Default: Story = {
  render: (): { template: string } => ({
    template: `<ui-lib-alert>Alert message</ui-lib-alert>`,
  }),
};

export const Variants: Story = {
  render: (): { template: string; props: { themeVariants: typeof SHARED_THEME_VARIANTS } } => ({
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-alert [variant]="themeVariants.Material">Material alert</ui-lib-alert>
        <ui-lib-alert [variant]="themeVariants.Bootstrap">Bootstrap alert</ui-lib-alert>
        <ui-lib-alert [variant]="themeVariants.Minimal">Minimal alert</ui-lib-alert>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `<ui-lib-alert>Default size alert</ui-lib-alert>`,
  }),
};

export const States: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-alert>Normal</ui-lib-alert>
        <ui-lib-alert [dismissible]="true">Dismissible</ui-lib-alert>
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `<ui-lib-alert severity="info">Dark mode</ui-lib-alert>`,
  }),
};

type AlertStoryArgs = {
  severity: 'success' | 'error' | 'warning' | 'info';
  variant: 'material' | 'bootstrap' | 'minimal';
  dismissible: boolean;
};

export const FullApi: Story = {
  args: {
    severity: 'success',
    variant: 'bootstrap',
    dismissible: true,
  },
  render: (args: AlertStoryArgs): { props: Record<string, unknown>; template: string } => ({
    props: { ...args },
    template: `<ui-lib-alert [severity]="severity" [variant]="variant" [dismissible]="dismissible">Full API</ui-lib-alert>`,
  }),
};
