export interface SidebarMenuItem {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  children?: SidebarMenuItem[];
  disabled?: boolean;
  badge?: string;
  url?: string;
}

export type SidebarVariant = 'classic' | 'compact' | 'modern';
