import { TemplateRef } from '@angular/core';

export type TabsVariant = 'material' | 'bootstrap' | 'minimal';
export type TabsSize = 'small' | 'medium' | 'large';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsAlignment = 'start' | 'center' | 'end' | 'stretch';
export type TabsLazyMode = false | 'unmount' | 'keep-alive';
export type TabsScrollBehavior = 'auto' | 'arrows' | 'overflow-menu';
export type TabsMode = 'default' | 'navigation';
export type TabsValue = string | number;

export interface TabContext {
  value: TabsValue;
  index: number;
  disabled?: boolean;
  closable?: boolean;
  label?: string;
  labelTemplate?: TemplateRef<unknown>;
  content?: TemplateRef<unknown>;
  contentTemplate?: TemplateRef<unknown>;
  lazy?: TabsLazyMode;
}
