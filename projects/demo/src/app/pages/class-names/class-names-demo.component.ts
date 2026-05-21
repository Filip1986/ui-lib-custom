import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { classNames, ClassNamesPipe } from 'ui-lib-custom/class-names';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
/**
 * Demo page for the classNames utility and ClassNamesPipe.
 */
@Component({
  selector: 'app-class-names-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    ClassNamesPipe,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './class-names-demo.component.html',
  styleUrl: './class-names-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassNamesDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 10,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { classNames, ClassNamesPipe } from 'ui-lib-custom/class-names'";
  public readonly snippetFunctionUsage: string = `import { classNames } from 'ui-lib-custom/class-names';

// Strings
classNames('foo', 'bar')
// → 'foo bar'

// Conditional via boolean expression
classNames('btn', isActive && 'btn--active')
// → 'btn btn--active'  (when isActive = true)

// Object: keys with truthy values included
classNames({ active: true, disabled: false })
// → 'active'

// Array: recursively flattened
classNames(['base', { highlight: true }])
// → 'base highlight'

// Falsy values are silently ignored
classNames('btn', null, undefined, false, 'icon')
// → 'btn icon'`;
  public readonly snippetPipeUsage: string = `import { ClassNamesPipe } from 'ui-lib-custom/class-names';

@Component({
  imports: [ClassNamesPipe],
  template: \`
    <!-- Object syntax -->
    <div [class]="{ active: isActive, hidden: isHidden } | classNames"></div>

    <!-- String with extra object arg -->
    <div [class]="'btn' | classNames:{ 'btn--lg': isLarge }"></div>

    <!-- Array flattening -->
    <div [class]="['base', isActive && 'active'] | classNames"></div>
  \`,
})`;
  public readonly snippetClassNameValueType: string = `type ClassNameValue =\n  | string\n  | null\n  | undefined\n  | false\n  | Record<string, boolean | null | undefined | false>\n  | ClassNameValue[];`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'function-usage', label: 'Function Usage' },
    { id: 'pipe-usage', label: 'Pipe Usage' },
    { id: 'interactive-playground', label: 'Interactive Playground' },
    { id: 'api', label: 'API Reference' },
  ];

  /** Controls the active state for the playground element. */
  public readonly isActive: WritableSignal<boolean> = signal<boolean>(true);

  /** Controls the disabled state for the playground element. */
  public readonly isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  /** Controls the highlighted state for the playground element. */
  public readonly isHighlighted: WritableSignal<boolean> = signal<boolean>(false);

  /** Computed class string via the classNames function in TypeScript. */
  public readonly computedClasses: Signal<string> = computed<string>((): string =>
    classNames('demo-box', {
      'demo-box--active': this.isActive(),
      'demo-box--disabled': this.isDisabled(),
      'demo-box--highlighted': this.isHighlighted(),
    })
  );

  /** Result preview for the function call section. */
  public readonly functionResult: Signal<string> = computed<string>((): string =>
    classNames('btn', this.isActive() && 'btn--active', {
      'btn--disabled': this.isDisabled(),
    })
  );

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'classNames',
      type: 'ClassNamesInput',
      description:
        'Object whose keys are class names and values are boolean conditions, or an array/string of class names.',
    },
  ];

  public readonly classnamesFnRows: readonly ApiPropRow[] = [
    {
      name: '...values',
      type: 'ClassNameValue[]',
      description:
        'One or more values. Strings are included as-is. Object keys with truthy values are included. Arrays are recursively processed. Falsy primitives are ignored.',
    },
  ];

  public readonly classnamesPipeRows: readonly ApiPropRow[] = [
    {
      name: 'value (primary)',
      type: 'ClassNameValue',
      description: 'The primary value passed before the pipe symbol.',
    },
    {
      name: '...additional',
      type: 'ClassNameValue[]',
      description: 'Optional extra values passed as pipe arguments after :.',
    },
  ];

  public toggleActive(): void {
    this.isActive.update((value: boolean): boolean => !value);
  }

  public toggleDisabled(): void {
    this.isDisabled.update((value: boolean): boolean => !value);
  }

  public toggleHighlighted(): void {
    this.isHighlighted.update((value: boolean): boolean => !value);
  }
}
