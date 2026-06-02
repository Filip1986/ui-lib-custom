import type { Meta, StoryObj } from '@storybook/angular';

import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

import { Tooltip } from './tooltip';
import type { TooltipEvent, TooltipPosition, TooltipVariant } from './tooltip.types';

type TooltipStoryArgs = {
  uiLibTooltip: string;
  tooltipPosition: TooltipPosition;
  tooltipEvent: TooltipEvent;
  showDelay: number;
  hideDelay: number;
  tooltipDisabled: boolean;
  tooltipVariant: TooltipVariant | null;
};

type Story = StoryObj<TooltipStoryArgs>;

const meta: Meta<TooltipStoryArgs> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    uiLibTooltip: { control: 'text' },
    tooltipPosition: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    tooltipEvent: { control: 'select', options: ['hover', 'focus', 'both'] },
    showDelay: { control: 'number' },
    hideDelay: { control: 'number' },
    tooltipDisabled: { control: 'boolean' },
    tooltipVariant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
  },
};

export default meta;

const renderTooltip: (args: Partial<TooltipStoryArgs>) => {
  props: Partial<TooltipStoryArgs>;
  moduleMetadata: { imports: unknown[] };
  template: string;
} = (
  args: Partial<TooltipStoryArgs>,
): {
  props: Partial<TooltipStoryArgs>;
  moduleMetadata: { imports: unknown[] };
  template: string;
} => ({
  moduleMetadata: { imports: [Tooltip, Button] },
  props: args,
  template: `
    <div style="padding:3rem; display:flex; justify-content:center;">
      <ui-lib-button
        [uiLibTooltip]="uiLibTooltip"
        [tooltipPosition]="tooltipPosition"
        [tooltipEvent]="tooltipEvent"
        [showDelay]="showDelay"
        [hideDelay]="hideDelay"
        [tooltipDisabled]="tooltipDisabled"
        [tooltipVariant]="tooltipVariant"
      >
        Hover or Focus Me
      </ui-lib-button>
    </div>
  `,
});

export const Default: Story = {
  render: renderTooltip,
  args: {
    uiLibTooltip: 'This is a helpful tooltip',
    tooltipPosition: 'top',
    tooltipEvent: 'hover',
    showDelay: 0,
    hideDelay: 0,
    tooltipDisabled: false,
    tooltipVariant: null,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: { themeVariants: typeof SHARED_THEME_VARIANTS };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Tooltip, Button] },
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="padding:3rem; display:flex; gap:1.5rem; justify-content:center; flex-wrap:wrap;">
        <ui-lib-button
          [variant]="themeVariants.Material"
          uiLibTooltip="Material tooltip style"
          [tooltipVariant]="themeVariants.Material"
        >
          Material
        </ui-lib-button>
        <ui-lib-button
          [variant]="themeVariants.Bootstrap"
          uiLibTooltip="Bootstrap tooltip style"
          [tooltipVariant]="themeVariants.Bootstrap"
        >
          Bootstrap
        </ui-lib-button>
        <ui-lib-button
          [variant]="themeVariants.Minimal"
          uiLibTooltip="Minimal tooltip style"
          [tooltipVariant]="themeVariants.Minimal"
        >
          Minimal
        </ui-lib-button>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const Positions: Story = {
  render: (): {
    props: Record<string, unknown>;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Tooltip, Button] },
    props: {},
    template: `
      <div style="padding:4rem; display:grid; grid-template-columns:repeat(3, auto); gap:1rem; justify-content:center; align-items:center;">
        <div></div>
        <ui-lib-button uiLibTooltip="Tooltip on top" tooltipPosition="top">Top</ui-lib-button>
        <div></div>

        <ui-lib-button uiLibTooltip="Tooltip on left" tooltipPosition="left">Left</ui-lib-button>
        <div></div>
        <ui-lib-button uiLibTooltip="Tooltip on right" tooltipPosition="right">Right</ui-lib-button>

        <div></div>
        <ui-lib-button uiLibTooltip="Tooltip on bottom" tooltipPosition="bottom">Bottom</ui-lib-button>
        <div></div>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: Record<string, unknown>;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Tooltip, Button] },
    props: {},
    template: `
      <div style="padding:3rem; display:flex; gap:1.5rem; flex-wrap:wrap; justify-content:center;">
        <ui-lib-button uiLibTooltip="Shows on hover" tooltipEvent="hover">
          Hover trigger
        </ui-lib-button>
        <ui-lib-button uiLibTooltip="Shows on focus (Tab to me)" tooltipEvent="focus">
          Focus trigger
        </ui-lib-button>
        <ui-lib-button uiLibTooltip="Shows on hover or focus" tooltipEvent="both">
          Hover or focus
        </ui-lib-button>
        <ui-lib-button uiLibTooltip="This tooltip is disabled" [tooltipDisabled]="true">
          Disabled tooltip
        </ui-lib-button>
        <ui-lib-button uiLibTooltip="Appears after 500ms delay" [showDelay]="500" [hideDelay]="200">
          Delayed tooltip
        </ui-lib-button>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: renderTooltip,
  args: {
    uiLibTooltip: 'Dark mode tooltip',
    tooltipPosition: 'top',
    tooltipEvent: 'hover',
    showDelay: 0,
    hideDelay: 0,
    tooltipDisabled: false,
    tooltipVariant: 'material',
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: renderTooltip,
  args: {
    uiLibTooltip: 'Full API tooltip — positioned right, shows on both hover and focus, with delays',
    tooltipPosition: 'right',
    tooltipEvent: 'both',
    showDelay: 300,
    hideDelay: 150,
    tooltipDisabled: false,
    tooltipVariant: 'bootstrap',
  },
};
