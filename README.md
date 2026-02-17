# UI Components Library

A flexible Angular UI component library with multiple design variants (Material, Bootstrap, and Minimal) that can be easily integrated into your Angular projects.

## Importing Components

### Recommended: Secondary Entry Points

```typescript
import { Button } from 'ui-lib-custom/button';
```

### Alternative: Primary Entry Point

```typescript
import { Button } from 'ui-lib-custom';
```

## Available Entry Points

| Entry Point | Contents |
|-------------|----------|
| ui-lib-custom | All public exports (primary barrel) |
| ui-lib-custom/accordion | Accordion components and types |
| ui-lib-custom/badge | Badge component and types |
| ui-lib-custom/button | Button component and types |
| ui-lib-custom/card | Card component and types |
| ui-lib-custom/checkbox | Checkbox component and types |
| ui-lib-custom/core | Shared tokens and types |
| ui-lib-custom/icon | Icon component, service, and types |
| ui-lib-custom/input | Input component and types |
| ui-lib-custom/layout | Layout primitives and tokens |
| ui-lib-custom/select | Select component and types |
| ui-lib-custom/select-button | SelectButton component and types |
| ui-lib-custom/tabs | Tabs components and types |
| ui-lib-custom/theme | Theme services and types |
| ui-lib-custom/tokens | Design tokens |

## 📚 Documentation

**New here?** Check out the complete documentation: **[📖 Documentation Index](docs/README.md)**

Quick links:

- 🚀 [Quick Start Guide](docs/getting-started/QUICK_START.md) - Get started in 5 minutes
- 📘 [Integration Examples](docs/guides/INTEGRATION_EXAMPLE.md) - Real-world usage examples
- 🏗️ [Architecture](docs/architecture/ARCHITECTURE.md) - System design and structure
- 📦 [Publishing Guide](docs/guides/PUBLISHING_GUIDE.md) - How to publish and distribute

## Features

- 🎨 **Multiple Design Variants**: Choose between Material Design, Bootstrap, and Minimal styles
- 🔧 **Highly Configurable**: Extensive input properties for customization
- 📦 **Easy Integration**: Simple npm install and import
- 🚀 **Modern Angular**: Built with standalone components and latest Angular features
- 💪 **TypeScript**: Full TypeScript support with type definitions
- 🎯 **Zero Dependencies**: No external CSS frameworks required

## Components

### Button Component

A versatile button component with multiple variants, sizes, and colors.

**Variants**: `material` | `bootstrap` | `minimal`  
**Sizes**: `small` | `medium` | `large`  
**Colors**: `primary` | `secondary` | `success` | `danger` | `warning`

#### Usage

```typescript
import { Button } from 'ui-lib-custom/button';

@Component({
  imports: [Button],
  // ...
})
export class YourComponent {}
```

```html
<!-- Material Design Button -->
<ui-lib-button variant="material" color="primary">Click Me</ui-lib-button>

<!-- Bootstrap Button -->
<ui-lib-button variant="bootstrap" size="large" color="success">Submit</ui-lib-button>

<!-- Minimal Button -->
<ui-lib-button variant="minimal" color="danger" [disabled]="true">Delete</ui-lib-button>

<!-- Full Width Button -->
<ui-lib-button variant="material" [fullWidth]="true">Full Width</ui-lib-button>
```

### Card Component

A flexible card component with support for headers, footers, and different elevation levels.

**Variants**: `material` | `bootstrap` | `minimal`  
**Elevation**: `none` | `low` | `medium` | `high`

#### Usage

```typescript
import { Card } from 'ui-lib-custom/card';

@Component({
  imports: [Card],
  // ...
})
export class YourComponent {}
```

```html
<!-- Material Design Card -->
<ui-lib-card variant="material" elevation="medium">
  <div card-header>Card Title</div>
  <p>Card content goes here...</p>
  <div card-footer>
    <button>Action</button>
  </div>
</ui-lib-card>

<!-- Bootstrap Card with Border -->
<ui-lib-card variant="bootstrap" [bordered]="true">
  <p>Simple card content</p>
</ui-lib-card>

<!-- Minimal Hoverable Card -->
<ui-lib-card variant="minimal" [hoverable]="true">
  <div card-header>Hover over me!</div>
  <p>This card will respond to hover events.</p>
</ui-lib-card>
```

## Installation

```bash
npm install ui-lib-custom
```

## Getting Started

1. Install the package:

```bash
npm install ui-lib-custom
```

2. Import the components in your Angular component:

```typescript
import { Component } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';

@Component({
  selector: 'app-root',
  imports: [Button, Card],
  template: `
    <ui-lib-button variant="material" color="primary"> Hello World </ui-lib-button>

    <ui-lib-card variant="material">
      <div card-header>Welcome</div>
      <p>This is a card component</p>
    </ui-lib-card>
  `,
})
export class AppComponent {}
```

## Building Locally

If you want to build the library from source:

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
cd ui-lib-custom
npm install

# Build the library
ng build ui-lib-custom

# Run the demo application
ng serve demo
```

## Design Variants

### Material Design

Clean, modern design with elevation shadows and smooth animations. Perfect for contemporary applications.

### Bootstrap

Traditional Bootstrap-inspired styling with subtle borders and gradients. Great for business applications.

### Minimal

Clean, borderless design with minimal shadows. Ideal for content-focused layouts.

## API Reference

### Button

| Input     | Type                                                             | Default      | Description       |
| --------- | ---------------------------------------------------------------- | ------------ | ----------------- |
| variant   | `'material' \| 'bootstrap' \| 'minimal'`                         | `'material'` | Design variant    |
| size      | `'small' \| 'medium' \| 'large'`                                 | `'medium'`   | Button size       |
| color     | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'` | `'primary'`  | Button color      |
| disabled  | `boolean`                                                        | `false`      | Disabled state    |
| fullWidth | `boolean`                                                        | `false`      | Full width button |

### Card

| Input     | Type                                     | Default      | Description          |
| --------- | ---------------------------------------- | ------------ | -------------------- |
| variant   | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Design variant       |
| elevation | `'none' \| 'low' \| 'medium' \| 'high'`  | `'medium'`   | Shadow elevation     |
| bordered  | `boolean`                                | `false`      | Add border           |
| hoverable | `boolean`                                | `false`      | Enable hover effects |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about:

- Setting up your development environment
- Where to add new documentation
- Component development guidelines
- Pull request process

Feel free to submit a Pull Request or open an issue!
