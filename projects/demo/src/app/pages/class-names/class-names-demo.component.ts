import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { classNames, ClassNamesPipe } from 'ui-lib-custom/class-names';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the classNames utility and ClassNamesPipe.
 */
@Component({
  selector: 'app-class-names-demo',
  standalone: true,
  imports: [CodeSnippet, ClassNamesPipe, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './class-names-demo.component.html',
  styleUrl: './class-names-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassNamesDemoComponent {
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
