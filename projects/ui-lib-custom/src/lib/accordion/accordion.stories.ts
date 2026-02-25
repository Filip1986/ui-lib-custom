import type { Meta, StoryObj } from '@storybook/angular';
import { Accordion } from './accordion';
import { AccordionPanel, AccordionHeader } from './accordion-panel';

type Story = StoryObj;

type AccordionStoryArgs = Record<string, any>;

const meta: Meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    variant: { control: 'select', options: ['material', 'bootstrap', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    expandMode: { control: 'select', options: ['single', 'multiple'] },
  },
};

export default meta;

const renderAccordion = (
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
    size: 'md',
    expandMode: 'single',
  },
};

export const Variants: Story = {
  render: (): { template: string; moduleMetadata: { imports: unknown[] } } => ({
    moduleMetadata: { imports: [Accordion, AccordionPanel] },
    template: `
      <div style="display:grid; gap:1rem;">
        <ui-lib-accordion variant="material">
          <ui-lib-accordion-panel header="Material">Material content</ui-lib-accordion-panel>
        </ui-lib-accordion>
        <ui-lib-accordion variant="bootstrap">
          <ui-lib-accordion-panel header="Bootstrap">Bootstrap content</ui-lib-accordion-panel>
        </ui-lib-accordion>
        <ui-lib-accordion variant="minimal">
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
