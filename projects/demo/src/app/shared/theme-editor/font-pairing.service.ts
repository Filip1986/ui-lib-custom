import { Injectable } from '@angular/core';

export type FontPairingCategory = 'display-sans' | 'sans-contrast' | 'serif-sans';

export interface FontPairing {
  name: string;
  description?: string;
  category: FontPairingCategory;
  heading: string;
  body: string;
  ui: string;
  mono: string;
}

const PAIRINGS: FontPairing[] = [
  {
    name: 'Modern',
    description: 'Clean sans pair with a monospace accent',
    category: 'sans-contrast',
    heading: 'Poppins',
    body: 'Inter',
    ui: 'Inter',
    mono: 'Fira Code',
  },
  {
    name: 'Display + Sans',
    description: 'Elegant display for headings with neutral body',
    category: 'display-sans',
    heading: 'Playfair Display',
    body: 'Inter',
    ui: 'Inter',
    mono: 'Fira Code',
  },
  {
    name: 'Sans Contrast',
    description: 'Two sans with weight/shape contrast',
    category: 'sans-contrast',
    heading: 'Poppins',
    body: 'Open Sans',
    ui: 'Open Sans',
    mono: 'Fira Code',
  },
  {
    name: 'Serif + Sans',
    description: 'Readable serif headings with balanced sans body',
    category: 'serif-sans',
    heading: 'Merriweather',
    body: 'Lato',
    ui: 'Lato',
    mono: 'Fira Code',
  },
];

@Injectable({ providedIn: 'root' })
export class FontPairingService {
  list(): FontPairing[] {
    return PAIRINGS;
  }

  findByName(name: string): FontPairing | undefined {
    return PAIRINGS.find((p) => p.name === name);
  }
}
