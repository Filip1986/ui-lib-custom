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
    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
  });

  it('should announce message', async (): Promise<void> => {
    await service.announce('Test message');

    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('Test message');
  });

  it('should use assertive for errors', async (): Promise<void> => {
    await service.announceError('Error message');

    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.getAttribute('aria-live')).toBe('assertive');
  });

  it('should clear announcements', async (): Promise<void> => {
    await service.announce('Test message');
    service.clear();

    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('');
  });
});
