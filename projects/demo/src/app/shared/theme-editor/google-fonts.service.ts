import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';

interface FontsResponse {
  items: { family: string; category: string; variants: string[] }[];
}

export interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
}

/**
 * Loads Google Fonts metadata for the theme editor.
 */
@Injectable({ providedIn: 'root' })
export class GoogleFontsService {
  private readonly http: HttpClient = inject(HttpClient);
  private loaded: boolean = false;

  public readonly fonts: WritableSignal<string[]> = signal<string[]>([]); // backward compatibility: family names only
  public readonly fontMeta: WritableSignal<GoogleFont[]> = signal<GoogleFont[]>([]);
  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly error: WritableSignal<string | null> = signal<string | null>(null);

  public readonly serifFonts: Signal<string[]> = computed<string[]>((): string[] =>
    this.getFontsByCategory('serif')
  );
  public readonly sansSerifFonts: Signal<string[]> = computed<string[]>((): string[] =>
    this.getFontsByCategory('sans-serif')
  );
  public readonly displayFonts: Signal<string[]> = computed<string[]>((): string[] =>
    this.getFontsByCategory('display')
  );
  public readonly monospaceFonts: Signal<string[]> = computed<string[]>((): string[] =>
    this.getFontsByCategory('monospace')
  );

  public loadFonts(apiKey: string): void {
    if (this.loaded || this.loading()) return;
    this.loading.set(true);
    this.http
      .get<FontsResponse>('https://www.googleapis.com/webfonts/v1/webfonts', {
        params: { key: apiKey, sort: 'alpha' },
      })
      .subscribe({
        next: (res: FontsResponse): void => {
          const meta: GoogleFont[] = res.items.map(
            (item: FontsResponse['items'][number]): GoogleFont => ({
              family: item.family,
              category: item.category,
              variants: item.variants,
            })
          );
          this.fontMeta.set(meta);
          this.fonts.set(meta.map((item: GoogleFont): string => item.family));
          this.loaded = true;
          this.loading.set(false);
          this.error.set(null);
        },
        error: (err: unknown): void => {
          console.error('Failed to load Google Fonts list', err);
          this.loading.set(false);
          this.error.set('Failed to load fonts');
        },
      });
  }

  public getFontsByCategory(category: string): string[] {
    const normalized: string = category.toLowerCase();
    return this.fontMeta()
      .filter((font: GoogleFont): boolean => font.category.toLowerCase() === normalized)
      .map((font: GoogleFont): string => font.family);
  }
}
