import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import {
  Button,
  Card,
  Container,
  CONTAINER_MAX_WIDTHS,
  Grid,
  INSET_TOKENS,
  Stack,
  Tabs,
  Tab,
  UiLibSelect,
} from 'ui-lib-custom';
import type { ContainerSize, InsetToken, TabsValue } from 'ui-lib-custom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

/**
 * Demo section for container layout usage.
 */
@Component({
  selector: 'app-layout-container-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Button,
    Card,
    Container,
    Grid,
    Stack,
    Tabs,
    Tab,
    UiLibSelect,
    DocDemoViewportComponent,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './container-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerSectionComponent {
  public readonly sections: DocSection[] = [{ id: 'container', label: 'Container' }];

  public readonly usageSnippet: string = `
<ui-lib-container size="md" inset="lg">
  <h3>Content title</h3>
  <p class="no-margin">Keep content aligned with page max-width.</p>
</ui-lib-container>
`;

  public readonly activeTab: WritableSignal<'demo' | 'usage' | 'api'> = signal<
    'demo' | 'usage' | 'api'
  >('demo');

  public readonly size: WritableSignal<ContainerSize> = signal<ContainerSize>('md');
  public readonly inset: WritableSignal<Exclude<InsetToken, 'xs'>> =
    signal<Exclude<InsetToken, 'xs'>>('lg');
  public readonly centered: WritableSignal<boolean> = signal<boolean>(true);

  public readonly sizeOptions: Array<{ label: string; value: ContainerSize }> = Object.keys(
    CONTAINER_MAX_WIDTHS
  ).map((key: string): { label: string; value: ContainerSize } => ({
    label: `${key} (${CONTAINER_MAX_WIDTHS[key as ContainerSize]})`,
    value: key as ContainerSize,
  }));
  public readonly insetOptions: Array<{ label: string; value: Exclude<InsetToken, 'xs'> }> =
    Object.entries(INSET_TOKENS)
      .filter(([key]: [string, string]): boolean => key !== 'xs')
      .map(
        ([key, value]: [string, string]): {
          label: string;
          value: Exclude<InsetToken, 'xs'>;
        } => ({
          label: `${key} (${value})`,
          value: key as Exclude<InsetToken, 'xs'>,
        })
      );
  public readonly centeredOptions: Array<{ label: string; value: boolean }> = [
    { label: 'Centered', value: true },
    { label: 'Left-aligned', value: false },
  ];

  public readonly sizeLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.size(), this.sizeOptions)
  );
  public readonly insetLabel: Signal<string> = computed<string>((): string =>
    this.displayLabel(this.inset(), this.insetOptions)
  );
  public readonly centeredLabel: Signal<string> = computed<string>((): string =>
    this.centered() ? 'Centered' : 'Left-aligned'
  );

  public setTab(tab: 'demo' | 'usage' | 'api'): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as 'demo' | 'usage' | 'api');
  }

  public setSize(value: ContainerSize): void {
    this.size.set(value);
  }

  public setInset(value: Exclude<InsetToken, 'xs'>): void {
    this.inset.set(value);
  }

  public setCentered(value: boolean): void {
    this.centered.set(value);
  }

  public resetControls(): void {
    this.size.set('md');
    this.inset.set('lg');
    this.centered.set(true);
  }

  private displayLabel<T extends string | boolean>(
    value: T,
    options: { label: string; value: T }[]
  ): string {
    const match: { label: string; value: T } | undefined = options.find(
      (option: { label: string; value: T }): boolean => option.value === value
    );
    return match ? match.label : String(value);
  }
}
