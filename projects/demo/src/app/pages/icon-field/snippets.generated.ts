/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon styleClass="pi pi-search" />
  <input placeholder="Search" type="text" />
</ui-lib-icon-field>

<ui-lib-icon-field iconPosition="right">
  <ui-lib-input-icon styleClass="pi pi-spinner pi-spin" />
  <input placeholder="Loading" type="text" />
</ui-lib-icon-field>`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, IconFieldComponent, InputIconComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public searchValue: string = '';
  public loadingValue: string = '';
}`;

export const floatLabelHtml = `<ui-lib-float-label variant="over">
  <ui-lib-icon-field iconPosition="left">
    <ui-lib-input-icon styleClass="pi pi-envelope" />
    <input placeholder=" " type="text" />
  </ui-lib-icon-field>
  <label>Email (over)</label>
</ui-lib-float-label>

<ui-lib-float-label variant="in">
  <ui-lib-icon-field iconPosition="left">
    <ui-lib-input-icon styleClass="pi pi-user" />
    <input placeholder=" " type="text" />
  </ui-lib-icon-field>
  <label>Username (in)</label>
</ui-lib-float-label>

<ui-lib-float-label variant="on">
  <ui-lib-icon-field iconPosition="left">
    <ui-lib-input-icon styleClass="pi pi-lock" />
    <input placeholder=" " type="password" />
  </ui-lib-icon-field>
  <label>Password (on)</label>
</ui-lib-float-label>`;

export const floatLabelTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, IconFieldComponent, InputIconComponent],
  templateUrl: './float-label.example.html',
})
export class MyComponent {
  public emailValue: string = '';
  public usernameValue: string = '';
  public passwordValue: string = '';
}`;

export const sizesHtml = `<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon styleClass="pi pi-search" />
  <ui-lib-input placeholder="Small" size="sm" />
</ui-lib-icon-field>

<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon styleClass="pi pi-search" />
  <ui-lib-input placeholder="Medium" size="md" />
</ui-lib-icon-field>

<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon styleClass="pi pi-search" />
  <ui-lib-input placeholder="Large" size="lg" />
</ui-lib-icon-field>`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibInput } from 'ui-lib-custom/input';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibInput, IconFieldComponent, InputIconComponent],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public smallValue: string = '';
  public mediumValue: string = '';
  public largeValue: string = '';
}`;

export const templateHtml = `<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon>
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" x2="21" y1="16.5" y2="21" />
    </svg>
  </ui-lib-input-icon>
  <input placeholder="SVG icon" type="text" />
</ui-lib-icon-field>

<ui-lib-icon-field iconPosition="right">
  <ui-lib-input-icon>
    <ui-lib-icon name="search" />
  </ui-lib-input-icon>
  <ui-lib-input placeholder="ui-lib-icon child" />
</ui-lib-icon-field>`;

export const templateTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from 'ui-lib-custom/icon';
import { UiLibInput } from 'ui-lib-custom/input';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, Icon, UiLibInput, IconFieldComponent, InputIconComponent],
  templateUrl: './template.example.html',
})
export class MyComponent {
  public svgValue: string = '';
  public iconValue: string = '';
}`;

export const variantsHtml = `<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon styleClass="pi pi-search" />
  <ui-lib-input placeholder="Material" variant="material" />
</ui-lib-icon-field>

<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon styleClass="pi pi-search" />
  <ui-lib-input placeholder="Bootstrap" variant="bootstrap" />
</ui-lib-icon-field>

<ui-lib-icon-field iconPosition="left">
  <ui-lib-input-icon styleClass="pi pi-search" />
  <ui-lib-input placeholder="Minimal" variant="minimal" />
</ui-lib-icon-field>`;

export const variantsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibInput } from 'ui-lib-custom/input';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibInput, IconFieldComponent, InputIconComponent],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public materialValue: string = '';
  public bootstrapValue: string = '';
  public minimalValue: string = '';
}`;
