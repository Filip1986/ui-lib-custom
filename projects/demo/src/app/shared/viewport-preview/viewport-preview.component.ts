import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';

interface ViewportPreset {
  key: string;
  label: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-viewport-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viewport-preview.component.html',
  styleUrl: './viewport-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'viewportPreview',
})
export class ViewportPreviewComponent implements AfterViewInit, OnDestroy {
  @Input() mode: 'inline' | 'floating' = 'inline';
  @Input() showToolbar = true;
  @Input() autoHeight = false;
  @Input() set active(val: boolean) {
    this.activeSignal.set(val);
  }
  @Output() activeChange = new EventEmitter<boolean>();

  @HostBinding('class.mode-inline') get isInline() {
    return this.mode === 'inline';
  }
  @HostBinding('class.mode-floating') get isFloating() {
    return this.mode === 'floating';
  }

  @ViewChild('frameHost', { static: false }) frameHost?: ElementRef<HTMLDivElement>;

  readonly presets: ViewportPreset[] = [
    { key: 'full', label: 'Full width', width: 0, height: 900 },
    { key: 'desktop', label: 'Desktop', width: 1440, height: 900 },
    { key: 'laptop', label: 'Laptop', width: 1024, height: 768 },
    { key: 'tablet', label: 'Tablet', width: 768, height: 1024 },
    { key: 'mobile', label: 'Mobile', width: 375, height: 812 },
  ];

  readonly activeSignal = signal(true);
  readonly width = signal(1024);
  readonly height = signal(768);
  readonly isPortrait = signal(false);
  readonly customWidth = signal(480);
  readonly isFullWidth = signal(true);
  readonly hostWidth = signal(0);

  readonly displayWidth = computed(() => {
    if (this.isFullWidth()) {
      const hostWidth = this.hostWidth();
      return hostWidth > 0 ? hostWidth : this.width();
    }
    return this.isPortrait() ? this.height() : this.width();
  });
  readonly displayHeight = computed(() => (this.isPortrait() ? this.width() : this.height()));

  private resizeObserver?: ResizeObserver;
  readonly scale = signal(1);

  ngAfterViewInit(): void {
    if (this.frameHost?.nativeElement) {
      this.resizeObserver = new ResizeObserver(() => this.computeScale());
      this.resizeObserver.observe(
        this.frameHost.nativeElement.parentElement ?? this.frameHost.nativeElement
      );
      this.computeScale();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  toggleActive(): void {
    const next = this.mode === 'inline' ? true : !this.activeSignal();
    this.activeSignal.set(next);
    this.activeChange.emit(next);
  }

  setPreset(preset: ViewportPreset): void {
    if (preset.key === 'full') {
      this.setFullWidth();
      return;
    }
    this.isFullWidth.set(false);
    this.width.set(preset.width);
    this.height.set(preset.height);
    this.isPortrait.set(false);
    this.computeScale();
  }

  setCustom(): void {
    const val = this.customWidth();
    if (val > 0) {
      this.isFullWidth.set(false);
      this.width.set(val);
      this.height.set(900);
      this.isPortrait.set(false);
      this.computeScale();
    }
  }

  setFullWidth(): void {
    this.isFullWidth.set(true);
    this.isPortrait.set(false);
    this.computeScale();
  }

  rotate(): void {
    this.isPortrait.update((v) => !v);
    this.computeScale();
  }

  private computeScale(): void {
    if (this.autoHeight) {
      this.scale.set(1);
      return;
    }
    const host = this.frameHost?.nativeElement?.parentElement;
    if (!host) {
      return;
    }
    this.hostWidth.set(host.clientWidth);
    if (this.isFullWidth()) {
      this.scale.set(1);
      return;
    }
    const avail = host.clientWidth - 32;
    const target = this.displayWidth();
    const scale = Math.min(1, Math.max(0.25, avail > 0 ? avail / target : 1));
    this.scale.set(scale);
  }
}
