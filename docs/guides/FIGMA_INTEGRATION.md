# Figma Design Token Integration

## Exporting to Figma

1. Open Theme Editor
2. Select "Figma Tokens" export format
3. Copy or download the JSON
4. In Figma, install "Tokens Studio" plugin
5. Import the JSON file

## Token Structure

The export creates tokens compatible with Figma Tokens plugin:
- color/* - Color tokens
- borderRadius/* - Border radius tokens
- fontFamily/* - Typography tokens
- spacing/* - Spacing scale
- shadow/* - Shadow tokens

## Syncing Changes

For bi-directional sync, consider:
- Style Dictionary for build-time token generation
- Figma API for automated sync

