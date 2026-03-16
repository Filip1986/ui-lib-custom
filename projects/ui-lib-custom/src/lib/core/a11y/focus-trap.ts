const FOCUSABLE_SELECTOR: string = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

/**
 * Reusable keyboard focus trap for overlay containers.
 */
export class FocusTrap {
  private readonly container: HTMLElement;
  private previousFocusedElement: HTMLElement | null = null;
  private active: boolean = false;
  private addedContainerTabIndex: boolean = false;

  private readonly onKeydown: (event: KeyboardEvent) => void = (event: KeyboardEvent): void => {
    this.handleKeydown(event);
  };

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /** Activates focus trapping and moves focus inside the container. */
  public activate(): void {
    if (this.active || !this.hasDom()) {
      return;
    }

    const activeElement: Element | null = this.container.ownerDocument.activeElement;
    this.previousFocusedElement = activeElement instanceof HTMLElement ? activeElement : null;

    this.container.addEventListener('keydown', this.onKeydown);
    this.focusInitialTarget();
    this.active = true;
  }

  /** Deactivates focus trapping and restores prior focus when possible. */
  public deactivate(): void {
    if (!this.active || !this.hasDom()) {
      return;
    }

    this.container.removeEventListener('keydown', this.onKeydown);

    if (this.addedContainerTabIndex) {
      this.container.removeAttribute('tabindex');
      this.addedContainerTabIndex = false;
    }

    this.active = false;
    this.restoreFocus();
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements: HTMLElement[] = this.getFocusableElements();

    if (focusableElements.length === 0) {
      event.preventDefault();
      this.focusContainer();
      return;
    }

    const firstFocusable: HTMLElement | undefined = focusableElements.at(0);
    const lastFocusable: HTMLElement | undefined = focusableElements.at(-1);
    if (!firstFocusable || !lastFocusable) {
      event.preventDefault();
      this.focusContainer();
      return;
    }

    if (focusableElements.length === 1) {
      event.preventDefault();
      firstFocusable.focus();
      return;
    }

    const activeElement: Element | null = this.container.ownerDocument.activeElement;

    if (event.shiftKey && activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  private focusInitialTarget(): void {
    const firstFocusable: HTMLElement | undefined = this.getFocusableElements().at(0);
    if (firstFocusable) {
      firstFocusable.focus();
      return;
    }

    this.focusContainer();
  }

  private focusContainer(): void {
    if (!this.container.hasAttribute('tabindex')) {
      this.container.setAttribute('tabindex', '-1');
      this.addedContainerTabIndex = true;
    }
    this.container.focus();
  }

  private restoreFocus(): void {
    if (this.previousFocusedElement && this.previousFocusedElement.isConnected) {
      this.previousFocusedElement.focus();
    }
    this.previousFocusedElement = null;
  }

  private getFocusableElements(): HTMLElement[] {
    const nodes: NodeListOf<HTMLElement> =
      this.container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

    return Array.from(nodes).filter((element: HTMLElement): boolean => {
      if (element.hasAttribute('disabled')) {
        return false;
      }

      return element.getAttribute('aria-hidden') !== 'true';
    });
  }

  private hasDom(): boolean {
    return this.container.ownerDocument.defaultView !== null;
  }
}
