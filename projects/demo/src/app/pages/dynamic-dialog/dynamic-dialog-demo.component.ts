import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import type { OnInit, Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import {
  DialogService,
  DynamicDialogRef,
  DYNAMIC_DIALOG_CONFIG,
} from 'ui-lib-custom/dynamic-dialog';
import type {
  DynamicDialogConfig,
  DynamicDialogVariant,
  DynamicDialogPosition,
} from 'ui-lib-custom/dynamic-dialog';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

// ---- Guest components rendered inside the dialog ----

/**
 * Simple guest component rendered inside a DynamicDialog by the demo.
 */
@Component({
  selector: 'app-simple-dialog-content',
  standalone: true,
  imports: [Button],
  template: `
    <p style="margin: 0 0 1.5rem">
      This content was loaded dynamically from <code>SimpleDialogContentComponent</code>. The dialog
      shell — header, close button, backdrop — is provided by <code>DialogService</code>.
    </p>
    <ui-lib-button type="button" severity="primary" (click)="close()">Got it</ui-lib-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDialogContentComponent {
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  public close(): void {
    this.ref.close();
  }
}

/** Data shape expected in config.data by DataDialogContentComponent. */
interface UserData {
  userId: number;
  name: string;
  role: string;
}

/**
 * Guest component demonstrating data injection via DYNAMIC_DIALOG_CONFIG.
 */
@Component({
  selector: 'app-data-dialog-content',
  standalone: true,
  imports: [Button],
  template: `
    <dl class="dialog-data-list">
      <dt>User ID</dt>
      <dd>{{ userId }}</dd>
      <dt>Name</dt>
      <dd>{{ name }}</dd>
      <dt>Role</dt>
      <dd>{{ role }}</dd>
    </dl>
    <div style="display:flex;gap:0.75rem;margin-top:1.5rem;justify-content:flex-end">
      <ui-lib-button type="button" severity="secondary" (click)="cancel()">Cancel</ui-lib-button>
      <ui-lib-button type="button" severity="primary" (click)="confirm()">Confirm</ui-lib-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDialogContentComponent implements OnInit {
  private readonly config: DynamicDialogConfig = inject(DYNAMIC_DIALOG_CONFIG);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  protected userId: number = 0;
  protected name: string = '';
  protected role: string = '';

  public ngOnInit(): void {
    const data: UserData | undefined = this.config.data as UserData | undefined;
    this.userId = data?.userId ?? 0;
    this.name = data?.name ?? '';
    this.role = data?.role ?? '';
  }

  public cancel(): void {
    this.ref.close(null);
  }

  public confirm(): void {
    this.ref.close({ confirmed: true, userId: this.userId });
  }
}

/**
 * Guest component with many paragraphs to demonstrate scrollable dialog height.
 */
@Component({
  selector: 'app-long-dialog-content',
  standalone: true,
  template: `
    @for (item of items; track item) {
      <p style="margin:0 0 0.75rem;line-height:1.6">{{ item }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongDialogContentComponent {
  protected readonly items: string[] = Array.from(
    { length: 12 },
    (_: unknown, index: number): string =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph ${index + 1} of scrollable content.`
  );
}

// ---- Demo page ----

/**
 * Demo page for the DynamicDialog component.
 */
@Component({
  selector: 'app-dynamic-dialog-demo',
  standalone: true,
  imports: [CodeSnippet, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './dynamic-dialog-demo.component.html',
  styleUrl: './dynamic-dialog-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogDemoComponent {
  public readonly importCode: string =
    "import { DialogService } from 'ui-lib-custom/dynamic-dialog'";
  private readonly dialogService: DialogService = inject(DialogService);

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'passing-data', label: 'Passing Data' },
    { id: 'scrollable-content', label: 'Scrollable Content' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'viewport-positions', label: 'Viewport Positions' },
    { id: 'configuration-options', label: 'Configuration Options' },
    { id: 'dynamic-dialog-config', label: 'DynamicDialogConfig' },
    { id: 'dynamic-dialog-ref', label: 'DynamicDialogRef' },
    { id: 'injection-tokens', label: 'Injection Tokens' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  protected lastResult: string = '';

  public openSimple(): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: 'Welcome',
      width: '32rem',
    });
  }

  public openWithData(): void {
    const ref: DynamicDialogRef = this.dialogService.open(DataDialogContentComponent, {
      header: 'User Details',
      width: '36rem',
      data: { userId: 42, name: 'Filip Luca', role: 'Admin' },
    });

    ref.onClose.subscribe((result: unknown): void => {
      const record: Record<string, unknown> = result as Record<string, unknown>;
      if (result && typeof result === 'object' && record['confirmed']) {
        this.lastResult = `Confirmed for user #${record['userId']}`;
      } else {
        this.lastResult = 'Cancelled';
      }
    });
  }

  public openScrollable(): void {
    this.dialogService.open(LongDialogContentComponent, {
      header: 'Scrollable Content',
      width: '38rem',
      height: '50vh',
    });
  }

  public openWithVariant(variant: DynamicDialogVariant): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Variant`,
      width: '32rem',
      variant,
    });
  }

  public openWithPosition(position: DynamicDialogPosition): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: `Position: ${position}`,
      width: '28rem',
      position,
    });
  }

  public openDismissable(): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: 'Click Outside to Close',
      width: '32rem',
      dismissableMask: true,
    });
  }

  public openNoHeader(): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      width: '32rem',
      closable: false,
    });
  }
}
