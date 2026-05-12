import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { provideUiLibIcons } from '../icon/icon.providers';
import { Alert } from './alert';
import type { AlertSeverity, AlertVariant } from './alert.types';

@Component({
  standalone: true,
  imports: [Alert],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="region" aria-label="Alert examples">
      <ui-lib-alert
        [severity]="severity()"
        [variant]="variant()"
        [dismissible]="dismissible()"
        [dismissLabel]="dismissLabel()"
      >
        Alert content
      </ui-lib-alert>
    </div>
  `,
})
class AlertA11yHostComponent {
  public readonly severity: WritableSignal<AlertSeverity> = signal<AlertSeverity>('info');
  public readonly variant: WritableSignal<AlertVariant | null> = signal<AlertVariant | null>(null);
  public readonly dismissible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dismissLabel: WritableSignal<string | null> = signal<string | null>(null);
}

async function setup(
  overrides: Partial<{
    severity: AlertSeverity;
    variant: AlertVariant | null;
    dismissible: boolean;
    dismissLabel: string | null;
  }> = {}
): Promise<ComponentFixture<AlertA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [AlertA11yHostComponent],
    providers: [provideZonelessChangeDetection(), ...provideUiLibIcons()],
  }).compileComponents();

  const fixture: ComponentFixture<AlertA11yHostComponent> =
    TestBed.createComponent(AlertA11yHostComponent);
  if (overrides.severity !== undefined) fixture.componentInstance.severity.set(overrides.severity);
  if (overrides.variant !== undefined) fixture.componentInstance.variant.set(overrides.variant);
  if (overrides.dismissible !== undefined)
    fixture.componentInstance.dismissible.set(overrides.dismissible);
  if (overrides.dismissLabel !== undefined)
    fixture.componentInstance.dismissLabel.set(overrides.dismissLabel);

  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getAlertElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-alert') as HTMLElement;
}

describe('Alert Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  it('uses role="alert" for error severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'error' });
    expect(getAlertElement(fixture).getAttribute('role')).toBe('alert');
  });

  it('uses role="alert" for warning severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'warning' });
    expect(getAlertElement(fixture).getAttribute('role')).toBe('alert');
  });

  it('uses role="status" for success severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'success' });
    expect(getAlertElement(fixture).getAttribute('role')).toBe('status');
  });

  it('uses role="status" for info severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'info' });
    expect(getAlertElement(fixture).getAttribute('role')).toBe('status');
  });

  it('sets aria-atomic="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup();
    expect(getAlertElement(fixture).getAttribute('aria-atomic')).toBe('true');
  });

  it('close button has an accessible default label', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ dismissible: true });
    const closeButton: HTMLButtonElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.ui-lib-alert__close');
    expect(closeButton?.getAttribute('aria-label')).toBe('Dismiss alert');
  });

  it('close button supports custom dismissLabel', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({
      dismissible: true,
      dismissLabel: 'Zamknij alert',
    });
    const closeButton: HTMLButtonElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.ui-lib-alert__close');
    expect(closeButton?.getAttribute('aria-label')).toBe('Zamknij alert');
  });

  it('severity icon is decorative', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup();
    const iconElement: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-alert__icon'
    );
    expect(iconElement?.getAttribute('aria-hidden')).toBe('true');
  });

  it('close icon is decorative', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ dismissible: true });
    const closeIconElement: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.ui-lib-alert__close ui-lib-icon');
    expect(closeIconElement?.getAttribute('aria-hidden')).toBe('true');
  });

  it('passes axe for success severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'success' });
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe for info severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'info' });
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe for warning severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'warning' });
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe for error severity', async (): Promise<void> => {
    const fixture: ComponentFixture<AlertA11yHostComponent> = await setup({ severity: 'error' });
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
