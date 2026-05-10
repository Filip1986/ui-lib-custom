import type { Meta, StoryObj } from '@storybook/angular';
import { signal, type WritableSignal } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { Button } from 'ui-lib-custom/button';
import { SHARED_THEME_VARIANTS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';
import type { DialogPosition, DialogVariant } from './dialog.types';

type DialogStoryArgs = {
  header: string;
  modal: boolean;
  closable: boolean;
  closeOnEscape: boolean;
  dismissableMask: boolean;
  draggable: boolean;
  maximizable: boolean;
  position: DialogPosition;
  variant: DialogVariant | undefined;
};

type Story = StoryObj<DialogStoryArgs>;

const meta: Meta<DialogStoryArgs> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
  parameters: {
    a11y: { disable: false },
  },
  argTypes: {
    header: { control: 'text' },
    modal: { control: 'boolean' },
    closable: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    dismissableMask: { control: 'boolean' },
    draggable: { control: 'boolean' },
    maximizable: { control: 'boolean' },
    position: {
      control: 'select',
      options: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
    },
    variant: { control: 'select', options: SHARED_VARIANT_OPTIONS },
  },
};

export default meta;

export const Default: Story = {
  render: (
    args: DialogStoryArgs
  ): {
    props: DialogStoryArgs & { visible: WritableSignal<boolean> };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const visible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [DialogComponent, Button] },
      props: { ...args, visible },
      template: `
        <ui-lib-button (click)="visible.set(true)">Open Dialog</ui-lib-button>
        <ui-lib-dialog
          [(visible)]="visible"
          [header]="header"
          [modal]="modal"
          [closable]="closable"
          [closeOnEscape]="closeOnEscape"
          [dismissableMask]="dismissableMask"
          [draggable]="draggable"
          [maximizable]="maximizable"
          [position]="position"
          [variant]="variant"
        >
          <p>This is the dialog body. Add any content here — forms, data tables, or rich media.</p>
          <p>Press Escape or click the close button to dismiss.</p>
          <ng-template #footer>
            <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
              <ui-lib-button appearance="ghost" (click)="visible.set(false)">Cancel</ui-lib-button>
              <ui-lib-button severity="primary" (click)="visible.set(false)">Confirm</ui-lib-button>
            </div>
          </ng-template>
        </ui-lib-dialog>
      `,
    };
  },
  args: {
    header: 'Dialog Title',
    modal: true,
    closable: true,
    closeOnEscape: true,
    dismissableMask: false,
    draggable: false,
    maximizable: false,
    position: 'center',
    variant: undefined,
  },
};

