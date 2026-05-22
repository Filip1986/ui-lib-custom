import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';

export interface CategoryCheckpointCount {
  readonly checked: number;
  readonly total: number;
}

export interface CategoryCheckpoints {
  readonly api?: CategoryCheckpointCount;
  readonly a11y?: CategoryCheckpointCount;
  readonly perf?: CategoryCheckpointCount;
  readonly comp?: CategoryCheckpointCount;
  readonly theme?: CategoryCheckpointCount;
  readonly dx?: CategoryCheckpointCount;
  readonly docs?: CategoryCheckpointCount;
  readonly polish?: CategoryCheckpointCount;
  readonly angular?: CategoryCheckpointCount;
  readonly feel?: CategoryCheckpointCount;
}

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
  // Tier 2 only: per-category checkpoint counts (score = checked/total × 10)
  readonly checkpoints?: CategoryCheckpoints;
  readonly competitiveParity: 'pass' | 'fail' | 'pending';
  readonly apgPattern?: { readonly name: string; readonly url: string };
  readonly humanPending?: readonly string[];
}

interface CategoryDisplay {
  readonly key: keyof QualityCategoryScores;
  readonly label: string;
  readonly description: string;
  readonly abbr: string;
  readonly score: number;
  readonly checkpointCount?: CategoryCheckpointCount;
}

const CATEGORY_TOTALS: Record<keyof QualityCategoryScores, number> = {
  api: 16,
  a11y: 28,
  perf: 20,
  comp: 14,
  theme: 15,
  dx: 17,
  docs: 18,
  polish: 15,
  angular: 16,
  feel: 10,
};

const CATEGORY_DESCRIPTIONS: Record<keyof QualityCategoryScores, string> = {
  api: 'Signal inputs/outputs, naming consistency, intelligent defaults',
  a11y: 'ARIA roles, keyboard navigation, focus management, screen reader support, reduced motion',
  perf: 'Render efficiency, signal usage, memory management, tree-shaking, bundle impact',
  comp: 'Content projection, composability, directive alternatives, extension points',
  theme: 'CSS custom properties, dark mode, variant switching, design token coverage',
  dx: 'TypeScript completions, minimal boilerplate, clear error states, developer ergonomics',
  docs: 'README completeness, API reference, usage examples, a11y notes, edge cases',
  polish: 'Animation quality, interaction feedback, visual consistency, perceptible responsiveness',
  angular: 'Signals-first, OnPush, standalone, SSR-safe, zoneless-compatible, hydration',
  feel: 'Emotional quality — satisfying to use, makes developers smile',
};

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
    const cp: CategoryCheckpoints | undefined = this.audit().checkpoints;
    const keys: (keyof QualityCategoryScores)[] = [
      'api',
      'a11y',
      'perf',
      'comp',
      'theme',
      'dx',
      'docs',
      'polish',
      'angular',
      'feel',
    ];
    const labels: Record<keyof QualityCategoryScores, string> = {
      api: 'API Clarity',
      a11y: 'Accessibility',
      perf: 'Performance',
      comp: 'Composability',
      theme: 'Theming',
      dx: 'Developer Experience',
      docs: 'Documentation',
      polish: 'Polish',
      angular: 'Angular Integration',
      feel: 'Emotional Quality',
    };
    const abbrs: Record<keyof QualityCategoryScores, string> = {
      api: 'API',
      a11y: 'A11y',
      perf: 'Perf',
      comp: 'Comp',
      theme: 'Theme',
      dx: 'DX',
      docs: 'Docs',
      polish: 'Polish',
      angular: 'Angular',
      feel: 'Feel',
    };
    return keys.map((key: keyof QualityCategoryScores): CategoryDisplay => {
      const checkpointCount: CategoryCheckpointCount | undefined = cp?.[key];
      const base: Omit<CategoryDisplay, 'checkpointCount'> = {
        key,
        label: labels[key],
        description: CATEGORY_DESCRIPTIONS[key],
        abbr: abbrs[key],
        score: s[key],
      };
      return checkpointCount !== undefined ? { ...base, checkpointCount } : base;
    });
  });

  public readonly checkpointTotals: typeof CATEGORY_TOTALS = CATEGORY_TOTALS;

  public scoreGrade(score: number): 'excellent' | 'pass' | 'warn' | 'fail' {
    if (score >= 9) return 'excellent';
    if (score >= 8) return 'pass';
    if (score >= 7) return 'warn';
    return 'fail';
  }

  public toggle(): void {
    this.isExpanded.update((value: boolean): boolean => !value);
  }
}
