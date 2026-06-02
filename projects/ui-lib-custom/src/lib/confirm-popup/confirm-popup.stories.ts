import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { inject } from '@angular/core';
import { ConfirmPopup } from './confirm-popup';
import { ConfirmPopupService } from './confirm-popup.service';
import type { ConfirmPopupVariant } from './confirm-popup.types';
import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

type ConfirmPopupStoryArgs = {
  message: string;
  acceptLabel: string;
  rejectLabel: string;
  variant: ConfirmPopupVariant | null;
};

type Story = StoryObj<ConfirmPopupStoryArgs>;

const meta: Meta<ConfirmPopupStoryArgs> = {
  title: 'Components/ConfirmPopup',
  component: ConfirmPopup,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  decorators: [
    applicationConfig({
      providers: [ConfirmPopupService],
    }),
  ],
  argTypes: {
    message: { control: 'text' },
    acceptLabel: { control: 'text' },
    rejectLabel: { control: 'text' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
  },
};

export default meta;

export const Default: Story = {
  render: (
    args: ConfirmPopupStoryArgs,
  ): {
    props: ConfirmPopupStoryArgs & { onButtonClick: (event: MouseEvent) => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmPopupService: ConfirmPopupService = inject(ConfirmPopupService);
    const onButtonClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: args.message,
        acceptLabel: args.acceptLabel,
        rejectLabel: args.rejectLabel,
        accept: (): void => console.warn('Accepted'),
        reject: (): void => console.warn('Rejected'),
      });
    };
    return {
      moduleMetadata: { imports: [ConfirmPopup, Button] },
      props: { ...args, onButtonClick },
      template: `
        <ui-lib-button severity="danger" (click)="onButtonClick($event)">Delete</ui-lib-button>
        <ui-lib-confirm-popup />
      `,
    };
  },
  args: {
    message: 'Are you sure you want to proceed?',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    variant: null,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: {
      themeVariants: typeof SHARED_THEME_VARIANTS;
      onMaterial: (event: MouseEvent) => void;
      onBootstrap: (event: MouseEvent) => void;
      onMinimal: (event: MouseEvent) => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmPopupService: ConfirmPopupService = inject(ConfirmPopupService);

    const onMaterial: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'Confirm this action? (Material)',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
      });
    };
    const onBootstrap: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'Confirm this action? (Bootstrap)',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
      });
    };
    const onMinimal: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'Confirm this action? (Minimal)',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
      });
    };

    return {
      moduleMetadata: { imports: [ConfirmPopup, Button] },
      props: { themeVariants: SHARED_THEME_VARIANTS, onMaterial, onBootstrap, onMinimal },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button [variant]="themeVariants.Material" (click)="onMaterial($event)">Material</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Bootstrap" (click)="onBootstrap($event)">Bootstrap</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Minimal" (click)="onMinimal($event)">Minimal</ui-lib-button>
        </div>
        <ui-lib-confirm-popup />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: {
      onCustomLabels: (event: MouseEvent) => void;
      onDangerAccept: (event: MouseEvent) => void;
      onWithIcon: (event: MouseEvent) => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmPopupService: ConfirmPopupService = inject(ConfirmPopupService);

    const onCustomLabels: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'Would you like to save your changes before leaving?',
        acceptLabel: 'Save & Leave',
        rejectLabel: 'Discard',
        defaultFocus: 'accept',
      });
    };

    const onDangerAccept: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'This will permanently remove the record.',
        acceptLabel: 'Remove',
        rejectLabel: 'Keep',
        acceptSeverity: 'danger',
        rejectSeverity: 'secondary',
      });
    };

    const onWithIcon: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'Submit this form for review?',
        icon: 'pi pi-send',
        acceptLabel: 'Submit',
        rejectLabel: 'Not yet',
        acceptSeverity: 'success',
      });
    };

    return {
      moduleMetadata: { imports: [ConfirmPopup, Button] },
      props: { onCustomLabels, onDangerAccept, onWithIcon },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button (click)="onCustomLabels($event)">Custom Labels</ui-lib-button>
          <ui-lib-button severity="danger" (click)="onDangerAccept($event)">Danger Accept</ui-lib-button>
          <ui-lib-button severity="success" (click)="onWithIcon($event)">With Icon</ui-lib-button>
        </div>
        <ui-lib-confirm-popup />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): {
    props: { onConfirm: (event: MouseEvent) => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmPopupService: ConfirmPopupService = inject(ConfirmPopupService);
    const onConfirm: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'Proceed with this action?',
        acceptLabel: 'Proceed',
        rejectLabel: 'Cancel',
      });
    };
    return {
      moduleMetadata: { imports: [ConfirmPopup, Button] },
      props: { onConfirm },
      template: `
        <ui-lib-button variant="material" (click)="onConfirm($event)">Confirm Action</ui-lib-button>
        <ui-lib-confirm-popup />
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: { onConfirm: (event: MouseEvent) => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const confirmPopupService: ConfirmPopupService = inject(ConfirmPopupService);
    const onConfirm: (event: MouseEvent) => void = (event: MouseEvent): void => {
      confirmPopupService.confirm({
        target: event.currentTarget as HTMLElement,
        message: 'Revoke access for this user permanently?',
        icon: 'pi pi-user-minus',
        acceptLabel: 'Revoke Access',
        rejectLabel: 'Keep Access',
        acceptSeverity: 'danger',
        rejectSeverity: 'secondary',
        defaultFocus: 'reject',
        accept: (): void => console.warn('Access revoked'),
        reject: (): void => console.warn('Revocation cancelled'),
      });
    };
    return {
      moduleMetadata: { imports: [ConfirmPopup, Button] },
      props: { onConfirm },
      template: `
        <div style="display:grid; gap:0.5rem;">
          <p style="margin:0; font-size:0.875rem; color:var(--uilib-color-text-secondary, #6b7280);">
            Full API: icon, custom labels, danger severity, focus on reject button, callbacks.
          </p>
          <ui-lib-button severity="danger" (click)="onConfirm($event)">Revoke User Access</ui-lib-button>
        </div>
        <ui-lib-confirm-popup />
      `,
    };
  },
};
