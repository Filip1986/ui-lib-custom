import type * as UiLibCustom from 'ui-lib-custom';
import type * as UiLibAccordion from 'ui-lib-custom/accordion';
import type * as UiLibBadge from 'ui-lib-custom/badge';
import type * as UiLibButton from 'ui-lib-custom/button';
import type * as UiLibCard from 'ui-lib-custom/card';
import type * as UiLibCheckbox from 'ui-lib-custom/checkbox';
import type * as UiLibColorPicker from 'ui-lib-custom/color-picker';
import type * as UiLibCore from 'ui-lib-custom/core';
import type * as UiLibDatePicker from 'ui-lib-custom/date-picker';
import type * as UiLibEditor from 'ui-lib-custom/editor';
import type * as UiLibFloatLabel from 'ui-lib-custom/float-label';
import type * as UiLibIcon from 'ui-lib-custom/icon';
import type * as UiLibInput from 'ui-lib-custom/input';
import type * as UiLibLayout from 'ui-lib-custom/layout';
import type * as UiLibSelect from 'ui-lib-custom/select';
import type * as UiLibSelectButton from 'ui-lib-custom/select-button';
import type * as UiLibTabs from 'ui-lib-custom/tabs';
import type * as UiLibTheme from 'ui-lib-custom/theme';
import type * as UiLibTokens from 'ui-lib-custom/tokens';

describe('Secondary Entry Points', (): void => {
  it('should import from primary', async (): Promise<void> => {
    const lib: typeof UiLibCustom = await import('ui-lib-custom');
    expect(lib.ButtonGroup).toBeDefined();
    expect((lib as { DatePickerComponent?: unknown }).DatePickerComponent).toBeUndefined();
  });

  it('should import from accordion', async (): Promise<void> => {
    const mod: typeof UiLibAccordion = await import('ui-lib-custom/accordion');
    expect(mod.Accordion).toBeDefined();
  });

  it('should import from badge', async (): Promise<void> => {
    const mod: typeof UiLibBadge = await import('ui-lib-custom/badge');
    expect(mod.Badge).toBeDefined();
  });

  it('should import from button', async (): Promise<void> => {
    const mod: typeof UiLibButton = await import('ui-lib-custom/button');
    expect(mod.Button).toBeDefined();
  });

  it('should import from card', async (): Promise<void> => {
    const mod: typeof UiLibCard = await import('ui-lib-custom/card');
    expect(mod.Card).toBeDefined();
  });

  it('should import from checkbox', async (): Promise<void> => {
    const mod: typeof UiLibCheckbox = await import('ui-lib-custom/checkbox');
    expect(mod.Checkbox).toBeDefined();
  });

  it('should import from color-picker', async (): Promise<void> => {
    const mod: typeof UiLibColorPicker = await import('ui-lib-custom/color-picker');
    expect(mod.ColorPicker).toBeDefined();
  });

  it('should import from core', async (): Promise<void> => {
    const mod: typeof UiLibCore = await import('ui-lib-custom/core');
    expect(mod.ICON_SIZES).toBeDefined();
  });

  it('should import from date-picker', async (): Promise<void> => {
    const mod: typeof UiLibDatePicker = await import('ui-lib-custom/date-picker');
    expect(mod.DatePickerComponent).toBeDefined();
  });

  it('should import from editor', async (): Promise<void> => {
    const mod: typeof UiLibEditor = await import('ui-lib-custom/editor');
    expect(mod.EditorComponent).toBeDefined();
  });

  it('should import from float-label', async (): Promise<void> => {
    const mod: typeof UiLibFloatLabel = await import('ui-lib-custom/float-label');
    expect(mod.FloatLabelComponent).toBeDefined();
  });

  it('should import from icon', async (): Promise<void> => {
    const mod: typeof UiLibIcon = await import('ui-lib-custom/icon');
    expect(mod.Icon).toBeDefined();
  });

  it('should import from input', async (): Promise<void> => {
    const mod: typeof UiLibInput = await import('ui-lib-custom/input');
    expect(mod.UiLibInput).toBeDefined();
  });

  it('should import from layout', async (): Promise<void> => {
    const mod: typeof UiLibLayout = await import('ui-lib-custom/layout');
    expect(mod.Stack).toBeDefined();
  });

  it('should import from select', async (): Promise<void> => {
    const mod: typeof UiLibSelect = await import('ui-lib-custom/select');
    expect(mod.UiLibSelect).toBeDefined();
  });

  it('should import from select-button', async (): Promise<void> => {
    const mod: typeof UiLibSelectButton = await import('ui-lib-custom/select-button');
    expect(mod.SelectButton).toBeDefined();
  });

  it('should import from tabs', async (): Promise<void> => {
    const mod: typeof UiLibTabs = await import('ui-lib-custom/tabs');
    expect(mod.Tabs).toBeDefined();
  });

  it('should import from theme', async (): Promise<void> => {
    const mod: typeof UiLibTheme = await import('ui-lib-custom/theme');
    expect(mod.ThemeConfigService).toBeDefined();
  });

  it('should import from tokens', async (): Promise<void> => {
    const mod: typeof UiLibTokens = await import('ui-lib-custom/tokens');
    expect(mod.SPACING_TOKENS).toBeDefined();
  });
});
