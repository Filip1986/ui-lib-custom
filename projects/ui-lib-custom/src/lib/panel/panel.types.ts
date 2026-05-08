export type PanelVariant = 'material' | 'bootstrap' | 'minimal';

export interface PanelToggleEvent {
  collapsed: boolean;
  originalEvent?: Event;
}
