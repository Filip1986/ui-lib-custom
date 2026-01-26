# Theme Editor: Google Fonts Support

This repo now lets you browse and apply any free Google Font directly from the Theme Editor. The font list is fetched at runtime via the Google Fonts Developer API and applied through the theme typography CSS variable (`--uilib-font-family-base`).

## How it works
- `projects/demo/src/app/shared/theme-editor/google-fonts.service.ts` uses the Google Fonts API (`https://www.googleapis.com/webfonts/v1/webfonts`) to download the catalog (sorted alphabetically).
- The font dropdown in `theme-editor.component` merges built-in font choices with the fetched Google Fonts list.
- When you pick a Google font, the editor injects a `<link>` tag for that family (weights 400/500/600/700) and updates the theme preset (`typography.fontFamily`).
- Global styles reference `--uilib-font-family-base`, so the selected font cascades across the demo and components.

## API key
- The demo currently uses a baked-in key for convenience:
  ```ts
  const GOOGLE_FONTS_API_KEY = 'AIzaSyDarBrNj_ISn3VSURsfzSLmhVhnbHZ_CcU';
  ```
- For production, replace this with your own key and consider loading it from environment config rather than committing it.
- The API is public/read-only; rotate keys if you suspect abuse.

## Caching and loading
- The font catalog is fetched once per session (guarded by the service) to avoid repeated requests.
- Selected Google fonts are loaded on-demand: a `<link>` is added only when you pick a font from the Google list (or if an existing preset already uses one).

## Troubleshooting
- If the dropdown is empty, ensure network access to `fonts.googleapis.com` and that the API key is valid/enabled for the Web Fonts API.
- If the font doesn’t visually change, confirm global styles read `--uilib-font-family-base` (already wired in `projects/demo/src/styles.scss`).
- If you need additional weights/styles, adjust the requested family URL in `ensureGoogleFontLoaded`.

## Customization tips
- To limit the list (e.g., for performance), you can filter the fetched families before mapping to dropdown options.
- To ship a fixed set of fonts offline, skip the API call and hardcode your preferred families in `baseFontOptions` plus pre-bundled `@font-face` assets.
