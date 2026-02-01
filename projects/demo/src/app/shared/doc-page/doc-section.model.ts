// Shape for defining on-page navigation sections and optional nested subsections.
export interface DocSection {
  id: string;
  label: string;
  level?: 2 | 3;
  children?: DocSection[];
}
