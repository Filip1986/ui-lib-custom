import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';

export interface QualityCategoryScores {
  readonly api: number;
  readonly a11y: number;
  readonly perf: number;
  readonly comp: number;
  readonly theme: number;
  readonly dx: number;
  readonly docs: number;
  readonly polish: number;
  readonly angular: number;
  readonly feel: number;
}

export interface ComponentQualityAudit {
  readonly date: string;
  readonly tier: 1 | 2;
  readonly scores: QualityCategoryScores;
  readonly competitiveParity: 'pass' | 'fail' | 'pending';
  readonly apgPattern?: { readonly name: string; readonly url: string };
  readonly unchecked?: readonly string[];
  readonly humanPending?: readonly string[];
}

interface CategoryDisplay {
  readonly label: string;
  readonly abbr: string;
  readonly score: number;
}

/**
 *
 */
@Component({
  selector: 'app-doc-quality-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './doc-quality-badge.component.html',
  styleUrl: './doc-quality-badge.component.scss',
})
export class DocQualityBadgeComponent {
  public readonly audit: InputSignal<ComponentQualityAudit> =
    input.required<ComponentQualityAudit>();

  public readonly isExpanded: WritableSignal<boolean> = signal<boolean>(false);

  public readonly average: Signal<number> = computed<number>((): number => {
    const s: QualityCategoryScores = this.audit().scores;
    const total: number =
      s.api + s.a11y + s.perf + s.comp + s.theme + s.dx + s.docs + s.polish + s.angular + s.feel;
    return Math.round((total / 10) * 10) / 10;
  });

  public readonly gate: Signal<boolean> = computed<boolean>((): boolean => {
    const s: QualityCategoryScores = this.audit().scores;
    return (
      s.api >= 8 &&
      s.a11y >= 8 &&
      s.perf >= 8 &&
      s.comp >= 8 &&
      s.theme >= 8 &&
      s.dx >= 8 &&
      s.docs >= 8 &&
      s.polish >= 8 &&
      s.angular >= 8 &&
      s.feel >= 8
    );
  });

  public readonly categories: Signal<readonly CategoryDisplay[]> = computed<
    readonly CategoryDisplay[]
  >((): readonly CategoryDisplay[] => {
    const s: QualityCategoryScores = this.audit().scores;
    return [
      { label: 'API Clarity', abbr: 'API', score: s.api },
      { label: 'Accessibility', abbr: 'A11y', score: s.a11y },
      { label: 'Performance', abbr: 'Perf', score: s.perf },
      { label: 'Composability', abbr: 'Comp', score: s.comp },
      { label: 'Theming', abbr: 'Theme', score: s.theme },
      { label: 'Developer Experience', abbr: 'DX', score: s.dx },
      { label: 'Documentation', abbr: 'Docs', score: s.docs },
      { label: 'Visual & Interaction Polish', abbr: 'Polish', score: s.polish },
      { label: 'Angular Integration', abbr: 'Angular', score: s.angular },
      { label: 'Emotional Quality', abbr: 'Feel', score: s.feel },
    ];
  });

  public scoreGrade(score: number): 'excellent' | 'pass' | 'warn' | 'fail' {
    if (score >= 9) return 'excellent';
    if (score >= 8) return 'pass';
    if (score >= 7) return 'warn';
    return 'fail';
  }

  public toggle(): void {
    this.isExpanded.update((v: boolean): boolean => !v);
  }
}
