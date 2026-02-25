# Bundle Size Baseline

Baseline captured: 2026-02-25.

## Library bundles (raw)

| Bundle | Size (bytes) | Size (approx) |
| --- | --- | --- |
| dist/ui-lib-custom/fesm2022/ui-lib-custom.mjs | 574,169 | 561 kB |
| dist/ui-lib-custom/fesm2022/ui-lib-custom-button.mjs | 46,507 | 45 kB |

## Demo build output (raw)

`ng build demo --stats-json`

| Asset | Raw size | Est. transfer size |
| --- | --- | --- |
| chunk-IRV65DYG.js | 523.42 kB | 109.36 kB |
| styles-5FLGOSKB.css | 104.04 kB | 10.38 kB |
| chunk-RFIHNGCI.js | 3.99 kB | 1.31 kB |
| Initial total | 1.31 MB | 200.15 kB |
| chunk-GJMEQPCP.js (accordion) | 27.59 kB | 6.10 kB |
| chunk-H7AU7G6P.js (icons-demo) | 17.95 kB | 4.22 kB |

## Bundle analyzer

A static report is generated at `dist/demo/bundle-report.html` using:

- `npx webpack-bundle-analyzer dist/demo/stats.json --mode static --report dist/demo/bundle-report.html --no-open`

Note: the analyzer reported that no bundles were parsed, so the report is based on module sizes from the stats file.

