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
  HostBinding,
} from '@angular/core';
import type { ElementRef, AfterViewInit, OnDestroy, Signal, WritableSignal } from '@angular/core';

interface ViewportPreset {
  key: string;
  label: string;
  width: number;
  height: number;
}

/**
 * Embeds a resizable viewport preview frame for demos.
 */
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
  @Input() public mode: 'inline' | 'floating' = 'inline';
  @Input() public showToolbar: boolean = true;
  @Input() public autoHeight: boolean = false;
  @Input()
  public set active(val: boolean) {
    this.activeSignal.set(val);
  }
  @Output() public activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.mode-inline')
  public get isInline(): boolean {
    return this.mode === 'inline';
  }
  @HostBinding('class.mode-floating')
  public get isFloating(): boolean {
    return this.mode === 'floating';
  }

  @ViewChild('frameHost', { static: false })
  private readonly frameHost?: ElementRef<HTMLDivElement>;

  public readonly presets: ViewportPreset[] = [
    { key: 'full', label: 'Full width', width: 0, height: 900 },
    { key: 'desktop', label: 'Desktop', width: 1440, height: 900 },
    { key: 'laptop', label: 'Laptop', width: 1024, height: 768 },
    { key: 'tablet', label: 'Tablet', width: 768, height: 1024 },
    { key: 'mobile', label: 'Mobile', width: 375, height: 812 },
  ];

  public readonly activeSignal: WritableSignal<boolean> = signal<boolean>(true);
  public readonly width: WritableSignal<number> = signal<number>(1024);
  public readonly height: WritableSignal<number> = signal<number>(768);
  public readonly isPortrait: WritableSignal<boolean> = signal<boolean>(false);
  public readonly customWidth: WritableSignal<number> = signal<number>(480);
  public readonly isFullWidth: WritableSignal<boolean> = signal<boolean>(true);
  public readonly hostWidth: WritableSignal<number> = signal<number>(0);

  public readonly displayWidth: Signal<number> = computed<number>((): number => {
    if (this.isFullWidth()) {
      const hostWidth: number = this.hostWidth();
      return hostWidth > 0 ? hostWidth : this.width();
    }
    return this.isPortrait() ? this.height() : this.width();
  });
  public readonly displayHeight: Signal<number> = computed<number>((): number =>
    this.isPortrait() ? this.width() : this.height()
  );

  private resizeObserver?: ResizeObserver;
  public readonly scale: WritableSignal<number> = signal<number>(1);

  public ngAfterViewInit(): void {
    if (this.frameHost?.nativeElement) {
      this.resizeObserver = new ResizeObserver((): void => this.computeScale());
      this.resizeObserver.observe(
        this.frameHost.nativeElement.parentElement ?? this.frameHost.nativeElement
      );
      this.computeScale();
    }
  }

  public ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  public toggleActive(): void {
    const next: boolean = this.mode === 'inline' ? true : !this.activeSignal();
    this.activeSignal.set(next);
    this.activeChange.emit(next);
  }

  public setPreset(preset: ViewportPreset): void {
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

  public setCustom(): void {
    const val: number = this.customWidth();
    if (val > 0) {
      this.isFullWidth.set(false);
      this.width.set(val);
      this.height.set(900);
      this.isPortrait.set(false);
      this.computeScale();
    }
  }

  public setFullWidth(): void {
    this.isFullWidth.set(true);
    this.isPortrait.set(false);
    this.computeScale();
  }

  public rotate(): void {
    this.isPortrait.update((v: boolean): boolean => !v);
    this.computeScale();
  }

  private computeScale(): void {
    if (this.autoHeight) {
      this.scale.set(1);
      return;
    }
    const frameHost: ElementRef<HTMLDivElement> | undefined = this.frameHost;
    if (!frameHost) {
      return;
    }
    const host: HTMLElement = frameHost.nativeElement.parentElement ?? frameHost.nativeElement;
    this.hostWidth.set(host.clientWidth);
    if (this.isFullWidth()) {
      this.scale.set(1);
      return;
    }
    const avail: number = host.clientWidth - 32;
    const target: number = this.displayWidth();
    const scale: number = Math.min(1, Math.max(0.25, avail > 0 ? avail / target : 1));
    this.scale.set(scale);
  }
}
