import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { AnnounceDirective, AnnounceOnChangeDirective } from './announce.directive';
import { LiveAnnouncerService } from './live-announcer.service';
import type { AriaLivePoliteness } from './live-announcer.service';

@Component({
  selector: 'ui-lib-announce-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnnounceDirective],
  template: `<div [uiLibAnnounce]="message()" [politeness]="politeness()"></div>`,
})
class AnnounceHostComponent {
  public readonly message: WritableSignal<string> = signal<string>('');
  public readonly politeness: WritableSignal<AriaLivePoliteness> =
    signal<AriaLivePoliteness>('polite');
}

@Component({
  selector: 'ui-lib-announce-change-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnnounceOnChangeDirective],
  template: `<input uiLibAnnounceOnChange [attr.data-announce-message]="announceMessage()" />`,
})
class AnnounceChangeHostComponent {
  public readonly announceMessage: WritableSignal<string | null> = signal<string | null>(
    'Value updated',
  );
}

describe('AnnounceDirective', (): void => {
  let announceSpy: jest.SpyInstance;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    // Spy on the singleton so the real setTimeout-based DOM write never runs.
    announceSpy = jest
      .spyOn(LiveAnnouncerService.prototype, 'announce')
      .mockResolvedValue(undefined);
  });

  afterEach((): void => {
    announceSpy.mockRestore();
    document.getElementById('uilib-live-announcer')?.remove();
  });

  it('announces the message through the live announcer when set', async (): Promise<void> => {
    const fixture: ComponentFixture<AnnounceHostComponent> =
      TestBed.createComponent(AnnounceHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.message.set('Saved successfully');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(announceSpy).toHaveBeenCalledWith('Saved successfully', 'polite');
  });

  it('does not announce when the message is empty (guard branch)', async (): Promise<void> => {
    const fixture: ComponentFixture<AnnounceHostComponent> =
      TestBed.createComponent(AnnounceHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    // Default message is '' — the effect's `if (message)` guard must skip the call.
    expect(announceSpy).not.toHaveBeenCalled();
  });

  it('forwards the configured politeness level', async (): Promise<void> => {
    const fixture: ComponentFixture<AnnounceHostComponent> =
      TestBed.createComponent(AnnounceHostComponent);
    fixture.componentInstance.politeness.set('assertive');
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.message.set('Critical error');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(announceSpy).toHaveBeenCalledWith('Critical error', 'assertive');
  });

  it('re-announces each time the message changes', async (): Promise<void> => {
    const fixture: ComponentFixture<AnnounceHostComponent> =
      TestBed.createComponent(AnnounceHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.message.set('First');
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.message.set('Second');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(announceSpy).toHaveBeenNthCalledWith(1, 'First', 'polite');
    expect(announceSpy).toHaveBeenNthCalledWith(2, 'Second', 'polite');
  });
});

describe('AnnounceOnChangeDirective', (): void => {
  let announceSpy: jest.SpyInstance;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    announceSpy = jest
      .spyOn(LiveAnnouncerService.prototype, 'announce')
      .mockResolvedValue(undefined);
  });

  afterEach((): void => {
    announceSpy.mockRestore();
    document.getElementById('uilib-live-announcer')?.remove();
  });

  function createHost(): ComponentFixture<AnnounceChangeHostComponent> {
    const fixture: ComponentFixture<AnnounceChangeHostComponent> = TestBed.createComponent(
      AnnounceChangeHostComponent,
    );
    fixture.detectChanges();
    return fixture;
  }

  it('announces the data-announce-message on input', (): void => {
    const fixture: ComponentFixture<AnnounceChangeHostComponent> = createHost();
    const input: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    input.dispatchEvent(new Event('input'));

    expect(announceSpy).toHaveBeenCalledWith('Value updated', 'polite');
  });

  it('announces on the native change event as well', (): void => {
    const fixture: ComponentFixture<AnnounceChangeHostComponent> = createHost();
    const input: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    input.dispatchEvent(new Event('change'));

    expect(announceSpy).toHaveBeenCalledWith('Value updated', 'polite');
  });

  it('does not announce when no data-announce-message is present (guard branch)', (): void => {
    const fixture: ComponentFixture<AnnounceChangeHostComponent> = createHost();
    fixture.componentInstance.announceMessage.set(null);
    fixture.detectChanges();
    const input: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    input.dispatchEvent(new Event('input'));

    expect(announceSpy).not.toHaveBeenCalled();
  });
});
