import { Injectable, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AriaLivePoliteness = 'polite' | 'assertive' | 'off';

@Injectable({ providedIn: 'root' })
export class LiveAnnouncerService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private liveElement: HTMLElement | null = null;
  private currentTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.createLiveElement();
    }
  }

  /**
   * Announce a message to screen readers
   */
  announce(
    message: string,
    politeness: AriaLivePoliteness = 'polite',
    duration: number = 0
  ): Promise<void> {
    return new Promise((resolve: () => void) => {
      if (!this.liveElement) {
        resolve();
        return;
      }

      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout);
      }

      this.liveElement.textContent = '';
      this.liveElement.setAttribute('aria-live', politeness);

      this.currentTimeout = setTimeout((): void => {
        if (this.liveElement) {
          this.liveElement.textContent = message;
        }

        if (duration > 0) {
          this.currentTimeout = setTimeout((): void => {
            if (this.liveElement) {
              this.liveElement.textContent = '';
            }
            resolve();
          }, duration);
        } else {
          resolve();
        }
      }, 100);
    });
  }

  /**
   * Announce an error message (assertive)
   */
  announceError(message: string): Promise<void> {
    return this.announce(message, 'assertive');
  }

  /**
   * Announce a success message (polite)
   */
  announceSuccess(message: string): Promise<void> {
    return this.announce(message, 'polite');
  }

  /**
   * Clear any current announcement
   */
  clear(): void {
    if (this.liveElement) {
      this.liveElement.textContent = '';
    }
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  private createLiveElement(): void {
    this.liveElement = document.createElement('div');
    this.liveElement.id = 'uilib-live-announcer';
    this.liveElement.setAttribute('aria-live', 'polite');
    this.liveElement.setAttribute('aria-atomic', 'true');
    this.liveElement.setAttribute('role', 'status');

    Object.assign(this.liveElement.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    });

    document.body.appendChild(this.liveElement);
  }

  ngOnDestroy(): void {
    this.liveElement?.remove();
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
  }
}
