import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';

import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';

import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';

import { DynamicDialog } from './dynamic-dialog';
import { DialogService } from './dynamic-dialog.service';
import type { DynamicDialogConfig, DynamicDialogVariant } from './dynamic-dialog.types';
import { DynamicDialogRef } from './dynamic-dialog-ref';

type DynamicDialogStoryArgs = {
  header: string;
  variant: DynamicDialogVariant | null;
  modal: boolean;
  closable: boolean;
  dismissableMask: boolean;
};

type Story = StoryObj<DynamicDialogStoryArgs>;

/** Simple guest component rendered inside the dynamic dialog. */
@Component({
  selector: 'story-dynamic-dialog-content',
  standalone: true,
  imports: [Button],
  template: `
    <div style="padding:1rem;">
      <p>This content was loaded dynamically into the dialog at runtime.</p>
      <p>
        The guest component can inject <code>DynamicDialogRef</code> to close itself and
        <code>DYNAMIC_DIALOG_CONFIG</code> to read configuration data.
      </p>
      <div style="display:flex; gap:0.5rem; margin-top:1rem; justify-content:flex-end;">
        <ui-lib-button appearance="ghost" (click)="close()">Cancel</ui-lib-button>
        <ui-lib-button severity="primary" (click)="confirm()">Confirm</ui-lib-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
class DynamicDialogGuestComponent {
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  public close(): void {
    this.dialogRef.close(null);
  }

  public confirm(): void {
    this.dialogRef.close({ confirmed: true });
  }
}

const meta: Meta<DynamicDialogStoryArgs> = {
  title: 'Components/DynamicDialog',
  component: DynamicDialog,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  decorators: [
    applicationConfig({
      providers: [DialogService],
    }),
  ],
  argTypes: {
    header: { control: 'text' },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
    modal: { control: 'boolean' },
    closable: { control: 'boolean' },
    dismissableMask: { control: 'boolean' },
  },
};

export default meta;

export const Default: Story = {
  render: (
    args: DynamicDialogStoryArgs,
  ): {
    props: DynamicDialogStoryArgs & { open: () => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const dialogService: DialogService = inject(DialogService);
    const open: () => void = (): void => {
      dialogService.open(DynamicDialogGuestComponent, {
        header: args.header,
        modal: args.modal,
        closable: args.closable,
        dismissableMask: args.dismissableMask,
        variant: args.variant ?? null,
        width: '480px',
      } satisfies DynamicDialogConfig);
    };
    return {
      moduleMetadata: { imports: [Button] },
      props: { ...args, open },
      template: `<ui-lib-button (click)="open()">Open Dynamic Dialog</ui-lib-button>`,
    };
  },
  args: {
    header: 'Dynamic Dialog',
    variant: null,
    modal: true,
    closable: true,
    dismissableMask: false,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: {
      themeVariants: typeof SHARED_THEME_VARIANTS;
      openMaterial: () => void;
      openBootstrap: () => void;
      openMinimal: () => void;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const dialogService: DialogService = inject(DialogService);

    const openMaterial: () => void = (): void => {
      dialogService.open(DynamicDialogGuestComponent, {
        header: 'Material Dialog',
        variant: 'material',
        width: '480px',
      });
    };

    const openBootstrap: () => void = (): void => {
      dialogService.open(DynamicDialogGuestComponent, {
        header: 'Bootstrap Dialog',
        variant: 'bootstrap',
        width: '480px',
      });
    };

    const openMinimal: () => void = (): void => {
      dialogService.open(DynamicDialogGuestComponent, {
        header: 'Minimal Dialog',
        variant: 'minimal',
        width: '480px',
      });
    };

    return {
      moduleMetadata: { imports: [Button] },
      props: { themeVariants: SHARED_THEME_VARIANTS, openMaterial, openBootstrap, openMinimal },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button [variant]="themeVariants.Material" (click)="openMaterial()">Material</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Bootstrap" (click)="openBootstrap()">Bootstrap</ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Minimal" (click)="openMinimal()">Minimal</ui-lib-button>
        </div>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: { open: () => void };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const dialogService: DialogService = inject(DialogService);
    const open: () => void = (): void => {
      const ref: DynamicDialogRef = dialogService.open(DynamicDialogGuestComponent, {
        header: 'Full API Dialog',
        variant: 'bootstrap',
        width: '560px',
        modal: true,
        closable: true,
        dismissableMask: true,
        blockScroll: true,
        position: 'center',
        data: { userId: 42, mode: 'edit' },
        ariaLabel: 'User settings dialog',
      } satisfies DynamicDialogConfig);

      ref.onClose.subscribe((result: unknown): void => {
        console.warn('Dialog closed with result:', result);
      });
    };

    return {
      moduleMetadata: { imports: [Button] },
      props: { open },
      template: `
        <div style="display:grid; gap:0.5rem;">
          <p style="margin:0; font-size:0.875rem; color:var(--uilib-color-text-secondary, #6b7280);">
            Full API: draggable, dismissable backdrop, data injection, custom aria label, close event subscription.
          </p>
          <ui-lib-button variant="bootstrap" (click)="open()">Open Full API Dialog</ui-lib-button>
        </div>
      `,
    };
  },
};
