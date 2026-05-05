import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';
import type { TagSeverity, TagSize, TagVariant } from 'ui-lib-custom/tag';

/**
 * Demo page for the Tag component.
 */
@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [Tag],
  templateUrl: './tag-demo.component.html',
  styleUrl: './tag-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDemoComponent {
  public readonly sizes: TagSize[] = ['sm', 'md', 'lg'];
  public readonly variants: TagVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly severities: TagSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warn',
    'danger',
    'contrast',
  ];

  public readonly severityLabels: Record<TagSeverity, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    success: 'Success',
    info: 'Info',
    warn: 'Warning',
    danger: 'Danger',
    contrast: 'Contrast',
  };

  public readonly playgroundValue: WritableSignal<string> = signal<string>('Tag');
  public readonly playgroundSeverity: WritableSignal<TagSeverity> = signal<TagSeverity>('primary');
  public readonly playgroundSize: WritableSignal<TagSize> = signal<TagSize>('md');
  public readonly playgroundVariant: WritableSignal<TagVariant> = signal<TagVariant>('material');
  public readonly playgroundRounded: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundIcon: WritableSignal<string | null> = signal<string | null>(null);

  public setSeverity(severity: TagSeverity): void {
    this.playgroundSeverity.set(severity);
  }

  public setSize(size: TagSize): void {
    this.playgroundSize.set(size);
  }

  public setVariant(variant: TagVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleRounded(): void {
    this.playgroundRounded.set(!this.playgroundRounded());
  }

  public toggleIcon(): void {
    this.playgroundIcon.set(this.playgroundIcon() ? null : 'pi pi-tag');
  }
}
