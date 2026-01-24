import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, signal, computed, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

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
})
export class ViewportPreviewComponent implements AfterViewInit, OnDestroy {
  @Input() set active(val: boolean) {
    this.activeSignal.set(val);
  }
  @Output() activeChange = new EventEmitter<boolean>();

  @ViewChild('frameHost', { static: false }) frameHost?: ElementRef<HTMLDivElement>;

  readonly presets: ViewportPreset[] = [
    { key: 'desktop', label: 'Desktop', width: 1440, height: 900 },
    { key: 'laptop', label: 'Laptop', width: 1024, height: 768 },
    { key: 'tablet', label: 'Tablet', width: 768, height: 1024 },
    { key: 'mobile', label: 'Mobile', width: 375, height: 812 },
  ];

  readonly activeSignal = signal(false);
  readonly width = signal(1440);
  readonly height = signal(900);
  readonly isPortrait = signal(false);
  readonly customWidth = signal(480);

  readonly displayWidth = computed(() => (this.isPortrait() ? this.height() : this.width()));
  readonly displayHeight = computed(() => (this.isPortrait() ? this.width() : this.height()));

  private resizeObserver?: ResizeObserver;
  readonly scale = signal(1);

  ngAfterViewInit(): void {
    if (this.frameHost?.nativeElement) {
      this.resizeObserver = new ResizeObserver(() => this.computeScale());
      this.resizeObserver.observe(this.frameHost.nativeElement.parentElement ?? this.frameHost.nativeElement);
      this.computeScale();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  toggleActive(): void {
    const next = !this.activeSignal();
    this.activeSignal.set(next);
    this.activeChange.emit(next);
  }

  setPreset(preset: ViewportPreset): void {
    this.width.set(preset.width);
    this.height.set(preset.height);
    this.isPortrait.set(false);
    this.computeScale();
  }

  setCustom(): void {
    const val = this.customWidth();
    if (val > 0) {
      this.width.set(val);
      this.height.set(900);
      this.isPortrait.set(false);
      this.computeScale();
    }
  }

  rotate(): void {
    this.isPortrait.update((v) => !v);
    this.computeScale();
  }

  private computeScale(): void {
    const host = this.frameHost?.nativeElement?.parentElement;
    if (!host) {
      return;
    }
    const avail = host.clientWidth - 32;
    const target = this.displayWidth();
    const scale = Math.min(1, Math.max(0.25, avail > 0 ? avail / target : 1));
    this.scale.set(scale);
  }
}
