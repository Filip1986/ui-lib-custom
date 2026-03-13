/*
 * Public API Surface of ui-lib-custom
 *
 * Components with secondary entry points are NOT re-exported here
 * to avoid ng-packagr source file ownership conflicts.
 *
 * Use the secondary entry points directly:
 *   import { Button } from 'ui-lib-custom/button';
 *   import { Card } from 'ui-lib-custom/card';
 *   import { ThemeConfigService } from 'ui-lib-custom/theme';
 *   import { Icon } from 'ui-lib-custom/icon';
 *   import { Accordion } from 'ui-lib-custom/accordion';
 *   import { Tabs } from 'ui-lib-custom/tabs';
 *   import { UiLibInput } from 'ui-lib-custom/input';
 *   import { UiLibSelect } from 'ui-lib-custom/select';
 *   import { SelectButton } from 'ui-lib-custom/select-button';
 *   import { UiLibCheckbox } from 'ui-lib-custom/checkbox';
 *   import { Badge } from 'ui-lib-custom/badge';
 *   import { ICON_SIZES } from 'ui-lib-custom/core';
 *   import { BORDER_RADIUS } from 'ui-lib-custom/tokens';
 *   import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
 *   import { Stack, Inline, Grid, Container } from 'ui-lib-custom/layout';
 */

// --- Base module (no secondary entry point) ---
export * from './lib/ui-lib-custom';

// --- Components WITHOUT secondary entry points ---

// Button group
export * from './lib/button-group/button-group';

// Login templates
export * from './lib/login/login-1/login-1.component';
export * from './lib/login/login-2/login-2.component';
export * from './lib/login/login-3/login-3.component';
export * from './lib/login/models/login-contract';
export type { LoginSocialProvider } from './lib/login/models/login-contract';

// Login form
export * from './lib/login-form/login-form';

// Form field
export * from './lib/form-field/form-field';

// Sidebar menu
export * from './lib/sidebar-menu/sidebar-menu';

// Icon button (pending secondary entry point)
export * from './lib/icon-button/icon-button';

// Alert (pending secondary entry point)
export * from './lib/alert/alert';
