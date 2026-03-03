import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
  ElementRef,
} from '@angular/core';
import type { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import type { ShapeToken } from 'ui-lib-custom/tokens';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeMode, ThemeVariant } from 'ui-lib-custom/theme';

@Component({
  selector: 'sb-theme-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content />',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeWrapperComponent implements OnChanges, AfterViewInit {
  @Input() public variant: ThemeVariant = 'material';
  @Input() public mode: ThemeMode = 'light';
  @Input() public shape: ShapeToken = 'rounded';

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly hostRef: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);

  public ngAfterViewInit(): void {
    this.syncHostTheme();
  }

  public ngOnChanges(changes: SimpleChanges): void {
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
    const host: HTMLElement = this.hostRef.nativeElement;
    this.themeConfig.applyToRoot(null, host);
    this.themeConfig.applyThemeToDocument(host);
  }
}
