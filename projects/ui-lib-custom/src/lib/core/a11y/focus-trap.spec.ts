import { FocusTrap } from './focus-trap';

function dispatchTab(target: HTMLElement, shiftKey: boolean = false): boolean {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey,
    bubbles: true,
    cancelable: true,
  });

  target.dispatchEvent(event);
  return event.defaultPrevented;
}

describe('FocusTrap', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  it('focuses the first focusable element on activation', (): void => {
    document.body.innerHTML = `
      <button id="trigger">Trigger</button>
      <div id="container">
        <button id="first">First</button>
        <button id="second">Second</button>
      </div>
    `;

    const trigger: HTMLElement = document.getElementById('trigger') as HTMLElement;
    const container: HTMLElement = document.getElementById('container') as HTMLElement;
    const first: HTMLElement = document.getElementById('first') as HTMLElement;

    trigger.focus();

    const trap: FocusTrap = new FocusTrap(container);
    trap.activate();

    expect(document.activeElement).toBe(first);
  });

  it('restores prior focus on deactivation', (): void => {
    document.body.innerHTML = `
      <button id="trigger">Trigger</button>
      <div id="container">
        <button id="first">First</button>
      </div>
    `;

    const trigger: HTMLElement = document.getElementById('trigger') as HTMLElement;
    const container: HTMLElement = document.getElementById('container') as HTMLElement;

    trigger.focus();

    const trap: FocusTrap = new FocusTrap(container);
    trap.activate();
    trap.deactivate();

    expect(document.activeElement).toBe(trigger);
  });

  it('wraps focus from last to first on Tab', (): void => {
    document.body.innerHTML = `
      <div id="container">
        <button id="first">First</button>
        <button id="second">Second</button>
      </div>
    `;

    const container: HTMLElement = document.getElementById('container') as HTMLElement;
    const first: HTMLElement = document.getElementById('first') as HTMLElement;
    const second: HTMLElement = document.getElementById('second') as HTMLElement;

    const trap: FocusTrap = new FocusTrap(container);
    trap.activate();
    second.focus();

    const prevented: boolean = dispatchTab(second);

    expect(prevented).toBe(true);
    expect(document.activeElement).toBe(first);
  });

  it('wraps focus from first to last on Shift+Tab', (): void => {
    document.body.innerHTML = `
      <div id="container">
        <button id="first">First</button>
        <button id="second">Second</button>
      </div>
    `;

    const container: HTMLElement = document.getElementById('container') as HTMLElement;
    const first: HTMLElement = document.getElementById('first') as HTMLElement;
    const second: HTMLElement = document.getElementById('second') as HTMLElement;

    const trap: FocusTrap = new FocusTrap(container);
    trap.activate();
    first.focus();

    const prevented: boolean = dispatchTab(first, true);

    expect(prevented).toBe(true);
    expect(document.activeElement).toBe(second);
  });

  it('keeps focus on single focusable element when tabbing', (): void => {
    document.body.innerHTML = `
      <div id="container">
        <button id="only">Only</button>
      </div>
    `;

    const container: HTMLElement = document.getElementById('container') as HTMLElement;
    const only: HTMLElement = document.getElementById('only') as HTMLElement;

    const trap: FocusTrap = new FocusTrap(container);
    trap.activate();

    const prevented: boolean = dispatchTab(only);

    expect(prevented).toBe(true);
    expect(document.activeElement).toBe(only);
  });

  it('focuses container when there are no focusable elements', (): void => {
    document.body.innerHTML = `
      <div id="container">
        <span>Static content</span>
      </div>
    `;

    const container: HTMLElement = document.getElementById('container') as HTMLElement;

    const trap: FocusTrap = new FocusTrap(container);
    trap.activate();

    expect(document.activeElement).toBe(container);
    expect(container.getAttribute('tabindex')).toBe('-1');

    trap.deactivate();

    expect(container.hasAttribute('tabindex')).toBe(false);
  });

  it('re-queries focusables on each tab for dynamic content changes', (): void => {
    document.body.innerHTML = `
      <div id="container">
        <button id="first">First</button>
        <button id="second">Second</button>
      </div>
    `;

    const container: HTMLElement = document.getElementById('container') as HTMLElement;
    const first: HTMLElement = document.getElementById('first') as HTMLElement;
    const second: HTMLButtonElement = document.getElementById('second') as HTMLButtonElement;

    const trap: FocusTrap = new FocusTrap(container);
    trap.activate();

    second.disabled = true;
    first.focus();

    const prevented: boolean = dispatchTab(first);

    expect(prevented).toBe(true);
    expect(document.activeElement).toBe(first);
  });
});
