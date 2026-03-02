import { TestBed } from '@angular/core/testing';
import { ThemeConfigService } from './theme-config.service';

describe('ThemeConfigService shape', (): void => {
  let service: ThemeConfigService;
  let root: HTMLElement;

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeConfigService);
    root = document.documentElement;
  });

  afterEach((): void => {
    root.style.removeProperty('--uilib-shape-base');
  });

  it('sets the shape base variable on the root element', (): void => {
    service.setShape('pill');
    expect(root.style.getPropertyValue('--uilib-shape-base')).toBe('9999px');
  });
});

describe('ThemeConfigService density', (): void => {
  let service: ThemeConfigService;
  let root: HTMLElement;

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeConfigService);
    root = document.documentElement;
  });

  afterEach((): void => {
    root.style.removeProperty('--uilib-density');
  });

  it('sets the density variable on the root element', (): void => {
    service.setDensity('comfortable');
    expect(root.style.getPropertyValue('--uilib-density')).toBe('1.33');
  });
});
