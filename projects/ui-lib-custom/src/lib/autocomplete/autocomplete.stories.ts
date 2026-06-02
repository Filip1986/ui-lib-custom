import type { Meta, StoryObj } from '@storybook/angular';
import { UiLibAutoComplete } from './autocomplete';
import type {
  AutoCompleteCompleteEvent,
  AutoCompleteSize,
  AutoCompleteVariant,
} from './autocomplete.types';
import {
  SHARED_DEFAULTS,
  SHARED_SIZE_OPTIONS,
  SHARED_THEME_VARIANTS,
  SHARED_VARIANT_OPTIONS,
} from 'ui-lib-custom/core';

type AutoCompleteStoryArgs = {
  placeholder: string;
  variant: AutoCompleteVariant | null;
  size: AutoCompleteSize;
  disabled: boolean;
  invalid: boolean;
  multiple: boolean;
  loading: boolean;
  showClear: boolean;
};

type Story = StoryObj<AutoCompleteStoryArgs>;

const ALL_FRUITS: string[] = [
  'Apple',
  'Apricot',
  'Banana',
  'Blueberry',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
];

const meta: Meta<AutoCompleteStoryArgs> = {
  title: 'Components/AutoComplete',
  component: UiLibAutoComplete,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    placeholder: { control: 'text' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    size: { control: 'select', options: SHARED_SIZE_OPTIONS },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    multiple: { control: 'boolean' },
    loading: { control: 'boolean' },
    showClear: { control: 'boolean' },
  },
};

export default meta;

const renderAutoComplete: (args: Partial<AutoCompleteStoryArgs>) => {
  props: Partial<AutoCompleteStoryArgs> & {
    suggestions: string[];
    onComplete: (event: AutoCompleteCompleteEvent) => void;
  };
  moduleMetadata: { imports: unknown[] };
  template: string;
} = (
  args: Partial<AutoCompleteStoryArgs>,
): {
  props: Partial<AutoCompleteStoryArgs> & {
    suggestions: string[];
    onComplete: (event: AutoCompleteCompleteEvent) => void;
  };
  moduleMetadata: { imports: unknown[] };
  template: string;
} => {
  let suggestions: string[] = [];
  const onComplete: (event: AutoCompleteCompleteEvent) => void = (
    event: AutoCompleteCompleteEvent,
  ): void => {
    const query: string = event.query.toLowerCase();
    suggestions = ALL_FRUITS.filter((fruit: string): boolean =>
      fruit.toLowerCase().startsWith(query),
    );
  };

  return {
    moduleMetadata: { imports: [UiLibAutoComplete] },
    props: { ...args, suggestions, onComplete },
    template: `
      <ui-lib-autocomplete
        [placeholder]="placeholder"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [invalid]="invalid"
        [multiple]="multiple"
        [loading]="loading"
        [showClear]="showClear"
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
      />
    `,
  };
};

export const Default: Story = {
  render: renderAutoComplete,
  args: {
    placeholder: 'Search fruits…',
    variant: null,
    size: SHARED_DEFAULTS.Size,
    disabled: false,
    invalid: false,
    multiple: false,
    loading: false,
    showClear: false,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: {
      themeVariants: typeof SHARED_THEME_VARIANTS;
      suggestions: string[];
      onComplete: (event: AutoCompleteCompleteEvent) => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    let suggestions: string[] = [];
    const onComplete: (event: AutoCompleteCompleteEvent) => void = (
      event: AutoCompleteCompleteEvent,
    ): void => {
      const query: string = event.query.toLowerCase();
      suggestions = ALL_FRUITS.filter((fruit: string): boolean =>
        fruit.toLowerCase().startsWith(query),
      );
    };
    return {
      moduleMetadata: { imports: [UiLibAutoComplete] },
      props: { themeVariants: SHARED_THEME_VARIANTS, suggestions, onComplete },
      template: `
        <div style="display:grid; gap:0.75rem;">
          <ui-lib-autocomplete
            placeholder="Material — search fruits…"
            [variant]="themeVariants.Material"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Bootstrap — search fruits…"
            [variant]="themeVariants.Bootstrap"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Minimal — search fruits…"
            [variant]="themeVariants.Minimal"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
        </div>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const Sizes: Story = {
  render: (): {
    props: {
      suggestions: string[];
      onComplete: (event: AutoCompleteCompleteEvent) => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    let suggestions: string[] = [];
    const onComplete: (event: AutoCompleteCompleteEvent) => void = (
      event: AutoCompleteCompleteEvent,
    ): void => {
      const query: string = event.query.toLowerCase();
      suggestions = ALL_FRUITS.filter((fruit: string): boolean =>
        fruit.toLowerCase().startsWith(query),
      );
    };
    return {
      moduleMetadata: { imports: [UiLibAutoComplete] },
      props: { suggestions, onComplete },
      template: `
        <div style="display:grid; gap:0.75rem;">
          <ui-lib-autocomplete
            placeholder="Small (sm)"
            size="sm"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Medium (md)"
            size="md"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Large (lg)"
            size="lg"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
        </div>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: { suggestions: string[]; onComplete: (event: AutoCompleteCompleteEvent) => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    let suggestions: string[] = [];
    const onComplete: (event: AutoCompleteCompleteEvent) => void = (
      event: AutoCompleteCompleteEvent,
    ): void => {
      const query: string = event.query.toLowerCase();
      suggestions = ALL_FRUITS.filter((fruit: string): boolean =>
        fruit.toLowerCase().startsWith(query),
      );
    };
    return {
      moduleMetadata: { imports: [UiLibAutoComplete] },
      props: { suggestions, onComplete },
      template: `
        <div style="display:grid; gap:0.75rem;">
          <ui-lib-autocomplete
            placeholder="Normal — start typing…"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Disabled"
            [disabled]="true"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Invalid state"
            [invalid]="true"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Loading…"
            [loading]="true"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
          <ui-lib-autocomplete
            placeholder="Select multiple…"
            [multiple]="true"
            [showClear]="true"
            [suggestions]="suggestions"
            (completeMethod)="onComplete($event)"
          />
        </div>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: renderAutoComplete,
  args: {
    placeholder: 'Search fruits…',
    variant: 'material',
    size: SHARED_DEFAULTS.Size,
    disabled: false,
    invalid: false,
    multiple: false,
    loading: false,
    showClear: true,
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: renderAutoComplete,
  args: {
    placeholder: 'Type to search…',
    variant: 'bootstrap',
    size: 'lg',
    disabled: false,
    invalid: false,
    multiple: true,
    loading: false,
    showClear: true,
  },
};
