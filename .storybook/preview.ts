import type { Preview } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ThemeWrapperComponent } from './theme-wrapper.component';

const preview: Preview = {
  decorators: [
    moduleMetadata({
      imports: [ThemeWrapperComponent],
    }),
    (storyFn, context) => {
      const story = storyFn();
      const template: string = story.template ?? '';
      return {
        ...story,
        template: `<sb-theme-wrapper [variant]="variant" [mode]="mode" [shape]="shape">${template}</sb-theme-wrapper>`,
        props: {
          ...(story.props ?? {}),
          variant: context.globals['variant'],
          mode: context.globals['mode'],
          shape: context.globals['shape'],
        },
      };
    },
  ],
  globalTypes: {
    variant: {
      name: 'Variant',
      description: 'Component variant',
      defaultValue: 'material',
      toolbar: {
        icon: 'paintbrush',
        items: ['material', 'bootstrap', 'minimal'],
      },
    },
    mode: {
      name: 'Dark Mode',
      description: 'Theme mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
      },
    },
    shape: {
      name: 'Shape',
      description: 'Global shape token',
      defaultValue: 'rounded',
      toolbar: {
        icon: 'circle',
        items: ['sharp', 'rounded', 'soft', 'pill'],
      },
    },
  },
  parameters: {
    a11y: {
      disable: false,
    },
  },
};

export default preview;
