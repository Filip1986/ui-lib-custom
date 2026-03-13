import type { Meta, StoryObj } from '@storybook/angular';
import {
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from 'ui-lib-custom/core';
import { ButtonGroup } from './button-group';
import { Button } from '../button/button';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    vertical: { control: 'boolean' },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
  },
};

export default meta;

export const Default: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-button-group>
        <ui-lib-button>One</ui-lib-button>
        <ui-lib-button>Two</ui-lib-button>
        <ui-lib-button>Three</ui-lib-button>
      </ui-lib-button-group>
    `,
    moduleMetadata: { imports: [ButtonGroup, Button] },
  }),
};

export const Variants: Story = {
  render: (): {
    template: string;
    moduleMetadata: { imports: unknown[] };
    props: { themeVariants: typeof SHARED_THEME_VARIANTS };
  } => ({
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-button-group [variant]="themeVariants.Material">
          <ui-lib-button>Material</ui-lib-button>
          <ui-lib-button>Group</ui-lib-button>
        </ui-lib-button-group>
        <ui-lib-button-group [variant]="themeVariants.Bootstrap">
          <ui-lib-button>Bootstrap</ui-lib-button>
          <ui-lib-button>Group</ui-lib-button>
        </ui-lib-button-group>
        <ui-lib-button-group [variant]="themeVariants.Minimal">
          <ui-lib-button>Minimal</ui-lib-button>
          <ui-lib-button>Group</ui-lib-button>
        </ui-lib-button-group>
      </div>
    `,
    moduleMetadata: { imports: [ButtonGroup, Button] },
    props: { themeVariants: SHARED_THEME_VARIANTS },
  }),
};

export const Sizes: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-button-group size="sm">
          <ui-lib-button>Small</ui-lib-button>
          <ui-lib-button>Group</ui-lib-button>
        </ui-lib-button-group>
        <ui-lib-button-group size="md">
          <ui-lib-button>Medium</ui-lib-button>
          <ui-lib-button>Group</ui-lib-button>
        </ui-lib-button-group>
        <ui-lib-button-group size="lg">
          <ui-lib-button>Large</ui-lib-button>
          <ui-lib-button>Group</ui-lib-button>
        </ui-lib-button-group>
      </div>
    `,
    moduleMetadata: { imports: [ButtonGroup, Button] },
  }),
};

export const States: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-button-group>
        <ui-lib-button>Normal</ui-lib-button>
        <ui-lib-button disabled="true">Disabled</ui-lib-button>
      </ui-lib-button-group>
    `,
    moduleMetadata: { imports: [ButtonGroup, Button] },
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-button-group>
        <ui-lib-button>Dark</ui-lib-button>
        <ui-lib-button>Mode</ui-lib-button>
      </ui-lib-button-group>
    `,
    moduleMetadata: { imports: [ButtonGroup, Button] },
  }),
};

export const FullApi: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    template: `
      <ui-lib-button-group variant="bootstrap" size="lg">
        <ui-lib-button>First</ui-lib-button>
        <ui-lib-button>Second</ui-lib-button>
        <ui-lib-button>Third</ui-lib-button>
      </ui-lib-button-group>
    `,
    moduleMetadata: { imports: [ButtonGroup, Button] },
  }),
};
