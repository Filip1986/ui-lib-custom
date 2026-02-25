import { TestBed } from '@angular/core/testing';
import { ThemeConfigService } from './theme-config.service';

describe('ThemeConfigService shape', () => {
  let service: ThemeConfigService;
  let root: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeConfigService);
    root = document.documentElement;
  });

  afterEach(() => {
    root.style.removeProperty('--uilib-shape-base');
  });

  it('sets the shape base variable on the root element', () => {
    service.setShape('pill');
    expect(root.style.getPropertyValue('--uilib-shape-base')).toBe('9999px');
  });
});
