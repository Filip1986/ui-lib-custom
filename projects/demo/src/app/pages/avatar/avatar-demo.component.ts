import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Avatar } from 'ui-lib-custom/avatar';
import { AvatarGroup } from 'ui-lib-custom/avatar';
import type { AvatarSize, AvatarShape, AvatarVariant } from 'ui-lib-custom/avatar';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the Avatar and AvatarGroup components.
 */
@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    DocCodeExampleComponent,
    Avatar,
    AvatarGroup,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './avatar-demo.component.html',
  styleUrl: './avatar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Avatar, AvatarGroup } from 'ui-lib-custom/avatar'";
  public readonly snippetImage: string = `<ui-lib-avatar image="/photo.jpg" imageAlt="Jane Doe" size="md" />`;
  public readonly snippetImageTs: string = `import { Component } from '@angular/core';
import { Avatar } from 'ui-lib-custom/avatar';

@Component({
  standalone: true,
  imports: [Avatar],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
  public readonly snippetLabel: string = `<ui-lib-avatar label="JD" size="md" />`;
  public readonly snippetLabelTs: string = `import { Component } from '@angular/core';
import { Avatar } from 'ui-lib-custom/avatar';

@Component({
  standalone: true,
  imports: [Avatar],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
  public readonly snippetIcon: string = `<ui-lib-avatar icon="pi pi-user" size="md" />`;
  public readonly snippetIconTs: string = `import { Component } from '@angular/core';
import { Avatar } from 'ui-lib-custom/avatar';

@Component({
  standalone: true,
  imports: [Avatar],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
  public readonly snippetShape: string = `<ui-lib-avatar label="JD" shape="square" />`;
  public readonly snippetShapeTs: string = `import { Component } from '@angular/core';
import { Avatar } from 'ui-lib-custom/avatar';

@Component({
  standalone: true,
  imports: [Avatar],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
  public readonly snippetVariant: string = `<ui-lib-avatar label="VT" variant="material" />`;
  public readonly snippetVariantTs: string = `import { Component } from '@angular/core';
import { Avatar } from 'ui-lib-custom/avatar';

@Component({
  standalone: true,
  imports: [Avatar],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
  public readonly snippetAvatarGroup: string = `<ui-lib-avatar-group ariaLabel="Project team">\n  <ui-lib-avatar image="/amy.jpg" imageAlt="Amy" />\n  <ui-lib-avatar image="/bob.jpg" imageAlt="Bob" />\n  <ui-lib-avatar label="+3" />\n</ui-lib-avatar-group>`;
  public readonly snippetAvatarGroupTs: string = `import { Component } from '@angular/core';
import { Avatar, AvatarGroup } from 'ui-lib-custom/avatar';

@Component({
  standalone: true,
  imports: [Avatar, AvatarGroup],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'image', label: 'Image' },
    { id: 'label', label: 'Label (Initials)' },
    { id: 'icon', label: 'Icon' },
    { id: 'shapes', label: 'Shapes' },
    { id: 'variants', label: 'Variants' },
    { id: 'avatar-group', label: 'Avatar Group' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API Reference' },
  ];

  public readonly sizes: AvatarSize[] = ['sm', 'md', 'lg'];
  public readonly shapes: AvatarShape[] = ['circle', 'square'];
  public readonly variants: AvatarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly playgroundSize: WritableSignal<AvatarSize> = signal<AvatarSize>('md');
  public readonly playgroundShape: WritableSignal<AvatarShape> = signal<AvatarShape>('circle');
  public readonly playgroundVariant: WritableSignal<AvatarVariant> =
    signal<AvatarVariant>('material');

  public readonly avatarInputRows: readonly ApiPropRow[] = [
    {
      name: 'image',
      type: 'string | null',
      default: 'null',
      description: 'URL of the image to display.',
    },
    {
      name: 'imageAlt',
      type: 'string',
      default: "'Avatar'",
      description: 'Alt text for the image (used as aria-label).',
    },
    {
      name: 'label',
      type: 'string | null',
      default: 'null',
      description: 'Initials or short text shown when no image is set.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'CSS class string for an icon (e.g. <code>pi pi-user</code>).',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the avatar.',
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      default: "'circle'",
      description: 'Shape of the avatar.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Visual variant. Inherits global theme when null.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Overrides the auto-resolved accessible label.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS classes to append to the host element.',
    },
  ];

  public readonly avatarGroupInputRows: readonly ApiPropRow[] = [
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label for the group (role="group").',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'label',
      type: 'string | null',
      default: 'null',
      description: 'Text (usually initials) shown inside the avatar.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'Icon name used as the avatar graphic.',
    },
    {
      name: 'image',
      type: 'string | null',
      default: 'null',
      description: 'URL or data URL of the avatar image.',
    },
    {
      name: 'imageAlt',
      type: 'string',
      default: "'avatar'",
      description: 'Alt text for the image.',
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      default: "'circle'",
      description: 'Avatar shape.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: 'Avatar size preset.',
    },
    {
      name: 'status',
      type: "'online' | 'offline' | 'away' | 'busy' | null",
      default: 'null',
      description: 'Presence status indicator dot.',
    },
    {
      name: 'badge',
      type: 'string | null',
      default: 'null',
      description: 'Badge text shown on the avatar corner.',
    },
    {
      name: 'badgeSeverity',
      type: "'info' | 'success' | 'warning' | 'danger'",
      default: "'info'",
      description: 'Badge colour severity.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
  ];

  public setSize(size: AvatarSize): void {
    this.playgroundSize.set(size);
  }

  public setShape(shape: AvatarShape): void {
    this.playgroundShape.set(shape);
  }

  public setVariant(variant: AvatarVariant): void {
    this.playgroundVariant.set(variant);
  }
}
