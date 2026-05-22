/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-panel header="Introduction">
  <p>Panel body content.</p>
</ui-lib-panel>`;

export const basicTs = `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './basic.example.html',
})
export class MyComponent {}`;

export const collapsedDefaultHtml = `<ui-lib-panel header="Advanced Options" [toggleable]="true" [collapsed]="true">
  <p>Hidden until expanded.</p>
</ui-lib-panel>`;

export const collapsedDefaultTs = `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './collapsed-default.example.html',
})
export class MyComponent {}`;

export const customHeaderHtml = `<ui-lib-panel [toggleable]="true">
  <span panelHeader>
    <strong>Featured</strong>
    <span class="badge">New</span>
  </span>
  <p>Body content.</p>
</ui-lib-panel>`;

export const customHeaderTs = `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './custom-header.example.html',
})
export class MyComponent {}`;

export const footerHtml = `<ui-lib-panel header="Terms of Service">
  <p>Body content.</p>
  <div panelFooter>
    <button type="button">Decline</button>
    <button type="button">Accept</button>
  </div>
</ui-lib-panel>`;

export const footerTs = `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './footer.example.html',
})
export class MyComponent {}`;

export const headerIconsHtml = `<ui-lib-panel header="Report" [toggleable]="true">
  <button panelIcons type="button" (click)="refresh()">↻</button>
  <button panelIcons type="button" (click)="download()">↓</button>
  <p>Body content.</p>
</ui-lib-panel>`;

export const headerIconsTs = `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './header-icons.example.html',
})
export class MyComponent {
  public refresh(): void {
    /* reload data */
  }
  public download(): void {
    /* export data */
  }
}`;

export const noHeaderHtml = `<!-- No header input — header area is automatically hidden -->
<ui-lib-panel>
  <p>This panel has no header. The header area is not rendered.</p>
</ui-lib-panel>

<!-- With a footer, but still no header -->
<ui-lib-panel>
  <p>Body content.</p>
  <div panelFooter>
    <button type="button">Cancel</button>
    <button type="button">Confirm</button>
  </div>
</ui-lib-panel>`;

export const noHeaderTs = `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './no-header.example.html',
})
export class MyComponent {}`;

export const toggleableHtml = `<ui-lib-panel
  header="Collapsible Section"
  [toggleable]="true"
  [(collapsed)]="isCollapsed"
  (toggled)="handleToggle($event)"
>
  <p>Click the chevron button in the header to toggle visibility.</p>
</ui-lib-panel>`;

export const toggleableTs = `import { Component, signal } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';
import type { PanelToggleEvent } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './toggleable.example.html',
})
export class MyComponent {
  public readonly isCollapsed = signal<boolean>(false);

  public handleToggle(event: PanelToggleEvent): void {
    console.log('Toggled:', event.collapsed);
  }
}`;

export const variantsHtml = `<ui-lib-panel header="Material Panel"  variant="material"  [toggleable]="true" />
<ui-lib-panel header="Bootstrap Panel" variant="bootstrap" [toggleable]="true" />
<ui-lib-panel header="Minimal Panel"   variant="minimal"   [toggleable]="true" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './variants.example.html',
})
export class MyComponent {}`;
