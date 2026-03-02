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

  public readonly fonts = signal<string[]>([]); // backward compatibility: family names only
  public readonly fontMeta = signal<GoogleFont[]>([]);
  public readonly loading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);

  public readonly serifFonts = computed<string[]>(() => this.getFontsByCategory('serif'));
  public readonly sansSerifFonts = computed<string[]>(() => this.getFontsByCategory('sans-serif'));
  public readonly displayFonts = computed<string[]>(() => this.getFontsByCategory('display'));
  public readonly monospaceFonts = computed<string[]>(() => this.getFontsByCategory('monospace'));

  public loadFonts(apiKey: string): void {
    if (this.loaded || this.loading()) return;
    this.loading.set(true);
    this.http
      .get<FontsResponse>('https://www.googleapis.com/webfonts/v1/webfonts', {
        params: { key: apiKey, sort: 'alpha' },
      })
      .subscribe({
        next: (res) => {
          const meta = res.items.map((item) => ({
            family: item.family,
            category: item.category,
            variants: item.variants,
          }));
          this.fontMeta.set(meta);
          this.fonts.set(meta.map((item) => item.family));
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

  public getFontsByCategory(category: string): string[] {
    const normalized = category.toLowerCase();
    return this.fontMeta()
      .filter((font) => font.category.toLowerCase() === normalized)
      .map((font) => font.family);
  }
}
