import { TestBed } from '@angular/core/testing';
import { ThemePresetService } from './theme-preset.service';
import { ThemeConfigService } from './theme-config.service';
import { ThemePreset } from './theme-preset.interface';

type StorageRecord = Record<string, string>;

const samplePreset = (): ThemePreset => ({
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

describe('ThemePresetService', () => {
  let service: ThemePresetService;
  let themeConfig: ThemeConfigService;
  let storageState: StorageRecord;
  let originalStorage: Storage;

  beforeEach(() => {
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
        return Object.prototype.hasOwnProperty.call(storageState, key) ? storageState[key] : null;
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

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', { value: originalStorage, configurable: true });
  });

  it('loads presets from localStorage', () => {
    const preset: ThemePreset = samplePreset();
    window.localStorage.setItem('uilib_presets', JSON.stringify([preset]));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const fresh: ThemePresetService = TestBed.inject(ThemePresetService);
    expect(fresh.presets().length).toBe(1);
    expect(fresh.presets()[0].id).toBe('preset-1');
  });

  it('saves presets and persists them', () => {
    const preset: ThemePreset = samplePreset();
    service.savePreset(preset);
    const raw: string | null = window.localStorage.getItem('uilib_presets');
    expect(raw).toBeTruthy();
    const parsed: ThemePreset[] = JSON.parse(raw as string) as ThemePreset[];
    expect(parsed.length).toBe(1);
    expect(parsed[0].id).toBe('preset-1');
  });

  it('updates existing preset on save', () => {
    const preset: ThemePreset = samplePreset();
    service.savePreset(preset);
    const updated: ThemePreset = { ...preset, name: 'Updated' };
    service.savePreset(updated);
    expect(service.presets().length).toBe(1);
    expect(service.presets()[0].name).toBe('Updated');
  });

  it('applies presets using ThemeConfigService setters and CSS vars', () => {
    const preset: ThemePreset = samplePreset();
    const setVariantSpy = spyOn(themeConfig, 'setVariant');
    const setShapeSpy = spyOn(themeConfig, 'setShape');
    const setDensitySpy = spyOn(themeConfig, 'setDensity');
    const setModeSpy = spyOn(themeConfig, 'setMode');

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

  it('deletes presets by id', () => {
    const preset: ThemePreset = samplePreset();
    service.savePreset(preset);
    service.deletePreset('preset-1');
    expect(service.presets().length).toBe(0);
  });

  it('exports preset as JSON via file download', () => {
    const preset: ThemePreset = samplePreset();
    expect(() => service.exportAsJson(preset)).not.toThrow();
  });

  it('exports preset as CSS string', () => {
    const preset: ThemePreset = samplePreset();
    const css: string = service.exportAsCss(preset);
    expect(css).toContain('--uilib-color-primary-600');
    expect(css).toContain('#1976d2');
  });

  it('imports preset from JSON', () => {
    const preset: ThemePreset = samplePreset();
    const json: string = JSON.stringify(preset);
    const parsed: ThemePreset = service.importFromJson(json);
    expect(parsed.id).toBe('preset-1');
  });

  it('throws on invalid JSON', () => {
    const invalid: string = JSON.stringify({ name: 'bad' });
    expect(() => service.importFromJson(invalid)).toThrow();
  });

  it('captures the current theme into a preset', () => {
    const captured: ThemePreset = service.captureCurrentTheme('Captured');
    expect(captured.name).toBe('Captured');
    expect(captured.colors.primary.length).toBeGreaterThan(0);
    expect(captured.fonts.body.length).toBeGreaterThan(0);
  });
});
