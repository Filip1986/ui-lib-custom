import type { InputSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export interface CssVarRow {
  readonly variable: string;
  readonly default?: string;
  readonly description: string;
}

/** Shared table for CSS Custom Properties sections across all demo pages. */
@Component({
  selector: 'app-doc-css-vars-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './doc-css-vars-table.component.html',
  styleUrl: './doc-css-vars-table.component.scss',
})
export class DocCssVarsTableComponent {
  public readonly rows: InputSignal<readonly CssVarRow[]> = input.required<readonly CssVarRow[]>();
  public readonly showDefault: InputSignal<boolean> = input<boolean>(true);

  public extractColor(value: string | undefined): string | null {
    if (!value) return null;
    const hex: RegExpMatchArray | null = value.match(/#[0-9a-fA-F]{3,8}/);
    if (hex) return hex[0];
    const rgba: RegExpMatchArray | null = value.match(/rgba?\([^)]+\)/);
    if (rgba) return rgba[0];
    const hsl: RegExpMatchArray | null = value.match(/hsla?\([^)]+\)/);
    if (hsl) return hsl[0];
    return null;
  }
}
