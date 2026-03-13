import { TestBed } from '@angular/core/testing';
import type { ThemePreset } from './theme-preset.interface';
import { ThemeEditorService } from './theme-editor.service';
import { ThemePresetService } from './theme-preset.service';

type MockPresetService = {
  captureCurrentTheme: (name: string) => ThemePreset;
  savePreset: (preset: ThemePreset) => void;
};

describe('ThemeEditorService', (): void => {
  let service: ThemeEditorService;
  let presetService: MockPresetService;

  beforeEach(async (): Promise<void> => {
    presetService = {
      captureCurrentTheme: (name: string): ThemePreset => ({
        id: 'mock',
        name,
        description: '',
        variant: 'material',
        shape: 'rounded',
        density: 'default',
        darkMode: 'light',
        colors: {
          primary: '#000000',
          secondary: '#000000',
          success: '#000000',
          danger: '#000000',
          warning: '#000000',
          info: '#000000',
          surface: '#ffffff',
          background: '#ffffff',
          surfaceAlt: '#ffffff',
          text: '#000000',
          textSecondary: '#000000',
          border: '#000000',
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
          mono: 'Monaco',
        },
        customCssVars: {},
        createdAt: 0,
        updatedAt: 0,
      }),
      savePreset: (): void => {},
    };

    await TestBed.configureTestingModule({
      providers: [{ provide: ThemePresetService, useValue: presetService }],
    }).compileComponents();

    service = TestBed.inject(ThemeEditorService);
  });

  it('tracks pending color changes for supported keys', (): void => {
    service.applyColorChange('primary', '#ff0000');

    const pending: Record<string, string> = service.pendingColors();
    expect(pending.primary).toBe('#ff0000');
    expect(service.hasUnsavedChanges()).toBe(true);
  });

  it('ignores color changes for unknown keys', (): void => {
    service.applyColorChange('unknown', '#ff0000');

    const pending: Record<string, string> = service.pendingColors();
    expect(Object.keys(pending).length).toBe(0);
    expect(service.hasUnsavedChanges()).toBe(false);
  });
});
