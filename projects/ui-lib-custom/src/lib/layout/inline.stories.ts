import type { Meta, StoryObj } from '@storybook/angular';
import { Inline } from './inline';
import { Button } from '../button/button';

type Story = StoryObj;

const meta: Meta = {
  title: 'Layout/Inline',
  component: Inline,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    gap: { control: 'number' },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
  },
};

export default meta;

export const Default: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-inline>
        <ui-lib-button>Alpha</ui-lib-button>
        <ui-lib-button>Beta</ui-lib-button>
        <ui-lib-button>Gamma</ui-lib-button>
      </ui-lib-inline>
    `,
    moduleMetadata: { imports: [Inline, Button] },
  }),
};

export const Variants: Story = Default;

export const Sizes: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-inline [gap]="2">
        <ui-lib-button>Gap 2</ui-lib-button>
        <ui-lib-button>Gap 2</ui-lib-button>
      </ui-lib-inline>
    `,
    moduleMetadata: { imports: [Inline, Button] },
  }),
};

export const States: Story = Default;

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-inline>
        <ui-lib-button>Dark</ui-lib-button>
      </ui-lib-inline>
    `,
    moduleMetadata: { imports: [Inline, Button] },
  }),
};

export const FullApi: Story = {
  args: { gap: 3, align: 'center' },
  render: (
    args: Record<string, unknown>
  ): {
    props: Record<string, unknown>;
    template: string;
    moduleMetadata: { imports: unknown[] };
  } => ({
    props: { ...args },
    template: `
      <ui-lib-inline [gap]="gap" [align]="align">
        <ui-lib-button>One</ui-lib-button>
        <ui-lib-button>Two</ui-lib-button>
      </ui-lib-inline>
    `,
    moduleMetadata: { imports: [Inline, Button] },
  }),
};
