import { Directive, TemplateRef, inject, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import type { OrganizationChartNode } from './organization-chart.types';

/**
 * Marks an `ng-template` as a node content template for `OrganizationChart`.
 *
 * Usage:
 * ```html
 * <!-- Default template (used when node.type is unset) -->
 * <ng-template uiOrgChartNode let-node>
 *   <strong>{{ node.label }}</strong>
 * </ng-template>
 *
 * <!-- Named template (used when node.type === 'manager') -->
 * <ng-template uiOrgChartNode type="manager" let-node>
 *   <span class="manager-badge">{{ node.label }}</span>
 * </ng-template>
 * ```
 */
@Directive({ selector: '[uiOrgChartNode]', standalone: true })
export class OrgChartNodeTemplateDirective {
  /**
   * Maps this template to nodes whose `type` matches this value.
   * Omit (or set to `'default'`) to register as the fallback template.
   */
  public readonly type: InputSignal<string> = input<string>('default');

  /** The underlying `TemplateRef`, injected automatically. */
  public readonly templateRef: TemplateRef<{ $implicit: OrganizationChartNode }> =
    inject<TemplateRef<{ $implicit: OrganizationChartNode }>>(TemplateRef);
}
