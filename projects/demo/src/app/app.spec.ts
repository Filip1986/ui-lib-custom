import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', (): void => {
    const fixture: ComponentFixture<App> = TestBed.createComponent(App);
    const app: App = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render layout shell with sidebar and topbar', (): void => {
    const fixture: ComponentFixture<App> = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-topbar')).toBeTruthy();
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
  });
});
