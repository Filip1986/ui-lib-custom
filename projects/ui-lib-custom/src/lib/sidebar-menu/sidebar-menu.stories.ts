import type { Meta, StoryObj } from '@storybook/angular';
import { SidebarMenu } from './sidebar-menu';
import type { SidebarMenuItem } from './sidebar-menu';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Sidebar Menu',
  component: SidebarMenu,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
};

export default meta;

const items: SidebarMenuItem[] = [
  { id: '1', label: 'Dashboard', icon: 'pi pi-home' },
  { id: '2', label: 'Reports', icon: 'pi pi-chart-line' },
  { id: '3', label: 'Settings', icon: 'pi pi-cog' },
];

export const Default: Story = {
  render: (): { template: string; props: Record<string, unknown> } => ({
    template: `<ui-lib-sidebar-menu [items]="items" />`,
    props: { items },
  }),
};

export const Variants: Story = Default;

export const Sizes: Story = Default;

export const States: Story = Default;

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; props: Record<string, unknown> } => ({
    template: `<ui-lib-sidebar-menu [items]="items" />`,
    props: { items },
  }),
};

export const FullApi: Story = Default;