// noinspection JSUnusedGlobalSymbols
export const Variants: Story = {
  render: (): {
    props: {
      themeVariants: typeof SHARED_THEME_VARIANTS;
      materialVisible: WritableSignal<boolean>;
      bootstrapVisible: WritableSignal<boolean>;
      minimalVisible: WritableSignal<boolean>;
    };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const materialVisible: WritableSignal<boolean> = signal<boolean>(false);
    const bootstrapVisible: WritableSignal<boolean> = signal<boolean>(false);
    const minimalVisible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [DialogComponent, Button] },
      props: {
        themeVariants: SHARED_THEME_VARIANTS,
        materialVisible,
        bootstrapVisible,
        minimalVisible,
      },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button [variant]="themeVariants.Material" (click)="materialVisible.set(true)">
            Material Dialog
          </ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Bootstrap" (click)="bootstrapVisible.set(true)">
            Bootstrap Dialog
          </ui-lib-button>
          <ui-lib-button [variant]="themeVariants.Minimal" (click)="minimalVisible.set(true)">
            Minimal Dialog
          </ui-lib-button>
        </div>

        <ui-lib-dialog [(visible)]="materialVisible" header="Material Dialog" [variant]="themeVariants.Material">
          <p>Material design dialog with elevated surface and smooth animations.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="bootstrapVisible" header="Bootstrap Dialog" [variant]="themeVariants.Bootstrap">
          <p>Bootstrap-style dialog with bordered container and rounded corners.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="minimalVisible" header="Minimal Dialog" [variant]="themeVariants.Minimal">
          <p>Minimal dialog with clean lines and subtle styling.</p>
        </ui-lib-dialog>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const Positions: Story = {
  render: (): {
    props: Record<string, WritableSignal<boolean>>;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const centerVisible: WritableSignal<boolean> = signal<boolean>(false);
    const topVisible: WritableSignal<boolean> = signal<boolean>(false);
    const bottomVisible: WritableSignal<boolean> = signal<boolean>(false);
    const leftVisible: WritableSignal<boolean> = signal<boolean>(false);
    const rightVisible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [DialogComponent, Button] },
      props: { centerVisible, topVisible, bottomVisible, leftVisible, rightVisible },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button (click)="centerVisible.set(true)">Center</ui-lib-button>
          <ui-lib-button (click)="topVisible.set(true)">Top</ui-lib-button>
          <ui-lib-button (click)="bottomVisible.set(true)">Bottom</ui-lib-button>
          <ui-lib-button (click)="leftVisible.set(true)">Left</ui-lib-button>
          <ui-lib-button (click)="rightVisible.set(true)">Right</ui-lib-button>
        </div>

        <ui-lib-dialog [(visible)]="centerVisible" header="Center" position="center">
          <p>Centered dialog — the default position.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="topVisible" header="Top" position="top">
          <p>Dialog anchored to the top of the viewport.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="bottomVisible" header="Bottom" position="bottom">
          <p>Dialog anchored to the bottom of the viewport.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="leftVisible" header="Left" position="left">
          <p>Dialog anchored to the left edge.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="rightVisible" header="Right" position="right">
          <p>Dialog anchored to the right edge.</p>
        </ui-lib-dialog>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const States: Story = {
  render: (): {
    props: Record<string, WritableSignal<boolean>>;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const closableVisible: WritableSignal<boolean> = signal<boolean>(false);
    const notClosableVisible: WritableSignal<boolean> = signal<boolean>(false);
    const maximizableVisible: WritableSignal<boolean> = signal<boolean>(false);
    const draggableVisible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [DialogComponent, Button] },
      props: { closableVisible, notClosableVisible, maximizableVisible, draggableVisible },
      template: `
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <ui-lib-button (click)="closableVisible.set(true)">Closable</ui-lib-button>
          <ui-lib-button (click)="notClosableVisible.set(true)">Not Closable</ui-lib-button>
          <ui-lib-button (click)="maximizableVisible.set(true)">Maximizable</ui-lib-button>
          <ui-lib-button (click)="draggableVisible.set(true)">Draggable</ui-lib-button>
        </div>

        <ui-lib-dialog [(visible)]="closableVisible" header="Closable Dialog" [closable]="true">
          <p>This dialog has a close button and supports Escape key.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="notClosableVisible" header="Not Closable" [closable]="false" [closeOnEscape]="false">
          <p>No close button. Use the button below to dismiss.</p>
          <ng-template #footer>
            <ui-lib-button (click)="notClosableVisible.set(false)">OK, I understand</ui-lib-button>
          </ng-template>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="maximizableVisible" header="Maximizable" [maximizable]="true">
          <p>Click the maximize icon in the header to expand to full screen.</p>
        </ui-lib-dialog>
        <ui-lib-dialog [(visible)]="draggableVisible" header="Draggable" [draggable]="true">
          <p>Drag this dialog by its header to reposition it.</p>
        </ui-lib-dialog>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const DarkMode: Story = {
  parameters: { globals: { mode: 'dark' } },
  render: (): {
    props: { visible: WritableSignal<boolean> };
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const visible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [DialogComponent, Button] },
      props: { visible },
      template: `
        <ui-lib-button variant="material" (click)="visible.set(true)">Open Dark Dialog</ui-lib-button>
        <ui-lib-dialog [(visible)]="visible" header="Dark Mode Dialog" variant="material">
          <p>This dialog adapts to the dark colour scheme automatically via CSS custom properties.</p>
        </ui-lib-dialog>
      `,
    };
  },
};

// noinspection JSUnusedGlobalSymbols
export const FullApi: Story = {
  render: (): {
    props: Record<string, unknown>;
    moduleMetadata: { imports: unknown[] };
    template: string;
  } => {
    const visible: WritableSignal<boolean> = signal<boolean>(false);
    return {
      moduleMetadata: { imports: [DialogComponent, Button] },
      props: { visible },
      template: `
        <ui-lib-button variant="bootstrap" (click)="visible.set(true)">Full API Demo</ui-lib-button>
        <ui-lib-dialog
          [(visible)]="visible"
          header="Full API Dialog"
          variant="bootstrap"
          position="center"
          [modal]="true"
          [closable]="true"
          [closeOnEscape]="true"
          [dismissableMask]="true"
          [draggable]="true"
          [maximizable]="true"
          [blockScroll]="true"
          styleClass="story-full-api-dialog"
        >
          <ng-template #header>
            <span style="font-weight:700; font-size:1.1rem;">Custom Header Slot</span>
          </ng-template>
          <p>
            This story exercises every supported input. The dialog is draggable, maximizable,
            closable via Escape, and will close when clicking the backdrop.
          </p>
          <p>Try dragging it by the header, or click the maximize icon to go full-screen.</p>
          <ng-template #footer>
            <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
              <ui-lib-button appearance="ghost" (click)="visible.set(false)">Cancel</ui-lib-button>
              <ui-lib-button severity="success" (click)="visible.set(false)">Save Changes</ui-lib-button>
            </div>
          </ng-template>
        </ui-lib-dialog>
      `,
    };
  },
};
