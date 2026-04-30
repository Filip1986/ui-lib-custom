import { InjectionToken } from '@angular/core';
import type { PanelMenuItem } from './panel-menu.types';

/**
 * Context interface provided by `PanelMenu` and consumed by `PanelMenuSubComponent`
 * to avoid deep prop-drilling through recursive levels.
 */
export interface PanelMenuContext {
  /** Returns `true` if the item identified by `key` is currently expanded. */
  isItemExpanded(key: string): boolean;

  /**
   * Requests expansion or collapse of the item identified by `key`.
   * The `PanelMenu` host applies the multiple-mode logic before mutating state.
   */
  toggleItem(key: string, item: PanelMenuItem): void;

  /** Activates a leaf item — emits `itemClick` and invokes `command`. */
  onItemActivate(item: PanelMenuItem, event: MouseEvent | KeyboardEvent): void;
}

/**
 * Injection token through which the `PanelMenu` host provides its context
 * to all nested `PanelMenuSubComponent` instances.
 */
export const PANEL_MENU_CONTEXT: InjectionToken<PanelMenuContext> =
  new InjectionToken<PanelMenuContext>('PanelMenuContext');
