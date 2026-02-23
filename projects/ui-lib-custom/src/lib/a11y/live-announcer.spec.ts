import { TestBed } from '@angular/core/testing';
import { LiveAnnouncerService } from './live-announcer.service';

describe('LiveAnnouncerService', () => {
  let service: LiveAnnouncerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveAnnouncerService);
  });

  afterEach(() => {
    service.clear();
    document.getElementById('uilib-live-announcer')?.remove();
  });

  it('should create live region element', () => {
    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
  });

  it('should announce message', async () => {
    await service.announce('Test message');

    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('Test message');
  });

  it('should use assertive for errors', async () => {
    await service.announceError('Error message');

    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.getAttribute('aria-live')).toBe('assertive');
  });

  it('should clear announcements', async () => {
    await service.announce('Test message');
    service.clear();

    const liveRegion = document.getElementById('uilib-live-announcer');
    expect(liveRegion?.textContent).toBe('');
  });
});
