// Shape for defining on-page navigation sections and optional nested subsections.
export interface DocSection {
  id: string;
  label: string;
  level?: 2 | 3;
  children?: DocSection[];
}

// Alias for consumers that store the active section id as a signal.
export type ActiveSectionId = string | null;
