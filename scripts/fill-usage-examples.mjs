/**
 * scripts/fill-usage-examples.mjs
 *
 * One-off script: replaces `<!-- TODO: add usage examples -->` in every
 * docs/reference/components/<name>.md with a minimal, accurate code block.
 *
 * Usage:  node scripts/fill-usage-examples.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = resolve(__dirname, '../docs/reference/components');

const TODO_RE = /<!-- TODO: add usage examples -->/g;

/**
 * Map from doc filename (no ext, lowercased) → usage example markdown block.
 * Each value is inserted verbatim in place of the TODO marker.
 */
const EXAMPLES = {
  'bottom-sheet': `\`\`\`html
<!-- Trigger + BottomSheet declared in same template -->
<ui-lib-button (click)="sheet.open()">Open Sheet</ui-lib-button>

<ui-lib-bottom-sheet #sheet>
  <h2 uilib-bottom-sheet-title>Share</h2>
  <p>Choose how to share this item.</p>
  <div uilib-bottom-sheet-actions>
    <ui-lib-button (click)="sheet.close()">Cancel</ui-lib-button>
    <ui-lib-button severity="primary" (click)="share()">Share</ui-lib-button>
  </div>
</ui-lib-bottom-sheet>
\`\`\``,

  chip: `\`\`\`html
<!-- Static label -->
<ui-lib-chip label="Angular" />

<!-- Removable chip -->
<ui-lib-chip
  label="TypeScript"
  [removable]="true"
  (chipRemove)="remove('ts')"
/>

<!-- Clickable / selectable chip -->
<ui-lib-chip
  label="Signals"
  [selectable]="true"
  [(selected)]="signalSelected"
/>
\`\`\``,

  'class-names': `\`\`\`html
<!-- Directive applies CSS classes based on a map -->
<div [uiLibClassNames]="{ 'is-active': isActive, 'has-error': hasError }">
  Content
</div>
\`\`\``,

  'confirm-dialog': `\`\`\`typescript
import { ConfirmationService } from 'ui-lib-custom/confirm-dialog';

@Component({
  providers: [ConfirmationService],
  template: \`
    <ui-lib-confirm-dialog />
    <ui-lib-button severity="danger" (click)="confirmDelete()">Delete</ui-lib-button>
  \`,
})
export class MyComponent {
  private confirmation = inject(ConfirmationService);

  confirmDelete(): void {
    this.confirmation.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Delete Confirmation',
      accept: () => this.delete(),
    });
  }
}
\`\`\``,

  'data-grid': `\`\`\`html
<!-- Minimal data grid -->
<ui-lib-data-grid [value]="rows" ariaLabel="Products">
  <ui-lib-data-grid-column field="id"   header="ID"    [sortable]="true" width="80px" />
  <ui-lib-data-grid-column field="name" header="Name"  [sortable]="true" />
  <ui-lib-data-grid-column field="price" header="Price" [sortable]="true" width="120px" />
</ui-lib-data-grid>

<!-- With virtual scroll + row selection -->
<ui-lib-data-grid
  [value]="largeDataset"
  [virtualScroll]="true"
  scrollHeight="400px"
  selectionMode="single"
  [(selection)]="selectedRow"
  ariaLabel="Users"
>
  <ui-lib-data-grid-column field="username" header="Username" [sortable]="true" />
  <ui-lib-data-grid-column field="email"    header="Email" />
  <ui-lib-data-grid-column field="role"     header="Role" frozen="end" width="100px" />
</ui-lib-data-grid>
\`\`\``,

  divider: `\`\`\`html
<!-- Horizontal divider (default) -->
<ui-lib-divider />

<!-- Labelled divider -->
<ui-lib-divider align="center">or</ui-lib-divider>

<!-- Vertical divider (inside flex row) -->
<div style="display:flex; height:40px; align-items:center; gap:1rem">
  <span>Left</span>
  <ui-lib-divider layout="vertical" />
  <span>Right</span>
</div>
\`\`\``,

  'dynamic-dialog': `\`\`\`typescript
import { DialogService } from 'ui-lib-custom/dynamic-dialog';

@Component({
  providers: [DialogService],
  template: \`<ui-lib-button (click)="open()">Open Dialog</ui-lib-button>\`,
})
export class MyComponent {
  private dialog = inject(DialogService);

  open(): void {
    const ref = this.dialog.open(MyDialogContentComponent, {
      header: 'Edit User',
      width: '480px',
      data: { userId: 42 },
    });
    ref.onClose.subscribe((result) => {
      if (result) this.save(result);
    });
  }
}
\`\`\``,

  fieldset: `\`\`\`html
<!-- Static fieldset -->
<ui-lib-fieldset legend="Address">
  <div>Street: 123 Main St</div>
</ui-lib-fieldset>

<!-- Collapsible fieldset -->
<ui-lib-fieldset legend="Advanced Options" [toggleable]="true" [collapsed]="true">
  <p>These settings are rarely needed.</p>
</ui-lib-fieldset>
\`\`\``,

  fluid: `\`\`\`html
<!-- Fluid directive makes all child inputs fill 100% width -->
<ui-lib-fluid>
  <ui-lib-input placeholder="Full-width input" />
  <ui-lib-select [options]="opts" placeholder="Full-width select" />
</ui-lib-fluid>
\`\`\``,

  'focus-trap': `\`\`\`html
<!-- Trap focus inside a modal-like container -->
<div *ngIf="isOpen" uiLibFocusTrap>
  <h2>Modal Title</h2>
  <p>Tab cycles through focusable elements inside this container only.</p>
  <ui-lib-button (click)="close()">Close</ui-lib-button>
</div>
\`\`\``,

  inplace: `\`\`\`html
<!-- Click to reveal / edit inline -->
<ui-lib-inplace>
  <ng-template uiLibInplaceDisplay>
    <span>Click to edit: {{ value }}</span>
  </ng-template>
  <ng-template uiLibInplaceContent>
    <ui-lib-input [(ngModel)]="value" />
    <ui-lib-button (click)="save()">Save</ui-lib-button>
  </ng-template>
</ui-lib-inplace>
\`\`\``,

  panel: `\`\`\`html
<!-- Static panel -->
<ui-lib-panel header="Summary">
  <p>Content inside the panel.</p>
</ui-lib-panel>

<!-- Toggleable panel (start collapsed) -->
<ui-lib-panel header="Details" [toggleable]="true" [collapsed]="true">
  <p>This content is hidden until the user expands the panel.</p>
</ui-lib-panel>
\`\`\``,

  popover: `\`\`\`html
<ui-lib-button (click)="op.toggle($event)">Show Info</ui-lib-button>

<ui-lib-popover #op>
  <div style="padding: 1rem">
    <strong>Did you know?</strong>
    <p>Popovers stay open until dismissed.</p>
  </div>
</ui-lib-popover>
\`\`\``,

  'progress-bar': `\`\`\`html
<!-- Determinate -->
<ui-lib-progress-bar [value]="uploadProgress" />

<!-- Indeterminate (loading) -->
<ui-lib-progress-bar mode="indeterminate" />

<!-- With label -->
<ui-lib-progress-bar [value]="75" [showValue]="true" />
\`\`\``,

  'radio-button': `\`\`\`html
<!-- Standalone with reactive forms -->
<form [formGroup]="form">
  <ui-lib-radio-button formControlName="size" value="sm" label="Small" />
  <ui-lib-radio-button formControlName="size" value="md" label="Medium" />
  <ui-lib-radio-button formControlName="size" value="lg" label="Large" />
</form>

<!-- With ngModel -->
<ui-lib-radio-button [(ngModel)]="selected" value="a" label="Option A" />
<ui-lib-radio-button [(ngModel)]="selected" value="b" label="Option B" />
\`\`\``,

  'scroll-top': `\`\`\`html
<!-- Renders a floating button that appears after scrolling 400px -->
<ui-lib-scroll-top [threshold]="400" />

<!-- Inside a scrollable container -->
<div #scrollTarget style="height: 300px; overflow-y: auto">
  <p *ngFor="let i of items">Row {{ i }}</p>
  <ui-lib-scroll-top [target]="scrollTarget" />
</div>
\`\`\``,

  skeleton: `\`\`\`html
<!-- Text line placeholder -->
<ui-lib-skeleton width="80%" height="1rem" />

<!-- Card skeleton -->
<div style="display:flex; gap:1rem; align-items:center">
  <ui-lib-skeleton shape="circle" size="3rem" />
  <div style="flex:1">
    <ui-lib-skeleton width="60%" height="1rem" styleClass="mb-2" />
    <ui-lib-skeleton width="40%" height="0.75rem" />
  </div>
</div>
\`\`\``,

  stepper: `\`\`\`html
<ui-lib-stepper [(activeStep)]="step">
  <ui-lib-step-panel header="Account">
    <ui-lib-input placeholder="Email" />
    <ui-lib-button severity="primary" (click)="step = 1">Next</ui-lib-button>
  </ui-lib-step-panel>

  <ui-lib-step-panel header="Profile">
    <ui-lib-input placeholder="Display name" />
    <ui-lib-button (click)="step = 0">Back</ui-lib-button>
    <ui-lib-button severity="primary" (click)="step = 2">Next</ui-lib-button>
  </ui-lib-step-panel>

  <ui-lib-step-panel header="Review">
    <p>Confirm your details.</p>
    <ui-lib-button severity="success" (click)="submit()">Submit</ui-lib-button>
  </ui-lib-step-panel>
</ui-lib-stepper>
\`\`\``,

  'style-class': `\`\`\`html
<!-- Toggle a CSS class on a target element -->
<ui-lib-button
  uiLibStyleClass="sidebar--open"
  [styleClassTarget]="sidebar"
>
  Toggle Sidebar
</ui-lib-button>

<aside #sidebar class="sidebar">…</aside>
\`\`\``,

  terminal: `\`\`\`typescript
@Component({
  template: \`
    <ui-lib-terminal
      welcomeMessage="Welcome to the ui-lib terminal."
      prompt="$"
      (commandExecute)="onCommand($event)"
    />
  \`,
})
export class MyComponent {
  onCommand(event: { command: string; callback: (response: string) => void }): void {
    const responses: Record<string, string> = {
      help: 'Available commands: help, version, clear',
      version: '1.0.0',
    };
    event.callback(responses[event.command] ?? \`Unknown command: \${event.command}\`);
  }
}
\`\`\``,

  toolbar: `\`\`\`html
<ui-lib-toolbar>
  <ng-template uiLibToolbarStart>
    <ui-lib-button icon="menu" [iconOnly]="true" ariaLabel="Menu" />
    <span class="app-title">My App</span>
  </ng-template>

  <ng-template uiLibToolbarEnd>
    <ui-lib-button icon="search" [iconOnly]="true" ariaLabel="Search" />
    <ui-lib-button icon="person" [iconOnly]="true" ariaLabel="Profile" />
  </ng-template>
</ui-lib-toolbar>
\`\`\``,

  tooltip: `\`\`\`html
<!-- Attribute directive — simplest form -->
<ui-lib-button uiLibTooltip="Save your changes">Save</ui-lib-button>

<!-- Positioning -->
<ui-lib-button uiLibTooltip="Copied!" tooltipPosition="top">Copy</ui-lib-button>
<ui-lib-button uiLibTooltip="Delete" tooltipPosition="bottom" severity="danger">
  Delete
</ui-lib-button>

<!-- Disabled tooltip (hidden when button is disabled) -->
<ui-lib-button
  uiLibTooltip="Approve"
  [tooltipDisabled]="!canApprove"
  [disabled]="!canApprove"
>
  Approve
</ui-lib-button>
\`\`\``,
};

import { readdirSync } from 'node:fs';

let updated = 0;
let skipped = 0;

for (const file of readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))) {
  const name = file.replace(/\.md$/, '').toLowerCase();
  const path = resolve(DOCS_DIR, file);
  const content = readFileSync(path, 'utf8');

  if (!content.includes('<!-- TODO: add usage examples -->')) {
    skipped++;
    continue;
  }

  const example = EXAMPLES[name];
  if (!example) {
    console.warn(`  ⚠️  No example for "${name}" — leaving TODO`);
    skipped++;
    continue;
  }

  const newContent = content.replace(TODO_RE, example);
  writeFileSync(path, newContent, 'utf8');
  console.log(`  ✓ ${file}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
