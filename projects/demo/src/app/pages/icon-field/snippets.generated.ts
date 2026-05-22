/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <input type="text" placeholder="Search" />
</uilib-icon-field>

<uilib-icon-field iconPosition="right">
  <uilib-input-icon styleClass="pi pi-spinner pi-spin" />
  <input type="text" placeholder="Loading" />
</uilib-icon-field>`;

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

export const floatLabelHtml = `<uilib-float-label variant="over">
  <uilib-icon-field iconPosition="left">
    <uilib-input-icon styleClass="pi pi-envelope" />
    <input type="text" placeholder=" " />
  </uilib-icon-field>
  <label>Email (over)</label>
</uilib-float-label>

<uilib-float-label variant="in">
  <uilib-icon-field iconPosition="left">
    <uilib-input-icon styleClass="pi pi-user" />
    <input type="text" placeholder=" " />
  </uilib-icon-field>
  <label>Username (in)</label>
</uilib-float-label>

<uilib-float-label variant="on">
  <uilib-icon-field iconPosition="left">
    <uilib-input-icon styleClass="pi pi-lock" />
    <input type="password" placeholder=" " />
  </uilib-icon-field>
  <label>Password (on)</label>
</uilib-float-label>`;

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

export const sizesHtml = `<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input size="sm" placeholder="Small" />
</uilib-icon-field>

<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input size="md" placeholder="Medium" />
</uilib-icon-field>

<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input size="lg" placeholder="Large" />
</uilib-icon-field>`;

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

export const templateHtml = `<uilib-icon-field iconPosition="left">
  <uilib-input-icon>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  </uilib-input-icon>
  <input type="text" placeholder="SVG icon" />
</uilib-icon-field>

<uilib-icon-field iconPosition="right">
  <uilib-input-icon>
    <ui-lib-icon name="search" />
  </uilib-input-icon>
  <ui-lib-input placeholder="ui-lib-icon child" />
</uilib-icon-field>`;

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

export const variantsHtml = `<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input variant="material" placeholder="Material" />
</uilib-icon-field>

<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input variant="bootstrap" placeholder="Bootstrap" />
</uilib-icon-field>

<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <ui-lib-input variant="minimal" placeholder="Minimal" />
</uilib-icon-field>`;

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
