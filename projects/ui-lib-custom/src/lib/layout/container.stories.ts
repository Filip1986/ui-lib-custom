import type { Meta, StoryObj } from '@storybook/angular';
import { Container } from './container';

type Story = StoryObj;

const meta: Meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    padding: { control: 'number' },
  },
};

export default meta;

export const Default: Story = {
  render: (): { template: string } => ({
    template: `
      <ui-lib-container>
        <div style="background:#f3f4f6; padding:1rem;">Container content</div>
      </ui-lib-container>
    `,
  }),
};

export const Variants: Story = Default;

export const Sizes: Story = {
  render: (): { template: string } => ({
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-container size="sm">
          <div style="background:#f3f4f6; padding:1rem;">Small</div>
        </ui-lib-container>
        <ui-lib-container size="lg">
          <div style="background:#f3f4f6; padding:1rem;">Large</div>
        </ui-lib-container>
      </div>
    `,
  }),
};

export const States: Story = Default;

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string } => ({
    template: `
      <ui-lib-container>
        <div style="background:#1f2933; padding:1rem;">Dark</div>
      </ui-lib-container>
    `,
  }),
};

export const FullApi: Story = {
  args: { size: 'lg', padding: 4 },
  render: (args): { props: Record<string, unknown>; template: string } => ({
    props: { ...args },
    template: `
      <ui-lib-container [size]="size" [padding]="padding">
        <div style="background:#f3f4f6; padding:1rem;">Full API</div>
      </ui-lib-container>
    `,
  }),
};
