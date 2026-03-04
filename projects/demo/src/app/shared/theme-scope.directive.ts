import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';

/**
 * Applies CSS variables to a subtree for demo theme scoping.
 */
@Directive({
  selector: '[appThemeScope]',
  standalone: true,
})
export class ThemeScopeDirective implements OnChanges {
  @Input('appThemeScope') public themeVars: Record<string, string> | null = null;

  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly previousKeys: Set<string> = new Set<string>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['themeVars']) return;
    const target: HTMLElement = this.el.nativeElement;
    const next: Record<string, string> = this.themeVars ?? {};

    // Remove old keys not present anymore
    this.previousKeys.forEach((key: string): void => {
      if (!(key in next)) {
        this.renderer.removeStyle(target, key);
      }
    });

    // Apply new/updated vars
    Object.entries(next).forEach(([key, value]: [string, string]): void => {
      this.renderer.setStyle(target, key, value);
      this.previousKeys.add(key);
    });
  }
}
