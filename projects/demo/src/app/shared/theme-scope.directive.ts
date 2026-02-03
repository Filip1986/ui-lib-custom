import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appThemeScope]',
  standalone: true,
})
export class ThemeScopeDirective implements OnChanges {
  @Input('appThemeScope') themeVars: Record<string, string> | null = null;

  private previousKeys = new Set<string>();

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['themeVars']) return;
    const target = this.el.nativeElement;
    const next = this.themeVars ?? {};

    // Remove old keys not present anymore
    this.previousKeys.forEach((key) => {
      if (!(key in next)) {
        this.renderer.removeStyle(target, key);
      }
    });

    // Apply new/updated vars
    Object.entries(next).forEach(([key, value]) => {
      this.renderer.setStyle(target, key, value);
      this.previousKeys.add(key);
    });
  }
}
