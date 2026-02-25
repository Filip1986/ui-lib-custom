import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appThemeScope]',
  standalone: true,
})
export class ThemeScopeDirective implements OnChanges {
  @Input('appThemeScope') themeVars: Record<string, string> | null = null;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private previousKeys = new Set<string>();

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
