import { TestBed } from '@angular/core/testing';

import { LiveAnnouncerService } from './live-announcer.service';

describe('LiveAnnouncerService', (): void => {
  let service: LiveAnnouncerService;

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveAnnouncerService);
  });

  afterEach((): void => {
    service.clear();
    document.getElementById('uilib-live-announcer')?.remove();
  });

  it('should create live region element', (): void => {
    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
  });

  it('should announce message', async (): Promise<void> => {
    await service.announce('Test message');

    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('Test message');
  });

  it('should use assertive for errors', async (): Promise<void> => {
    await service.announceError('Error message');

    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.getAttribute('aria-live')).toBe('assertive');
  });

  it('should clear announcements', async (): Promise<void> => {
    await service.announce('Test message');
    service.clear();

    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('');
  });

  it('uses polite live region for success announcements', async (): Promise<void> => {
    await service.announceSuccess('Saved');

    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
    expect(liveRegion?.textContent).toBe('Saved');
  });

  it('resolves immediately and does nothing when there is no live element (SSR path)', async (): Promise<void> => {
    // Simulate the non-browser branch where createLiveElement() never ran.
    (service as unknown as { liveElement: HTMLElement | null }).liveElement = null;

    await expect(service.announce('ignored')).resolves.toBeUndefined();
  });

  it('clear() is a no-op when nothing is pending (no timeout branch)', (): void => {
    // No announce() was called, so currentTimeout is null — exercise the false branch.
    expect((): void => service.clear()).not.toThrow();
  });

  it('removes the live region element on destroy', (): void => {
    expect(document.getElementById('uilib-live-announcer')).toBeTruthy();

    service.ngOnDestroy();

    expect(document.getElementById('uilib-live-announcer')).toBeNull();
  });
});

describe('LiveAnnouncerService — timer-driven branches', (): void => {
  let service: LiveAnnouncerService;

  beforeEach((): void => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveAnnouncerService);
  });

  afterEach((): void => {
    jest.clearAllTimers();
    jest.useRealTimers();
    document.getElementById('uilib-live-announcer')?.remove();
  });

  it('writes the message only after the 100ms debounce, then resolves', async (): Promise<void> => {
    const pending: Promise<void> = service.announce('Delayed');
    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');

    // Before the timer fires the region is cleared but not yet populated.
    expect(liveRegion?.textContent).toBe('');

    jest.advanceTimersByTime(100);
    await pending;

    expect(liveRegion?.textContent).toBe('Delayed');
  });

  it('clears the previous pending timeout when a second announce arrives', async (): Promise<void> => {
    const clearSpy: jest.SpyInstance = jest.spyOn(globalThis, 'clearTimeout');

    void service.announce('First');
    // Second call before the first 100ms elapses must clear the first timeout.
    const second: Promise<void> = service.announce('Second');
    expect(clearSpy).toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    await second;

    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('Second');
    clearSpy.mockRestore();
  });

  it('auto-clears the message after the given duration (duration > 0 branch)', async (): Promise<void> => {
    const pending: Promise<void> = service.announce('Temporary', 'polite', 500);

    jest.advanceTimersByTime(100); // write the message
    const liveRegion: HTMLElement | null = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('Temporary');

    jest.advanceTimersByTime(500); // duration elapses → message cleared
    await pending;

    expect(liveRegion?.textContent).toBe('');
  });
});
