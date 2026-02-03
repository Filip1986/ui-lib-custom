import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

interface FontsResponse {
  items: { family: string; category: string; variants: string[] }[];
}

export interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
}

@Injectable({ providedIn: 'root' })
export class GoogleFontsService {
  private readonly http = inject(HttpClient);
  private loaded = false;

  readonly fonts = signal<string[]>([]); // backward compatibility: family names only
  readonly fontMeta = signal<GoogleFont[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly serifFonts = computed(() => this.getFontsByCategory('serif'));
  readonly sansSerifFonts = computed(() => this.getFontsByCategory('sans-serif'));
  readonly displayFonts = computed(() => this.getFontsByCategory('display'));
  readonly monospaceFonts = computed(() => this.getFontsByCategory('monospace'));

  loadFonts(apiKey: string): void {
    if (this.loaded || this.loading()) return;
    this.loading.set(true);
    this.http
      .get<FontsResponse>('https://www.googleapis.com/webfonts/v1/webfonts', {
        params: { key: apiKey, sort: 'alpha' },
      })
      .subscribe({
        next: (res) => {
          const meta =
            res.items?.map((i) => ({
              family: i.family,
              category: i.category,
              variants: i.variants,
            })) ?? [];
          this.fontMeta.set(meta);
          this.fonts.set(meta.map((i) => i.family));
          this.loaded = true;
          this.loading.set(false);
          this.error.set(null);
        },
        error: (err) => {
          console.error('Failed to load Google Fonts list', err);
          this.loading.set(false);
          this.error.set('Failed to load fonts');
        },
      });
  }

  getFontsByCategory(category: string): string[] {
    const normalized = category?.toLowerCase();
    return this.fontMeta()
      .filter((f) => f.category?.toLowerCase() === normalized)
      .map((f) => f.family);
  }
}
