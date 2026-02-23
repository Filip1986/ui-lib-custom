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

  uiLibAnnounce = input<string>('');
  politeness = input<AriaLivePoliteness>('polite');

  constructor() {
    effect((): void => {
      const message: string = this.uiLibAnnounce();
      if (message) {
        this.liveAnnouncer.announce(message, this.politeness());
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
  private readonly el = inject(ElementRef<HTMLElement>);

  @HostListener('change')
  @HostListener('input')
  onValueChange(): void {
    const message: string | null = this.el.nativeElement.getAttribute('data-announce-message');
    if (message) {
      this.liveAnnouncer.announce(message, 'polite');
    }
  }
}
