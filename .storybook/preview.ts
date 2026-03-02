import type { Preview } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ThemeWrapperComponent } from './theme-wrapper.component';
import type { ThemeMode, ThemeVariant } from 'ui-lib-custom/theme';
import type { ShapeToken } from 'ui-lib-custom/tokens';

const preview: Preview = {
  decorators: [
    moduleMetadata({
      imports: [ThemeWrapperComponent],
    }),
    (storyFn: () => StoryResult, context: { globals: StoryGlobals }): StoryResult => {
      const story: StoryResult = storyFn();
      const template: string = story.template ?? '';
      const globals: StoryGlobals = context.globals;
      return {
        ...story,
        template: `<sb-theme-wrapper [variant]="variant" [mode]="mode" [shape]="shape">${template}</sb-theme-wrapper>`,
        props: {
          ...(story.props ?? {}),
          variant: globals.variant,
          mode: globals.mode,
          shape: globals.shape,
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

interface StoryGlobals {
  variant: ThemeVariant;
  mode: ThemeMode;
  shape: ShapeToken;
}

interface StoryResult {
  template?: string;
  props?: Record<string, unknown>;
}
