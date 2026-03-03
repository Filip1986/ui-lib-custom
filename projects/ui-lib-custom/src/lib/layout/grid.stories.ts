import type { Meta, StoryObj } from '@storybook/angular';
import { Grid } from './grid';
import { Button } from '../button/button';

type Story = StoryObj;

const meta: Meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    columns: { control: 'number' },
    gap: { control: 'number' },
  },
};

export default meta;

export const Default: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-grid [columns]="3" [gap]="2">
        <ui-lib-button>One</ui-lib-button>
        <ui-lib-button>Two</ui-lib-button>
        <ui-lib-button>Three</ui-lib-button>
      </ui-lib-grid>
    `,
    moduleMetadata: { imports: [Grid, Button] },
  }),
};

export const Variants: Story = Default;

export const Sizes: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-grid [columns]="2" [gap]="4">
        <ui-lib-button>Wide</ui-lib-button>
        <ui-lib-button>Wide</ui-lib-button>
      </ui-lib-grid>
    `,
    moduleMetadata: { imports: [Grid, Button] },
  }),
};

export const States: Story = Default;

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-grid [columns]="2" [gap]="2">
        <ui-lib-button>Dark</ui-lib-button>
        <ui-lib-button>Mode</ui-lib-button>
      </ui-lib-grid>
    `,
    moduleMetadata: { imports: [Grid, Button] },
  }),
};

export const FullApi: Story = {
  args: { columns: 4, gap: 2 },
  render: (
    args: Record<string, unknown>
  ): {
    props: Record<string, unknown>;
    template: string;
    moduleMetadata: { imports: unknown[] };
  } => ({
    props: { ...args },
    template: `
      <ui-lib-grid [columns]="columns" [gap]="gap">
        <ui-lib-button>One</ui-lib-button>
        <ui-lib-button>Two</ui-lib-button>
        <ui-lib-button>Three</ui-lib-button>
        <ui-lib-button>Four</ui-lib-button>
      </ui-lib-grid>
    `,
    moduleMetadata: { imports: [Grid, Button] },
  }),
};
