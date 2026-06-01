import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ThemeScopeDirective } from './theme-scope.directive';
import type { ThemeScopeInput } from './theme-scope.directive';

@Component({
  selector: 'ui-lib-theme-scope-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeScopeDirective],
  template: `<div [uiLibTheme]="theme()"></div>`,
})
class HostComponent {
  public readonly theme: WritableSignal<ThemeScopeInput> = signal<ThemeScopeInput>(null);
}

describe('ThemeScopeDirective', (): void => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let scoped: HTMLElement;

  beforeEach(async (): Promise<void> => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    scoped = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-theme-scope]',
    ) as HTMLElement;
  });

  async function setTheme(value: ThemeScopeInput): Promise<void> {
    host.theme.set(value);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('marks the host with data-theme-scope', (): void => {
    expect(scoped.getAttribute('data-theme-scope')).toBe('true');
  });

  it('applies a string color scheme as data-theme', async (): Promise<void> => {
    await setTheme('dark');
    expect(scoped.getAttribute('data-theme')).toBe('dark');
  });

  it('applies the colorScheme field of a config object', async (): Promise<void> => {
    await setTheme({ colorScheme: 'light' });
    expect(scoped.getAttribute('data-theme')).toBe('light');
  });

  it('sets data-variant and applies preset CSS variables when a variant is given', async (): Promise<void> => {
    await setTheme({ variant: 'bootstrap' });
    expect(scoped.getAttribute('data-variant')).toBe('bootstrap');
    // getCssVars produces --uilib-* custom properties; at least one must be applied.
    expect(scoped.getAttribute('style')).toContain('--uilib-');
  });

  it('applies direct variable overrides, prefixing keys that lack a -- prefix', async (): Promise<void> => {
    await setTheme({ variables: { '--uilib-custom-a': 'red', 'uilib-custom-b': 'blue' } });
    expect(scoped.style.getPropertyValue('--uilib-custom-a')).toBe('red');
    expect(scoped.style.getPropertyValue('--uilib-custom-b')).toBe('blue');
  });

  it('clears previously applied variables and attributes when reset to null', async (): Promise<void> => {
    await setTheme({ variant: 'material', variables: { '--uilib-custom-x': 'green' } });
    expect(scoped.getAttribute('data-variant')).toBe('material');
    expect(scoped.style.getPropertyValue('--uilib-custom-x')).toBe('green');

    await setTheme(null);

    expect(scoped.getAttribute('data-variant')).toBeNull();
    expect(scoped.getAttribute('data-theme')).toBeNull();
    expect(scoped.style.getPropertyValue('--uilib-custom-x')).toBe('');
  });

  it('removes stale variables when switching between two configs', async (): Promise<void> => {
    await setTheme({ variables: { '--uilib-only-first': '1' } });
    expect(scoped.style.getPropertyValue('--uilib-only-first')).toBe('1');

    await setTheme({ variables: { '--uilib-only-second': '2' } });
    expect(scoped.style.getPropertyValue('--uilib-only-first')).toBe('');
    expect(scoped.style.getPropertyValue('--uilib-only-second')).toBe('2');
  });
});
