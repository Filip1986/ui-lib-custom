import type { Meta, StoryObj } from '@storybook/angular';
import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from '../core/shared/constants';
import { Tabs } from './tabs';
import { Tab } from './tab';
import type { TabsAlignment, TabsOrientation, TabsSize, TabsVariant } from './tabs.types';

type TabsStoryArgs = {
  variant: TabsVariant | null;
  size: TabsSize;
  align: TabsAlignment;
  orientation: TabsOrientation;
};

type Story = StoryObj<TabsStoryArgs>;

const meta: Meta<TabsStoryArgs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

const renderTabs: (args: TabsStoryArgs) => {
  props: TabsStoryArgs;
  template: string;
  moduleMetadata: { imports: unknown[] };
} = (
  args: TabsStoryArgs
): { props: TabsStoryArgs; template: string; moduleMetadata: { imports: unknown[] } } => ({
  props: args,
  moduleMetadata: { imports: [Tabs, Tab] },
  template: `
    <ui-lib-tabs [variant]="variant" [size]="size" [align]="align" [orientation]="orientation">
      <ui-lib-tab label="Overview">Overview content</ui-lib-tab>
      <ui-lib-tab label="Details">Details content</ui-lib-tab>
      <ui-lib-tab label="Settings">Settings content</ui-lib-tab>
    </ui-lib-tabs>
  `,
});

export const Default: Story = {
  render: renderTabs,
  args: {
    variant: null,
    size: SHARED_DEFAULTS.Size,
    align: 'start',
    orientation: 'horizontal',
  },
};

export const Variants: Story = {
  render: (): {
    template: string;
    moduleMetadata: { imports: unknown[] };
    props: { themeVariants: typeof SHARED_THEME_VARIANTS };
  } => ({
    moduleMetadata: { imports: [Tabs, Tab] },
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-tabs [variant]="themeVariants.Material">
          <ui-lib-tab label="Material">Material tabs</ui-lib-tab>
          <ui-lib-tab label="Tab 2">Tab 2</ui-lib-tab>
        </ui-lib-tabs>
        <ui-lib-tabs [variant]="themeVariants.Bootstrap">
          <ui-lib-tab label="Bootstrap">Bootstrap tabs</ui-lib-tab>
          <ui-lib-tab label="Tab 2">Tab 2</ui-lib-tab>
        </ui-lib-tabs>
        <ui-lib-tabs [variant]="themeVariants.Minimal">
          <ui-lib-tab label="Minimal">Minimal tabs</ui-lib-tab>
          <ui-lib-tab label="Tab 2">Tab 2</ui-lib-tab>
        </ui-lib-tabs>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Tabs, Tab] },
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-tabs size="sm">
          <ui-lib-tab label="Small">Small tabs</ui-lib-tab>
          <ui-lib-tab label="Tab 2">Tab 2</ui-lib-tab>
        </ui-lib-tabs>
        <ui-lib-tabs size="md">
          <ui-lib-tab label="Medium">Medium tabs</ui-lib-tab>
          <ui-lib-tab label="Tab 2">Tab 2</ui-lib-tab>
        </ui-lib-tabs>
        <ui-lib-tabs size="lg">
          <ui-lib-tab label="Large">Large tabs</ui-lib-tab>
          <ui-lib-tab label="Tab 2">Tab 2</ui-lib-tab>
        </ui-lib-tabs>
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Tabs, Tab] },
    template: `
      <ui-lib-tabs>
        <ui-lib-tab label="Active">Active content</ui-lib-tab>
        <ui-lib-tab label="Disabled" [disabled]="true">Disabled content</ui-lib-tab>
      </ui-lib-tabs>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Tabs, Tab] },
    template: `
      <ui-lib-tabs>
        <ui-lib-tab label="Dark">Dark mode content</ui-lib-tab>
        <ui-lib-tab label="Tab 2">Tab 2</ui-lib-tab>
      </ui-lib-tabs>
    `,
  }),
};

export const FullApi: Story = {
  render: renderTabs,
  args: {
    variant: 'bootstrap',
    size: 'lg',
    align: 'center',
    orientation: 'horizontal',
  },
};
