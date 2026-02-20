describe('Secondary Entry Points', (): void => {
  it('should import from primary', async (): Promise<void> => {
    const lib: typeof import('ui-lib-custom') = await import('ui-lib-custom');
    expect(lib.Button).toBeDefined();
  });

  it('should import from accordion', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/accordion') = await import('ui-lib-custom/accordion');
    expect(mod.Accordion).toBeDefined();
  });

  it('should import from badge', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/badge') = await import('ui-lib-custom/badge');
    expect(mod.Badge).toBeDefined();
  });

  it('should import from button', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/button') = await import('ui-lib-custom/button');
    expect(mod.Button).toBeDefined();
  });

  it('should import from card', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/card') = await import('ui-lib-custom/card');
    expect(mod.Card).toBeDefined();
  });

  it('should import from checkbox', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/checkbox') = await import('ui-lib-custom/checkbox');
    expect(mod.Checkbox).toBeDefined();
  });

  it('should import from core', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/core') = await import('ui-lib-custom/core');
    expect(mod.ICON_SIZES).toBeDefined();
  });

  it('should import from icon', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/icon') = await import('ui-lib-custom/icon');
    expect(mod.Icon).toBeDefined();
  });

  it('should import from input', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/input') = await import('ui-lib-custom/input');
    expect(mod.UiLibInput).toBeDefined();
  });

  it('should import from layout', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/layout') = await import('ui-lib-custom/layout');
    expect(mod.Stack).toBeDefined();
  });

  it('should import from select', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/select') = await import('ui-lib-custom/select');
    expect(mod.UiLibSelect).toBeDefined();
  });

  it('should import from select-button', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/select-button') =
      await import('ui-lib-custom/select-button');
    expect(mod.SelectButton).toBeDefined();
  });

  it('should import from tabs', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/tabs') = await import('ui-lib-custom/tabs');
    expect(mod.Tabs).toBeDefined();
  });

  it('should import from theme', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/theme') = await import('ui-lib-custom/theme');
    expect(mod.ThemeConfigService).toBeDefined();
  });

  it('should import from tokens', async (): Promise<void> => {
    const mod: typeof import('ui-lib-custom/tokens') = await import('ui-lib-custom/tokens');
    expect(mod.SPACING_TOKENS).toBeDefined();
  });
});
