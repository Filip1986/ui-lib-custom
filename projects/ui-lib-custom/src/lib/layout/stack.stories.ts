import type { Meta, StoryObj } from '@storybook/angular';
import { Stack } from './stack';
import { Button } from '../button/button';

type Story = StoryObj;

const meta: Meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    gap: { control: 'number' },
    direction: { control: 'select', options: ['row', 'column'] },
  },
};

export default meta;

export const Default: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-stack>
        <ui-lib-button>One</ui-lib-button>
        <ui-lib-button>Two</ui-lib-button>
      </ui-lib-stack>
    `,
    moduleMetadata: { imports: [Stack, Button] },
  }),
};

export const Variants: Story = Default;

export const Sizes: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-stack [gap]="2">
        <ui-lib-button>Gap 2</ui-lib-button>
        <ui-lib-button>Gap 2</ui-lib-button>
      </ui-lib-stack>
    `,
    moduleMetadata: { imports: [Stack, Button] },
  }),
};

export const States: Story = Default;

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-stack>
        <ui-lib-button>Dark</ui-lib-button>
      </ui-lib-stack>
    `,
    moduleMetadata: { imports: [Stack, Button] },
  }),
};

export const FullApi: Story = {
  args: { gap: 4, direction: 'row' },
  render: (
    args: Record<string, unknown>
  ): {
    props: Record<string, unknown>;
    template: string;
    moduleMetadata: { imports: unknown[] };
  } => ({
    props: { ...args },
    template: `
      <ui-lib-stack [gap]="gap" [direction]="direction">
        <ui-lib-button>First</ui-lib-button>
        <ui-lib-button>Second</ui-lib-button>
      </ui-lib-stack>
    `,
    moduleMetadata: { imports: [Stack, Button] },
  }),
};
