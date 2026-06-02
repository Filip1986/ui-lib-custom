import type { Signal } from '@angular/core';
import { InjectionToken } from '@angular/core';

import type { AccordionExpandMode, AccordionSize, AccordionVariant } from './accordion.types';
import type { AccordionPanel } from './accordion-panel';

export interface AccordionContext {
  variant: Signal<AccordionVariant | null>;
  size: Signal<AccordionSize>;
  expandMode: Signal<AccordionExpandMode>;
  togglePanel: (panelId: string) => void;
  isPanelExpanded: (panelId: string) => boolean;
  registerPanel: (panel: AccordionPanel) => void;
  unregisterPanel: (panel: AccordionPanel) => void;
  /** Unique ID for this accordion instance. */
  accordionId: string;
  /** Returns the DOM id for the header button at the given zero-based index. */
  headerButtonId: (index: number) => string;
  /** Returns the DOM id for the panel content region at the given zero-based index. */
  panelId: (index: number) => string;
  /** Returns the zero-based position of a panel within this accordion (-1 if not found). */
  getPanelIndex: (panel: AccordionPanel) => number;
}

export const ACCORDION_CONTEXT: InjectionToken<AccordionContext> =
  new InjectionToken<AccordionContext>('AccordionContext');
