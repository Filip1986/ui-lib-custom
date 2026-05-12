const FOCUSABLE_SELECTOR: string = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

let nextFocusTrapId: number = 0;

/**
 * Reusable keyboard focus trap for overlay containers.
 */
export class FocusTrap {
  private readonly container: HTMLElement;
  private readonly instanceId: number = nextFocusTrapId++;
  private previousFocusedElement: HTMLElement | null = null;
  private active: boolean = false;
  private addedContainerTabIndex: boolean = false;
  private startSentinel: HTMLElement | null = null;
  private endSentinel: HTMLElement | null = null;
  private readonly onStartSentinelFocus: () => void = (): void => {
    this.focusLastElement();
  };
  private readonly onEndSentinelFocus: () => void = (): void => {
    this.focusFirstElement();
  };

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

    this.attachSentinels();
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
    this.detachSentinels();

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
    this.focusFirstElement();
  }

  private focusFirstElement(): void {
    const firstFocusable: HTMLElement | undefined = this.getFocusableElements().at(0);
    if (!firstFocusable) {
      this.focusContainer();
      return;
    }

    firstFocusable.focus();
  }

  private focusLastElement(): void {
    const lastFocusable: HTMLElement | undefined = this.getFocusableElements().at(-1);
    if (!lastFocusable) {
      this.focusContainer();
      return;
    }

    lastFocusable.focus();
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

  private attachSentinels(): void {
    if (this.startSentinel || this.endSentinel) {
      return;
    }

    const documentRef: Document = this.container.ownerDocument;
    const startSentinel: HTMLElement = documentRef.createElement('span');
    const endSentinel: HTMLElement = documentRef.createElement('span');
    this.configureSentinel(startSentinel, 'start');
    this.configureSentinel(endSentinel, 'end');
    this.container.before(startSentinel);
    this.container.after(endSentinel);
    startSentinel.addEventListener('focus', this.onStartSentinelFocus);
    endSentinel.addEventListener('focus', this.onEndSentinelFocus);
    this.startSentinel = startSentinel;
    this.endSentinel = endSentinel;
  }

  private configureSentinel(sentinel: HTMLElement, position: 'start' | 'end'): void {
    sentinel.setAttribute('tabindex', '0');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.setAttribute('data-ui-lib-focus-trap-sentinel', position);
    sentinel.id = `ui-lib-focus-trap-${position}-${this.instanceId}`;
    sentinel.style.position = 'fixed';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    sentinel.style.opacity = '0';
    sentinel.style.pointerEvents = 'none';
  }

  private detachSentinels(): void {
    this.startSentinel?.removeEventListener('focus', this.onStartSentinelFocus);
    this.endSentinel?.removeEventListener('focus', this.onEndSentinelFocus);
    this.startSentinel?.remove();
    this.endSentinel?.remove();
    this.startSentinel = null;
    this.endSentinel = null;
  }
}
