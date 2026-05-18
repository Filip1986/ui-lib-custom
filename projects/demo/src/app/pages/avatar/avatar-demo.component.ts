import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
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

/**
 * Demo page for the Avatar and AvatarGroup components.
 */
@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Avatar,
    AvatarGroup,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
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
  public readonly snippetLabel: string = `<ui-lib-avatar label="JD" size="md" />`;
  public readonly snippetIcon: string = `<ui-lib-avatar icon="pi pi-user" size="md" />`;
  public readonly snippetShape: string = `<ui-lib-avatar label="JD" shape="square" />`;
  public readonly snippetVariant: string = `<ui-lib-avatar label="VT" variant="material" />`;
  public readonly snippetAvatarGroup: string = `<ui-lib-avatar-group ariaLabel="Project team">\n  <ui-lib-avatar image="/amy.jpg" imageAlt="Amy" />\n  <ui-lib-avatar image="/bob.jpg" imageAlt="Bob" />\n  <ui-lib-avatar label="+3" />\n</ui-lib-avatar-group>`;
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

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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
