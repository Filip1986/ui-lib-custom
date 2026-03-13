import { TestBed } from '@angular/core/testing';
import { ThemePresetService } from './theme-preset.service';
import { ThemeConfigService } from './theme-config.service';
import type { ThemePreset } from './theme-preset.interface';

type StorageRecord = Record<string, string>;

const samplePreset: () => ThemePreset = (): ThemePreset => ({
  id: 'preset-1',
  name: 'Sample',
  description: 'Sample preset',
  variant: 'material',
  shape: 'rounded',
  density: 'default',
  darkMode: 'light',
  colors: {
    primary: '#1976d2',
    secondary: '#757575',
    success: '#43a047',
    danger: '#e53935',
    warning: '#fb8c00',
    info: '#039be5',
    surface: '#ffffff',
    background: '#f7f7f9',
    surfaceAlt: '#f1f3f5',
    text: '#1f2933',
    textSecondary: '#5f6c80',
    border: '#e0e0e0',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Monaco',
  },
  customCssVars: { '--uilib-custom-test': '1px' },
  createdAt: 100,
  updatedAt: 100,
});

function getRequiredItem<T>(items: T[], index: number, label: string): T {
  const item: T | undefined = items[index];
  if (item === undefined) {
    throw new Error(`Expected ${label} at index ${index}.`);
  }
  return item;
}

describe('ThemePresetService', (): void => {
  let service: ThemePresetService;
  let themeConfig: ThemeConfigService;
  let storageState: StorageRecord;
  let originalStorage: Storage;

  beforeEach((): void => {
    storageState = {};
    originalStorage = window.localStorage;
    const mockStorage: Storage = {
      get length(): number {
        return Object.keys(storageState).length;
      },
      clear(): void {
        storageState = {};
      },
      getItem(key: string): string | null {
        return Object.prototype.hasOwnProperty.call(storageState, key)
          ? (storageState[key] ?? null)
          : null;
      },
      key(index: number): string | null {
        const keys: string[] = Object.keys(storageState);
        return keys[index] ?? null;
      },
      removeItem(key: string): void {
        delete storageState[key];
      },
      setItem(key: string, value: string): void {
        storageState[key] = value;
      },
    };
    Object.defineProperty(window, 'localStorage', { value: mockStorage, configurable: true });

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemePresetService);
    themeConfig = TestBed.inject(ThemeConfigService);
  });

  afterEach((): void => {
    Object.defineProperty(window, 'localStorage', { value: originalStorage, configurable: true });
  });

  it('loads presets from localStorage', (): void => {
    const preset: ThemePreset = samplePreset();
    window.localStorage.setItem('uilib_presets', JSON.stringify([preset]));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const fresh: ThemePresetService = TestBed.inject(ThemePresetService);
    expect(fresh.presets().length).toBe(1);
    const firstPreset: ThemePreset = getRequiredItem(fresh.presets(), 0, 'preset');
    expect(firstPreset.id).toBe('preset-1');
  });

  it('saves presets and persists them', (): void => {
    const preset: ThemePreset = samplePreset();
    service.savePreset(preset);
    const raw: string | null = window.localStorage.getItem('uilib_presets');
    expect(raw).toBeTruthy();
    const parsed: ThemePreset[] = JSON.parse(raw as string) as ThemePreset[];
    expect(parsed.length).toBe(1);
    const firstParsed: ThemePreset = getRequiredItem(parsed, 0, 'parsed preset');
    expect(firstParsed.id).toBe('preset-1');
  });

  it('updates existing preset on save', (): void => {
    const preset: ThemePreset = samplePreset();
    service.savePreset(preset);
    const updated: ThemePreset = { ...preset, name: 'Updated' };
    service.savePreset(updated);
    expect(service.presets().length).toBe(1);
    const updatedPreset: ThemePreset = getRequiredItem(service.presets(), 0, 'preset');
    expect(updatedPreset.name).toBe('Updated');
  });

  it('applies presets using ThemeConfigService setters and CSS vars', (): void => {
    const preset: ThemePreset = samplePreset();
    const setVariantSpy: jest.SpyInstance = jest.spyOn(themeConfig, 'setVariant');
    const setShapeSpy: jest.SpyInstance = jest.spyOn(themeConfig, 'setShape');
    const setDensitySpy: jest.SpyInstance = jest.spyOn(themeConfig, 'setDensity');
    const setModeSpy: jest.SpyInstance = jest.spyOn(themeConfig, 'setMode');

    service.applyPreset(preset);

    expect(setVariantSpy).toHaveBeenCalledWith('material');
    expect(setShapeSpy).toHaveBeenCalledWith('rounded');
    expect(setDensitySpy).toHaveBeenCalledWith('default');
    expect(setModeSpy).toHaveBeenCalledWith('light');

    const root: HTMLElement = document.documentElement;
    expect(root.style.getPropertyValue('--uilib-color-primary-600')).toBe('#1976d2');
    expect(root.style.getPropertyValue('--uilib-surface')).toBe('#ffffff');
    expect(root.style.getPropertyValue('--uilib-custom-test')).toBe('1px');
  });

  it('deletes presets by id', (): void => {
    const preset: ThemePreset = samplePreset();
    service.savePreset(preset);
    service.deletePreset('preset-1');
    expect(service.presets().length).toBe(0);
  });

  it('exports preset as JSON via file download', (): void => {
    const preset: ThemePreset = samplePreset();
    expect((): void => service.exportAsJson(preset)).not.toThrow();
  });

  it('exports preset as CSS string', (): void => {
    const preset: ThemePreset = samplePreset();
    const css: string = service.exportAsCss(preset);
    expect(css).toContain('--uilib-color-primary-600');
    expect(css).toContain('#1976d2');
  });

  it('imports preset from JSON', (): void => {
    const preset: ThemePreset = samplePreset();
    const json: string = JSON.stringify(preset);
    const parsed: ThemePreset = service.importFromJson(json);
    expect(parsed.id).toBe('preset-1');
  });

  it('throws on invalid JSON', (): void => {
    const invalid: string = JSON.stringify({ name: 'bad' });
    expect((): void => {
      service.importFromJson(invalid);
    }).toThrow();
  });

  it('captures the current theme into a preset', (): void => {
    const captured: ThemePreset = service.captureCurrentTheme('Captured');
    expect(captured.name).toBe('Captured');
    expect(captured.colors.primary.length).toBeGreaterThan(0);
    expect(captured.fonts.body.length).toBeGreaterThan(0);
  });
});
