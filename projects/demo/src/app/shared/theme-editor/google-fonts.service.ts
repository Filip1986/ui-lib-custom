import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

interface FontsResponse {
  items: { family: string }[];
}

@Injectable({ providedIn: 'root' })
export class GoogleFontsService {
  private readonly http = inject(HttpClient);
  private loaded = false;

  readonly fonts = signal<string[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadFonts(apiKey: string): void {
    if (this.loaded || this.loading()) return;
    this.loading.set(true);
    this.http
      .get<FontsResponse>('https://www.googleapis.com/webfonts/v1/webfonts', {
        params: { key: apiKey, sort: 'alpha' },
      })
      .subscribe({
        next: (res) => {
          this.fonts.set(res.items?.map((i) => i.family) ?? []);
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
}
