import type { Meta, StoryObj } from '@storybook/angular';
import { Popover } from './popover';
import type { PopoverVariant } from './popover.types';
import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

type PopoverStoryArgs = {
  header: string | null;
  showCloseButton: boolean;
  dismissable: boolean;
  closeOnEscape: boolean;
  variant: PopoverVariant | null;
};

type Story = StoryObj<PopoverStoryArgs>;

const meta: Meta<PopoverStoryArgs> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    header: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    dismissable: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
  },
};

export default meta;

export const Default: Story = {
  render: (
    args: PopoverStoryArgs
  ): {
    props: PopoverStoryArgs;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Popover, Button] },
    props: args,
    template: `
      <ui-lib-button #triggerBtn (click)="pop.toggle(triggerBtn)">Toggle Popover</ui-lib-button>
      <ui-lib-popover
        #pop
        [header]="header"
        [showCloseButton]="showCloseButton"
        [dismissable]="dismissable"
        [closeOnEscape]="closeOnEscape"
        [variant]="variant"
      >
        <div style="padding:0.25rem 0;">
          <p style="margin:0 0 0.5rem;">This is the popover content.</p>
          <p style="margin:0; font-size:0.875rem; color:var(--uilib-color-text-secondary, #6b7280);">
            Use it for contextual information, quick actions, or rich previews.
          </p>
        </div>
      </ui-lib-popover>
    `,
  }),
  args: {
    header: null,
    showCloseButton: false,
    dismissable: true,
    closeOnEscape: true,
    variant: null,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: { themeVariants: typeof SHARED_THEME_VARIANTS };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Popover, Button] },
    props: { themeVariants: SHARED_THEME_VARIANTS },
    template: `
      <div style="display:flex; gap:1.5rem; flex-wrap:wrap; align-items:flex-start;">
        <div>
          <ui-lib-button #materialBtn [variant]="themeVariants.Material" (click)="materialPop.toggle(materialBtn)">
            Material
          </ui-lib-button>
          <ui-lib-popover #materialPop [variant]="themeVariants.Material">
            <p style="margin:0;">Material-themed popover panel.</p>
          </ui-lib-popover>
        </div>

        <div>
          <ui-lib-button #bootstrapBtn [variant]="themeVariants.Bootstrap" (click)="bootstrapPop.toggle(bootstrapBtn)">
            Bootstrap
          </ui-lib-button>
          <ui-lib-popover #bootstrapPop [variant]="themeVariants.Bootstrap">
            <p style="margin:0;">Bootstrap-themed popover panel.</p>
          </ui-lib-popover>
        </div>

        <div>
          <ui-lib-button #minimalBtn [variant]="themeVariants.Minimal" (click)="minimalPop.toggle(minimalBtn)">
            Minimal
          </ui-lib-button>
          <ui-lib-popover #minimalPop [variant]="themeVariants.Minimal">
            <p style="margin:0;">Minimal-themed popover panel.</p>
          </ui-lib-popover>
        </div>
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
    moduleMetadata: { imports: [Popover, Button] },
    props: {},
    template: `
      <div style="display:flex; gap:1.5rem; flex-wrap:wrap; align-items:flex-start;">
        <!-- With header -->
        <div>
          <ui-lib-button #headerBtn (click)="headerPop.toggle(headerBtn)">With Header</ui-lib-button>
          <ui-lib-popover #headerPop header="Quick Info">
            <p style="margin:0;">This popover has a visible header.</p>
          </ui-lib-popover>
        </div>

        <!-- With close button -->
        <div>
          <ui-lib-button #closeBtn (click)="closePop.toggle(closeBtn)">With Close Button</ui-lib-button>
          <ui-lib-popover #closePop header="Actions" [showCloseButton]="true">
            <p style="margin:0;">This popover shows an explicit close (×) button.</p>
          </ui-lib-popover>
        </div>

        <!-- Non-dismissable -->
        <div>
          <ui-lib-button #nonDismissBtn (click)="nonDismissPop.toggle(nonDismissBtn)">Non-Dismissable</ui-lib-button>
          <ui-lib-popover #nonDismissPop header="Sticky" [dismissable]="false" [showCloseButton]="true">
            <p style="margin:0;">Clicking outside does not close this popover.</p>
          </ui-lib-popover>
        </div>
      </div>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): {
    props: Record<string, unknown>;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Popover, Button] },
    props: {},
    template: `
      <ui-lib-button #darkBtn variant="material" (click)="darkPop.toggle(darkBtn)">Toggle Dark Popover</ui-lib-button>
      <ui-lib-popover #darkPop header="Dark Mode" variant="material" [showCloseButton]="true">
        <p style="margin:0;">This popover adapts to the dark colour scheme via CSS custom properties.</p>
      </ui-lib-popover>
    `,
  }),
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: Record<string, unknown>;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => ({
    moduleMetadata: { imports: [Popover, Button] },
    props: {},
    template: `
      <div style="display:flex; gap:1rem; flex-wrap:wrap; align-items:flex-start;">
        <div>
          <ui-lib-button #toggleBtn variant="bootstrap" (click)="fullPop.toggle(toggleBtn)">
            Toggle (All Options)
          </ui-lib-button>
          <ui-lib-popover
            #fullPop
            header="Full API Popover"
            variant="bootstrap"
            [showCloseButton]="true"
            [dismissable]="true"
            [closeOnEscape]="true"
          >
            <div style="display:grid; gap:0.5rem; min-width:220px;">
              <p style="margin:0; font-weight:600;">User: Jane Smith</p>
              <p style="margin:0; font-size:0.875rem; color:var(--uilib-color-text-secondary, #6b7280);">
                Last active: 2 hours ago
              </p>
              <hr style="margin:0.5rem 0; border:none; border-top:1px solid var(--uilib-color-border, #e5e7eb);" />
              <ui-lib-button size="sm" appearance="ghost">View Profile</ui-lib-button>
              <ui-lib-button size="sm" appearance="ghost" severity="danger">Remove User</ui-lib-button>
            </div>
          </ui-lib-popover>
        </div>

        <div>
          <ui-lib-button #showBtn variant="bootstrap" (click)="fullPop2.show(showBtn)">
            Show
          </ui-lib-button>
          <ui-lib-button variant="bootstrap" appearance="ghost" (click)="fullPop2.hide()">
            Hide
          </ui-lib-button>
          <ui-lib-popover #fullPop2 header="Show/Hide API" variant="bootstrap">
            <p style="margin:0;">Opened via <code>show()</code>; use <code>hide()</code> to close.</p>
          </ui-lib-popover>
        </div>
      </div>
    `,
  }),
};
