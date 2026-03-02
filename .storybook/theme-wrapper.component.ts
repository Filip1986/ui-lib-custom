import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeWrapperComponent implements OnChanges, AfterViewInit {
  @Input() public variant: ThemeVariant = 'material';
  @Input() public mode: ThemeMode = 'light';
  @Input() public shape: ShapeToken = 'rounded';

  constructor(
    private readonly themeConfig: ThemeConfigService,
    private readonly hostRef: ElementRef<HTMLElement>
  ) {}

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
