export interface DemoCountry {
  name: string;
  code: string;
}

export interface DemoGroupOption {
  label: string;
  value: string;
}

export interface DemoGroup {
  label: string;
  value: string;
  items: DemoGroupOption[];
}

export const AUTOCOMPLETE_COUNTRIES: DemoCountry[] = [
  { name: 'Argentina', code: 'AR' },
  { name: 'Australia', code: 'AU' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Canada', code: 'CA' },
  { name: 'Chile', code: 'CL' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Italy', code: 'IT' },
  { name: 'Japan', code: 'JP' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Norway', code: 'NO' },
  { name: 'Poland', code: 'PL' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sweden', code: 'SE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
];

export const AUTOCOMPLETE_GROUPED_CITIES: DemoGroup[] = [
  {
    label: 'Europe',
    value: 'eu',
    items: [
      { label: 'Berlin', value: 'berlin' },
      { label: 'Madrid', value: 'madrid' },
      { label: 'Paris', value: 'paris' },
      { label: 'Stockholm', value: 'stockholm' },
    ],
  },
  {
    label: 'Americas',
    value: 'am',
    items: [
      { label: 'Buenos Aires', value: 'buenos-aires' },
      { label: 'Mexico City', value: 'mexico-city' },
      { label: 'New York', value: 'new-york' },
      { label: 'Sao Paulo', value: 'sao-paulo' },
    ],
  },
  {
    label: 'Asia Pacific',
    value: 'apac',
    items: [
      { label: 'Melbourne', value: 'melbourne' },
      { label: 'Singapore', value: 'singapore' },
      { label: 'Sydney', value: 'sydney' },
      { label: 'Tokyo', value: 'tokyo' },
    ],
  },
];

export const AUTOCOMPLETE_BASIC_STRINGS: string[] = [
  'Angular',
  'React',
  'Vue',
  'Svelte',
  'Solid',
  'Lit',
  'Ember',
  'Backbone',
  'Preact',
  'Stencil',
];

export const AUTOCOMPLETE_LARGE_DATASET: Array<{ label: string; value: string }> = Array.from(
  { length: 10000 },
  (_: unknown, index: number): { label: string; value: string } => ({
    label: `Item ${index + 1}`,
    value: `item-${index + 1}`,
  })
);
