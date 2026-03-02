import { Directive, ElementRef, HostListener, effect, inject, input } from '@angular/core';
import { LiveAnnouncerService, AriaLivePoliteness } from './live-announcer.service';

/**
 * Directive to announce content changes
 */
@Directive({
  selector: '[uiLibAnnounce]',
  standalone: true,
})
export class AnnounceDirective {
  private readonly liveAnnouncer = inject(LiveAnnouncerService);

  public readonly uiLibAnnounce = input<string>('');
  public readonly politeness = input<AriaLivePoliteness>('polite');

  constructor() {
    effect((): void => {
      const message: string = this.uiLibAnnounce();
      if (message) {
        void this.liveAnnouncer.announce(message, this.politeness());
      }
    });
  }
}

/**
 * Directive to announce on specific events
 */
@Directive({
  selector: '[uiLibAnnounceOnChange]',
  standalone: true,
})
export class AnnounceOnChangeDirective {
  private readonly liveAnnouncer = inject(LiveAnnouncerService);
  private readonly el = inject(ElementRef) as ElementRef<HTMLElement>;

  @HostListener('change')
  @HostListener('input')
  public onValueChange(): void {
    const element: HTMLElement = this.el.nativeElement;
    const message: string | null = element.getAttribute('data-announce-message');
    if (message) {
      void this.liveAnnouncer.announce(message, 'polite');
    }
  }
}
