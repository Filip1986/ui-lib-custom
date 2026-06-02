export function makeKeydownEvent(
  key: string,
  options: Partial<KeyboardEventInit> = {},
): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options });
}

export function makePasteEvent(text: string): ClipboardEvent {
  const EventCtor: typeof ClipboardEvent =
    typeof ClipboardEvent !== 'undefined'
      ? ClipboardEvent
      : (Event as unknown as typeof ClipboardEvent);
  const event: ClipboardEvent = new EventCtor('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', {
    value: { getData: (_type: string): string => text },
    writable: false,
  });
  return event;
}
