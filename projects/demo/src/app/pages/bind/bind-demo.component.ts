import { ChangeDetectionStrategy, Component, signal, computed, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Bind } from 'ui-lib-custom/bind';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Bind directive.
 * Demonstrates basic usage, dynamic binding updates, and the full input API.
 */
@Component({
  selector: 'app-bind-demo',
  standalone: true,
  imports: [CodeSnippet, Bind, JsonPipe, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './bind-demo.component.html',
  styleUrl: './bind-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BindDemoComponent {
  public readonly importCode: string = "import { Bind } from 'ui-lib-custom/bind'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'interactive-playground', label: 'Interactive Playground' },
    { id: 'boolean-numeric', label: 'Boolean & Numeric Properties' },
    { id: 'api', label: 'API' },
  ];

  /** Controls which dynamic id preset is active. */
  public readonly activeIdPreset: WritableSignal<'alpha' | 'beta' | 'gamma'> = signal<
    'alpha' | 'beta' | 'gamma'
  >('alpha');

  /** Available id presets — typed as a readonly tuple so the template infers the union. */
  public readonly idPresets: ReadonlyArray<'alpha' | 'beta' | 'gamma'> = [
    'alpha',
    'beta',
    'gamma',
  ] as const;

  /** Used to toggle the tooltip text on the live example element. */
  public readonly tooltipLabel: WritableSignal<string> = signal<string>('Hover me');

  /** Whether to include tabIndex in the live binding. */
  public readonly includeTabIndex: WritableSignal<boolean> = signal<boolean>(false);

  /** The live binding object used in the interactive playground section. */
  public readonly liveBindings: Signal<Record<string, unknown>> = computed<Record<string, unknown>>(
    (): Record<string, unknown> => {
      const base: Record<string, unknown> = {
        id: `bind-target-${this.activeIdPreset()}`,
        title: this.tooltipLabel(),
        'aria-label': `Demonstration element — ${this.tooltipLabel()}`,
      };
      if (this.includeTabIndex()) {
        base['tabIndex'] = 0;
      }
      return base;
    }
  );

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public setPreset(preset: 'alpha' | 'beta' | 'gamma'): void {
    this.activeIdPreset.set(preset);
  }

  public cycleTooltip(): void {
    const labels: string[] = ['Hover me', 'Dynamic tooltip!', 'Changed again'];
    const current: string = this.tooltipLabel();
    const index: number = labels.indexOf(current);
    const next: string = labels[(index + 1) % labels.length] ?? 'Hover me';
    this.tooltipLabel.set(next);
  }

  public toggleTabIndex(): void {
    this.includeTabIndex.update((value: boolean): boolean => !value);
  }
}
