import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ShapeToken } from 'ui-lib-custom/tokens';
import { ThemeConfigService, ThemeMode, ThemeVariant } from 'ui-lib-custom/theme';

@Component({
  selector: 'sb-theme-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content />',
  encapsulation: ViewEncapsulation.None,
})
export class ThemeWrapperComponent implements OnChanges, AfterViewInit {
  @Input() variant: ThemeVariant = 'material';
  @Input() mode: ThemeMode = 'light';
  @Input() shape: ShapeToken = 'rounded';

  constructor(
    private readonly themeConfig: ThemeConfigService,
    private readonly hostRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.syncHostTheme();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variant']) {
      this.themeConfig.setVariant(this.variant);
    }
    if (changes['mode']) {
      this.themeConfig.setMode(this.mode);
    }
    if (changes['shape']) {
      this.themeConfig.setShape(this.shape);
    }
    this.syncHostTheme();
  }

  private syncHostTheme(): void {
    const host = this.hostRef?.nativeElement ?? null;
    this.themeConfig.applyToRoot(null, host);
    this.themeConfig.applyThemeToDocument(host);
  }
}
