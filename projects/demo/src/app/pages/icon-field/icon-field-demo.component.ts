import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { Icon } from 'ui-lib-custom/icon';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';
import { UiLibInput } from 'ui-lib-custom/input';

type IconFieldDemoSnippetKey = 'basic' | 'template' | 'floatLabel' | 'sizes' | 'variants';

/**
 * Demo page for IconField and InputIcon composition patterns.
 */
@Component({
  selector: 'app-icon-field-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    UiLibInput,
    Icon,
    IconFieldComponent,
    InputIconComponent,
    FloatLabelComponent,
  ],
  templateUrl: './icon-field-demo.component.html',
  styleUrl: './icon-field-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFieldDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'template', label: 'Template' },
    { id: 'float-label', label: 'Float Label' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
  ];

  public readonly snippets: Record<IconFieldDemoSnippetKey, string> = {
    basic: `<uilib-icon-field iconPosition="left">
  <uilib-input-icon styleClass="pi pi-search" />
  <input type="text" placeholder="Search" />
</uilib-icon-field>

<uilib-icon-field iconPosition="right">
  <uilib-input-icon styleClass="pi pi-spinner pi-spin" />
  <input type="text" placeholder="Loading" />
</uilib-icon-field>`,
    template: `<uilib-icon-field iconPosition="left">
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
</uilib-icon-field>`,
    floatLabel: `<uilib-float-label variant="over">
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
</uilib-float-label>`,
    sizes: `<uilib-icon-field iconPosition="left">
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
</uilib-icon-field>`,
    variants: `<uilib-icon-field iconPosition="left">
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
</uilib-icon-field>`,
  };

  public basicSearchValue: string = '';
  public basicLoadingValue: string = '';

  public templateSvgValue: string = '';
  public templateUiLibIconValue: string = '';

  public floatOverValue: string = '';
  public floatInValue: string = '';
  public floatOnValue: string = '';

  public sizeSmallValue: string = '';
  public sizeMediumValue: string = '';
  public sizeLargeValue: string = '';

  public variantMaterialValue: string = '';
  public variantBootstrapValue: string = '';
  public variantMinimalValue: string = '';

  public snippet(key: IconFieldDemoSnippetKey): string {
    return this.snippets[key];
  }
}
