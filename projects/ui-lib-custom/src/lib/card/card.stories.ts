import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';
import { Button } from '../button/button';

type Story = StoryObj;

type CardStoryArgs = {
  variant?: string | null;
  elevation?: string;
  bordered?: boolean;
  hoverable?: boolean;
  headerBg?: string | null;
  footerBg?: string | null;
  headerIcon?: string | null;
  subtitle?: string | null;
  closable?: boolean;
};

const meta: Meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    variant: { control: 'select', options: ['material', 'bootstrap', 'minimal'] },
    elevation: { control: 'select', options: ['none', 'low', 'medium', 'high'] },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    headerBg: { control: 'text' },
    footerBg: { control: 'text' },
    headerIcon: { control: 'text' },
    subtitle: { control: 'text' },
    closable: { control: 'boolean' },
  },
};

export default meta;

const renderCard = (
  args: CardStoryArgs
): { props: CardStoryArgs; template: string; moduleMetadata: { imports: unknown[] } } => ({
  props: args,
  moduleMetadata: { imports: [Card, Button] },
  template: `
    <ui-lib-card
      [variant]="variant"
      [elevation]="elevation"
      [bordered]="bordered"
      [hoverable]="hoverable"
      [headerBg]="headerBg"
      [footerBg]="footerBg"
      [headerIcon]="headerIcon"
      [subtitle]="subtitle"
      [closable]="closable"
    >
      <div card-header>Card Title</div>
      <p>Card with projected content and actions.</p>
      <div card-footer style="display:flex; gap:0.5rem;">
        <ui-lib-button size="sm" appearance="outline">Secondary</ui-lib-button>
        <ui-lib-button size="sm">Action</ui-lib-button>
      </div>
    </ui-lib-card>
  `,
});

export const Default: Story = {
  render: renderCard,
  args: {
    variant: null,
    elevation: 'medium',
    bordered: false,
    hoverable: false,
    headerBg: null,
    footerBg: null,
    headerIcon: null,
    subtitle: null,
    closable: false,
  },
};

export const Variants: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Card] },
    template: `
      <div style="display:grid; gap:1rem; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));">
        <ui-lib-card variant="material"><div card-header>Material</div>Material content</ui-lib-card>
        <ui-lib-card variant="bootstrap"><div card-header>Bootstrap</div>Bootstrap content</ui-lib-card>
        <ui-lib-card variant="minimal"><div card-header>Minimal</div>Minimal content</ui-lib-card>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Card] },
    template: `
      <div style="display:grid; gap:1rem; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));">
        <ui-lib-card style="padding:0.75rem;"><div card-header>Compact</div>Compact padding</ui-lib-card>
        <ui-lib-card style="padding:1.25rem;"><div card-header>Default</div>Default padding</ui-lib-card>
        <ui-lib-card style="padding:1.75rem;"><div card-header>Comfortable</div>Comfortable padding</ui-lib-card>
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Card] },
    template: `
      <div style="display:grid; gap:1rem; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));">
        <ui-lib-card><div card-header>Normal</div>Normal card</ui-lib-card>
        <ui-lib-card [bordered]="true"><div card-header>Bordered</div>Bordered card</ui-lib-card>
        <ui-lib-card [hoverable]="true"><div card-header>Hoverable</div>Hoverable card</ui-lib-card>
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Card] },
    template: `<ui-lib-card><div card-header>Dark</div>Dark mode card</ui-lib-card>`,
  }),
};

export const FullApi: Story = {
  render: renderCard,
  args: {
    variant: 'bootstrap',
    elevation: 'high',
    bordered: true,
    hoverable: true,
    headerBg: null,
    footerBg: null,
    headerIcon: 'info',
    subtitle: 'Supporting text',
    closable: true,
  },
};
