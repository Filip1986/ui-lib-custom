import type { Meta, StoryObj } from '@storybook/angular';
import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from 'ui-lib-custom/core';
import { Accordion } from './accordion';
import { AccordionPanel, AccordionHeader } from 'ui-lib-custom';
import type { AccordionVariant, AccordionSize, AccordionExpandMode } from 'ui-lib-custom';

type AccordionStoryArgs = {
  variant: AccordionVariant | null;
  size: AccordionSize;
  expandMode: AccordionExpandMode;
};

type Story = StoryObj<AccordionStoryArgs>;

const meta: Meta<AccordionStoryArgs> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    expandMode: { control: 'select', options: ['single', 'multiple'] },
  },
};

export default meta;

const renderAccordion: (args: AccordionStoryArgs) => {
  props: AccordionStoryArgs;
  template: string;
  moduleMetadata: { imports: unknown[] };
} = (
  args: AccordionStoryArgs
): { props: AccordionStoryArgs; template: string; moduleMetadata: { imports: unknown[] } } => ({
  props: args,
  moduleMetadata: { imports: [Accordion, AccordionPanel] },
  template: `
    <ui-lib-accordion [variant]="variant" [size]="size" [expandMode]="expandMode">
      <ui-lib-accordion-panel header="Overview">Overview content</ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Details">Details content</ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="FAQ">FAQ content</ui-lib-accordion-panel>
    </ui-lib-accordion>
  `,
});

export const Default: Story = {
  render: renderAccordion,
  args: {
    variant: null,
    size: SHARED_DEFAULTS.Size,
    expandMode: 'single',
  },
};

export const Variants: Story = {
  render: (): {
    template: string;
    moduleMetadata: { imports: unknown[] };
    props: { themeVariants: typeof SHARED_THEME_VARIANTS };
  } => ({
    moduleMetadata: { imports: [Accordion, AccordionPanel] },
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-accordion [variant]="themeVariants.Material">
          <ui-lib-accordion-panel header="Material">Material content</ui-lib-accordion-panel>
        </ui-lib-accordion>
        <ui-lib-accordion [variant]="themeVariants.Bootstrap">
          <ui-lib-accordion-panel header="Bootstrap">Bootstrap content</ui-lib-accordion-panel>
        </ui-lib-accordion>
        <ui-lib-accordion [variant]="themeVariants.Minimal">
          <ui-lib-accordion-panel header="Minimal">Minimal content</ui-lib-accordion-panel>
        </ui-lib-accordion>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Accordion, AccordionPanel] },
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-accordion size="sm">
          <ui-lib-accordion-panel header="Small">Small content</ui-lib-accordion-panel>
        </ui-lib-accordion>
        <ui-lib-accordion size="md">
          <ui-lib-accordion-panel header="Medium">Medium content</ui-lib-accordion-panel>
        </ui-lib-accordion>
        <ui-lib-accordion size="lg">
          <ui-lib-accordion-panel header="Large">Large content</ui-lib-accordion-panel>
        </ui-lib-accordion>
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Accordion, AccordionPanel] },
    template: `
      <ui-lib-accordion expandMode="multiple">
        <ui-lib-accordion-panel header="Normal">Normal content</ui-lib-accordion-panel>
        <ui-lib-accordion-panel header="Disabled" [disabled]="true">Disabled content</ui-lib-accordion-panel>
        <ui-lib-accordion-panel header="Expanded" [expanded]="true">Expanded content</ui-lib-accordion-panel>
      </ui-lib-accordion>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Accordion, AccordionPanel] },
    template: `
      <ui-lib-accordion>
        <ui-lib-accordion-panel header="Dark">Dark mode content</ui-lib-accordion-panel>
      </ui-lib-accordion>
    `,
  }),
};

export const FullApi: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Accordion, AccordionPanel, AccordionHeader] },
    template: `
      <ui-lib-accordion variant="bootstrap" size="md" expandMode="multiple">
        <ui-lib-accordion-panel header="Custom">
          <div accordionHeader>
            <strong>Custom Header</strong>
          </div>
          Custom header content
        </ui-lib-accordion-panel>
        <ui-lib-accordion-panel header="Details">Details content</ui-lib-accordion-panel>
      </ui-lib-accordion>
    `,
  }),
};
