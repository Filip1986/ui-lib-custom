import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Avatar } from 'ui-lib-custom/avatar';
import { AvatarGroup } from 'ui-lib-custom/avatar';
import type { AvatarSize, AvatarShape, AvatarVariant } from 'ui-lib-custom/avatar';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Avatar and AvatarGroup components.
 */
@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [CodeSnippet, Avatar, AvatarGroup, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './avatar-demo.component.html',
  styleUrl: './avatar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {
  public readonly importCode: string = "import { Avatar, AvatarGroup } from 'ui-lib-custom/avatar'";
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
