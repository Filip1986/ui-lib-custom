import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  signal,
  inject,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Container } from '../../../../../ui-lib-custom/src/public-api';
import { DocSection } from './doc-section.model';

@Component({
  selector: 'app-doc-page-layout',
  standalone: true,
  imports: [CommonModule, Container],
  templateUrl: './doc-page-layout.component.html',
  styleUrl: './doc-page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageLayoutComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) public sections: DocSection[] = [];
  @Input() public topOffset: number = 80;
  @Input() public railWidth: number = 250;

  @HostBinding('style.--doc-top-offset.px')
  public get docTopOffset(): number {
    return this.topOffset;
  }

  @HostBinding('style.--doc-anchor-offset.px')
  public get docAnchorOffset(): number {
    return this.topOffset;
  }

  @HostBinding('style.--doc-rail-width.px')
  public get docRailWidth(): number {
    return this.railWidth;
  }

  public readonly activeSectionId = signal<string | null>(null);

  private readonly document = inject(DOCUMENT);
  private observer?: IntersectionObserver;
  private viewReady = false;

  public ngAfterViewInit(): void {
    this.viewReady = true;
    this.setupObserver();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.viewReady) return;
    if (changes['sections'] || changes['topOffset']) {
      this.setupObserver();
    }
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  public scrollToSection(id: string): void {
    // Pre-set active so click feedback is instant even before intersection observer fires
    this.activeSectionId.set(id);

    const el = this.document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  private setupObserver(): void {
    this.observer?.disconnect();
    const ids = this.flattenSections(this.sections);
    if (!ids.length) return;

    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => this.updateActive(entries, ids),
      {
        rootMargin: `-${this.topOffset}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    ids.forEach((id: string): void => {
      const el = this.document.getElementById(id);
      if (el) {
        this.observer?.observe(el);
      }
    });
  }

  private updateActive(entries: IntersectionObserverEntry[], ids: string[]): void {
    const visible = entries
      .filter((entry: IntersectionObserverEntry): boolean => entry.isIntersecting)
      .sort(
        (a: IntersectionObserverEntry, b: IntersectionObserverEntry): number =>
          a.boundingClientRect.top - b.boundingClientRect.top
      );

    const first = visible[0];
    const nextActive = first ? (first.target as HTMLElement).id : this.findNearestAbove(ids);
    if (nextActive && nextActive !== this.activeSectionId()) {
      this.activeSectionId.set(nextActive);
    }
  }

  private findNearestAbove(ids: string[]): string | null {
    const win = this.document.defaultView;
    const scrollY = win?.scrollY ?? 0;
    const offsetTop = scrollY + this.topOffset + 8;

    const positions = ids
      .map((id: string): { id: string; top: number } | null => {
        const el = this.document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top + scrollY } : null;
      })
      .filter((entry): entry is { id: string; top: number } => Boolean(entry));

    let candidate: { id: string; top: number } | null = null;
    for (const item of positions) {
      if (item.top <= offsetTop) {
        if (!candidate || item.top > candidate.top) {
          candidate = item;
        }
      }
    }

    return candidate?.id ?? positions[0]?.id ?? null;
  }

  private flattenSections(sections: DocSection[]): string[] {
    return sections.flatMap((section: DocSection): string[] => [
      section.id,
      ...(section.children?.map((child: DocSection): string => child.id) ?? []),
    ]);
  }
}
