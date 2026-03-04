import type { Meta, StoryObj } from '@storybook/angular';
import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from '../shared/constants';
import type { SelectOption, SelectVariant, SelectSize } from './select';
import { UiLibSelect } from './select';

type SelectStoryArgs = {
  label: string;
  placeholder: string;
  variant: SelectVariant | null;
  size: SelectSize;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  multiple: boolean;
  searchable: boolean;
  loading: boolean;
};

type Story = StoryObj<SelectStoryArgs>;

const options: SelectOption[] = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
];

const meta: Meta<SelectStoryArgs> = {
  title: 'Components/Select',
  component: UiLibSelect,
  tags: ['autodocs'],
  parameters: { a11y: { disable: false } },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;

const renderSelect: (args: Partial<SelectStoryArgs>) => {
  props: Partial<SelectStoryArgs> & { options: SelectOption[] };
  template: string;
} = (
  args: Partial<SelectStoryArgs>
): { props: Partial<SelectStoryArgs> & { options: SelectOption[] }; template: string } => ({
  props: { ...args, options },
  template: `
    <ui-lib-select
      [label]="label"
      [placeholder]="placeholder"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [required]="required"
      [invalid]="invalid"
      [multiple]="multiple"
      [searchable]="searchable"
      [loading]="loading"
      [options]="options"
    />
  `,
});

export const Default: Story = {
  render: renderSelect,
  args: {
    label: 'Role',
    placeholder: 'Select role',
    variant: null,
    size: SHARED_DEFAULTS.Size,
    disabled: false,
    required: false,
    invalid: false,
    multiple: false,
    searchable: false,
    loading: false,
  },
};

export const Variants: Story = {
  render: (): {
    props: { options: SelectOption[]; themeVariants: typeof SHARED_THEME_VARIANTS };
    template: string;
  } => ({
    props: { options, themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-select
          label="Material"
          [variant]="themeVariants.Material"
          placeholder="Material"
          [options]="options"
        />
        <ui-lib-select
          label="Bootstrap"
          [variant]="themeVariants.Bootstrap"
          placeholder="Bootstrap"
          [options]="options"
        />
        <ui-lib-select
          label="Minimal"
          [variant]="themeVariants.Minimal"
          placeholder="Minimal"
          [options]="options"
        />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (): { props: { options: SelectOption[] }; template: string } => ({
    props: { options },
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-select label="Small" size="sm" placeholder="Small" [options]="options" />
        <ui-lib-select label="Medium" size="md" placeholder="Medium" [options]="options" />
        <ui-lib-select label="Large" size="lg" placeholder="Large" [options]="options" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: (): { props: { options: SelectOption[] }; template: string } => ({
    props: { options },
    template: `
      <div style="display:grid; gap:0.75rem;">
        <ui-lib-select label="Normal" placeholder="Normal" [options]="options" />
        <ui-lib-select label="Disabled" placeholder="Disabled" [disabled]="true" [options]="options" />
        <ui-lib-select label="Loading" placeholder="Loading" [loading]="true" [options]="options" />
        <ui-lib-select label="Invalid" placeholder="Invalid" [invalid]="true" [options]="options" />
      </div>
    `,
  }),
};

export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): { props: { options: SelectOption[] }; template: string } => ({
    props: { options },
    template: `<ui-lib-select label="Dark" placeholder="Dark mode" [options]="options" />`,
  }),
};

export const FullApi: Story = {
  render: renderSelect,
  args: {
    label: 'Full API',
    placeholder: 'Searchable',
    variant: 'bootstrap',
    size: 'lg',
    disabled: false,
    required: true,
    invalid: false,
    multiple: true,
    searchable: true,
    loading: false,
  },
};
