import { InjectionToken, Signal } from '@angular/core';
import type { AccordionPanel } from './accordion-panel';
import { AccordionExpandMode, AccordionSize, AccordionVariant } from './accordion.types';

export interface AccordionContext {
  variant: Signal<AccordionVariant>;
  size: Signal<AccordionSize>;
  expandMode: Signal<AccordionExpandMode>;
  togglePanel: (panelId: string) => void;
  isPanelExpanded: (panelId: string) => boolean;
  registerPanel: (panel: AccordionPanel) => void;
  unregisterPanel: (panel: AccordionPanel) => void;
}

export const ACCORDION_CONTEXT = new InjectionToken<AccordionContext>('AccordionContext');
