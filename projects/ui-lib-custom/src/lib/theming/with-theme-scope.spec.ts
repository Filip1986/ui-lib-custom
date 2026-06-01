import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { WithThemeScopeMixin } from './with-theme-scope';
import type { ThemeScopeInput } from './theme-scope.directive';

// The mixin has no selector — it is consumed as a host directive. An inner
// component adopts it and exposes the `theme` input; an outer host binds it.
@Component({
  selector: 'ui-lib-with-theme-inner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
  hostDirectives: [{ directive: WithThemeScopeMixin, inputs: ['theme'] }],
})
class InnerComponent {}

@Component({
  selector: 'ui-lib-with-theme-outer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InnerComponent],
  template: `<ui-lib-with-theme-inner [theme]="theme()" />`,
})
class OuterComponent {
  public readonly theme: WritableSignal<ThemeScopeInput> = signal<ThemeScopeInput>(null);
}

describe('WithThemeScopeMixin', (): void => {
  let fixture: ComponentFixture<OuterComponent>;
  let outer: OuterComponent;
  let scoped: HTMLElement;

  beforeEach(async (): Promise<void> => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(OuterComponent);
    outer = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    scoped = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-with-theme-inner',
    ) as HTMLElement;
  });

  async function setTheme(value: ThemeScopeInput): Promise<void> {
    outer.theme.set(value);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('applies a string color scheme as data-theme', async (): Promise<void> => {
    await setTheme('dark');
    expect(scoped.getAttribute('data-theme')).toBe('dark');
  });

  it('applies the colorScheme field of a config object', async (): Promise<void> => {
    await setTheme({ colorScheme: 'light' });
    expect(scoped.getAttribute('data-theme')).toBe('light');
  });

  it('sets data-variant and applies preset CSS variables for a variant', async (): Promise<void> => {
    await setTheme({ variant: 'bootstrap' });
    expect(scoped.getAttribute('data-variant')).toBe('bootstrap');
    expect(scoped.getAttribute('style')).toContain('--uilib-');
  });

  it('applies direct variable overrides, prefixing keys without a -- prefix', async (): Promise<void> => {
    await setTheme({ variables: { '--uilib-custom-a': 'red', 'uilib-custom-b': 'blue' } });
    expect(scoped.style.getPropertyValue('--uilib-custom-a')).toBe('red');
    expect(scoped.style.getPropertyValue('--uilib-custom-b')).toBe('blue');
  });

  it('clears applied variables and attributes when reset to null', async (): Promise<void> => {
    await setTheme({ variant: 'material', variables: { '--uilib-custom-x': 'green' } });
    expect(scoped.getAttribute('data-variant')).toBe('material');

    await setTheme(null);

    expect(scoped.getAttribute('data-variant')).toBeNull();
    expect(scoped.getAttribute('data-theme')).toBeNull();
    expect(scoped.style.getPropertyValue('--uilib-custom-x')).toBe('');
  });

  it('removes stale variables when switching between two configs', async (): Promise<void> => {
    await setTheme({ variables: { '--uilib-only-first': '1' } });
    await setTheme({ variables: { '--uilib-only-second': '2' } });
    expect(scoped.style.getPropertyValue('--uilib-only-first')).toBe('');
    expect(scoped.style.getPropertyValue('--uilib-only-second')).toBe('2');
  });
});
