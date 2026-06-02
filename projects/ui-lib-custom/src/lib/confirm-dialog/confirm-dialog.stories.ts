import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { inject } from '@angular/core';
import { ConfirmDialog } from './confirm-dialog';
import { ConfirmationService } from './confirm-dialog.service';
import type { ConfirmDialogVariant, ConfirmDialogPosition } from './confirm-dialog.types';
import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

type ConfirmDialogStoryArgs = {
  header: string;
  message: string;
  acceptLabel: string;
  rejectLabel: string;
  variant: ConfirmDialogVariant | null;
  position: ConfirmDialogPosition;
};

type Story = StoryObj<ConfirmDialogStoryArgs>;

const meta: Meta<ConfirmDialogStoryArgs> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  decorators: [
    applicationConfig({
      providers: [ConfirmationService],
    }),
  ],
  argTypes: {
    header: { control: 'text' },
    message: { control: 'text' },
    acceptLabel: { control: 'text' },
    rejectLabel: { control: 'text' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    position: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;

export const Default: Story = {
  render: (
    args: ConfirmDialogStoryArgs,
  ): {
    props: ConfirmDialogStoryArgs & { confirm: () => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmationService: ConfirmationService = inject(ConfirmationService);
    const confirm: () => void = (): void => {
      confirmationService.confirm({
        header: args.header,
        message: args.message,
        acceptLabel: args.acceptLabel,
        rejectLabel: args.rejectLabel,
        position: args.position,
        accept: (): void => {
          console.warn('Accepted');
        },
        reject: (): void => {
          console.warn('Rejected');
        },
      });
    };
    return {
      moduleMetadata: { imports: [ConfirmDialog, Button] },
      props: { ...args, confirm },
      template: `
        <ui-lib-button (click)="confirm()">Delete Item</ui-lib-button>
        <ui-lib-confirm-dialog />
      `,
    };
  },
  args: {
    header: 'Confirm Delete',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    variant: null,
    position: 'center',
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: {
      themeVariants: typeof SHARED_THEME_VARIANTS;
      confirmMaterial: () => void;
      confirmBootstrap: () => void;
      confirmMinimal: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmationService: ConfirmationService = inject(ConfirmationService);

    const confirmMaterial: () => void = (): void => {
      confirmationService.confirm({
        header: 'Material Confirm',
        message: 'This is a Material-themed confirmation dialog.',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
        acceptSeverity: 'danger',
      });
    };

    const confirmBootstrap: () => void = (): void => {
      confirmationService.confirm({
        header: 'Bootstrap Confirm',
        message: 'This is a Bootstrap-themed confirmation dialog.',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
        acceptSeverity: 'danger',
      });
    };

    const confirmMinimal: () => void = (): void => {
      confirmationService.confirm({
        header: 'Minimal Confirm',
        message: 'This is a Minimal-themed confirmation dialog.',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
        acceptSeverity: 'danger',
      });
    };

    return {
      moduleMetadata: { imports: [ConfirmDialog, Button] },
      props: {
        themeVariants: SHARED_THEME_VARIANTS,
        confirmMaterial,
        confirmBootstrap,
        confirmMinimal,
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button [variant]="themeVariants.Material" (click)="confirmMaterial()">Material</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Bootstrap" (click)="confirmBootstrap()">Bootstrap</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Minimal" (click)="confirmMinimal()">Minimal</ui-lib-button>
        </div>
        <ui-lib-confirm-dialog />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const Positions: Story = {
  render: (): {
    props: { confirmCenter: () => void; confirmTop: () => void; confirmBottom: () => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmationService: ConfirmationService = inject(ConfirmationService);

    const confirmCenter: () => void = (): void => {
      confirmationService.confirm({
        header: 'Center',
        message: 'This dialog is anchored to the center of the viewport.',
        position: 'center',
      });
    };

    const confirmTop: () => void = (): void => {
      confirmationService.confirm({
        header: 'Top',
        message: 'This dialog is anchored to the top of the viewport.',
        position: 'top',
      });
    };

    const confirmBottom: () => void = (): void => {
      confirmationService.confirm({
        header: 'Bottom',
        message: 'This dialog is anchored to the bottom of the viewport.',
        position: 'bottom',
      });
    };

    return {
      moduleMetadata: { imports: [ConfirmDialog, Button] },
      props: { confirmCenter, confirmTop, confirmBottom },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button (click)="confirmCenter()">Center</ui-lib-button>
          <ui-lib-button (click)="confirmTop()">Top</ui-lib-button>
          <ui-lib-button (click)="confirmBottom()">Bottom</ui-lib-button>
        </div>
        <ui-lib-confirm-dialog />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): {
    props: { confirm: () => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmationService: ConfirmationService = inject(ConfirmationService);
    const confirm: () => void = (): void => {
      confirmationService.confirm({
        header: 'Dark Mode Confirm',
        message: 'This confirmation dialog adapts to the dark colour scheme.',
        acceptLabel: 'Proceed',
        rejectLabel: 'Cancel',
      });
    };
    return {
      moduleMetadata: { imports: [ConfirmDialog, Button] },
      props: { confirm },
      template: `
        <ui-lib-button variant="material" (click)="confirm()">Confirm Action</ui-lib-button>
        <ui-lib-confirm-dialog />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: { confirm: () => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmationService: ConfirmationService = inject(ConfirmationService);
    const confirm: () => void = (): void => {
      confirmationService.confirm({
        header: 'Permanently Delete Account',
        message:
          'This will permanently delete your account and all associated data. This action is irreversible.',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes, delete my account',
        rejectLabel: 'Keep my account',
        acceptSeverity: 'danger',
        rejectSeverity: 'secondary',
        closable: true,
        dismissableMask: false,
        defaultFocus: 'reject',
        position: 'center',
        accept: (): void => console.warn('Account deleted'),
        reject: (): void => console.warn('Deletion cancelled'),
      });
    };
    return {
      moduleMetadata: { imports: [ConfirmDialog, Button] },
      props: { confirm },
      template: `
        <ui-lib-button severity="danger" (click)="confirm()">Delete Account</ui-lib-button>
        <ui-lib-confirm-dialog />
      `,
    };
  },
};
