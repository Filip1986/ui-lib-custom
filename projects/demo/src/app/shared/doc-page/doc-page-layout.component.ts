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
import { DocTocComponent } from './doc-toc.component';
import { DocSection } from './doc-section.model';
import { Container, Card } from '../../../../../ui-lib-custom/src/public-api';

@Component({
  selector: 'app-doc-page-layout',
  standalone: true,
  imports: [CommonModule, DocTocComponent, Container, Card],
  templateUrl: './doc-page-layout.component.html',
  styleUrl: './doc-page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageLayoutComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) sections: DocSection[] = [];
  @Input() topOffset = 80;
  @Input() railWidth = 250;

  @HostBinding('style.--doc-top-offset.px') get docTopOffset(): number {
    return this.topOffset;
  }

  @HostBinding('style.--doc-anchor-offset.px') get docAnchorOffset(): number {
    return this.topOffset;
  }

  @HostBinding('style.--doc-rail-width.px') get docRailWidth(): number {
    return this.railWidth;
  }

  readonly activeSectionId = signal<string | null>(null);

  private readonly document = inject(DOCUMENT);
  private observer?: IntersectionObserver;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.setupObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.viewReady) return;
    if (changes['sections'] || changes['topOffset']) {
      this.setupObserver();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollToSection(id: string): void {
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

    this.observer = new IntersectionObserver((entries) => this.updateActive(entries, ids), {
      rootMargin: `-${this.topOffset}px 0px -60% 0px`,
      threshold: [0, 0.25, 0.5, 1],
    });

    ids.forEach((id) => {
      const el = this.document.getElementById(id);
      if (el) {
        this.observer?.observe(el);
      }
    });
  }

  private updateActive(entries: IntersectionObserverEntry[], ids: string[]): void {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    const nextActive = visible[0]?.target?.id ?? this.findNearestAbove(ids);
    if (nextActive && nextActive !== this.activeSectionId()) {
      this.activeSectionId.set(nextActive);
    }
  }

  private findNearestAbove(ids: string[]): string | null {
    const win = this.document.defaultView;
    const scrollY = win?.scrollY ?? 0;
    const offsetTop = scrollY + this.topOffset + 8;

    const positions = ids
      .map((id) => {
        const el = this.document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top + scrollY } : null;
      })
      .filter((entry): entry is { id: string; top: number } => !!entry);

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
    return sections.flatMap((section) => [
      section.id,
      ...(section.children?.map((child) => child.id) ?? []),
    ]);
  }
}
