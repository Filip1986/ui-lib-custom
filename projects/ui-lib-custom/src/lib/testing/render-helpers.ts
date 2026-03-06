import type { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { MockThemeConfigService } from './mock-theme-config.service';
import type { TestComponentResult } from './testing.types';

/**
 * Create a standalone test component with common providers and defaults.
 */
export async function createTestComponent<T extends object>(
  component: Type<T>,
  inputs?: Partial<T>
): Promise<TestComponentResult<T>> {
  await TestBed.configureTestingModule({
    imports: [component, NoopAnimationsModule],
    providers: [{ provide: ThemeConfigService, useClass: MockThemeConfigService }],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  if (inputs) {
    Object.assign(fixture.componentInstance, inputs);
  }
  fixture.detectChanges();

  return { fixture, instance: fixture.componentInstance };
}
