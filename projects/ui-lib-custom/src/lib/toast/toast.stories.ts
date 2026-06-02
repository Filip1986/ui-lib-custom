import { inject } from '@angular/core';

import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';

import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

import { Toast } from './toast';
import { ToastService } from './toast.service';
import type { ToastPosition, ToastSeverity, ToastVariant } from './toast.types';

type ToastStoryArgs = {
  position: ToastPosition;
  variant: ToastVariant | null;
  life: number;
};

type Story = StoryObj<ToastStoryArgs>;

const meta: Meta<ToastStoryArgs> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  decorators: [
    applicationConfig({
      providers: [ToastService],
    }),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'top-center',
        'bottom-right',
        'bottom-left',
        'bottom-center',
      ],
    },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    life: { control: 'number' },
  },
};

export default meta;

export const Default: Story = {
  render: (
    args: ToastStoryArgs,
  ): {
    props: ToastStoryArgs & {
      showSuccess: () => void;
      showInfo: () => void;
      showWarn: () => void;
      showError: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const toastService: ToastService = inject(ToastService);

    const add: (severity: ToastSeverity) => void = (severity: ToastSeverity): void => {
      const labels: Record<ToastSeverity, { summary: string; detail: string }> = {
        success: { summary: 'Success', detail: 'Changes were saved successfully.' },
        info: { summary: 'Info', detail: 'Your session will expire in 15 minutes.' },
        warn: { summary: 'Warning', detail: 'Disk space is running low.' },
        error: { summary: 'Error', detail: 'Failed to connect to the server.' },
      };
      toastService.add({
        severity,
        summary: labels[severity].summary,
        detail: labels[severity].detail,
        life: args.life,
      });
    };

    return {
      moduleMetadata: { imports: [Toast, Button] },
      props: {
        ...args,
        showSuccess: (): void => add('success'),
        showInfo: (): void => add('info'),
        showWarn: (): void => add('warn'),
        showError: (): void => add('error'),
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
          <ui-lib-button severity="success" (click)="showSuccess()">Success</ui-lib-button>
          <ui-lib-button severity="info" (click)="showInfo()">Info</ui-lib-button>
          <ui-lib-button severity="warning" (click)="showWarn()">Warning</ui-lib-button>
          <ui-lib-button severity="danger" (click)="showError()">Error</ui-lib-button>
        </div>
        <ui-lib-toast [position]="position" [variant]="variant" [life]="life" />
      `,
    };
  },
  args: {
    position: 'top-right',
    variant: null,
    life: 3000,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: {
      themeVariants: typeof SHARED_THEME_VARIANTS;
      showMaterial: () => void;
      showBootstrap: () => void;
      showMinimal: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const toastService: ToastService = inject(ToastService);

    return {
      moduleMetadata: { imports: [Toast, Button] },
      props: {
        themeVariants: SHARED_THEME_VARIANTS,
        showMaterial: (): void =>
          toastService.add({
            severity: 'info',
            summary: 'Material',
            detail: 'Material-themed toast notification.',
            life: 4000,
          }),
        showBootstrap: (): void =>
          toastService.add({
            severity: 'success',
            summary: 'Bootstrap',
            detail: 'Bootstrap-themed toast notification.',
            life: 4000,
          }),
        showMinimal: (): void =>
          toastService.add({
            severity: 'warn',
            summary: 'Minimal',
            detail: 'Minimal-themed toast notification.',
            life: 4000,
          }),
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
          <ui-lib-button [variant]="themeVariants.Material" (click)="showMaterial()">Material Toast</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Bootstrap" (click)="showBootstrap()">Bootstrap Toast</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Minimal" (click)="showMinimal()">Minimal Toast</ui-lib-button>
        </div>
        <ui-lib-toast position="top-right" variant="material" />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const Positions: Story = {
  render: (): {
    props: {
      showTopRight: () => void;
      showTopLeft: () => void;
      showTopCenter: () => void;
      showBottomRight: () => void;
      showBottomLeft: () => void;
      showBottomCenter: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const toastService: ToastService = inject(ToastService);
    const show: (position: ToastPosition) => void = (position: ToastPosition): void => {
      toastService.add({
        key: position,
        severity: 'info',
        summary: position,
        detail: `Toast at ${position}.`,
        life: 3000,
      });
    };

    return {
      moduleMetadata: { imports: [Toast, Button] },
      props: {
        showTopRight: (): void => show('top-right'),
        showTopLeft: (): void => show('top-left'),
        showTopCenter: (): void => show('top-center'),
        showBottomRight: (): void => show('bottom-right'),
        showBottomLeft: (): void => show('bottom-left'),
        showBottomCenter: (): void => show('bottom-center'),
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
          <ui-lib-button (click)="showTopRight()">Top Right</ui-lib-button>
          <ui-lib-button (click)="showTopLeft()">Top Left</ui-lib-button>
          <ui-lib-button (click)="showTopCenter()">Top Center</ui-lib-button>
          <ui-lib-button (click)="showBottomRight()">Bottom Right</ui-lib-button>
          <ui-lib-button (click)="showBottomLeft()">Bottom Left</ui-lib-button>
          <ui-lib-button (click)="showBottomCenter()">Bottom Center</ui-lib-button>
        </div>
        <ui-lib-toast key="top-right" position="top-right" />
        <ui-lib-toast key="top-left" position="top-left" />
        <ui-lib-toast key="top-center" position="top-center" />
        <ui-lib-toast key="bottom-right" position="bottom-right" />
        <ui-lib-toast key="bottom-left" position="bottom-left" />
        <ui-lib-toast key="bottom-center" position="bottom-center" />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: {
      showSticky: () => void;
      showNonClosable: () => void;
      showShortLife: () => void;
      showLongLife: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const toastService: ToastService = inject(ToastService);

    return {
      moduleMetadata: { imports: [Toast, Button] },
      props: {
        showSticky: (): void =>
          toastService.add({
            severity: 'warn',
            summary: 'Sticky Toast',
            detail: 'This toast stays until you manually close it.',
            sticky: true,
            closable: true,
          }),
        showNonClosable: (): void =>
          toastService.add({
            severity: 'info',
            summary: 'Non-Closable',
            detail: 'No close button — auto-dismisses after 5 seconds.',
            closable: false,
            life: 5000,
          }),
        showShortLife: (): void =>
          toastService.add({
            severity: 'success',
            summary: 'Quick',
            detail: 'Gone in 1 second.',
            life: 1000,
          }),
        showLongLife: (): void =>
          toastService.add({
            severity: 'info',
            summary: 'Long Life',
            detail: 'Auto-dismisses after 10 seconds.',
            life: 10000,
          }),
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
          <ui-lib-button severity="warning" (click)="showSticky()">Sticky</ui-lib-button>
          <ui-lib-button (click)="showNonClosable()">Non-Closable</ui-lib-button>
          <ui-lib-button severity="success" (click)="showShortLife()">Short Life (1s)</ui-lib-button>
          <ui-lib-button (click)="showLongLife()">Long Life (10s)</ui-lib-button>
        </div>
        <ui-lib-toast position="top-right" />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): {
    props: {
      showSuccess: () => void;
      showError: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const toastService: ToastService = inject(ToastService);
    return {
      moduleMetadata: { imports: [Toast, Button] },
      props: {
        showSuccess: (): void =>
          toastService.add({
            severity: 'success',
            summary: 'Dark Success',
            detail: 'Saved in dark mode.',
            life: 4000,
          }),
        showError: (): void =>
          toastService.add({
            severity: 'error',
            summary: 'Dark Error',
            detail: 'Something went wrong.',
            life: 4000,
          }),
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
          <ui-lib-button variant="material" severity="success" (click)="showSuccess()">Success</ui-lib-button>
          <ui-lib-button variant="material" severity="danger" (click)="showError()">Error</ui-lib-button>
        </div>
        <ui-lib-toast position="top-right" variant="material" />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: {
      showAll: () => void;
      clearAll: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const toastService: ToastService = inject(ToastService);

    const showAll: () => void = (): void => {
      toastService.add({
        severity: 'success',
        summary: 'File Uploaded',
        detail: 'report.pdf (2.4 MB) uploaded successfully.',
        life: 6000,
      });
      toastService.add({
        severity: 'info',
        summary: 'Processing',
        detail: 'Your report is being generated in the background.',
        life: 6000,
      });
      toastService.add({
        severity: 'warn',
        summary: 'Storage Warning',
        detail: 'You are using 90% of your allocated storage.',
        sticky: true,
        closable: true,
      });
      toastService.add({
        severity: 'error',
        summary: 'Payment Failed',
        detail: 'Unable to charge the card on file. Please update your payment method.',
        sticky: true,
        closable: true,
      });
    };

    const clearAll: () => void = (): void => {
      toastService.clear();
    };

    return {
      moduleMetadata: { imports: [Toast, Button] },
      props: { showAll, clearAll },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
          <ui-lib-button variant="bootstrap" (click)="showAll()">Show All Severities</ui-lib-button>
          <ui-lib-button variant="bootstrap" appearance="ghost" (click)="clearAll()">Clear All</ui-lib-button>
        </div>
        <ui-lib-toast position="top-right" variant="bootstrap" [life]="5000" />
      `,
    };
  },
};
